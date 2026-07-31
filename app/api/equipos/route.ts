import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { mapProducto, type ProductoRow, VISTA_PRODUCTOS } from "@/lib/productos"
import type { ApiResponse, Equipo } from "@/lib/types"

function valores(searchParams: URLSearchParams, key: string) {
  return searchParams.getAll(key).flatMap((value) => value.split(",")).map((value) => value.trim()).filter(Boolean)
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URL(request.url).searchParams
    const tipos = valores(searchParams, "tipo")
    const marcas = valores(searchParams, "marca")
    const tecnologias = valores(searchParams, "tecnologia")
    const colores = valores(searchParams, "color")
    const search = (searchParams.get("search") ?? "").trim().toLocaleLowerCase("es-CL")
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 9999, 1), 9999)
    const offset = Math.max(Number(searchParams.get("offset")) || 0, 0)

    const rows = await executeQuery<ProductoRow>(`SELECT * FROM ${VISTA_PRODUCTOS}`)
    const filtrados = rows.map(mapProducto).filter((equipo) => {
      const matchesType = tipos.length === 0 || tipos.includes(equipo.Tipo_Equipo)
      const matchesBrand = marcas.length === 0 || marcas.some((marca) => marca.toLocaleLowerCase("es-CL") === equipo.Nombre_Marca?.toLocaleLowerCase("es-CL"))
      const matchesTechnology = tecnologias.length === 0 || tecnologias.includes(equipo.Tecnologia_Equipo)
      const matchesColor = colores.length === 0 || colores.includes(equipo.Color_Equipo)
      const haystack = `${equipo.Nombre_Equipo} ${equipo.Nombre_Marca} ${equipo.Descripcion_Equipo}`.toLocaleLowerCase("es-CL")
      return matchesType && matchesBrand && matchesTechnology && matchesColor && (!search || haystack.includes(search))
    })

    const response: ApiResponse<Equipo[]> = { success: true, data: filtrados.slice(offset, offset + limit), total: filtrados.length }
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error obteniendo productos MPS:", error)
    return NextResponse.json({ success: false, error: "Error al obtener equipos" }, { status: 500 })
  }
}
