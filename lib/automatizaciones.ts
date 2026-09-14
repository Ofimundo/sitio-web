import { executeQuery } from "./db"
import { automatizacionesFallback, obtenerAutomatizacionPorSlug } from "./automatizaciones-data"
import type { Automatizacion, FiltrosAutomatizacion } from "./types"

export type { Automatizacion, PlanAutomatizacion, FiltrosAutomatizacion } from "./types"
export { automatizaciones, automatizacionesFallback, categoriasAutomatizacion, modalidadesAutomatizacion, obtenerAutomatizacionPorSlug } from "./automatizaciones-data"

type AutomatizacionRow = {
  id_Producto?: string
  id_producto?: string
  marca?: string
  modelo?: string
  nombre_producto?: string
  descripcion_corta?: string
  link_imagen?: string
  producto_destacado?: string
  clasificacion?: string
  beneficio?: string
  modalidad?: string
}

type CaracteristicaRow = {
  tipo?: string
  id_Producto?: string
  id_producto?: string
  caracteristica?: string
  orden_caracteristica?: number
}

const VISTAS = {
  automatizacion: "[THE_COOLER_SGCX].[MPR].[VT_SEL_AUTOMATIZACION]",
  caracteristicas: "[THE_COOLER_SGCX].[MPR].[VT_SEL_AUTOMATIZACION_CARACTERISTICAS]",
} as const

function idProducto(row: AutomatizacionRow | CaracteristicaRow) {
  return String(row.id_Producto ?? row.id_producto ?? "").trim()
}

function slugFromId(id: string) {
  return id.replace(/^auto_/i, "").replaceAll("_", "-").toLowerCase()
}

function normalizeIdentifier(value: string) {
  return value.trim().toLowerCase().replaceAll("-", "_").replace(/^auto_/, "")
}

function isDestacada(value?: string) {
  return ["SI", "SÍ", "TRUE", "1"].includes(String(value ?? "").trim().toUpperCase())
}

function cleanText(text = "") {
  return text.trim().replace(/\s*\.{2,}\s*$/, "").replace(/\.$/, "").trim()
}

function mapResumen(row: AutomatizacionRow): Automatizacion {
  const id = idProducto(row)
  const nombre = row.nombre_producto?.trim() || row.modelo?.trim() || id
  const slug = slugFromId(id)
  const fallback = obtenerAutomatizacionPorSlug(slug)

  const dbDescClean = cleanText(row.descripcion_corta)

  // Resumen corto de 1 frase para la tarjeta del catálogo
  const resumen = row.descripcion_corta?.trim() || fallback.resumen || ""

  // Descripción extendida y completa solo para la página de detalle (Ver más)
  const descripcion = fallback.descripcion
    ? (dbDescClean ? `${dbDescClean}. ${fallback.descripcion}` : fallback.descripcion)
    : (dbDescClean || resumen)

  return {
    ID_Producto: id,
    slug,
    nombre,
    nombreCorto: row.modelo?.trim() || fallback.nombreCorto || nombre,
    categoria: row.clasificacion?.trim() || fallback.categoria || "Finanzas",
    modalidad: row.modalidad?.trim() || fallback.modalidad || "Integración personalizada",
    beneficio: row.beneficio?.trim() || fallback.beneficio || "Alta precisión",
    resumen,
    descripcion,
    imagen: row.link_imagen?.trim() || fallback.imagen || "/images/automatizaciones/aceptacion-facturas.png",
    icono: fallback.icono || "fa-robot",
    destacada: isDestacada(row.producto_destacado),
    capacidades: fallback.capacidades || [],
    integraciones: fallback.integraciones || [],
    metricas: fallback.metricas || [],
    planes: fallback.planes || [],
  }
}

import automatizacionesJson from "../data/automatizaciones.json"

/** Catálogo: obtiene el listado de automatizaciones desde la base de datos SQL o JSON local. */
export async function getAutomatizaciones(filtros: FiltrosAutomatizacion = {}): Promise<Automatizacion[]> {
  try {
    let listado: Automatizacion[] = []

    if (automatizacionesJson && automatizacionesJson.length > 0) {
      listado = automatizacionesJson as Automatizacion[]
    } else {
      const rows = await executeQuery<AutomatizacionRow>(`SELECT * FROM ${VISTAS.automatizacion}`)
      if (rows && rows.length > 0) {
        const mapped = rows.map(mapResumen)
        const seen = new Set<string>()
        for (const item of mapped) {
          const canonical = obtenerAutomatizacionPorSlug(item.slug)
          if (!seen.has(canonical.slug)) {
            seen.add(canonical.slug)
            listado.push(canonical)
          }
        }
      }
    }

    if (!listado || listado.length === 0) {
      listado = automatizacionesFallback
    }

    const term = filtros.search?.trim().toLocaleLowerCase("es-CL")

    return listado.filter((item) => {
      const matchesArea = !filtros.area || item.categoria.toLowerCase() === filtros.area.toLowerCase()
      const matchesModalidad = !filtros.modalidad || item.modalidad.toLowerCase() === filtros.modalidad.toLowerCase()
      const haystack = `${item.nombre} ${item.resumen} ${item.categoria}`.toLocaleLowerCase("es-CL")
      const matchesSearch = !term || haystack.includes(term)
      return matchesArea && matchesModalidad && matchesSearch
    })
  } catch (error) {
    console.warn("[getAutomatizaciones] Error o ausencia de BD, usando fallback JSON:", error)
    return automatizacionesFallback
  }
}

/** Inicio: obtiene las automatizaciones destacadas desde la base de datos SQL. */
export async function getAutomatizacionesDestacadas(): Promise<Automatizacion[]> {
  try {
    const listado = await getAutomatizaciones()
    return listado.length > 0 ? listado : automatizacionesFallback.slice(0, 4)
  } catch (error) {
    console.error("[getAutomatizacionesDestacadas] Error al consultar la BD, usando fallback:", error)
    return automatizacionesFallback.slice(0, 4)
  }
}

/** Detalle/Cotización: obtiene una automatización específica por ID o slug. */
export async function getAutomatizacionByIdentifier(identifier: string): Promise<Automatizacion | null> {
  try {
    const normalized = normalizeIdentifier(identifier)
    const allRows = await executeQuery<AutomatizacionRow>(`SELECT * FROM ${VISTAS.automatizacion}`)
    if (!allRows || allRows.length === 0) {
      return obtenerAutomatizacionPorSlug(identifier)
    }

    const row = allRows.find((candidate) => {
      const pId = idProducto(candidate)
      return normalizeIdentifier(pId) === normalized || slugFromId(pId) === normalized
    })

    if (!row) {
      return obtenerAutomatizacionPorSlug(identifier)
    }

    const productId = idProducto(row)
    const featureRows = await executeQuery<CaracteristicaRow>(
      `SELECT * FROM ${VISTAS.caracteristicas} WHERE id_producto = @idProducto ORDER BY orden_caracteristica`,
      { idProducto: productId }
    ).catch(() => [])

    const automatizacion = mapResumen(row)
    const fallback = obtenerAutomatizacionPorSlug(identifier)

    const descripcionRows = featureRows
      .filter((f) => ["descripcion", "descripcion_larga", "detalle"].includes(f.tipo?.trim().toLowerCase() ?? ""))
      .map((f) => f.caracteristica?.trim())
      .filter((f): f is string => Boolean(f))

    if (descripcionRows.length > 0) {
      automatizacion.descripcion = descripcionRows.join("\n\n")
    } else if (fallback.descripcion) {
      const dbDescClean = cleanText(row.descripcion_corta)
      automatizacion.descripcion = dbDescClean
        ? `${dbDescClean}. ${fallback.descripcion}`
        : fallback.descripcion
    }

    const capacidades = featureRows
      .filter((f) => f.tipo?.trim().toLowerCase() === "capacidad" || f.tipo?.trim().toLowerCase() === "funcion")
      .map((f) => f.caracteristica?.trim())
      .filter((f): f is string => Boolean(f))

    const integraciones = featureRows
      .filter((f) => f.tipo?.trim().toLowerCase() === "integracion")
      .map((f) => f.caracteristica?.trim())
      .filter((f): f is string => Boolean(f))

    const metricas = featureRows
      .filter((f) => f.tipo?.trim().toLowerCase() === "metrica")
      .map((f) => f.caracteristica?.trim())
      .filter((f): f is string => Boolean(f))

    automatizacion.capacidades = capacidades.length > 0 ? capacidades : fallback.capacidades
    automatizacion.integraciones = integraciones.length > 0 ? integraciones : fallback.integraciones
    automatizacion.metricas = metricas.length > 0 ? metricas : fallback.metricas
    automatizacion.planes = fallback.planes

    return automatizacion
  } catch (error) {
    console.error("[getAutomatizacionByIdentifier] Error al consultar la BD:", error)
    return obtenerAutomatizacionPorSlug(identifier)
  }
}
