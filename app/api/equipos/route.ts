import { NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { Equipo, ApiResponse } from "@/lib/types"

const equivalenciasTipo: Record<string, string[]> = {
  Multifuncional: ["Multifuncional", "Multifuncionales"],
  Impresora: ["Impresora", "Impresoras"],
}

function obtenerValoresMultiples(searchParams: URLSearchParams, key: string) {
  return searchParams.getAll(key).flatMap((valor) => valor.split(",")).map((v) => v.trim()).filter(Boolean)
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const tiposSeleccionados = obtenerValoresMultiples(searchParams, "tipo")
    const tipos = Array.from(new Set(tiposSeleccionados.flatMap((tipo) => equivalenciasTipo[tipo] ?? [tipo])))
    const marcas = obtenerValoresMultiples(searchParams, "marca")
    const tecnologias = obtenerValoresMultiples(searchParams, "tecnologia")
    const colores = obtenerValoresMultiples(searchParams, "color")
    const search = searchParams.get("search")
    // En la API
    const limitParam = searchParams.get("limit")
    const limit = limitParam && limitParam !== "" ? parseInt(limitParam) : 9999  // sin límite por defecto
    const offsetParam = searchParams.get("offset")  
    const offset = offsetParam && offsetParam !== "" ? parseInt(offsetParam) : 0

    let query = `
      SELECT 
        e.*,
        m.Nombre_Marca,
        m.Sitio_Web as Sitio_Web_Marca
      FROM MPR.Equipos e
      LEFT JOIN MPR.Marcas m ON e.ID_Marca = m.ID_Marca
      WHERE 1=1
    `
    const params: Record<string, unknown> = {}

    if (tipos.length > 0) {
      const referencias = tipos.map((tipo, indice) => {
        const nombre = `tipo${indice}`
        params[nombre] = tipo
        return `@${nombre}`
      })
      query += ` AND LTRIM(RTRIM(e.Tipo_Equipo)) IN (${referencias.join(", ")})`
    }

    if (marcas.length > 0) {
      const referencias = marcas.map((marca, indice) => {
        const nombre = `marca${indice}`
        params[nombre] = marca
        return `@${nombre}`
      })
      query += ` AND LTRIM(RTRIM(m.Nombre_Marca)) IN (${referencias.join(", ")})`
    }

    if (tecnologias.length > 0) {
      const referencias = tecnologias.map((tecnologia, indice) => {
        const nombre = `tecnologia${indice}`
        params[nombre] = tecnologia
        return `@${nombre}`
      })
      query += ` AND LTRIM(RTRIM(e.Tecnologia_Equipo)) IN (${referencias.join(", ")})`
    }

    if (colores.length > 0) {
      const referencias = colores.map((color, indice) => {
        const nombre = `color${indice}`
        params[nombre] = color
        return `@${nombre}`
      })
      query += ` AND LTRIM(RTRIM(e.Color_Equipo)) IN (${referencias.join(", ")})`
    }

    if (search) {
      query += " AND (e.Nombre_Equipo LIKE @search OR e.Descripcion_Equipo LIKE @search)"
      params.search = `%${search}%`
    }

    query += ` ORDER BY e.Fecha_Registro_Equipo DESC
               OFFSET @offset ROWS
               FETCH NEXT @limit ROWS ONLY`
    params.offset = offset
    params.limit = limit

    const equipos = await executeQuery<Equipo>(query, params)

    // Conteo total
    let countQuery = `
      SELECT COUNT(*) as total
      FROM MPR.Equipos e
      LEFT JOIN MPR.Marcas m ON e.ID_Marca = m.ID_Marca
      WHERE 1=1
    `

    if (tipos.length > 0) {
      const referencias = tipos.map((_, indice) => `@tipo${indice}`)
      countQuery += ` AND LTRIM(RTRIM(e.Tipo_Equipo)) IN (${referencias.join(", ")})`
    }
    if (marcas.length > 0) {
      const referencias = marcas.map((_, indice) => `@marca${indice}`)
      countQuery += ` AND LTRIM(RTRIM(m.Nombre_Marca)) IN (${referencias.join(", ")})`
    }
    if (tecnologias.length > 0) {
      const referencias = tecnologias.map((_, indice) => `@tecnologia${indice}`)
      countQuery += ` AND LTRIM(RTRIM(e.Tecnologia_Equipo)) IN (${referencias.join(", ")})`
    }
    if (colores.length > 0) {
      const referencias = colores.map((_, indice) => `@color${indice}`)
      countQuery += ` AND LTRIM(RTRIM(e.Color_Equipo)) IN (${referencias.join(", ")})`
    }
    if (search) countQuery += " AND (e.Nombre_Equipo LIKE @search OR e.Descripcion_Equipo LIKE @search)"

    const countResult = await executeQuery<{ total: number }>(countQuery, params)
    const total = countResult[0]?.total || 0

    const response: ApiResponse<Equipo[]> = {
      success: true,
      data: equipos,
      total,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error completo:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Error al obtener equipos",
        debug: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}