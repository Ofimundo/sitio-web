import Image from "next/image"
import Link from "next/link"
import type { Sala } from "@/lib/types"

const etiquetasTamano = { S: "Sala pequeña", M: "Sala mediana", L: "Sala grande" }

interface SalaCardProps {
  sala: Sala
  showBadge?: boolean
}

export function SalaCard({ sala, showBadge = false }: SalaCardProps) {
  return (
    <article className="card-hover relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
      <Link 
        href={`/salas/${sala.Slug}`} 
        className="relative flex h-[275px] overflow-hidden rounded-t-xl bg-linear-to-br from-purple-100 to-pink-50"
      >
        <Image
          src={sala.Imagen_Principal}
          alt={`Configuración comercial de la sala ${sala.Nombre}`}
          fill
          sizes="(max-width: 768px) 100vw, 440px"
          className="object-cover"
        />
      </Link>

      {showBadge && (
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-ofimundo-red px-3 py-1 text-xs font-bold text-white">
            DESTACADO
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <span className="mb-1 text-xs uppercase tracking-wider text-gray-500">
          Solución {sala.Linea} · {etiquetasTamano[sala.Tamano]}
        </span>
        <h3 className="nombre-producto mb-2 text-lg font-bold text-ofimundo-navy">
          {sala.Nombre}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {sala.Descripcion}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded bg-gray-100 px-2 py-1 text-xs">2 configuraciones</span>
          <span className="rounded bg-gray-100 px-2 py-1 text-xs">Tamaño {sala.Tamano}</span>
        </div>

        <div className="mt-auto flex items-center gap-3">
          <Link
            href={`/cotizar-salas/${sala.Slug}`}
            className="flex-1 rounded-lg bg-linear-to-r from-(--ofimundo-purple) to-(--ofimundo-magenta) px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
          >
            Cotizar
          </Link>
          <Link
            href={`/salas/${sala.Slug}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-ofimundo-purple px-4 py-3 text-center text-sm font-semibold text-ofimundo-purple transition hover:bg-purple-50"
          >
            Ver más <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
