import Link from "next/link"
import { getSalas } from "@/lib/salas"
import { SalaCard } from "./SalaCard"

const tamanos = [
  { valor: "", etiqueta: "Todos" },
  { valor: "S", etiqueta: "Pequeña" },
  { valor: "M", etiqueta: "Mediana" },
  { valor: "L", etiqueta: "Grande" },
]

function enlaceFiltro(tamano: string, linea?: string) {
  const params = new URLSearchParams({ vista: "salas" })
  if (tamano) params.set("tamano", tamano)
  if (linea) params.set("linea", linea)
  return `/catalogo?${params.toString()}`
}

export async function SalasCatalogo({ tamano, linea }: { tamano?: string; linea?: string }) {
  const salas = await getSalas({ tamano, linea })

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-muted-foreground">Filtrar por tamaño de sala</p>
            <div className="flex flex-wrap gap-2" aria-label="Filtros por tamaño">
              {tamanos.map((item) => (
                <Link key={item.valor || "todos"} href={enlaceFiltro(item.valor, linea)} aria-current={(tamano || "") === item.valor ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${(tamano || "") === item.valor ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"}`}>{item.etiqueta}</Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-muted-foreground">Línea de solución</p>
            <div className="flex flex-wrap gap-2">
              {["Business", "Essential", "Advanced"].map((item) => <Link key={item} href={enlaceFiltro(tamano || "", linea === item ? undefined : item)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${linea === item ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary"}`}>{item}</Link>)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-muted-foreground"><strong className="text-foreground">{salas.length}</strong> soluciones encontradas</p>
        {(tamano || linea) && <Link href="/catalogo?vista=salas" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">Limpiar filtros</Link>}
      </div>

      {salas.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">{salas.map((sala) => <SalaCard key={sala.ID_Sala} sala={sala} />)}</div>
      ) : (
        <div className="rounded-2xl border border-border bg-background px-6 py-16 text-center">
          <h2 className="text-xl font-bold text-foreground">No encontramos salas con esos filtros</h2>
          <p className="mt-2 text-muted-foreground">Prueba con otro tamaño o línea de solución.</p>
        </div>
      )}
    </div>
  )
}
