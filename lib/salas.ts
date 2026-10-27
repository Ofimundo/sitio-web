import { executeQuery } from "./db"
import type {
  FiltrosSala,
  Sala,
  SalaComplemento,
  SalaEquipo,
  SalaOpcion,
} from "./types"

/**
 * Complementos provisionales.
 * Permanecen locales hasta que MPR publique la vista correspondiente.
 */
export const complementosProvisionales: SalaComplemento[] = [
  { ID_Producto: "I3-ELM2", Nombre_Equipo: "ELM2", Nombre_Marca: "I3 Technologies", Descripcion: "Pantalla interactiva para salas de clases y reuniones.", Categoria: "Pantallas interactivas", Orden: 1 },
  { ID_Producto: "SAMSUNG-WAF", Nombre_Equipo: "WAF", Nombre_Marca: "Samsung", Descripcion: "Pantalla interactiva disponible en distintos tamaños.", Categoria: "Pantallas interactivas", Orden: 2 },
  { ID_Producto: "LOGI-SCRIBE", Nombre_Equipo: "Scribe", Nombre_Marca: "Logitech", Descripcion: "Capturador de pizarra para colaboración híbrida.", Categoria: "Captura de pizarra", Orden: 3 },
  { ID_Producto: "KAPTIVO", Nombre_Equipo: "Kaptivo", Nombre_Marca: "Kaptivo", Descripcion: "Capturador de pizarra para compartir contenido en línea.", Categoria: "Captura de pizarra", Orden: 4 },
  { ID_Producto: "LOGI-SCHEDULER", Nombre_Equipo: "Scheduler", Nombre_Marca: "Logitech", Descripcion: "Panel para agendamiento y disponibilidad de salas.", Categoria: "Agendamiento", Orden: 5 },
  { ID_Producto: "BIAMP-EVOKO", Nombre_Equipo: "Evoko", Nombre_Marca: "Biamp", Descripcion: "Solución de agendamiento y gestión de salas.", Categoria: "Agendamiento", Orden: 6 },
]

type SalaRow = {
  id_Producto?: string
  id_producto?: string
  titulo_sala?: string
  nombre_sala?: string
  descripcion_corta?: string
  configuraciones_sala?: number
  tamano_sala?: string
  imagen_Equipo?: string
  imagen_equipo?: string
  sala_destacada?: string
  linea?: string
  descripcion_larga?: string
}

type CaracteristicaRow = {
  tipo?: string
  id_Producto?: string
  id_producto?: string
  caracteristica?: string
  orden_caracteristica?: number
}

type OpcionRow = {
  id_Producto?: string
  id_producto?: string
  codigo_opcion?: string
  id_producto_opcion?: string | number
  marca?: string
  Marca?: string
  modelo?: string
  Modelo?: string
  descripcion?: string
  Descripcion?: string
  imagen?: string
  imagen_Equipo?: string
  imagen_equipo?: string
}

const VISTAS = {
  destacadas: "[THE_COOLER_SGCX].[MPR].[VT_SEL_SALA_DESTACADA]",
  detalle: "[THE_COOLER_SGCX].[MPR].[VT_SEL_SALA_DETALLE]",
  caracteristicas: "[THE_COOLER_SGCX].[MPR].[VT_SEL_SALA_CARACTERISTICAS]",
  opciones: "[THE_COOLER_SGCX].[MPR].[VT_SEL_SALA_OPCION]",
} as const

function idProducto(row: SalaRow | CaracteristicaRow | OpcionRow) {
  return String(row.id_Producto ?? row.id_producto ?? "").trim()
}

function slugFromId(id: string) {
  return id.replace(/^sala_/i, "").replaceAll("_", "-").toLowerCase()
}

function normalizeIdentifier(value: string) {
  return value.trim().toLowerCase().replaceAll("-", "_").replace(/^sala_/, "")
}

function parseTamano(value = ""): Sala["Tamano"] {
  const match = value.toUpperCase().match(/(?:TAMAÑO|TAMANO)?\s*([SML])\b/)
  return (match?.[1] as Sala["Tamano"]) ?? "M"
}

function parseLinea(row: SalaRow) {
  if (row.linea?.trim()) return row.linea.trim()
  return row.nombre_sala?.trim().split(/\s+/)[0] ?? "Salas"
}

function isDestacada(value?: string) {
  return ["SI", "SÍ", "TRUE", "1"].includes(String(value ?? "").trim().toUpperCase())
}

function mapResumen(row: SalaRow, index: number): Sala {
  const id = idProducto(row)
  return {
    ID_Sala: index + 1,
    ID_Producto: id,
    Slug: slugFromId(id),
    Nombre: row.nombre_sala?.trim() || row.titulo_sala?.trim() || id,
    Linea: parseLinea(row),
    Tamano: parseTamano(row.tamano_sala),
    Titulo: row.titulo_sala?.trim() || row.nombre_sala?.trim() || id,
    Descripcion: row.descripcion_larga?.trim() || row.descripcion_corta?.trim() || "",
    Imagen_Principal: row.imagen_Equipo ?? row.imagen_equipo ?? "",
    Beneficios: [],
    Compatibilidad: [],
    Destacada: isDestacada(row.sala_destacada),
    Orden: index + 1,
    Opciones: [],
    Complementos: complementosProvisionales,
  }
}

/**
 * Mapeo de imágenes de equipos a los archivos locales en /images/Salas configuracion/
 */
function getLocalImagenEquipo(row: OpcionRow): string | null {
  const modelo = (row.Modelo || row.modelo || "").toLowerCase()
  const idProductoOpcion = String(row.id_producto_opcion || "").toLowerCase()
  const descripcion = (row.Descripcion || row.descripcion || "").toLowerCase()
  const rawImg = (row.imagen || row.imagen_Equipo || row.imagen_equipo || "").toLowerCase()

  const matchText = `${modelo} ${idProductoOpcion} ${descripcion} ${rawImg}`

  if (matchText.includes("c-pro infinity") || matchText.includes("cpi-420") || matchText.includes("20x")) {
    return "/images/Salas configuracion/C-Pro Infinity_20X.png"
  }
  if (matchText.includes("maxhub") || matchText.includes("u50")) {
    return "/images/Salas configuracion/MAXHUB UC U50 _Barra USB.jpg"
  }
  if (matchText.includes("meetup")) {
    return "/images/Salas configuracion/MeetUp _2.webp"
  }
  if (matchText.includes("huddle") || matchText.includes("960-001509")) {
    return "/images/Salas configuracion/Rally Bar Huddle_Graphite.png"
  }
  if (matchText.includes("rally bar mini") || matchText.includes("960-001338")) {
    return "/images/Salas configuracion/Rally Bar_Mini.jpg"
  }
  if (matchText.includes("rally bar") || matchText.includes("960-001310")) {
    return "/images/Salas configuracion/Rally Bar_Graphite.webp"
  }
  if (matchText.includes("t-pod") || matchText.includes("tpapb") || matchText.includes("beamforming")) {
    return "/images/Salas configuracion/T-Pod AIR Pro _Beamforming.png"
  }
  if (matchText.includes("aspen 4 65") || matchText.includes("aspen 4_65") || matchText.includes("10010821")) {
    return "/images/Salas configuracion/i3CONNECT ASPEN 4_65.webp"
  }
  if (matchText.includes("aspen 4 75") || matchText.includes("aspen 4_75") || matchText.includes("10010822")) {
    return "/images/Salas configuracion/i3CONNECT ASPEN 4_75.webp"
  }
  if (matchText.includes("aspen 4 86") || matchText.includes("aspen 4_86") || matchText.includes("10010823")) {
    return "/images/Salas configuracion/i3CONNECT ASPEN 4_86.webp"
  }
  if (matchText.includes("elm 2 75") || matchText.includes("elm 2_75") || matchText.includes("10010731")) {
    return "/images/Salas configuracion/i3CONNECT ELM 2 _75.webp"
  }
  if (matchText.includes("elm 2 86") || matchText.includes("elm 2_86") || matchText.includes("elm 2_85") || matchText.includes("10010732")) {
    return "/images/Salas configuracion/i3CONNECT ELM 2 _86.webp"
  }
  if (matchText.includes("elm 2 65") || matchText.includes("elm 2_65") || matchText.includes("10010730")) {
    return "/images/Salas configuracion/i3CONNECT ELM 2_ 65.webp"
  }
  if (matchText.includes("mount 2") || matchText.includes("mount2") || matchText.includes("10010756") || matchText.includes("960-001693")) {
    return "/images/Salas configuracion/i3CONNECT _Mount 2.webp"
  }

  return null
}

const AWS_SALAS_BASE = "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/05-salas"

/**
 * Obtiene la galería completa de imágenes en AWS CloudFront para cada equipo de sala.
 */
export function getGaleriaImagenesEquipo(row: {
  modelo?: string
  Modelo?: string
  id_producto_opcion?: string | number
  descripcion?: string
  Descripcion?: string
  imagen?: string
}): string[] {
  const modelo = (row.Modelo || row.modelo || "").toLowerCase()
  const idProductoOpcion = String(row.id_producto_opcion || "").toLowerCase()
  const descripcion = (row.Descripcion || row.descripcion || "").toLowerCase()
  const rawImg = (row.imagen || "").toLowerCase()

  const matchText = `${modelo} ${idProductoOpcion} ${descripcion} ${rawImg}`

  // C-Pro Infinity 20X
  if (matchText.includes("c-pro infinity") || matchText.includes("cpi-420") || matchText.includes("20x")) {
    return [
      `${AWS_SALAS_BASE}/C-Pro%20Infinity_20X.png`,
      `${AWS_SALAS_BASE}/C-Pro%20Infinity%2020X_02.png`,
      `${AWS_SALAS_BASE}/C-Pro%20Infinity%2020X_03.jpg`,
      `${AWS_SALAS_BASE}/C-Pro%20Infinity%2020X_04.png`,
    ]
  }

  // MAXHUB UC U50
  if (matchText.includes("maxhub") || matchText.includes("u50")) {
    return [
      `${AWS_SALAS_BASE}/MAXHUB%20UC%20U50%20_Barra%20USB.jpg`,
      `${AWS_SALAS_BASE}/MAXHUB%20UC%20U50%20_Barra%20USB_02.jpg`,
      `${AWS_SALAS_BASE}/MAXHUB%20UC%20U50%20_Barra%20USB_03.webp`,
    ]
  }

  // MeetUp 2
  if (matchText.includes("meetup")) {
    return [
      `${AWS_SALAS_BASE}/MeetUp%20_2.webp`,
      `${AWS_SALAS_BASE}/MeetUp_2_02.jpg`,
      `${AWS_SALAS_BASE}/MeetUp_2_03.jpg`,
    ]
  }

  // Rally Bar Huddle Graphite
  if (matchText.includes("huddle") || matchText.includes("960-001509")) {
    return [
      `${AWS_SALAS_BASE}/Rally%20Bar%20Huddle_Graphite.png`,
      `${AWS_SALAS_BASE}/Rally%20Bar%20Huddle_%20Graphite_02.webp`,
      `${AWS_SALAS_BASE}/Rally%20Bar%20Huddle_%20Graphite_03.webp`,
      `${AWS_SALAS_BASE}/Rally%20Bar%20Huddle_%20Graphite_04.webp`,
    ]
  }

  // Rally Bar Mini
  if (matchText.includes("rally bar mini") || matchText.includes("960-001338")) {
    return [
      `${AWS_SALAS_BASE}/Rally%20Bar_Mini.jpg`,
      `${AWS_SALAS_BASE}/Rally%20Bar_Mini_02.jpg`,
      `${AWS_SALAS_BASE}/Rally%20Bar_Mini_03.webp`,
      `${AWS_SALAS_BASE}/Rally%20Bar_Mini_04.webp`,
    ]
  }

  // Rally Bar Graphite
  if (matchText.includes("rally bar") || matchText.includes("960-001310")) {
    return [
      `${AWS_SALAS_BASE}/Rally%20Bar_Graphite.webp`,
      `${AWS_SALAS_BASE}/Rally%20Bar_Graphite_02.webp`,
      `${AWS_SALAS_BASE}/Rally%20Bar_Graphite_03.webp`,
      `${AWS_SALAS_BASE}/Rally%20Bar_Graphite_04.jpg`,
    ]
  }

  // T-Pod AIR Pro Beamforming
  if (matchText.includes("t-pod") || matchText.includes("tpapb") || matchText.includes("beamforming")) {
    return [
      `${AWS_SALAS_BASE}/T-Pod%20AIR%20Pro%20_Beamforming.png`,
      `${AWS_SALAS_BASE}/T-Pod%20AIR%20Pro%20Beamforming_02.png`,
      `${AWS_SALAS_BASE}/T-Pod%20AIR%20Pro%20Beamforming_03.jpg`,
    ]
  }

  // i3CONNECT ASPEN 4 65
  if (matchText.includes("aspen 4 65") || matchText.includes("aspen 4_65") || matchText.includes("10010821")) {
    return [
      `${AWS_SALAS_BASE}/i3CONNECT%20ASPEN%204_65.webp`,
      `${AWS_SALAS_BASE}/i3CONNECT%20ASPEN%204%2065_02.png`,
      `${AWS_SALAS_BASE}/i3CONNECT%20ASPEN%204%2065_03.png`,
      `${AWS_SALAS_BASE}/i3CONNECT%20ASPEN%204%2065_04.webp`,
    ]
  }

  // i3CONNECT ASPEN 4 75
  if (matchText.includes("aspen 4 75") || matchText.includes("aspen 4_75") || matchText.includes("10010822")) {
    return [
      `${AWS_SALAS_BASE}/i3CONNECT%20ASPEN%204_75.webp`,
      `${AWS_SALAS_BASE}/i3CONNECT%20ASPEN%204%2075_02.jpg`,
      `${AWS_SALAS_BASE}/i3CONNECT%20ASPEN%204%2075_03.png`,
    ]
  }

  // i3CONNECT ASPEN 4 86
  if (matchText.includes("aspen 4 86") || matchText.includes("aspen 4_86") || matchText.includes("10010823")) {
    return [
      `${AWS_SALAS_BASE}/i3CONNECT%20ASPEN%204_86.webp`,
      `${AWS_SALAS_BASE}/i3CONNECT%20ASPEN%204%2086_02.png`,
      `${AWS_SALAS_BASE}/i3CONNECT%20ASPEN%204%2086_03.webp`,
    ]
  }

  // i3CONNECT ELM 2 75
  if (matchText.includes("elm 2 75") || matchText.includes("elm 2_75") || matchText.includes("10010731")) {
    return [
      `${AWS_SALAS_BASE}/i3CONNECT%20ELM%202%20_75.webp`,
      `${AWS_SALAS_BASE}/i3CONNECT%20ELM%202%2075_02.png`,
      `${AWS_SALAS_BASE}/i3CONNECT%20ELM%202%2075_03.webp`,
    ]
  }

  // i3CONNECT ELM 2 86
  if (matchText.includes("elm 2 86") || matchText.includes("elm 2_86") || matchText.includes("elm 2_85") || matchText.includes("10010732")) {
    return [
      `${AWS_SALAS_BASE}/i3CONNECT%20ELM%202%20_86.webp`,
      `${AWS_SALAS_BASE}/i3CONNECT%20ELM%202%2086_02.png`,
      `${AWS_SALAS_BASE}/i3CONNECT%20ELM%202%2086_03.webp`,
      `${AWS_SALAS_BASE}/i3CONNECT%20ELM%202%2086_04.png`,
    ]
  }

  // i3CONNECT ELM 2 65
  if (matchText.includes("elm 2 65") || matchText.includes("elm 2_65") || matchText.includes("10010730")) {
    return [
      `${AWS_SALAS_BASE}/i3CONNECT%20ELM%202_%2065.webp`,
      `${AWS_SALAS_BASE}/i3CONNECT%20ELM%202%2065_02.webp`,
      `${AWS_SALAS_BASE}/i3CONNECT%20ELM%202%2065_03.jpg`,
      `${AWS_SALAS_BASE}/i3CONNECT%20ELM%202%2065_04.jpg`,
    ]
  }

  // i3CONNECT Mount 2
  if (matchText.includes("mount 2") || matchText.includes("mount2") || matchText.includes("10010756") || matchText.includes("960-001693")) {
    return [
      `${AWS_SALAS_BASE}/i3CONNECT%20_Mount%202.webp`,
      `${AWS_SALAS_BASE}/i3CONNECT_Mount%202_02.png`,
      `${AWS_SALAS_BASE}/i3CONNECT%20Mount%202_03.png`,
      `${AWS_SALAS_BASE}/i3CONNECT%20Mount%202_04.webp`,
    ]
  }

  return []
}

function groupOpciones(rows: OpcionRow[]): SalaOpcion[] {
  const groups = new Map<string, SalaEquipo[]>()
  for (const row of rows) {
    const code = String(row.codigo_opcion ?? "").trim().toUpperCase()
    if (!code) continue
    const equipos = groups.get(code) ?? []

    const cleanImg = getLocalImagenEquipo(row)
    const galeria = getGaleriaImagenesEquipo(row)
    const primaryImg = cleanImg || (galeria.length > 0 ? galeria[0] : null)

    const nombreEquipo = row.modelo?.trim() || row.Modelo?.trim() || String(row.id_producto_opcion ?? "Equipo")
    const nombreMarca = row.marca?.trim() || row.Marca?.trim() || ""
    const descripcion = (row.Descripcion ?? row.descripcion ?? "")?.trim()

    equipos.push({
      ID_Producto: String(row.id_producto_opcion ?? ""),
      Nombre_Equipo: nombreEquipo,
      Nombre_Marca: nombreMarca,
      Descripcion: descripcion,
      Imagen_Equipo: primaryImg,
      Imagenes_Equipo: galeria.length > 0 ? galeria : (primaryImg ? [primaryImg] : []),
      Orden: equipos.length + 1,
    })
    groups.set(code, equipos)
  }

  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([code, equipos], index) => ({
    ID_Opcion: index + 1,
    Codigo: code,
    Nombre: `Opción ${code}`,
    Equipos: equipos,
  }))
}

async function getCaracteristicas(identifier: string) {
  return executeQuery<CaracteristicaRow>(
    `SELECT * FROM ${VISTAS.caracteristicas} WHERE id_producto = @idProducto ORDER BY orden_caracteristica`,
    { idProducto: identifier },
  )
}

async function getOpciones(identifier: string) {
  return executeQuery<OpcionRow>(
    `SELECT * FROM ${VISTAS.opciones} WHERE id_producto = @idProducto ORDER BY codigo_opcion`,
    { idProducto: identifier },
  )
}

/**
 * Inicio: la vista de destacadas no expone id_producto. Se cruza con la vista
 * de detalle para conservar el mismo identificador usado por catálogo y detalle.
 */
import salasFallback from "../data/salas.json"

export async function getSalasDestacadas(): Promise<Sala[]> {
  try {
    const [destacadas, detalles] = await Promise.all([
      executeQuery<SalaRow>(`SELECT * FROM ${VISTAS.destacadas}`),
      executeQuery<SalaRow>(`SELECT * FROM ${VISTAS.detalle}`),
    ])

    let mapped = destacadas.map((destacada, index) => {
      const titulo = destacada.titulo_sala?.trim().toLocaleLowerCase("es-CL")
      const nombre = destacada.nombre_sala?.trim().toLocaleLowerCase("es-CL")
      const detalle = detalles.find((item) => {
        const mismoTitulo = titulo && item.titulo_sala?.trim().toLocaleLowerCase("es-CL") === titulo
        const mismoNombre = nombre && item.nombre_sala?.trim().toLocaleLowerCase("es-CL") === nombre
        return mismoTitulo || mismoNombre
      })

      return mapResumen(detalle ? { ...destacada, ...detalle } : destacada, index)
    }).filter((sala) => sala.ID_Producto.length > 0)

    if (mapped.length < 3 && detalles.length > 0) {
      const allMapped = detalles.map(mapResumen)
      for (const s of allMapped) {
        if (mapped.length >= 3) break
        if (!mapped.some((m) => m.ID_Producto === s.ID_Producto)) {
          mapped.push(s)
        }
      }
    }

    if (mapped.length > 0) {
      await Promise.all(
        mapped.map(async (sala) => {
          try {
            const optionRows = await getOpciones(sala.ID_Producto)
            if (optionRows && optionRows.length > 0) {
              sala.Opciones = groupOpciones(optionRows)
            }
          } catch { }
          if (sala.Opciones.length === 0 && salasFallback) {
            const fb = (salasFallback as Sala[]).find(
              (f) =>
                normalizeIdentifier(f.ID_Producto) === normalizeIdentifier(sala.ID_Producto) ||
                normalizeIdentifier(f.Slug) === normalizeIdentifier(sala.Slug)
            )
            if (fb?.Opciones) sala.Opciones = fb.Opciones
          }
        })
      )
      return mapped
    }
    throw new Error("No DB rooms")
  } catch (error) {
    const list = (salasFallback as Sala[]) || []
    const destacadas = list.filter((sala) => sala.Destacada)
    if (destacadas.length >= 3) return destacadas
    const result = [...destacadas]
    for (const s of list) {
      if (result.length >= 3) break
      if (!result.some((r) => r.ID_Producto === s.ID_Producto)) {
        result.push(s)
      }
    }
    return result
  }
}

/** Catálogo: obtiene el resumen de todas las salas desde BD o JSON local como fallback. */
export async function getSalas(filtros: FiltrosSala = {}): Promise<Sala[]> {
  let list: Sala[] = []
  try {
    const rows = await executeQuery<SalaRow>(`SELECT * FROM ${VISTAS.detalle}`)
    if (rows && rows.length > 0) {
      list = rows.map(mapResumen)
      await Promise.all(
        list.map(async (sala) => {
          try {
            const optionRows = await getOpciones(sala.ID_Producto)
            if (optionRows && optionRows.length > 0) {
              sala.Opciones = groupOpciones(optionRows)
            }
          } catch { }
          if (sala.Opciones.length === 0 && salasFallback) {
            const fb = (salasFallback as Sala[]).find(
              (f) =>
                normalizeIdentifier(f.ID_Producto) === normalizeIdentifier(sala.ID_Producto) ||
                normalizeIdentifier(f.Slug) === normalizeIdentifier(sala.Slug)
            )
            if (fb?.Opciones) sala.Opciones = fb.Opciones
          }
        })
      )
    } else {
      list = (salasFallback as Sala[]) || []
    }
  } catch (error) {
    list = (salasFallback as Sala[]) || []
  }

  const term = filtros.search?.trim().toLocaleLowerCase("es-CL")
  return list.filter((sala) => {
    const matchesSize = !filtros.tamano || sala.Tamano === filtros.tamano
    const matchesLine = !filtros.linea || sala.Linea === filtros.linea
    const haystack = `${sala.Nombre} ${sala.Titulo} ${sala.Descripcion}`.toLocaleLowerCase("es-CL")
    return matchesSize && matchesLine && (!term || haystack.includes(term))
  })
}

/** Detalle/cotización: compone la ficha de sala. */
export async function getSalaByIdentifier(identifier: string): Promise<Sala | null> {
  const normalized = normalizeIdentifier(identifier)

  let fallbackSala: Sala | null = null
  if (salasFallback && salasFallback.length > 0) {
    fallbackSala = (salasFallback as Sala[]).find((candidate) =>
      normalizeIdentifier(candidate.ID_Producto) === normalized ||
      normalizeIdentifier(candidate.Slug) === normalized
    ) || null
  }

  try {
    const allRows = await executeQuery<SalaRow>(`SELECT * FROM ${VISTAS.detalle}`)
    const row = allRows.find((candidate) => normalizeIdentifier(idProducto(candidate)) === normalized)
    if (row) {
      const productId = idProducto(row)
      const [features, optionRows] = await Promise.all([
        getCaracteristicas(productId),
        getOpciones(productId),
      ])
      const sala = mapResumen(row, allRows.indexOf(row))
      sala.Beneficios = features
        .filter((item) => item.tipo?.trim().toLowerCase() === "funcion")
        .map((item) => item.caracteristica?.trim())
        .filter((item): item is string => Boolean(item))
      sala.Compatibilidad = features
        .filter((item) => item.tipo?.trim().toLowerCase() === "compatibilidad")
        .map((item) => item.caracteristica?.trim())
        .filter((item): item is string => Boolean(item))
      sala.Opciones = groupOpciones(optionRows)

      if (fallbackSala) {
        if (sala.Opciones.length === 0) sala.Opciones = fallbackSala.Opciones
        if (sala.Beneficios.length === 0) sala.Beneficios = fallbackSala.Beneficios
        if (sala.Compatibilidad.length === 0) sala.Compatibilidad = fallbackSala.Compatibilidad
      }
      return sala
    }
  } catch (error) {
    // DB fail, use fallback
  }

  return fallbackSala
}
