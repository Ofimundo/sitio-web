import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { mapProducto, type ProductoRow, VISTA_PRODUCTO_DETALLE } from "@/lib/productos"
import type { ApiResponse } from "@/lib/types"

interface FiltrosDisponibles {
  tipos: string[]
  marcas: string[]
  tecnologias: string[]
  colores: string[]
}

function unicos(values: Array<string | undefined>) {
  return [...new Set(values.map((value) => value?.trim()).filter((value): value is string => Boolean(value)))].sort((a, b) => a.localeCompare(b, "es"))
}

export async function GET() {
  try {
    const rows = await executeQuery<ProductoRow>(`SELECT * FROM ${VISTA_PRODUCTO_DETALLE}`)
    const equipos = rows.map(mapProducto)
    const filtros: FiltrosDisponibles = {
      tipos: unicos(equipos.map((equipo) => equipo.Tipo_Equipo)),
      marcas: unicos(equipos.map((equipo) => equipo.Nombre_Marca)),
      tecnologias: unicos(equipos.map((equipo) => equipo.Tecnologia_Equipo)),
      colores: unicos(equipos.map((equipo) => equipo.Color_Equipo)),
    }
    const response: ApiResponse<FiltrosDisponibles> = { success: true, data: filtros }
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error obteniendo filtros MPS:", error)
    return NextResponse.json({ success: false, error: "Error al obtener filtros" }, { status: 500 })
  }
}
