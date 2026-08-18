export function isAceptacionFacturasAnimation(item?: {
  slug?: string
  nombre?: string
  imagen?: string
  ID_Producto?: string
}) {
  if (!item) return false
  const slug = (item.slug || "").toLowerCase()
  const nombre = (item.nombre || "").toLowerCase()
  const imagen = (item.imagen || "").toLowerCase()
  const id = (item.ID_Producto || "").toLowerCase()

  return (
    imagen.includes("aceptacion-facturas") ||
    slug.includes("aceptacion") ||
    slug.includes("aprobacion") ||
    id.includes("aceptacion") ||
    id.includes("aprobacion") ||
    (nombre.includes("aprobacion") && nombre.includes("rechazo")) ||
    (nombre.includes("aceptacion") && nombre.includes("rechazo")) ||
    (nombre.includes("factura") && (nombre.includes("aprobacion") || nombre.includes("aceptacion") || nombre.includes("rechazo")))
  )
}

export function isFiniquitosDtAnimation(item?: {
  slug?: string
  nombre?: string
  imagen?: string
  ID_Producto?: string
}) {
  if (!item) return false
  const slug = (item.slug || "").toLowerCase()
  const nombre = (item.nombre || "").toLowerCase()
  const imagen = (item.imagen || "").toLowerCase()
  const id = (item.ID_Producto || "").toLowerCase()

  return (
    imagen.includes("finiquitos") ||
    slug.includes("finiquito") ||
    id.includes("finiquito") ||
    nombre.includes("finiquito")
  )
}

export function isGestionCuentasAnimation(item?: {
  slug?: string
  nombre?: string
  imagen?: string
  ID_Producto?: string
}) {
  if (!item) return false
  const slug = (item.slug || "").toLowerCase()
  const nombre = (item.nombre || "").toLowerCase()
  const imagen = (item.imagen || "").toLowerCase()
  const id = (item.ID_Producto || "").toLowerCase()

  return (
    imagen.includes("cuentas") ||
    slug.includes("cuenta") ||
    id.includes("cuenta") ||
    nombre.includes("cuentas") ||
    nombre.includes("cuenta")
  )
}

export function isSaldosBancariosAnimation(item?: {
  slug?: string
  nombre?: string
  imagen?: string
  ID_Producto?: string
}) {
  if (!item) return false
  const slug = (item.slug || "").toLowerCase()
  const nombre = (item.nombre || "").toLowerCase()
  const imagen = (item.imagen || "").toLowerCase()
  const id = (item.ID_Producto || "").toLowerCase()

  return (
    imagen.includes("saldos-bancarios") ||
    imagen.includes("saldo") ||
    slug.includes("saldo") ||
    slug.includes("bancario") ||
    id.includes("saldo") ||
    id.includes("banco") ||
    nombre.includes("saldo") ||
    nombre.includes("bancario") ||
    nombre.includes("banco")
  )
}
