"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import ChatbotOfimundo from "@/components/ChatbotOfimundo"

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
    <section className="hero-gradient pt-24 sm:pt-28 md:pt-32 pb-4 px-2 sm:px-4 min-h-0">
      {/* Banner Swiper */}
      <div className="w-full flex justify-center px-1 sm:px-4 mb-6 sm:mb-8">
        <div
          ref={swiperRef}
          className="swiper w-full max-w-[1200px] min-h-[220px] sm:min-h-[280px] md:min-h-0 aspect-[16/10] sm:aspect-[16/7] md:aspect-[16/5] overflow-hidden rounded-[16px] sm:rounded-[20px] relative shadow-md"
        >
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
                <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-center text-white z-10 px-4">
                  <p className="text-xs sm:text-base md:text-xl font-medium mb-1 sm:mb-2 drop-shadow-sm">{banner.subtitle}</p>
                  <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-5 max-w-3xl leading-tight drop-shadow-md">{banner.title}</h1>
                  <a
                    href="/catalogo"
                    className="btn-account bg-linear-to-br from-(--ofimundo-purple) to-(--ofimundo-magenta) text-white rounded-lg text-xs sm:text-sm font-semibold px-4 py-2 sm:px-6 sm:py-3 hover:from-[#241a78] hover:to-[#c62842] transition shadow-lg"
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
      <div className="max-w-5xl mx-auto text-center mb-6 px-3">
        <h1 className="title-xl text-2xl sm:text-4xl md:text-5xl text-gradient leading-snug mb-3 sm:mb-4">
          Encuentra el producto ideal para tu Empresa
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Cuéntanos lo que necesitas y te recomendaremos las mejores opciones
        </p>
      </div>

      {/* Agente Chatbot Integrado */}
      <div className="max-w-5xl mx-auto px-1 sm:px-2">
        <ChatbotOfimundo embedded={true} />
      </div>
    </section>
  )
}
