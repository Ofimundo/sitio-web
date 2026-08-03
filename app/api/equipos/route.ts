import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { mapProducto, type ProductoRow, VISTA_PRODUCTO_DETALLE } from "@/lib/productos"
import type { ApiResponse, Equipo } from "@/lib/types"

function valores(searchParams: URLSearchParams, key: string) {
  return searchParams.getAll(key).flatMap((value) => value.split(",")).map((value) => value.trim()).filter(Boolean)
}

function normalize(value: string | undefined | null) {
  return (value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es-CL").trim()
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const tipos = valores(searchParams, "tipo")
    const marcas = valores(searchParams, "marca")
    const tecnologias = valores(searchParams, "tecnologia")
    const colores = valores(searchParams, "color")
    const search = normalize(searchParams.get("search"))
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 9999, 1), 9999)
    const offset = Math.max(Number(searchParams.get("offset")) || 0, 0)

    const rows = await executeQuery<ProductoRow>(`SELECT * FROM ${VISTA_PRODUCTO_DETALLE}`)
    const filtrados = rows.map(mapProducto).filter((equipo) => {
      const matchesType = tipos.length === 0 || tipos.some((tipo) => normalize(tipo) === normalize(equipo.Tipo_Equipo))
      const matchesBrand = marcas.length === 0 || marcas.some((marca) => normalize(marca) === normalize(equipo.Nombre_Marca))
      const matchesTechnology = tecnologias.length === 0 || tecnologias.some((tecnologia) => normalize(tecnologia) === normalize(equipo.Tecnologia_Equipo))
      const matchesColor = colores.length === 0 || colores.some((color) => normalize(color) === normalize(equipo.Color_Equipo))
      const haystack = normalize(`${equipo.Nombre_Equipo} ${equipo.Nombre_Marca} ${equipo.Descripcion_Equipo}`)
      return matchesType && matchesBrand && matchesTechnology && matchesColor && (!search || haystack.includes(search))
    })

    const response: ApiResponse<Equipo[]> = { success: true, data: filtrados.slice(offset, offset + limit), total: filtrados.length }
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error obteniendo productos MPS:", error)
    return NextResponse.json({ success: false, error: "Error al obtener equipos" }, { status: 500 })
  }
}
