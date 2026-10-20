"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import type { SalaOpcion, SalaEquipo } from "@/lib/types"

interface SalaEquiposSectionProps {
  opciones: SalaOpcion[]
}

interface LightboxState {
  isOpen: boolean
  imagenes: string[]
  currentIndex: number
  title: string
  brand: string
}

export function SalaEquiposSection({ opciones }: SalaEquiposSectionProps) {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  const openLightbox = (equipo: SalaEquipo, initialIndex = 0) => {
    const imagenes =
      equipo.Imagenes_Equipo && equipo.Imagenes_Equipo.length > 0
        ? equipo.Imagenes_Equipo
        : equipo.Imagen_Equipo
        ? [equipo.Imagen_Equipo]
        : []

    if (imagenes.length === 0) return

    setLightbox({
      isOpen: true,
      imagenes,
      currentIndex: Math.max(0, Math.min(initialIndex, imagenes.length - 1)),
      title: equipo.Nombre_Equipo,
      brand: equipo.Nombre_Marca,
    })
  }

  const closeLightbox = useCallback(() => {
    setLightbox(null)
  }, [])

  const nextImage = useCallback(() => {
    setLightbox((prev) => {
      if (!prev || prev.imagenes.length <= 1) return prev
      return {
        ...prev,
        currentIndex: (prev.currentIndex + 1) % prev.imagenes.length,
      }
    })
  }, [])

  const prevImage = useCallback(() => {
    setLightbox((prev) => {
      if (!prev || prev.imagenes.length <= 1) return prev
      return {
        ...prev,
        currentIndex: (prev.currentIndex - 1 + prev.imagenes.length) % prev.imagenes.length,
      }
    })
  }, [])

  // Control con teclado (Flechas y ESC) y bloqueo de scroll
  useEffect(() => {
    if (!lightbox?.isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox()
      } else if (e.key === "ArrowRight") {
        nextImage()
      } else if (e.key === "ArrowLeft") {
        prevImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [lightbox?.isOpen, closeLightbox, nextImage, prevImage])

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-8 shadow-sm" aria-labelledby="configuraciones">
      <div className="mb-6 sm:mb-8 text-center px-2">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-ofimundo-magenta">Tu ecosistema</p>
        <h2 id="configuraciones" className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold text-ofimundo-navy">
          Configuración profesional y acompañamiento inicial.
        </h2>
      </div>

      <div className={`grid grid-cols-1 gap-4 sm:gap-6 ${opciones.length > 1 ? "md:grid-cols-2" : "w-full"}`}>
        {opciones.map((opcion) => (
          <article key={opcion.ID_Opcion} className="overflow-hidden rounded-xl border border-gray-200">
            <header className="flex items-center justify-between bg-linear-to-r from-(--ofimundo-purple) to-(--ofimundo-magenta) px-4 sm:px-5 py-3 sm:py-4 text-white">
              <h3 className="text-base sm:text-xl font-bold">
                {opciones.length === 1 ? "Componentes sala colaborativa" : opcion.Nombre}
              </h3>
              {opciones.length > 1 && (
                <span className="flex size-8 sm:size-9 items-center justify-center rounded-full bg-white text-xs sm:text-sm font-bold text-ofimundo-purple">
                  {opcion.Codigo}
                </span>
              )}
            </header>

            <div className="divide-y divide-gray-100">
              {opcion.Equipos.map((equipo) => {
                const imagenes =
                  equipo.Imagenes_Equipo && equipo.Imagenes_Equipo.length > 0
                    ? equipo.Imagenes_Equipo
                    : equipo.Imagen_Equipo
                    ? [equipo.Imagen_Equipo]
                    : []
                const displayImg = equipo.Imagen_Equipo || imagenes[0]

                return (
                  <div
                    key={equipo.ID_Producto}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 hover:bg-gray-50/60 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-xs sm:text-sm font-bold text-ofimundo-purple">
                        {equipo.Orden}
                      </span>
                      <div>
                        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-ofimundo-magenta">
                          {equipo.Nombre_Marca}
                        </p>
                        <h4 className="font-bold text-sm sm:text-base text-ofimundo-navy">
                          {equipo.Nombre_Equipo}
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-gray-600">
                          {equipo.Descripcion}
                        </p>
                      </div>
                    </div>

                    {displayImg && (
                      <button
                        type="button"
                        onClick={() => openLightbox(equipo, 0)}
                        aria-label={`Ver galería de fotos de ${equipo.Nombre_Equipo} (${imagenes.length} imágenes)`}
                        title={`Haz clic para ver las fotos en grande (${imagenes.length} fotos)`}
                        className="group relative h-16 w-28 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 self-center sm:self-auto sm:w-32 cursor-pointer transition-all duration-200 hover:border-ofimundo-purple hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ofimundo-purple focus:ring-offset-2"
                      >
                        <Image
                          src={displayImg}
                          alt={equipo.Nombre_Equipo}
                          fill
                          unoptimized
                          className="object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Overlay al hacer hover */}
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/20 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-7 rounded-full bg-white/90 text-ofimundo-purple flex items-center justify-center text-xs shadow-md">
                            <i className="fas fa-search-plus" />
                          </span>
                        </div>

                        {/* Badge de cantidad de fotos */}
                        {imagenes.length > 1 && (
                          <span className="absolute bottom-1 right-1 rounded-md bg-black/75 px-1.5 py-0.5 text-[10px] font-semibold text-white flex items-center gap-1 shadow-sm backdrop-blur-xs">
                            <i className="fas fa-images text-[9px]" />
                            <span>{imagenes.length}</span>
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </article>
        ))}
      </div>

      {/* MODAL / LIGHTBOX DE IMÁGENES EN GRANDE */}
      {lightbox?.isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${lightbox.title}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox()
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/90 backdrop-blur-md p-3 sm:p-6 select-none animate-in fade-in duration-200"
        >
          {/* Barra Superior: Título, contador y botón X arriba a la derecha */}
          <header className="w-full max-w-5xl flex items-center justify-between text-white z-20 pt-1 pb-2 px-2">
            <div>
              {lightbox.brand && (
                <p className="text-xs uppercase font-semibold tracking-wider text-pink-400">
                  {lightbox.brand}
                </p>
              )}
              <h3 className="text-sm sm:text-lg font-bold text-white drop-shadow-sm">
                {lightbox.title}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              {lightbox.imagenes.length > 1 && (
                <span className="text-xs sm:text-sm font-medium text-gray-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
                  {lightbox.currentIndex + 1} / {lightbox.imagenes.length}
                </span>
              )}

              {/* Botón X arriba en la parte derecha */}
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Cerrar imagen grande"
                className="flex size-10 sm:size-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
              >
                <i className="fas fa-times text-lg sm:text-xl" />
              </button>
            </div>
          </header>

          {/* Área Principal: Imagen Grande con botones de Navegación */}
          <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-auto min-h-0">
            {/* Botón Anterior */}
            {lightbox.imagenes.length > 1 && (
              <button
                type="button"
                onClick={prevImage}
                aria-label="Imagen anterior"
                className="absolute left-1 sm:left-4 z-30 flex size-11 sm:size-14 items-center justify-center rounded-full bg-black/50 text-white border border-white/20 transition hover:bg-black/80 hover:scale-110 active:scale-95 shadow-xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
              >
                <i className="fas fa-chevron-left text-lg sm:text-2xl" />
              </button>
            )}

            {/* Imagen Grande */}
            <div className="relative h-full max-h-[68vh] sm:max-h-[72vh] w-full flex items-center justify-center p-2">
              <Image
                src={lightbox.imagenes[lightbox.currentIndex]}
                alt={`${lightbox.title} - Foto ${lightbox.currentIndex + 1}`}
                width={1200}
                height={850}
                unoptimized
                priority
                className="max-h-full w-auto max-w-full object-contain rounded-lg drop-shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Botón Siguiente */}
            {lightbox.imagenes.length > 1 && (
              <button
                type="button"
                onClick={nextImage}
                aria-label="Siguiente imagen"
                className="absolute right-1 sm:right-4 z-30 flex size-11 sm:size-14 items-center justify-center rounded-full bg-black/50 text-white border border-white/20 transition hover:bg-black/80 hover:scale-110 active:scale-95 shadow-xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
              >
                <i className="fas fa-chevron-right text-lg sm:text-2xl" />
              </button>
            )}
          </div>

          {/* Tira de Miniaturas Inferior */}
          {lightbox.imagenes.length > 1 && (
            <footer className="w-full max-w-3xl flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-2 px-4 z-20">
              {lightbox.imagenes.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLightbox((prev) => (prev ? { ...prev, currentIndex: idx } : null))}
                  aria-label={`Ver foto ${idx + 1}`}
                  className={`relative size-12 sm:size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${
                    idx === lightbox.currentIndex
                      ? "border-pink-500 scale-105 ring-2 ring-pink-500/50 shadow-lg"
                      : "border-white/25 opacity-50 hover:opacity-90 hover:border-white/60"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Miniatura ${idx + 1}`}
                    fill
                    unoptimized
                    className="object-contain p-0.5 bg-white/10"
                  />
                </button>
              ))}
            </footer>
          )}
        </div>
      )}
    </section>
  )
}
