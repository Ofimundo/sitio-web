'use client'

import { useEffect, useRef, useState } from "react"
import { isGestionCuentasAnimation } from "@/lib/automatizaciones-helpers"

export { isGestionCuentasAnimation }

export function GestionCuentasAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [currentStation, setCurrentStation] = useState(1)
  const [pagoProgress, setPagoProgress] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current
        const scaleX = clientWidth / 360
        const scaleY = clientHeight / 520
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
      setCurrentStation((prev) => (prev >= 4 ? 1 : prev + 1))
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (currentStation === 3) {
      setPagoProgress(0)
      const timer = setInterval(() => {
        setPagoProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer)
            return 100
          }
          return prev + 25
        })
      }, 150)
      return () => clearInterval(timer)
    }
  }, [currentStation])

  const getWorkflowStatusText = () => {
    switch (currentStation) {
      case 1:
        return "Paso 1: Registro Automático"
      case 2:
        return "Paso 2: Reglas y Aprobación"
      case 3:
        return "Paso 3: Gestión y Pago"
      case 4:
        return "Paso 4: Reportes"
      default:
        return "Gestión de Cuentas Básicas"
    }
  }

  return (
    <div
      ref={containerRef}
      className="gestion-cuentas-anim-container relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-b from-slate-50 via-slate-100/90 to-blue-50/50 p-2"
    >
      <style dangerouslySetInnerHTML={{ __html: animationCss }} />
      <div
        className="scene-scale-wrapper relative flex items-center justify-center overflow-hidden"
        style={{
          width: 360,
          height: 520,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
        }}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-between p-3.5">
          
          {/* Background Decor Blobs */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Header Status Bar */}
          <div className="w-full flex items-center justify-between z-20 px-1 pt-1">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-ping" />
              <div>
                <h2 className="text-[11px] font-bold text-slate-800 tracking-tight leading-tight">Gestión de Cuentas Básicas</h2>
                <p className="text-[9px] text-slate-500">Gestión y pago en tiempo real</p>
              </div>
            </div>
            <div className="flex items-center space-x-1.5 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs">
              <i className="fa-solid fa-file-invoice-dollar text-blue-600 text-[10px]" />
              <span className="text-[9.5px] font-semibold text-slate-700">{getWorkflowStatusText()}</span>
            </div>
          </div>

          {/* Vertical Connecting SVG Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 360 520" preserveAspectRatio="none">
            {/* Station 1 -> Station 2 */}
            <path d="M 180 135 L 180 175" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
            <path d="M 180 135 L 180 175" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" className="flowing-path-vertical" />

            {/* Station 2 -> Station 3 */}
            <path d="M 180 250 L 180 290" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
            <path d="M 180 250 L 180 290" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" className="flowing-path-vertical" />

            {/* Station 3 -> Station 4 */}
            <path d="M 180 365 L 180 405" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
            <path d="M 180 365 L 180 405" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" className="flowing-path-vertical" />
          </svg>

          {/* Vertical Timeline Workflow Column */}
          <div className="relative w-full flex-1 flex flex-col items-center justify-between z-10 py-2">

            {/* STATION 1: Registro Automático */}
            <div className={`station-card w-full rounded-xl p-3 flex flex-col justify-between relative shadow-xs transition-all duration-300 ${currentStation === 1 ? "active" : currentStation > 1 ? "completed" : ""}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Fase 01</span>
                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <i className="fa-solid fa-file-invoice text-[10px]" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 text-slate-800 font-bold text-[11px]">
                    <i className="fa-solid fa-file-circle-check text-blue-500 text-[10px]" />
                    <span>Registro Automático</span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5">Cuentas por pagar registradas</p>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-md px-2 py-1 flex items-center space-x-1 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[8.5px] font-semibold text-blue-700">Documento OK</span>
                </div>
              </div>
            </div>

            {/* STATION 2: Reglas y Aprobación */}
            <div className={`station-card w-full rounded-xl p-3 flex flex-col justify-between relative shadow-xs transition-all duration-300 ${currentStation === 2 ? "active" : currentStation > 2 ? "completed" : ""}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Fase 02</span>
                <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <i className="fa-solid fa-sliders text-[10px]" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 text-slate-800 font-bold text-[11px]">
                    <i className="fa-solid fa-list-check text-indigo-500 text-[10px]" />
                    <span>Reglas y Aprobación</span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5">Control presupuestario y reglas</p>
                </div>
                {currentStation >= 2 ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-md px-2 py-1 flex items-center space-x-1 shrink-0">
                    <i className="fa-solid fa-circle-check text-emerald-600 text-[10px]" />
                    <span className="text-[8.5px] font-bold text-emerald-700">Reglas aprobadas OK</span>
                  </div>
                ) : (
                  <div className="bg-indigo-50 border border-indigo-100 rounded-md px-2 py-1 flex items-center space-x-1 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-[8.5px] font-semibold text-indigo-700">En espera...</span>
                  </div>
                )}
              </div>
            </div>

            {/* STATION 3: Gestión y Pago */}
            <div className={`station-card w-full rounded-xl p-3 flex flex-col justify-between relative shadow-xs transition-all duration-300 ${currentStation === 3 ? "active" : currentStation > 3 ? "completed" : ""}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Fase 03</span>
                <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-xs">
                  <i className="fa-solid fa-credit-card text-[10px]" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 text-slate-800 font-bold text-[11px]">
                    <i className="fa-solid fa-money-bill-wave text-purple-500 text-[10px]" />
                    <span>Gestión y Pago</span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5">Programación y ejecución de pago</p>
                </div>
                <div className="w-28 space-y-1">
                  <div className="flex justify-between text-[8px] font-semibold text-slate-600">
                    <span>Pago</span>
                    <span>{currentStation > 3 ? "100%" : `${pagoProgress}%`}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-purple-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${currentStation > 3 ? 100 : pagoProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* STATION 4: Reportes */}
            <div className={`station-card w-full rounded-xl p-3 flex flex-col justify-between relative shadow-xs transition-all duration-300 pulse-ledger bg-gradient-to-b from-white to-emerald-50/40 ${currentStation === 4 ? "active" : ""}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Fase 04</span>
                <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <i className="fa-solid fa-chart-column text-[10px]" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 text-slate-800 font-bold text-[11px]">
                    <i className="fa-solid fa-file-lines text-emerald-500 text-[10px]" />
                    <span>Reportes</span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5">Métricas y trazabilidad consolidada</p>
                </div>
                {currentStation === 4 ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-md px-2 py-1 flex items-center space-x-1 shrink-0">
                    <i className="fa-solid fa-circle-check text-emerald-600 text-[10px]" />
                    <span className="text-[8.5px] font-bold text-emerald-700">✔ Reporte emitido</span>
                  </div>
                ) : (
                  <div className="bg-slate-100 border border-slate-200 rounded-md px-2 py-1 flex items-center space-x-1 shrink-0">
                    <i className="fa-solid fa-clock text-slate-400 text-[9px]" />
                    <span className="text-[8.5px] font-semibold text-slate-500">En espera</span>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

const animationCss = `
.gestion-cuentas-anim-container .station-card {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #e2e8f0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.gestion-cuentas-anim-container .station-card.active {
  border-color: #3b82f6;
  box-shadow: 0 8px 24px -4px rgba(59, 130, 246, 0.25);
  transform: translateY(-2px);
}

@keyframes pulseLedger {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.gestion-cuentas-anim-container .pulse-ledger {
  animation: pulseLedger 2.5s ease-in-out infinite;
}

@keyframes flowingVertical {
  0% { stroke-dashoffset: 40; }
  100% { stroke-dashoffset: 0; }
}

.gestion-cuentas-anim-container .flowing-path-vertical {
  stroke-dasharray: 6 6;
  animation: flowingVertical 1.4s linear infinite;
}
`
