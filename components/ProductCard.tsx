import Link from "next/link"
import Image from "next/image"
import type { Equipo } from "@/lib/types"

interface ProductCardProps {
  equipo: Equipo
  showBadge?: boolean
  badgeText?: string
}

export function ProductCard({ equipo, showBadge = false, badgeText = "DESTACADO" }: ProductCardProps) {
  // Construir URL de imagen
  const imagenUrl = equipo.Imagen_Equipo 
    ? equipo.Imagen_Equipo.startsWith("http") 
      ? equipo.Imagen_Equipo 
      : `/images/equipos/${equipo.Imagen_Equipo}`
    : "/images/equipos/placeholder.png"

  return (
    <div className="card-hover relative bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
      {/* Imagen del producto */}
      <div className="h-[275px] flex items-center justify-center bg-linear-to-br from-purple-100 to-pink-50">
        <Image
          src={imagenUrl}
          alt={equipo.Nombre_Equipo}
          width={280}
          height={275}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Badge opcional */}
      {showBadge && (
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-ofimundo-red text-white text-xs font-bold rounded-full">
            {badgeText}
          </span>
        </div>
      )}

      {/* Información del producto */}
      <div className="p-6 flex flex-col flex-1">
        {/* Marca */}
        {equipo.Nombre_Marca && (
          <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            {equipo.Nombre_Marca}
          </span>
        )}

        {/* Nombre */}
        <h3 className="nombre-producto text-lg font-bold text-ofimundo-navy mb-2">
          {equipo.Nombre_Equipo}
        </h3>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {equipo.Descripcion_Equipo || `${equipo.Tipo_Equipo} ${equipo.Tecnologia_Equipo || ""}`}
        </p>

        {/* Especificaciones rápidas */}
        <div className="flex flex-wrap gap-2 mb-4">
          {equipo.Velocidad_BN_Equipo && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {equipo.Velocidad_BN_Equipo} ppm
            </span>
          )}
          {equipo.Color_Equipo && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {equipo.Color_Equipo}
            </span>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex items-center gap-3 mt-auto">
          <Link
            href={`/cotizar-mps/${equipo.ID_Producto}`}
            className="btn-cotizar flex-1 rounded-lg bg-linear-to-r from-(--ofimundo-purple) to-(--ofimundo-magenta) px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
          >
            Cotizar
          </Link>

          <Link
            href={`/equipo/${equipo.ID_Producto}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-ofimundo-purple px-4 py-3 text-center text-sm font-semibold text-ofimundo-purple transition hover:bg-purple-50"
          >
            Ver más <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
