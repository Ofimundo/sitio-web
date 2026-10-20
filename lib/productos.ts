import { executeQuery } from "./db"
import type { Equipo } from "./types"
import equiposFallback from "../data/equipos.json"

export const VISTA_PRODUCTOS = "[THE_COOLER_SGCX].[MPR].[VT_SEL_PRODUCTO]"
export const VISTA_PRODUCTO_DETALLE = "[THE_COOLER_SGCX].[MPR].[VT_SEL_PRODUCTO_DETALLE]"
export const TABLA_PRODUCTO_RESPALDO = "[THE_COOLER_SGCX].[MPR].[producto_RESPALDO]"

// Query optimizada que une la vista con la tabla de productos para obtener nombre_Equipo real
export const QUERY_PRODUCTOS_CON_DETALLE = `
  SELECT v.*, ISNULL(r.nombre_Equipo, v.modelo) AS nombre_Equipo
  FROM ${VISTA_PRODUCTO_DETALLE} v
  LEFT JOIN ${TABLA_PRODUCTO_RESPALDO} r ON v.id_producto = r.id_Producto
`

export interface ProductoRow {
  id_Producto?: string
  id_producto?: string
  marca?: string
  modelo?: string
  nombre_Equipo?: string
  nombre_equipo?: string
  Nombre_Equipo?: string
  descripcion_corta?: string
  descripcion_larga?: string
  bn_ppm?: number | string
  capacidad_bandeja_papel?: number | string
  ciclo_recomendado_equipo?: string
  tipo_pantalla_equipo?: string
  tecnologia_impresion?: string
  funciones_equipo?: string
  tamano_papel?: string
  memoria_ram_equipo?: string
  disco_duro_equipo?: string
  tipo_color?: string
  imagen_Equipo?: string
  imagen_equipo?: string
  sala_destacada?: string
}

function texto(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function numero(value: unknown) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const equiposFallbackMap = new Map<string, Equipo>(
  (equiposFallback as Equipo[]).map((e) => [String(e.ID_Producto).toLowerCase().trim(), e])
)

function tipoProducto(row: ProductoRow) {
  const contenido = `${texto(row.funciones_equipo)} ${texto(row.descripcion_corta)} ${texto(row.descripcion_larga)} ${texto(row.nombre_Equipo ?? row.modelo)}`.toLocaleLowerCase("es-CL")
  return (
    contenido.includes("multifunci") ||
    contenido.includes("escáner") ||
    contenido.includes("escaner") ||
    contenido.includes("escaneo") ||
    contenido.includes("copia") ||
    contenido.includes("copiadora") ||
    contenido.includes("copiado") ||
    contenido.includes("fax") ||
    contenido.includes("scan")
  )
    ? "Multifuncional"
    : "Impresora"
}

/** Adapta las columnas publicadas por MPR al contrato utilizado por la interfaz. */
export function mapProducto(row: ProductoRow): Equipo {
  const id = texto(row.id_Producto ?? row.id_producto)
  const fallback = equiposFallbackMap.get(id.toLowerCase().trim())
  const nombreDetectado = texto(
    row.nombre_Equipo ??
    row.nombre_equipo ??
    row.Nombre_Equipo ??
    row.modelo
  )

  return {
    ID_Producto: id,
    ID_Marca: 0,
    Nombre_Equipo: nombreDetectado || fallback?.Nombre_Equipo || "",
    Tipo_Equipo: tipoProducto(row) || fallback?.Tipo_Equipo || "Multifuncional",
    Tecnologia_Equipo: texto(row.tecnologia_impresion) || fallback?.Tecnologia_Equipo || "",
    Color_Equipo: texto(row.tipo_color) || fallback?.Color_Equipo || "",
    Tamano_Papel_Equipo: texto(row.tamano_papel) || fallback?.Tamano_Papel_Equipo || null,
    Velocidad_BN_Equipo: numero(row.bn_ppm) ?? fallback?.Velocidad_BN_Equipo ?? null,
    Velocidad_Color_Equipo: fallback?.Velocidad_Color_Equipo ?? null,
    Velocidad_1ra_Pag_BN_Equipo: fallback?.Velocidad_1ra_Pag_BN_Equipo ?? null,
    Velocidad_1ra_Pag_Color_Equipo: fallback?.Velocidad_1ra_Pag_Color_Equipo ?? null,
    Capacidad_Bandeja1_Equipo: numero(row.capacidad_bandeja_papel) ?? fallback?.Capacidad_Bandeja1_Equipo ?? null,
    Capacidad_Bypass_Equipo: fallback?.Capacidad_Bypass_Equipo ?? null,
    Ciclo_Recomendado_Equipo: texto(row.ciclo_recomendado_equipo) || fallback?.Ciclo_Recomendado_Equipo || null,
    Ciclo_Mensual_Equipo: fallback?.Ciclo_Mensual_Equipo ?? null,
    Ciclo_Maximo_Equipo: fallback?.Ciclo_Maximo_Equipo ?? null,
    Tipo_Pantalla_Equipo: texto(row.tipo_pantalla_equipo) || fallback?.Tipo_Pantalla_Equipo || null,
    Tamano_Pantalla_Equipo: fallback?.Tamano_Pantalla_Equipo ?? null,
    Memoria_RAM_Equipo: texto(row.memoria_ram_equipo) || fallback?.Memoria_RAM_Equipo || null,
    Procesador_Equipo: fallback?.Procesador_Equipo ?? null,
    Disco_Duro_Equipo: texto(row.disco_duro_equipo) || fallback?.Disco_Duro_Equipo || null,
    Funciones_Equipo: texto(row.funciones_equipo) || fallback?.Funciones_Equipo || null,
    Conectividad_Equipo: fallback?.Conectividad_Equipo ?? null,
    Duracion_Bateria_Equipo: fallback?.Duracion_Bateria_Equipo ?? null,
    Archivo_PDF_Equipo: fallback?.Archivo_PDF_Equipo ?? null,
    Imagen_Equipo: texto(row.imagen_Equipo ?? row.imagen_equipo) || fallback?.Imagen_Equipo || null,
    Descripcion_Equipo: texto(row.descripcion_larga) || texto(row.descripcion_corta) || fallback?.Descripcion_Equipo || null,
    Fecha_Carga_Equipo: null,
    Fecha_Registro_Equipo: null,
    Nombre_Marca: texto(row.marca) || fallback?.Nombre_Marca || "",
  }
}

export async function getEquipos(): Promise<Equipo[]> {
  try {
    if (equiposFallback && equiposFallback.length > 0) {
      return equiposFallback as Equipo[]
    }
    const rows = await executeQuery<ProductoRow>(QUERY_PRODUCTOS_CON_DETALLE)
    return rows.map(mapProducto)
  } catch (error) {
    console.warn("Error o ausencia de BD. Usando catálogo estático JSON:", error)
    return (equiposFallback as Equipo[]) || []
  }
}

