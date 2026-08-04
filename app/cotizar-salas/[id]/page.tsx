"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import type { Sala, SalaComplemento } from "@/lib/types"
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
  const [opcion, setOpcion] = useState("")
  const [cantidadSalas, setCantidadSalas] = useState(1)
  const [plazo, setPlazo] = useState(PLAZOS[1])
  const [uso, setUso] = useState(USOS[0])
  const [tieneComplementos, setTieneComplementos] = useState(false)
  const [complementos, setComplementos] = useState<string[]>([])
  const [observaciones, setObservaciones] = useState("")

  // Paso 2 - contacto
  const [contacto, setContacto] = useState<ContactData>({ nombreCompleto: "", telefono: "", email: "", empresa: "" })

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

  const listaComplementos: SalaComplemento[] = useMemo(() => sala?.Complementos ?? [], [sala])
  const opciones = useMemo(() => sala?.Opciones ?? [], [sala])

  const toggleComplemento = (nombre: string) => {
    setComplementos((prev) => (prev.includes(nombre) ? prev.filter((item) => item !== nombre) : [...prev, nombre]))
  }

  const resetPaso1 = () => {
    setOpcion("")
    setCantidadSalas(1)
    setPlazo(PLAZOS[1])
    setUso(USOS[0])
    setTieneComplementos(false)
    setComplementos([])
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
        opcion_configuracion: opcion || "Necesito asesoría",
        cantidad_salas: cantidadSalas,
        plazo,
        uso_principal: uso,
        complementos: tieneComplementos ? complementos : [],
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

  const opcionSeleccionada = opciones.find((item) => opcion.startsWith(item.Codigo))
  const complementosSeleccionados = listaComplementos.filter((item) => complementos.includes(item.Nombre_Equipo))
  const contextualAside = (opcionSeleccionada || complementosSeleccionados.length > 0) ? (
    <div className="rounded-2xl border-2 border-ofimundo-purple bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-ofimundo-navy">Tu selección</h2>
      {opcionSeleccionada && <div className="mt-4"><p className="font-semibold text-ofimundo-purple">Opción {opcionSeleccionada.Codigo}</p><ul className="mt-2 flex flex-col gap-2 text-sm text-gray-600">{opcionSeleccionada.Equipos.map((equipo) => <li key={equipo.ID_Producto}><strong>{equipo.Nombre_Marca} {equipo.Nombre_Equipo}</strong><span className="block">{equipo.Descripcion}</span></li>)}</ul></div>}
      {complementosSeleccionados.length > 0 && <div className="mt-5"><p className="font-semibold text-ofimundo-purple">Complementos</p><ul className="mt-2 flex flex-col gap-2 text-sm text-gray-600">{complementosSeleccionados.map((item) => <li key={item.ID_Producto}><strong>{item.Nombre_Equipo}</strong>{item.Categoria && <span className="block">{item.Categoria}</span>}</li>)}</ul></div>}
    </div>
  ) : undefined

  return (
    <QuotationPage title="Cotiza tu Sala Colaborativa" description="Cuéntanos cómo usarás el espacio y qué necesitas integrar. Con esa información preparamos una propuesta a tu medida." step={step} detailHref={`/salas/${sala?.Slug || params.id}`} contextualAside={contextualAside}>
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
              {/* Opción de configuración */}
              <Field
                id="opcion-help"
                label="Opción de configuración a cotizar"
                help="Cada sala ofrece configuraciones predefinidas (A y B) según equipamiento. Si no estás seguro, elige asesoría y un especialista te recomendará la más adecuada."
              >
                <select
                  id="opcion"
                  value={opcion}
                  onChange={(event) => setOpcion(event.target.value)}
                  className={fieldClass}
                  aria-describedby="opcion-help"
                >
                  <option value="">Necesito asesoría para elegir</option>
                  {opciones.map((op) => (
                    <option key={op.ID_Opcion} value={`${op.Codigo} - ${op.Nombre}`}>{`Opción ${op.Codigo}`}</option>
                  ))}
                  {opciones.length === 0 && (
                    <>
                      <option value="A">Opción A</option>
                      <option value="B">Opción B</option>
                    </>
                  )}
                </select>
              </Field>

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

              {/* Complementos */}
              <div className="rounded-xl border-2 border-gray-100 bg-gray-50/60 p-5">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={tieneComplementos}
                    onChange={(event) => setTieneComplementos(event.target.checked)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-[#2e2096]"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-gray-800">Quiero agregar equipos complementarios</span>
                    <span className="mt-1 block text-sm leading-relaxed text-gray-500">Selecciona accesorios o equipos adicionales para incluirlos en la conversación de tu cotización.</span>
                  </span>
                </label>

                {tieneComplementos && (
                  <fieldset className="mt-4 border-0 p-0">
                    <legend className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                      Complementos disponibles
                      <FieldHelp id="complementos-help">Los complementos seleccionados se revisarán técnica y comercialmente; podrían ajustarse según la configuración final de la sala.</FieldHelp>
                    </legend>
                    {listaComplementos.length > 0 ? (
                      <div className="grid gap-2 sm:grid-cols-2">
                        {listaComplementos.map((comp) => {
                          const nombre = comp.Nombre_Equipo
                          const activo = complementos.includes(nombre)
                          return (
                            <label key={comp.ID_Producto} className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 bg-white p-3 transition ${activo ? "border-ofimundo-purple" : "border-gray-200 hover:border-gray-300"}`}>
                              <input type="checkbox" checked={activo} onChange={() => toggleComplemento(nombre)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#2e2096]" />
                              <span>
                                <span className="block text-sm font-medium text-gray-800">{nombre}</span>
                                {comp.Categoria && <span className="mt-0.5 block text-xs text-gray-500">{comp.Categoria}</span>}
                              </span>
                            </label>
                          )
                        })}
                      </div>
                    ) : (
                      <p className="rounded-lg border-2 border-dashed border-gray-200 bg-white p-4 text-sm leading-relaxed text-gray-500">Aún no hay complementos cargados para esta sala. Descríbelos en observaciones y un asesor los cotizará contigo.</p>
                    )}
                  </fieldset>
                )}
              </div>

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

          <div className="flex justify-end gap-4">
            <button type="button" onClick={resetPaso1} className="rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:border-gray-400 md:px-8 md:py-4">Limpiar</button>
            <button type="button" onClick={() => setStep(2)} className="rounded-lg bg-ofimundo-navy px-8 py-3 font-semibold text-white shadow-lg transition hover:opacity-90 md:px-12 md:py-4">Siguiente</button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <ContactStep data={contacto} onChange={(field, value) => setContacto((prev) => ({ ...prev, [field]: value }))} />
          {submitError && <SubmissionError message={submitError} />}
          <div className="flex justify-end gap-4">
            <button type="button" onClick={() => setStep(1)} className="rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:border-gray-400 md:px-8 md:py-4">Volver</button>
            <button type="button" onClick={handleSubmit} disabled={submitting || !contacto.nombreCompleto || !contacto.telefono || !contacto.email || !contacto.empresa} className="flex items-center gap-2 rounded-lg bg-ofimundo-navy px-8 py-3 font-semibold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:px-12 md:py-4">
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