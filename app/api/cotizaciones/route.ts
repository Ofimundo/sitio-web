import { NextResponse } from "next/server"
import { ConfidentialClientApplication } from "@azure/msal-node"
import { injectSoftlandCotizacion } from "@/lib/db"

export const runtime = "nodejs"

const DESTINATARIO = process.env.MICROSOFT_SENDER_EMAIL || "marrano@ofimundo.cl"
const TIPOS_VALIDOS = new Set(["sala", "mps", "automatizacion", "daas", "rpa", "smart offices"])

function mapTipoSoftland(tipo: string): "SMART OFFICES" | "RPA" | "MPS" | "DAAS" {
  const t = tipo.toLowerCase().trim()
  if (t === "sala" || t === "smart offices" || t === "smart_offices") return "SMART OFFICES"
  if (t === "automatizacion" || t === "rpa") return "RPA"
  if (t === "mps") return "MPS"
  return "DAAS"
}

// ─── Configuración Microsoft Graph (adaptado a tu .env.local) ───
const CLIENT_ID = process.env.MICROSOFT_CLIENT_ID!
const CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET!
const TENANT_ID = process.env.MICROSOFT_TENANT_ID!
const EMAIL_FROM = process.env.MICROSOFT_SENDER_EMAIL!          // marrano@ofimundo.cl
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
    const nombre = String(body.nombreCompleto ?? "").trim()
    const email = String(body.email ?? "").trim()
    const telefono = String(body.telefono ?? "").trim()
    const empresa = String(body.empresa ?? "").trim()
    const rutEmpresa = String(body.rutEmpresa ?? body.rut ?? "").trim()

    if (!TIPOS_VALIDOS.has(tipo) || !nombre || !telefono || !empresa || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Completa correctamente los datos obligatorios" }, { status: 400 })
    }

    const tipoContactoSoftland = mapTipoSoftland(tipo)

    // 1. Inyectar evento en Softland CRM vía Stored Procedure [SOFTLAND].[PA_INS_SITIO_OFIMUNDO_V2]
    let softlandResponse = { success: false, message: "" }
    try {
      softlandResponse = await injectSoftlandCotizacion({
        rut_empresa: rutEmpresa || empresa,
        nombre_empresa: empresa,
        nombre_completo: nombre,
        telefono: telefono,
        correo_electronico: email,
        tipo_contacto: tipoContactoSoftland,
      })
      console.log("[Softland CRM] Resultado de inyección:", softlandResponse)
    } catch (softlandErr) {
      console.error("[Softland CRM] Error al ejecutar Stored Procedure:", softlandErr)
    }

    // 2. Enviar notificación por correo vía Microsoft Graph API (si está configurado)
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

        const htmlBody = `<main style="font-family:Arial,sans-serif;color:#17143b"><h1>Nueva solicitud de cotización (${escapeHtml(tipoContactoSoftland)})</h1><p><strong>Cliente:</strong> ${escapeHtml(nombre)} · ${escapeHtml(empresa)} (RUT: ${escapeHtml(rutEmpresa || "No ingresado")})</p><p><strong>Contacto:</strong> ${escapeHtml(email)} · ${escapeHtml(telefono)}</p><table style="border-collapse:collapse;width:100%">${rows}</table></main>`
        const textBody = `Nueva solicitud de cotización (${tipoContactoSoftland})\nCliente: ${nombre}\nEmpresa: ${empresa}\nRUT: ${rutEmpresa}\nEmail: ${email}\nTeléfono: ${telefono}\n\n${textDetails}`

        const token = await getGraphToken()
        emailResult = await sendMailGraph(token, {
          subject: `Nueva cotización ${tipoContactoSoftland} — ${empresa}`,
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
      softland: softlandResponse,
    })
  } catch (error) {
    console.error("[Cotizaciones] No fue posible procesar la solicitud", error)
    return NextResponse.json({ error: "No pudimos enviar la cotización. Intenta nuevamente." }, { status: 500 })
  }
}

