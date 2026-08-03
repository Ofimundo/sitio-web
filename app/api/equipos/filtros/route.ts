import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { mapProducto, type ProductoRow, VISTA_PRODUCTO_DETALLE } from "@/lib/productos"
import type { ApiResponse } from "@/lib/types"

interface FiltrosDisponibles {
  tipos: string[]
  marcas: string[]
  tecnologias: string[]
  colores: string[]
}

function valores(searchParams: URLSearchParams, key: string) {
  return searchParams.getAll(key).flatMap((value) => value.split(",")).map((value) => value.trim()).filter(Boolean)
}

function normalize(value: string | undefined | null) {
  return (value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es-CL").trim()
}

function unicos(values: Array<string | undefined>) {
  const mapa = new Map<string, string>()
  values.filter(Boolean).forEach((value) => {
    const original = value!.trim()
    const clave = normalize(original)
    if (!mapa.has(clave)) mapa.set(clave, original)
  })
  return Array.from(mapa.values()).sort((a, b) => a.localeCompare(b, "es"))
}

export async function GET(request: NextRequest) {
  try {
    const tipos = valores(request.nextUrl.searchParams, "tipo")
    const rows = await executeQuery<ProductoRow>(`SELECT * FROM ${VISTA_PRODUCTO_DETALLE}`)
    let equipos = rows.map(mapProducto)

    if (tipos.length > 0) equipos = equipos.filter((equipo) => tipos.some((tipo) => normalize(tipo) === normalize(equipo.Tipo_Equipo)))

    const filtros: FiltrosDisponibles = {
      tipos: unicos(equipos.map((equipo) => equipo.Tipo_Equipo)),
      marcas: unicos(equipos.map((equipo) => equipo.Nombre_Marca)),
      tecnologias: unicos(equipos.map((equipo) => equipo.Tecnologia_Equipo)),
      colores: unicos(equipos.map((equipo) => equipo.Color_Equipo)),
    }
    const response: ApiResponse<FiltrosDisponibles> = { success: true, data: filtros }
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error obteniendo filtros MPS:", error)
    return NextResponse.json({ success: false, error: "Error al obtener filtros" }, { status: 500 })
  }
}
