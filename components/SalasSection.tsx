import Link from "next/link"
import type { Sala } from "@/lib/types"
import { SalaCard } from "./SalaCard"

export function SalasSection({ salas }: { salas: Sala[] }) {
  return (
    <section className="bg-white dark:bg-background px-3 sm:px-6 lg:px-8 py-6 sm:py-10" aria-labelledby="salas-colaborativas">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8 text-center px-2">
          <h2 id="salas-colaborativas" className="title-xl text-gradient mb-2 text-2xl sm:text-4xl md:text-5xl leading-snug">
            Salas Colaborativas
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Soluciones completas de videoconferencia, visualización y control para cada espacio de colaboración.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {salas.slice(0, 3).map((sala, index) => (
            <SalaCard key={sala.ID_Sala} sala={sala} showBadge={index === 0} />
          ))}
        </div>

        <div className="mt-8 sm:mt-10 text-center px-4">
          <Link
            href="/catalogo?tipo=Salas+colaborativas"
            className="inline-block rounded-lg bg-linear-to-br from-(--ofimundo-purple) to-(--ofimundo-magenta) px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold text-white transition hover:from-[#241a78] hover:to-[#c62842] shadow-md"
          >
            Ver todas las salas
          </Link>
        </div>
      </div>
    </section>
  )
}
