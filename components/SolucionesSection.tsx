"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

const soluciones = [
  {
    icon: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/03-iconos/DaaS.png",
    title: "DaaS",
    description: "Dispositivo como Servicio (Arriendo Tecnológico)",
    link: "/catalogo?tipo=Multifuncional&tipo=Impresora",
  },
  {
    icon: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/03-iconos/AUTO.png",
    title: "Automatización",
    description: "Robots de Tareas Repetitivas (RPA)",
    link: "/catalogo?tipo=Automatizaci%C3%B3n",
  },
  {
    icon: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/03-iconos/mps.png",
    title: "MPS",
    description: "Gestión e Impresión Administrada",
    link: "/catalogo?tipo=Multifuncional&tipo=Impresora",
  },
  {
    icon: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/03-iconos/sala.png",
    title: "Salas Colaborativas",
    description: "Salas Inmersivas y Videoconferencia",
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
    <section className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-5xl text-gradient title-xl mb-2">Nuestras Soluciones</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Impulsa tu empresa con la mejor tecnología</p>
        </div>

        <div ref={swiperRef} className="swiper swiper-productos">
          <div className="swiper-wrapper">
            {soluciones.map((solucion, index) => (
              <div
                key={index}
                className="swiper-slide w-64 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center hover:shadow-lg transition"
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
                  <h3 className="font-bold text-slate-800 dark:text-white mb-1">{solucion.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{solucion.description}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Botón destacado a la nueva página de Soluciones */}
        <div className="mt-12 text-center">
          <Link
            href="/soluciones"
            className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-purple-700 via-purple-900 to-pink-700 hover:from-purple-800 hover:to-pink-800 text-white font-bold text-base md:text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 border border-purple-400/30 group"
          >
            <span>¿Quieres saber qué es DaaS, MPS, Automatizaciones y Salas Colaborativas?</span>
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}
