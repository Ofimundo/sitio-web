import type { Automatizacion } from "./types"

export const automatizacionesFallback: Automatizacion[] = [
  {
    ID_Producto: "auto_aceptacion_facturas",
    slug: "aceptacion-rechazo-facturas",
    nombre: "Aceptación y Rechazo de Facturas",
    nombreCorto: "Aceptación de facturas",
    categoria: "Finanzas",
    modalidad: "Integración personalizada",
    beneficio: "99% de precisión",
    resumen: "Gestiona tus facturas de forma inteligente",
    descripcion: "Centraliza la recepción de documentos tributarios, aplica reglas de negocio y automatiza su aceptación o rechazo con trazabilidad completa.",
    imagen: "/images/automatizaciones/aceptacion-facturas.png",
    icono: "fa-file-circle-check",
    capacidades: ["Validación automática de facturas", "Reglas personalizadas de aceptación y rechazo", "Flujos de aprobación automáticos", "Alertas y reportes diarios y mensuales"],
    integraciones: ["SII", "ERP del cliente", "API´S", "Correo electrónico"],
    metricas: ["Cantidad mensual de facturas", "Cantidad de RUT", "Reglas de negocio", "Horas de soporte"],
    planes: [
      { nombre: "Estándar", descripcion: "Control inicial con reglas de negocio predefinidas.", idealPara: ["Hasta 500 facturas", "1 RUT"], incluye: ["Integración con ERP", "Regla", "Reporte", "Soporte mensual"] },
      { nombre: "Premium", recomendado: true, descripcion: "Mayor volumen y personalización de procesos.", idealPara: ["501 a 1.000 facturas", "Hasta 10 RUT"], incluye: ["Integración personalizada", "Reglas customizadas", "Reportes y gráficas customizadas", "Notificaciones personalizadas"] },
      { nombre: "Plus", descripcion: "Operación de alto volumen con alcance empresarial.", idealPara: ["Más de 1.000 facturas", "Más de 10 RUT"], incluye: ["Integración avanzada", "Reglas y reportes personalizados", "Gráficas y notificaciones customizadas", "Soporte ampliado"] },
    ],
  },
  {
    ID_Producto: "auto_saldos_bancarios",
    slug: "saldos-bancarios",
    nombre: "Saldos Bancarios",
    nombreCorto: "Saldos bancarios",
    categoria: "Finanzas",
    modalidad: "Integración personalizada",
    beneficio: "Actualización diaria",
    resumen: "Consolida saldos bancarios y líneas de crédito por empresas y consolida en reportes ejecutivos",
    descripcion: "Consolida saldos bancarios y líneas de crédito por empresas y consolida en reportes ejecutivos.",
    imagen: "/images/automatizaciones/saldos-bancarios.png",
    icono: "fa-building-columns",
    capacidades: ["Consulta automática de saldos", "Reportes ejecutivos", "Consolidación por empresa", "Gráficas"],
    integraciones: ["Bancos", "Excel", "Correo electrónico", "Reportes y gráficas"],
    metricas: ["Cantidad de bancos", "Cantidad de RUT", "Frecuencia de actualización", "Reportes requeridos"],
    planes: [
      { nombre: "Estándar", descripcion: "Visibilidad financiera centralizada para operaciones acotadas.", idealPara: ["Hasta 5 bancos", "1 RUT"], incluye: ["Reporte", "Gráficas", "Notificación", "Consolidación diaria"] },
      { nombre: "Premium", recomendado: true, descripcion: "Monitoreo financiero para organizaciones con múltiples cuentas.", idealPara: ["Más de 5 bancos", "Hasta 10 RUT"], incluye: ["Reportes y gráficas personalizadas", "Notificaciones personalizadas", "Consolidación avanzada", "Soporte mensual"] },
    ],
  },
  {
    ID_Producto: "auto_finiquitos_dt",
    slug: "finiquitos-dt",
    nombre: "Finiquitos DT",
    nombreCorto: "Finiquitos",
    categoria: "Recursos Humanos",
    modalidad: "Automatización gestionada",
    beneficio: "Reducción de tiempo hasta 90%",
    resumen: "Cálculos precisos y automatizados para la gestión de término de relación laboral",
    descripcion: "Automatiza el cálculo, elaboración, envío y seguimiento de finiquitos con información consolidada y alertas operativas.",
    imagen: "/images/automatizaciones/finiquitos-dt.png",
    icono: "fa-scroll",
    capacidades: ["Cálculo automático de finiquitos", "Elaboración de documentos", "Envío automatizado a la DT", "Historial y reportes de procesamiento"],
    integraciones: ["Dirección del Trabajo", "ERP del cliente", "Gestor documental", "Correo electrónico"],
    metricas: ["Finiquitos mensuales", "Cantidad de RUT", "Sistemas de origen", "Notificaciones requeridas"],
    planes: [
      { nombre: "Estándar", descripcion: "Automatización esencial para equipos con volumen estable.", idealPara: ["Hasta 100 finiquitos", "1 RUT"], incluye: ["Elaboración de documentos", "Envío automático a DT", "Integración con ERP", "Reporte y gráfica"] },
      { nombre: "Premium", recomendado: true, descripcion: "Mayor escala y personalización para grupos empresariales.", idealPara: ["Más de 100 finiquitos", "Hasta 10 RUT"], incluye: ["Integración con gestor documental", "Reportes y gráficas personalizadas", "Notificaciones customizadas", "Soporte ampliado"] },
    ],
  },
  {
    ID_Producto: "auto_gestion_cuentas",
    slug: "gestion-cuentas",
    nombre: "Gestión de Cuentas",
    nombreCorto: "Gestión de Cuentas",
    categoria: "Servicios Generales",
    modalidad: "Automatización gestionada",
    beneficio: "Hasta 50% más eficiencia",
    resumen: "Automatiza el registro y gestión de cuentas básicas por pagar con reglas personalizadas",
    descripcion: "Automatiza el registro y gestión de cuentas básicas por pagar con reglas personalizadas.",
    imagen: "/images/automatizaciones/cuentas-basicas.png",
    icono: "fa-calculator",
    capacidades: ["Registro de cuentas", "Flujos de aprobación y trazabilidad", "Reportes"],
    integraciones: ["Empresas proveedoras", "Gestor documental", "Correo electrónico"],
    metricas: ["Cantidad mensual de documentos", "Cantidad de centros de costo", "Reportes"],
    planes: [],
  },
]

export const automatizaciones = automatizacionesFallback
export const categoriasAutomatizacion = ["Finanzas", "Servicios Generales", "Recursos Humanos"]
export const modalidadesAutomatizacion = ["Automatización gestionada", "Integración personalizada"]

export function obtenerAutomatizacionPorSlug(slug: string): Automatizacion | null {
  const norm = slug.trim().toLowerCase().replaceAll("-", "_").replace(/^auto_/, "").replace(/^ofi_autprc_?/, "")

  if (norm.includes("gesdoc") || norm.includes("gestion_documental") || norm.includes("document")) {
    return null
  }

  const exact = automatizacionesFallback.find((item) => {
    const itemNorm = item.slug.trim().toLowerCase().replaceAll("-", "_").replace(/^auto_/, "")
    const idNorm = item.ID_Producto.trim().toLowerCase().replaceAll("-", "_").replace(/^auto_/, "")
    return itemNorm === norm || idNorm === norm || norm.includes(itemNorm) || itemNorm.includes(norm)
  })
  if (exact) return exact

  if (norm.includes("factura") || norm.includes("aprobacion") || norm.includes("rechazo") || norm.includes("aprrch")) {
    return automatizacionesFallback[0]
  }
  if (norm.includes("saldo") || norm.includes("banco") || norm.includes("sldbnc")) {
    return automatizacionesFallback[1]
  }
  if (norm.includes("finiquito") || norm.includes("fnqt")) {
    return automatizacionesFallback[2]
  }
  if (norm.includes("gsct") || norm.includes("cuenta")) {
    return automatizacionesFallback[3]
  }

  return null
}
