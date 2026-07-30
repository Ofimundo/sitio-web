import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

const DESTINATARIO = "amoris@ofimundo.cl"
const TIPOS_VALIDOS = new Set(["sala", "mps", "automatizacion"])

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
  if (isRecord(value)) return Object.entries(value).map(([key, item]) => `${label(key)}: ${formatValue(item)}`).join(" · ")
  return String(value ?? "Sin información")
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

    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.EMAIL_FROM
    if (!apiKey || !from) return NextResponse.json({ error: "El servicio de correo no está configurado" }, { status: 503 })

    const excluded = new Set(["nombreCompleto", "email", "telefono", "empresa"])
    const details = Object.entries(body).filter(([key]) => !excluded.has(key))
    const rows = details.map(([key, value]) => `<tr><th style="padding:8px;text-align:left;border-bottom:1px solid #ddd">${escapeHtml(label(key))}</th><td style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(formatValue(value))}</td></tr>`).join("")
    const textDetails = details.map(([key, value]) => `${label(key)}: ${formatValue(value)}`).join("\n")

    const resend = new Resend(apiKey)
    const result = await resend.emails.send({
      from,
      to: DESTINATARIO,
      replyTo: email,
      subject: `Nueva cotización ${tipo.toUpperCase()} — ${empresa}`,
      html: `<main style="font-family:Arial,sans-serif;color:#17143b"><h1>Nueva solicitud de cotización</h1><p><strong>Cliente:</strong> ${escapeHtml(nombre)} · ${escapeHtml(empresa)}</p><p><strong>Contacto:</strong> ${escapeHtml(email)} · ${escapeHtml(telefono)}</p><table style="border-collapse:collapse;width:100%">${rows}</table></main>`,
      text: `Nueva solicitud de cotización\nCliente: ${nombre}\nEmpresa: ${empresa}\nEmail: ${email}\nTeléfono: ${telefono}\n\n${textDetails}`,
      headers: { "X-Entity-Ref-ID": crypto.randomUUID() },
    })

    if (result.error) throw new Error(result.error.message)
    return NextResponse.json({ success: true, id: result.data?.id })
  } catch (error) {
    console.error("[Cotizaciones] No fue posible enviar la solicitud", error)
    return NextResponse.json({ error: "No pudimos enviar la cotización. Intenta nuevamente." }, { status: 500 })
  }
}
