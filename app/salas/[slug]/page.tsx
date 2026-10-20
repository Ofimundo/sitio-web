import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { SalaEquiposSection } from "@/components/SalaEquiposSection"
import { ServiceCard } from "@/components/ServiceCard"
import { getSalaByIdentifier } from "@/lib/salas"

/* SEO Metadata - Comentado
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const sala = await getSalaByIdentifier((await params).slug)
  return sala ? { title: `${sala.Nombre} - Sala colaborativa`, description: sala.Descripcion } : { title: "Sala no encontrada" }
}
*/

export default async function SalaDetallePage({ params }: { params: Promise<{ slug: string }> }) {
  const sala = await getSalaByIdentifier((await params).slug)
  if (!sala) notFound()

  return <main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
    <Header />
    <div className="px-3 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-28 sm:pt-36 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <Link href="/catalogo?tipo=Salas+colaborativas" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ofimundo-purple transition hover:text-ofimundo-magenta"><i className="fas fa-arrow-left" />Volver al catálogo</Link>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-6 sm:gap-8 lg:col-span-2">
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative min-h-[260px] sm:min-h-[340px] bg-[linear-gradient(135deg,#f4dff0_0%,#c9b6e4_100%)] md:min-h-[490px]">
                  <Image src={sala.Imagen_Principal} alt={`Vista comercial de ${sala.Nombre}`} fill priority sizes="(max-width: 768px) 100vw, 34vw" className="object-cover" />
                </div>
                <div className="flex flex-col p-5 sm:p-8">
                  <span className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-ofimundo-magenta">Solución {sala.Linea} · Tamaño {sala.Tamano}</span>
                  <h1 className="mb-2 sm:mb-3 text-balance text-2xl sm:text-4xl font-bold text-ofimundo-navy">{sala.Nombre}</h1>
                  <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed text-gray-600">{sala.Descripcion}</p>
                  <div className="mb-6 grid grid-cols-1 gap-2.5 sm:gap-3 sm:grid-cols-2">{sala.Beneficios.map((beneficio) => <div key={beneficio} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3"><i className="fas fa-check-circle mt-1 text-ofimundo-purple" /><span className="text-xs sm:text-sm text-gray-700">{beneficio}</span></div>)}</div>
                  <div className="mt-auto flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/cotizar-salas/${sala.Slug}`}
                      className="w-full sm:flex-1 rounded-lg bg-linear-to-r from-(--ofimundo-magenta) to-(--ofimundo-purple) px-4 py-3 text-center text-xs sm:text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Cotizar solución
                    </Link>
                    <a href="https://outlook.office.com/bookwithme/user/5d9fcae1581e49e8be2b6a163ed07576%40ofimundo.cl/meetingtype/x2Au6VY8SU-gJ1Uq4PePCw2?anonymous&ismsaljsauthenabled" target="_blank" rel="noopener noreferrer" className="w-full sm:flex-1 rounded-lg border-2 border-ofimundo-purple px-4 py-3 text-center text-xs sm:text-sm font-semibold text-ofimundo-purple transition hover:bg-purple-50">Agendar Reunión</a>
                  </div>
                </div>
              </div>
            </section>

            <SalaEquiposSection opciones={sala.Opciones} />
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"><h2 className="mb-3 text-sm font-semibold text-gray-500">SOLUCIÓN</h2><p className="text-lg font-bold text-ofimundo-navy">{sala.Nombre}</p><p className="text-sm text-gray-600">Línea {sala.Linea} · Tamaño {sala.Tamano}</p></div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"><h2 className="mb-4 text-sm font-semibold text-gray-500">COMPATIBILIDAD</h2><div className="flex flex-col gap-3">{sala.Compatibilidad.map((item) => <div key={item} className="flex items-center gap-3"><i className="fas fa-check text-ofimundo-purple" /><span className="text-sm text-gray-700">{item}</span></div>)}</div></div>
            <div className="rounded-xl bg-ofimundo-navy p-6 text-white"><h2 className="mb-2 text-xl font-bold">Implementación incluida</h2><p className="mb-5 text-sm leading-relaxed text-gray-200">Preparamos tu espacio con asesoría, instalación, configuración y capacitación inicial.</p><ol className="flex flex-col gap-3 text-sm"><li className="flex gap-3"><strong>1.</strong>Asesoría para tu espacio</li><li className="flex gap-3"><strong>2.</strong>Instalación profesional</li><li className="flex gap-3"><strong>3.</strong>Capacitación y acompañamiento</li></ol></div>
          </aside>
        </div>
      </div>
    </div>
    <Footer />
  </main>
}
