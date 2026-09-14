import { NextRequest, NextResponse } from "next/server"
import { getEquipos } from "@/lib/productos"
import { getSalas } from "@/lib/salas"
import { getAutomatizaciones } from "@/lib/automatizaciones"
import { executeQuery } from "@/lib/db"

export const dynamic = "force-dynamic"
export const revalidate = 0

async function registrarEnHistorial(
  origin: string,
  sesionId: string,
  mensajeUsuario: string,
  respuestaBot: string,
  productosRecomendados: any[] = [],
  filtrosDetectados: any = {}
) {
  try {
    await executeQuery(
      `
      INSERT INTO [THE_COOLER_SGCX].[MPR].[CHATBOT_CONVERSACION]
      (
        sesion_id,
        mensaje_usuario,
        respuesta_bot,
        productos_recomendados,
        filtros_detectados
      )
      VALUES
      (
        @sesion_id,
        @mensaje_usuario,
        @respuesta_bot,
        @productos_recomendados,
        @filtros_detectados
      )
      `,
      {
        sesion_id: sesionId,
        mensaje_usuario: mensajeUsuario,
        respuesta_bot: respuestaBot ?? null,
        productos_recomendados: JSON.stringify(productosRecomendados ?? []),
        filtros_detectados: JSON.stringify(filtrosDetectados ?? {}),
      }
    )
  } catch (errorRegistro) {
    console.error("Error guardando conversación en DB:", errorRegistro)
  }
}


function normalizar(value: string | null | undefined) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

function contiene(texto: string, palabras: string[]) {
  return palabras.some((palabra) => texto.includes(normalizar(palabra)))
}

function parseCicloRecomendado(cicloStr: string | null | undefined): { min: number; max: number } {
  if (!cicloStr) return { min: 1000, max: 15000 }
  
  // Limpiar separadores de miles: espacios, comas o puntos cuando están seguidos de 3 dígitos (ej: "72,000", "20 000", "50.000")
  let limpio = cicloStr.replace(/(\d+)[\s.,](\d{3})\b/g, "$1$2")
  limpio = limpio.replace(/(\d+)[\s.,](\d{3})\b/g, "$1$2")

  const nums = (limpio.match(/\d+/g) || [])
    .map((n) => parseInt(n, 10))
    .filter((n) => !isNaN(n) && n > 0)

  if (nums.length === 0) return { min: 1000, max: 15000 }
  if (nums.length === 1) {
    const val = nums[0]
    return { min: Math.max(50, Math.round(val * 0.15)), max: val }
  }
  return { min: Math.min(...nums), max: Math.max(...nums) }
}

function limpiarTextoTokens(texto: string) {
  return normalizar(texto)
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, "")
    .replace(/\b[0-9a-f]{8,32}\b/gi, "")
}

function extraerFormatoDeTexto(texto: string): "A3" | "A4" | null {
  const norm = limpiarTextoTokens(texto)
  if (/\b(a3|doble\s+carta|plano|formato\s+grande)\b/i.test(norm)) {
    return "A3"
  }
  if (/\b(a4|carta|oficio)\b/i.test(norm)) {
    return "A4"
  }
  return null
}

function extraerColorDeTexto(texto: string): "color" | "monocromo" | null {
  const norm = limpiarTextoTokens(texto)
  if (/\b(blanco\s+y\s+negro|blanco\s+negro|monocromo|monocramatica|monocromatico|mono|b\/n|bn|b\s*y\s*n|negro|solo\s+negro)\b/i.test(norm)) {
    return "monocromo"
  }
  if (/\b(color|colores|full\s+color|a\s+color)\b/i.test(norm)) {
    return "color"
  }
  return null
}

function extraerVolumenDeTexto(texto: string, ultimoMensajeBot?: string): number | null {
  if (!texto) return null
  const norm = limpiarTextoTokens(texto)

  const matchK = norm.match(/\b(\d+)\s*k\b/i)
  if (matchK) {
    const val = parseInt(matchK[1], 10) * 1000
    if (val >= 20 && val <= 500000) return val
  }

  // Limpiar separadores de miles (puntos, comas o espacios entre dígitos): ej. "10.000" -> "10000", "5.000" -> "5000", "50.000" -> "50000"
  let textoLimpio = norm.replace(/(\d{1,3})[.,\s](\d{3})(?![0-9])/g, "$1$2")
  textoLimpio = textoLimpio.replace(/(\d{1,3})[.,\s](\d{3})/g, "$1$2")
  textoLimpio = textoLimpio.replace(/(\d+)\.[^\d]*/g, "$1 ")

  const regexConPalabra = /\b(\d{2,6})\s*(paginas|pagina|pag|pags|hojas|impresiones|mensuales|al mes|mes)\b/gi
  const matchPalabra = regexConPalabra.exec(textoLimpio)
  if (matchPalabra) {
    const val = parseInt(matchPalabra[1], 10)
    if (val >= 20 && val <= 500000) return val
  }

  const regexConContexto = /(volumen|imprimo|imprimimos|hago|uso|alrededor|aproximadamente|cerca de)\s*(de)?\s*(\d{2,6})\b/gi
  const matchContexto = regexConContexto.exec(textoLimpio)
  if (matchContexto) {
    const val = parseInt(matchContexto[3], 10)
    if (val >= 20 && val <= 500000) return val
  }

  // Aceptar un número entero suelto entre 20 y 500.000 directamente (ej. "10000", "5000", "500")
  const matchesNumero = textoLimpio.match(/\b(\d{2,6})\b/g)
  if (matchesNumero) {
    for (const numStr of matchesNumero) {
      const val = parseInt(numStr, 10)
      if (val >= 20 && val <= 500000) {
        return val
      }
    }
  }

  return null
}

async function consultarGroq(system: string, user: string): Promise<string | null> {
  async function hacerConsulta(modelo: string) {
    return fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: modelo,
          temperature: 0.5,
          max_completion_tokens: 850,
          messages: [
            {
              role: "system",
              content: system,
            },
            {
              role: "user",
              content: user,
            },
          ],
        }),
      }
    )
  }

  try {
    let response = await hacerConsulta("openai/gpt-oss-120b")

    if (!response.ok) {
      const errorTexto = await response.text()
      console.warn(`Groq 120B no disponible (${response.status}): ${errorTexto}. Reintentando con modelo secundario openai/gpt-oss-20b...`)

      response = await hacerConsulta("openai/gpt-oss-20b")
    }

    if (!response.ok) {
      const errorTexto = await response.text()
      console.error("Groq (modelo secundario también falló):", errorTexto)
      return null
    }

    const data = await response.json()
    return data?.choices?.[0]?.message?.content ?? null
  } catch (error) {
    console.error("Error al consultar Groq:", error)
    return null
  }
}


type IntencionChatbot = {
  categoria: "equipos" | "salas" | "automatizaciones" | "daas" | "general"
  tamano: "S" | "M" | "L" | null
  marca: string | null
  color: "color" | "monocromo" | null
  volumen: number | null
  tipo: "Multifuncional" | "Impresora" | null
  formato: "A3" | "A4" | null
  uso: "hogar" | "pyme" | "corporativo" | null
  tema: string | null
  listado_solicitado: boolean
  detalles_suficientes: boolean
}

async function interpretarConsultaConIA(
  mensaje: string,
  contextoConversacion: string
): Promise<IntencionChatbot | null> {
  const hacerIntencion = async (modelo: string) => {
    return await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: modelo,
          temperature: 0,
          max_completion_tokens: 1000,
          response_format: {
            type: "json_object",
          },
          messages: [
            {
              role: "system",
              content: `
Eres el intérprete de intención del asistente comercial de Ofimundo.

Tu única tarea es entender qué necesita el usuario utilizando:
1. el mensaje actual;
2. la conversación anterior.

Devuelve EXCLUSIVAMENTE un objeto JSON válido.

Formato obligatorio:
{
  "categoria": "equipos",
  "tamano": null,
  "marca": null,
  "color": null,
  "volumen": null,
  "tipo": null,
  "formato": null,
  "uso": null,
  "tema": null,
  "listado_solicitado": false,
  "detalles_suficientes": false
}

Categorías válidas:
- equipos (impresoras, multifuncionales, equipos de impresión)
- salas (salas colaborativas, videoconferencia, salas de reunión)
- automatizaciones (procesos, facturas, finiquitos, cuentas)
- daas (arriendo de computadores/notebooks, dispositivo como servicio)
- general (saludos, preguntas institucionales)

Reglas de uso:
- uso: "hogar" si menciona casa, hogar, uso personal, tareas, estudiante o fotos en casa.
- uso: "pyme" si menciona oficina pequeña, negocio, tienda, local, pyme o 2-10 usuarios.
- uso: "corporativo" si menciona gran empresa, corporación, alto volumen, imprenta o uso masivo.

Reglas de volumen:
- Asigna "volumen" (número entero) ÚNICAMENTE si el usuario proporcionó un NÚMERO O CIFRA EXPLÍCITA de páginas al mes (ej. 100, 300, 500, 2000, 5000, 10000, 50000).
- NO asignes un valor numérico a "volumen" si el usuario solo dijo "para mi casa", "para la oficina" o "pyme" sin dar un número numérico de páginas. En ese caso mantén "volumen" como null.
- Convierte números con separadores o notación (ej: "50.000", "50 000", "50k") a entero puro (ej: 50000).
- Si da un número de páginas al mes -> volumen = <numero>.

Reglas generales:
- Si el usuario solo saluda o pregunta en general -> categoria = "general", detalles_suficientes = false, listado_solicitado = false.
- Si el usuario habla de impresoras o multifuncionales sin haber indicado TANTO la cantidad o número de páginas mensuales (número explícito) COMO la preferencia de Color o Blanco y Negro, y no ha pedido explícitamente el catálogo -> categoria = "equipos", detalles_suficientes = false, listado_solicitado = false.
- Asigna listado_solicitado = true ÚNICAMENTE si el usuario pidió explícitamente "ver el catálogo", "ver modelos", "mostrar opciones" o "qué impresoras tienen". Si solo dice "busco una impresora" o "necesito impresora", listado_solicitado DEBE SER false.
- detalles_suficientes = true ÚNICAMENTE cuando el usuario indicó TANTO la cantidad de páginas mensuales (número explícito) COMO el tipo de impresión (Color o Blanco y Negro), O si pidió explícitamente el catálogo o modelos.
- Si hablan de salas colaborativas y el usuario indica tamaño (S/pequeña, M/mediana, L/grande) o número de personas -> tamano = "S"/"M"/"L", detalles_suficientes = true. Si solo menciona salas en general -> detalles_suficientes = false.
- Si hablan de automatizaciones y especifica el tema/proceso (facturas, finiquitos, cuentas) -> tema = "...", detalles_suficientes = true. Si es consulta general -> detalles_suficientes = false.
- Interpreta las respuestas a preguntas anteriores del asistente usando el historial.
- No inventes productos.
- Solo devuelve JSON.
`,
            },
            {
              role: "user",
              content: `
Conversación anterior:
${contextoConversacion || "Sin conversación anterior"}

Mensaje actual:
${mensaje}
`,
            },
          ],
        }),
      }
    )
  }

  try {
    let response = await hacerIntencion("openai/gpt-oss-120b")

    if (!response.ok) {
      const errorTexto = await response.text()
      console.warn(`Groq 120B no disponible (${response.status}): ${errorTexto}. Reintentando con modelo secundario openai/gpt-oss-20b...`)

      response = await hacerIntencion("openai/gpt-oss-20b")
    }

    if (!response.ok) {
      const errorTexto = await response.text()
      console.error("Error interpretando intención con Groq:", errorTexto)
      return null
    }

    const data = await response.json()
    const contenido = data?.choices?.[0]?.message?.content

    if (!contenido) return null

    const resultado = JSON.parse(contenido)

    const categoriasValidas = [
      "equipos",
      "salas",
      "automatizaciones",
      "daas",
      "general",
    ]

    if (!categoriasValidas.includes(resultado.categoria)) {
      return null
    }

    return {
      categoria: resultado.categoria,
      tamano:
        resultado.tamano === "S" ||
        resultado.tamano === "M" ||
        resultado.tamano === "L"
          ? resultado.tamano
          : null,
      marca:
        typeof resultado.marca === "string" && resultado.marca.trim()
          ? resultado.marca.trim()
          : null,
      color:
        resultado.color === "color"
          ? "color"
          : resultado.color === "monocromo" ||
              resultado.color === "blanco y negro" ||
              resultado.color === "blanco negro" ||
              resultado.color === "bn" ||
              resultado.color === "b/n"
            ? "monocromo"
            : null,
      volumen:
        typeof resultado.volumen === "number" && !isNaN(resultado.volumen)
          ? resultado.volumen
          : null,
      tipo:
        resultado.tipo === "Multifuncional" || resultado.tipo === "Impresora"
          ? resultado.tipo
          : null,
      formato:
        resultado.formato === "A3" || resultado.formato === "A4"
          ? resultado.formato
          : null,
      uso:
        resultado.uso === "hogar" ||
        resultado.uso === "pyme" ||
        resultado.uso === "corporativo"
          ? resultado.uso
          : null,
      tema:
        typeof resultado.tema === "string" && resultado.tema.trim()
          ? resultado.tema.trim()
          : null,
      listado_solicitado: Boolean(resultado.listado_solicitado),
      detalles_suficientes: Boolean(resultado.detalles_suficientes),
    }
  } catch (error) {
    console.error("Error procesando intención IA:", error)
    return null
  }
}

function parseTamanoSala(
  pregunta: string,
  textoMensajesUsuario: string,
  intencionTamano?: string | null
): "S" | "M" | "L" | null {
  const textoCompleto = normalizar(`${textoMensajesUsuario} ${pregunta}`)

  // 1. Extracción de número explícito de personas en los mensajes del usuario
  const matches = textoCompleto.match(/\b([0-9]{1,2})\b/g)
  if (matches) {
    for (const match of matches) {
      const val = parseInt(match, 10)
      if (val >= 1 && val <= 5) return "S"
      if (val >= 6 && val <= 11) return "M"
      if (val >= 12 && val <= 50) return "L"
    }
  }

  // 2. Coincidencias por palabras de tamaño directas en los mensajes del usuario
  if (contiene(textoCompleto, ["pequena", "pequeno", "small", "chica", "huddle", "1 a 4", "2 a 4", "1 a 5"])) {
    return "S"
  }
  if (contiene(textoCompleto, ["mediana", "mediano", "medium", "6 a 10", "6 a 11", "5 a 10"])) {
    return "M"
  }
  if (contiene(textoCompleto, ["grande", "large", "directorio", "auditorio", "mas de 10", "mas de 12", "10 a 20"])) {
    return "L"
  }

  // 3. Fallback: Si la IA devolvió S, M o L directamente y el usuario no dijo número
  if (intencionTamano) {
    const t = String(intencionTamano).trim().toUpperCase()
    if (t === "S" || t === "M" || t === "L") {
      return t as "S" | "M" | "L"
    }
  }

  // 4. Búsqueda aislada de s, m o l
  if (/\b(s|peque[nñ]a)\b/i.test(pregunta)) return "S"
  if (/\b(m|mediana)\b/i.test(pregunta)) return "M"
  if (/\b(l|grande)\b/i.test(pregunta)) return "L"

  return null
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const pregunta = normalizar(body?.mensaje)

    const sesionId =
      typeof body?.sesion_id === "string" && body.sesion_id.trim()
        ? body.sesion_id.trim()
        : crypto.randomUUID()

    if (!pregunta) {
      return NextResponse.json(
        {
          success: false,
          error: "Debes enviar un mensaje",
        },
        { status: 400 }
      )
    }
    let historial: any[] = []

    try {
      const rows = await executeQuery<any>(
        `
        SELECT TOP 10
          mensaje_usuario,
          respuesta_bot,
          productos_recomendados,
          filtros_detectados,
          fecha_registro
        FROM [THE_COOLER_SGCX].[MPR].[CHATBOT_CONVERSACION]
        WHERE sesion_id = @sesion_id
        ORDER BY fecha_registro DESC
        `,
        { sesion_id: sesionId }
      )
      historial = rows.reverse()
    } catch (error) {
      console.error("No se pudo cargar historial directamente de DB:", error)
    }


    // Filtrar el historial para aislar ÚNICAMENTE los turnos de la búsqueda activa actual.
    // Si un turno anterior entregó productos_recomendados, esa búsqueda previa concluyó.
    // Los turnos anteriores a esa recomendación entregada NO deben aportar parámetros a la búsqueda actual.
    let historialBusquedaActiva = Array.isArray(historial) ? [...historial] : []
    let ultimoIndiceProductos = -1
    for (let i = historialBusquedaActiva.length - 1; i >= 0; i--) {
      const item = historialBusquedaActiva[i]
      if (item?.productos_recomendados) {
        try {
          const prods = typeof item.productos_recomendados === "string"
            ? JSON.parse(item.productos_recomendados)
            : item.productos_recomendados
          if (Array.isArray(prods) && prods.length > 0) {
            ultimoIndiceProductos = i
            break
          }
        } catch (e) {}
      }
    }

    if (ultimoIndiceProductos !== -1) {
      historialBusquedaActiva = historialBusquedaActiva.slice(ultimoIndiceProductos + 1)
    }

    let textoMensajesUsuarioActivo = normalizar(
      historialBusquedaActiva.map((item) => item.mensaje_usuario ?? "").join(" ") + " " + body.mensaje
    )

    const textoMensajesUsuario = normalizar(
      historial.map((item) => item.mensaje_usuario ?? "").join(" ") + " " + body.mensaje
    )

    const contextoConversacion = historial
      .map(
        (item) =>
          `Usuario: ${item.mensaje_usuario}\nAsistente: ${item.respuesta_bot ?? ""}`
      )
      .join("\n\n")

    const mensajeConContexto = contextoConversacion
      ? `Conversación anterior:

${contextoConversacion}

Mensaje actual del usuario:
${body.mensaje}`
      : body.mensaje

    const intencionIA = await interpretarConsultaConIA(
      String(body.mensaje ?? ""),
      contextoConversacion
    )

    if (intencionIA) {
      const tieneMencionTamanoReal =
        contiene(textoMensajesUsuarioActivo, [
          "pequena", "pequeno", "small", "chica", "huddle",
          "mediana", "mediano", "medium",
          "grande", "large", "directorio", "auditorio",
          "persona", "personas", "participantes", "asistentes", "pax",
          "1 a 4", "2 a 4", "6 a 10", "10 a 20", "mas de 10",
          "essential", "business", "advanced"
        ]) ||
        /\b([0-9]{1,2})\b/.test(textoMensajesUsuarioActivo)

      if (!tieneMencionTamanoReal) {
        intencionIA.tamano = null
      }
      console.log("Intención IA:", intencionIA)
    } else {
      console.log("Intención IA no disponible. Usando clasificación local.")
    }

    /*
     * DETECCIÓN DE CATEGORÍA
     */

    const esDaas = contiene(pregunta, [
      "daas",
      "device as a service",
      "dispositivo como servicio",
      "arriendo de computadores",
      "arriendo de computador",
      "arriendo de notebook",
      "arriendo de notebooks",
      "arriendo de equipos",
      "computadores como servicio",
      "notebooks como servicio",
      "hardware como servicio",
    ])

    const esAutomatizacion = contiene(pregunta, [
      "automatizacion",
      "automatizaciones",
      "automatizar",
      "aprobacion de facturas",
      "rechazo de facturas",
      "finiquitos",
      "gestion de cuentas",
    ])

    const esSala = contiene(pregunta, [
      "sala",
      "salas",
      "colaborativa",
      "colaborativas",
      "sala colaborativa",
      "salas colaborativas",
      "sala de reunion",
      "salas de reunion",
      "videoconferencia",
      "reunion hibrida",
      "reuniones hibridas",
      "sala grande",
      "sala mediana",
      "sala pequena",
      "solucion advanced",
      "solucion business",
      "solucion essential",
    ])

    const mensajeEsContinuacion =
      /^[0-9]+$/.test(pregunta) ||
      contiene(pregunta, [
        "esa",
        "ese",
        "esta",
        "este",
        "la primera",
        "la segunda",
        "la tercera",
        "el primero",
        "el segundo",
        "el tercero",
        "la premium",
        "la estandar",
        "la standard",
        "la l",
        "la m",
        "la s",
        "esa opcion",
        "esa opción",
      ])

    const textoHistorial = normalizar(
      historial
        .map((item) => `${item.mensaje_usuario} ${item.respuesta_bot ?? ""}`)
        .join(" ")
    )

    const categoriaAnterior =
      contiene(textoHistorial, [
        "automatizacion",
        "automatizaciones",
        "finiquito",
        "facturas",
        "gestion de cuentas",
      ])
        ? "automatizaciones"
        : contiene(textoHistorial, [
            "sala",
            "salas",
            "advanced",
            "essential",
            "business",
            "videoconferencia",
          ])
          ? "salas"
          : contiene(textoHistorial, [
              "daas",
              "dispositivo como servicio",
              "arriendo de equipos",
            ])
            ? "daas"
            : contiene(textoHistorial, [
                "impresora",
                "multifuncional",
                "xerox",
                "epson",
                "brother",
                "kyocera",
                "lexmark",
              ])
              ? "equipos"
              : null

    const esSaludoPuro =
      contiene(pregunta, [
        "hola",
        "buenas",
        "buenos dias",
        "buenas tardes",
        "buenas noches",
        "saludos",
        "hola de nuevo",
        "que tal",
      ]) &&
      !contiene(pregunta, [
        "mps",
        "impresion",
        "impresora",
        "impresoras",
        "multifuncional",
        "multifuncionales",
        "sala",
        "salas",
        "daas",
        "automatizacion",
        "automatizaciones",
        "cotizar",
        "precio",
      ])

    const esEquipoExplicit = contiene(pregunta, [
      "mps",
      "impresion",
      "impresora",
      "impresoras",
      "multifuncional",
      "multifuncionales",
      "equipo",
      "equipos",
      "copiadora",
      "xerox",
      "epson",
      "kyocera",
      "brother",
      "lexmark",
      "hp",
      "canon",
      "a4",
      "a3",
    ])

    const categoria =
      esSaludoPuro
        ? "general"
        : esDaas
          ? "daas"
          : esAutomatizacion
            ? "automatizaciones"
            : esSala
              ? "salas"
              : esEquipoExplicit
                ? "equipos"
                : intencionIA?.categoria && intencionIA.categoria !== "general"
                  ? intencionIA.categoria
                  : mensajeEsContinuacion && categoriaAnterior
                    ? categoriaAnterior
                    : "equipos"


    if (categoria === "general") {
      const respuestaGroq = await consultarGroq(
        `
Eres el asistente comercial virtual de Ofimundo.
Atiendes a clientes interesados en soluciones tecnológicas empresariales (impresión, salas colaborativas de videoconferencia, arriendo DaaS y automatizaciones).

REGLAS DE CONVERSACIÓN NATURAL:
- Habla de manera cercana, empática, fluida y profesional, como un asesor comercial humano experto.
- Si el usuario saluda o hace una pregunta general, responde con calidez y simpatía natural.
- ESTRICTAMENTE PROHIBIDO MENCIONAR MODELOS ESPECÍFICOS O CONSULTAS ANTERIORES DE IMPRESIÓN (ej: NO digas "veo que estás interesado en la Epson WorkForce" o "retomando la impresora").
- Explica brevemente cómo puedes orientarlo (equipos de impresión, salas colaborativas, arriendo DaaS o automatizaciones).
- Mantén un tono conciso (máximo 3 o 4 líneas) sin lenguaje robótico o frío.
- Termina con una pregunta abierta y amable para continuar la conversación.
`,
        `
Consulta del cliente:
${body.mensaje}
`
      )

      const respuesta =
        respuestaGroq ??
        "👋 ¡Hola! Qué gusto saludarte. Soy el asistente de Ofimundo. Puedo orientarte con 🖨️ impresión, 🤝 salas colaborativas, 💻 arriendo DaaS o ⚙️ automatización de procesos. ¿En qué te puedo ayudar hoy?"

      const origin = new URL(request.url).origin
      await registrarEnHistorial(origin, sesionId, body.mensaje, respuesta)

      return NextResponse.json({
        success: true,
        categoria: "general",
        pregunta: body.mensaje,
        respuesta,
        productos: [],
      })
    }

    if (categoria === "daas") {
      const informacionDaas = {
        nombre: "DaaS - Dispositivo como Servicio",
        descripcion:
          "Servicio de arriendo de infraestructura tecnológica para empresas.",
        incluye: [
          "Computadores",
          "Notebooks",
          "Monitores",
          "Otros dispositivos tecnológicos",
        ],
        caracteristicas: [
          "Costo mensual por dispositivo",
          "Posibilidad de escalar según las necesidades de la empresa",
          "Soporte y mantenimiento incluido",
          "Acceso a tecnología actualizada sin realizar una compra inicial importante",
        ],
      }

      const respuestaGroq = await consultarGroq(
        `
Eres el asistente comercial virtual de Ofimundo.
El cliente está consultando sobre DaaS (Dispositivo como Servicio).

REGLAS:
- Responde siempre en español, de forma breve, natural y comercial (máximo 4 líneas).
- Usa emojis simples como ✅, 🔹 o 💻 cuando ayuden a leer mejor.
- No uses tablas Markdown.
- Explica DaaS de forma clara. Si el cliente quiere contratar o cotizar, indícale que puede solicitar asesoría comercial.
- Termina con una sola pregunta corta para continuar la conversación.
`,
        `
Consulta del cliente:
${mensajeConContexto}

Información oficial:
${JSON.stringify(informacionDaas)}
`
      )

      const respuesta =
        respuestaGroq ??
        "DaaS (Dispositivo como Servicio) te permite arrendar infraestructura tecnológica (notebooks, computadores, monitores) con soporte y mantenimiento incluido, sin realizar una compra inicial importante. ¿Te gustaría cotizar equipos para tu empresa?"

      const origin = new URL(request.url).origin
      await registrarEnHistorial(origin, sesionId, body.mensaje, respuesta)

      return NextResponse.json({
        success: true,
        categoria: "daas",
        pregunta: body.mensaje,
        respuesta,
        productos: [],
      })
    }

    if (categoria === "salas") {
      const salas = await getSalas()
      const tamanoDetectado = parseTamanoSala(
        pregunta,
        textoMensajesUsuarioActivo,
        intencionIA?.tamano
      )

      const tieneTamano = Boolean(tamanoDetectado)
      const pideListado = contiene(pregunta, [
        "catalogo",
        "catalogos",
        "ver las salas",
        "ver salas",
        "mostrar salas",
        "mostrar las salas",
        "lista de salas",
        "ver catalogo",
      ])
      const tieneDetalles = Boolean(tieneTamano || pideListado)

      if (!tieneDetalles) {
        const respuesta = "¡Con gusto te orientamos para equipar tu sala de reuniones! 😊 Para recomendarte la opción más idónea, ¿para cuántas personas aproximadamente está pensada la sala o de qué tamaño es (pequeña, mediana o grande)?"

        const origin = new URL(request.url).origin
        await registrarEnHistorial(origin, sesionId, body.mensaje, respuesta)

        return NextResponse.json({
          success: true,
          categoria: "salas",
          pregunta: body.mensaje,
          respuesta,
          productos: [],
        })
      }



      const lineaDetectada =
        contiene(pregunta, ["advanced"]) ? "ADVANCED" :
        contiene(pregunta, ["business"]) ? "BUSINESS" :
        contiene(pregunta, ["essential"]) ? "ESSENTIAL" : null

      let salasFiltradas = salas

      if (tamanoDetectado) {
        salasFiltradas = salasFiltradas.filter((sala: any) =>
          normalizar(String(sala.Tamano ?? sala.tamano_sala ?? "")) === normalizar(tamanoDetectado)
        )
      }

      if (lineaDetectada) {
        const salasPorLinea = salasFiltradas.filter((sala: any) =>
          normalizar(String(sala.Linea ?? "")) === normalizar(lineaDetectada)
        )
        if (salasPorLinea.length > 0) {
          salasFiltradas = salasPorLinea
        }
      }

      if (salasFiltradas.length === 0) {
        salasFiltradas = salas
      }

      const salasParaIA = salasFiltradas.slice(0, 3).map((sala: any) => ({
        nombre: sala.Titulo ?? sala.Nombre ?? sala.nombre,
        tamano: sala.Tamano ?? sala.tamano_sala,
        linea: sala.Linea,
        descripcion: sala.Descripcion ?? sala.descripcion,
      }))

      const respuestaGroq = await consultarGroq(
        `
Eres el asistente comercial virtual de Ofimundo experto en salas colaborativas.
El cliente solicitó recomendaciones de salas de reuniones para un espacio de tamaño ${tamanoDetectado ?? "general"}.

REGLAS DE RECOMENDACIÓN PRECISA Y CONCORDANTE:
- Responde siempre en español, de forma breve, natural y comercial (máximo 3 líneas).
- Usa ÚNICAMENTE la información de las salas proporcionadas. No inventes modelos ni precios.
- Si el usuario especificó capacidad o tamaño (S, M o L), destaca por qué la sala filtrada es la opción ideal para ese número de personas.
- Como la interfaz mostrará las tarjetas visuales de las salas, da una breve introducción.
- Haz solo una pregunta corta y amable al final para continuar la conversación.
`,
        `
Consulta del cliente:
${mensajeConContexto}

Salas filtradas disponibles:
${JSON.stringify(salasParaIA)}
`
      )

      const respuesta =
        respuestaGroq ??
        "Aquí tienes las soluciones de salas colaborativas que mejor se adaptan a tu espacio. Puedes revisar sus características a continuación."

      const origin = new URL(request.url).origin
      await registrarEnHistorial(origin, sesionId, body.mensaje, respuesta, salasFiltradas.slice(0, 3))

      return NextResponse.json({
        success: true,
        categoria: "salas",
        pregunta: body.mensaje,
        respuesta,
        productos: salasFiltradas.slice(0, 3),
      })
    }

    if (categoria === "automatizaciones") {
      const automatizaciones = await getAutomatizaciones()

      const temaDetectado = textoMensajesUsuarioActivo
      const tieneTemaExplicit = contiene(normalizar(String(temaDetectado)), [
        "factura",
        "facturas",
        "finiquito",
        "finiquitos",
        "cuenta",
        "cuentas",
        "rrhh",
        "proveedores",
        "banco",
        "bancos",
        "saldo",
        "saldos",
        "erp",
        "tesoreria",
        "asiento",
        "finanzas",
        "contabilidad",
      ])

      const pideListadoExplicitamente = contiene(pregunta, [
        "catalogo",
        "catalogos",
        "ver automatizaciones",
        "mostrar automatizaciones",
        "lista de automatizaciones",
        "ver catalogo",
      ])

      const tieneDetalles = Boolean(tieneTemaExplicit || pideListadoExplicitamente)

      if (!tieneDetalles) {
        const respuesta = "Optimizamos y automatizamos procesos clave para reducir tareas manuales y errores. ⚙️ ¿Qué área o flujo te gustaría automatizar en tu empresa (por ejemplo: Finanzas, Contabilidad, Recursos Humanos, aprobación de facturas o gestión de finiquitos)?"

        const origin = new URL(request.url).origin
        await registrarEnHistorial(origin, sesionId, body.mensaje, respuesta)

        return NextResponse.json({
          success: true,
          categoria: "automatizaciones",
          pregunta: body.mensaje,
          respuesta,
          productos: [],
        })
      }



      let automatizacionesFiltradas = automatizaciones
        .map((item: any) => {
          let score = 0
          const haystack = normalizar(`${item.nombre} ${item.slug} ${item.resumen} ${item.descripcion} ${item.categoria} ${item.beneficio}`)

          if (contiene(temaDetectado, ["factura", "facturas", "proveedores", "sii", "dte"])) {
            if (haystack.includes("factura") || haystack.includes("sii")) score += 1000
          }
          if (contiene(temaDetectado, ["finiquito", "finiquitos", "rrhh", "personal", "despido"])) {
            if (haystack.includes("finiquito") || haystack.includes("dt")) score += 1000
          }
          if (contiene(temaDetectado, ["cuenta", "cuentas", "erp", "asiento", "contabilidad", "finanzas", "cobrar", "pagar"])) {
            if (haystack.includes("cuenta") || haystack.includes("finanzas")) score += 1000
          }
          if (contiene(temaDetectado, ["banco", "bancos", "saldo", "saldos", "tesoreria", "cartola"])) {
            if (haystack.includes("saldo") || haystack.includes("banco")) score += 1000
          }

          return { item, score }
        })
        .sort((a, b) => b.score - a.score)
        .map((entry) => entry.item)

      const automatizacionesParaIA = automatizacionesFiltradas.slice(0, 3).map((item: any) => ({
        nombre: item.nombre ?? item.nombreCorto,
        categoria: item.categoria,
        beneficio: item.beneficio,
        resumen: item.resumen ?? item.descripcion,
      }))

      const respuestaGroq = await consultarGroq(
        `
Eres el asistente comercial virtual de Ofimundo experto en automatizaciones.
El cliente consulta sobre automatizaciones para un proceso específico.

REGLAS DE RECOMENDACIÓN PRECISA Y CONCORDANTE:
- Responde siempre en español, de forma breve, natural y comercial (máximo 3 líneas).
- Usa ÚNICAMENTE la información de las automatizaciones proporcionadas.
- Si el usuario solicitó automatizar un área (facturas, finiquitos, cuentas, bancos, finanzas), destaca la solución que resuelve esa necesidad concreta.
- Como la interfaz mostrará las tarjetas visuales, brinda una breve introducción.
- Haz solo una pregunta corta al final para continuar la conversación.
`,
        `
Consulta del cliente:
${mensajeConContexto}

Automatizaciones disponibles:
${JSON.stringify(automatizacionesParaIA)}
`
      )

      const respuesta =
        respuestaGroq ??
        "Estas son nuestras soluciones de automatización de procesos. ¿Te gustaría solicitar una demostración o asesoría técnica?"

      const origin = new URL(request.url).origin
      await registrarEnHistorial(origin, sesionId, body.mensaje, respuesta, automatizacionesFiltradas.slice(0, 3))

      return NextResponse.json({
        success: true,
        categoria: "automatizaciones",
        pregunta: body.mensaje,
        respuesta,
        productos: automatizacionesFiltradas.slice(0, 3),
      })
    }

    const productos = await getEquipos()

    // HMR Recompile Trigger - Robust Chatbot Route

    const esSaludoOMensajeInicial = contiene(pregunta, [
      "hola",
      "holoa",
      "holaa",
      "buenas",
      "buenos dias",
      "buenas tardes",
      "buenas noches",
      "saludos",
      "inicio",
    ])

    const solicitaNuevaBusquedaExplicitamente = contiene(pregunta, [
      "nueva busqueda",
      "resetear",
      "empezar de nuevo",
      "otra busqueda",
      "cancelar busqueda",
      "buscar otra cosa",
    ])

    const esInicioNuevaBusqueda = contiene(pregunta, [
      "busco",
      "necesito",
      "quiero",
      "estoy buscando",
      "cotizar",
      "equipamiento",
      "multifuncional a4 color",
      "impresora monocromo",
      "aceptacion de facturas",
      "facturas sii",
    ])

    let ultimoTurnoCategoria: string | null = null
    if (historialBusquedaActiva.length > 0) {
      const ultimo = historialBusquedaActiva[historialBusquedaActiva.length - 1]
      ultimoTurnoCategoria = (ultimo as any)?.categoria ?? null
    }
    const cambioDeCategoria = Boolean(ultimoTurnoCategoria && ultimoTurnoCategoria !== categoria)

    const esNuevaBusqueda =
      solicitaNuevaBusquedaExplicitamente ||
      cambioDeCategoria ||
      historialBusquedaActiva.length === 0

    if (esNuevaBusqueda) {
      historialBusquedaActiva = []
    }

    textoMensajesUsuarioActivo = normalizar(
      historialBusquedaActiva.map((item) => item.mensaje_usuario ?? "").join(" ") + " " + body.mensaje
    )

    const textoParametros = esNuevaBusqueda ? normalizar(body.mensaje) : textoMensajesUsuarioActivo

    // Acumular filtros detectados guardados en turnos de la BÚSQUEDA ACTIVA
    let marcaEnHistorial: string | null = null
    let tipoEnHistorial: "Multifuncional" | "Impresora" | null = null
    let formatoEnHistorial: "A3" | "A4" | null = null
    let colorEnHistorial: "color" | "monocromo" | null = null

    if (!esNuevaBusqueda) {
      for (const item of historialBusquedaActiva) {
        let f = item.filtros_detectados
        if (typeof f === "string") {
          try {
            f = JSON.parse(f)
          } catch (e) {}
        }
        if (f && typeof f === "object") {
          if (f.marca && !marcaEnHistorial) marcaEnHistorial = f.marca
          if (f.tipo && !tipoEnHistorial) tipoEnHistorial = f.tipo
          if (f.formato && !formatoEnHistorial) formatoEnHistorial = f.formato
          if (f.color && !colorEnHistorial) colorEnHistorial = f.color
        }
      }
    }

    // 1. MARCA
    const marcasDisponibles = [
      "xerox",
      "kyocera",
      "brother",
      "epson",
      "lexmark",
      "hp",
      "canon",
    ]
    const marcaEnTexto = marcasDisponibles.find((marca) => contiene(textoParametros, [marca])) ?? null
    const finalMarca = esNuevaBusqueda ? marcaEnTexto : (marcaEnTexto ?? marcaEnHistorial)

    // 2. TIPO (Multifuncional vs Impresora)
    let tipoEnTexto: "Multifuncional" | "Impresora" | null = null
    if (
      contiene(textoParametros, [
        "multifuncional",
        "multifuncionales",
        "multifuncion",
        "copiadora",
        "fotocopiadora",
        "copiar",
        "escanear",
        "scanner",
        "escaner",
        "fax",
      ])
    ) {
      tipoEnTexto = "Multifuncional"
    } else if (
      contiene(textoParametros, [
        "solo impresora",
        "solo impresion",
        "impresora simple",
        "sin escaner",
        "sin fotocopia",
        "sin copia",
      ])
    ) {
      tipoEnTexto = "Impresora"
    }
    const finalTipo = esNuevaBusqueda ? tipoEnTexto : (tipoEnTexto ?? tipoEnHistorial)

    // 3. FORMATO (A3 vs A4 / Carta / Oficio)
    const formatoActual = extraerFormatoDeTexto(body.mensaje)
    const formatoActivo = extraerFormatoDeTexto(textoMensajesUsuarioActivo)
    const finalFormato: "A3" | "A4" | null = formatoActual ?? formatoActivo

    // 4. COLOR (color vs monocromo)
    const colorActual = extraerColorDeTexto(body.mensaje)
    const colorActivo = extraerColorDeTexto(textoMensajesUsuarioActivo)
    const finalColor: "color" | "monocromo" | null = colorActual ?? colorActivo

    // 5. VOLUMEN (número explícito de páginas ingresado por el usuario)
    const ultimoBotMsj = historialBusquedaActiva.length > 0 ? historialBusquedaActiva[historialBusquedaActiva.length - 1]?.respuesta_bot : ""
    const volumenEnTextoActual = extraerVolumenDeTexto(body.mensaje, ultimoBotMsj)
    const volumenEnTextoActivo = extraerVolumenDeTexto(textoMensajesUsuarioActivo, ultimoBotMsj)

    // Un volumen es explícito ÚNICAMENTE si el usuario escribió un número real de páginas en su texto
    const tieneNumeroPaginasExplicito = Boolean(
      volumenEnTextoActual !== null || volumenEnTextoActivo !== null
    )

    let finalVolumen: number | null = tieneNumeroPaginasExplicito
      ? (volumenEnTextoActual ?? volumenEnTextoActivo)
      : null

    const contieneUsoHogar = contiene(textoParametros, ["casa", "hogar", "domestico", "domestica", "estudiante", "personal"])
    const contieneUsoPyme = contiene(textoParametros, ["pyme", "negocio", "local", "pequeña empresa"])
    const contieneUsoCorp = contiene(textoParametros, ["corporativo", "gran empresa", "alto volumen"])

    if (!finalVolumen) {
      if (contieneUsoHogar) finalVolumen = 500
      else if (contieneUsoPyme) finalVolumen = 3000
      else if (contieneUsoCorp) finalVolumen = 15000
    }

    const tieneColorExplicito = Boolean(finalColor)
    const tieneFormatoExplicito = Boolean(finalFormato)

    const pideListadoExplicitamenteEquipos = contiene(pregunta, [
      "catalogo",
      "catalogos",
      "ver impresoras",
      "ver los equipos",
      "mostrar impresoras",
      "mostrar los equipos",
      "lista de impresoras",
      "ver catalogo",
    ])

    const tieneDetallesEquipos = Boolean(
      (tieneColorExplicito && tieneNumeroPaginasExplicito && tieneFormatoExplicito) ||
      pideListadoExplicitamenteEquipos
    )

    console.log("--> CHATBOT FILTROS DETECTADOS:", {
      esNuevaBusqueda,
      finalMarca,
      finalTipo,
      finalFormato,
      finalColor,
      finalVolumen,
      tieneDetallesEquipos,
    })

    if (!tieneDetallesEquipos) {
      let respuesta = ""

      const botPreguntoColor = contiene(normalizar(ultimoBotMsj), ["color o en blanco y negro", "monocromo"])
      const botPreguntoVolumen = contiene(normalizar(ultimoBotMsj), ["volumen aproximado", "paginas que imprimen"])
      const botPreguntoFormato = contiene(normalizar(ultimoBotMsj), ["tamano de papel", "carta", "oficio", "a4", "a3"])

      if (!tieneColorExplicito) {
        if (botPreguntoColor) {
          respuesta = "No logré entender tu respuesta debido a un error de escritura o falta de ortografía. 😅 Por favor, ingresa nuevamente si prefieres que imprima a **Color** o en **Blanco y Negro (Monocromo)**."
        } else {
          respuesta = "¡Con gusto te asesoro con tu equipo de impresión! 😊 Para recomendarte la opción más idónea, ¿prefieres que imprima a **Color** o en **Blanco y Negro (Monocromo)**?"
        }
      } else if (!tieneNumeroPaginasExplicito) {
        if (botPreguntoVolumen) {
          respuesta = "No logré entender la cifra de páginas debido a un error de escritura. 😅 Por favor, ingresa nuevamente la cantidad aproximada de páginas que imprimen al mes (por ejemplo: 5.000, 10.000 o 20.000)."
        } else {
          respuesta = `¡Perfecto, a ${finalColor === "color" ? "Color" : "Blanco y Negro"}! 😊 ¿Cuál es el volumen aproximado de páginas que imprimen al mes (por ejemplo 500, 2 000, 10 000 o 30 000 páginas)?`
        }
      } else if (!tieneFormatoExplicito) {
        if (botPreguntoFormato) {
          respuesta = "No logré entender el tamaño de papel debido a un error de escritura. 😅 Por favor, ingresa nuevamente si necesitas **Carta**, **Oficio**, **A4** o **A3**."
        } else {
          respuesta = "¡Excelente! Para recomendarte la opción más idónea, ¿qué tamaño de papel necesitas utilizar principalmente: **Carta**, **Oficio**, **A4** o **A3**?"
        }
      }

      const origin = new URL(request.url).origin
      await registrarEnHistorial(origin, sesionId, body.mensaje, respuesta, [], {
        marca: finalMarca,
        color: finalColor,
        formato: finalFormato,
        tipo: finalTipo,
      })

      return NextResponse.json({
        success: true,
        categoria: "equipos",
        pregunta: body.mensaje,
        respuesta,
        productos: [],
      })
    }





    const palabrasIgnoradas = new Set([
      "necesito",
      "quiero",
      "busco",
      "para",
      "una",
      "uno",
      "unos",
      "unas",
      "que",
      "con",
      "del",
      "las",
      "los",
      "impresora",
      "impresoras",
      "equipo",
      "equipos",
      "color",
      "blanco",
      "negro",
      "multifuncional",
    ])

    const palabras = pregunta
      .split(/\s+/)
      .map((palabra: string) =>
        palabra.replace(/[^\p{L}\p{N}-]/gu, "")
      )
      .filter(
        (palabra: string) =>
          palabra.length >= 3 && !palabrasIgnoradas.has(palabra)
      )

    const esHogar = contiene(textoParametros, [
      "casa",
      "hogar",
      "domestico",
      "domestica",
      "personal",
      "estudiante",
      "estudiar",
      "mi casa",
      "para la casa",
      "para mi casa",
    ])

    const esPyme = contiene(textoParametros, [
      "pyme",
      "pequeña empresa",
      "negocio",
      "local",
      "oficina pequeña",
    ])

    const esCorporativo = contiene(textoParametros, [
      "corporativo",
      "gran empresa",
      "corporacion",
      "imprenta",
      "alto volumen",
    ])

    const finalUso: "hogar" | "pyme" | "corporativo" | null =
      esHogar ? "hogar" : esPyme ? "pyme" : esCorporativo ? "corporativo" : (intencionIA?.uso ?? null)

    function filtrarYRankearEquipos(
      lista: typeof productos,
      strictVolume: boolean = true,
      strictFormat: boolean = true
    ) {
      return lista
        .filter((producto) => {
          const marca = normalizar(producto.Nombre_Marca)
          const color = normalizar(producto.Color_Equipo)
          const formato = normalizar(producto.Tamano_Papel_Equipo)
          const tipo = normalizar(producto.Tipo_Equipo)
          const cicloInfo = parseCicloRecomendado(producto.Ciclo_Recomendado_Equipo)

          const esMaquinariaAlta =
            cicloInfo.min >= 3000 ||
            cicloInfo.max >= 35000 ||
            (producto.Velocidad_BN_Equipo ?? 0) > 40 ||
            contiene(normalizar(`${producto.Nombre_Marca} ${producto.Nombre_Equipo}`), [
              "enterprise",
              "am-c5000",
              "am-c6000",
              "am-c4000",
              "taskalfa",
              "altalink",
              "versalink c7000",
              "versalink c8000",
              "versalink b7000",
              "versalink b6",
            ])

          // 1. Filtro de Marca (SIEMPRE estricto si el usuario la indicó)
          if (finalMarca && !marca.includes(normalizar(finalMarca))) {
            return false
          }

          // 2. Filtro de Color (SIEMPRE estricto si el usuario lo indicó)
          if (finalColor === "color" && color !== "color") {
            return false
          }
          if (
            finalColor === "monocromo" &&
            !contiene(color, ["blanco y negro", "monocromo"])
          ) {
            return false
          }

          // 3. Filtro de Formato (A4 vs A3)
          if (strictFormat) {
            if (finalFormato === "A4" && formato.includes("a3")) {
              return false
            }
            if (finalFormato === "A3" && !formato.includes("a3")) {
              return false
            }
          }

          // 4. Filtro de Tipo (Multifuncional vs Solo Impresora)
          if (finalTipo) {
            const normTipoSol = normalizar(finalTipo)
            if (normTipoSol === "impresora" && tipo !== "impresora") {
              return false
            }
            if (normTipoSol === "multifuncional" && tipo !== "multifuncional") {
              return false
            }
          }

          // 5. Filtro de Volumen y Tipo de Uso
          if (strictVolume && finalVolumen) {
            // Descartar equipos subdimensionados (el volumen exigido supera en 80% su máximo recomendado)
            if (finalVolumen > cicloInfo.max * 1.8) {
              return false
            }

            // Descartar equipos sobredimensionados según rango
            if (finalUso === "hogar" || finalVolumen <= 1500) {
              if (formato.includes("a3") || cicloInfo.max > 25000 || esMaquinariaAlta) {
                return false
              }
            } else if (finalVolumen <= 6000) {
              if (cicloInfo.max > 60000 || (producto.Velocidad_BN_Equipo ?? 0) > 60) {
                return false
              }
            } else if (finalVolumen >= 25000) {
              if (cicloInfo.max < 12000) {
                return false
              }
            }
          }

          return true
        })
        .map((producto) => {
          const contenido = normalizar(`
            ${producto.Nombre_Marca}
            ${producto.Nombre_Equipo}
            ${producto.Descripcion_Equipo}
            ${producto.Tipo_Equipo}
            ${producto.Tecnologia_Equipo}
            ${producto.Color_Equipo}
            ${producto.Tamano_Papel_Equipo}
            ${producto.Funciones_Equipo}
            ${producto.Ciclo_Recomendado_Equipo}
          `)

          const coincidencias = palabras.filter((palabra: string) =>
            contenido.includes(palabra)
          ).length

          let rankingScore = 1000

          if (finalVolumen) {
            const { min, max } = parseCicloRecomendado(producto.Ciclo_Recomendado_Equipo)
            const ppm = producto.Velocidad_BN_Equipo ?? producto.Velocidad_Color_Equipo ?? 25

            let idealPPM = 25
            if (finalVolumen <= 1000) idealPPM = 20
            else if (finalVolumen <= 5000) idealPPM = 30
            else if (finalVolumen <= 15000) idealPPM = 38
            else if (finalVolumen <= 45000) idealPPM = 45
            else idealPPM = 60

            const idealMaxCycle = finalVolumen * 1.4

            const ratioCiclo = Math.abs(Math.log(max / Math.max(idealMaxCycle, 1)))
            rankingScore += Math.max(0, 900 - Math.round(ratioCiclo * 600))

            const diffPPM = Math.abs(ppm - idealPPM)
            rankingScore += Math.max(0, 500 - diffPPM * 20)
          }

          if (finalMarca && normalizar(producto.Nombre_Marca).includes(normalizar(finalMarca))) {
            rankingScore += 1000
          }

          if (finalFormato) {
            const normPapel = normalizar(producto.Tamano_Papel_Equipo)
            if (finalFormato === "A3" && normPapel.includes("a3")) rankingScore += 500
            if (finalFormato === "A4" && !normPapel.includes("a3")) rankingScore += 500
          }

          const textoConsulta = normalizar(`${pregunta} ${textoMensajesUsuario}`)

          if (contiene(textoConsulta, ["ecotank", "tinta continua", "tinta"])) {
            if (contiene(contenido, ["ecotank", "tinta", "precisioncore", "inyeccion"])) {
              rankingScore += 400
            }
          }

          if (contiene(textoConsulta, ["laser", "toner"])) {
            if (contiene(contenido, ["laser", "toner"])) {
              rankingScore += 400
            }
          }

          if (contiene(textoConsulta, ["wifi", "inalambrica", "wireless"])) {
            if (contiene(contenido, ["wifi", "inalambrica", "wireless", "connectkey"])) {
              rankingScore += 300
            }
          }

          if (contiene(textoConsulta, ["duplex", "doble cara", "dos caras"])) {
            if (contiene(contenido, ["duplex", "doble cara", "2 caras"])) {
              rankingScore += 300
            }
          }

          if (finalUso === "hogar" && (producto.Velocidad_BN_Equipo ?? 0) <= 30) {
            rankingScore += 300
          }

          return {
            ...producto,
            coincidencias,
            rankingScore,
          }
        })
        .sort((a, b) => {
          if (Math.abs(b.rankingScore - a.rankingScore) > 10) {
            return b.rankingScore - a.rankingScore
          }
          if (b.coincidencias !== a.coincidencias) {
            return b.coincidencias - a.coincidencias
          }
          return b.rankingScore - a.rankingScore
        })
    }

    // Intentos progresivos de filtrado
    let candidatos = filtrarYRankearEquipos(productos, true, true)
    if (candidatos.length === 0) {
      candidatos = filtrarYRankearEquipos(productos, false, true)
    }
    if (candidatos.length === 0) {
      candidatos = filtrarYRankearEquipos(productos, false, false)
    }

    const resultados = candidatos.slice(0, 3)

    if (resultados.length === 0) {
      return NextResponse.json({
        success: true,
        categoria: "equipos",
        pregunta: body.mensaje,
        filtros_detectados: {
          marca: finalMarca,
          color: finalColor,
          formato: finalFormato,
          tipo: finalTipo,
        },
        total: 0,
        respuesta:
          "No encontré equipos que cumplan exactamente con esos requisitos. Si quieres, puedo ayudarte a buscar una alternativa similar.",
        productos: [],
      })
    }

    const productosParaIA = resultados.slice(0, 3).map((producto) => ({
      id: producto.ID_Producto,
      marca: producto.Nombre_Marca,
      nombre: producto.Nombre_Equipo,
      tipo: producto.Tipo_Equipo,
      tecnologia: producto.Tecnologia_Equipo,
      color: producto.Color_Equipo,
      formato: producto.Tamano_Papel_Equipo,
      velocidad_ppm: producto.Velocidad_BN_Equipo,
      capacidad_bandeja: producto.Capacidad_Bandeja1_Equipo,
      ciclo_recomendado: producto.Ciclo_Recomendado_Equipo,
      funciones: producto.Funciones_Equipo,
      memoria: producto.Memoria_RAM_Equipo,
      disco: producto.Disco_Duro_Equipo,
      descripcion: producto.Descripcion_Equipo,
    }))

    const respuestaGroq = await consultarGroq(
      `
Eres el asesor comercial virtual de Ofimundo experto en equipos de impresión.
El cliente solicitó recomendaciones para cubrir sus necesidades concretas de impresión.

REGLAS DE RECOMENDACIÓN PRECISA Y CONCORDANTE:
- Responde siempre en español, de forma breve, natural y comercial (máximo 3 líneas).
- Explica de forma clara y directa por qué la primera opción recomendada (${productosParaIA[0]?.marca} ${productosParaIA[0]?.nombre}) es una excelente alternativa. ${finalVolumen ? `Destaca que es ideal para sus ${finalVolumen} páginas mensuales.` : ""} ${finalColor ? `Menciona su impresión a ${finalColor === "color" ? "color" : "blanco y negro"}.` : ""} ESTRICTAMENTE PROHIBIDO inventar números de páginas o colores si el usuario NO los ha indicado en su mensaje.
- PROHIBIDO mencionar o sugerir modelos que NO estén en la lista de productos suministrada: ${JSON.stringify(productosParaIA.map((p) => `${p.marca} ${p.nombre}`))}.
- PROHIBIDO INVENTAR NÚMEROS O ESPECIFICACIONES QUE NO ESTÉN EN LA LISTA.
- Como la interfaz mostrará las tarjetas visuales justo debajo de tu mensaje, da una breve introducción concordante.
- Haz solo una pregunta corta y amable al final para continuar la conversación.
`,
      `
Consulta del cliente:

${mensajeConContexto}

Productos filtrados disponibles (el primero es la recomendación principal):
${JSON.stringify(productosParaIA)}
`
    )

    const respuesta =
      respuestaGroq ??
      "Encontré los siguientes equipos recomendados para tus necesidades. Puedes revisar sus detalles a continuación. ¿Te gustaría cotizar alguno en particular?"

    /*
     * GUARDAR HISTORIAL
     */

    const origin = new URL(request.url).origin
    await registrarEnHistorial(origin, sesionId, body.mensaje, respuesta, resultados, {
      marca: finalMarca,
      color: finalColor,
      formato: finalFormato,
      tipo: finalTipo,
    })

    return NextResponse.json({
      success: true,
      categoria: "equipos",
      sesion_id: sesionId,
      pregunta: body.mensaje,
      filtros_detectados: {
        marca: finalMarca,
        color: finalColor,
        formato: finalFormato,
        tipo: finalTipo,
      },
      total: resultados.length,
      respuesta,
      productos: resultados,
    })
  } catch (error: any) {
    console.error("Error chatbot STACK TRACE:", error?.stack || error)

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Error procesando la consulta",
      },
      { status: 500 }
    )
  }
}
