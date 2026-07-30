import { NextResponse } from "next/server"
import { getSalas } from "@/lib/salas"

/** Opciones de filtro derivadas de los registros reales del catálogo. */
export async function GET() {
  try {
    const salas = await getSalas()
    return NextResponse.json({
      success: true,
      data: {
        tamanos: [...new Set(salas.map((sala) => sala.Tamano))],
        lineas: [...new Set(salas.map((sala) => sala.Linea))],
      },
    })
  } catch (error) {
    console.error("[API filtros salas] No fue posible obtener los filtros:", error)
    return NextResponse.json(
      { success: false, error: "No fue posible cargar los filtros" },
      { status: 503 },
    )
  }
}
