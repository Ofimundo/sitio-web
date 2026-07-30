import { NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { ApiResponse } from "@/lib/types"

interface FiltrosDisponibles {
  tipos: string[]
  marcas: string[]
  tecnologias: string[]
  colores: string[]
}

function obtenerTipos(searchParams: URLSearchParams) {
  return searchParams.getAll("tipo").flatMap((tipo) => tipo.split(",")).map((tipo) => tipo.trim()).filter(Boolean)
}

const equivalenciasTipo: Record<string, string[]> = {
  Multifuncional: ["Multifuncional", "Multifuncionales"],
  Impresora: ["Impresora", "Impresoras"],
}

function crearFiltroTipos(tipos: string[], params: Record<string, unknown>) {
  const tiposBaseDatos = Array.from(new Set(tipos.flatMap((tipo) => equivalenciasTipo[tipo] ?? [tipo])))
  if (tiposBaseDatos.length === 0) return ""

  const referencias = tiposBaseDatos.map((tipo, indice) => {
    const nombre = `tipo${indice}`
    params[nombre] = tipo
    return `@${nombre}`
  })

  return ` AND LTRIM(RTRIM(e.Tipo_Equipo)) IN (${referencias.join(", ")})`
}

export async function GET(request: NextRequest) {
  try {
    const tiposSeleccionados = obtenerTipos(new URL(request.url).searchParams)
    const params: Record<string, unknown> = {}
    const filtroTipos = crearFiltroTipos(tiposSeleccionados, params)

    const tipos = await executeQuery<{ valor: string }>(`
      SELECT DISTINCT LTRIM(RTRIM(Tipo_Equipo)) AS valor
      FROM MPR.Equipos
      WHERE Tipo_Equipo IS NOT NULL AND LTRIM(RTRIM(Tipo_Equipo)) <> ''
      ORDER BY valor
    `)

    const marcas = await executeQuery<{ valor: string }>(`
      SELECT DISTINCT LTRIM(RTRIM(m.Nombre_Marca)) AS valor
      FROM MPR.Equipos e
      INNER JOIN MPR.Marcas m ON e.ID_Marca = m.ID_Marca
      WHERE m.Activo = 1
        AND m.Nombre_Marca IS NOT NULL
        AND LTRIM(RTRIM(m.Nombre_Marca)) <> ''
      ORDER BY valor
    `, params)

    const tecnologias = await executeQuery<{ valor: string }>(`
      SELECT DISTINCT LTRIM(RTRIM(e.Tecnologia_Equipo)) AS valor
      FROM MPR.Equipos e
      WHERE e.Tecnologia_Equipo IS NOT NULL
        AND LTRIM(RTRIM(e.Tecnologia_Equipo)) <> ''
        ${filtroTipos}
      ORDER BY valor
    `, params)

    const colores = await executeQuery<{ valor: string }>(`
      SELECT DISTINCT LTRIM(RTRIM(e.Color_Equipo)) AS valor
      FROM MPR.Equipos e
      WHERE e.Color_Equipo IS NOT NULL
        AND LTRIM(RTRIM(e.Color_Equipo)) <> ''
        ${filtroTipos}
      ORDER BY valor
    `, params)

    const filtros: FiltrosDisponibles = {
      tipos: tipos.map(({ valor }) => valor),
      marcas: marcas.map(({ valor }) => valor),
      tecnologias: tecnologias.map(({ valor }) => valor),
      colores: colores.map(({ valor }) => valor),
    }

    const response: ApiResponse<FiltrosDisponibles> = { success: true, data: filtros }
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error obteniendo filtros:", error)
    return NextResponse.json({ success: false, error: "Error al obtener filtros" }, { status: 500 })
  }
}
