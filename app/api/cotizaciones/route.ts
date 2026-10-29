import { NextResponse } from "next/server"
import { ConfidentialClientApplication } from "@azure/msal-node"

export const runtime = "nodejs"

const DESTINATARIO = process.env.MICROSOFT_SENDER_EMAIL || "sistemasdigitales@ofimundo.cl"
const TIPOS_VALIDOS = new Set(["sala", "mps", "automatizacion", "daas", "rpa", "smart offices", "smart-office", "contacto"])

// ─── Configuración API Omitec CRM (idéntica a servicios/js/config-form.js) ───
const OMITEC_API_URL = process.env.OMITEC_API_URL || "https://www.omitec.cl/api/v1/ofimundo"
const OMITEC_TOKEN =
  process.env.OMITEC_API_TOKEN ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3d3dy5vbWl0ZWMuY2wvIiwiYXVkIjoiaHR0cHM6Ly93d3cub2ZpbXVuZG8uY2wvIiwiZXhwIjoxNzk4NjYyOTgxLCJpYXQiOjE3NjcxMjY5ODEsIm5hbWUiOiJvZmltdW5kbyIsIm1vZHVsZSI6Im9maW11bmRvIiwianRpIjoiNTdjZTg1NDktMGU1Zi00ZDg5LWJiYjItYTU1NGM2NjZlOGRkIn0.6nN1vClyeX4wWq2TdUo9N_jX8bwVOG_B2I9RCfa7VOg"

type TipoContactoOmitec = "MPS" | "Smart-Office" | "RPA" | "DaaS" | "Contacto"

function mapTipoContactoOmitec(tipo: string): TipoContactoOmitec {
  const t = tipo.toLowerCase().trim()
  if (t === "sala" || t === "smart offices" || t === "smart_offices" || t === "smart-office") return "Smart-Office"
  if (t === "automatizacion" || t === "rpa") return "RPA"
  if (t === "mps") return "MPS"
  if (t === "contacto") return "Contacto"
  return "DaaS"
}

/**
 * Formatea el RUT igual que en servicios/js/form-multistep-*.js:
 * Ej: "96.234.567-1"
 */
function formatRutOmitec(rut: string): string {
  return rut
    .trim()
    .replace(/[^0-9kK]/g, "")
    .replace(/^0+/, "")
    .replace(/(\d{1,2})(\d{3})(\d{3})([kK\d])?$/, "$1.$2.$3-$4")
}

/**
 * Construye mensaje_solicitud (máx 400 caracteres) consolidando los campos actuales del formulario.
 */
function buildMensajeSolicitud(body: Record<string, unknown>, tipoContacto: TipoContactoOmitec): string {
  if (typeof body.mensaje_solicitud === "string" && body.mensaje_solicitud.trim()) {
    return body.mensaje_solicitud.trim().slice(0, 400)
  }

  const parts: string[] = []

  if (tipoContacto === "MPS") {
    if (body.equipo_nombre) parts.push(`Equipo: ${body.equipo_nombre}`)
    if (body.cantidad_equipos) parts.push(`Cant: ${body.cantidad_equipos}`)
    if (body.plazo_contrato) parts.push(`Plazo: ${body.plazo_contrato}`)
    if (body.volumen_mensual) parts.push(`Vol: ${body.volumen_mensual}`)
    if (body.tipo_impresion) parts.push(`Imp: ${body.tipo_impresion}`)
    if (body.tamano_papel) parts.push(`Papel: ${body.tamano_papel}`)
    if (Array.isArray(body.funciones) && body.funciones.length > 0) {
      parts.push(`Func: ${body.funciones.join(", ")}`)
    }
    if (body.numero_ubicaciones) parts.push(`Ubic: ${body.numero_ubicaciones}`)
    if (body.observaciones && String(body.observaciones).trim()) {
      parts.push(`Obs: ${String(body.observaciones).trim()}`)
    }
  } else if (tipoContacto === "Smart-Office") {
    if (body.sala_nombre) parts.push(`Sala: ${body.sala_nombre}`)
    if (body.cantidad_salas) parts.push(`Cant: ${body.cantidad_salas}`)
    if (body.plazo) parts.push(`Plazo: ${body.plazo}`)
    if (body.uso_principal) parts.push(`Uso: ${body.uso_principal}`)
    if (body.observaciones && String(body.observaciones).trim()) {
      parts.push(`Obs: ${String(body.observaciones).trim()}`)
    }
  } else if (tipoContacto === "RPA") {
    if (body.solucion) parts.push(`Solución: ${body.solucion}`)
    if (isRecord(body.necesidades)) {
      const n = body.necesidades
      if (n.plan) parts.push(`Plan: ${n.plan}`)
      if (n.volumen) parts.push(`Vol: ${n.volumen}`)
      if (n.empresas) parts.push(`Empresas: ${n.empresas}`)
      if (n.sistemas) parts.push(`Sistemas: ${n.sistemas}`)
      if (n.personalizacion) parts.push(`Pers: ${n.personalizacion}`)
      if (n.plazo) parts.push(`Plazo: ${n.plazo}`)
      if (n.observaciones && String(n.observaciones).trim()) {
        parts.push(`Obs: ${String(n.observaciones).trim()}`)
      }
    }
  }

  if (parts.length === 0 && body.observaciones && String(body.observaciones).trim()) {
    parts.push(String(body.observaciones).trim())
  }

  const combined = parts.join(" | ").trim()
  return (combined || `Solicitud de cotización ${tipoContacto}`).slice(0, 400)
}

// ─── Configuración Microsoft Graph (adaptado a tu .env.local) ───
const CLIENT_ID = process.env.MICROSOFT_CLIENT_ID!
const CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET!
const TENANT_ID = process.env.MICROSOFT_TENANT_ID!
const EMAIL_FROM = process.env.MICROSOFT_SENDER_EMAIL!          // sistemasdigitales@ofimundo.cl
const GRAPH_BASE_URL = "https://graph.microsoft.com/v1.0"

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function label(key: string) {
  return key.replaceAll("_", " ").replace(/^./, (character) => character.toUpperCase())
}

function formatValue(value: unknown): string {
  if (Array.isArray(value)) return value.map(String).join(", ") || "Sin selección"
  if (isRecord(value))
    return Object.entries(value)
      .map(([key, item]) => `${label(key)}: ${formatValue(item)}`)
      .join(" · ")
  return String(value ?? "Sin información")
}

async function getGraphToken(): Promise<string> {
  const cca = new ConfidentialClientApplication({
    auth: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      authority: `https://login.microsoftonline.com/${TENANT_ID}`,
    },
  })
  const result = await cca.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  })
  if (!result?.accessToken) {
    throw new Error("No se pudo obtener token de acceso para Microsoft Graph")
  }
  return result.accessToken
}

async function sendMailGraph(
  token: string,
  payload: {
    subject: string
    from: string
    to: string
    replyTo: string
    htmlBody: string
    textBody: string
  }
) {
  const body = {
    message: {
      subject: payload.subject,
      from: {
        emailAddress: { address: payload.from, name: payload.from },
      },
      toRecipients: [
        {
          emailAddress: { address: payload.to, name: payload.to },
        },
      ],
      replyTo: [
        {
          emailAddress: { address: payload.replyTo, name: payload.replyTo },
        },
      ],
      body: {
        contentType: "html",
        content: payload.htmlBody,
      },
    },
    saveToSentItems: true,
  }

  const res = await fetch(
    `${GRAPH_BASE_URL}/users/${encodeURIComponent(payload.from)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Graph API error ${res.status}: ${errorText}`)
  }

  return { messageId: `graph-${Date.now()}` }
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json()
    if (!isRecord(body)) return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 })

    const tipo = String(body.tipo ?? "")
    const nombre = String(body.nombreCompleto ?? body.nombre_solicitud ?? "").trim()
    const email = String(body.email ?? body.email_solicitud ?? "").trim()
    const telefono = String(body.telefono ?? body.telefono_solicitud ?? "").trim()
    const empresa = String(body.empresa ?? body.nombre_empresa ?? "").trim()
    const rutEmpresa = String(body.rutEmpresa ?? body.rut_empresa ?? body.rut ?? "").trim()

    if (!TIPOS_VALIDOS.has(tipo.toLowerCase()) || !nombre || !telefono || !empresa || !rutEmpresa || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Por favor, completa todos los campos." }, { status: 400 })
    }

    const tipoContacto = mapTipoContactoOmitec(tipo)

    // 1. Armar el payload idéntico al de C:\Users\marrano\Desktop\servicios\js\form-multistep-*.js
    const data = {
      nombre_empresa: empresa.slice(0, 50),
      rut_empresa: formatRutOmitec(rutEmpresa),
      nombre_solicitud: nombre.slice(0, 50),
      telefono_solicitud: telefono.replace(/[^0-9]/g, "").slice(0, 15),
      email_solicitud: email.slice(0, 120),
      mensaje_solicitud: buildMensajeSolicitud(body, tipoContacto),
      tipo_contacto: tipoContacto,
    }

    console.log("Datos del formulario a enviar:", data)

    for (const key of Object.keys(data) as Array<keyof typeof data>) {
      if (data[key] === "") {
        return NextResponse.json({ error: "Por favor, completa todos los campos." }, { status: 400 })
      }
    }

    // 2. Enviar a https://www.omitec.cl/api/v1/ofimundo con Bearer TOKEN (igual que en servicios)
    const omitecResponse = await fetch(OMITEC_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OMITEC_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const responseBody = await omitecResponse.text()
    console.log("Respuesta del servidor:", omitecResponse.status, responseBody)

    if (!omitecResponse.ok) {
      return NextResponse.json(
        { error: `Error ${omitecResponse.status}: ${responseBody}` },
        { status: omitecResponse.status }
      )
    }

    // 3. Enviar notificación por correo vía Microsoft Graph API (si está configurado)
    let emailResult = { messageId: `local-${Date.now()}` }
    if (CLIENT_ID && CLIENT_SECRET && TENANT_ID && EMAIL_FROM) {
      try {
        const excluded = new Set(["nombreCompleto", "email", "telefono", "empresa", "rutEmpresa"])
        const details = Object.entries(body).filter(([key]) => !excluded.has(key))
        const rows = details
          .map(
            ([key, value]) =>
              `<tr><th style="padding:8px;text-align:left;border-bottom:1px solid #ddd">${escapeHtml(label(key))}</th><td style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(formatValue(value))}</td></tr>`
          )
          .join("")
        const textDetails = details.map(([key, value]) => `${label(key)}: ${formatValue(value)}`).join("\n")

        const htmlBody = `<main style="font-family:Arial,sans-serif;color:#17143b"><h1>Nueva solicitud de cotización (${escapeHtml(tipoContacto)})</h1><p><strong>Cliente:</strong> ${escapeHtml(nombre)} · ${escapeHtml(empresa)} (RUT: ${escapeHtml(data.rut_empresa || "No ingresado")})</p><p><strong>Contacto:</strong> ${escapeHtml(email)} · ${escapeHtml(telefono)}</p><table style="border-collapse:collapse;width:100%">${rows}</table></main>`
        const textBody = `Nueva solicitud de cotización (${tipoContacto})\nCliente: ${nombre}\nEmpresa: ${empresa}\nRUT: ${data.rut_empresa}\nEmail: ${email}\nTeléfono: ${telefono}\n\n${textDetails}`

        const token = await getGraphToken()
        emailResult = await sendMailGraph(token, {
          subject: `Nueva cotización ${tipoContacto} — ${empresa}`,
          from: EMAIL_FROM,
          to: DESTINATARIO,
          replyTo: email,
          htmlBody,
          textBody,
        })
      } catch (graphErr) {
        console.error("[Microsoft Graph] No se pudo enviar el correo de notificación:", graphErr)
      }
    }

    return NextResponse.json({
      success: true,
      id: emailResult.messageId,
      crm: responseBody,
    })
  } catch (error) {
    console.error("[Cotizaciones] No fue posible procesar la solicitud", error)
    return NextResponse.json({ error: "No se pudo conectar con el servidor." }, { status: 500 })
  }
}

