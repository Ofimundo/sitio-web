import type { Equipo } from "./types"

export const VISTA_PRODUCTOS = "[THE_COOLER_SGCX].[MPR].[VT_SEL_PRODUCTO]"
export const VISTA_PRODUCTO_DETALLE = "[THE_COOLER_SGCX].[MPR].[VT_SEL_PRODUCTO_DETALLE]"

export interface ProductoRow {
  id_Producto?: string
  id_producto?: string
  marca?: string
  modelo?: string
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

function tipoProducto(row: ProductoRow) {
  const contenido = `${texto(row.funciones_equipo)} ${texto(row.descripcion_corta)} ${texto(row.descripcion_larga)}`.toLocaleLowerCase("es-CL")
  return contenido.includes("multifunci") || contenido.includes("escáner") || contenido.includes("escaner")
    ? "Multifuncional"
    : "Impresora"
}

/** Adapta las columnas publicadas por MPR al contrato utilizado por la interfaz. */
export function mapProducto(row: ProductoRow): Equipo {
  return {
    ID_Producto: texto(row.id_Producto ?? row.id_producto),
    ID_Marca: 0,
    Nombre_Equipo: texto(row.modelo),
    Tipo_Equipo: tipoProducto(row),
    Tecnologia_Equipo: texto(row.tecnologia_impresion),
    Color_Equipo: texto(row.tipo_color),
    Tamano_Papel_Equipo: texto(row.tamano_papel) || null,
    Velocidad_BN_Equipo: numero(row.bn_ppm),
    Velocidad_Color_Equipo: null,
    Velocidad_1ra_Pag_BN_Equipo: null,
    Velocidad_1ra_Pag_Color_Equipo: null,
    Capacidad_Bandeja1_Equipo: numero(row.capacidad_bandeja_papel),
    Capacidad_Bypass_Equipo: null,
    Ciclo_Recomendado_Equipo: texto(row.ciclo_recomendado_equipo) || null,
    Ciclo_Mensual_Equipo: null,
    Ciclo_Maximo_Equipo: null,
    Tipo_Pantalla_Equipo: texto(row.tipo_pantalla_equipo) || null,
    Tamano_Pantalla_Equipo: null,
    Memoria_RAM_Equipo: texto(row.memoria_ram_equipo) || null,
    Procesador_Equipo: null,
    Disco_Duro_Equipo: texto(row.disco_duro_equipo) || null,
    Funciones_Equipo: texto(row.funciones_equipo) || null,
    Conectividad_Equipo: null,
    Duracion_Bateria_Equipo: null,
    Archivo_PDF_Equipo: null,
    Imagen_Equipo: texto(row.imagen_Equipo ?? row.imagen_equipo) || null,
    Descripcion_Equipo: texto(row.descripcion_larga) || texto(row.descripcion_corta) || null,
    Fecha_Carga_Equipo: null,
    Fecha_Registro_Equipo: null,
    Nombre_Marca: texto(row.marca),
  }
}
