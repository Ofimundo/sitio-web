import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { mapProducto, type ProductoRow, VISTA_PRODUCTO_DETALLE } from "@/lib/productos"
import type { ApiResponse, Equipo } from "@/lib/types"

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const rows = await executeQuery<ProductoRow>(
      `SELECT * FROM ${VISTA_PRODUCTO_DETALLE} WHERE id_producto = @id`,
      { id },
    )

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Equipo no encontrado" }, { status: 404 })
    }

    const response: ApiResponse<Equipo> = { success: true, data: mapProducto(rows[0]) }
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error obteniendo detalle MPS:", error)
    return NextResponse.json({ success: false, error: "Error al obtener equipo" }, { status: 500 })
  }
}
