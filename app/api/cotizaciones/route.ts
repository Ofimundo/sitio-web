import { NextResponse } from "next/server"
import { ConfidentialClientApplication } from "@azure/msal-node"

export const runtime = "nodejs"

const DESTINATARIO = "amoris@ofimundo.cl"
const TIPOS_VALIDOS = new Set(["sala", "mps", "automatizacion"])

// ─── Configuración Microsoft Graph (adaptado a tu .env.local) ───
const CLIENT_ID = process.env.MICROSOFT_CLIENT_ID!
const CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET!
const TENANT_ID = process.env.MICROSOFT_TENANT_ID!
const EMAIL_FROM = process.env.MICROSOFT_SENDER_EMAIL!          // amoris@ofimundo.cl
const GRAPH_BASE_URL = "https://graph.microsoft.com/v1.0"

const cca = new ConfidentialClientApplication({
  auth: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
  },
})

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

    if (!TIPOS_VALIDOS.has(tipo) || !nombre || !telefono || !empresa || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Completa correctamente los datos obligatorios" }, { status: 400 })
    }

    if (!CLIENT_ID || !CLIENT_SECRET || !TENANT_ID || !EMAIL_FROM) {
      return NextResponse.json({ error: "El servicio de correo no está configurado" }, { status: 503 })
    }

    const excluded = new Set(["nombreCompleto", "email", "telefono", "empresa"])
    const details = Object.entries(body).filter(([key]) => !excluded.has(key))
    const rows = details
      .map(
        ([key, value]) =>
          `<tr><th style="padding:8px;text-align:left;border-bottom:1px solid #ddd">${escapeHtml(label(key))}</th><td style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(formatValue(value))}</td></tr>`
      )
      .join("")
    const textDetails = details.map(([key, value]) => `${label(key)}: ${formatValue(value)}`).join("\n")

    const htmlBody = `<main style="font-family:Arial,sans-serif;color:#17143b"><h1>Nueva solicitud de cotización</h1><p><strong>Cliente:</strong> ${escapeHtml(nombre)} · ${escapeHtml(empresa)}</p><p><strong>Contacto:</strong> ${escapeHtml(email)} · ${escapeHtml(telefono)}</p><table style="border-collapse:collapse;width:100%">${rows}</table></main>`
    const textBody = `Nueva solicitud de cotización\nCliente: ${nombre}\nEmpresa: ${empresa}\nEmail: ${email}\nTeléfono: ${telefono}\n\n${textDetails}`

    const token = await getGraphToken()
    const result = await sendMailGraph(token, {
      subject: `Nueva cotización ${tipo.toUpperCase()} — ${empresa}`,
      from: EMAIL_FROM,
      to: DESTINATARIO,
      replyTo: email,
      htmlBody,
      textBody,
    })

    return NextResponse.json({ success: true, id: result.messageId })
  } catch (error) {
    console.error("[Cotizaciones] No fue posible enviar la solicitud", error)
    return NextResponse.json({ error: "No pudimos enviar la cotización. Intenta nuevamente." }, { status: 500 })
  }
}