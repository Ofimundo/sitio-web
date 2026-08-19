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
    resumen: "Control total de tus documentos con validación automática y flujos de aprobación inteligentes.",
    descripcion: "Centraliza la recepción de documentos tributarios, aplica reglas de negocio y automatiza su aceptación o rechazo con trazabilidad completa.",
    imagen: "/images/automatizaciones/aceptacion-facturas.png",
    icono: "fa-file-circle-check",
    capacidades: ["Validación automática de facturas", "Reglas personalizadas de aceptación y rechazo", "Flujos de aprobación automáticos", "Alertas y reportes diarios y mensuales"],
    integraciones: ["SII", "ERP del cliente", "API del cliente", "Correo electrónico"],
    metricas: ["Cantidad mensual de facturas", "Cantidad de RUT", "Reglas de negocio", "Horas de soporte"],
    planes: [
      { nombre: "Estándar", descripcion: "Control inicial con reglas de negocio predefinidas.", idealPara: ["Hasta 500 facturas", "1 RUT"], incluye: ["Integración con ERP", "Regla estándar", "Reporte estándar", "Soporte mensual"] },
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
    beneficio: "Actualización 24/7",
    resumen: "Consulta automática de saldos y alertas financieras en tiempo real.",
    descripcion: "Consolida saldos bancarios, organiza la línea de cobranza por empresa y entrega reportes ejecutivos listos para la toma de decisiones.",
    imagen: "/images/automatizaciones/saldos-bancarios.png",
    icono: "fa-building-columns",
    capacidades: ["Consulta automática de saldos", "Alertas de movimientos importantes", "Consolidación por empresa", "Reportes y gráficas ejecutivas"],
    integraciones: ["Bancos compatibles", "ERP del cliente", "Excel", "Correo electrónico"],
    metricas: ["Cantidad de bancos", "Cantidad de RUT", "Frecuencia de actualización", "Reportes requeridos"],
    planes: [
      { nombre: "Estándar", descripcion: "Visibilidad financiera centralizada para operaciones acotadas.", idealPara: ["Hasta 5 bancos", "1 RUT"], incluye: ["Reporte estándar", "Gráficas estándar", "Notificación estándar", "Consolidación diaria"] },
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
    beneficio: "Hasta 90% menos tiempo",
    resumen: "Cálculos precisos y documentos automatizados para la gestión de término laboral.",
    descripcion: "Automatiza el cálculo, elaboración, envío y seguimiento de finiquitos con información consolidada y alertas operativas.",
    imagen: "/images/automatizaciones/finiquitos-dt.png",
    icono: "fa-scroll",
    capacidades: ["Cálculo automático de finiquitos", "Elaboración de documentos", "Envío automatizado a la DT", "Historial y reportes de procesamiento"],
    integraciones: ["Dirección del Trabajo", "ERP del cliente", "Gestor documental", "Correo electrónico"],
    metricas: ["Finiquitos mensuales", "Cantidad de RUT", "Sistemas de origen", "Notificaciones requeridas"],
    planes: [
      { nombre: "Estándar", descripcion: "Automatización esencial para equipos con volumen estable.", idealPara: ["Hasta 100 finiquitos", "1 RUT"], incluye: ["Elaboración de documentos", "Envío automático a DT", "Integración con ERP", "Reporte y gráfica estándar"] },
      { nombre: "Premium", recomendado: true, descripcion: "Mayor escala y personalización para grupos empresariales.", idealPara: ["Más de 100 finiquitos", "Hasta 10 RUT"], incluye: ["Integración con gestor documental", "Reportes y gráficas personalizadas", "Notificaciones customizadas", "Soporte ampliado"] },
    ],
  },
  {
    ID_Producto: "auto_gestion_cuentas",
    slug: "gestion-cuentas",
    nombre: "Gestión de Cuentas",
    nombreCorto: "Gestión de Cuentas",
    categoria: "Contabilidad",
    modalidad: "Automatización gestionada",
    beneficio: "Hasta 50% más eficiencia",
    resumen: "Registros contables automatizados y contabilización directa en tu ERP.",
    descripcion: "Automatiza el registro de facturas, cuentas por pagar y asientos contables directamente en tu ERP con reglas personalizadas de contabilización.",
    imagen: "/images/automatizaciones/cuentas-basicas.png",
    icono: "fa-calculator",
    capacidades: ["Registros contables automatizados", "Reglas contables por centro de costo", "Flujos de aprobación y trazabilidad", "Reportes diarios y mensuales"],
    integraciones: ["ERP del cliente", "SII", "Gestor documental", "Correo electrónico"],
    metricas: ["Cantidad mensual de documentos", "Cantidad de centros de costo", "Reglas de contabilización", "Soporte mensual"],
    planes: [
      { nombre: "Estándar", descripcion: "Automatización contable esencial para tu operación.", idealPara: ["Hasta 500 documentos", "1 RUT"], incluye: ["Integración con ERP", "Reglas contables estándar", "Reportes diarios", "Soporte mensual"] },
      { nombre: "Premium", recomendado: true, descripcion: "Mayor volumen y reglas contables avanzadas.", idealPara: ["501 a 2.000 documentos", "Hasta 10 RUT"], incluye: ["Reglas avanzadas por centro de costo", "Reportes ejecutivos", "Soporte dedicado"] },
    ],
  },
]

export const automatizaciones = automatizacionesFallback
export const categoriasAutomatizacion = ["Finanzas", "Contabilidad", "Recursos Humanos", "Gestión Documental"]
export const modalidadesAutomatizacion = ["Automatización gestionada", "Integración personalizada"]

export function obtenerAutomatizacionPorSlug(slug: string): Automatizacion {
  const norm = slug.trim().toLowerCase().replaceAll("-", "_").replace(/^auto_/, "").replace(/^ofi_autprc_/, "")
  
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
  if (norm.includes("gsct") || norm.includes("gesdoc") || norm.includes("cuenta")) {
    return automatizacionesFallback[3]
  }

  return automatizacionesFallback[0]
}
