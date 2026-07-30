"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

const soluciones = [
  {
    icon: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/03-iconos/DaaS.png",
    title: "DaaS",
    description: "Tecnología a tu alcance.",
    link: "/catalogo",
  },
  {
    icon: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/03-iconos/AUTO.png",
    title: "Automatización",
    description: "Optimización de Tareas.",
    link: "/catalogo?tipo=Automatización",
  },
  {
    icon: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/03-iconos/mps.png",
    title: "MPS",
    description: "Gestión de Impresión.",
    link: "/catalogo?tipo=Multifuncional&tipo=Impresora",
  },
  {
    icon: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/03-iconos/sala.png",
    title: "Salas Colaborativas",
    description: "Comunicación sin fricciones.",
    link: "/catalogo?tipo=Salas+colaborativas",
  },
]

export function SolucionesSection() {
  const swiperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initSwiper = async () => {
      const Swiper = (await import("swiper")).default
      const { Autoplay } = await import("swiper/modules")
      
      // ✅ Cambiado para Swiper v11
      await import("swiper/swiper-bundle.css")

      if (swiperRef.current) {
        new Swiper(swiperRef.current, {
          modules: [Autoplay],
          slidesPerView: "auto",
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 500,
            disableOnInteraction: false,
          },
        })
      }
    }

    initSwiper()
  }, [])

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-5xl text-gradient title-xl mb-2">Nuestras Soluciones</h2>
          <p className="text-xl text-gray-600">Impulsa tu empresa con la mejor tecnología</p>
        </div>

        <div ref={swiperRef} className="swiper swiper-productos">
          <div className="swiper-wrapper">
            {soluciones.map((solucion, index) => (
              <div
                key={index}
                className="swiper-slide w-64 p-6 bg-white rounded-xl border border-gray-200 text-center hover:shadow-lg transition"
              >
                <Link
                  href={solucion.link}
                  target={solucion.link.startsWith("http") ? "_blank" : undefined}
                  rel={solucion.link.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <Image
                      src={solucion.icon}
                      alt={`Icono ${solucion.title}`}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">{solucion.title}</h3>
                  <p className="text-sm text-gray-500">{solucion.description}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
