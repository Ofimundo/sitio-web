import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { AGENDA_URL } from "@/components/AutomatizacionCard"
import { automatizaciones, obtenerAutomatizacionPorSlug } from "@/lib/automatizaciones"

export function generateStaticParams() {
  return automatizaciones.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const item = obtenerAutomatizacionPorSlug(slug)
  return item ? { title: item.nombre, description: item.resumen } : {}
}

export default async function AutomatizacionDetallePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = obtenerAutomatizacionPorSlug(slug)
  if (!item) notFound()

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <section className="px-4 pb-16 pt-36 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <Link href="/catalogo?tipo=Automatización" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ofimundo-purple transition hover:text-ofimundo-magenta">
            <i className="fas fa-arrow-left" aria-hidden="true" /> Volver a automatizaciones
          </Link>

          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="grid content-start gap-8">
              <article className="overflow-hidden rounded-lg border border-gray-200 bg-background shadow-lg">
                <div className="grid md:grid-cols-2">
                  <div className="relative min-h-[340px] bg-[linear-gradient(135deg,#f4dff0_0%,#c9b6e4_100%)] md:min-h-[490px]">
                    <Image src={item.imagen} alt={`Ilustración de ${item.nombre}`} fill priority sizes="(max-width: 768px) 100vw, 34vw" className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <span className="mb-4 w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-ofimundo-purple">Automatización · {item.categoria}</span>
                    <h1 className="mb-3 text-balance text-3xl font-bold text-ofimundo-navy">{item.nombre}</h1>
                    <p className="mt-3 text-lg font-semibold text-ofimundo-magenta">{item.beneficio}</p>
                    <p className="mt-5 text-pretty leading-relaxed text-gray-600">{item.descripcion}</p>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {item.capacidades.slice(0, 4).map((capacidad) => (
                        <div key={capacidad} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                          <i className="fas fa-check-circle mt-1 text-ofimundo-purple" aria-hidden="true" />
                          <span className="text-sm leading-5 text-gray-700">{capacidad}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <Link href={`/cotizar-automatizaciones/${item.slug}`} className="flex-1 rounded-lg bg-linear-to-r from-(--ofimundo-magenta) to-(--ofimundo-purple) px-6 py-3.5 text-center font-semibold text-white transition hover:opacity-90">Cotizar solución</Link>
                      <a href={AGENDA_URL} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg border-2 border-ofimundo-purple px-6 py-3.5 text-center font-semibold text-ofimundo-purple transition hover:bg-purple-50">Agendar Reunión</a>
                    </div>
                  </div>
                </div>
              </article>

              <section className="rounded-lg border border-gray-200 bg-background p-6 shadow-sm md:p-8" aria-labelledby="planes-title">
              <p className="text-sm font-bold uppercase tracking-widest text-ofimundo-magenta">Alternativas de implementación</p>
              <h2 id="planes-title" className="mt-2 text-3xl font-bold text-ofimundo-navy">Planes para tu operación</h2>
              <p className="mt-3 leading-relaxed text-gray-600">El valor final depende del volumen, las integraciones y personalizaciones. Nuestro equipo confirmará alcance y condiciones durante la cotización.</p>
              <div className={`mt-8 grid gap-5 ${item.planes.length === 3 ? "xl:grid-cols-3" : "md:grid-cols-2"}`}>
                {item.planes.map((plan) => (
                  <article key={plan.nombre} className={`relative flex flex-col overflow-hidden rounded-lg border bg-background ${plan.recomendado ? "border-ofimundo-magenta shadow-md" : "border-gray-200"}`}>
                    <div className="bg-linear-to-r from-(--ofimundo-magenta) to-(--ofimundo-purple) px-5 py-6 text-white">
                      {plan.recomendado && <span className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-ofimundo-purple">Recomendado</span>}
                      <h3 className="text-2xl font-bold">{plan.nombre}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/90">{plan.descripcion}</p>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Ideal para</p>
                      <ul className="mt-3 grid gap-2">{plan.idealPara.map((value) => <li key={value} className="flex gap-2 text-sm font-semibold text-ofimundo-navy"><i className="fas fa-circle-check mt-1 text-xs text-ofimundo-purple" aria-hidden="true" />{value}</li>)}</ul>
                      <ul className="mt-5 grid gap-3 border-t border-gray-100 pt-5">{plan.incluye.map((value) => <li key={value} className="flex gap-3 text-sm text-gray-600"><i className="fas fa-check mt-1 text-ofimundo-magenta" aria-hidden="true" />{value}</li>)}</ul>
                      <Link href={`/cotizar-automatizaciones/${item.slug}?plan=${encodeURIComponent(plan.nombre)}`} className="mt-7 rounded-lg bg-ofimundo-purple px-5 py-3 text-center font-semibold text-white transition hover:bg-ofimundo-magenta">Cotizar este plan</Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="grid content-start gap-6">
            <section className="rounded-lg border border-gray-200 bg-background p-6 shadow-sm">
              <h2 className="text-xl font-bold text-ofimundo-navy">Resumen de la solución</h2>
              <dl className="mt-5 grid gap-4 text-sm">
                <div className="border-b border-gray-100 pb-4"><dt className="text-gray-500">Área</dt><dd className="mt-1 font-semibold text-ofimundo-navy">{item.categoria}</dd></div>
                <div className="border-b border-gray-100 pb-4"><dt className="text-gray-500">Categoría</dt><dd className="mt-1 font-semibold text-ofimundo-navy">{item.categoria}</dd></div>
                <div><dt className="text-gray-500">Modalidad</dt><dd className="mt-1 font-semibold text-ofimundo-navy">{item.modalidad}</dd></div>
              </dl>
            </section>
            <InfoBlock icon="fa-chart-line" title="Cómo dimensionamos" items={item.metricas} compact />
            <InfoBlock icon="fa-gears" title="Qué automatiza" items={item.capacidades} compact />
            <InfoBlock icon="fa-plug" title="Integraciones" items={item.integraciones} compact />
            <section className="rounded-lg bg-ofimundo-navy p-6 text-white shadow-sm">
              <h2 className="text-xl font-bold">¿Necesitas orientación?</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/80">Agenda una reunión para revisar tu proceso actual y definir el alcance más adecuado.</p>
              <a href={AGENDA_URL} target="_blank" rel="noopener noreferrer" className="mt-5 block rounded-lg border-2 border-ofimundo-purple bg-white px-4 py-3 text-center text-sm font-semibold text-ofimundo-purple transition hover:bg-purple-50">Agendar Reunión</a>
            </section>
          </aside>
        </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

function InfoBlock({ icon, title, items, compact = false }: { icon: string; title: string; items: string[]; compact?: boolean }) {
  return (
    <article className={`rounded-lg border border-gray-200 bg-background shadow-sm ${compact ? "p-6" : "p-6 md:p-8"}`}>
      <span className="flex size-12 items-center justify-center rounded-lg bg-ofimundo-purple text-white"><i className={`fas ${icon}`} aria-hidden="true" /></span>
      <h2 className={`mt-5 font-bold text-ofimundo-navy ${compact ? "text-xl" : "text-2xl"}`}>{title}</h2>
      <ul className={`mt-5 grid gap-3 ${compact ? "grid-cols-1" : "sm:grid-cols-2"}`}>{items.map((value) => <li key={value} className="flex items-start gap-3 text-sm leading-6 text-gray-600"><i className="fas fa-circle-check mt-1.5 text-xs text-ofimundo-magenta" aria-hidden="true" /><span>{value}</span></li>)}</ul>
    </article>
  )
}
