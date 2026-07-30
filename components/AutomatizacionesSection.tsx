import { AutomatizacionCard } from "./AutomatizacionCard"
import { automatizaciones } from "@/lib/automatizaciones"

export function AutomatizacionesSection() {
  return (
    <section className="bg-gray-50 px-4 py-16" aria-labelledby="automatizaciones-title">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 id="automatizaciones-title" className="title-xl text-gradient mb-2 text-5xl leading-snug">Automatizaciones</h2>
          <p className="mx-auto mt-3 max-w-4xl text-pretty text-lg leading-relaxed text-ofimundo-navy md:text-xl">Soluciones que convierten procesos repetitivos en resultados</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {automatizaciones.slice(0, 3).map((automatizacion) => <AutomatizacionCard key={automatizacion.slug} automatizacion={automatizacion} />)}
        </div>
      </div>
    </section>
  )
}
