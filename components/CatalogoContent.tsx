"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import useSWR from "swr"
import { FilterSidebar, type FiltrosActivos, type FiltrosDisponibles } from "./FilterSidebar"
import { ProductCard } from "./ProductCard"
import { SalaCard } from "./SalaCard"
import { AutomatizacionCard } from "./AutomatizacionCard"
import { automatizaciones, categoriasAutomatizacion, modalidadesAutomatizacion } from "@/lib/automatizaciones"
import type { ApiResponse, Equipo, Sala } from "@/lib/types"

const SALAS = "Salas colaborativas"
const AUTOMATIZACION = "Automatización"
const tiposBase = ["Multifuncional", "Impresora", SALAS, AUTOMATIZACION]
const marcasBase = ["Epson", "Kyocera", "Xerox", "Lexmark", "Brother"]
const filtrosBase: FiltrosDisponibles = { tipos: tiposBase, marcas: marcasBase, tecnologias: [], colores: [], tamanosSala: ["Pequeña (S)", "Mediana (M)", "Grande (L)"], lineasSala: ["Business", "Essential", "Advanced"], areasAutomatizacion: categoriasAutomatizacion, modalidadesAutomatizacion }
const codigoTamano: Record<string, string> = { "Pequeña (S)": "S", "Mediana (M)": "M", "Grande (L)": "L" }
function valoresMultiples(searchParams: URLSearchParams, key: string) { return searchParams.getAll(key).flatMap((valor) => valor.split(",")).filter(Boolean) }
const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) throw new Error("No fue posible cargar las salas")
  return response.json()
}

export function CatalogoContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [equipos, setEquipos] = useState<Equipo[]>([])
  const [filtros, setFiltros] = useState<FiltrosDisponibles>(filtrosBase)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") ?? "")
  const [filtrosActivos, setFiltrosActivos] = useState<FiltrosActivos>({ tipos: valoresMultiples(searchParams, "tipo"), marca: valoresMultiples(searchParams, "marca"), tecnologia: valoresMultiples(searchParams, "tecnologia"), color: valoresMultiples(searchParams, "color"), tamanosSala: valoresMultiples(searchParams, "tamano"), lineasSala: valoresMultiples(searchParams, "linea"), areasAutomatizacion: valoresMultiples(searchParams, "area"), modalidadesAutomatizacion: valoresMultiples(searchParams, "modalidad") })

  const tiposEquipo = filtrosActivos.tipos.filter((tipo) => tipo !== SALAS && tipo !== AUTOMATIZACION)
  const claveTiposEquipo = tiposEquipo.join("|")
  const mostrarTodos = filtrosActivos.tipos.length === 0
  const mostrarSalas = mostrarTodos || filtrosActivos.tipos.includes(SALAS)
  const mostrarAutomatizaciones = mostrarTodos || filtrosActivos.tipos.includes(AUTOMATIZACION)
  const mostrarEquipos = mostrarTodos || tiposEquipo.length > 0
  const { data: salasResponse, isLoading: loadingSalas } = useSWR<ApiResponse<Sala[]>>(
    mostrarSalas ? "/api/salas" : null,
    fetcher,
  )
  const salasDisponibles = salasResponse?.success && Array.isArray(salasResponse.data) ? salasResponse.data : []

  const sincronizarUrl = useCallback((activos: FiltrosActivos, busqueda: string) => { const params = new URLSearchParams(); activos.tipos.forEach((v) => params.append("tipo", v)); activos.marca.forEach((v) => params.append("marca", v)); activos.tecnologia.forEach((v) => params.append("tecnologia", v)); activos.color.forEach((v) => params.append("color", v)); activos.tamanosSala.forEach((v) => params.append("tamano", v)); activos.lineasSala.forEach((v) => params.append("linea", v)); activos.areasAutomatizacion.forEach((v) => params.append("area", v)); activos.modalidadesAutomatizacion.forEach((v) => params.append("modalidad", v)); if (busqueda) params.set("search", busqueda); router.replace(`/catalogo${params.size ? `?${params.toString()}` : ""}`, { scroll: false }) }, [router])

  const cargarEquipos = useCallback(async () => { if (!mostrarEquipos) { setEquipos([]); setLoading(false); return } setLoading(true); try { const params = new URLSearchParams(); tiposEquipo.forEach((v) => params.append("tipo", v)); filtrosActivos.marca.forEach((v) => params.append("marca", v)); filtrosActivos.tecnologia.forEach((v) => params.append("tecnologia", v)); filtrosActivos.color.forEach((v) => params.append("color", v)); if (searchTerm) params.set("search", searchTerm); const respuesta = await fetch(`/api/equipos?${params.toString()}`); const data = await respuesta.json(); setEquipos(data.success && Array.isArray(data.data) ? data.data : []) } catch { setEquipos([]) } finally { setLoading(false) } }, [filtrosActivos.color, filtrosActivos.marca, filtrosActivos.tecnologia, mostrarEquipos, searchTerm, claveTiposEquipo])
  useEffect(() => { cargarEquipos() }, [cargarEquipos])
  useEffect(() => { const params = new URLSearchParams(); tiposEquipo.forEach((v) => params.append("tipo", v)); fetch(`/api/equipos/filtros?${params.toString()}`).then((r) => r.json()).then((data) => { if (!data.success || !data.data) return; setFiltros((actuales) => ({ ...filtrosBase, ...data.data, tipos: Array.from(new Set([...actuales.tipos, ...data.data.tipos, SALAS, AUTOMATIZACION])), marcas: Array.from(new Set([...marcasBase, ...actuales.marcas, ...data.data.marcas])).sort((a, b) => a.localeCompare(b, "es")) })) }).catch(() => undefined) }, [claveTiposEquipo])

  const salas = useMemo(() => mostrarSalas ? salasDisponibles.filter((sala) => { const tamano = filtrosActivos.tamanosSala.length === 0 || filtrosActivos.tamanosSala.some((v) => codigoTamano[v] === sala.Tamano); const linea = filtrosActivos.lineasSala.length === 0 || filtrosActivos.lineasSala.includes(sala.Linea); const termino = searchTerm.trim().toLocaleLowerCase("es-CL"); return tamano && linea && (!termino || `${sala.Nombre} ${sala.Titulo} ${sala.Descripcion}`.toLocaleLowerCase("es-CL").includes(termino)) }) : [], [filtrosActivos.lineasSala, filtrosActivos.tamanosSala, mostrarSalas, searchTerm, salasDisponibles])
  const automatizacionesFiltradas = useMemo(() => mostrarAutomatizaciones ? automatizaciones.filter((item) => { const area = filtrosActivos.areasAutomatizacion.length === 0 || filtrosActivos.areasAutomatizacion.includes(item.categoria); const modalidad = filtrosActivos.modalidadesAutomatizacion.length === 0 || filtrosActivos.modalidadesAutomatizacion.includes(item.modalidad); const termino = searchTerm.trim().toLocaleLowerCase("es-CL"); return area && modalidad && (!termino || `${item.nombre} ${item.resumen} ${item.categoria}`.toLocaleLowerCase("es-CL").includes(termino)) }) : [], [filtrosActivos.areasAutomatizacion, filtrosActivos.modalidadesAutomatizacion, mostrarAutomatizaciones, searchTerm])

  const handleFiltroChange = (key: keyof FiltrosActivos, value: string) => { const actuales = filtrosActivos[key]; const nuevos = actuales.includes(value) ? actuales.filter((item) => item !== value) : [...actuales, value]; let siguientes = { ...filtrosActivos, [key]: nuevos }; if (key === "tipos") { const tipos = siguientes.tipos; const equipos = tipos.some((tipo) => tipo !== SALAS && tipo !== AUTOMATIZACION); siguientes = { ...siguientes, marca: equipos ? siguientes.marca : [], tecnologia: equipos ? siguientes.tecnologia : [], color: equipos ? siguientes.color : [], tamanosSala: tipos.includes(SALAS) ? siguientes.tamanosSala : [], lineasSala: tipos.includes(SALAS) ? siguientes.lineasSala : [], areasAutomatizacion: tipos.includes(AUTOMATIZACION) ? siguientes.areasAutomatizacion : [], modalidadesAutomatizacion: tipos.includes(AUTOMATIZACION) ? siguientes.modalidadesAutomatizacion : [] } } setFiltrosActivos(siguientes); sincronizarUrl(siguientes, searchTerm) }
  const limpiar = () => { const vacios: FiltrosActivos = { tipos: [], marca: [], tecnologia: [], color: [], tamanosSala: [], lineasSala: [], areasAutomatizacion: [], modalidadesAutomatizacion: [] }; setFiltrosActivos(vacios); setSearchTerm(""); sincronizarUrl(vacios, "") }
  const total = equipos.length + salas.length + automatizacionesFiltradas.length

  return <div className="mx-auto max-w-[1400px] px-4 pb-16"><div className="flex gap-6"><FilterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} filtros={filtros} filtrosActivos={filtrosActivos} onFiltroChange={handleFiltroChange} onLimpiarFiltros={limpiar} /><div className="flex-1"><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-4">{!sidebarOpen && <button onClick={() => setSidebarOpen(true)} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 transition hover:border-ofimundo-purple"><i className="fas fa-filter text-ofimundo-purple" /><span className="text-sm font-medium">Filtros</span></button>}<span className="text-gray-600"><strong className="text-ofimundo-navy">{total}</strong> soluciones encontradas</span></div><div className="relative"><label htmlFor="catalog-search" className="sr-only">Buscar soluciones</label><input id="catalog-search" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); sincronizarUrl(filtrosActivos, e.target.value) }} placeholder="Buscar solución..." className="w-64 rounded-lg border border-gray-200 px-4 py-2 pl-10 focus:border-ofimundo-purple focus:outline-none" /><i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /></div></div>{(loading || loadingSalas) ? <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, i) => <div key={i} className="h-96 rounded-xl bg-white" />)}</div> : total === 0 ? <div className="rounded-xl bg-white py-16 text-center"><h3 className="mb-2 text-xl font-semibold text-gray-700">No se encontraron soluciones</h3><p className="mb-4 text-gray-500">Intenta ajustar los filtros de búsqueda.</p><button onClick={limpiar} className="rounded-lg bg-ofimundo-purple px-6 py-2 text-white">Limpiar filtros</button></div> : <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{equipos.map((item) => <ProductCard key={`equipo-${item.ID_Producto}`} equipo={item} />)}{salas.map((item) => <SalaCard key={`sala-${item.ID_Sala}`} sala={item} />)}{automatizacionesFiltradas.map((item) => <AutomatizacionCard key={`automatizacion-${item.slug}`} automatizacion={item} />)}</div>}</div></div></div>
}
