"use client"

import Image from "next/image"
import Link from "next/link"

const soluciones = [
  {
    icon: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/03-iconos/AUTO.png",
    title: "Automatización",
    description: "Servicios de Automatización de Procesos",
    link: "/catalogo?tipo=Automatizaci%C3%B3n",
  },
  {
    icon: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/03-iconos/mps.png",
    title: "MPS",
    description: "Arriendo de Impresoras + Mantención e Insumos",
    link: "/catalogo?tipo=Multifuncional&tipo=Impresora",
  },
  {
    icon: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/03-iconos/sala.png",
    title: "Salas Colaborativas",
    description: "Equipamiento de Videoconferencia y Comunicaciones",
    link: "/catalogo?tipo=Salas+colaborativas",
  },
]

export function SolucionesSection() {
  return (
    <section className="py-8 px-4 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl text-gradient title-xl mb-1">Nuestras Soluciones</h2>
          <p className="text-base text-gray-600 dark:text-gray-300">Impulsa tu empresa con la mejor tecnología</p>
        </div>

        {/* Tarjetas centradas */}
        <div className="flex flex-wrap justify-center items-stretch gap-6 max-w-5xl mx-auto">
          {soluciones.map((solucion, index) => (
            <div
              key={index}
              className="w-full sm:w-64 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 text-center hover:shadow-lg transition-all transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <Link
                href={solucion.link}
                target={solucion.link.startsWith("http") ? "_blank" : undefined}
                rel={solucion.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex flex-col h-full items-center justify-between"
              >
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Image
                    src={solucion.icon}
                    alt={`Icono ${solucion.title}`}
                    width={72}
                    height={72}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-base mb-1">{solucion.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{solucion.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Botón destacado a la nueva página de Soluciones */}
        <div className="mt-8 text-center">
          <Link
            href="/soluciones"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-linear-to-r from-purple-700 via-purple-900 to-pink-700 hover:from-purple-800 hover:to-pink-800 text-white font-bold text-sm md:text-base rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 border border-purple-400/30 group"
          >
            <span>¿Quieres saber qué es MPS, Automatizaciones y Salas Colaborativas?</span>
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform text-xs"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}
