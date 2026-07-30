import { ProductCard } from "./ProductCard"
import type { Equipo } from "@/lib/types"

interface ProductGridProps {
  equipos: Equipo[]
  titulo?: string
  subtitulo?: string
  showBadges?: boolean
}

export function ProductGrid({ equipos, titulo, subtitulo, showBadges = false }: ProductGridProps) {
  if (equipos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <i className="fas fa-box-open text-2xl text-gray-400"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No se encontraron equipos</h3>
        <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
      </div>
    )
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {(titulo || subtitulo) && (
          <div className="text-center mb-8">
            {titulo && (
              <h2 className="text-5xl leading-snug text-gradient title-xl mb-2">
                {titulo}
              </h2>
            )}
            {subtitulo && (
              <p className="text-xl text-gray-600">{subtitulo}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipos.map((equipo, index) => (
            <ProductCard
              key={equipo.ID_Producto}
              equipo={equipo}
              showBadge={showBadges && index < 3}
              badgeText="DESTACADO"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
