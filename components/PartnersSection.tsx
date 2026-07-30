"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const partners = [
  { name: "Brother", gray: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/brother-gris.svg", color: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/brother.svg", link: "https://www.brother.cl/" },
  { name: "Epson", gray: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/epson-gris.svg", color: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/epson.svg", link: "https://epson.cl/" },
  { name: "Kyocera", gray: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/kyocera-gris.svg", color: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/kyocera.svg", link: "https://www.kyoceradocumentsolutions.cl/" },
  { name: "Lexmark", gray: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/lexmark-gris.svg", color: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/lexmark.svg", link: "https://www.lexmark.com/es_xl.html" },
  { name: "Xerox", gray: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/xerox-gris.svg", color: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/xerox.svg", link: "https://www.xerox.com/es-cl" },
  { name: "Logitech", gray: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/logitech-gris.svg", color: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/logitech.svg", link: "https://www.logitech.com/es-roam" },
  { name: "Samsung", gray: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/samsung-gris.svg", color: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/samsung.svg", link: "https://www.samsung.com/cl/" },
  { name: "Hikvision", gray: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/hikvision-gris.svg", color: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/hikvision.svg", link: "https://www.hikvision.com/es-la/" },
  { name: "HP", gray: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/hp-gris.svg", color: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/hp.svg", link: "https://www.hp.com/cl-es/home.html" },
  { name: "Barco", gray: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/barco-gris.svg", color: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/barco.svg", link: "https://www.barco.com/es" },
  { name: "Poly", gray: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/poly-gris.svg", color: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/poly.svg", link: "https://www.hp.com/cl-es/solutions/poly.html" },
  { name: "Jabra", gray: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/jabra-gris.svg", color: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/jabra.svg", link: "https://www.jabra.com/es-es/" },
  { name: "Sennheiser", gray: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/senheisser-gris.svg", color: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/senheisser.svg", link: "https://cl.sennheiser-hearing.com/" },
  { name: "Lenovo", gray: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/lenovo-gris.svg", color: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/lenovo.svg", link: "https://www.lenovo.com/cl/es/" },
  { name: "Dell", gray: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/dell-gris.svg", color: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/dell.svg", link: "https://www.dell.com/es-cl/lp" },
  { name: "Asus", gray: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/asus-gris.svg", color: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/04-marcas/asus.svg", link: "https://www.asus.com/cl/" },
]

export function PartnersSection() {
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
          <h2 className="text-5xl text-gradient title-xl mb-2">Nuestros Partners</h2>
          <p className="text-xl text-gray-600">Trabajamos con las mejores marcas de tecnología.</p>
        </div>

        <div ref={swiperRef} className="swiper swiper-partners mt-5">
          <div className="swiper-wrapper">
            {partners.map((partner, index) => (
              <div key={index} className="swiper-slide w-45 flex justify-center items-center">
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-logo"
                >
                  <Image
                    src={partner.gray}
                    alt={partner.name}
                    width={150}
                    height={60}
                    className="logo logo-gray"
                  />
                  <Image
                    src={partner.color}
                    alt={partner.name}
                    width={150}
                    height={60}
                    className="logo logo-color"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
