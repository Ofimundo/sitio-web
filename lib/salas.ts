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
  modelo?: string
  descripcion?: string
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

function groupOpciones(rows: OpcionRow[]): SalaOpcion[] {
  const groups = new Map<string, SalaEquipo[]>()
  for (const row of rows) {
    const code = String(row.codigo_opcion ?? "").trim().toUpperCase()
    if (!code) continue
    const equipos = groups.get(code) ?? []
    equipos.push({
      ID_Producto: String(row.id_producto_opcion ?? ""),
      Nombre_Equipo: row.modelo?.trim() || String(row.id_producto_opcion ?? "Equipo"),
      Nombre_Marca: row.marca?.trim() || "",
      Descripcion: row.descripcion?.trim() || "",
      Imagen_Equipo: row.imagen_Equipo ?? row.imagen_equipo ?? null,
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
export async function getSalasDestacadas() {
  const [destacadas, detalles] = await Promise.all([
    executeQuery<SalaRow>(`SELECT * FROM ${VISTAS.destacadas}`),
    executeQuery<SalaRow>(`SELECT * FROM ${VISTAS.detalle}`),
  ])

  return destacadas.map((destacada, index) => {
    const titulo = destacada.titulo_sala?.trim().toLocaleLowerCase("es-CL")
    const nombre = destacada.nombre_sala?.trim().toLocaleLowerCase("es-CL")
    const detalle = detalles.find((item) => {
      const mismoTitulo = titulo && item.titulo_sala?.trim().toLocaleLowerCase("es-CL") === titulo
      const mismoNombre = nombre && item.nombre_sala?.trim().toLocaleLowerCase("es-CL") === nombre
      return mismoTitulo || mismoNombre
    })

    return mapResumen(detalle ? { ...destacada, ...detalle } : destacada, index)
  }).filter((sala) => sala.ID_Producto.length > 0)
}

/** Catálogo: obtiene el resumen de todas las salas desde la vista de detalle. */
export async function getSalas(filtros: FiltrosSala = {}) {
  const rows = await executeQuery<SalaRow>(`SELECT * FROM ${VISTAS.detalle}`)
  const term = filtros.search?.trim().toLocaleLowerCase("es-CL")
  return rows.map(mapResumen).filter((sala) => {
    const matchesSize = !filtros.tamano || sala.Tamano === filtros.tamano
    const matchesLine = !filtros.linea || sala.Linea === filtros.linea
    const haystack = `${sala.Nombre} ${sala.Titulo} ${sala.Descripcion}`.toLocaleLowerCase("es-CL")
    return matchesSize && matchesLine && (!term || haystack.includes(term))
  })
}

/** Detalle/cotización: compone en paralelo la ficha, características y opciones A/B. */
export async function getSalaByIdentifier(identifier: string) {
  const normalized = normalizeIdentifier(identifier)
  const allRows = await executeQuery<SalaRow>(`SELECT * FROM ${VISTAS.detalle}`)
  const row = allRows.find((candidate) => normalizeIdentifier(idProducto(candidate)) === normalized)
  if (!row) return null

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
  return sala
}