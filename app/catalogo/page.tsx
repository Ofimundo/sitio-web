import { Suspense } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { CatalogoContent } from "@/components/CatalogoContent"

export const metadata = {
  title: "Catálogo de Soluciones - Ofimundo",
  description: "Explora equipos de oficina y soluciones completas de salas colaborativas para empresas.",
}

export default function CatalogoPage() {
  return (
    <main className="min-h-screen bg-muted">
      <Header />
      <div className="px-4 pb-8 pt-36 md:pt-40">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Soluciones para tu empresa</p>
          <h1 className="text-balance text-4xl font-bold text-foreground md:text-6xl">Catálogo Ofimundo</h1>
          <p className="max-w-3xl text-pretty text-lg text-muted-foreground">Encuentra equipos individuales o una sala colaborativa completa y lista para implementar.</p>
        </div>
      </div>
      <Suspense fallback={<CatalogoSkeleton />}><CatalogoContent /></Suspense>
      <Footer />
    </main>
  )
}

function CatalogoSkeleton() {
  return <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-16 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, indice) => <div key={indice} className="h-96 rounded-xl bg-background" />)}</div>
}
