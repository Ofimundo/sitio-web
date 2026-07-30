import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { Marca, ApiResponse } from "@/lib/types"

export async function GET() {
  try {
    const query = `
      SELECT 
        ID_Marca,
        Nombre_Marca,
        Sitio_Web,
        Fecha_Registro,
        Activo
      FROM MPR.Marcas
      WHERE Activo = 1
      ORDER BY Nombre_Marca ASC
    `

    const marcas = await executeQuery<Marca>(query)

    const response: ApiResponse<Marca[]> = {
      success: true,
      data: marcas,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error obteniendo marcas:", error)
    return NextResponse.json(
      { success: false, error: "Error al obtener marcas" },
      { status: 500 }
    )
  }
}
