"use client"

import { useState } from "react"
import { CheckCircle2, Star, Users, Award, Rocket } from "lucide-react"
import {
  peopleList,
  reconocimientosList,
  type Reconocimiento,
} from "@/lib/que-se-note-data"

function getFallbackImage(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=181810&color=C8F000&size=200&bold=true`
}

const CATEGORIES = [
  "Todos",
  "SE NOTÓ",
  "DESTACÓ",
  "DEJÓ HUELLA",
  "MARCÓ LA DIFERENCIA",
] as const

export default function QueSeNoteReconocimientosPage() {
  const [activeFilter, setActiveFilter] = useState<string>("Todos")

  const filteredList = reconocimientosList.filter(
    (rec) => activeFilter === "Todos" || rec.dimension === activeFilter
  )

  const getDimensionIcon = (dimension: string) => {
    switch (dimension) {
      case "DESTACÓ":
        return <Users size={16} />
      case "DEJÓ HUELLA":
        return <Award size={16} />
      case "MARCÓ LA DIFERENCIA":
        return <Rocket size={16} />
      default:
        return <Star size={16} />
    }
  }

  return (
    <section>
      <span className="kicker">Historial Global</span>
      <h1>
        Muro de los <br />
        <span>Reconocimientos.</span>
      </h1>
      <p className="subtitle">Conoce los últimos reconocimientos de nuestro grupo.</p>
      <p className="kickertxt">QUE SE NOTE</p>

      <div className="filters" id="filters-container">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat === "Todos"
              ? "Todos"
              : cat.charAt(0) + cat.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="feed-grid" id="feed-container">
        {filteredList.map((rec) => {
          const person = peopleList.find((p) => p.id === rec.destinatarioId)
          const personName = person ? person.nombre : "Colaborador Desconocido"
          const personRole = person
            ? `${person.cargo} · ${person.empresa}`
            : "Rol no definido"
          const personFoto = person ? person.foto : ""

          return (
            <article key={rec.id_reconocimiento} className="news-card">
              <div className="news-header">
                <div className="news-author-info">
                  <img
                    src={personFoto}
                    alt={personName}
                    className="news-avatar"
                    onError={(e) => {
                      const target = e.currentTarget
                      target.onerror = null
                      target.src = getFallbackImage(personName)
                    }}
                  />
                  <div className="news-meta">
                    <h3>{personName}</h3>
                    <span className="role">{personRole}</span>
                  </div>
                </div>
                <div className="news-date">{rec.fecha}</div>
              </div>

              <div className="news-body">
                <div className="news-competency">
                  <CheckCircle2 style={{ width: 14, height: 14, display: "inline-block", marginRight: 6 }} />
                  {rec.categoria}: {rec.competencia}
                </div>
                <p className="news-message">{rec.mensaje}</p>
              </div>

              <div className="news-footer">
                <div className="news-sender">
                  Reconocido por: <strong>{rec.remitente}</strong>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span className="news-dimension">{rec.dimension}</span>
                  <div className="news-dimension-icon">
                    {getDimensionIcon(rec.dimension)}
                  </div>
                </div>
              </div>
            </article>
          )
        })}

        {filteredList.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "var(--text-muted)",
              fontSize: "15px",
              marginTop: "40px",
            }}
          >
            No hay reconocimientos en esta categoría aún.
          </p>
        )}
      </div>
    </section>
  )
}

