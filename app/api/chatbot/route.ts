import { NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import equiposData from "@/data/equipos.json"
import salasData from "@/data/salas.json"
import automatizacionesData from "@/data/automatizaciones.json"

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
    if (!sesionId || !mensajeUsuario) return

    await executeQuery(
      `
      INSERT INTO [MPR].[CHATBOT_CONVERSACION]
      (
        sesion_id,
        mensaje_usuario,
        respuesta_bot,
        productos_recomendados,
        filtros_detectados,
        fecha_registro
      )
      VALUES
      (
        @sesion_id,
        @mensaje_usuario,
        @respuesta_bot,
        @productos_recomendados,
        @filtros_detectados,
        SYSDATETIME()
      )
      `,
      {
        sesion_id: String(sesionId).slice(0, 100),
        mensaje_usuario: String(mensajeUsuario),
        respuesta_bot: respuestaBot ? String(respuestaBot) : null,
        productos_recomendados:
          productosRecomendados && productosRecomendados.length > 0
            ? JSON.stringify(productosRecomendados)
            : null,
        filtros_detectados:
          filtrosDetectados && Object.keys(filtrosDetectados).length > 0
            ? JSON.stringify(filtrosDetectados)
            : null,
      }
    )
  } catch (error) {
    // Auditoría pasiva: el error en base de datos nunca interrumpe la respuesta al usuario
    console.error("Error al registrar auditoría en [MPR].[CHATBOT_CONVERSACION]:", error)
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
  const normTexto = normalizar(texto)
  return palabras.some((palabra) => normTexto.includes(normalizar(palabra)))
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
  if (!texto) return null
  const norm = limpiarTextoTokens(texto)
  if (!norm) return null

  // 1. Detección de cambio explícito de un modo a otro
  if (
    /(?:cambi(?:o|ar)?|pasar|migrar|en\s+vez\s+de|en\s+lugar\s+de|de)\s+color\s+a\s+(?:monocromo|monocromatico|monocromatica|blanco\s+y\s+negro|b\/n|bn|negro)/i.test(norm) ||
    /\b(sin\s+color|no\s+a\s+color|no\s+en\s+color|no\s+color|cero\s+color)\b/i.test(norm)
  ) {
    return "monocromo"
  }

  if (
    /(?:cambi(?:o|ar)?|pasar|migrar|en\s+vez\s+de|en\s+lugar\s+de|de)\s+(?:monocromo|monocromatico|monocromatica|blanco\s+y\s+negro|b\/n|bn|negro)\s+a\s+color/i.test(norm)
  ) {
    return "color"
  }

  // 2. Si menciona monocromo / blanco y negro explícitamente en el texto
  const tieneMono = /\b(blanco\s+y\s+negro|blanco\s+negro|monocromo|monocramatica|monocromatica|monocromatico|mono|b\/n|b\s*y\s*n|solo\s+negro)\b/i.test(norm)
  const tieneColor = /\b(full\s+color|a\s+color|en\s+color|colores)\b/i.test(norm) || (/\bcolor\b/i.test(norm) && !/(?:cambi(?:o|ar)?|de)\s+color/i.test(norm))

  if (tieneMono && !tieneColor) return "monocromo"
  if (tieneColor && !tieneMono) return "color"
  if (tieneMono && tieneColor) {
    if (/\b(?:a|hacia|prefiero|mejor)\s+(?:monocromo|monocromatico|monocromatica|blanco\s+y\s+negro|b\/n|bn|negro)\b/i.test(norm)) return "monocromo"
    if (/\b(?:a|hacia|prefiero|mejor)\s+color\b/i.test(norm)) return "color"
    return "monocromo"
  }

  return null
}

function resolverNombreEquipo(equipo: any): string {
  if (equipo?.Nombre_Equipo && equipo.Nombre_Equipo.trim()) {
    return equipo.Nombre_Equipo.trim()
  }
  const img = equipo?.Imagen_Equipo || ""
  const match = img.match(/\/(\d+-[^/]+)\.(webp|png|jpe?g)$/i)
  if (match) {
    let clean = match[1].replace(/^\d+-/, "")
    if (clean.startsWith("DCPL")) clean = clean.replace("DCPL", "DCP-L")
    if (clean.startsWith("MFCL")) clean = clean.replace("MFCL", "MFC-L")
    return clean.replace(/[-_]/g, " ")
  }
  return `${equipo?.Nombre_Marca || ""} ${equipo?.Tipo_Equipo || ""}`.trim()
}

function extraerPPMObjetivo(texto: string): number | null {
  if (!texto) return null
  const norm = normalizar(texto)
  const m = norm.match(/\b(\d{2,3})\s*(ppm|paginas?\s*(por\s*minuto|\/min))\b/i)
  if (m) {
    const val = parseInt(m[1], 10)
    if (val >= 15 && val <= 150) return val
  }
  const mContext = norm.match(/\b(ninguna\s+de|tienen\s+de|alguna\s+de|una\s+de|al\s+menos\s+de|de)\s+(\d{2,3})\b/i)
  if (mContext) {
    const val = parseInt(mContext[2], 10)
    if (val >= 15 && val <= 150) return val
  }
  return null
}

function detectarConsultaMasRapida(texto: string): boolean {
  const norm = normalizar(texto)
  if (/\b(mas|más)\s+(rapida|rápida|veloz|rapido|rápido|ppm|rspida|rapda)\b/i.test(norm)) return true
  if (/\b(mayor|maxima|máxima)\s+(velocidad|rapidez|ppm)\b/i.test(norm)) return true
  if (/\b(cual|cuál)\s+es\s+la\s+m[aá]s\s+r/i.test(norm)) return true
  return contiene(norm, [
    "mas rapida",
    "más rápida",
    "mas veloz",
    "más veloz",
    "mayor velocidad",
    "maxima velocidad",
    "máxima velocidad",
    "mas rapido",
    "más rápido",
    "mayor ppm",
    "mas ppm",
    "más ppm",
    "cual es la mas rapida",
    "cuál es la más rápida",
    "cual es mas rapida",
    "cuál es más rápida",
    "de mayor velocidad",
  ])
}

function detectarConsultaEconomica(texto: string): boolean {
  const norm = normalizar(texto)
  if (/\b(mas|más)\s+(economica|económica|barata|conveniente)\b/i.test(norm)) return true
  if (/\b(menor\s+costo|costo\s+por\s+pagina|ahorro|ahorrar|gasta\s+menos)\b/i.test(norm)) return true
  return contiene(norm, [
    "economica",
    "económica",
    "mas barata",
    "más barata",
    "menor costo",
    "ahorro",
    "gasta menos",
    "costo por pagina",
  ])
}

function detectarConsultaCatalogoCompleto(texto: string): boolean {
  const norm = normalizar(texto)
  if (/\b(catalogo|catálogo)\b/.test(norm)) return true
  if (/\b(disponibles?|que\s+tienen?|que\s+tienes?)\b/.test(norm)) return true
  if (/\b(de\s+tod[ao]s?|tod[ao]s?\s+l[ao]s?)\b/.test(norm)) return true
  return contiene(norm, [
    "todo el catalogo",
    "de todo el catalogo",
    "en todo el catalogo",
    "del catalogo",
    "que tienes",
    "que tienen",
    "todas las impresoras",
    "todas la impresoras",
    "todos los equipos",
    "de todas",
    "de todos",
  ])
}

function detectarSolicitudAlternativas(texto: string): boolean {
  const norm = normalizar(texto)
  if (!norm) return false
  if (
    /\b(otra|otras|otro|otros|demas|demás|adicional|adicionales|diferente|diferentes)\s+(alternativa|alternativas|opcion|opción|opciones|modelo|modelos|equipo|equipos|recomendacion|recomendaciones|solucion|soluciones|proceso|procesos|automatizacion|automatizaciones)\b/i.test(
      norm
    )
  ) {
    return true
  }
  if (/\b(que\s+otra|que\s+otras|que\s+otro|que\s+otros|tienes\s+otra|tienes\s+otras|hay\s+otra|hay\s+otras|alguna\s+otra|algunas\s+otras)\b/i.test(norm)) return true
  if (
    /\b(que\s+mas\s+tienes|que\s+mas\s+hay|muestrame\s+mas|ver\s+mas\s+opciones|mostrar\s+otras|muestrame\s+otras|otras\s+soluciones|otra\s+solucion|otras\s+automatizaciones|otra\s+automatizacion|otros\s+procesos|otro\s+proceso)\b/i.test(
      norm
    )
  ) {
    return true
  }
  return contiene(norm, [
    "otras alternativas",
    "otra alternativa",
    "otras opciones",
    "otra opcion",
    "otra opción",
    "otras recomendaciones",
    "otra recomendacion",
    "otra recomendación",
    "otras soluciones",
    "otra solucion",
    "otra solución",
    "otros procesos",
    "otro proceso",
    "otras automatizaciones",
    "otra automatizacion",
    "otra automatización",
    "mas alternativas",
    "más alternativas",
    "mas opciones",
    "más opciones",
    "mas soluciones",
    "más soluciones",
    "que mas tienes",
    "qué más tienes",
    "que mas hay",
    "qué más hay",
  ])
}

function detectarSolicitudOtraMarca(texto: string): boolean {
  const norm = normalizar(texto)
  if (!norm) return false
  if (
    /\b(otra|otras|diferente|diferentes|cambiar\s+de)\s+marcas?\b/i.test(norm) ||
    /\b(de|en)\s+otra\s+marca\b/i.test(norm) ||
    /\b(de|en)\s+otras\s+marcas\b/i.test(norm) ||
    /\bopciones\s+(?:de\s+|en\s+)?otras\s+marcas\b/i.test(norm) ||
    /\btienes\s+(?:de\s+|en\s+)?otras?\s+marcas?\b/i.test(norm)
  ) {
    return true
  }
  return contiene(norm, [
    "otras marcas",
    "otra marca",
    "de otra marca",
    "en otra marca",
    "de otras marcas",
    "en otras marcas",
    "cambiar marca",
    "cambio de marca",
    "cambiar de marca",
    "no de esa marca",
    "no de esta marca",
  ])
}

function obtenerFamiliaAutomatizacion(item: any): "facturas" | "saldos" | "finiquitos" | "cuentas" | "otras" {
  if (!item) return "otras"
  const texto = normalizar(
    `${item.ID_Producto ?? ""} ${item.slug ?? ""} ${item.nombre ?? ""} ${item.nombreCorto ?? ""} ${item.categoria ?? ""} ${item.resumen ?? ""} ${item.descripcion ?? ""}`
  )
  if (texto.includes("aprrch") || texto.includes("factura") || texto.includes("dte") || texto.includes("sii")) {
    return "facturas"
  }
  if (texto.includes("sldbnc") || texto.includes("saldo") || texto.includes("bancari") || texto.includes("banco")) {
    return "saldos"
  }
  if (texto.includes("fnqt") || texto.includes("finiquito") || texto.includes("rrhh") || texto.includes("laboral") || texto.includes(" dt") || texto.includes("dt ")) {
    return "finiquitos"
  }
  if (texto.includes("gsct") || texto.includes("gesdoc") || texto.includes("cuenta") || texto.includes("contabil") || texto.includes("asiento")) {
    return "cuentas"
  }
  return "otras"
}

function extraerMarcaDeTexto(texto: string | null | undefined): string | null {
  if (!texto) return null
  const norm = normalizar(texto)
  if (!norm) return null

  // Marcas Oficiales de Ofimundo
  if (/\b(kyocera|kyosera|kiosera|kiocera|quiosera|quiocera|kiyocera|kyocers|kyosela)\b/i.test(norm)) {
    return "kyocera"
  }
  if (/\b(brother|broder|broter|brotel|brodher|broders|brothers)\b/i.test(norm)) {
    return "brother"
  }
  if (/\b(xerox|serox|zerox|xeros|xeroxs)\b/i.test(norm)) {
    return "xerox"
  }
  if (/\b(epson|epzon|hepson|epsom|epsonn)\b/i.test(norm)) {
    return "epson"
  }
  if (/\b(lexmark|lesmark|lexmar|lexmart|lemark|lexmarkk)\b/i.test(norm)) {
    return "lexmark"
  }

  // Marcas Externas NO comercializadas (para detectar que el cliente preguntó por una marca fuera de catálogo)
  if (/\b(hp|hewlett\s*packard|hewlett)\b/i.test(norm)) {
    return "hp"
  }
  if (/\b(canon|kannon|kanon)\b/i.test(norm)) {
    return "canon"
  }
  if (/\b(ricoh|rico)\b/i.test(norm)) {
    return "ricoh"
  }
  if (/\b(konica|minolta|konica\s*minolta)\b/i.test(norm)) {
    return "konica minolta"
  }
  if (/\b(sharp)\b/i.test(norm)) {
    return "sharp"
  }
  if (/\b(toshiba)\b/i.test(norm)) {
    return "toshiba"
  }
  if (/\b(pantum)\b/i.test(norm)) {
    return "pantum"
  }
  if (/\b(oki|okidata)\b/i.test(norm)) {
    return "oki"
  }
  if (/\b(dell)\b/i.test(norm)) {
    return "dell"
  }
  if (/\b(samsung)\b/i.test(norm)) {
    return "samsung"
  }

  return null
}

function normalizarEspacios(str: string | null | undefined): string {
  return (str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function detectarModelosEspecificosEnTexto(texto: string, catalogo: any[]): any[] {
  if (!texto) return []
  const normTexto = normalizarEspacios(texto)
  const matches: any[] = []

  for (const p of catalogo) {
    const nomNorm = normalizarEspacios(p.Nombre_Equipo || "")
    if (nomNorm.length >= 4 && normTexto.includes(nomNorm)) {
      if (!matches.some((m) => m.ID_Producto === p.ID_Producto)) {
        matches.push(p)
      }
      continue
    }

    const partes = nomNorm.split(" ").filter((part: string) => /[0-9]/.test(part) && part.length >= 4)
    for (const parte of partes) {
      const regex = new RegExp(`\\b${parte}\\b`, "i")
      if (regex.test(normTexto)) {
        if (!matches.some((m) => m.ID_Producto === p.ID_Producto)) {
          matches.push(p)
        }
        break
      }
    }
  }

  return matches
}

function detectarModeloEspecificoEnTexto(texto: string, catalogo: any[]): any | null {
  const lista = detectarModelosEspecificosEnTexto(texto, catalogo)
  return lista.length > 0 ? lista[0] : null
}

function extraerVolumenDeTexto(texto: string, ultimoMensajeBot?: string): number | null {
  if (!texto) return null
  let norm = limpiarTextoTokens(texto)

  // Ignorar menciones explícitas de velocidad en ppm (ej: "35 ppm", "65 ppm") para no confundir con volumen mensual
  norm = norm.replace(/\b\d{1,3}\s*(ppm|paginas?\s*(por\s*minuto|\/min))\b/gi, "")

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

  // Aceptar un número entero suelto entre 100 y 500.000 directamente (ej. "10000", "5000", "1000")
  const matchesNumero = textoLimpio.match(/\b(\d{3,6})\b/g)
  if (matchesNumero) {
    for (const numStr of matchesNumero) {
      const val = parseInt(numStr, 10)
      if (val >= 100 && val <= 500000) {
        return val
      }
    }
  }

  return null
}

export class GroqRateLimitError extends Error {
  constructor(message?: string) {
    super(message || "Groq Rate Limit Exceeded")
    this.name = "GroqRateLimitError"
  }
}

export const MENSAJE_FUERA_DE_SERVICIO =
  "⚠️ El asistente virtual se encuentra fuera de servicio o recibiendo muchas consultas en este momento. Por favor, vuelve a intentarlo en un rato o contáctanos directamente."

export const MENSAJE_FUERA_DE_AMBITO =
  "Como asistente virtual de Ofimundo, solo puedo orientarte sobre nuestro catálogo de equipos de impresión MPS, salas colaborativas de videoconferencia y automatizaciones de procesos empresariales."

function limpiarPreguntasAlFinal(texto: string | null | undefined): string {
  if (!texto) return ""

  let limpio = texto.trim()

  // 1. Si existe '¿', truncar inmediatamente todo lo que empiece desde '¿'
  if (limpio.includes("¿")) {
    limpio = limpio.split("¿")[0].trim()
  }

  // 2. Si existe '?', recortar hasta el último punto '.' anterior al primer '?'
  if (limpio.includes("?")) {
    const primerInterrogacion = limpio.indexOf("?")
    const partePrevia = limpio.substring(0, primerInterrogacion)
    const ultimoPunto = partePrevia.lastIndexOf(".")
    if (ultimoPunto !== -1) {
      limpio = partePrevia.substring(0, ultimoPunto + 1).trim()
    } else {
      limpio = partePrevia.trim()
    }
  }

  // 3. Patrones de cierre o preguntas sin signo de interrogación
  const patronesPreguntaOCierre = [
    /\b(te gustaría|te gustaria|prefieres|deseas|quieres|te interesa)\b/i,
    /\b(envíe|envie|enviarte|mandarte|hacerte llegar|compartirte)\s+(la\s+)?(cotización|cotizacion|ficha|información|informacion|detalles)\b/i,
    /\b(opciones\s+de\s+(conectividad|red|consumo|entrega)|disponibilidad)\b/i,
    /\b(cuéntame|cuentame|dime\s+si|avísame|avisame|quedo\s+atento|quedo\s+a\s+tu\s+disposición|quedo\s+a\s+tu\s+disposicion)\b/i,
    /\b(si\s+(quieres|deseas|necesitas|buscas)\s+(que\s+te|saber|conocer))\b/i,
    /\b(hacer\s+una\s+pregunta|alguna\s+duda|otra\s+consulta|otra\s+pregunta)\b/i,
    /\b(conectividad|wi-fi|wifi|usb)\??$/i
  ]

  // Limpiar líneas individuales que contengan patrones de cierre
  let lineas = limpio.split("\n").map((l) => l.trim()).filter(Boolean)
  lineas = lineas.filter((linea) => !patronesPreguntaOCierre.some((regex) => regex.test(linea)))
  limpio = lineas.join(" ")

  // Limpiar oraciones finales que contengan patrones de cierre
  let oraciones = limpio.split(/(?<=\.)\s+/).map((o) => o.trim()).filter(Boolean)
  while (oraciones.length > 0) {
    const ultimaOracion = oraciones[oraciones.length - 1]
    const esPreguntaOCierre = patronesPreguntaOCierre.some((regex) => regex.test(ultimaOracion))
    if (esPreguntaOCierre) {
      oraciones.pop()
    } else {
      break
    }
  }

  limpio = oraciones.join(" ").trim()

  // 4. Normalizar puntuación
  limpio = limpio
    .replace(/\s+/g, " ")
    .replace(/[,;:]\s*$/, ".")
    .trim()

  if (limpio && !/[.!]$/.test(limpio)) {
    limpio += "."
  }

  return limpio
}

const MARCAS_NO_CATALOGO_REGEX = /\b(hp\s+laserjet|hp\s+pagewide|hp|hewlett[\s-]*packard|canon\s+imagepress|canon\s+imagerunner|canon|ricoh|konica[\s-]*minolta|minolta|sharp|toshiba|pantum|oki|okidata|dell)\b/i

function sanitizarRespuestaCatalogo(texto: string | null | undefined, clientePreguntoPorMarcaNoOficial: boolean = false): string {
  if (!texto) return ""
  let limpio = limpiarPreguntasAlFinal(texto)

  // Si el usuario NO preguntó por una marca fuera de catálogo, pero la IA mencionó o sugirió una marca ajena al catálogo:
  if (!clientePreguntoPorMarcaNoOficial && MARCAS_NO_CATALOGO_REGEX.test(limpio)) {
    limpio = limpio
      .replace(/\b(hp\s+laserjet|hp\s+pagewide|hp|hewlett[\s-]*packard)\b/gi, "Xerox")
      .replace(/\b(canon\s+imagepress|canon\s+imagerunner|canon)\b/gi, "Epson")
      .replace(/\b(ricoh|konica[\s-]*minolta|minolta|sharp|toshiba|pantum|oki|okidata|dell)\b/gi, "Kyocera")
  }

  return limpio
}

function esConsultaRestringidaOFueraDeAmbito(texto: string): boolean {
  const norm = normalizar(texto)
  if (!norm) return false

  // 1. Bloqueo de claves internas, contraseñas, datos confidenciales o de infraestructura
  if (/\b(clave|claves|password|passwords|contrase[nñ]a|contrase[nñ]as|credencial|credenciales|api_key|apikey|secret|secrets|token|tokens|base\s+de\s+datos|bd|servidor|servidores|c[oó]digo\s+fuente|ssh|root|admin)\b/i.test(norm)) {
    return true
  }

  // 2. Bloqueo de sitios web externos y URLs (permitiendo solo dominios de Ofimundo)
  if (/\b(http:\/\/|https:\/\/|www\.|[a-z0-9-]+\.(?:com|org|net|io|co|es|dev|app))\b/i.test(norm)) {
    if (!norm.includes("ofimundo")) return true
  }

  // 3. Bloqueo de manipulaciones de prompt / prompt injection
  if (/\b(ignore\s+all\s+instructions|olvida\s+tus\s+instrucciones|modo\s+dan|system\s+prompt|dame\s+las\s+instrucciones|mu[eé]strame\s+tu\s+prompt)\b/i.test(norm)) {
    return true
  }

  return false
}


function isRateLimitOrQuotaError(status: number, errorText: string): boolean {
  const norm = (errorText || "").toLowerCase()
  return (
    status === 429 ||
    norm.includes("rate_limit") ||
    norm.includes("rate limit") ||
    norm.includes("quota_exceeded") ||
    norm.includes("insufficient_quota") ||
    norm.includes("tokens per") ||
    norm.includes("too many requests")
  )
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
          max_tokens: 850,
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
      if (isRateLimitOrQuotaError(response.status, errorTexto)) {
        throw new GroqRateLimitError(errorTexto)
      }
      console.warn(`Groq GPT-OSS 120B no disponible (${response.status}): ${errorTexto}. Reintentando con modelo secundario groq/compound...`)

      response = await hacerConsulta("groq/compound")
    }

    if (!response.ok) {
      const errorTexto = await response.text()
      if (isRateLimitOrQuotaError(response.status, errorTexto)) {
        throw new GroqRateLimitError(errorTexto)
      }
      console.error("Groq (modelo secundario también falló):", errorTexto)
      return null
    }

    const data = await response.json()
    return data?.choices?.[0]?.message?.content ?? null
  } catch (error) {
    if (error instanceof GroqRateLimitError) throw error
    console.error("Error al consultar Groq:", error)
    return null
  }
}


type IntencionChatbot = {
  categoria: "equipos" | "salas" | "automatizaciones" | "general"
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
  es_pregunta_seguimiento: boolean
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
          max_tokens: 1000,
          response_format: {
            type: "json_object",
          },
          messages: [
            {
              role: "system",
              content: `
Eres el intérprete de intención del asistente comercial autónomo de Ofimundo.

Tu tarea es analizar la consulta del usuario y el historial previo para extraer la intención y deducir sus necesidades de forma inteligente.

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
  "detalles_suficientes": true,
  "es_pregunta_seguimiento": false
}

Categorías válidas:
- equipos (impresoras, multifuncionales, equipos de impresión)
- salas (salas colaborativas, videoconferencia, salas de reunión)
- automatizaciones (procesos, facturas, finiquitos, cuentas)
- general (saludos, preguntas institucionales)

Reglas de deducción:
- marca: extrae la marca mencionada por el usuario (ej: "xerox", "kyocera", "epson", "brother", "lexmark", "hp", "canon", etc.). Si no menciona marca, asigna null.
- es_pregunta_seguimiento: asigna true si el usuario hace una pregunta sobre los productos o temas previamente discutidos (ej: "¿cuál es más rápida?", "¿tienen wifi?", "¿qué garantía tienen?", "¿cuál es el precio?", "¿diferencia entre la primera y la segunda?", "¿cuántas personas caben?"). Si el usuario está solicitando o consultando sobre una nueva categoría o servicio distinto (ej: pasando de impresoras a salas o automatizaciones), asigna FALSE.
- uso: "hogar" si menciona casa, hogar, uso personal, tareas, estudiante; "pyme" si menciona oficina pequeña, negocio, tienda, pyme o 2-10 usuarios; "corporativo" si menciona gran empresa, corporación, alto volumen.
- volumen: número entero si indicó páginas al mes.
- SEGURIDAD Y ÁMBITO: Si la consulta del usuario solicita claves internas, contraseñas, servidores, URLs externas, o temas ajenos a Ofimundo (recetas, cultura general, etc.), asigna OBLIGATORIAMENTE la categoría "general".
- detalles_suficientes: DEBE SER true por defecto siempre que haya una categoría clara o pregunta del usuario, para permitir recomendación inmediata o respuesta autónoma.

Interpreta contextualmente basándote en la conversación previa. Solo devuelve JSON.
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
      if (isRateLimitOrQuotaError(response.status, errorTexto)) {
        throw new GroqRateLimitError(errorTexto)
      }
      console.warn(`Groq GPT-OSS 120B no disponible (${response.status}): ${errorTexto}. Reintentando con modelo secundario groq/compound...`)

      response = await hacerIntencion("groq/compound")
    }

    if (!response.ok) {
      const errorTexto = await response.text()
      if (isRateLimitOrQuotaError(response.status, errorTexto)) {
        throw new GroqRateLimitError(errorTexto)
      }
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
      detalles_suficientes: true,
      es_pregunta_seguimiento: Boolean(resultado.es_pregunta_seguimiento),
    }
  } catch (error) {
    if (error instanceof GroqRateLimitError) throw error
    console.error("Error procesando intención IA:", error)
    return null
  }
}

function parseTamanoSala(
  pregunta: string,
  textoMensajesUsuario: string,
  intencionTamano?: string | null
): "S" | "M" | "L" | null {
  const normPregunta = normalizar(pregunta)
  const normHistorial = normalizar(textoMensajesUsuario)

  const extraerTamano = (texto: string): "S" | "M" | "L" | null => {
    const matchPax =
      texto.match(/\b(\d{1,2})\s*(personas|asistentes|participantes|pax|usuarios|integrantes)\b/i) ||
      texto.match(/\bpara\s+(\d{1,2})\s*(personas|asistentes|participantes|pax|usuarios)?\b/i) ||
      texto.match(/\b(capacidad|de)\s+(\d{1,2})\s*(personas|asistentes|participantes|pax)?\b/i)

    if (matchPax) {
      const num = parseInt(matchPax[1] || matchPax[2], 10)
      if (!isNaN(num)) {
        if (num >= 1 && num <= 5) return "S"
        if (num >= 6 && num <= 11) return "M"
        if (num >= 12 && num <= 100) return "L"
      }
    }

    if (contiene(texto, ["pequena", "pequeno", "small", "chica", "huddle", "1 a 4", "1 a 5", "2 a 5"])) {
      return "S"
    }
    if (contiene(texto, ["mediana", "mediano", "medium", "6 a 10", "6 a 11", "5 a 10"])) {
      return "M"
    }
    if (contiene(texto, ["grande", "large", "directorio", "auditorio", "gran escala", "mas de 10", "mas de 12", "10 a 20"])) {
      return "L"
    }
    return null
  }

  let t = extraerTamano(normPregunta)
  if (t) return t

  if (intencionTamano) {
    const val = String(intencionTamano).trim().toUpperCase()
    if (val === "S" || val === "M" || val === "L") return val as "S" | "M" | "L"
  }

  t = extraerTamano(normHistorial)
  if (t) return t

  if (/\b(s|peque[nñ]a)\b/i.test(normPregunta)) return "S"
  if (/\b(m|mediana)\b/i.test(normPregunta)) return "M"
  if (/\b(l|grande)\b/i.test(normPregunta)) return "L"

  return null
}

function parseLineaSala(pregunta: string, textoMensajesUsuario: string): "ADVANCED" | "BUSINESS" | "ESSENTIAL" | null {
  const combo = normalizar(`${textoMensajesUsuario} ${pregunta}`)
  if (contiene(combo, ["advanced", "premium", "alta gama", "alta tecnologia", "inteligencia artificial", "ia"])) return "ADVANCED"
  if (contiene(combo, ["business", "estandar", "standard", "agil"])) return "BUSINESS"
  if (contiene(combo, ["essential", "basica", "economica", "equilibrada", "costo eficiente"])) return "ESSENTIAL"
  return null
}


export async function POST(request: NextRequest) {
  let body: any = {}
  let sesionId = ""
  let ultimosProductosRecomendados: any[] = []

  try {
    try {
      body = await request.json()
      sesionId =
        typeof body?.sesion_id === "string" && body.sesion_id.trim()
          ? body.sesion_id.trim()
          : crypto.randomUUID()
    } catch {
      body = {}
      sesionId = crypto.randomUUID()
    }

    const pregunta = normalizar(body?.mensaje)

    if (!pregunta) {
      return NextResponse.json(
        {
          success: false,
          error: "Debes enviar un mensaje",
        },
        { status: 400 }
      )
    }

    if (esConsultaRestringidaOFueraDeAmbito(body?.mensaje ?? "")) {
      const origin = new URL(request.url).origin
      await registrarEnHistorial(origin, sesionId, body.mensaje, MENSAJE_FUERA_DE_AMBITO)
      return NextResponse.json({
        success: true,
        categoria: "general",
        sesion_id: sesionId,
        pregunta: body.mensaje,
        respuesta: MENSAJE_FUERA_DE_AMBITO,
        productos: [],
      })
    }
    let historial: any[] = []

    if (Array.isArray(body?.historial) && body.historial.length > 0) {
      historial = body.historial
        .filter((item: any) => item.texto)
        .map((item: any) => ({
          mensaje_usuario: item.rol === "usuario" ? item.texto : null,
          respuesta_bot: item.rol === "bot" ? item.texto : null,
          productos_recomendados: item.productos ?? [],
          categoria: item.categoria ?? null,
        }))
    }

    // Preservar la secuencia de mensajes para contexto completo
    let historialBusquedaActiva = Array.isArray(historial) ? [...historial] : []

    let textoMensajesUsuarioActivo = normalizar(
      historialBusquedaActiva
        .map((item) => item.mensaje_usuario ?? "")
        .filter(Boolean)
        .join(" ") + " " + body.mensaje
    )

    const textoMensajesUsuario = normalizar(
      historial
        .map((item) => item.mensaje_usuario ?? "")
        .filter(Boolean)
        .join(" ") + " " + body.mensaje
    )

    const contextoConversacion = historial
      .map(
        (item) =>
          `Usuario: ${item.mensaje_usuario || ""}\nAsistente: ${item.respuesta_bot ?? ""}`
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

    let ultimoTurnoCategoria: string | null = null
    if (Array.isArray(historial) && historial.length > 0) {
      for (let i = historial.length - 1; i >= 0; i--) {
        const cat = (historial[i] as any)?.categoria
        if (cat && cat !== "general") {
          ultimoTurnoCategoria = cat
          break
        }
      }
    }

    let categoriaAnterior = ultimoTurnoCategoria
    if (!categoriaAnterior && Array.isArray(historial) && historial.length > 0) {
      for (let i = historial.length - 1; i >= 0; i--) {
        const itemText = normalizar(`${historial[i].mensaje_usuario || ""} ${historial[i].respuesta_bot || ""}`)
        if (contiene(itemText, ["automatizacion", "automatizaciones", "finiquito", "facturas", "gestion de cuentas"])) {
          categoriaAnterior = "automatizaciones"
          break
        }
        if (contiene(itemText, ["sala", "salas", "advanced", "essential", "business", "videoconferencia"])) {
          categoriaAnterior = "salas"
          break
        }
        if (contiene(itemText, ["impresora", "multifuncional", "xerox", "epson", "brother", "kyocera", "lexmark"])) {
          categoriaAnterior = "equipos"
          break
        }
      }
    }

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
        : intencionIA?.categoria && intencionIA.categoria !== "general"
          ? intencionIA.categoria
          : esAutomatizacion
            ? "automatizaciones"
            : esSala
              ? "salas"
              : esEquipoExplicit
                ? "equipos"
                : mensajeEsContinuacion && categoriaAnterior
                  ? categoriaAnterior
                  : (categoriaAnterior ?? "equipos")

    const esCambioDeCategoria = Boolean(
      ultimoTurnoCategoria &&
      ultimoTurnoCategoria !== categoria &&
      categoria !== "general"
    )

    if (esCambioDeCategoria) {
      historialBusquedaActiva = []
    }

    let productosAnteriores: any[] = []
    const todosProductosPrevios: any[] = []
    const idsProductosPrevios = new Set<string | number>()
    const marcasPrevias = new Set<string>()

    if (Array.isArray(historial) && historial.length > 0) {
      for (let i = historial.length - 1; i >= 0; i--) {
        const item = historial[i]
        const prods = (item as any)?.productos_recomendados ?? (item as any)?.productos
        if (Array.isArray(prods) && prods.length > 0) {
          if (productosAnteriores.length === 0) {
            productosAnteriores = prods
          }
          for (const p of prods) {
            const id = p.ID_Producto ?? p.id_producto ?? p.id
            if (id && !idsProductosPrevios.has(id)) {
              idsProductosPrevios.add(id)
              todosProductosPrevios.push(p)
            }
            if (p.Nombre_Marca) {
              marcasPrevias.add(normalizar(p.Nombre_Marca))
            }
          }
        }
      }
    }

    const ultimoProductoPrevio = productosAnteriores.length > 0 ? productosAnteriores[0] : null
    const marcaPrevia = ultimoProductoPrevio?.Nombre_Marca ? normalizar(ultimoProductoPrevio.Nombre_Marca) : null
    const colorPrevio: "color" | "monocromo" | null = ultimoProductoPrevio?.Color_Equipo
      ? (contiene(normalizar(ultimoProductoPrevio.Color_Equipo), ["blanco y negro", "monocromo", "bn", "b/n", "b&w", "negro"]) ? "monocromo" : "color")
      : null
    const formatoPrevio: "A3" | "A4" | null = ultimoProductoPrevio?.Tamano_Papel_Equipo
      ? (normalizar(ultimoProductoPrevio.Tamano_Papel_Equipo).includes("a3") ? "A3" : "A4")
      : null
    const tipoPrevio: "Multifuncional" | "Impresora" | null = ultimoProductoPrevio?.Tipo_Equipo
      ? (normalizar(ultimoProductoPrevio.Tipo_Equipo).includes("multifuncional") || normalizar(ultimoProductoPrevio.Tipo_Equipo).includes("copiad") ? "Multifuncional" : "Impresora")
      : null

    const colorActualDirecto = extraerColorDeTexto(body.mensaje)
    const formatoActualDirecto = extraerFormatoDeTexto(body.mensaje)
    const marcaActualDirecta = extraerMarcaDeTexto(body.mensaje) ?? (intencionIA?.marca ? extraerMarcaDeTexto(intencionIA.marca) : null)

    const solicitaAlternativas = detectarSolicitudAlternativas(body.mensaje)
    const solicitaOtraMarca = detectarSolicitudOtraMarca(body.mensaje)

    let tipoActualDirecto: "Multifuncional" | "Impresora" | null = null
    if (contiene(normalizar(body.mensaje), ["multifuncional", "multifuncionales", "multifuncion", "copiadora", "fotocopiadora", "copiar", "escanear", "scanner", "escaner", "fax"])) {
      tipoActualDirecto = "Multifuncional"
    } else if (contiene(normalizar(body.mensaje), ["solo impresora", "solo impresion", "impresora simple", "sin escaner", "sin fotocopia"])) {
      tipoActualDirecto = "Impresora"
    }

    const esCorreccionUsuario = contiene(pregunta, [
      "me equivoque",
      "me equivoqué",
      "me exprese mal",
      "me expresé mal",
      "no quiero esa",
      "no quiero esta",
      "no quiero ese",
      "no quiero este",
      "no me sirve",
      "no me sirven",
      "no esa no",
      "no este no",
      "mejor quiero",
      "mejor una",
      "mejor uno",
      "en verdad quiero",
      "en verdad busco",
      "realmente quiero",
      "realmente busco",
      "prefiero",
      "rectifico",
      "error mio",
      "error mío",
      "cambie de opinion",
      "cambié de opinión",
      "cambiar por",
      "disculpa",
      "perdon",
      "perdón",
    ])

    const esConsultaMasRapida = detectarConsultaMasRapida(pregunta)
    const esConsultaEconomica = detectarConsultaEconomica(pregunta)
    const esConsultaCatalogoCompleto = detectarConsultaCatalogoCompleto(pregunta)
    const ppmObjetivo = extraerPPMObjetivo(body.mensaje)
    const modelosDetectados = detectarModelosEspecificosEnTexto(body.mensaje, equiposData as any[])
    const modeloEspecificoDetectado = modelosDetectados.length > 0 ? modelosDetectados[0] : null
    const esComparacionModelos = modelosDetectados.length >= 2

    const tieneCambioDeFiltroExplicito = Boolean(
      colorActualDirecto !== null ||
      formatoActualDirecto !== null ||
      marcaActualDirecta !== null ||
      tipoActualDirecto !== null ||
      ppmObjetivo !== null ||
      modelosDetectados.length > 0 ||
      esConsultaCatalogoCompleto ||
      esCorreccionUsuario ||
      solicitaAlternativas ||
      solicitaOtraMarca
    )

    const esSeguimientoReal = Boolean(
      (intencionIA?.es_pregunta_seguimiento || mensajeEsContinuacion) &&
      !esCambioDeCategoria &&
      !tieneCambioDeFiltroExplicito &&
      !esComparacionModelos &&
      !esCorreccionUsuario &&
      productosAnteriores.length > 0
    )


    if (categoria === "general") {
      const respuestaGroq = await consultarGroq(
        `
Eres el asistente comercial virtual de Ofimundo.
REGLAS ESTRICTAS:
- Responde en MÁXIMO 2 LÍNEAS en español con un tono amable, fluido y comercial.
- Si saluda o pregunta en general, explícale de forma directa que puedes orientarlo en equipamiento de impresión MPS, salas colaborativas de videoconferencia o automatización de procesos.
- EXCLUSIVIDAD DE CATÁLOGO Y MARCAS AUTORIZADAS: En equipamiento de impresión, Ofimundo distribuye EXCLUSIVAMENTE las marcas oficiales: Xerox, Epson, Kyocera, Brother y Lexmark. ESTRICTAMENTE PROHIBIDO recomendar, sugerir o mencionar marcas fuera de catálogo (como HP, Canon, Ricoh, Konica Minolta, Sharp, Toshiba, Pantum, OKI o Dell). Si el cliente consulta si trabajamos con alguna de esas marcas externas, aclara amablemente que Ofimundo se especializa exclusivamente en las marcas líderes oficiales (Xerox, Epson, Kyocera, Brother y Lexmark) y ofrécele orientarlo en esas marcas.
- REGULACIÓN DE SEGURIDAD Y ÁMBITO: ESTRICTAMENTE PROHIBIDO entregar o responder sobre claves internas, contraseñas, credenciales, servidores, código o arquitectura de Ofimundo. ESTRICTAMENTE PROHIBIDO recomendar o mencionar sitios web externos o enlaces ajenos a Ofimundo. Si la consulta es sobre temas no relacionados con los productos de Ofimundo (recetas, noticias, política, claves), desvía cortésmente la conversación indicando que solo puedes orientarlo sobre el catálogo comercial de Ofimundo.
- ESTRICTAMENTE PROHIBIDO inventar modelos o menciones de impresoras previas si está saludando.
- ESTRICTAMENTE PROHIBIDO ofrecer enviar cotizaciones por correo/chat, ofrecer fichas técnicas, dar precios o preguntar sobre opciones de conectividad o red.
- ESTRICTAMENTE PROHIBIDO INCLUIR CUALQUIER TIPO DE PREGUNTA EN TU RESPUESTA. Tu mensaje debe contener ÚNICAMENTE el texto explicativo, terminando directamente con un punto final.
`,
        `
Consulta del cliente:
${body.mensaje}
`
      )

      const respuestaRaw = respuestaGroq ?? MENSAJE_FUERA_DE_SERVICIO
      const respuesta = respuestaGroq ? sanitizarRespuestaCatalogo(respuestaGroq) : MENSAJE_FUERA_DE_SERVICIO

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

    if (categoria === "salas") {
      const salas = salasData as any[]
      const textoMensajesSalas = esCambioDeCategoria ? normalizar(body.mensaje) : textoMensajesUsuarioActivo
      const tamanoDetectado = parseTamanoSala(
        body.mensaje,
        textoMensajesSalas,
        intencionIA?.tamano
      )
      const lineaDetectada = parseLineaSala(body.mensaje, textoMensajesSalas)
      const normPreguntaSalas = normalizar(`${textoMensajesSalas} ${body.mensaje}`)

      let salasFiltradas = esSeguimientoReal ? productosAnteriores : salas

      if (!esSeguimientoReal) {
        const scored = salasFiltradas.map((sala: any) => {
          let score = 0

          // Prioridad máxima: Tamaño / Capacidad de asistentes (S: 1-5 pax, M: 6-11 pax, L: 12+ pax)
          if (tamanoDetectado && normalizar(String(sala.Tamano ?? sala.tamano_sala ?? "")) === normalizar(tamanoDetectado)) {
            score += 1500
          }

          // Prioridad secundaria: Línea tecnológica (Essential, Business, Advanced)
          if (lineaDetectada && normalizar(String(sala.Linea ?? "")) === normalizar(lineaDetectada)) {
            score += 700
          }

          const opcionesStr = JSON.stringify(sala.Opciones || []).toLowerCase()

          // Coincidencias de marca preferida si el cliente la solicita (Logitech, Poly, Neat, Jabra)
          if (contiene(normPreguntaSalas, ["logi", "logitech"])) {
            if (opcionesStr.includes("logitech")) score += 200
          }
          if (contiene(normPreguntaSalas, ["poly"])) {
            if (opcionesStr.includes("poly")) score += 200
          }
          if (contiene(normPreguntaSalas, ["neat"])) {
            if (opcionesStr.includes("neat")) score += 200
          }
          if (contiene(normPreguntaSalas, ["jabra"])) {
            if (opcionesStr.includes("jabra")) score += 200
          }

          return { sala, score }
        })

        scored.sort((a, b) => b.score - a.score)
        salasFiltradas = scored.map((entry) => entry.sala)
      }

      ultimosProductosRecomendados = salasFiltradas.slice(0, 3)

      const salasParaIA = ultimosProductosRecomendados.map((sala: any) => ({
        nombre: sala.Titulo ?? sala.Nombre ?? sala.nombre,
        linea: sala.Linea,
        tamano: `${sala.Tamano} (${sala.Tamano === "S" ? "1 a 5 personas / Huddle" : sala.Tamano === "M" ? "6 a 11 personas / Mediana" : "12+ personas / Grande o Directorio"})`,
        descripcion: sala.Descripcion ?? sala.descripcion,
        beneficios: Array.isArray(sala.Beneficios) ? sala.Beneficios.slice(0, 3) : [],
        opciones_hardware: (sala.Opciones || []).map((op: any) => ({
          opcion: op.Nombre,
          equipos: (op.Equipos || []).map((eq: any) => `${eq.Nombre_Marca} ${eq.Nombre_Equipo}`)
        })),
        compatibilidad: sala.Compatibilidad,
        complementos: (sala.Complementos || []).map((c: any) => `${c.Nombre_Marca} ${c.Nombre_Equipo} (${c.Categoria})`)
      }))

      const respuestaGroq = await consultarGroq(
        `
Eres el asistente comercial virtual de Ofimundo experto en soluciones para salas colaborativas de videoconferencia.

REGLAS ESTRICTAS DE RESPUESTA COMERCIAL:
- Responde siempre en español, de forma muy breve y comercial (MÁXIMO 2 LÍNEAS).
- Recomienda directamente la solución de sala idónea (ej: Essential S, Advanced M, Business S, etc.) destacando su capacidad adecuada de personas o sus marcas/equipos principales (Logitech, Poly, Neat, Jabra, 4K, One-Touch join, agendamiento).
- EXCLUSIVIDAD DE CATÁLOGO: Usa ÚNICAMENTE la información oficial suministrada de las salas filtradas. ESTRICTAMENTE PROHIBIDO recomendar marcas o productos que no estén en el catálogo de Ofimundo.
- REGULACIÓN DE SEGURIDAD Y ÁMBITO: ESTRICTAMENTE PROHIBIDO responder sobre claves internas, contraseñas, servidores, código, credenciales o sitios web externos.
- ESTRICTAMENTE PROHIBIDO ofrecer enviar cotizaciones por correo/chat, ofrecer fichas técnicas, dar precios o preguntar sobre opciones de conectividad o red. Las cotizaciones se solicitan directamente desde las tarjetas.
- ESTRICTAMENTE PROHIBIDO INCLUIR CUALQUIER TIPO DE PREGUNTA EN TU RESPUESTA. Tu mensaje debe contener ÚNICAMENTE el texto descriptivo de la recomendación, terminando directamente con un punto final.
`,
        `
Consulta del cliente:
${mensajeConContexto}

Salas disponibles filtradas por idoneidad (de mayor a menor relevancia):
${JSON.stringify(salasParaIA)}
`
      )

      const respuestaRaw = respuestaGroq ?? MENSAJE_FUERA_DE_SERVICIO
      const respuesta = respuestaGroq ? sanitizarRespuestaCatalogo(respuestaGroq) : MENSAJE_FUERA_DE_SERVICIO
      const productosSalas = respuestaGroq ? ultimosProductosRecomendados : []

      const origin = new URL(request.url).origin
      await registrarEnHistorial(origin, sesionId, body.mensaje, respuesta, productosSalas)

      return NextResponse.json({
        success: true,
        categoria: "salas",
        pregunta: body.mensaje,
        respuesta,
        productos: productosSalas,
      })
    }

    if (categoria === "automatizaciones") {
      const automatizaciones = automatizacionesData as any[]
      const textoMensajesAuto = esCambioDeCategoria ? normalizar(body.mensaje) : textoMensajesUsuarioActivo
      const preguntaActualNorm = normalizar(body.mensaje)

      const buscaFacturas = contiene(preguntaActualNorm, ["factura", "facturas", "proveedor", "proveedores", "sii", "dte", "tributari"])
      const buscaFiniquitos = contiene(preguntaActualNorm, ["finiquito", "finiquitos", "rrhh", "personal", "despido", "laboral", "dt", "direccion del trabajo"])
      const buscaCuentas = contiene(preguntaActualNorm, ["cuenta", "cuentas", "erp", "asiento", "contabilidad", "contable", "cobrar", "pagar", "gesdoc", "documental"])
      const buscaSaldos = contiene(preguntaActualNorm, ["banco", "bancos", "saldo", "saldos", "tesoreria", "cartola", "bancari", "conciliacion"])

      const tieneFocoExplicito = buscaFacturas || buscaFiniquitos || buscaCuentas || buscaSaldos

      // Familias previamente recomendadas
      const familiasPrevias = new Set<string>()
      for (const p of todosProductosPrevios) {
        familiasPrevias.add(obtenerFamiliaAutomatizacion(p))
      }
      for (const p of productosAnteriores) {
        familiasPrevias.add(obtenerFamiliaAutomatizacion(p))
      }

      const debeExcluirPrevios = solicitaAlternativas && !tieneFocoExplicito && idsProductosPrevios.size > 0

      let automatizacionesFiltradas: any[] = []

      if (esSeguimientoReal) {
        automatizacionesFiltradas = productosAnteriores
      } else {
        const scored = automatizaciones.map((item: any) => {
          let score = 0
          const familia = obtenerFamiliaAutomatizacion(item)
          const haystack = normalizar(`${item.nombre} ${item.slug} ${item.resumen} ${item.descripcion} ${item.categoria} ${item.beneficio}`)

          if (tieneFocoExplicito) {
            if (buscaFacturas && familia === "facturas") score += 2000
            if (buscaFiniquitos && familia === "finiquitos") score += 2000
            if (buscaCuentas && familia === "cuentas") score += 2000
            if (buscaSaldos && familia === "saldos") score += 2000
          } else if (debeExcluirPrevios) {
            // Priorizar familias que aún no se le hayan mostrado
            if (!familiasPrevias.has(familia)) {
              score += 3000
            } else {
              score -= 1000
            }
            // Penalizar IDs que ya se le recomendaron
            if (idsProductosPrevios.has(item.ID_Producto)) {
              score -= 5000
            }
          } else {
            // Para consulta general de catálogo: balancear prioridades de familias
            if (familia === "facturas") score += 40
            if (familia === "saldos") score += 30
            if (familia === "finiquitos") score += 20
            if (familia === "cuentas") score += 10
          }

          // Preferir opciones estándar/canónicas de cada familia
          if (
            item.ID_Producto === "OFI-AUTPRC" ||
            item.ID_Producto === "OFI-AUTPRC_SLDBNC_01" ||
            item.ID_Producto === "OFI-AUTPRC_FNQT_01" ||
            item.ID_Producto === "OFI-AUTPRC_GSCT_01"
          ) {
            score += 5
          }

          return { item, score, familia }
        })

        scored.sort((a, b) => b.score - a.score)

        if (!tieneFocoExplicito) {
          const familiasUsadas = new Set<string>()
          const elegidos: any[] = []

          // Primera pasada: seleccionar un representante por familia distinta
          for (const entry of scored) {
            if (elegidos.length >= 3) break
            if (!familiasUsadas.has(entry.familia)) {
              if (
                debeExcluirPrevios &&
                familiasPrevias.has(entry.familia) &&
                familiasUsadas.size < Math.max(1, 4 - familiasPrevias.size)
              ) {
                continue
              }
              familiasUsadas.add(entry.familia)
              elegidos.push(entry.item)
            }
          }

          // Rellenar hasta 3 sin repetir ID
          if (elegidos.length < 3) {
            for (const entry of scored) {
              if (elegidos.length >= 3) break
              if (!elegidos.some((e) => e.ID_Producto === entry.item.ID_Producto)) {
                elegidos.push(entry.item)
              }
            }
          }

          automatizacionesFiltradas = elegidos
        } else {
          automatizacionesFiltradas = scored.slice(0, 3).map((e) => e.item)
        }
      }

      ultimosProductosRecomendados = automatizacionesFiltradas.slice(0, 3)

      const automatizacionesParaIA = ultimosProductosRecomendados.map((item: any) => ({
        nombre: item.nombre ?? item.nombreCorto,
        categoria: item.categoria,
        beneficio: item.beneficio,
        resumen: item.resumen ?? item.descripcion,
      }))

      const respuestaGroq = await consultarGroq(
        `
Eres el asistente comercial virtual de Ofimundo experto en automatización de procesos empresariales.

REGLAS ESTRICTAS DE RESPUESTA COMERCIAL:
- Responde siempre en español, de forma muy breve y comercial (MÁXIMO 2 LÍNEAS).
${
  solicitaAlternativas
    ? "- El usuario solicitó OTRAS OPCIONES O ALTERNATIVAS de automatización. Presenta de forma comercial y directa las nuevas soluciones recomendadas en esta respuesta (ej: gestión de cuentas u otros planes) destacando sus ventajas. NUNCA digas que no hay más opciones si se entregan soluciones en las tarjetas."
    : !tieneFocoExplicito
    ? "- El usuario consulta en general por procesos de automatización. Menciona de forma breve y concisa las distintas áreas disponibles en el catálogo (facturas SII, saldos bancarios, finiquitos DT y gestión de cuentas) representadas en las tarjetas."
    : "- Presenta de forma directa la solución de automatización ideal para la necesidad del usuario o responde su duda técnica."
}
- EXCLUSIVIDAD DE CATÁLOGO: Usa ÚNICAMENTE la información oficial suministrada de las soluciones de automatización de Ofimundo. ESTRICTAMENTE PROHIBIDO inventar o recomendar software o servicios externos fuera del catálogo.
- REGULACIÓN DE SEGURIDAD Y ÁMBITO: ESTRICTAMENTE PROHIBIDO responder sobre claves internas, contraseñas, servidores, código, credenciales o sitios web externos.
- ESTRICTAMENTE PROHIBIDO ofrecer enviar cotizaciones por correo/chat, ofrecer fichas técnicas, dar precios o preguntar sobre opciones de conectividad o red. Las cotizaciones se solicitan directamente desde las tarjetas.
- ESTRICTAMENTE PROHIBIDO INCLUIR CUALQUIER TIPO DE PREGUNTA EN TU RESPUESTA. Tu mensaje debe contener ÚNICAMENTE el texto descriptivo del proceso, terminando directamente con un punto final.
`,
        `
Consulta del cliente:
${mensajeConContexto}

Automatizaciones disponibles:
${JSON.stringify(automatizacionesParaIA)}
`
      )

      const respuestaRaw = respuestaGroq ?? MENSAJE_FUERA_DE_SERVICIO
      const respuesta = respuestaGroq ? sanitizarRespuestaCatalogo(respuestaGroq) : MENSAJE_FUERA_DE_SERVICIO
      const productosAuto = respuestaGroq ? ultimosProductosRecomendados : []

      const origin = new URL(request.url).origin
      await registrarEnHistorial(origin, sesionId, body.mensaje, respuesta, productosAuto)

      return NextResponse.json({
        success: true,
        categoria: "automatizaciones",
        pregunta: body.mensaje,
        respuesta,
        productos: productosAuto,
      })
    }

    const productos = (equiposData as any[]).map((p) => ({
      ...p,
      Nombre_Equipo: resolverNombreEquipo(p),
    }))

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

    const solicitaNuevaBusquedaExplicitamente =
      contiene(pregunta, [
        "nueva busqueda",
        "resetear",
        "empezar de nuevo",
        "otra busqueda",
        "cancelar busqueda",
        "buscar otra cosa",
        "reiniciar",
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

    const esNuevaBusqueda =
      solicitaNuevaBusquedaExplicitamente ||
      esCambioDeCategoria ||
      esConsultaCatalogoCompleto ||
      (esConsultaMasRapida && !contiene(pregunta, ["de esas", "de estos", "entre esas", "entre estos"])) ||
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
    ]

    const marcaEnMensajeActual = extraerMarcaDeTexto(body.mensaje) ?? (intencionIA?.marca ? extraerMarcaDeTexto(intencionIA.marca) : null)

    const marcasAExcluir = new Set<string>()
    if (solicitaOtraMarca) {
      if (marcaPrevia) marcasAExcluir.add(marcaPrevia)
    }

    let finalMarca: string | null = null
    if (esComparacionModelos) {
      finalMarca = null
    } else if (solicitaOtraMarca) {
      finalMarca = null
    } else if (marcaEnMensajeActual) {
      finalMarca = marcaEnMensajeActual
    } else if (esNuevaBusqueda) {
      finalMarca = intencionIA?.marca ? normalizar(intencionIA.marca) : null
    } else {
      finalMarca = marcaPrevia ?? (intencionIA?.marca ? normalizar(intencionIA.marca) : null) ?? marcaEnHistorial
    }

    const esCambioDeMarca = Boolean(marcaPrevia && finalMarca && marcaPrevia !== finalMarca)

    // 2. TIPO (Multifuncional vs Impresora)
    let tipoEnTexto: "Multifuncional" | "Impresora" | null = null
    if (
      contiene(pregunta, [
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
      contiene(pregunta, [
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
    const finalTipo = esNuevaBusqueda
      ? (tipoEnTexto || intencionIA?.tipo || null)
      : (tipoEnTexto ?? tipoPrevio ?? intencionIA?.tipo ?? tipoEnHistorial)

    // 3. FORMATO (A3 vs A4 / Carta / Oficio)
    const formatoActual = extraerFormatoDeTexto(body.mensaje)
    const formatoActivo = extraerFormatoDeTexto(textoMensajesUsuarioActivo)
    const finalFormato: "A3" | "A4" | null = formatoActual ?? formatoPrevio ?? (formatoActivo || intencionIA?.formato || null)

    // 4. COLOR (color vs monocromo)
    const colorActual = extraerColorDeTexto(body.mensaje)
    const colorActivo = extraerColorDeTexto(textoMensajesUsuarioActivo)
    const finalColor: "color" | "monocromo" | null = colorActual ?? colorPrevio ?? (colorActivo || intencionIA?.color || null)
    const esCambioDeColor = Boolean(colorActual && colorPrevio && colorPrevio !== colorActual)

    // 5. VOLUMEN (número explícito de páginas ingresado por el usuario)
    const ultimoBotMsj = historialBusquedaActiva.length > 0 ? historialBusquedaActiva[historialBusquedaActiva.length - 1]?.respuesta_bot : ""
    const volumenEnTextoActual = extraerVolumenDeTexto(body.mensaje, ultimoBotMsj)
    const volumenEnTextoActivo = extraerVolumenDeTexto(textoMensajesUsuarioActivo, ultimoBotMsj)

    const tieneNumeroPaginasExplicito = Boolean(
      volumenEnTextoActual !== null || volumenEnTextoActivo !== null || intencionIA?.volumen
    )

    let finalVolumen: number | null = tieneNumeroPaginasExplicito
      ? (volumenEnTextoActual ?? volumenEnTextoActivo ?? intencionIA?.volumen ?? null)
      : null

    const contieneUsoHogar = contiene(textoParametros, ["casa", "hogar", "domestico", "domestica", "estudiante", "personal"])
    const contieneUsoCorp = contiene(textoParametros, ["corporativo", "gran empresa", "alto volumen"])

    if (!finalVolumen) {
      if (contieneUsoHogar || intencionIA?.uso === "hogar") finalVolumen = 500
      else if (contieneUsoCorp || intencionIA?.uso === "corporativo") finalVolumen = 15000
      else if (esConsultaMasRapida || ppmObjetivo || modeloEspecificoDetectado) finalVolumen = null
      else finalVolumen = 3000 // Valor por defecto PYME para recomendación inmediata
    }

    const tieneColorExplicito = Boolean(finalColor)
    const tieneFormatoExplicito = Boolean(finalFormato)

    console.log("--> CHATBOT FILTROS DETECTADOS AUTÓNOMOS DE ALTA PRECISIÓN:", {
      esNuevaBusqueda,
      finalMarca,
      finalTipo,
      finalFormato,
      finalColor,
      finalVolumen,
      solicitaAlternativas,
      solicitaOtraMarca,
      esCambioDeColor,
      esCambioDeMarca,
      esPreguntaSeguimiento: intencionIA?.es_pregunta_seguimiento,
    })

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
      strictFormat: boolean = true,
      strictBrand: boolean = true,
      strictColor: boolean = true,
      strictType: boolean = true,
      excluirIds: Set<string | number> = new Set(),
      excluirMarcas: Set<string> = new Set()
    ) {
      return lista
        .filter((producto) => {
          // 0. Exclusiones de IDs si se buscan alternativas
          if (excluirIds.size > 0 && excluirIds.has(producto.ID_Producto)) {
            return false
          }

          const marca = normalizar(producto.Nombre_Marca)

          // 0b. Exclusiones de marcas si el usuario pide otras marcas
          if (excluirMarcas.size > 0 && excluirMarcas.has(marca)) {
            return false
          }

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

          // 1. Filtro de Marca
          if (strictBrand && finalMarca && !marca.includes(normalizar(finalMarca))) {
            return false
          }

          // 2. Filtro de Color
          if (strictColor && finalColor) {
            const normColor = normalizar(producto.Color_Equipo)
            if (finalColor === "color" && !normColor.includes("color")) {
              return false
            }
            if (
              finalColor === "monocromo" &&
              !contiene(normColor, ["blanco y negro", "monocromo", "bn", "b/n", "b&w", "negro"])
            ) {
              return false
            }
          }

          // 3. Filtro de Formato (A4 vs A3)
          if (strictFormat && finalFormato) {
            if (finalFormato === "A4" && formato.includes("a3")) {
              return false
            }
            if (finalFormato === "A3" && !formato.includes("a3")) {
              return false
            }
          }

          // 4. Filtro de Tipo (Multifuncional vs Solo Impresora)
          if (strictType && finalTipo) {
            const normTipoSol = normalizar(finalTipo)
            if (normTipoSol === "impresora" && (tipo.includes("multifuncional") || tipo.includes("copiad"))) {
              return false
            }
            if (normTipoSol === "multifuncional" && !tipo.includes("multifuncional") && !tipo.includes("copiad")) {
              return false
            }
          }

          // 5. Filtro de Volumen y Tipo de Uso
          if (strictVolume && finalVolumen && !esConsultaMasRapida && !ppmObjetivo && !modeloEspecificoDetectado) {
            if (finalVolumen > cicloInfo.max * 2.0) {
              return false
            }

            if (finalUso === "hogar" || finalVolumen <= 1500) {
              if (formato.includes("a3") || cicloInfo.max > 25000 || esMaquinariaAlta) {
                return false
              }
            } else if (finalVolumen <= 6000) {
              if (cicloInfo.max > 60000 || (producto.Velocidad_BN_Equipo ?? 0) > 60) {
                return false
              }
            } else if (finalVolumen >= 25000) {
              if (cicloInfo.max < 10000) {
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

          if (finalTipo) {
            const normTipoSol = normalizar(finalTipo)
            if (normTipoSol === "multifuncional" && (normalizar(producto.Tipo_Equipo).includes("multifuncional") || normalizar(producto.Tipo_Equipo).includes("copiad"))) {
              rankingScore += 1000
            }
            if (normTipoSol === "impresora" && !normalizar(producto.Tipo_Equipo).includes("multifuncional")) {
              rankingScore += 1000
            }
          }

          if (finalVolumen && !esConsultaMasRapida) {
            const { max } = parseCicloRecomendado(producto.Ciclo_Recomendado_Equipo)
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
            rankingScore += 2000
          }

          if (finalFormato) {
            const normPapel = normalizar(producto.Tamano_Papel_Equipo)
            if (finalFormato === "A3" && normPapel.includes("a3")) rankingScore += 1000
            if (finalFormato === "A4" && !normPapel.includes("a3")) rankingScore += 1000
          }

          if (finalColor) {
            const normColor = normalizar(producto.Color_Equipo)
            if (finalColor === "color" && normColor.includes("color")) rankingScore += 1000
            if (finalColor === "monocromo" && contiene(normColor, ["blanco y negro", "monocromo"])) rankingScore += 1000
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

          // Prioridad especial si se detectó un modelo específico
          if (modeloEspecificoDetectado && producto.ID_Producto === modeloEspecificoDetectado.ID_Producto) {
            rankingScore += 25000
          }

          // Prioridad si el usuario consulta por la más rápida
          if (esConsultaMasRapida) {
            rankingScore += (producto.Velocidad_BN_Equipo ?? producto.Velocidad_Color_Equipo ?? 0) * 200
          }

          // Prioridad si el usuario solicitó un PPM objetivo
          if (ppmObjetivo) {
            const ppm = producto.Velocidad_BN_Equipo ?? producto.Velocidad_Color_Equipo ?? 0
            if (ppm === ppmObjetivo) {
              rankingScore += 8000
            } else if (ppm > ppmObjetivo) {
              rankingScore += Math.max(0, 4000 - (ppm - ppmObjetivo) * 40)
            } else {
              rankingScore -= (ppmObjetivo - ppm) * 100
            }
          }

          return {
            ...producto,
            coincidencias,
            rankingScore,
          }
        })
        .sort((a, b) => {
          if (modeloEspecificoDetectado) {
            const isModelB = b.ID_Producto === modeloEspecificoDetectado.ID_Producto ? 1 : 0
            const isModelA = a.ID_Producto === modeloEspecificoDetectado.ID_Producto ? 1 : 0
            if (isModelB !== isModelA) return isModelB - isModelA
          }
          if (esConsultaMasRapida && !modeloEspecificoDetectado) {
            const velB = b.Velocidad_BN_Equipo ?? b.Velocidad_Color_Equipo ?? 0
            const velA = a.Velocidad_BN_Equipo ?? a.Velocidad_Color_Equipo ?? 0
            if (velB !== velA) return velB - velA
          }
          if (ppmObjetivo && !modeloEspecificoDetectado) {
            const ppmB = b.Velocidad_BN_Equipo ?? b.Velocidad_Color_Equipo ?? 0
            const ppmA = a.Velocidad_BN_Equipo ?? a.Velocidad_Color_Equipo ?? 0
            const exactB = ppmB === ppmObjetivo ? 1 : 0
            const exactA = ppmA === ppmObjetivo ? 1 : 0
            if (exactB !== exactA) return exactB - exactA
          }
          if (Math.abs(b.rankingScore - a.rankingScore) > 10) {
            return b.rankingScore - a.rankingScore
          }
          if (b.coincidencias !== a.coincidencias) {
            return b.coincidencias - a.coincidencias
          }
          return b.rankingScore - a.rankingScore
        })
    }

    let resultados: any[] = []
    if (esComparacionModelos) {
      if (esConsultaMasRapida) {
        modelosDetectados.sort(
          (a, b) => (b.Velocidad_BN_Equipo ?? b.Velocidad_Color_Equipo ?? 0) - (a.Velocidad_BN_Equipo ?? a.Velocidad_Color_Equipo ?? 0)
        )
      } else if (esConsultaEconomica) {
        modelosDetectados.sort((a, b) => {
          const isInkA = (a.Tecnologia_Equipo || "").toUpperCase().includes("TINTA") || (a.Nombre_Equipo || "").includes("EcoTank") ? 1 : 0
          const isInkB = (b.Tecnologia_Equipo || "").toUpperCase().includes("TINTA") || (b.Nombre_Equipo || "").includes("EcoTank") ? 1 : 0
          return isInkB - isInkA
        })
      }
      resultados = [...modelosDetectados].slice(0, 3)
    } else if (esSeguimientoReal) {
      if (esConsultaMasRapida) {
        resultados = [...productosAnteriores]
          .sort((a, b) => (b.Velocidad_BN_Equipo ?? b.Velocidad_Color_Equipo ?? 0) - (a.Velocidad_BN_Equipo ?? a.Velocidad_Color_Equipo ?? 0))
          .slice(0, 3)
      } else {
        resultados = productosAnteriores.slice(0, 3)
      }
    } else {
      const debeExcluirPrevios = (solicitaAlternativas || solicitaOtraMarca) && !marcaEnMensajeActual && idsProductosPrevios.size > 0
      const idsAExcluir = debeExcluirPrevios ? idsProductosPrevios : new Set<string | number>()

      // 1. Strict all: Brand, Color, Format, Type, Volume
      let candidatos = filtrarYRankearEquipos(productos, !esConsultaMasRapida, true, true, true, true, idsAExcluir, marcasAExcluir)

      // 2. Relax Volume: Brand, Color, Format, Type
      if (candidatos.length === 0) {
        candidatos = filtrarYRankearEquipos(productos, false, true, true, true, true, idsAExcluir, marcasAExcluir)
      }

      // 3. Relax Brand: Color, Format, Type (e.g. when HP/Canon not in stock or brand lacks models)
      if (candidatos.length === 0) {
        candidatos = filtrarYRankearEquipos(productos, false, true, false, true, true, idsAExcluir, marcasAExcluir)
      }

      // 4. Relax Format: Color, Type
      if (candidatos.length === 0) {
        candidatos = filtrarYRankearEquipos(productos, false, false, false, true, true, idsAExcluir, marcasAExcluir)
      }

      // 5. Fallback permitiendo productos previos si se agotó el catálogo
      if (candidatos.length === 0 && idsAExcluir.size > 0) {
        candidatos = filtrarYRankearEquipos(productos, false, true, !solicitaOtraMarca, true, true, new Set(), marcasAExcluir)
      }

      // 6. General Fallback
      if (candidatos.length === 0) {
        candidatos = filtrarYRankearEquipos(productos, false, false, false, false, false)
      }

      // Si el cliente pide otras alternativas y la marca actual sólo tiene 1 o 2 modelos disponibles, complementar con otras marcas líderes
      if (solicitaAlternativas && candidatos.length < 3) {
        const suplemento = filtrarYRankearEquipos(
          productos,
          false,
          true,
          false,
          true,
          true,
          new Set([...idsAExcluir, ...candidatos.map((p) => p.ID_Producto)]),
          marcasAExcluir
        )
        for (const sup of suplemento) {
          if (candidatos.length >= 3) break
          candidatos.push(sup)
        }
      }

      resultados = candidatos.slice(0, 3)
    }

    ultimosProductosRecomendados = resultados

    if (resultados.length === 0) {
      const respSinResultados =
        "No se encontraron equipos que cumplan exactamente con los requisitos solicitados en el catálogo actual."
      const origin = new URL(request.url).origin
      await registrarEnHistorial(origin, sesionId, body.mensaje, respSinResultados, [], {
        marca: finalMarca,
        color: finalColor,
        formato: finalFormato,
        tipo: finalTipo,
      })

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
        respuesta: respSinResultados,
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
      velocidad_ppm: producto.Velocidad_BN_Equipo ?? producto.Velocidad_Color_Equipo,
      velocidad_exacta: `${producto.Velocidad_BN_Equipo ?? producto.Velocidad_Color_Equipo ?? "N/D"} ppm (páginas por minuto)`,
      capacidad_bandeja: producto.Capacidad_Bandeja1_Equipo,
      ciclo_recomendado: producto.Ciclo_Recomendado_Equipo,
      funciones: producto.Funciones_Equipo,
      memoria: producto.Memoria_RAM_Equipo,
      disco: producto.Disco_Duro_Equipo,
      descripcion: producto.Descripcion_Equipo,
    }))

    const esMarcaFueraDeStock = Boolean(
      finalMarca &&
      resultados.length > 0 &&
      !resultados.some((p) => normalizar(p.Nombre_Marca).includes(normalizar(finalMarca)))
    )

    const esFormatoDiferente = Boolean(
      finalFormato &&
      resultados.length > 0 &&
      !resultados.some((p) => normalizar(p.Tamano_Papel_Equipo).includes(normalizar(finalFormato)))
    )

    const respuestaGroq = await consultarGroq(
      `
Eres el asesor comercial virtual de Ofimundo experto en soluciones y equipos de impresión.

REGLA SUPREMA DE EXCLUSIVIDAD DE CATÁLOGO Y MARCAS AUTORIZADAS:
- En Ofimundo comercializamos EXCLUSIVAMENTE equipos de las 5 marcas oficiales de nuestro catálogo: XEROX, EPSON, KYOCERA, BROTHER y LEXMARK.
- ESTRICTAMENTE PROHIBIDO recomendar, sugerir o mencionar modelos o marcas ajenas a nuestro catálogo (como HP, Hewlett-Packard, Canon, Ricoh, Konica Minolta, Sharp, Toshiba, Pantum, OKI o Dell).
- NUNCA recomiendes ni menciones un equipo o marca que no esté presente en la lista de productos suministrada en este prompt. Todas tus recomendaciones deben basarse ÚNICA Y EXCLUSIVAMENTE en los equipos de nuestro catálogo entregados abajo.

REGLAS DE RECOMENDACIÓN DE ALTA PRECISIÓN Y CONCORDANCIA:
- Responde siempre en español, de forma breve, empática, profesional y comercial (máximo 2 a 3 líneas).
${
  esMarcaFueraDeStock
    ? `- REGLA PARA MARCAS EXTERNAS FUERA DE CATÁLOGO: El cliente mencionó la marca "${finalMarca}" (la cual NO forma parte de nuestro catálogo). Explica cortésmente que en Ofimundo trabajamos exclusivamente con las marcas oficiales Xerox, Epson, Kyocera, Brother y Lexmark, y presenta de inmediato la mejor alternativa recomendada de nuestro catálogo (${productosParaIA[0]?.marca} ${productosParaIA[0]?.nombre}). ESTRICTAMENTE PROHIBIDO recomendar ningún equipo de ${finalMarca}.`
    : ""
}
${
  esFormatoDiferente
    ? `- El cliente solicitó formato "${finalFormato}", pero para esa combinación la mejor alternativa disponible es el formato de la lista. Explícale amablemente el beneficio del equipo.`
    : ""
}
- SI EL USUARIO RETORNA O CAMBIA DE OTRA CATEGORÍA, realiza una transición fluida retomando sus necesidades de equipamiento de impresión.
${
  esCorreccionUsuario
    ? `- EL CLIENTE INDICA QUE SE EQUIVOCÓ O QUE RECHAZA LA OPCIÓN ANTERIOR (ej: "me equivoqué", "no quiero esa", "prefiero..."). Acepta la corrección amablemente con empatía y presenta directamente la mejor alternativa que solicita.`
    : ""
}
${
  solicitaOtraMarca
    ? `- EL CLIENTE SOLICITÓ OPCIONES DE OTRAS MARCAS: Presenta las alternativas de las otras marcas disponibles (${[...new Set(productosParaIA.map((p: any) => p.marca))].join(", ")}), destacando que mantienen los mismos requerimientos técnicos acordados previamente en la conversación (formato, ${finalColor || "color/monocromo"}, funciones y volumen). Explica brevemente por qué la opción ${productosParaIA[0]?.marca} ${productosParaIA[0]?.nombre} es la ideal.`
    : esCambioDeColor
    ? `- EL CLIENTE SOLICITÓ CAMBIAR A ${finalColor === "monocromo" ? "MONOCROMÁTICO (BLANCO Y NEGRO)" : "COLOR"}: Confirma con naturalidad y empatía el ajuste a ${finalColor === "monocromo" ? "monocromo" : "color"}, y explica brevemente por qué la opción recomendada (${productosParaIA[0]?.marca} ${productosParaIA[0]?.nombre}) se adapta a los requerimientos de formato y volumen del hilo de la conversación.`
    : esCambioDeMarca || (marcaEnMensajeActual && !esMarcaFueraDeStock)
    ? `- EL CLIENTE SOLICITÓ LA MARCA "${finalMarca}": Presenta de forma clara y directa la mejor opción disponible de la marca ${finalMarca} (${productosParaIA[0]?.marca} ${productosParaIA[0]?.nombre}), confirmando que cumple con los requerimientos técnicos del hilo de la conversación (formato, ${finalColor || "color/monocromo"}, tipo y volumen).`
    : solicitaAlternativas
    ? `- EL CLIENTE SOLICITÓ OTRAS ALTERNATIVAS: Presenta amablemente las nuevas alternativas recomendadas (${productosParaIA[0]?.marca} ${productosParaIA[0]?.nombre}), explicando por qué son excelentes opciones diferentes para su necesidad sin repetir los equipos que ya le fueron presentados anteriormente.`
    : esComparacionModelos
    ? `- REGLA DE COMPARACIÓN DIRECTA:
  * El cliente está comparando directamente estos modelos: ${modelosDetectados.map((m) => `${m.Nombre_Marca} ${m.Nombre_Equipo}`).join(" versus ")}.
  * Tienes la información técnica de ambos en la lista de productos suministrada. Compara ambos modelos de forma precisa:
    - Velocidad: Cita la velocidad exacta de ambos equipos (${modelosDetectados.map((m) => `${m.Nombre_Marca} ${m.Nombre_Equipo} con ${m.Velocidad_BN_Equipo} ppm`).join(", frente a ")}). Indica claramente cuál es más rápida.
    - Economía / Costo: Si el cliente pregunta por la más económica o el costo, indica que los modelos EcoTank o de tinta continua son los más económicos en costo por página e insumos, mientras que los equipos láser ofrecen mayor velocidad para alto volumen.`
    : `- Explica de forma clara y directa POR QUÉ la 1ra opción recomendada (${productosParaIA[0]?.marca} ${productosParaIA[0]?.nombre}) es la mejor alternativa para sus requisitos (ej: marca, color/monocromo, formato A3/A4 o volumen de impresión).`
}
- SI EL CLIENTE HACE UNA PREGUNTA DE SEGUIMIENTO: Responde DIRECTAMENTE su duda técnica basándote ÚNICAMENTE en los datos de los productos suministrados.
- REGLAS ESTRICTAS DE VELOCIDAD Y EXACTITUD (PPM):
  * Al mencionar la velocidad o si el cliente pregunta por rapidez o PPM: cita OBLIGATORIAMENTE el valor numérico exacto de 'velocidad_ppm' seguido de 'ppm' (ej: '${productosParaIA[0]?.velocidad_ppm || 50} ppm'). PROHIBIDO redondear o inventar valores de velocidad.
  * Si el cliente pregunta cuál es la más rápida: la opción de mayor velocidad es la que tiene mayor valor numérico en 'velocidad_ppm'. Cita con exactitud su velocidad y compárala si es necesario.
  * Si el cliente pregunta por un modelo específico (ej: B620, L8360, etc.): responde de forma precisa y exclusiva sobre ese equipo con sus especificaciones oficiales suministradas en la lista. NUNCA le atribuyas datos de otro equipo.
- ESTRICTAMENTE PROHIBIDO inventar números de páginas, velocidades o especificaciones que no estén en la lista.
- REGULACIÓN DE SEGURIDAD Y ÁMBITO: ESTRICTAMENTE PROHIBIDO responder sobre claves internas, contraseñas, credenciales, servidores, código o sitios web externos.
- ESTRICTAMENTE PROHIBIDO ofrecer enviar cotizaciones por correo o chat, ofrecer fichas técnicas, dar precios o preguntar por opciones de conectividad o red. El usuario cotiza directamente mediante el botón 'Cotizar' en las tarjetas de productos.
- ESTRICTAMENTE PROHIBIDO INCLUIR CUALQUIER TIPO DE PREGUNTA O CONSULTA DE CIERRE EN TU RESPUESTA. Tu mensaje debe contener ÚNICAMENTE el texto descriptivo del equipo recomendado, terminando directamente con un punto final.
`,
      `
Consulta del cliente e historial:
${mensajeConContexto}

Criterios de búsqueda analizados en la conversación:
- Marca solicitada: ${finalMarca || (solicitaOtraMarca ? "Otras marcas disponibles" : "Cualquiera")}
- Color de impresión: ${finalColor || "Cualquiera"}
- Formato de papel: ${finalFormato || "Cualquiera"}
- Tipo de equipo: ${finalTipo || "Cualquiera"}
- Volumen mensual estimado: ${tieneNumeroPaginasExplicito && finalVolumen ? `${finalVolumen} pág/mes` : "No especificado por el cliente"}
${solicitaAlternativas ? "- Solicitud de alternativas: El cliente busca opciones distintas a las previamente mostradas." : ""}
${solicitaOtraMarca ? "- Solicitud de otra marca: El cliente busca marcas alternativas a las mostradas previamente." : ""}
${esCambioDeColor ? `- Solicitud de cambio de color: El cliente ajustó la preferencia a ${finalColor}.` : ""}
${esCambioDeMarca ? `- Solicitud de cambio de marca: El cliente ajustó la preferencia a ${finalMarca}.` : ""}
${esConsultaMasRapida ? "- Consulta especial: El cliente busca expresamente la opción de mayor velocidad (máxima velocidad / más rápida). No menciones volúmenes mensuales inventados." : ""}
${ppmObjetivo ? `- Velocidad objetivo solicitada: ${ppmObjetivo} ppm o similar.` : ""}
${modeloEspecificoDetectado ? `- Modelo específico consultado: ${modeloEspecificoDetectado.Nombre_Marca} ${modeloEspecificoDetectado.Nombre_Equipo} (${modeloEspecificoDetectado.Velocidad_BN_Equipo} ppm).` : ""}

Productos seleccionados por el motor de búsqueda (el 1ro es el de mayor precisión):
${JSON.stringify(productosParaIA)}
`
    )

    const clientePreguntoPorMarcaNoOficial = Boolean(marcaEnMensajeActual && esMarcaFueraDeStock)
    const respuestaRaw = respuestaGroq ?? MENSAJE_FUERA_DE_SERVICIO
    const respuesta = respuestaGroq ? sanitizarRespuestaCatalogo(respuestaGroq, clientePreguntoPorMarcaNoOficial) : MENSAJE_FUERA_DE_SERVICIO
    const productosEquipos = respuestaGroq ? resultados : []

    /*
     * GUARDAR HISTORIAL
     */

    const origin = new URL(request.url).origin
    await registrarEnHistorial(origin, sesionId, body.mensaje, respuesta, productosEquipos, {
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
      total: productosEquipos.length,
      respuesta,
      productos: productosEquipos,
    })
  } catch (error: any) {
    if (
      error instanceof GroqRateLimitError ||
      error?.name === "GroqRateLimitError" ||
      error?.status === 429 ||
      isRateLimitOrQuotaError(error?.status || 0, String(error?.message || ""))
    ) {
      console.warn("Límite de tokens/cuota de Groq alcanzado.")
      return NextResponse.json({
        success: true,
        categoria: "general",
        sesion_id: sesionId,
        pregunta: body?.mensaje ?? "",
        respuesta: MENSAJE_FUERA_DE_SERVICIO,
        productos: [],
        quota_exceeded: true,
      })
    }

    console.error("Error chatbot STACK TRACE:", error?.stack || error)

    return NextResponse.json(
      {
        success: false,
        error: MENSAJE_FUERA_DE_SERVICIO,
      },
      { status: 500 }
    )
  }
}
