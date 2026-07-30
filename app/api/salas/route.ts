import { NextRequest, NextResponse } from "next/server"
import { getSalas, getSalasDestacadas } from "@/lib/salas"

/**
 * Consumida por inicio (`destacadas=true`) y catálogo (listado completo + filtros).
 */
export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams
    const destacadas = params.get("destacadas") === "true"
    const salas = destacadas
      ? await getSalasDestacadas()
      : await getSalas({
          tamano: params.get("tamano") || undefined,
          linea: params.get("linea") || undefined,
          search: params.get("search") || undefined,
        })

    return NextResponse.json({ success: true, data: salas, total: salas.length })
  } catch (error) {
    console.error("[API salas] No fue posible obtener el listado:", error)
    return NextResponse.json(
      { success: false, error: "No fue posible cargar las salas" },
      { status: 503 },
    )
  }
}
