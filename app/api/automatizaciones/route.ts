import { NextRequest, NextResponse } from "next/server"
import { getAutomatizaciones, getAutomatizacionesDestacadas } from "@/lib/automatizaciones"

/**
 * Consumida por catálogo e inicio para obtener el listado de automatizaciones desde la BD.
 */
export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams
    const destacadas = params.get("destacadas") === "true"
    const items = destacadas
      ? await getAutomatizacionesDestacadas()
      : await getAutomatizaciones({
          area: params.get("area") || undefined,
          modalidad: params.get("modalidad") || undefined,
          search: params.get("search") || undefined,
        })

    return NextResponse.json({ success: true, data: items, total: items.length })
  } catch (error) {
    console.error("[API automatizaciones] No fue posible obtener el listado:", error)
    return NextResponse.json(
      { success: false, error: "No fue posible cargar las automatizaciones" },
      { status: 503 },
    )
  }
}
