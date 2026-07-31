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
  return searchParams
    .getAll(key)
    .flatMap((value) => value.split(","))
    .map((value) => value.trim())
    .filter(Boolean)
}

function normalize(str: string | undefined | null): string {
  if (!str) return ""
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-CL")
    .trim()
}

function unicos(values: Array<string | undefined>) {
  const mapa = new Map<string, string>()
  values.filter(Boolean).forEach((v) => {
    const original = v!.trim()
    const clave = normalize(original)
    if (!mapa.has(clave)) mapa.set(clave, original)
  })
  return Array.from(mapa.values()).sort((a, b) => a.localeCompare(b, "es"))
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const tipos = valores(searchParams, "tipo")

    const rows = await executeQuery<ProductoRow>(`SELECT * FROM ${VISTA_PRODUCTO_DETALLE}`)
    let equipos = rows.map(mapProducto)

    if (tipos.length > 0) {
      equipos = equipos.filter((e) => tipos.includes(e.Tipo_Equipo))
    }

    const filtros: FiltrosDisponibles = {
      tipos: unicos(equipos.map((e) => e.Tipo_Equipo)),
      marcas: unicos(equipos.map((e) => e.Nombre_Marca)),
      tecnologias: unicos(equipos.map((e) => e.Tecnologia_Equipo)),
      colores: unicos(equipos.map((e) => e.Color_Equipo)),
    }

    return NextResponse.json({ success: true, data: filtros })
  } catch (error) {
    console.error("Error obteniendo filtros MPS:", error)
    return NextResponse.json({ success: false, error: "Error al obtener filtros" }, { status: 500 })
  }
}