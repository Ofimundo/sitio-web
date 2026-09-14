import { NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const sesionId = request.nextUrl.searchParams.get("sesion_id")
    if (!sesionId) {
      return NextResponse.json(
        { success: false, error: "Parámetro sesion_id es requerido" },
        { status: 400 }
      )
    }

    const rows = await executeQuery<{
      mensaje_usuario: string
      respuesta_bot: string | null
      filtros_detectados: string | object | null
      fecha_registro: string
    }>(
      `
      SELECT TOP 6
        mensaje_usuario,
        respuesta_bot,
        filtros_detectados,
        fecha_registro
      FROM [THE_COOLER_SGCX].[MPR].[CHATBOT_CONVERSACION]
      WHERE sesion_id = @sesion_id
      ORDER BY fecha_registro DESC
      `,
      { sesion_id: sesionId }
    )


    return NextResponse.json({
      success: true,
      data: rows.reverse(),
    })
  } catch (error) {
    console.error("Error al consultar historial del chatbot:", error)
    return NextResponse.json(
      { success: false, error: "Error al obtener historial" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      sesion_id,
      mensaje_usuario,
      respuesta_bot,
      productos_recomendados,
      filtros_detectados,
    } = body

    if (!sesion_id || !mensaje_usuario) {
      return NextResponse.json(
        { success: false, error: "Datos sesion_id y mensaje_usuario son obligatorios" },
        { status: 400 }
      )
    }

    await executeQuery(
      `
      INSERT INTO [THE_COOLER_SGCX].[MPR].[CHATBOT_CONVERSACION]
      (
        sesion_id,
        mensaje_usuario,
        respuesta_bot,
        productos_recomendados,
        filtros_detectados
      )
      VALUES
      (
        @sesion_id,
        @mensaje_usuario,
        @respuesta_bot,
        @productos_recomendados,
        @filtros_detectados
      )
      `,
      {
        sesion_id,
        mensaje_usuario,
        respuesta_bot: respuesta_bot ?? null,
        productos_recomendados:
          typeof productos_recomendados === "string"
            ? productos_recomendados
            : JSON.stringify(productos_recomendados ?? []),
        filtros_detectados:
          typeof filtros_detectados === "string"
            ? filtros_detectados
            : JSON.stringify(filtros_detectados ?? {}),
      }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al guardar historial del chatbot:", error)
    return NextResponse.json(
      { success: false, error: "Error al guardar historial" },
      { status: 500 }
    )
  }
}
