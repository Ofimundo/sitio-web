"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import type { Equipo } from "@/lib/types"
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

const VOLUMENES = [
  "0 a 1.000 páginas",
  "1.000 a 3.000 páginas",
  "3.000 a 5.000 páginas",
  "5.000 a 10.000 páginas",
  "10.000 a 20.000 páginas",
  "Más de 20.000 páginas",
]

const PROPORCIONES = [
  "Solo blanco y negro",
  "Mayormente blanco y negro (poca cobertura color)",
  "Mixto (aprox. 50% color)",
  "Mayormente color",
]

const PLAZOS = ["12 meses", "24 meses", "36 meses", "48 meses", "60 meses"]

const TAMANOS_PAPEL = ["Carta", "Oficio", "A4", "A3", "Tabloide / otros"]

const FUNCIONES = [
  "Impresión",
  "Copiado",
  "Escaneo a correo / carpeta",
  "Fax",
  "Impresión desde móvil",
  "Grapado / terminación",
]

export default function CotizarMpsPage() {
  const params = useParams<{ id: string }>()

  const [equipo, setEquipo] = useState<Equipo | null>(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Paso 1 - necesidad operativa
  const [cantidadEquipos, setCantidadEquipos] = useState(1)
  const [plazoContrato, setPlazoContrato] = useState(PLAZOS[2])
  const [volumen, setVolumen] = useState(VOLUMENES[1])
  const [proporcion, setProporcion] = useState(PROPORCIONES[0])
  const [tamanoPapel, setTamanoPapel] = useState(TAMANOS_PAPEL[0])
  const [funciones, setFunciones] = useState<string[]>(["Impresión", "Copiado", "Escaneo a correo / carpeta"])
  const [ubicaciones, setUbicaciones] = useState(1)
  const [observaciones, setObservaciones] = useState("")

  // Paso 2 - contacto
  const [contacto, setContacto] = useState<ContactData>({ nombreCompleto: "", telefono: "", email: "", empresa: "" })

  useEffect(() => {
    let activo = true
    async function fetchEquipo() {
      try {
        const res = await fetch(`/api/equipos/${params.id}`)
        if (res.ok) {
          const json = await res.json()
          if (activo && json?.success && json?.data) setEquipo(json.data as Equipo)
        }
      } catch {
        // El formulario conserva su estado si el equipo no está disponible temporalmente.
      } finally {
        if (activo) setLoading(false)
      }
    }
    if (params.id) fetchEquipo()
    else setLoading(false)
    return () => {
      activo = false
    }
  }, [params.id])

  const toggleFuncion = (valor: string) => {
    setFunciones((prev) => (prev.includes(valor) ? prev.filter((item) => item !== valor) : [...prev, valor]))
  }

  const resetPaso1 = () => {
    setCantidadEquipos(1)
    setPlazoContrato(PLAZOS[2])
    setVolumen(VOLUMENES[1])
    setProporcion(PROPORCIONES[0])
    setTamanoPapel(TAMANOS_PAPEL[0])
    setFunciones(["Impresión", "Copiado", "Escaneo a correo / carpeta"])
    setUbicaciones(1)
    setObservaciones("")
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitError("")
    try {
      await sendQuotation({
        tipo: "mps",
        equipo_id: params.id,
        equipo_nombre: equipo?.Nombre_Equipo ?? "Servicio de impresión gestionada",
        cantidad_equipos: cantidadEquipos,
        plazo_contrato: plazoContrato,
        volumen_mensual: volumen,
        proporcion_color: proporcion,
        tamano_papel: tamanoPapel,
        funciones,
        numero_ubicaciones: ubicaciones,
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

  const nombreEquipo = equipo?.Nombre_Equipo ?? "Servicio de Impresión Gestionada"

  if (loading) {
    return (
      <>
        <Header />
        <main className="mx-auto flex min-h-[520px] max-w-7xl items-center justify-center px-4 pb-12 pt-36 md:pt-40">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-ofimundo-purple" />
        </main>
        <Footer />
      </>
    )
  }

  if (submitted) {
    return <SuccessMessage itemName={nombreEquipo} backHref="/catalogo" backLabel="Ver más equipos" />
  }

  return (
    <QuotationPage title="Cotiza tu Servicio de Impresión" description="Cuéntanos cómo imprime tu empresa y armamos un plan de arriendo con mantención e insumos ajustado a tu operación." step={step} detailHref={`/equipo/${params.id}`}>
      {/* Resumen del servicio */}
      <div className="flex items-start gap-4 rounded-2xl border-2 border-ofimundo-purple bg-white p-5 shadow-sm">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
          {equipo?.Imagen_Equipo ? (
            <Image src={equipo.Imagen_Equipo} alt={nombreEquipo} width={80} height={80} className="h-full w-full object-contain" />
          ) : (
            <svg aria-hidden="true" className="h-9 w-9 text-ofimundo-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2" /><path d="M8 21h8M12 17v4" strokeWidth="2" strokeLinecap="round" /></svg>
          )}
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-ofimundo-purple">Servicio seleccionado</p>
          <h2 className="mt-1 text-lg font-bold text-ofimundo-navy md:text-xl">{nombreEquipo} + Arriendo + Mantención</h2>
          {equipo?.Nombre_Marca && <span className="mt-2 inline-block rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-ofimundo-purple">{equipo.Nombre_Marca}</span>}
        </div>
      </div>

      {step === 1 && (
        <>
          <div className="rounded-2xl border-2 border-ofimundo-purple bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-2xl font-bold text-ofimundo-navy md:text-3xl">Tu necesidad de impresión</h2>
            <div className="grid gap-6">
              {/* Cantidad y plazo */}
              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  id="cantidad-help"
                  label="Cantidad de equipos"
                  help="Número aproximado de impresoras o multifuncionales que necesitas en arriendo."
                >
                  <input
                    id="cantidad"
                    type="number"
                    min={1}
                    max={200}
                    value={cantidadEquipos}
                    onChange={(event) => setCantidadEquipos(Math.max(1, Number(event.target.value) || 1))}
                    className={fieldClass}
                    aria-describedby="cantidad-help"
                  />
                </Field>

                <Field
                  id="plazo-help"
                  label="Plazo del contrato"
                  help="A mayor plazo, mejor es la cuota mensual. El servicio incluye mantención e insumos durante todo el contrato."
                >
                  <select
                    id="plazo"
                    value={plazoContrato}
                    onChange={(event) => setPlazoContrato(event.target.value)}
                    className={fieldClass}
                    aria-describedby="plazo-help"
                  >
                    {PLAZOS.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </Field>
              </div>

              {/* Volumen */}
              <Field
                id="volumen-help"
                label="Volumen mensual estimado (por equipo)"
                help="Cantidad de páginas que imprimes al mes. Si no lo sabes con exactitud, elige el rango más cercano; lo ajustamos en la propuesta."
              >
                <select
                  id="volumen"
                  value={volumen}
                  onChange={(event) => setVolumen(event.target.value)}
                  className={fieldClass}
                  aria-describedby="volumen-help"
                >
                  {VOLUMENES.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </Field>

              {/* Proporción color */}
              <Field
                id="proporcion-help"
                label="Proporción de color"
                help="La impresión en color tiene un costo por página distinto al blanco y negro; esto define el plan más conveniente."
              >
                <select
                  id="proporcion"
                  value={proporcion}
                  onChange={(event) => setProporcion(event.target.value)}
                  className={fieldClass}
                  aria-describedby="proporcion-help"
                >
                  {PROPORCIONES.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </Field>

              {/* Tamaño de papel */}
              <Field
                id="papel-help"
                label="Tamaño de papel principal"
                help="Selecciona el formato que más usas. Si necesitas A3 o tabloide, considera equipos con esa capacidad."
              >
                <select
                  id="papel"
                  value={tamanoPapel}
                  onChange={(event) => setTamanoPapel(event.target.value)}
                  className={fieldClass}
                  aria-describedby="papel-help"
                >
                  {TAMANOS_PAPEL.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </Field>

              {/* Funciones */}
              <div>
                <fieldset className="border-0 p-0">
                  <legend className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                    Funciones requeridas
                    <FieldHelp id="funciones-help">Marca las funciones que tu equipo de trabajo necesita en el día a día.</FieldHelp>
                  </legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {FUNCIONES.map((item) => {
                      const activo = funciones.includes(item)
                      return (
                        <label key={item} className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 bg-white p-3 transition ${activo ? "border-ofimundo-purple" : "border-gray-200 hover:border-gray-300"}`}>
                          <input type="checkbox" checked={activo} onChange={() => toggleFuncion(item)} className="h-4 w-4 shrink-0 accent-[#2e2096]" />
                          <span className="text-sm font-medium text-gray-800">{item}</span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
              </div>

              {/* Ubicaciones */}
              <Field
                id="ubicaciones-help"
                label="Número de ubicaciones / sucursales"
                help="Indica en cuántas direcciones se instalarán los equipos para planificar la logística y el soporte."
              >
                <input
                  id="ubicaciones"
                  type="number"
                  min={1}
                  max={100}
                  value={ubicaciones}
                  onChange={(event) => setUbicaciones(Math.max(1, Number(event.target.value) || 1))}
                  className={fieldClass}
                  aria-describedby="ubicaciones-help"
                />
              </Field>

              {/* Observaciones */}
              <Field
                id="observaciones-help"
                label="Observaciones (opcional)"
                help="Comparte cualquier detalle relevante de tu operación para afinar la propuesta."
              >
                <textarea
                  id="observaciones"
                  rows={3}
                  value={observaciones}
                  onChange={(event) => setObservaciones(event.target.value)}
                  placeholder="Direcciones de despacho, integraciones, requerimientos de seguridad, etc."
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