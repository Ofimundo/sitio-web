"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

export const fieldClass = "w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-900 transition focus:border-ofimundo-purple focus:outline-none focus:ring-2 focus:ring-[#2e2096]/30"

export function FieldHelp({ id, children }: { id: string; children: ReactNode }) {
  return (
    <details className="group relative mt-2 w-fit">
      <summary
        aria-label="Ver ayuda para este campo"
        className="flex cursor-pointer list-none items-center gap-1.5 text-xs font-semibold text-ofimundo-purple marker:hidden hover:text-ofimundo-magenta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofimundo-purple"
      >
        <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="9" strokeWidth="2" />
          <path d="M12 11v5m0-8h.01" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </summary>
      <div id={id} role="note" className="quotation-help-popover absolute left-0 z-30 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-4 text-sm font-normal leading-relaxed text-gray-600 shadow-xl">
        {children}
      </div>
    </details>
  )
}

export interface ContactData {
  nombreCompleto: string
  telefono: string
  email: string
  empresa: string
}

export async function sendQuotation(payload: Record<string, unknown>) {
  const response = await fetch("/api/cotizaciones", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.error || "No pudimos enviar la cotización")
  return result
}

export function SubmissionError({ message }: { message: string }) {
  return <p role="alert" className="rounded-lg border-2 border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">{message}</p>
}

export function ContactStep({ data, onChange }: { data: ContactData; onChange: (field: keyof ContactData, value: string) => void }) {
  return (
    <div className="rounded-2xl border-2 border-ofimundo-purple bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-2 text-2xl font-bold text-ofimundo-navy md:text-3xl">Datos de contacto</h2>
      <p className="mb-6 text-sm leading-relaxed text-gray-600">Usaremos estos datos únicamente para preparar la propuesta y coordinar el contacto de un asesor.</p>
      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="nombreCompleto" className="mb-2 block text-sm font-semibold text-gray-700">Nombre completo <span className="text-red-500">*</span></label>
          <input id="nombreCompleto" type="text" autoComplete="name" required value={data.nombreCompleto} onChange={(event) => onChange("nombreCompleto", event.target.value)} placeholder="Juan Pérez" className={fieldClass} />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="telefono" className="mb-2 block text-sm font-semibold text-gray-700">Teléfono <span className="text-red-500">*</span></label>
            <input id="telefono" type="tel" autoComplete="tel" required value={data.telefono} onChange={(event) => onChange("telefono", event.target.value)} placeholder="+56 9 1234 5678" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">Correo electrónico <span className="text-red-500">*</span></label>
            <input id="email" type="email" autoComplete="email" required value={data.email} onChange={(event) => onChange("email", event.target.value)} placeholder="nombre@empresa.cl" className={fieldClass} />
          </div>
        </div>
        <div>
          <label htmlFor="empresa" className="mb-2 block text-sm font-semibold text-gray-700">Empresa <span className="text-red-500">*</span></label>
          <input id="empresa" type="text" autoComplete="organization" required value={data.empresa} onChange={(event) => onChange("empresa", event.target.value)} placeholder="Nombre de la empresa" className={fieldClass} />
        </div>
      </div>
    </div>
  )
}

export function QuotationPage({ title, description, step, detailHref, contextualAside, children }: { title: string; description: string; step: number; detailHref: string; contextualAside?: ReactNode; children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-36 sm:px-6 md:pt-40 lg:px-8 lg:pb-24">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-ofimundo-purple">Solicitud personalizada</p>
          <h1 className="text-balance text-4xl font-bold text-ofimundo-navy md:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-gray-600">{description}</p>
        </div>
        <Link href={detailHref} className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-ofimundo-purple transition hover:text-ofimundo-magenta"><span aria-hidden="true">←</span> Volver al detalle del producto</Link>
        <div className="mb-8" aria-label={`Paso ${step} de 2`}>
          <div className="mb-2 flex items-center justify-between text-sm font-semibold text-gray-600"><span>Paso {step} de 2</span><span>{step === 1 ? "Necesidades" : "Datos de contacto"}</span></div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200"><div className="h-full rounded-full bg-ofimundo-purple transition-all" style={{ width: step === 1 ? "50%" : "100%" }} /></div>
        </div>
        <div className="grid gap-8 lg:grid-cols-5">
          <section className="flex flex-col gap-6 lg:col-span-3">{children}</section>
          <aside className="flex flex-col gap-6 lg:col-span-2">
            {contextualAside}
            <div className="rounded-2xl border-2 border-ofimundo-purple bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-ofimundo-navy">¿Qué ocurrirá después?</h2>
              <ol className="mt-5 flex flex-col gap-5">
                <li className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ofimundo-purple font-bold text-white">1</span><div><p className="font-semibold text-gray-900">Revisamos tu necesidad</p><p className="mt-1 text-sm leading-relaxed text-gray-600">Validamos compatibilidad, alcance y condiciones de implementación.</p></div></li>
                <li className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ofimundo-navy font-bold text-white">2</span><div><p className="font-semibold text-gray-900">Preparamos una propuesta</p><p className="mt-1 text-sm leading-relaxed text-gray-600">Un asesor te contactará para conversar los detalles y resolver dudas.</p></div></li>
              </ol>
            </div>
            <div className="rounded-2xl bg-ofimundo-navy p-6 text-white">
              <p className="font-semibold">Cotización orientativa</p>
              <p className="mt-2 text-sm leading-relaxed text-white/80">Las selecciones nos ayudan a entender tu proyecto. La configuración final será validada por nuestro equipo antes de emitir la propuesta.</p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  )
}

export function SuccessMessage({ itemName, backHref, backLabel }: { itemName: string; backHref: string; backLabel: string }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-40 text-center sm:px-6 md:pt-44">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700"><svg aria-hidden="true" className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 13 4 4L19 7" /></svg></div>
        <h1 className="mt-6 text-3xl font-bold text-ofimundo-navy">Cotización enviada</h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">Recibimos tu solicitud para <strong>{itemName}</strong>. Un asesor se pondrá en contacto contigo pronto.</p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"><Link href={backHref} className="rounded-lg border-2 border-ofimundo-purple px-6 py-3 font-semibold text-ofimundo-purple transition hover:bg-purple-50">{backLabel}</Link><Link href="/" className="rounded-lg bg-ofimundo-navy px-6 py-3 font-semibold text-white transition hover:opacity-90">Volver al inicio</Link></div>
      </main>
      <Footer />
    </>
  )
}
