import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { HeroSection } from "@/components/HeroSection"
import { SolucionesSection } from "@/components/SolucionesSection"
import { PartnersSection } from "@/components/PartnersSection"
import { CategoriaSection } from "@/components/CategoriaSection"
import { SalasSection } from "@/components/SalasSection"
import { AutomatizacionesSection } from "@/components/AutomatizacionesSection"
import { getEquipos } from "@/lib/data"
import { getSalasDestacadas } from "@/lib/salas"
import type { Equipo, Sala } from "@/lib/types"

export default async function HomePage() {
  // Obtener equipos destacados por categoría
  let multifuncionales: Equipo[] = []
  let impresoras: Equipo[] = []
  let salasDestacadas: Sala[] = []

  // Cada bloque se resuelve de forma independiente: una falla en equipos no debe
  // ocultar las salas destacadas (ni viceversa) en la página de inicio.
  const [multiResult, impResult, salasResult] = await Promise.allSettled([
    getEquipos({ tipo: "Multifuncional", limit: 6 }),
    getEquipos({ tipo: "Impresora", limit: 6 }),
    getSalasDestacadas(),
  ])

  if (multiResult.status === "fulfilled") multifuncionales = multiResult.value.equipos
  if (impResult.status === "fulfilled") impresoras = impResult.value.equipos
  if (salasResult.status === "fulfilled") salasDestacadas = salasResult.value

  if (multiResult.status === "rejected") console.error("Error cargando multifuncionales:", multiResult.reason)
  if (impResult.status === "rejected") console.error("Error cargando impresoras:", impResult.reason)
  if (salasResult.status === "rejected") console.error("Error cargando salas destacadas:", salasResult.reason)

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Nuestras Soluciones */}
      <SolucionesSection />

      {/* Automatizaciones para procesos de negocio */}
      <AutomatizacionesSection />

      {/* Soluciones completas para espacios de colaboración */}
      <SalasSection salas={salasDestacadas} />

      {/* Categoría Multifuncional */}
      <CategoriaSection
        titulo="Categoría Multifuncional"
        subtitulo="Explora nuestras categorías principales"
        equipos={multifuncionales}
        verMasLink="/catalogo?tipo=Multifuncional"
      />

      {/* Partners Section */}
      <PartnersSection />

      {/* Categoría Impresoras */}
      <CategoriaSection
        titulo="Categoría Impresoras"
        subtitulo="Más opciones para tu negocio"
        equipos={impresoras}
        verMasLink="/catalogo?tipo=Impresora"
      />

      <Footer />
    </main>
  )
}
