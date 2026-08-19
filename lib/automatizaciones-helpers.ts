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

  // Exclusión estricta de otras categorías
  if (
    id.includes("fnqt") ||
    id.includes("gsct") ||
    id.includes("gesdoc") ||
    id.includes("sldbnc") ||
    imagen.includes("finiquitos") ||
    imagen.includes("cuentas") ||
    imagen.includes("saldos") ||
    imagen.includes("ocr-documental")
  ) {
    return false
  }

  return (
    imagen.includes("aceptacion-facturas") ||
    imagen.includes("01-aceptacion-facturas") ||
    slug.includes("aceptacion") ||
    slug.includes("aprobacion") ||
    id.includes("aprrch") ||
    id === "ofi-autprc" ||
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

  // Exclusión estricta si el ID es de gestión documental/cuentas
  if (id.includes("gesdoc") || id.includes("gsct") || id.includes("aprrch") || id.includes("sldbnc")) {
    return false
  }

  return (
    imagen.includes("finiquitos") ||
    imagen.includes("03-finiquitos-dt") ||
    slug.includes("finiquito") ||
    id.includes("fnqt") ||
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

  if (id.includes("aprrch") || id.includes("fnqt") || id.includes("sldbnc")) {
    return false
  }

  return (
    imagen.includes("cuentas") ||
    imagen.includes("02-cuentas-basicas") ||
    imagen.includes("04-ocr-documental") ||
    slug.includes("cuenta") ||
    id.includes("gsct") ||
    id.includes("gesdoc") ||
    id.includes("cuenta") ||
    nombre.includes("cuentas") ||
    nombre.includes("cuenta") ||
    nombre.includes("gestion de cuentas") ||
    nombre.includes("gestión de cuentas")
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

  if (id.includes("aprrch") || id.includes("fnqt") || id.includes("gsct") || id.includes("gesdoc")) {
    return false
  }

  return (
    imagen.includes("saldos-bancarios") ||
    imagen.includes("05-saldos-bancarios") ||
    imagen.includes("saldo") ||
    slug.includes("saldo") ||
    slug.includes("bancario") ||
    id.includes("sldbnc") ||
    id.includes("saldo") ||
    id.includes("banco") ||
    nombre.includes("saldo") ||
    nombre.includes("bancario") ||
    nombre.includes("banco")
  )
}

