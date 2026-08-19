import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export const metadata = {
  title: "Contacto | Ofimundo",
  description: "Información de contacto oficial, dirección, teléfono, correo y horarios de atención de Ofimundo.",
}

const contactCards = [
  {
    icon: "fas fa-clock",
    title: "Horario de Atención",
    lines: ["Lunes a jueves: 09 a 18 hrs", "Viernes: 09 a 17 hrs"],
  },
  {
    icon: "fas fa-envelope",
    title: "Email",
    lines: ["hola@ofimundo.cl"],
  },
  {
    icon: "fas fa-map-marker-alt",
    title: "Dirección",
    lines: ["Lota 2305, Providencia,", "Santiago"],
  },
  {
    icon: "fas fa-phone-alt",
    title: "Teléfono",
    lines: ["2 2810 4700"],
  },
]

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-gray-100 flex flex-col">
      <Header />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden bg-linear-to-b from-purple-900/10 via-pink-900/5 to-transparent dark:from-purple-950/40 dark:via-pink-950/20">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 mb-4 border border-purple-200 dark:border-purple-800">
            Estamos para ayudarte
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gradient mb-4 leading-tight">
            Contáctate con Ofimundo
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Conoce nuestros canales oficiales de contacto, dirección y horario de atención.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-16">
        
        {/* Grid de Tarjetas Oficiales de Contacto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Icono circular gradiente */}
              <div className="w-16 h-16 mb-6 rounded-full bg-linear-to-br from-pink-500 via-purple-600 to-purple-800 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <i className={`${card.icon} text-2xl`}></i>
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                {card.title}
              </h3>

              {/* Líneas de información */}
              <div className="space-y-1">
                {card.lines.map((line, lIdx) => (
                  <p
                    key={lIdx}
                    className="text-pink-600 dark:text-pink-400 font-medium text-base leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mapa embebido de la ubicación real */}
        <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 flex items-center justify-center">
              <i className="fas fa-map-marked-alt text-lg"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Nuestra Ubicación
              </h2>
              <p className="text-xs text-slate-500 dark:text-gray-400">
                Lota 2305, Providencia, Santiago, Chile.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 h-96 shadow-md">
            <iframe
              title="Ubicación Ofimundo en Lota 2305, Providencia"
              src="https://maps.google.com/maps?q=Lota+2305,+Providencia,+Santiago,+Chile&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
