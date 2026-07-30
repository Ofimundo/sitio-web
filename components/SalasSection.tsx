import Link from "next/link"
import type { Sala } from "@/lib/types"
import { SalaCard } from "./SalaCard"

export function SalasSection({ salas }: { salas: Sala[] }) {
  return (
    <section className="bg-white px-8 py-2" aria-labelledby="salas-colaborativas">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 id="salas-colaborativas" className="title-xl text-gradient mb-2 text-5xl leading-snug">
            Salas Colaborativas
          </h2>
          <p className="text-xl text-gray-600">
            Soluciones completas de videoconferencia, visualización y control para cada espacio de colaboración.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {salas.slice(0, 3).map((sala, index) => (
            <SalaCard key={sala.ID_Sala} sala={sala} showBadge={index === 0} />
          ))}
        </div>

        {salas.length > 3 && (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {salas.slice(3, 6).map((sala) => (
              <SalaCard key={sala.ID_Sala} sala={sala} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/catalogo?tipo=Salas+colaborativas"
            className="inline-block rounded-lg bg-linear-to-br from-(--ofimundo-purple) to-(--ofimundo-magenta) px-8 py-3 font-semibold text-white transition hover:from-[#241a78] hover:to-[#c62842]"
          >
            Ver todas las salas
          </Link>
        </div>
      </div>
    </section>
  )
}
