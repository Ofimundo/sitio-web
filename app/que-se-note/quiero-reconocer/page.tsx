"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
  Send,
  User,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { peopleList, type Person } from "@/lib/que-se-note-data"

function QuieroReconocerContent() {
  const searchParams = useSearchParams()

  const [remitenteId, setRemitenteId] = useState<number | null>(null)
  const [destinatarioId, setDestinatarioId] = useState<number | null>(null)
  const [competencia, setCompetencia] = useState("")
  const [accionExcepcional, setAccionExcepcional] = useState("")
  const [relacionCompetencia, setRelacionCompetencia] = useState("")
  const [impactoGenerado, setImpactoGenerado] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  // Handle URL query parameters (?id=X or ?persona=Y)
  useEffect(() => {
    const idParam = searchParams.get("id")
    const personaParam = searchParams.get("persona")

    if (idParam || personaParam) {
      const target = peopleList.find(
        (p) =>
          (idParam && p.id === parseInt(idParam)) ||
          (personaParam &&
            p.nombre.toLowerCase() === personaParam.toLowerCase())
      )
      if (target) {
        setDestinatarioId(target.id)
      }
    }
  }, [searchParams])

  const senderPerson = remitenteId
    ? peopleList.find((p) => p.id === remitenteId)
    : null
  const targetPerson = destinatarioId
    ? peopleList.find((p) => p.id === destinatarioId)
    : null

  // Reset competency if target person changes
  useEffect(() => {
    setCompetencia("")
  }, [destinatarioId])

  // Group competencies for the target person
  const groupedCompetencies = targetPerson
    ? targetPerson.competencias.reduce<Record<string, typeof targetPerson.competencias>>(
        (acc, curr) => {
          const groupKey = `${curr.tipo.toUpperCase()} — ${curr.categoria}`
          if (!acc[groupKey]) acc[groupKey] = []
          acc[groupKey].push(curr)
          return acc
        },
        {}
      )
    : {}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!senderPerson || !targetPerson || !competencia) {
      setStatus({
        type: "error",
        message: "Por favor selecciona el remitente, destinatario y competencia.",
      })
      return
    }

    setIsSubmitting(true)
    setStatus(null)

    const payload = {
      remitente: `${senderPerson.nombre} (${senderPerson.cargo} - ${senderPerson.empresa})`,
      destinatario: `${targetPerson.nombre} (${targetPerson.cargo} - ${targetPerson.empresa})`,
      competencia,
      accion_excepcional: accionExcepcional,
      relacion_competencia: relacionCompetencia,
      impacto_generado: impactoGenerado,
    }

    try {
      const res = await fetch("/api/que-se-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (res.ok && data.status >= 200 && data.status < 300) {
        setStatus({
          type: "success",
          message: data.message || "¡El reconocimiento ha sido enviado con éxito!",
        })
        setRemitenteId(null)
        setDestinatarioId(null)
        setCompetencia("")
        setAccionExcepcional("")
        setRelacionCompetencia("")
        setImpactoGenerado("")
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        throw new Error(
          data.error ||
            `El servidor respondió con código ${res.status}. Inténtalo nuevamente.`
        )
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Error al enviar"
      setStatus({ type: "error", message: msg })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section>
      <div className="form-wrapper">
        <span className="kicker">Plan de Reconocimiento</span>
        <h1>
          HAZ QUE <br />
          <span>SE NOTE.</span>
        </h1>
        <p className="form-intro">
          Completa el siguiente formulario para destacar las acciones, desempeños y conductas que generan valor en nuestro grupo.
        </p>

        {status && (
          <div
            className={`status-msg ${status.type}`}
            style={{ display: "flex" }}
          >
            {status.type === "success" ? (
              <CheckCircle2 size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            {/* 1. Me llamo... */}
            <div className="form-group">
              <label htmlFor="remitente">
                <span className="num">01.</span> Me llamo...
              </label>
              <span className="field-hint">Selecciona tu nombre de la lista.</span>
              <select
                id="remitente"
                name="remitente"
                required
                value={remitenteId ?? ""}
                onChange={(e) =>
                  setRemitenteId(e.target.value ? parseInt(e.target.value) : null)
                }
              >
                <option value="" disabled>
                  Selecciona tu nombre...
                </option>
                {peopleList.map((person) => (
                  <option
                    key={person.id}
                    value={person.id}
                    disabled={person.id === destinatarioId}
                  >
                    {person.nombre} — {person.area} ({person.empresa})
                  </option>
                ))}
              </select>
              {senderPerson && (
                <div className="selected-person-badge active">
                  <User size={14} /> {senderPerson.cargo} · {senderPerson.empresa}
                </div>
              )}
            </div>

            {/* 2. ¿A quién quieres reconocer? */}
            <div className="form-group">
              <label htmlFor="destinatario">
                <span className="num">02.</span> ¿A quién quieres reconocer?
              </label>
              <span className="field-hint">Selecciona al colaborador a reconocer.</span>
              <select
                id="destinatario"
                name="destinatario"
                required
                value={destinatarioId ?? ""}
                onChange={(e) =>
                  setDestinatarioId(e.target.value ? parseInt(e.target.value) : null)
                }
              >
                <option value="" disabled>
                  Selecciona un colaborador...
                </option>
                {peopleList.map((person) => (
                  <option
                    key={person.id}
                    value={person.id}
                    disabled={person.id === remitenteId}
                  >
                    {person.nombre} — {person.area} ({person.empresa})
                  </option>
                ))}
              </select>
              {targetPerson && (
                <div className="selected-person-badge active">
                  <UserCheck size={14} /> {targetPerson.cargo} · {targetPerson.area} · {targetPerson.empresa}
                </div>
              )}
            </div>
          </div>

          {/* 3. Competencia demostrada */}
          <div className="form-group">
            <label htmlFor="competencia">
              <span className="num">03.</span> Competencia demostrada
            </label>
            <span className="field-hint">
              ¿Qué competencia (transversal o específica de su rol) demostró principalmente esta persona?
            </span>
            <select
              id="competencia"
              name="competencia"
              required
              disabled={!targetPerson}
              value={competencia}
              onChange={(e) => setCompetencia(e.target.value)}
            >
              <option value="" disabled>
                {targetPerson
                  ? `Selecciona una competencia de ${targetPerson.nombre}...`
                  : "Primero selecciona a un colaborador en el paso 02..."}
              </option>
              {Object.entries(groupedCompetencies).map(([groupLabel, items]) => (
                <optgroup key={groupLabel} label={groupLabel}>
                  {items.map((item) => (
                    <option
                      key={item.id_competencia}
                      value={`[${item.tipo}] ${item.categoria}: ${item.competencia}`}
                    >
                      {item.competencia} ({item.categoria})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* 4. Acción excepcional */}
          <div className="form-group">
            <label htmlFor="accion_excepcional">
              <span className="num">04.</span> Acción excepcional
            </label>
            <span className="field-hint">
              Describe la acción concreta que quieres reconocer. Cuéntanos qué hizo la persona, en qué situación ocurrió y por qué su actuación fue excepcional. Evita descripciones generales como “es buena compañera” o “siempre ayuda”.
            </span>
            <textarea
              id="accion_excepcional"
              name="accion_excepcional"
              required
              placeholder="Detalla qué hizo, en qué contexto y por qué fue extraordinario..."
              value={accionExcepcional}
              onChange={(e) => setAccionExcepcional(e.target.value)}
            />
          </div>

          {/* 5. Relación con la competencia */}
          <div className="form-group">
            <label htmlFor="relacion_competencia">
              <span className="num">05.</span> Relación con la competencia
            </label>
            <span className="field-hint">
              ¿Cómo se relaciona esta acción con la competencia que seleccionaste? Explica qué conducta observable demuestra la competencia. No basta con mencionar nuevamente el nombre de la competencia.
            </span>
            <textarea
              id="relacion_competencia"
              name="relacion_competencia"
              required
              placeholder="Explica qué comportamiento concreto evidencia la competencia seleccionada..."
              value={relacionCompetencia}
              onChange={(e) => setRelacionCompetencia(e.target.value)}
            />
          </div>

          {/* 6. Impacto generado */}
          <div className="form-group">
            <label htmlFor="impacto_generado">
              <span className="num">06.</span> Impacto generado
            </label>
            <span className="field-hint">
              ¿Qué impacto produjo esta acción? Ejemplo: Ayudó a resolver un problema relevante, mejoró la experiencia de un cliente, etc.
            </span>
            <textarea
              id="impacto_generado"
              name="impacto_generado"
              required
              placeholder="Describe el resultado o valor que aportó al equipo, cliente o empresa..."
              value={impactoGenerado}
              onChange={(e) => setImpactoGenerado(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Enviando reconocimiento...
              </>
            ) : (
              <>
                <Send size={18} /> Enviar Reconocimiento
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}

export default function QueSeNoteQuieroReconocerPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "100px", textAlign: "center", color: "var(--lime)" }}>
          Cargando formulario...
        </div>
      }
    >
      <QuieroReconocerContent />
    </Suspense>
  )
}

