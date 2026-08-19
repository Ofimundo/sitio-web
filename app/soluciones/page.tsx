import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export const metadata = {
  title: "Soluciones y Servicios | Ofimundo",
  description: "Conoce nuestras soluciones tecnológicas integrales: DaaS (Device as a Service), MPS (Servicios Gestionados de Impresión), Automatización RPA y Salas Colaborativas.",
}

const solucionesData = [
  {
    id: "daas",
    badge: "Modelo DaaS",
    title: "DaaS (Device as a Service)",
    subtitle: "Dispositivo como Servicio: Arriendo e Infraestructura Tecnológica",
    iconClass: "fas fa-laptop",
    iconImg: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/03-iconos/DaaS.png",
    intro:
      "El modelo DaaS (Device as a Service) permite a las empresas acceder a equipamiento de cómputo, impresoras y multifuncionales de última generación bajo una suscripción mensual fija, transformando grandes inversiones de capital (CapEx) en gastos operativos previsibles (OpEx).",
    highlights: [
      {
        title: "Arriendo de Equipos sin Inversión Inicial",
        desc: "Accede a computadores, impresoras y laptops de alta gama sin desembolsar grandes sumas de dinero.",
      },
      {
        title: "Soporte Técnico y Mantención Integral",
        desc: "Incluye asistencia técnica continua, reemplazo preventivo y solución rápida ante cualquier falla.",
      },
      {
        title: "Insumos y Consumibles Garantizados",
        desc: "Despreocúpate del abastecimiento; gestión automatizada de tóners y suministros para tus equipos.",
      },
      {
        title: "Renovación Tecnológica Periódica",
        desc: "Mantén tu empresa siempre al día con tecnología moderna al finalizar tu periodo de contrato.",
      },
    ],
    ctaText: "Explorar Equipos DaaS en Catálogo",
    ctaLink: "/catalogo?tipo=Multifuncional&tipo=Impresora",
  },
  {
    id: "mps",
    badge: "Gestión de Impresión",
    title: "MPS (Managed Print Services)",
    subtitle: "Servicios Gestionados de Impresión y Control Documental",
    iconClass: "fas fa-print",
    iconImg: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/03-iconos/mps.png",
    intro:
      "Optimiza el entorno de impresión de tu organización. Con MPS tomamos el control proactivo de tu flota de multifuncionales e impresoras, reduciendo hasta un 30% los costos operativos y garantizando la continuidad operativa.",
    highlights: [
      {
        title: "Monitoreo y Auditoría de Consumos",
        desc: "Visibilidad total de volúmenes de impresión por departamento o usuario para evitar abusos y descontrol.",
      },
      {
        title: "Reabastecimiento Automático de Tóner",
        desc: "Despacho proactivo de insumos antes de que el equipo quede sin carga, sin interrumpir tu trabajo.",
      },
      {
        title: "Seguridad e Impresión Confidencial",
        desc: "Liberación de impresiones mediante PIN o credencial corporativa para proteger datos sensibles.",
      },
      {
        title: "Sostenibilidad y Reducción de Huella",
        desc: "Disminución del uso innecesario de papel y energía gracias a políticas eficientes de impresión.",
      },
    ],
    ctaText: "Explorar Impresoras y Multifuncionales en Catálogo",
    ctaLink: "/catalogo?tipo=Multifuncional&tipo=Impresora",
  },
  {
    id: "automatizaciones",
    badge: "Eficiencia con RPA",
    title: "Automatización de Procesos (RPA)",
    subtitle: "Robots de Software para Tareas Repetitivas y Gestión de Negocios",
    iconClass: "fas fa-robot",
    iconImg: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/03-iconos/AUTO.png",
    intro:
      "Implementamos robots de software (RPA) y flujos inteligentes que ejecutan tareas administrativas pesadas 24/7 sin errores humanos, integrándose a tus sistemas existentes (Softland, ERP, portales bancarios, SII y Dirección del Trabajo).",
    highlights: [
      {
        title: "Aceptación Automática de Facturas SII",
        desc: "Procesamiento y validación masiva de facturas recibidas de proveedores directamente en tu ERP.",
      },
      {
        title: "Cuadratura de Saldos Bancarios 24/7",
        desc: "Conciliación automática de cartolas de múltiples bancos en tiempo real sin digitar manualmente.",
      },
      {
        title: "Carga de Finiquitos en Dirección del Trabajo",
        desc: "Subida automática de documentos de personal cumpliendo los formatos exigidos por ley.",
      },
      {
        title: "Cero Errores y Alta Eficiencia",
        desc: "Libera a tu personal de tareas rutinarias para centrarse en labores de alto valor estratégico.",
      },
    ],
    ctaText: "Ver Automatizaciones en Catálogo",
    ctaLink: "/catalogo?tipo=Automatizaci%C3%B3n",
  },
  {
    id: "salas",
    badge: "Smart Office",
    title: "Salas Colaborativas e Inmersivas",
    subtitle: "Equipamiento de Videoconferencia y Comunicación Inmersiva",
    iconClass: "fas fa-building",
    iconImg: "https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/03-iconos/sala.png",
    intro:
      "Diseñamos e implementamos espacios de trabajo inteligentes y salas de reuniones equipadas con la última tecnología audiovisual para potenciar el trabajo híbrido y la colaboración sin fricciones.",
    highlights: [
      {
        title: "Sistemas de Videoconferencia 4K",
        desc: "Cámaras con seguimiento automático del interlocutor y encuadre inteligente impulsado por IA.",
      },
      {
        title: "Audio Inmersivo Micrófonos de Cancelación",
        desc: "Sonido nítido en toda la sala sin ecos ni ruidos de fondo molestos durante llamadas de negocio.",
      },
      {
        title: "Pantallas Interactivas y Táctiles",
        desc: "Presentaciones dinámicas y pizarras digitales compatibles con Microsoft Teams, Zoom y Google Meet.",
      },
      {
        title: "Control Unificado e Instalación Pro",
        desc: "Comienza una reunión con un solo toque sin complicaciones de cables o configuración.",
      },
    ],
    ctaText: "Ver Salas en Catálogo",
    ctaLink: "/catalogo?tipo=Salas+colaborativas",
  },
]

export default function SolucionesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-gray-100 flex flex-col">
      <Header />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-linear-to-b from-purple-900/10 via-pink-900/5 to-transparent dark:from-purple-950/40 dark:via-pink-950/20">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 mb-4 border border-purple-200 dark:border-purple-800">
            Catálogo de Soluciones Tecnológicas
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gradient mb-6 leading-tight">
            Nuestras Soluciones y Servicios Integrales
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Impulsa la productividad y la transformación digital de tu empresa. Explora en detalle nuestro ecosistema de servicios: <strong>DaaS</strong>, <strong>MPS</strong>, <strong>Automatizaciones RPA</strong> y <strong>Salas Colaborativas</strong>.
          </p>

          {/* Quick Jump Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {solucionesData.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-medium text-sm text-slate-700 dark:text-gray-200 hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 shadow-xs hover:shadow-md transition-all flex items-center gap-2"
              >
                <i className={`${s.iconClass} text-purple-600 dark:text-purple-400`}></i>
                {s.title.split("(")[0].trim()}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Details Sections */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {solucionesData.map((sol, index) => {
          const isEven = index % 2 === 0
          return (
            <section
              key={sol.id}
              id={sol.id}
              className="scroll-mt-28 p-8 md:p-12 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              {/* Subtle background gradient glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                {/* Header & Icon Info */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    <i className={`${sol.iconClass}`}></i>
                    {sol.badge}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 flex items-center justify-center p-3 border border-purple-200/50 dark:border-purple-700/50 shrink-0">
                      <Image
                        src={sol.iconImg}
                        alt={sol.title}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                        {sol.title}
                      </h2>
                      <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        {sol.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-base">
                    {sol.intro}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      href={sol.ctaLink}
                      className="px-6 py-3 bg-linear-to-r from-(--ofimundo-purple) to-(--ofimundo-magenta) text-white font-semibold text-sm rounded-xl shadow-lg hover:opacity-95 transition-all inline-flex items-center gap-2"
                    >
                      {sol.ctaText}
                      <i className="fas fa-arrow-right text-xs"></i>
                    </Link>
                  </div>
                </div>

                {/* Highlights Grid */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sol.highlights.map((item, hIdx) => (
                    <div
                      key={hIdx}
                      className="p-5 bg-slate-50/80 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/60 hover:border-purple-300 dark:hover:border-purple-600/50 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-600/10 dark:bg-purple-400/20 text-purple-600 dark:text-purple-300 flex items-center justify-center mb-3">
                        <i className="fas fa-check text-xs"></i>
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        {/* Global CTA Banner at bottom */}
        <section className="bg-linear-to-r from-purple-900 via-slate-900 to-pink-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              ¿Listo para transformar la tecnología de tu empresa?
            </h2>
            <p className="text-white/80 text-base md:text-lg">
              Cotiza con nuestros especialistas y descubre la mejor modalidad (DaaS, MPS, Automatización o Salas) adaptada a tu presupuesto.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href="/catalogo"
                className="px-8 py-3.5 bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-sm rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Ver Catálogo Completo
              </Link>
              <Link
                href="/contacto"
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl backdrop-blur-xs border border-white/20 transition-all"
              >
                Contactar Asesor
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
