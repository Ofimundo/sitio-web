import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export const metadata = {
  title: "Somos Ofimundo | Nuestra Historia y Experiencia",
  description: "Conoce a Ofimundo: más de 30 años liderando el mercado de soluciones de impresión, cómputo y transformación digital en Chile.",
}

export default function SomosOfimundoPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-gray-100 flex flex-col">
      <Header />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-linear-to-b from-purple-900/10 via-pink-900/5 to-transparent dark:from-purple-950/40 dark:via-pink-950/20">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 mb-4 border border-purple-200 dark:border-purple-800">
            Sobre Nosotros
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gradient mb-6 leading-tight">
            Somos Ofimundo
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Tu transformación, nuestra pasión. Más de 30 años acompañando a empresas e instituciones de Chile con soluciones tecnológicas de vanguardia.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Trayectoria & Propósito Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Más de 30 Años Impulsando la Tecnología Empresarial
            </h2>
            <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
              En Ofimundo hemos evolucionado junto a las necesidades tecnológicas de Chile. Lo que comenzó como un referente en equipamiento de oficina e impresión gestionada, hoy es un ecosistema integral de soluciones digitales que incluye **DaaS (Device as a Service)**, **Automatización RPA**, **MPS** y **Salas Colaborativas**.
            </p>
            <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
              Nuestra misión es permitir a las organizaciones enfocar sus recursos en su verdadero core de negocio, asegurando la continuidad operativa, el ahorro de costos y el soporte técnico especializado de excelencia.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md">
                <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mb-1">+30</div>
                <div className="text-xs font-semibold text-slate-600 dark:text-gray-400 uppercase tracking-wider">Años de Experiencia</div>
              </div>
              <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md">
                <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mb-1">+1000</div>
                <div className="text-xs font-semibold text-slate-600 dark:text-gray-400 uppercase tracking-wider">Empresas Clientes</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-8 rounded-3xl border border-purple-200 dark:border-purple-800/50 shadow-xl space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Nuestros Pilares Fundamentales
            </h3>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shrink-0">
                  <i className="fas fa-shield-alt text-sm"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Confianza y Continuidad Operativa</h4>
                  <p className="text-xs text-slate-600 dark:text-gray-300">Respuesta rápida y soporte de primer nivel para mantener tus equipos e impresoras siempre activos.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shrink-0">
                  <i className="fas fa-chart-line text-sm"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Innovación Eficiente (OpEx)</h4>
                  <p className="text-xs text-slate-600 dark:text-gray-300">Modelos de arriendo y suscripción flexibilizados para evitar inversiones de capital pesadas.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shrink-0">
                  <i className="fas fa-handshake text-sm"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Alianzas Estratégicas</h4>
                  <p className="text-xs text-slate-600 dark:text-gray-300">Partners oficiales de los principales fabricantes globales de hardware y software.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA to Soluciones & Contacto */}
        <div className="bg-linear-to-r from-purple-900 via-slate-900 to-pink-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            ¿Quieres saber cómo podemos transformar tu empresa?
          </h2>
          <p className="text-white/80 text-base max-w-2xl mx-auto">
            Explora nuestro catálogo de soluciones o ponte en contacto con nuestro equipo de consultores especializados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/soluciones"
              className="px-8 py-3.5 bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
            >
              Conocer Soluciones (DaaS, MPS, RPA, Salas)
            </Link>
            <Link
              href="/contacto"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl backdrop-blur-xs border border-white/20 transition-all"
            >
              Ir a Formulario de Contacto
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
