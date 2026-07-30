export interface PlanAutomatizacion {
  nombre: string
  recomendado?: boolean
  descripcion: string
  idealPara: string[]
  incluye: string[]
}

export interface Automatizacion {
  slug: string
  nombre: string
  nombreCorto: string
  categoria: "Finanzas" | "Contabilidad" | "Recursos Humanos" | "Gestión Documental"
  modalidad: "Automatización gestionada" | "Integración personalizada"
  beneficio: string
  resumen: string
  descripcion: string
  imagen: string
  icono: string
  capacidades: string[]
  integraciones: string[]
  metricas: string[]
  planes: PlanAutomatizacion[]
}

export const automatizaciones: Automatizacion[] = [
  {
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
    slug: "cuentas-basicas",
    nombre: "Cuentas Básicas",
    nombreCorto: "Cuentas básicas",
    categoria: "Contabilidad",
    modalidad: "Automatización gestionada",
    beneficio: "Hasta 50% más eficiencia",
    resumen: "Registros contables automatizados y conciliación bancaria simplificada.",
    descripcion: "Reduce tareas repetitivas de registro, categorización y conciliación para que el equipo contable se concentre en el análisis.",
    imagen: "/images/automatizaciones/cuentas-basicas.png",
    icono: "fa-coins",
    capacidades: ["Registro automático de transacciones", "Categorización inteligente", "Conciliación bancaria automática", "Reportes financieros oportunos"],
    integraciones: ["ERP contable", "Bancos compatibles", "Excel", "Correo electrónico"],
    metricas: ["Transacciones mensuales", "Cantidad de cuentas", "Empresas o RUT", "Reportes requeridos"],
    planes: [
      { nombre: "Esencial", descripcion: "Plan provisorio para ordenar y automatizar la operación básica.", idealPara: ["Una empresa", "Volumen inicial"], incluye: ["Registro y categorización", "Conciliación estándar", "Reporte mensual", "Soporte de puesta en marcha"] },
      { nombre: "Avanzado", recomendado: true, descripcion: "Plan provisorio para operaciones con más cuentas y reglas.", idealPara: ["Múltiples cuentas", "Mayor volumen"], incluye: ["Reglas personalizadas", "Conciliación avanzada", "Reportes ejecutivos", "Alertas operativas"] },
    ],
  },
  {
    slug: "ocr-documental",
    nombre: "Automatización Documental OCR",
    nombreCorto: "OCR documental",
    categoria: "Gestión Documental",
    modalidad: "Integración personalizada",
    beneficio: "95% de precisión",
    resumen: "Extracción inteligente de datos y clasificación automática de documentos.",
    descripcion: "Convierte documentos físicos y digitales en información estructurada, validada y lista para integrarse con tus sistemas.",
    imagen: "/images/automatizaciones/ocr-documental.png",
    icono: "fa-file-magnifying-glass",
    capacidades: ["Reconocimiento óptico de caracteres", "Extracción de datos relevantes", "Clasificación inteligente", "Soporte para PDF e imágenes"],
    integraciones: ["ERP del cliente", "Gestor documental", "API del cliente", "Almacenamiento en nube"],
    metricas: ["Documentos mensuales", "Tipos documentales", "Campos por extraer", "Precisión requerida"],
    planes: [
      { nombre: "Esencial", descripcion: "Plan provisorio para digitalizar documentos recurrentes.", idealPara: ["Hasta 2 tipos documentales", "Volumen inicial"], incluye: ["Extracción estándar", "Validación básica", "Exportación estructurada", "Reporte mensual"] },
      { nombre: "Inteligente", recomendado: true, descripcion: "Plan provisorio para flujos documentales más complejos.", idealPara: ["Múltiples formatos", "Integración empresarial"], incluye: ["Clasificación automática", "Campos personalizados", "Integración por API", "Validación y soporte ampliado"] },
    ],
  },
]

export const categoriasAutomatizacion = Array.from(new Set(automatizaciones.map((item) => item.categoria)))
export const modalidadesAutomatizacion = Array.from(new Set(automatizaciones.map((item) => item.modalidad)))

export function obtenerAutomatizacionPorSlug(slug: string) {
  return automatizaciones.find((item) => item.slug === slug)
}
