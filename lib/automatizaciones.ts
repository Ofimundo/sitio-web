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

interface CaracteristicaAutomatizacionRow {
  id_Producto?: string
  id_producto?: string
  como_dimensionamos?: string
  que_automatiza?: string
  caracteristicas?: string
}

const VISTAS = {
  automatizacion: "[THE_COOLER_SGCX].[MPR].[VT_SEL_AUTOMATIZACION]",
  caracteristicas: "[THE_COOLER_SGCX].[MPR].[VT_SEL_AUTOMATIZACION_CARACTERISTICAS]",
  caracteristicasTabla: "[THE_COOLER_SGCX].[MPR].[producto_caracteristica_automatizacion]",
} as const

function parseListaItems(values: (string | null | undefined)[]): string[] {
  const result: string[] = []
  const seen = new Set<string>()

  for (const v of values) {
    if (!v || typeof v !== "string") continue
    const items = v.split(/[;\r\n]+/)
    for (const item of items) {
      const clean = item.trim().replace(/^[-•*]\s*/, "")
      if (clean && !seen.has(clean.toLowerCase())) {
        seen.add(clean.toLowerCase())
        result.push(clean)
      }
    }
  }

  return result
}

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

function normalizeBeneficio(beneficio?: string) {
  if (!beneficio) return ""
  if (/90%\s*menos\s*tiempo/i.test(beneficio)) {
    return "Reducción de tiempo hasta 90%"
  }
  if (/24\s*\/\s*7/i.test(beneficio)) {
    return "Actualización diaria"
  }
  return beneficio
}

function mapResumen(row: AutomatizacionRow): Automatizacion {
  const id = idProducto(row)
  const nombre = row.nombre_producto?.trim() || row.modelo?.trim() || id
  const slug = slugFromId(id)
  const fallback = obtenerAutomatizacionPorSlug(slug) || automatizacionesFallback[0]
  const dbDescClean = cleanText(row.descripcion_corta)

  const categoria = row.clasificacion?.trim() || fallback.categoria || "Finanzas"
  const resumen = dbDescClean || fallback.resumen || ""
  const descripcion = dbDescClean || fallback.descripcion || resumen
  const beneficioRaw = row.beneficio?.trim() || fallback.beneficio || "Alta precisión"

  return {
    ID_Producto: id,
    slug,
    nombre,
    nombreCorto: row.modelo?.trim() || fallback.nombreCorto || nombre,
    categoria,
    modalidad: row.modalidad?.trim() || fallback.modalidad || "Integración personalizada",
    beneficio: normalizeBeneficio(beneficioRaw),
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
    let rawList: Automatizacion[] = []

    // 1. Intentar consultar directamente la vista en SQL Server (MPR.VT_SEL_AUTOMATIZACION)
    try {
      const rows = await executeQuery<AutomatizacionRow>(`SELECT * FROM ${VISTAS.automatizacion}`)
      if (rows && rows.length > 0) {
        rawList = rows.map(mapResumen)
      }
    } catch (dbError) {
      console.warn("[getAutomatizaciones] Aviso: No se pudo conectar a la BD, usando respaldo JSON/fallback:", dbError)
    }

    // 2. Si la BD no está disponible o no devolvió filas, usar el respaldo local
    if (rawList.length === 0 && automatizacionesJson && automatizacionesJson.length > 0) {
      rawList = (automatizacionesJson as unknown) as Automatizacion[]
    }

    // Filtrar completamente la automatización eliminada de gestión de documentos
    rawList = rawList.filter((item) => {
      const id = (item.ID_Producto || "").toLowerCase()
      const slug = (item.slug || "").toLowerCase()
      const nom = (item.nombre || "").toLowerCase()
      return !id.includes("gesdoc") && !slug.includes("gestion-documental") && !nom.includes("document")
    })

    // 3. Normalizar y deduplicar manteniendo los datos de la base de datos
    if (rawList.length > 0) {
      const seen = new Set<string>()
      for (const item of rawList) {
        const canonical = obtenerAutomatizacionPorSlug(item.slug)
        if (canonical && !seen.has(canonical.slug)) {
          seen.add(canonical.slug)
          const dbResumen = cleanText(item.resumen)
          listado.push({
            ...canonical,
            nombre: canonical.nombre || item.nombre,
            resumen: dbResumen || canonical.resumen,
            categoria: item.categoria || canonical.categoria,
            modalidad: item.modalidad || canonical.modalidad,
            beneficio: normalizeBeneficio(item.beneficio) || canonical.beneficio,
          })
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
    if (listado.length === 0) return automatizacionesFallback.slice(0, 4)

    // Orden prioritario para la sección de automatizaciones de la página principal
    const homeOrder = [
      "aceptacion-rechazo-facturas",
      "finiquitos-dt",
      "gestion-cuentas",
      "saldos-bancarios",
    ]

    const sorted = [...listado].sort((a, b) => {
      const idxA = homeOrder.indexOf(a.slug)
      const idxB = homeOrder.indexOf(b.slug)
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB)
    })

    return sorted
  } catch (error) {
    console.error("[getAutomatizacionesDestacadas] Error al consultar la BD, usando fallback:", error)
    return automatizacionesFallback.slice(0, 4)
  }
}

/** Detalle/Cotización: obtiene una automatización específica por ID o slug. */
export async function getAutomatizacionByIdentifier(identifier: string): Promise<Automatizacion | null> {
  try {
    const normalized = normalizeIdentifier(identifier)
    if (normalized.includes("gesdoc") || normalized.includes("gestion_documental") || normalized.includes("document")) {
      return null
    }

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

    const fallback = obtenerAutomatizacionPorSlug(identifier)
    if (!fallback) {
      return null
    }

    const productId = idProducto(row)
    const automatizacion = mapResumen(row)

    // 1. Consultar tabla MPR.producto_caracteristica_automatizacion
    const carRows = await executeQuery<CaracteristicaAutomatizacionRow>(
      `SELECT * FROM ${VISTAS.caracteristicasTabla}`
    ).catch(() => [])

    const matchingCarRows = carRows.filter((r) => {
      const rId = String(r.id_Producto ?? r.id_producto ?? "").trim()
      const normRId = normalizeIdentifier(rId)
      return (
        rId === productId ||
        normRId === normalized ||
        slugFromId(rId) === normalized ||
        normRId.startsWith(normalized) ||
        normalized.startsWith(normRId) ||
        (normRId.includes("aprrch") && normalized.includes("factura")) ||
        (normRId.includes("fnqt") && normalized.includes("finiquito")) ||
        (normRId.includes("gsct") && normalized.includes("cuenta")) ||
        (normRId.includes("sldbnc") && normalized.includes("saldo"))
      )
    })

    const dbMetricas = parseListaItems(matchingCarRows.map((r) => r.como_dimensionamos))
    const dbCapacidades = parseListaItems(matchingCarRows.map((r) => r.que_automatiza))
    const dbCaracteristicas = parseListaItems(matchingCarRows.map((r) => r.caracteristicas))

    // 2. Consulta opcional de respaldo para descripción detallada
    const featureRows = await executeQuery<CaracteristicaRow>(
      `SELECT * FROM ${VISTAS.caracteristicas} WHERE id_producto = @idProducto ORDER BY orden_caracteristica`,
      { idProducto: productId }
    ).catch(() => [])

    const descripcionRows = featureRows
      .filter((f) => ["descripcion", "descripcion_larga", "detalle"].includes(f.tipo?.trim().toLowerCase() ?? ""))
      .map((f) => f.caracteristica?.trim())
      .filter((f): f is string => Boolean(f))

    const dbDescClean = cleanText(row.descripcion_corta)
    if (descripcionRows.length > 0) {
      automatizacion.descripcion = descripcionRows.join("\n\n")
    } else {
      automatizacion.descripcion = dbDescClean || fallback.descripcion
    }

    automatizacion.categoria = row.clasificacion?.trim() || fallback.categoria
    automatizacion.beneficio = normalizeBeneficio(row.beneficio?.trim()) || fallback.beneficio
    automatizacion.resumen = dbDescClean || fallback.resumen
    automatizacion.capacidades = dbCapacidades.length > 0 ? dbCapacidades : fallback.capacidades
    automatizacion.metricas = dbMetricas.length > 0 ? dbMetricas : fallback.metricas

    const rawCaracteristicas = dbCaracteristicas.length > 0 ? dbCaracteristicas : (fallback.caracteristicas || fallback.integraciones)
    automatizacion.caracteristicas = rawCaracteristicas.map((item) =>
      item.replace(/\bAPI\s+del\s+cliente\b/i, "API´S del cliente")
    )
    automatizacion.integraciones = automatizacion.caracteristicas
    automatizacion.planes = fallback.planes

    return automatizacion
  } catch (error) {
    console.error("[getAutomatizacionByIdentifier] Error al consultar la BD:", error)
    return obtenerAutomatizacionPorSlug(identifier)
  }
}
