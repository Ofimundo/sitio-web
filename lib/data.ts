import type { Equipo, Marca, FiltrosEquipo } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

// Obtener equipos con filtros opcionales
export async function getEquipos(filtros?: FiltrosEquipo): Promise<{ equipos: Equipo[]; total: number }> {
  const params = new URLSearchParams()
  
  if (filtros?.tipo) params.set("tipo", filtros.tipo)
  if (filtros?.marca) params.set("marca", filtros.marca)
  if (filtros?.tecnologia) params.set("tecnologia", filtros.tecnologia)
  if (filtros?.color) params.set("color", filtros.color)
  if (filtros?.search) params.set("search", filtros.search)
  if (filtros?.limit) params.set("limit", filtros.limit.toString())
  if (filtros?.offset) params.set("offset", filtros.offset.toString())

  const url = `${API_BASE_URL}/api/equipos?${params.toString()}`
  
  const res = await fetch(url, { next: { revalidate: 60 } })
  
  if (!res.ok) {
    throw new Error("Error al obtener equipos")
  }

  const data = await res.json()
  
  if (!data.success) {
    throw new Error(data.error || "Error al obtener equipos")
  }

  return {
    equipos: data.data || [],
    total: data.total || 0,
  }
}

// Obtener un equipo por ID
export async function getEquipoById(id: string): Promise<Equipo | null> {
  const url = `${API_BASE_URL}/api/equipos/${id}`
  
  const res = await fetch(url, { next: { revalidate: 60 } })
  
  if (!res.ok) {
    if (res.status === 404) return null
    throw new Error("Error al obtener equipo")
  }

  const data = await res.json()
  
  if (!data.success) {
    return null
  }

  return data.data
}

// Obtener todas las marcas
export async function getMarcas(): Promise<Marca[]> {
  const url = `${API_BASE_URL}/api/marcas`
  
  const res = await fetch(url, { next: { revalidate: 300 } })
  
  if (!res.ok) {
    throw new Error("Error al obtener marcas")
  }

  const data = await res.json()
  
  if (!data.success) {
    throw new Error(data.error || "Error al obtener marcas")
  }

  return data.data || []
}

// Obtener filtros disponibles
export async function getFiltrosDisponibles(): Promise<{
  tipos: string[]
  marcas: string[]
  tecnologias: string[]
  colores: string[]
}> {
  const url = `${API_BASE_URL}/api/equipos/filtros`
  
  const res = await fetch(url, { next: { revalidate: 300 } })
  
  if (!res.ok) {
    throw new Error("Error al obtener filtros")
  }

  const data = await res.json()
  
  if (!data.success) {
    throw new Error(data.error || "Error al obtener filtros")
  }

  return data.data || { tipos: [], marcas: [], tecnologias: [], colores: [] }
}

// Obtener equipos destacados por categoría
export async function getEquiposDestacados(tipo: string, limit: number = 6): Promise<Equipo[]> {
  const { equipos } = await getEquipos({ tipo, limit })
  return equipos
}
