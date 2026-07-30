"use client"

import { useState } from "react"

export interface FiltrosDisponibles {
  tipos: string[]
  marcas: string[]
  tecnologias: string[]
  colores: string[]
  tamanosSala: string[]
  lineasSala: string[]
  areasAutomatizacion: string[]
  modalidadesAutomatizacion: string[]
}

export interface FiltrosActivos {
  tipos: string[]
  marca: string[]
  tecnologia: string[]
  color: string[]
  tamanosSala: string[]
  lineasSala: string[]
  areasAutomatizacion: string[]
  modalidadesAutomatizacion: string[]
}

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  filtros: FiltrosDisponibles
  filtrosActivos: FiltrosActivos
  onFiltroChange: (key: keyof FiltrosActivos, value: string) => void
  onLimpiarFiltros: () => void
}

const SALAS = "Salas colaborativas"
const AUTOMATIZACION = "Automatización"

export function FilterSidebar({ isOpen, onClose, filtros, filtrosActivos, onFiltroChange, onLimpiarFiltros }: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState(["tipos", "marca", "salas", "automatizaciones"])
  const incluyeSalas = filtrosActivos.tipos.includes(SALAS)
  const incluyeAutomatizaciones = filtrosActivos.tipos.includes(AUTOMATIZACION)
  const incluyeEquipos = filtrosActivos.tipos.some((tipo) => tipo !== SALAS && tipo !== AUTOMATIZACION)
  const filtrosCount = Object.values(filtrosActivos).reduce((total, valores) => total + valores.length, 0)
  const toggleSection = (section: string) => setOpenSections((actuales) => actuales.includes(section) ? actuales.filter((item) => item !== section) : [...actuales, section])

  return <aside className={`filter-sidebar ${isOpen ? "open" : ""}`}>
    <div className="sidebar-inner sticky top-0 flex max-h-screen w-[280px] flex-col bg-white">
      <div className="sidebar-header border-b border-gray-200 bg-gray-50 p-5">
        <div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-lg bg-ofimundo-purple text-white"><i className="fas fa-filter" /></div><div><h2 className="text-lg font-bold text-ofimundo-navy">Filtros</h2><p className="text-xs text-gray-500">Refina tu búsqueda</p></div></div><button onClick={onClose} aria-label="Cerrar filtros" className="flex size-8 items-center justify-center rounded-lg bg-white text-gray-500 shadow-sm transition hover:text-ofimundo-magenta"><i className="fas fa-times" /></button></div>
      </div>
      {filtrosCount > 0 && <div className="border-b border-gray-200 bg-yellow-50 p-3 text-xs font-semibold text-ofimundo-navy">{filtrosCount} filtros activos</div>}
      <div className="min-h-0 overflow-y-auto">
        <FilterSection title="Tipo de Servicio" isOpen={openSections.includes("tipos")} onToggle={() => toggleSection("tipos")}>{filtros.tipos.map((tipo) => <FilterCheckbox key={tipo} label={tipo} checked={filtrosActivos.tipos.includes(tipo)} onChange={() => onFiltroChange("tipos", tipo)} />)}</FilterSection>
        {incluyeEquipos && <><FilterSection title="Marca" isOpen={openSections.includes("marca")} onToggle={() => toggleSection("marca")}>{filtros.marcas.length ? filtros.marcas.map((marca) => <FilterCheckbox key={marca} label={marca} checked={filtrosActivos.marca.includes(marca)} onChange={() => onFiltroChange("marca", marca)} />) : <FilterEmpty />}</FilterSection><FilterSection title="Tecnología" isOpen={openSections.includes("tecnologia")} onToggle={() => toggleSection("tecnologia")}>{filtros.tecnologias.length ? filtros.tecnologias.map((tecnologia) => <FilterCheckbox key={tecnologia} label={tecnologia} checked={filtrosActivos.tecnologia.includes(tecnologia)} onChange={() => onFiltroChange("tecnologia", tecnologia)} />) : <FilterEmpty />}</FilterSection><FilterSection title="Color" isOpen={openSections.includes("color")} onToggle={() => toggleSection("color")}>{filtros.colores.length ? filtros.colores.map((color) => <FilterCheckbox key={color} label={color} checked={filtrosActivos.color.includes(color)} onChange={() => onFiltroChange("color", color)} />) : <FilterEmpty />}</FilterSection></>}
        {incluyeSalas && <FilterSection title="Características de la sala" isOpen={openSections.includes("salas")} onToggle={() => toggleSection("salas")}><FilterGroup title="Tamaño">{filtros.tamanosSala.map((tamano) => <FilterCheckbox key={tamano} label={tamano} checked={filtrosActivos.tamanosSala.includes(tamano)} onChange={() => onFiltroChange("tamanosSala", tamano)} />)}</FilterGroup><FilterGroup title="Línea">{filtros.lineasSala.map((linea) => <FilterCheckbox key={linea} label={linea} checked={filtrosActivos.lineasSala.includes(linea)} onChange={() => onFiltroChange("lineasSala", linea)} />)}</FilterGroup></FilterSection>}
        {incluyeAutomatizaciones && <FilterSection title="Características de automatización" isOpen={openSections.includes("automatizaciones")} onToggle={() => toggleSection("automatizaciones")}><FilterGroup title="Área de negocio">{filtros.areasAutomatizacion.map((area) => <FilterCheckbox key={area} label={area} checked={filtrosActivos.areasAutomatizacion.includes(area)} onChange={() => onFiltroChange("areasAutomatizacion", area)} />)}</FilterGroup><FilterGroup title="Modalidad">{filtros.modalidadesAutomatizacion.map((modalidad) => <FilterCheckbox key={modalidad} label={modalidad} checked={filtrosActivos.modalidadesAutomatizacion.includes(modalidad)} onChange={() => onFiltroChange("modalidadesAutomatizacion", modalidad)} />)}</FilterGroup></FilterSection>}
      </div>
      <div className="flex shrink-0 gap-3 border-t border-gray-200 bg-white p-4"><button onClick={onLimpiarFiltros} className="flex-1 rounded-lg border border-gray-200 bg-white py-3 font-semibold text-gray-600 transition hover:border-ofimundo-magenta hover:text-ofimundo-magenta">Limpiar</button><button onClick={onClose} className="flex-1 rounded-lg bg-ofimundo-purple py-3 font-semibold text-white transition hover:bg-ofimundo-magenta">Aplicar</button></div>
    </div>
  </aside>
}

function FilterSection({ title, isOpen, onToggle, children }: { title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }) { return <div className="filter-section border-b border-gray-100"><button onClick={onToggle} className="filter-section-header w-full text-left"><span className="text-sm font-semibold text-gray-700">{title}</span><i className={`fas fa-chevron-down text-xs text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} /></button><div className={`overflow-hidden transition-all ${isOpen ? "max-h-[620px]" : "max-h-0"}`}>{children}</div></div> }
function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) { return <div><p className="px-5 pb-2 pt-4 text-xs font-bold uppercase tracking-wider text-gray-500">{title}</p>{children}</div> }
function FilterEmpty() { return <p className="px-5 py-4 text-sm text-gray-500">No hay opciones disponibles para esta selección.</p> }
function FilterCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) { return <label className="filter-checkbox"><input type="checkbox" checked={checked} onChange={onChange} className="sr-only" /><span className={`flex size-[18px] items-center justify-center rounded border-2 transition ${checked ? "border-ofimundo-purple bg-ofimundo-purple" : "border-gray-300"}`}>{checked && <i className="fas fa-check text-[10px] text-white" />}</span><span className="text-sm text-gray-600">{label}</span></label> }
