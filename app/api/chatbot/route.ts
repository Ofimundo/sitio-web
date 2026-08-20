import { NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import {
  mapProducto,
  type ProductoRow,
  VISTA_PRODUCTO_DETALLE,
} from "@/lib/productos"

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

async function consultarGroq(system: string, user: string) {
  async function hacerConsulta() {
    return fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          temperature: 0.2,
          max_completion_tokens: 450,
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

  let response = await hacerConsulta()

  if (response.status === 429) {
    console.warn("Rate limit de Groq alcanzado. Reintentando en 4 segundos...")

    await new Promise((resolve) => setTimeout(resolve, 4000))

    response = await hacerConsulta()
  }

  if (!response.ok) {
    const errorTexto = await response.text()

    console.error("Error Groq:", errorTexto)

    if (response.status === 429) {
      return "Estoy recibiendo muchas consultas en este momento. Intenta nuevamente en unos segundos."
    }

    return "En este momento no pude generar la recomendación. Intenta nuevamente en unos segundos."
  }

  const data = await response.json()

  return (
    data?.choices?.[0]?.message?.content ??
    "No pude generar una respuesta en este momento."
  )
}
 

type IntencionChatbot = {
  categoria: "equipos" | "salas" | "automatizaciones" | "daas" | "general"
  tamano: "S" | "M" | "L" | null
  marca: string | null
  color: "color" | "monocromo" | null
  volumen: number | null
  tema: string | null
}

async function interpretarConsultaConIA(
  mensaje: string,
  contextoConversacion: string
): Promise<IntencionChatbot | null> {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          temperature: 0,
          reasoning_effort: "low",
          max_completion_tokens: 160,
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
  "tema": null
}

Categorías válidas:
- equipos
- salas
- automatizaciones
- daas
- general

Reglas:
- Un saludo sin otra petición corresponde a "general".
- Si hablan de impresoras, multifuncionales o impresión: "equipos".
- Si hablan de reuniones, videoconferencia o salas colaborativas: "salas".
- Si hablan de procesos, facturas, finiquitos, gestión de cuentas o automatización: "automatizaciones".
- Si hablan de arriendo de computadores, notebooks o dispositivo como servicio: "daas".
- Interpreta respuestas cortas usando el contexto anterior.
- Si el asistente preguntó tamaño de sala y el usuario responde S, M o L, conserva "salas" y completa "tamano".
- Si el usuario responde 1, 2, 3, "esa", "esa opción", "la premium", etc., interpreta la selección usando la conversación anterior.
- Si el usuario cambia claramente de tema, usa la categoría nueva.
- No inventes nombres de productos.

- "blanco negro", "blanco y negro", "bn", "b/n" y "monocromo" significan color = "monocromo".
- Si el usuario responde solo con un número y la conversación anterior preguntaba cuántas páginas imprime al mes, interpreta ese número como volumen mensual y conserva categoria = "equipos".
- Si el usuario responde "1000", "5000", "20000" u otro número después de hablar de impresión, no lo interpretes como tamaño de sala.
- Si la conversación anterior está en equipos, conserva categoria = "equipos" salvo que el usuario cambie claramente de tema.
- Si la conversación anterior está en salas, conserva categoria = "salas" solo cuando la respuesta tenga relación con tamaño, sala o videoconferencia.
- Prioriza el mensaje actual sobre palabras antiguas del historial.

- No respondas al usuario.
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
        typeof resultado.marca === "string"
          ? resultado.marca
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
        typeof resultado.volumen === "number"
          ? resultado.volumen
          : null,
      tema:
        typeof resultado.tema === "string"
          ? resultado.tema
          : null,
    }
  } catch (error) {
    console.error("Error procesando intención IA:", error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
const pregunta = normalizar(body?.mensaje)

    const esSaludo = contiene(pregunta, [
      "hola",
      "buenas",
      "buen dia",
      "buenos dias",
      "buenas tardes",
      "buenas noches",
      "hola buenos dias",
      "hola buenas tardes",
    ])
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
  historial = await executeQuery(
    `
      SELECT TOP 2
        mensaje_usuario,
        respuesta_bot,
        fecha_registro
      FROM [THE_COOLER_SGCX].[MPR].[CHATBOT_CONVERSACION]
      WHERE sesion_id = @sesion_id
      ORDER BY fecha_registro DESC
    `,
    {
      sesion_id: sesionId,
    }
  )

  historial = historial.reverse()
} catch (error) {
  console.error("No se pudo cargar historial:", error)
}

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
    if (esSaludo) {
      return NextResponse.json({
        success: true,
        categoria: "general",
        pregunta: body.mensaje,
        respuesta:
          "👋 ¡Hola! Soy el asistente de Ofimundo.\nPuedo ayudarte con 🖨️ impresión, 🤝 salas colaborativas o ⚙️ automatizaciones.\n¿Qué necesitas?",
        productos: [],
      })
    }


    const intencionIA = await interpretarConsultaConIA(
      String(body.mensaje ?? ""),
      contextoConversacion
    )

    if (intencionIA) {
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

    const categoria =
      intencionIA?.categoria && intencionIA.categoria !== "general"
        ? intencionIA.categoria
        : intencionIA?.categoria === "general"
          ? "general"
          : esDaas
        ? "daas"
        : esAutomatizacion
          ? "automatizaciones"
          : esSala
            ? "salas"
            : mensajeEsContinuacion && categoriaAnterior
              ? categoriaAnterior
              : "equipos"

    if (categoria === "general") {
      return NextResponse.json({
        success: true,
        categoria: "general",
        pregunta: body.mensaje,
        respuesta:
          "👋 ¡Hola! Puedo ayudarte con 🖨️ impresión, 🤝 salas colaborativas o ⚙️ automatizaciones.\n¿Qué necesitas?",
        productos: [],
      })
    }

    /*
     * DaaS
     */

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
          "Soporte y mantenimiento",
          "Acceso a tecnología actualizada sin realizar una compra inicial importante",
        ],
      }

      const respuesta = await consultarGroq(
        `
Eres el asistente comercial virtual de Ofimundo.

El cliente está consultando sobre DaaS.

REGLAS:
- Responde siempre en español.
- Sé breve, directo y fácil de leer.
- Máximo 5 líneas salvo que el usuario pida más detalle.
- No uses tablas Markdown.
- Usa listas cortas cuando existan varias opciones.
- Puedes usar emojis simples como ✅, 🔹, 1️⃣, 2️⃣ y 3️⃣.
- No repitas información innecesaria.
- Si muestras alternativas, presenta máximo 3.
- Termina con una sola pregunta corta para continuar.
- Si el usuario responde solo con un número o una referencia corta, interpreta que está eligiendo una opción de la conversación anterior.
- Utiliza solamente la información proporcionada.
- No inventes precios, marcas, modelos, stock ni condiciones comerciales.
- Explica DaaS de forma clara y comercial.
- Si el cliente quiere contratar o cotizar, indícale que puede solicitar asesoría comercial.

ESTILO DE CONVERSACIÓN:
- Responde de forma breve, natural y comercial.
- Usa máximo 3 o 4 líneas salvo que el usuario pida más detalle.
- Puedes usar emojis simples cuando ayuden a leer mejor.
- No uses tablas Markdown.
- No hagas más de una pregunta a la vez.
- Si falta información, pregunta solamente el dato más importante.
- No repitas la misma pregunta.
- Si presentas opciones, muestra máximo 3.

- Si la interfaz mostrará productos recomendados en tarjetas visuales, NO repitas en el texto los nombres, modelos, velocidades, capacidades ni especificaciones de esos productos.
- Cuando haya productos recomendados, responde con una introducción breve de máximo 2 líneas.
- No enumeres nuevamente los productos que aparecerán en las tarjetas.
- Si necesitas continuar la conversación, termina con una sola pregunta corta.

- Evita explicaciones largas y párrafos extensos.
- Termina con una sola pregunta corta cuando necesites continuar.

`,
        `
Consulta del cliente:
${mensajeConContexto}

Información oficial:
${JSON.stringify(informacionDaas)}
`
      )

      return NextResponse.json({
        success: true,
        categoria: "daas",
        pregunta: body.mensaje,
        respuesta,
        productos: [],
      })
    }

    /*
     * SALAS COLABORATIVAS
     */

    if (categoria === "salas") {
      const salas = await executeQuery<Record<string, unknown>>(
        `
        SELECT *
        FROM [THE_COOLER_SGCX].[MPR].[VT_SEL_SALA_DETALLE]
        `
      )

      const salasFiltradas = intencionIA?.tamano
        ? salas.filter((sala: any) =>
            normalizar(String(sala.tamano_sala ?? "")) ===
            normalizar(`Tamaño ${intencionIA.tamano}`)
          )
        : salas

      const respuesta = await consultarGroq(
        `
Eres el asistente comercial virtual de Ofimundo.

El cliente está consultando sobre salas colaborativas.

REGLAS:
- Responde siempre en español.
- Sé breve, directo y fácil de leer.
- Máximo 5 líneas salvo que el usuario pida más detalle.
- No uses tablas Markdown.
- Usa listas cortas cuando existan varias opciones.
- Puedes usar emojis simples como ✅, 🔹, 1️⃣, 2️⃣ y 3️⃣.
- No repitas información innecesaria.
- Si muestras alternativas, presenta máximo 3.
- Termina con una sola pregunta corta para continuar.
- Si el usuario responde solo con un número o una referencia corta, interpreta que está eligiendo una opción de la conversación anterior.
- Utiliza únicamente las salas proporcionadas.
- No inventes características, precios ni disponibilidad.
- Recomienda como máximo 3 alternativas.
- Si la consulta no entrega suficiente información, pregunta por el tamaño o necesidad de la sala.
- No menciones SQL, JSON, API ni detalles internos.

ESTILO DE CONVERSACIÓN:
- Responde de forma breve, natural y comercial.
- Usa máximo 3 o 4 líneas salvo que el usuario pida más detalle.
- Puedes usar emojis simples cuando ayuden a leer mejor.
- No uses tablas Markdown.
- No hagas más de una pregunta a la vez.
- Si falta información, pregunta solamente el dato más importante.
- No repitas la misma pregunta.
- Si presentas opciones, muestra máximo 3.

- Si la interfaz mostrará productos recomendados en tarjetas visuales, NO repitas en el texto los nombres, modelos, velocidades, capacidades ni especificaciones de esos productos.
- Cuando haya productos recomendados, responde con una introducción breve de máximo 2 líneas.
- No enumeres nuevamente los productos que aparecerán en las tarjetas.
- Si necesitas continuar la conversación, termina con una sola pregunta corta.

- Evita explicaciones largas y párrafos extensos.
- Termina con una sola pregunta corta cuando necesites continuar.

`,
        `
Consulta del cliente:
${mensajeConContexto}

Salas disponibles:
${JSON.stringify(salasFiltradas)}
`
      )

      return NextResponse.json({
        success: true,
        categoria: "salas",
        pregunta: body.mensaje,
        respuesta,
        productos: salasFiltradas,
      })
    }

    /*
     * AUTOMATIZACIONES
     */

    if (categoria === "automatizaciones") {
      const automatizaciones = await executeQuery<Record<string, unknown>>(
        `
        SELECT *
        FROM [THE_COOLER_SGCX].[MPR].[VT_SEL_AUTOMATIZACION]
        `
      )

      const respuesta = await consultarGroq(
        `
Eres el asistente comercial virtual de Ofimundo.

El cliente está consultando sobre automatizaciones.

REGLAS:
- Responde siempre en español.
- Sé breve, directo y fácil de leer.
- Máximo 5 líneas salvo que el usuario pida más detalle.
- No uses tablas Markdown.
- Usa listas cortas cuando existan varias opciones.
- Puedes usar emojis simples como ✅, 🔹, 1️⃣, 2️⃣ y 3️⃣.
- No repitas información innecesaria.
- Si muestras alternativas, presenta máximo 3.
- Termina con una sola pregunta corta para continuar.
- Si el usuario responde solo con un número o una referencia corta, interpreta que está eligiendo una opción de la conversación anterior.
- Utiliza únicamente las automatizaciones proporcionadas.
- No inventes funcionalidades, precios ni disponibilidad.
- Recomienda como máximo 3 opciones.
- Explica brevemente cuál podría ajustarse a la necesidad del cliente.
- No menciones SQL, JSON, API ni detalles internos.

ESTILO DE CONVERSACIÓN:
- Responde de forma breve, natural y comercial.
- Usa máximo 3 o 4 líneas salvo que el usuario pida más detalle.
- Puedes usar emojis simples cuando ayuden a leer mejor.
- No uses tablas Markdown.
- No hagas más de una pregunta a la vez.
- Si falta información, pregunta solamente el dato más importante.
- No repitas la misma pregunta.
- Si presentas opciones, muestra máximo 3.

- Si la interfaz mostrará productos recomendados en tarjetas visuales, NO repitas en el texto los nombres, modelos, velocidades, capacidades ni especificaciones de esos productos.
- Cuando haya productos recomendados, responde con una introducción breve de máximo 2 líneas.
- No enumeres nuevamente los productos que aparecerán en las tarjetas.
- Si necesitas continuar la conversación, termina con una sola pregunta corta.

- Evita explicaciones largas y párrafos extensos.
- Termina con una sola pregunta corta cuando necesites continuar.

`,
        `
Consulta del cliente:
${mensajeConContexto}

Automatizaciones disponibles:
${JSON.stringify(automatizaciones)}
`
      )

      return NextResponse.json({
        success: true,
        categoria: "automatizaciones",
        pregunta: body.mensaje,
        respuesta,
        productos: automatizaciones,
      })
    }

    /*
     * EQUIPOS / IMPRESORAS / MULTIFUNCIONALES
     */

    const rows = await executeQuery<ProductoRow>(
      `SELECT * FROM ${VISTA_PRODUCTO_DETALLE}`
    )

    const productos = rows.map(mapProducto)

    const marcasDisponibles = [
      "xerox",
      "kyocera",
      "brother",
      "epson",
      "lexmark",
      "hp",
      "canon",
    ]

    const marcaSolicitada = marcasDisponibles.find((marca) =>
      pregunta.includes(marca)
    )

    let colorSolicitado: "color" | "bn" | null = null

    if (
      contiene(pregunta, [
        "blanco y negro",
        "blanco negro",
        "monocromo",
        "monocromatica",
        "monocromatico",
      ])
    ) {
      colorSolicitado = "bn"
    } else if (pregunta.includes("color")) {
      colorSolicitado = "color"
    }

    let formatoSolicitado: "A3" | "A4" | null = null

    if (/\ba3\b/i.test(pregunta)) {
      formatoSolicitado = "A3"
    } else if (/\ba4\b/i.test(pregunta)) {
      formatoSolicitado = "A4"
    }

    let tipoSolicitado: "Multifuncional" | "Impresora" | null = null

    if (
      contiene(pregunta, [
        "multifuncional",
        "multifuncion",
        "copiar",
        "escanear",
        "scanner",
        "escaner",
      ])
    ) {
      tipoSolicitado = "Multifuncional"
    } else if (pregunta.includes("impresora")) {
      tipoSolicitado = "Impresora"
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

    const resultados = productos
      .filter((producto) => {
        const marca = normalizar(producto.Nombre_Marca)
        const color = normalizar(producto.Color_Equipo)
        const formato = normalizar(producto.Tamano_Papel_Equipo)
        const tipo = normalizar(producto.Tipo_Equipo)

        if (marcaSolicitada && marca !== marcaSolicitada) {
          return false
        }

        if (colorSolicitado === "color" && color !== "color") {
          return false
        }

        if (
          colorSolicitado === "bn" &&
          !contiene(color, ["blanco y negro", "monocromo"])
        ) {
          return false
        }

        if (
          formatoSolicitado &&
          !formato.includes(formatoSolicitado.toLowerCase())
        ) {
          return false
        }

        if (
          tipoSolicitado &&
          tipo !== normalizar(tipoSolicitado)
        ) {
          return false
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

        return {
          ...producto,
          coincidencias,
        }
      })
      .sort((a, b) => {
        if (b.coincidencias !== a.coincidencias) {
          return b.coincidencias - a.coincidencias
        }

        return (
          (b.Velocidad_BN_Equipo ?? 0) -
          (a.Velocidad_BN_Equipo ?? 0)
        )
      })
      .slice(0, 5)

    if (resultados.length === 0) {
      return NextResponse.json({
        success: true,
        categoria: "equipos",
        pregunta: body.mensaje,
        filtros_detectados: {
          marca: marcaSolicitada ?? null,
          color: colorSolicitado,
          formato: formatoSolicitado,
          tipo: tipoSolicitado,
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

    const respuesta = await consultarGroq(
      `
Eres el asistente comercial virtual de Ofimundo.

Tu función es ayudar a clientes a elegir impresoras y equipos de impresión.

REGLAS OBLIGATORIAS:
- Responde siempre en español.
- Sé breve, directo y fácil de leer.
- Máximo 5 líneas salvo que el usuario pida más detalle.
- No uses tablas Markdown.
- Usa listas cortas cuando existan varias opciones.
- Puedes usar emojis simples como ✅, 🔹, 1️⃣, 2️⃣ y 3️⃣.
- No repitas información innecesaria.
- Si muestras alternativas, presenta máximo 3.
- Termina con una sola pregunta corta para continuar.
- Si el usuario responde solo con un número o una referencia corta, interpreta que está eligiendo una opción de la conversación anterior.
- Usa solamente la información de los productos proporcionados.
- No inventes modelos, precios, stock ni especificaciones.
- Nunca deduzcas modelos desde una URL o imagen.
- Nunca mezcles una marca con un modelo de otra marca.
- Menciona un modelo solamente si aparece claramente en el nombre o descripción.
- Si el modelo no está claro, menciona solamente la marca y características.
- No hagas afirmaciones generales sobre costos, ahorro o durabilidad si no están en los datos.
- Recomienda como máximo 3 equipos.
- Si el usuario entrega volumen mensual, prioriza equipos cuyo ciclo recomendado cubra ese volumen.
- Si el usuario pregunta qué impresora recomienda sin entregar datos suficientes, haz solo una pregunta inicial, preferentemente si necesita color o blanco y negro.
- No menciones SQL, JSON, APIs ni detalles técnicos internos.

ESTILO DE CONVERSACIÓN:
- Responde de forma breve, natural y comercial.
- Usa máximo 3 o 4 líneas salvo que el usuario pida más detalle.
- Puedes usar emojis simples cuando ayuden a leer mejor.
- No uses tablas Markdown.
- No hagas más de una pregunta a la vez.
- Si falta información, pregunta solamente el dato más importante.
- No repitas la misma pregunta.
- Si presentas opciones, muestra máximo 3.

- Si la interfaz mostrará productos recomendados en tarjetas visuales, NO repitas en el texto los nombres, modelos, velocidades, capacidades ni especificaciones de esos productos.
- Cuando haya productos recomendados, responde con una introducción breve de máximo 2 líneas.
- No enumeres nuevamente los productos que aparecerán en las tarjetas.
- Si necesitas continuar la conversación, termina con una sola pregunta corta.

- Evita explicaciones largas y párrafos extensos.
- Termina con una sola pregunta corta cuando necesites continuar.

`,
      `
Consulta del cliente:
${mensajeConContexto}

Productos encontrados:
${JSON.stringify(productosParaIA)}
`
    )

    /*
     * GUARDAR HISTORIAL
     */


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
          mensaje_usuario: body.mensaje,
          respuesta_bot: respuesta,
          productos_recomendados: JSON.stringify(
            resultados.map((producto) => ({
              id: producto.ID_Producto,
              marca: producto.Nombre_Marca,
              nombre: producto.Nombre_Equipo,
            }))
          ),
          filtros_detectados: JSON.stringify({
            marca: marcaSolicitada ?? null,
            color: colorSolicitado,
            formato: formatoSolicitado,
            tipo: tipoSolicitado,
          }),
        }
      )
    } catch (errorRegistro) {
      console.error("Error guardando conversación:", errorRegistro)
    }

    return NextResponse.json({
      success: true,
      categoria: "equipos",
      sesion_id: sesionId,
      pregunta: body.mensaje,
      filtros_detectados: {
        marca: marcaSolicitada ?? null,
        color: colorSolicitado,
        formato: formatoSolicitado,
        tipo: tipoSolicitado,
      },
      total: resultados.length,
      respuesta,
      productos: resultados,
    })
  } catch (error) {
    console.error("Error chatbot:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Error procesando la consulta",
      },
      { status: 500 }
    )
  }
}
