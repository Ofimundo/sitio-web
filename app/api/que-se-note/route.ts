import { NextResponse } from "next/server"
import { ConfidentialClientApplication } from "@azure/msal-node"

export const runtime = "nodejs"

const CLIENT_ID = process.env.MICROSOFT_CLIENT_ID
const CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET
const TENANT_ID = process.env.MICROSOFT_TENANT_ID
const EMAIL_FROM = process.env.MICROSOFT_SENDER_EMAIL || "sistemasdigitales@ofimundo.cl"
const GRAPH_BASE_URL = "https://graph.microsoft.com/v1.0"
const QUE_SE_NOTE_API_URL = process.env.QUE_SE_NOTE_API_URL

const NOTIFICATION_EMAILS = ["ahernandez@ofimundo.cl", "mdiaz@ofimundo.cl"]

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

async function getGraphToken(): Promise<string | null> {
  if (!CLIENT_ID || !CLIENT_SECRET || !TENANT_ID) return null
  try {
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
    return result?.accessToken || null
  } catch (err) {
    console.warn("No se pudo obtener token de Graph para Que Se Note:", err)
    return null
  }
}

async function sendNotificationEmail(data: {
  remitente: string
  destinatario: string
  competencia: string
  accion_excepcional: string
  relacion_competencia: string
  impacto_generado: string
}) {
  const token = await getGraphToken()
  if (!token) return

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f0efea; padding: 30px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
      <h1 style="color: #C8F000; font-size: 28px; margin-bottom: 20px; text-transform: uppercase;">Nuevo Reconocimiento — Que Se Note</h1>
      
      <p style="font-size: 16px; line-height: 1.5; color: #f0efea;">
        <strong>Remitente:</strong> ${escapeHtml(data.remitente)}
      </p>
      <p style="font-size: 16px; line-height: 1.5; color: #f0efea;">
        <strong>Colaborador Reconocido:</strong> ${escapeHtml(data.destinatario)}
      </p>
      <p style="font-size: 16px; line-height: 1.5; color: #f0efea;">
        <strong>Competencia:</strong> <span style="color: #C8F000;">${escapeHtml(data.competencia)}</span>
      </p>

      <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />

      <h3 style="color: #C8F000; font-size: 16px; text-transform: uppercase;">Acción Excepcional</h3>
      <p style="font-size: 14px; line-height: 1.6; color: rgba(240,239,234,0.85); background: #181810; padding: 15px; border-radius: 8px;">
        ${escapeHtml(data.accion_excepcional)}
      </p>

      <h3 style="color: #C8F000; font-size: 16px; text-transform: uppercase; margin-top: 20px;">Relación con la Competencia</h3>
      <p style="font-size: 14px; line-height: 1.6; color: rgba(240,239,234,0.85); background: #181810; padding: 15px; border-radius: 8px;">
        ${escapeHtml(data.relacion_competencia)}
      </p>

      <h3 style="color: #C8F000; font-size: 16px; text-transform: uppercase; margin-top: 20px;">Impacto Generado</h3>
      <p style="font-size: 14px; line-height: 1.6; color: rgba(240,239,234,0.85); background: #181810; padding: 15px; border-radius: 8px;">
        ${escapeHtml(data.impacto_generado)}
      </p>

      <p style="margin-top: 30px; font-size: 12px; color: rgba(240,239,234,0.45); text-align: center;">
        Programa de Reconocimiento Que Se Note · Ofimundo / Dreamtec / Global Horizon / Hiway
      </p>
    </div>
  `

  const body = {
    message: {
      subject: `[Que Se Note] Nuevo reconocimiento para ${data.destinatario}`,
      from: {
        emailAddress: { address: EMAIL_FROM, name: "Que Se Note" },
      },
      toRecipients: NOTIFICATION_EMAILS.map((email) => ({
        emailAddress: { address: email, name: email },
      })),
      body: {
        contentType: "html",
        content: htmlBody,
      },
    },
    saveToSentItems: true,
  }

  await fetch(`${GRAPH_BASE_URL}/users/${encodeURIComponent(EMAIL_FROM)}/sendMail`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function POST(request: Request) {
  try {
    let remitente = ""
    let destinatario = ""
    let competencia = ""
    let accion_excepcional = ""
    let relacion_competencia = ""
    let impacto_generado = ""

    const contentType = request.headers.get("content-type") || ""

    if (contentType.includes("application/json")) {
      const json = await request.json()
      remitente = String(json.remitente || "").trim()
      destinatario = String(json.destinatario || "").trim()
      competencia = String(json.competencia || "").trim()
      accion_excepcional = String(json.accion_excepcional || "").trim()
      relacion_competencia = String(json.relacion_competencia || "").trim()
      impacto_generado = String(json.impacto_generado || "").trim()
    } else {
      const formData = await request.formData()
      remitente = String(formData.get("remitente") || "").trim()
      destinatario = String(formData.get("destinatario") || "").trim()
      competencia = String(formData.get("competencia") || "").trim()
      accion_excepcional = String(formData.get("accion_excepcional") || "").trim()
      relacion_competencia = String(formData.get("relacion_competencia") || "").trim()
      impacto_generado = String(formData.get("impacto_generado") || "").trim()
    }

    if (!remitente || !destinatario || !competencia || !accion_excepcional || !relacion_competencia || !impacto_generado) {
      return NextResponse.json(
        { status: 400, error: "Por favor completa todos los campos del reconocimiento." },
        { status: 400 }
      )
    }

    const payload = {
      remitente,
      destinatario,
      competencia,
      accion_excepcional,
      relacion_competencia,
      impacto_generado,
      correos_notificacion: NOTIFICATION_EMAILS.join(", "),
    }

    // 1. Si existe endpoint configurado para enviar datos a la API / CRM
    if (QUE_SE_NOTE_API_URL) {
      try {
        await fetch(QUE_SE_NOTE_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } catch (apiErr) {
        console.warn("Advertencia al enviar a QUE_SE_NOTE_API_URL:", apiErr)
      }
    }

    // 2. Enviar notificación por correo con Microsoft Graph si está configurado
    try {
      await sendNotificationEmail(payload)
    } catch (emailErr) {
      console.warn("Advertencia al enviar correo de notificación:", emailErr)
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "¡El reconocimiento ha sido enviado con éxito!",
    })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Error inesperado"
    console.error("Error procesando reconocimiento:", err)
    return NextResponse.json(
      { status: 500, error: "Error en el servidor al enviar el reconocimiento: " + errorMsg },
      { status: 500 }
    )
  }
}

