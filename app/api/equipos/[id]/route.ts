import { NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { Equipo, ApiResponse } from "@/lib/types"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const query = `
      SELECT 
        e.*,
        m.Nombre_Marca
      FROM MPR.Equipos e
      LEFT JOIN MPR.Marcas m ON e.ID_Marca = m.ID_Marca
      WHERE e.ID_Producto = @id
    `

    const equipos = await executeQuery<Equipo>(query, { id })

    if (equipos.length === 0) {
      return NextResponse.json(
        { success: false, error: "Equipo no encontrado" },
        { status: 404 }
      )
    }

    const response: ApiResponse<Equipo> = {
      success: true,
      data: equipos[0],
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error obteniendo equipo:", error)
    return NextResponse.json(
      { success: false, error: "Error al obtener equipo" },
      { status: 500 }
    )
  }
}
