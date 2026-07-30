import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { getEquipoById } from "@/lib/data"
import type { Equipo } from "@/lib/types"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const equipo = await getEquipoById(id)

  if (!equipo) {
    return { title: "Equipo no encontrado - Ofimundo" }
  }

  return {
    title: `${equipo.Nombre_Equipo} - Ofimundo`,
    description: equipo.Descripcion_Equipo || `${equipo.Tipo_Equipo} ${equipo.Nombre_Marca}`,
  }
}

export default async function EquipoDetallePage({ params }: PageProps) {
  const { id } = await params
  const equipo = await getEquipoById(id)

  if (!equipo) {
    notFound()
  }

  const imagenUrl = equipo.Imagen_Equipo
    ? equipo.Imagen_Equipo.startsWith("http")
      ? equipo.Imagen_Equipo
      : equipo.Imagen_Equipo
    : "/images/equipos/placeholder.png"

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-36 md:pt-40">
        <Link href={`/catalogo?tipo=${encodeURIComponent(equipo.Tipo_Equipo)}`} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ofimundo-purple transition hover:text-ofimundo-magenta">
          <i className="fas fa-arrow-left" aria-hidden="true" /> Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sección de producto - cabecera */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Imagen del producto */}
                <div className="h-[450px] bg-linear-to-br from-purple-50 to-pink-50 rounded-xl flex items-center justify-center">
                  <Image
                    src={imagenUrl}
                    alt={equipo.Nombre_Equipo}
                    width={400}
                    height={400}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Info del producto */}
                <div className="flex flex-col">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-ofimundo-purple text-white text-xs font-semibold rounded-full mb-3">
                      {equipo.Tipo_Equipo?.toUpperCase()}
                    </span>
                    <h1 className="text-3xl font-bold text-ofimundo-navy mb-3 leading-tight">
                      {equipo.Nombre_Equipo}
                    </h1>
                    <p className="text-gray-600 leading-relaxed">
                      {equipo.Descripcion_Equipo}
                    </p>
                  </div>

                  {/* Quick Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {equipo.Velocidad_BN_Equipo && (
                      <SpecCard
                        icon="bolt"
                        label="Velocidad de impresión"
                        value={`${equipo.Velocidad_BN_Equipo} ppm${equipo.Velocidad_Color_Equipo ? ` ~ ${equipo.Velocidad_Color_Equipo} ppm` : ""}`}
                      />
                    )}
                    {equipo.Capacidad_Bandeja1_Equipo && (
                      <SpecCard
                        icon="file-alt"
                        label="Bandeja de papel"
                        value={`${equipo.Capacidad_Bandeja1_Equipo} hojas`}
                      />
                    )}
                    {equipo.Ciclo_Recomendado_Equipo && (
                      <SpecCard
                        icon="chart-bar"
                        label="Ciclo de trabajo"
                        value={equipo.Ciclo_Recomendado_Equipo}
                      />
                    )}
                    {equipo.Tipo_Pantalla_Equipo && (
                      <SpecCard
                        icon="desktop"
                        label="Pantalla"
                        value={equipo.Tipo_Pantalla_Equipo}
                      />
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex items-center gap-3 mt-auto">
                    <Link
                      href={`/cotizar-mps/${equipo.ID_Producto}`}
                      className="flex-1 rounded-lg bg-linear-to-r from-(--ofimundo-magenta) to-(--ofimundo-purple) px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Cotizar
                    </Link>

                    <a
                      href="https://outlook.office.com/bookwithme/user/5d9fcae1581e49e8be2b6a163ed07576%40ofimundo.cl/meetingtype/x2Au6VY8SU-gJ1Uq4PePCw2?anonymous&ismsaljsauthenabled"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-lg border-2 border-ofimundo-purple px-4 py-3 text-center text-sm font-semibold text-ofimundo-purple transition hover:bg-purple-50"
                    >
                      Agendar Reunión
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de Servicios */}
            <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
              <Image
                src="https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/06-servicio/banner-titulo.png"
                alt="banner-servicio"
                width={1920}
                height={1080}
                className="logo logo-color"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                <ServiceCard
                  image="https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/06-servicio/01.servicio.jpg"
                  title="Gestión de Equipos"
                  description="Monitoreo predictivo y tóner a tiempo"
                />
                <ServiceCard
                  image="https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/06-servicio/02.servicio.jpg"
                  title="Soporte Nacional"
                  description="Atención remota y presencial en todo Chile"
                />
                <ServiceCard
                  image="https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/06-servicio/03.servicio.png"
                  title="Mi Cuenta"
                  description="Gestiona todo desde nuestra plataforma"
                />
                <ServiceCard
                  image="https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/06-servicio/04.servicio.jpg"
                  title="Client Success"
                  description="Acompañamiento y optimización continua"
                />
              </div>
            </div>

            {/* Contenido adicional */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-ofimundo-navy mb-4 text-center">
                Solución completa para tu oficina moderna
              </h2>
              <p className="text-gray-600 text-center leading-relaxed mb-8 max-w-3xl mx-auto">
                El {equipo.Nombre_Equipo} combina velocidad, calidad y conectividad en un diseño
                compacto. Perfecto para equipos de trabajo que necesitan maximizar su productividad
                con tecnología de punta y gestión remota integrada.
              </p>

              <div className="flex justify-center gap-4">
                <button className="px-8 py-3 bg-ofimundo-magenta text-white rounded-lg font-semibold hover:opacity-90 transition">
                  Solicitar Demo
                </button>
                {equipo.Archivo_PDF_Equipo && (
                  <a
                    href={equipo.Archivo_PDF_Equipo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-ofimundo-purple hover:text-ofimundo-purple transition"
                  >
                    Descargar Ficha Técnica
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Marca y Modelo */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">MARCA Y MODELO</h3>
              <p className="text-lgf font-bold text-ofimundo-navy mb-1">{equipo.Nombre_Marca} - {equipo.Nombre_Equipo}</p>
            </div>

            {/* Información Técnica */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">INFORMACIÓN TÉCNICA</h3>
              <div className="space-y-3 text-sm">
                {equipo.Tecnologia_Equipo && (
                  <TechRow label="Tecnología" value={equipo.Tecnologia_Equipo} />
                )}
                {equipo.Funciones_Equipo && (
                  <TechRow label="Funciones" value={equipo.Funciones_Equipo} />
                )}
                {equipo.Conectividad_Equipo && (
                  <TechRow label="Conectividad" value={equipo.Conectividad_Equipo} />
                )}
                {equipo.Tamano_Papel_Equipo && (
                  <TechRow label="Tamaño papel" value={equipo.Tamano_Papel_Equipo} />
                )}
                {equipo.Color_Equipo && (
                  <TechRow label="Color" value={equipo.Color_Equipo} />
                )}
                {equipo.Memoria_RAM_Equipo && (
                  <TechRow label="Memoria RAM" value={equipo.Memoria_RAM_Equipo} />
                )}
                {equipo.Procesador_Equipo && (
                  <TechRow label="Procesador" value={equipo.Procesador_Equipo} />
                )}
                {equipo.Disco_Duro_Equipo && (
                  <TechRow label="Disco Duro" value={equipo.Disco_Duro_Equipo} />
                )}
              </div>
            </div>

            {/* Características Clave */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">CARACTERÍSTICAS CLAVE</h3>
              <div className="space-y-3">
                <FeatureItem text="Impresión de alta velocidad" />
                <FeatureItem text="Bajo costo por página" />
                <FeatureItem text="Conectividad avanzada" />
                <FeatureItem text="Gestión remota incluida" />
                <FeatureItem text="Soporte técnico en todo Chile" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

function SpecCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
        <i className={`fas fa-${icon} text-ofimundo-purple`}></i>
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-bold text-ofimundo-navy">{value}</p>
      </div>
    </div>
  )
}

function ServiceCard({ image, title, description }: { image: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-1 shadow-sm text-center">
      {/* Imagen */}
      {image && (
        <div className="relative w-full h-30 mb-2">
          <Image 
            src={image} 
            alt={title} 
            width={400}
            height={500}
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <h3 className="font-bold text-ofimundo-navy mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

function TechRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-100">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-ofimundo-navy text-right max-w-[60%]">{value}</span>
    </div>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
        <i className="fas fa-check text-green-600 text-sm"></i>
      </div>
      <span className="text-sm text-gray-700">{text}</span>
    </div>
  )
}

// Mock data para cuando no hay BD
function getMockEquipo(id: string): Equipo | null {
  const mockEquipos: Record<string, Equipo> = {
    "WF-C5891": {
      ID_Producto: "WF-C5891",
      ID_Marca: 1,
      Nombre_Equipo: "WorkForce Pro WF-C5891",
      Tipo_Equipo: "Multifuncional",
      Tecnologia_Equipo: "Inyección de tinta",
      Color_Equipo: "Color",
      Tamano_Papel_Equipo: "A4, Carta, Legal, Oficio",
      Velocidad_BN_Equipo: 25,
      Velocidad_Color_Equipo: 25,
      Velocidad_1ra_Pag_BN_Equipo: null,
      Velocidad_1ra_Pag_Color_Equipo: null,
      Capacidad_Bandeja1_Equipo: 250,
      Capacidad_Bypass_Equipo: null,
      Ciclo_Recomendado_Equipo: "8300 pág",
      Ciclo_Mensual_Equipo: null,
      Ciclo_Maximo_Equipo: null,
      Tipo_Pantalla_Equipo: "Táctil a color",
      Tamano_Pantalla_Equipo: "4.3 pulgadas",
      Memoria_RAM_Equipo: "512 MB",
      Procesador_Equipo: null,
      Disco_Duro_Equipo: null,
      Funciones_Equipo: "Imprimir, Copiar, Escanear, Fax",
      Conectividad_Equipo: "WiFi, WiFi Direct, Ethernet, USB",
      Duracion_Bateria_Equipo: null,
      Archivo_PDF_Equipo: null,
      Imagen_Equipo: "/images/equipos/multifuncional/WF-C5891.png",
      Descripcion_Equipo: "Esta multifuncional PrecisionCore Heat-Free optimiza su oficina con 25 ppm ISO, primera página rápida y menor intervención. Ahorre energía y maximice la productividad con un sistema de tinta de alta capacidad y soluciones de flujo de trabajo avanzadas.",
      Fecha_Carga_Equipo: null,
      Fecha_Registro_Equipo: null,
      Nombre_Marca: "Epson",
    },
  }

  return mockEquipos[id] || mockEquipos["WF-C5891"]
}
