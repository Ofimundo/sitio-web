import { AutomatizacionCard } from "./AutomatizacionCard"
import type { Automatizacion } from "@/lib/types"

export function AutomatizacionesSection({ automatizaciones = [] }: { automatizaciones?: Automatizacion[] }) {
  return (
    <section className="bg-gray-50 dark:bg-background px-3 sm:px-6 lg:px-8 py-8 sm:py-16" aria-labelledby="automatizaciones-title">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-10 text-center px-2">
          <h2 id="automatizaciones-title" className="title-xl text-gradient mb-2 text-2xl sm:text-4xl md:text-5xl leading-snug">Automatizaciones</h2>
          <p className="mx-auto mt-2 sm:mt-3 max-w-4xl text-pretty text-sm sm:text-lg md:text-xl leading-relaxed text-ofimundo-navy dark:text-gray-300">Soluciones que convierten procesos repetitivos en resultados</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {automatizaciones.slice(0, 3).map((automatizacion) => (
            <AutomatizacionCard key={automatizacion.slug} automatizacion={automatizacion} />
          ))}
        </div>
      </div>
    </section>
  )
}
