import Image from "next/image"
import Link from "next/link"
import type { Automatizacion } from "@/lib/automatizaciones"

export const AGENDA_URL = "https://outlook.office.com/bookwithme/user/5d9fcae1581e49e8be2b6a163ed07576%40ofimundo.cl/meetingtype/x2Au6VY8SU-gJ1Uq4PePCw2?anonymous&ismsaljsauthenabled"

export function AutomatizacionCard({ automatizacion }: { automatizacion: Automatizacion }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-background shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-[275px] bg-[linear-gradient(135deg,#f4dff0_0%,#c9b6e4_100%)]">
        <Image src={automatizacion.imagen} alt={`Ilustración de ${automatizacion.nombre}`} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
        <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold text-ofimundo-purple shadow-sm">Automatización</span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ofimundo-magenta">{automatizacion.categoria}</p>
          <h3 className="mb-3 text-xl font-bold text-ofimundo-navy">{automatizacion.nombre}</h3>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">{automatizacion.resumen}</p>
          <dl className="mb-6 grid grid-cols-2 gap-3 border-y border-gray-100 py-4 text-sm">
            <div>
              <dt className="text-xs text-gray-500">Beneficio</dt>
              <dd className="font-semibold text-ofimundo-purple">{automatizacion.beneficio}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Modalidad</dt>
              <dd className="font-semibold text-gray-800">{automatizacion.modalidad}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-auto flex gap-3">
          <Link href={`/cotizar-automatizaciones/${automatizacion.slug}`} className="flex flex-1 items-center justify-center rounded-lg bg-linear-to-r from-(--ofimundo-magenta) to-(--ofimundo-purple) px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            Cotizar
          </Link>
          <Link href={`/automatizaciones/${automatizacion.slug}`} className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-ofimundo-purple px-4 py-3 text-sm font-semibold text-ofimundo-purple transition hover:bg-purple-50">
            Ver más <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
