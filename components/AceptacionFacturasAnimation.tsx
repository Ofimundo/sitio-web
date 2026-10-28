'use client'

import { useEffect, useRef, useState } from "react"
import { isAceptacionFacturasAnimation } from "@/lib/automatizaciones-helpers"

export { isAceptacionFacturasAnimation }

const statusTexts = [
  "Procesando datos fiscales...",
  "Verificando montos válidos...",
  "Comprobando duplicados...",
  "Validando formato DIAT/XML...",
]

export function AceptacionFacturasAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current
        const scaleX = clientWidth / 360
        const scaleY = clientHeight / 500
        const newScale = Math.min(scaleX, scaleY > 0 ? scaleY : scaleX)
        setScale(newScale > 0 ? newScale : 1)
      }
    }

    handleResize()
    const resizeObserver = new ResizeObserver(handleResize)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatusIndex((prev) => (prev + 1) % statusTexts.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const progressPercentage = (currentStatusIndex + 1) * 25

  return (
    <div
      ref={containerRef}
      className="factura-anim-container relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-b from-slate-50 via-slate-100/90 to-blue-50/50 p-2"
    >
      <style dangerouslySetInnerHTML={{ __html: animationCss }} />
      <div
        className="scene-scale-wrapper relative flex items-center justify-center overflow-hidden"
        style={{
          width: 360,
          height: 500,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
        }}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-between p-4">
          
          {/* Background Decor Blobs */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Header Status Bar */}
          <div className="w-full flex items-center justify-between z-20 px-1 pt-1">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-500 bg-slate-200/80 px-2.5 py-0.5 rounded-full">
                Flujo Automatizado Activo
              </span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] font-medium text-slate-400">
              <i className="fa-solid fa-bolt text-amber-500" />
              <span>Tiempo real: 0.4s</span>
            </div>
          </div>

          {/* SVG Connection Lines (Vertical Flow Top to Bottom) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 360 500" preserveAspectRatio="none">
            {/* Path 1: Step 1 to Step 2 */}
            <path d="M 180 150 L 180 205" fill="none" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
            <path d="M 180 150 L 180 205" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" className="flowing-path-vertical" />

            {/* Path 2: Step 2 to Step 3 */}
            <path d="M 180 320 L 180 370" fill="none" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
            <path d="M 180 320 L 180 370" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" className="flowing-path-vertical" />
          </svg>

          {/* Main Vertical Workflow Column */}
          <div className="relative w-full flex-1 flex flex-col items-center justify-between z-10 py-3">

            {/* STEP 1: Invoice Inbox */}
            <div className="flex flex-col items-center relative w-full">
              <div className="relative w-64 h-28 glass-card rounded-xl p-3 flex flex-row items-center justify-between shadow-lg animate-float border-blue-100">
                <div className="flex flex-col justify-between h-full space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">FACTURA</span>
                    <span className="text-[10px] font-semibold text-slate-700">DOC-2026-891</span>
                  </div>
                  <div className="space-y-1.5 w-32">
                    <div className="h-1.5 w-full bg-slate-200 rounded-full" />
                    <div className="h-1.5 w-3/4 bg-slate-200 rounded-full" />
                    <div className="h-1.5 w-1/2 bg-slate-200 rounded-full" />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center p-2.5 bg-blue-50/80 rounded-xl border border-blue-100/60">
                  <i className="fa-solid fa-file-invoice text-blue-600 text-2xl" />
                </div>
              </div>

              <div className="mt-1 bg-white/95 backdrop-blur px-2.5 py-0.5 rounded-md shadow-xs border border-slate-100 flex items-center space-x-1">
                <i className="fa-solid fa-cloud-arrow-down text-blue-500 text-[9px]" />
                <span className="text-[9px] font-semibold text-slate-700">Recepción XML</span>
              </div>
            </div>

            {/* STEP 2: Central AI Validation Engine */}
            <div className="flex flex-col items-center relative w-full my-2">
              <div className="relative w-72 h-32 glass-dark rounded-xl p-3.5 flex flex-col justify-between shadow-xl animate-pulse-glow overflow-hidden border border-blue-500/30">
                <div className="laser-scan" />

                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" />
                    <span className="text-[9px] font-bold text-blue-300 tracking-wider">VALIDANDO</span>
                  </div>
                  <i className="fa-solid fa-microchip text-blue-400 text-lg" />
                </div>

                <div className="my-auto z-10 flex items-center space-x-3 px-1">
                  <div className="inline-flex shrink-0 items-center justify-center w-9 h-9 bg-blue-500/20 rounded-lg border border-blue-400/30 text-blue-300">
                    <i className="fa-solid fa-wand-magic-sparkles text-sm animate-spin" style={{ animationDuration: "6s" }} />
                  </div>
                  <div className="text-[11px] font-medium text-slate-200 transition-opacity duration-200 text-left">
                    {statusTexts[currentStatusIndex]}
                  </div>
                </div>

                <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden z-10">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="mt-1 bg-white/95 backdrop-blur px-2.5 py-0.5 rounded-md shadow-xs border border-slate-100 flex items-center space-x-1">
                <i className="fa-solid fa-shield-check text-indigo-500 text-[9px]" />
                <span className="text-[9px] font-semibold text-slate-700">Validación Automática</span>
              </div>
            </div>

            {/* STEP 3: Business Rules & Successful Acceptance */}
            <div className="flex flex-col items-center relative w-full">
              <div className="relative w-64 h-28 glass-card rounded-xl p-3 flex flex-row items-center justify-between shadow-lg border border-emerald-200 bg-gradient-to-b from-white to-emerald-50/50">
                <div className="flex flex-col justify-between h-full space-y-1">
                  <span className="text-[8px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full w-max">
                    COMPLETADO
                  </span>
                  <div className="text-[11px] font-bold text-slate-800 tracking-tight">FACTURA ACEPTADA</div>
                  <span className="text-[9px] text-slate-500">Montos y Rut válidos</span>
                  <div className="text-[8px] font-semibold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded-xs w-max">
                    ✔ Aprobado por AI
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-xs shadow-emerald-500/30">
                    <i className="fa-solid fa-check text-xl" />
                  </div>
                </div>
              </div>

              <div className="mt-1 bg-white/95 backdrop-blur px-2.5 py-0.5 rounded-md shadow-xs border border-slate-100 flex items-center space-x-1">
                <i className="fa-solid fa-list-check text-emerald-500 text-[9px]" />
                <span className="text-[9px] font-semibold text-slate-700">Reglas OK</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

const animationCss = `
.factura-anim-container .glass-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.75);
  box-shadow: 0 10px 25px rgba(30, 41, 59, 0.07);
}

.factura-anim-container .glass-dark {
  background: rgba(15, 23, 42, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

@keyframes floatSlow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 12px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 22px rgba(59, 130, 246, 0.6); }
}

@keyframes scanLaser {
  0% { top: 0%; opacity: 0.8; }
  50% { opacity: 1; }
  100% { top: 100%; opacity: 0.8; }
}

.factura-anim-container .animate-float {
  animation: floatSlow 4s ease-in-out infinite;
}

.factura-anim-container .animate-pulse-glow {
  animation: pulseGlow 3s ease-in-out infinite;
}

.factura-anim-container .laser-scan {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  box-shadow: 0 0 8px #3b82f6;
  animation: scanLaser 2s ease-in-out infinite;
}

@keyframes dashMoveVertical {
  to {
    stroke-dashoffset: -24;
  }
}

.factura-anim-container .flowing-path-vertical {
  stroke-dasharray: 8, 8;
  animation: dashMoveVertical 1.5s linear infinite;
}
`
