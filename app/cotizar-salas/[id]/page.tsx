"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import type { Sala } from "@/lib/types"
import {
  ContactData,
  ContactStep,
  FieldHelp,
  QuotationPage,
  SubmissionError,
  SuccessMessage,
  fieldClass,
  sendQuotation,
} from "@/components/QuotationForm"

// ─────────────────────────────────────────────
//  Tipos auxiliares
// ─────────────────────────────────────────────

interface FieldProps {
  id: string
  label: string
  help: string
  children: React.ReactNode
}

// ─────────────────────────────────────────────
//  Subcomponente: Campo de formulario con ayuda
// ─────────────────────────────────────────────

function Field({ id, label, help, children }: FieldProps) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
        {label}
        <FieldHelp id={id}>{help}</FieldHelp>
      </label>
      <div className="mt-3">{children}</div>
    </div>
  )
}

const USOS = [
  "Videoconferencia y reuniones híbridas",
  "Capacitaciones y salas de formación",
  "Directorio o sala de gerencia",
  "Espacio multiuso / coworking",
]

const PLAZOS = [
  "Lo antes posible",
  "Dentro de 30 días",
  "En 1 a 3 meses",
  "Solo estoy cotizando referencialmente",
]

export default function CotizarSalasPage() {
  const params = useParams<{ id: string }>()

  const [sala, setSala] = useState<Sala | null>(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Paso 1 - configuración de la sala
  const [cantidadSalas, setCantidadSalas] = useState(1)
  const [plazo, setPlazo] = useState(PLAZOS[1])
  const [uso, setUso] = useState(USOS[0])
  const [observaciones, setObservaciones] = useState("")

  // Paso 2 - contacto
  const [contacto, setContacto] = useState<ContactData>({ nombreCompleto: "", telefono: "", email: "", empresa: "", rutEmpresa: "" })

  useEffect(() => {
    let activo = true
    async function fetchSala() {
      try {
        const res = await fetch(`/api/salas/${params.id}`)
        if (res.ok) {
          const json = await res.json()
          if (activo && json?.success && json?.data) setSala(json.data as Sala)
        }
      } catch {
        // El formulario sigue disponible mientras se conecta la fuente definitiva de salas.
      } finally {
        if (activo) setLoading(false)
      }
    }
    if (params.id) fetchSala()
    else setLoading(false)
    return () => {
      activo = false
    }
  }, [params.id])

  // Nombre e info visibles aunque la fuente de datos de salas aún no esté conectada.
  const nombreSala = sala?.Nombre || "Sala Colaborativa"
  const lineaSala = sala?.Linea || ""
  const tamanoSala = sala?.Tamano || ""
  const imagenSala = sala?.Imagen_Principal || null

  const resetPaso1 = () => {
    setCantidadSalas(1)
    setPlazo(PLAZOS[1])
    setUso(USOS[0])
    setObservaciones("")
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitError("")
    try {
      await sendQuotation({
        tipo: "sala",
        sala_id: params.id,
        sala_nombre: nombreSala,
        cantidad_salas: cantidadSalas,
        plazo,
        uso_principal: uso,
        observaciones,
        ...contacto,
        fecha_solicitud: new Date().toISOString(),
      })
      setSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "No pudimos enviar la cotización")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return <SuccessMessage itemName={nombreSala} backHref="/catalogo?tipo=Salas+colaborativas" backLabel="Ver más salas" />
  }

  return (
    <QuotationPage title="Cotiza tu Sala Colaborativa" description="Cuéntanos cómo usarás el espacio y qué necesitas integrar. Con esa información preparamos una propuesta a tu medida." step={step} detailHref={`/salas/${sala?.Slug || params.id}`}>
      {/* Resumen de la sala seleccionada */}
      <div className="flex items-start gap-4 rounded-2xl border-2 border-ofimundo-purple bg-white p-5 shadow-sm">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
          {imagenSala ? (
            <Image src={imagenSala} alt={nombreSala} width={80} height={80} className="h-full w-full object-contain" />
          ) : (
            <svg aria-hidden="true" className="h-9 w-9 text-ofimundo-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2" strokeWidth="2" /><path d="M8 20h8M12 16v4" strokeWidth="2" strokeLinecap="round" /></svg>
          )}
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-ofimundo-purple">Sala seleccionada</p>
          <h2 className="mt-1 text-lg font-bold text-ofimundo-navy md:text-xl">{nombreSala}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {lineaSala && <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-ofimundo-purple">Línea {lineaSala}</span>}
            {tamanoSala && <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-ofimundo-purple">Tamaño {tamanoSala}</span>}
          </div>
        </div>
      </div>

      {step === 1 && (
        <>
          <div className="rounded-2xl border-2 border-ofimundo-purple bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-2xl font-bold text-ofimundo-navy md:text-3xl">Configura tu solución</h2>
            <div className="grid gap-6">
              {/* Cantidad y plazo */}
              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  id="cantidad-help"
                  label="Cantidad de salas a implementar"
                  help="Indica cuántos espacios equiparás con esta misma solución para calcular volumen y logística de instalación."
                >
                  <input
                    id="cantidad"
                    type="number"
                    min={1}
                    max={50}
                    value={cantidadSalas}
                    onChange={(event) => setCantidadSalas(Math.max(1, Number(event.target.value) || 1))}
                    className={fieldClass}
                    aria-describedby="cantidad-help"
                  />
                </Field>

                <Field
                  id="plazo-help"
                  label="Plazo estimado"
                  help="Nos ayuda a priorizar la disponibilidad de equipos y coordinar la visita técnica."
                >
                  <select
                    id="plazo"
                    value={plazo}
                    onChange={(event) => setPlazo(event.target.value)}
                    className={fieldClass}
                    aria-describedby="plazo-help"
                  >
                    {PLAZOS.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </Field>
              </div>

              {/* Uso principal */}
              <Field
                id="uso-help"
                label="Uso principal del espacio"
                help="El uso determina el tipo de pantalla, audio y cámara recomendados para lograr la mejor experiencia."
              >
                <select
                  id="uso"
                  value={uso}
                  onChange={(event) => setUso(event.target.value)}
                  className={fieldClass}
                  aria-describedby="uso-help"
                >
                  {USOS.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </Field>


              {/* Observaciones */}
              <Field
                id="observaciones-help"
                label="Observaciones (opcional)"
                help="Cualquier detalle del espacio o de tu operación nos ayuda a ajustar la propuesta a tu realidad."
              >
                <textarea
                  id="observaciones"
                  rows={3}
                  value={observaciones}
                  onChange={(event) => setObservaciones(event.target.value)}
                  placeholder="Dimensiones del espacio, requerimientos especiales, integraciones existentes, etc."
                  className={`${fieldClass} resize-none`}
                  aria-describedby="observaciones-help"
                />
              </Field>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
            <button type="button" onClick={resetPaso1} className="w-full sm:w-auto rounded-lg border-2 border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition hover:border-gray-400 md:px-8 md:py-4">Limpiar</button>
            <button type="button" onClick={() => setStep(2)} className="w-full sm:w-auto rounded-lg bg-ofimundo-navy px-8 py-3 text-center font-semibold text-white shadow-lg transition hover:opacity-90 md:px-12 md:py-4">Siguiente</button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <ContactStep data={contacto} onChange={(field, value) => setContacto((prev) => ({ ...prev, [field]: value }))} />
          {submitError && <SubmissionError message={submitError} />}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
            <button type="button" onClick={() => setStep(1)} className="w-full sm:w-auto rounded-lg border-2 border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition hover:border-gray-400 md:px-8 md:py-4">Volver</button>
            <button type="button" onClick={handleSubmit} disabled={submitting || !contacto.nombreCompleto || !contacto.telefono || !contacto.email || !contacto.empresa || !contacto.rutEmpresa} className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-ofimundo-navy px-8 py-3 text-center font-semibold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:px-12 md:py-4">
              {submitting ? (
                <>
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4Z" /></svg>
                  Enviando...
                </>
              ) : "Enviar solicitud"}
            </button>
          </div>
        </>
      )}
    </QuotationPage>
  )
}