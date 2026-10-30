"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronRight,
  X,
  Layers,
  Target,
  Check,
  ChevronDown,
} from "lucide-react"
import {
  peopleList,
  descripcionesCompetencias,
  type Person,
  type Competencia,
} from "@/lib/que-se-note-data"

function getFallbackImage(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=181810&color=C8F000&size=200&bold=true`
}

function CompetenciesGroup({ competencies }: { competencies: Competencia[] }) {
  const grouped = competencies.reduce<Record<string, string[]>>((acc, curr) => {
    if (!acc[curr.categoria]) acc[curr.categoria] = []
    acc[curr.categoria].push(curr.competencia)
    return acc
  }, {})

  return (
    <>
      {Object.entries(grouped).map(([categoria, items]) => (
        <div key={categoria} className="category-group">
          <div className="category-name">{categoria}</div>
          <div className="comp-list">
            {items.map((comp) => {
              const desc =
                descripcionesCompetencias[comp] ||
                "Comportamientos y habilidades esperadas para el correcto desempeño de esta competencia dentro del marco estratégico de la organización."
              return (
                <details key={comp} className="comp-details">
                  <summary className="comp-summary">
                    <Check size={16} className="icon-check" />
                    <span>{comp}</span>
                    <ChevronDown size={16} className="icon-chevron" />
                  </summary>
                  <div className="comp-desc">{desc}</div>
                </details>
              )
            })}
          </div>
        </div>
      ))}
    </>
  )
}

export default function QueSeNotePasaportesPage() {
  const [search, setSearch] = useState("")
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

  const filteredPeople = peopleList.filter((person) => {
    const term = search.toLowerCase().trim()
    if (!term) return true
    const searchString = `${person.nombre} ${person.area} ${person.empresa} ${person.cargo}`.toLowerCase()
    return searchString.includes(term)
  })

  const transversales = selectedPerson
    ? selectedPerson.competencias.filter((c) => c.tipo === "Transversales")
    : []
  const especificas = selectedPerson
    ? selectedPerson.competencias.filter((c) => c.tipo === "Específicas")
    : []

  return (
    <>
      <section>
        <span className="kicker">Directorio de talentos</span>
        <h1>PASAPORTES</h1>
        <p className="subtitle">
          Explora los perfiles de nuestros colaboradores. Haz clic en cualquier tarjeta para ver el detalle de sus competencias transversales y específicas.
        </p>

        <input
          type="text"
          className="search-bar"
          placeholder="Buscar por nombre, área, empresa o cargo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid-3" id="passports-grid">
          {filteredPeople.map((person) => (
            <div
              key={person.id}
              className="person-card"
              onClick={() => setSelectedPerson(person)}
            >
              <img
                src={person.foto}
                alt={person.nombre}
                className="avatar"
                onError={(e) => {
                  const target = e.currentTarget
                  target.onerror = null
                  target.src = getFallbackImage(person.nombre)
                }}
              />
              <div className="info">
                <h3>{person.nombre}</h3>
                <span className="role">
                  {person.cargo} · {person.area}
                </span>
                <span className="company">{person.empresa}</span>
              </div>
              <ChevronRight size={18} className="icon-arrow" />
            </div>
          ))}
          {filteredPeople.length === 0 && (
            <p style={{ color: "var(--text-muted)", gridColumn: "1 / -1", textAlign: "center", padding: "40px 0" }}>
              No se encontraron colaboradores con &quot;{search}&quot;.
            </p>
          )}
        </div>
      </section>

      {/* Ventana Modal de Perfil */}
      {selectedPerson && (
        <div
          className="modal-overlay active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedPerson(null)
          }}
        >
          <div className="modal-box">
            <button
              className="modal-close"
              onClick={() => setSelectedPerson(null)}
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>

            <div className="profile-header">
              <div className="decor-tl" />
              <div className="decor-br" />

              <div className="profile-left">
                <img
                  src={selectedPerson.foto}
                  alt={selectedPerson.nombre}
                  className="profile-photo"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.onerror = null
                    target.src = getFallbackImage(selectedPerson.nombre)
                  }}
                />
                <Link
                  href={`/que-se-note/quiero-reconocer?id=${selectedPerson.id}`}
                  className="btn-reconocer"
                >
                  RECONOCER
                </Link>
              </div>

              <div className="profile-right">
                <div className="profile-kicker">Pasaporte</div>
                <h2 className="profile-name">{selectedPerson.nombre}</h2>
                <div className="profile-role-area">
                  <span>{selectedPerson.area}</span> | <span>{selectedPerson.cargo}</span>
                </div>
                <div className="profile-company">{selectedPerson.empresa}</div>
              </div>
            </div>

            <div className="profile-body">
              <div>
                <div className="comp-section-title">
                  <Layers size={18} /> Competencias Transversales
                </div>
                <CompetenciesGroup competencies={transversales} />
              </div>
              <div>
                <div className="comp-section-title">
                  <Target size={18} /> Competencias Específicas
                </div>
                <CompetenciesGroup competencies={especificas} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

