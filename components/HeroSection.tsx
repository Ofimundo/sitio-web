"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export function HeroSection() {
  const swiperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Inicializar Swiper solo en el cliente
    const initSwiper = async () => {
      const Swiper = (await import("swiper")).default
      const { Autoplay, Pagination } = await import("swiper/modules")
      
      // ✅ Cambiado para Swiper v11
      await import("swiper/swiper-bundle.css")

      if (swiperRef.current) {
        new Swiper(swiperRef.current, {
          modules: [Autoplay, Pagination],
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        })
      }
    }

    initSwiper()
  }, [])

  const banners = [
    {
      image: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/02-banner/01-banner-of.jpg",
      title: "Diseñados para potenciar tu crecimiento",
      subtitle: "Soluciones tecnológicas para empresas",
    },
    {
      image: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/02-banner/02-banner-of.png",
      title: "Diseñados para potenciar tu crecimiento",
      subtitle: "Soluciones tecnológicas para empresas",
    },
    {
      image: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/02-banner/03-banner-of.jpg",
      title: "Diseñados para potenciar tu crecimiento",
      subtitle: "Soluciones tecnológicas para empresas",
    },
    {
      image: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/02-banner/04-banner-of.jpg",
      title: "Diseñados para potenciar tu crecimiento",
      subtitle: "Soluciones tecnológicas para empresas",
    },
  ]

  return (
    <section className="hero-gradient pt-28 pb-12 px-4 min-h-[70vh]">
      {/* Banner Swiper */}
      <div className="w-full flex justify-center px-4 mb-12">
        <div
          ref={swiperRef}
          className="swiper w-full max-w-[1200px] aspect-[16/5] overflow-hidden rounded-[20px] relative">
          <div className="swiper-wrapper">
            {banners.map((banner, index) => (
              <div key={index} className="swiper-slide relative">
                <Image
                  src={banner.image}
                  alt={`Banner ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
                  <p className="text-2xl mb-2">{banner.subtitle}</p>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">{banner.title}</h1>
                  <a
                    href="/catalogo"
                    className="btn-account bg-linear-to-br from-(--ofimundo-purple) to-(--ofimundo-magenta) text-white rounded-lg text-sm font-semibold px-6 py-3 hover:from-[#241a78] hover:to-[#c62842] transition"
                  >
                    {"Conoce las Soluciones →"}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>

      {/* Título principal */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="title-xl text-5xl text-gradient leading-snug mb-4">
          Encuentra el producto ideal para tu Empresa
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Cuéntanos lo que necesitas y te recomendaremos las mejores opciones
        </p>
      </div>
    </section>
  )
}
