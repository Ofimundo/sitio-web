import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { type ProductoRow, VISTA_PRODUCTOS } from "@/lib/productos"
import type { ApiResponse, Marca } from "@/lib/types"

export async function GET() {
  try {
    const rows = await executeQuery<ProductoRow>(`SELECT * FROM ${VISTA_PRODUCTOS}`)
    const nombres = [...new Set(rows.map((row) => row.marca?.trim()).filter((marca): marca is string => Boolean(marca)))].sort((a, b) => a.localeCompare(b, "es"))
    const marcas: Marca[] = nombres.map((Nombre_Marca, index) => ({ ID_Marca: index + 1, Nombre_Marca, Sitio_Web: null, Fecha_Registro: null, Activo: true }))
    const response: ApiResponse<Marca[]> = { success: true, data: marcas }
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error obteniendo marcas MPS:", error)
    return NextResponse.json({ success: false, error: "Error al obtener marcas" }, { status: 500 })
  }
}
