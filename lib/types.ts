// Tipos para la tabla Equipos
export interface Equipo {
  ID_Producto: string
  ID_Marca: number
  Nombre_Equipo: string
  Tipo_Equipo: string
  Tecnologia_Equipo: string
  Color_Equipo: string
  Tamano_Papel_Equipo: string | null
  Velocidad_BN_Equipo: number | null
  Velocidad_Color_Equipo: number | null
  Velocidad_1ra_Pag_BN_Equipo: string | null
  Velocidad_1ra_Pag_Color_Equipo: string | null
  Capacidad_Bandeja1_Equipo: number | null
  Capacidad_Bypass_Equipo: number | null
  Ciclo_Recomendado_Equipo: string | null
  Ciclo_Mensual_Equipo: string | null
  Ciclo_Maximo_Equipo: string | null
  Tipo_Pantalla_Equipo: string | null
  Tamano_Pantalla_Equipo: string | null
  Memoria_RAM_Equipo: string | null
  Procesador_Equipo: string | null
  Disco_Duro_Equipo: string | null
  Funciones_Equipo: string | null
  Conectividad_Equipo: string | null
  Duracion_Bateria_Equipo: string | null
  Archivo_PDF_Equipo: string | null
  Imagen_Equipo: string | null
  Descripcion_Equipo: string | null
  Fecha_Carga_Equipo: string | null
  Fecha_Registro_Equipo: string | null
  // Campos adicionales para JOIN con Marca
  Nombre_Marca?: string
  Sitio_Web_Marca?: string
}

// Tipos para la tabla Marcas
export interface Marca {
  ID_Marca: number
  Nombre_Marca: string
  Sitio_Web: string | null
  Fecha_Registro: string | null
  Activo: boolean
}

// Tipos para las soluciones de salas colaborativas
export interface SalaEquipo {
  ID_Producto: string
  Nombre_Equipo: string
  Nombre_Marca: string
  Descripcion: string
  Imagen_Equipo?: string | null
  Orden: number
}

export interface SalaOpcion {
  ID_Opcion: number
  Codigo: string
  Nombre: string
  Equipos: SalaEquipo[]
}

export interface SalaComplemento extends SalaEquipo {
  Categoria: string
}

export interface Sala {
  ID_Sala: number
  ID_Producto: string
  Slug: string
  Nombre: string
  Linea: string
  Tamano: "S" | "M" | "L"
  Titulo: string
  Descripcion: string
  Imagen_Principal: string
  Beneficios: string[]
  Compatibilidad: string[]
  Destacada: boolean
  Orden: number
  Opciones: SalaOpcion[]
  Complementos: SalaComplemento[]
}

export interface FiltrosSala {
  tamano?: string
  linea?: string
  search?: string
}

// Alias temporales para componentes antiguos que serán retirados en una etapa posterior
export type Salas = Sala
export interface Salas_Equipos {
  ID_Sala: number
  ID_Producto: string
  Tipo_Sala: string
  Dimension_Sala: string
  Nombre_Equipo: string
  Tipo_Equipo: string
  Nombre_Marca?: string
}

// Tipos para filtros
export interface FiltrosEquipo {
  tipo?: string
  marca?: string
  tecnologia?: string
  color?: string
  search?: string
  limit?: number
  offset?: number
}

// Tipo para respuesta de API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  total?: number
}

// Categorías de equipos disponibles
export const CATEGORIAS_EQUIPO = [
  "Multifuncional",
  "Impresora",
] as const

export type CategoriaEquipo = typeof CATEGORIAS_EQUIPO[number]
