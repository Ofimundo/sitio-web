"use client"

import { FormEvent, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { notFound } from "next/navigation"
import { AGENDA_URL } from "@/components/AutomatizacionCard"
import { ContactStep, FieldHelp, QuotationPage, SubmissionError, SuccessMessage, fieldClass, sendQuotation, type ContactData } from "@/components/QuotationForm"
import { obtenerAutomatizacionPorSlug } from "@/lib/automatizaciones"

export default function CotizarAutomatizacionPage() {
  const { slug } = useParams<{ slug: string }>()
  const searchParams = useSearchParams()
  const item = obtenerAutomatizacionPorSlug(slug)
  const [step, setStep] = useState(1)
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [needs, setNeeds] = useState({ plan: searchParams.get("plan") ?? "", volumen: "", empresas: "", sistemas: "", personalizacion: "Por definir", plazo: "", observaciones: "" })
  const [contact, setContact] = useState<ContactData>({ nombreCompleto: "", telefono: "", email: "", empresa: "" })
  if (!item) notFound()
  const setNeed = (key: keyof typeof needs, value: string) => setNeeds((actual) => ({ ...actual, [key]: value }))
  const validStep1 = needs.plan && needs.volumen && needs.empresas && needs.sistemas && needs.plazo
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (step === 1) { if (validStep1) setStep(2); return }
    setSending(true)
    setSubmitError("")
    try {
      await sendQuotation({ tipo: "automatizacion", solucion: item.nombre, necesidades: needs, ...contact, fecha_solicitud: new Date().toISOString() })
      setSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "No pudimos enviar la cotización")
    } finally {
      setSending(false)
    }
  }

  if (submitted) return <SuccessMessage itemName={item.nombre} backHref="/catalogo?tipo=Automatización" backLabel="Volver al catálogo" />

  const selectedPlan = item.planes.find((plan) => plan.nombre === needs.plan)
  const contextualAside = selectedPlan ? <div className="rounded-2xl border-2 border-ofimundo-purple bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-ofimundo-magenta">Plan seleccionado</p><h2 className="mt-1 text-xl font-bold text-ofimundo-navy">{selectedPlan.nombre}</h2><p className="mt-3 text-sm leading-relaxed text-gray-600">{selectedPlan.descripcion}</p><h3 className="mt-5 font-semibold text-ofimundo-navy">Incluye</h3><ul className="mt-2 flex flex-col gap-2 text-sm text-gray-600">{selectedPlan.incluye.map((item) => <li key={item}>• {item}</li>)}</ul></div> : undefined

  return <QuotationPage title={`Cotiza ${item.nombre}`} description="Cuéntanos cómo funciona hoy tu proceso para recomendarte el alcance y plan más adecuados." step={step} detailHref={`/automatizaciones/${slug}`} contextualAside={contextualAside}>
    <form onSubmit={submit} className="flex flex-col gap-6">{step === 1 ? <div className="rounded-2xl border-2 border-ofimundo-purple bg-white p-6 shadow-sm md:p-8"><div className="mb-6 flex items-start gap-4"><span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-ofimundo-purple text-white"><i className={`fas ${item.icono}`} /></span><div><p className="text-xs font-bold uppercase tracking-wider text-ofimundo-magenta">Automatización seleccionada</p><h2 className="mt-1 text-2xl font-bold text-ofimundo-navy">{item.nombre}</h2></div></div><div className="grid gap-6"><Field id="plan-help" label="¿Qué plan deseas cotizar? *" help="Si aún no estás seguro, selecciona Necesito asesoría y dimensionaremos la alternativa contigo."><select required aria-describedby="plan-help" value={needs.plan} onChange={(e) => setNeed("plan", e.target.value)} className={fieldClass}><option value="">Selecciona una opción</option>{item.planes.map((plan) => <option key={plan.nombre}>{plan.nombre}</option>)}<option>Necesito asesoría</option></select></Field><div className="grid gap-6 md:grid-cols-2"><Field id="volumen-help" label="Volumen mensual estimado *" help={`Puedes usar una referencia como ${item.metricas[0].toLocaleLowerCase()}.`}><input required aria-describedby="volumen-help" value={needs.volumen} onChange={(e) => setNeed("volumen", e.target.value)} placeholder="Ej. 800 documentos al mes" className={fieldClass} /></Field><Field id="empresas-help" label="Cantidad de empresas o RUT *" help="Permite dimensionar reglas, accesos e integraciones."><input required aria-describedby="empresas-help" value={needs.empresas} onChange={(e) => setNeed("empresas", e.target.value)} placeholder="Ej. 3 RUT" className={fieldClass} /></Field></div><Field id="sistemas-help" label="¿Qué sistemas debemos integrar? *" help={`Considera ERP, bancos, APIs u otros sistemas. Habituales: ${item.integraciones.slice(0, 3).join(", ")}.`}><input required aria-describedby="sistemas-help" value={needs.sistemas} onChange={(e) => setNeed("sistemas", e.target.value)} placeholder="Ej. SAP, banco y correo corporativo" className={fieldClass} /></Field><div className="grid gap-6 md:grid-cols-2"><Field id="personalizacion-help" label="Nivel de personalización" help="Indica si necesitas reglas, reportes o notificaciones propias."><select aria-describedby="personalizacion-help" value={needs.personalizacion} onChange={(e) => setNeed("personalizacion", e.target.value)} className={fieldClass}><option>Por definir</option><option>Configuración estándar</option><option>Reglas personalizadas</option><option>Integración y flujo a medida</option></select></Field><Field id="plazo-help" label="Plazo esperado *" help="Una referencia ayuda a organizar evaluación, integración y puesta en marcha."><select required aria-describedby="plazo-help" value={needs.plazo} onChange={(e) => setNeed("plazo", e.target.value)} className={fieldClass}><option value="">Selecciona un plazo</option><option>Lo antes posible</option><option>1 a 3 meses</option><option>3 a 6 meses</option><option>Más de 6 meses</option></select></Field></div><Field id="observaciones-help" label="Contexto u observaciones" help="Describe el proceso actual, sus dificultades y el resultado esperado."><textarea aria-describedby="observaciones-help" value={needs.observaciones} onChange={(e) => setNeed("observaciones", e.target.value)} rows={4} className={fieldClass} placeholder="Cuéntanos cómo realizan hoy este proceso..." /></Field></div></div> : <ContactStep data={contact} onChange={(field, value) => setContact((actual) => ({ ...actual, [field]: value }))} />}
      {submitError && <SubmissionError message={submitError} />}
      <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row">{step === 2 ? <button type="button" onClick={() => setStep(1)} className="rounded-lg border-2 border-gray-200 px-6 py-3 font-semibold text-gray-600">Volver</button> : <a href={AGENDA_URL} target="_blank" rel="noopener noreferrer" className="rounded-lg border-2 border-ofimundo-purple bg-white px-6 py-3 text-center font-semibold text-ofimundo-purple transition hover:bg-purple-50">Agendar Reunión</a>}<button type="submit" disabled={(step === 1 && !validStep1) || sending} className="rounded-lg bg-ofimundo-purple px-7 py-3 font-semibold text-white transition hover:bg-ofimundo-magenta disabled:cursor-not-allowed disabled:opacity-50">{step === 1 ? "Continuar" : sending ? "Enviando..." : "Enviar solicitud"}</button></div>
    </form>
  </QuotationPage>
}

function Field({ id, label, help, children }: { id: string; label: string; help: string; children: React.ReactNode }) { return <div><label className="mb-2 block text-sm font-semibold text-gray-700">{label}</label><FieldHelp id={id}>{help}</FieldHelp><div className="mt-3">{children}</div></div> }
