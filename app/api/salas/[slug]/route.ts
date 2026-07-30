import { NextResponse } from "next/server"
import { getSalaByIdentifier } from "@/lib/salas"

/** Entrega la ficha compuesta a las páginas de detalle y cotización. */
export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params
    const sala = await getSalaByIdentifier(slug)
    if (!sala) {
      return NextResponse.json({ success: false, error: "Sala no encontrada" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: sala })
  } catch (error) {
    console.error("[API sala] No fue posible obtener el detalle:", error)
    return NextResponse.json(
      { success: false, error: "No fue posible cargar el detalle de la sala" },
      { status: 503 },
    )
  }
}
