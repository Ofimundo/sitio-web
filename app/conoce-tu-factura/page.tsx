"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import "./conoce-tu-factura.css"

type InvoiceType = "fijo" | "variable" | "sobreconsumo"

interface InvoiceSection {
  id: number
  label: string
  title: string
  description: string
  top: string
  left: string
  badge?: string
}

const baseSections: InvoiceSection[] = [
  {
    id: 1,
    label: "1",
    title: "Folio y fecha de emisión",
    description:
      "Número único de la factura y fecha en que fue emitida y validada por el SII.",
    top: "4%",
    left: "73%",
  },
  {
    id: 2,
    label: "2",
    title: "Datos del cliente",
    description:
      "Aquí se muestran los datos de tu empresa. Si detectas algún error, por favor avísanos a finanzas@ofimundo.cl.",
    top: "14%",
    left: "18%",
  },
  {
    id: 3,
    label: "3",
    title: "Fecha de vencimiento",
    description:
      "Corresponde a la fecha límite para realizar el pago de tu factura. Posterior a este plazo, tu servicio puede quedar en riesgo de suspensión.",
    top: "14%",
    left: "80%",
  },
]

const detailSections: Record<InvoiceType, InvoiceSection> = {
  fijo: {
    id: 4,
    label: "4",
    title: "Detalle del cargo fijo",
    description:
      "Indica el concepto facturado correspondiente al arriendo de los equipos y el período de servicio asociado.",
    top: "35%",
    left: "48%",
    badge: "cargo fijo",
  },
  variable: {
    id: 4,
    label: "4",
    title: "Detalle del consumo de impresión",
    description:
      "Indica el concepto facturado correspondiente a las impresiones y/o copias realizadas durante el período.",
    top: "35%",
    left: "48%",
    badge: "impresión",
  },
  sobreconsumo: {
    id: 4,
    label: "4",
    title: "Detalle del sobreconsumo",
    description:
      "Tabla dividida en dos secciones: primero los cargos fijos (arriendo, mantencion, licencias) y luego los cargos variables (impresiones, copias, toner). El subtotal suma ambos tipos de cargo para el periodo facturado.",
    top: "35%",
    left: "48%",
    badge: "sobreconsumo",
  },
}

const detailAmout: Record<InvoiceType, InvoiceSection> = {
  fijo: {
    id: 5,
    label: "5",
    title: "Valor del arriendo mensual",
    description:
      "Monto en pesos del arriendo de los equipos contratados. Este valor está sujeto a la moneda pactada en tu contrato y puede variar según el indicador del día (UF o USD).",
    top: "30%",
    left: "86%",
    badge: "monto cargo fijo",
  },
  variable: {
    id: 5,
    label: "5",
    title: "Valor por impresión/copias del período",
    description:
      "Indica el concepto facturado correspondiente a las impresiones y/o copias realizadas durante el período.",
    top: "30%",
    left: "86%",
    badge: "monto cargo variable",
  },
  sobreconsumo: {
    id: 5,
    label: "5",
    title: "Valor del sobreconsumo",
    description:
      "Monto en pesos asociado a los insumos utilizados adicionalmente. Se genera cuando uno o más equipos superan el consumo incluido en el contrato.",
    top: "30%",
    left: "86%",
    badge: "monto sobreconsumo",
  },
}

const closingSections: InvoiceSection[] = [
  {
    id: 6,
    label: "6",
    title: "Cuenta bancaria",
    description:
      "Datos necesarios para realizar la transferencia o depósito del pago de tu factura.",
    top: "65%",
    left: "48%",
  },
  {
    id: 7,
    label: "7",
    title: "Timbre electrónico del SII",
    description:
      "Código que valida la factura ante el Servicio de Impuestos Internos y certifica que es un documento tributario electrónico oficial.",
    top: "75%",
    left: "20%",
  },
  {
    id: 8,
    label: "8",
    title: "Total a pagar",
    description: "Monto total de la factura en pesos, con IVA incluido.",
    top: "76%",
    left: "86%",
  },
  {
    id: 9,
    label: "9",
    title: "Acuse de recibo",
    description:
      "Sección utilizada únicamente cuando la factura es entregada en formato físico. Permite registrar la recepción conforme del documento.",
    top: "87%",
    left: "48%",
  },
]

const invoiceImages: Record<InvoiceType, string> = {
  fijo: "/images/conoce-tu-factura/factura_cargo_fijo.jpg",
  variable: "/images/conoce-tu-factura/factura_cargo_variable.jpg",
  sobreconsumo: "/images/conoce-tu-factura/factura_sobreconsumo.jpg",
}

function getSections(type: InvoiceType): InvoiceSection[] {
  return [
    ...baseSections,
    detailSections[type],
    detailAmout[type],
    ...closingSections,
  ]
}

export default function ConoceTuFacturaPage() {
  const [currentType, setCurrentType] = useState<InvoiceType>("fijo")
  const [openSectionId, setOpenSectionId] = useState<number | null>(1)

  const sections = getSections(currentType)
  const hasActive = openSectionId !== null

  const handleTabChange = (type: InvoiceType) => {
    setCurrentType(type)
    setOpenSectionId(1)
  }

  const toggleAccordion = (id: number) => {
    setOpenSectionId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex flex-col conoce-tu-factura-page">
      <Header />

      <section className="ctf-section flex-1">
        <div>
          <div className="ctf-container">
            <div className="ctf-card">
              <div className="ctf-card-header">
                <h3>Entiende tu Factura</h3>
                <p>
                  Conoce cada seccion de tu factura para que sepas exactamente que
                  estas pagando.
                </p>
                <div className="ctf-waves-container">
                  <svg
                    className="waves"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 40"
                    preserveAspectRatio="none"
                    shapeRendering="auto"
                    style={{ height: "7vh", minHeight: "50px" }}
                  >
                    <defs>
                      <path
                        id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                      ></path>
                    </defs>
                    <g className="moving-waves">
                      <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="-1"
                        fill="rgba(255,255,255,0.40)"
                      ></use>
                      <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="3"
                        fill="rgba(255,255,255,0.35)"
                      ></use>
                      <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="5"
                        fill="rgba(255,255,255,0.25)"
                      ></use>
                      <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="8"
                        fill="rgba(255,255,255,0.20)"
                      ></use>
                      <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="13"
                        fill="rgba(255,255,255,0.15)"
                      ></use>
                      <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="16"
                        fill="rgba(255,255,255,0.95)"
                      ></use>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="tabs-wrapper">
                <div className="tabs-bar" role="tablist">
                  <button
                    className={`tab-btn${currentType === "fijo" ? " active" : ""}`}
                    role="tab"
                    data-type="fijo"
                    aria-selected={currentType === "fijo"}
                    onClick={() => handleTabChange("fijo")}
                  >
                    Cargo Fijo
                    <span className="tab-desc">Arriendo de equipos</span>
                  </button>
                  <button
                    className={`tab-btn${currentType === "variable" ? " active" : ""}`}
                    role="tab"
                    data-type="variable"
                    aria-selected={currentType === "variable"}
                    onClick={() => handleTabChange("variable")}
                  >
                    Cargo Variable
                    <span className="tab-desc">Según tu volumen de impresion</span>
                  </button>
                  <button
                    className={`tab-btn${currentType === "sobreconsumo" ? " active" : ""}`}
                    role="tab"
                    data-type="sobreconsumo"
                    aria-selected={currentType === "sobreconsumo"}
                    onClick={() => handleTabChange("sobreconsumo")}
                  >
                    Sobreconsumo
                    <span className="tab-desc">Según tu consumo de suministros</span>
                  </button>
                </div>
              </div>

              <main className="main">
                <p className="section-intro">
                  Expande cada seccion del acordeon para ver su explicacion. La
                  factura resalta automaticamente la zona correspondiente.
                </p>

                <div className="layout-grid">
                  <div className="invoice-panel" id="invoicePanel">
                    <img
                      id="invoiceImage"
                      src={invoiceImages[currentType]}
                      alt="Ejemplo de factura de Ofimundo"
                    />
                    <div
                      className={`invoice-overlay${hasActive ? " visible" : ""}`}
                      id="invoiceOverlay"
                    ></div>
                    {sections.map((section) => {
                      const isActive = hasActive && section.id === openSectionId
                      const isDimmed = hasActive && section.id !== openSectionId
                      return (
                        <div
                          key={section.id}
                          className={`marker${isActive ? " active" : ""}${isDimmed ? " dimmed" : ""}`}
                          data-id={section.id}
                          style={{ top: section.top, left: section.left }}
                          onClick={() => toggleAccordion(section.id)}
                        >
                          <div className="marker-highlight"></div>
                          <div className="marker-dot">{section.label}</div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Accordion */}
                  <div className="accordion-panel">
                    <div className="accordion-header">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 23 23"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <h3>Secciones de tu factura</h3>
                    </div>
                    <div id="accordionList" role="region">
                      {sections.map((section) => {
                        const isOpen = section.id === openSectionId
                        return (
                          <div
                            key={section.id}
                            className={`accordion-item${isOpen ? " open" : ""}`}
                            data-id={section.id}
                          >
                            <button
                              className="accordion-trigger"
                              aria-expanded={isOpen}
                              onClick={() => toggleAccordion(section.id)}
                            >
                              <span className="accordion-trigger-left">
                                <span className="trigger-number">
                                  {section.label}
                                </span>
                                <span className="trigger-title">
                                  {section.title}
                                </span>
                              </span>
                              <svg
                                className="trigger-chevron"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </button>
                            <div
                              className="accordion-content"
                              style={{ maxHeight: isOpen ? "200px" : "0" }}
                            >
                              <div className="accordion-content-inner">
                                <p>{section.description}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

