import { NextResponse } from "next/server"
import { getAutomatizacionByIdentifier } from "@/lib/automatizaciones"

/** Entrega el detalle de una automatización a las páginas de detalle y cotización. */
export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params
    const item = await getAutomatizacionByIdentifier(slug)
    if (!item) {
      return NextResponse.json({ success: false, error: "Automatización no encontrada" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: item })
  } catch (error) {
    console.error("[API automatizacion] No fue posible obtener el detalle:", error)
    return NextResponse.json(
      { success: false, error: "No fue posible cargar el detalle de la automatización" },
      { status: 503 },
    )
  }
}
