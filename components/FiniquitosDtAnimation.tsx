'use client'

import { useEffect, useRef, useState } from "react"
import { isFiniquitosDtAnimation } from "@/lib/automatizaciones-helpers"

export { isFiniquitosDtAnimation }

export function FiniquitosDtAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [currentStep, setCurrentStep] = useState(1)
  const [calcProgress, setCalcProgress] = useState(0)

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
      setCurrentStep((prev) => (prev >= 4 ? 1 : prev + 1))
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (currentStep === 2) {
      setCalcProgress(0)
      const calcInterval = setInterval(() => {
        setCalcProgress((prev) => {
          if (prev >= 100) {
            clearInterval(calcInterval)
            return 100
          }
          return prev + 25
        })
      }, 200)
      return () => clearInterval(calcInterval)
    }
  }, [currentStep])

  const getGlobalStatusText = () => {
    switch (currentStep) {
      case 1:
        return "Paso 1: Validación Laboral"
      case 2:
        return "Paso 2: Cálculo de finiquito en proceso"
      case 3:
        return "Paso 3: Aprobación RR.HH."
      case 4:
        return "Paso 4: Envío a la DT"
      default:
        return "Centro de Automatización DT"
    }
  }

  return (
    <div
      ref={containerRef}
      className="finiquitos-anim-container relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-b from-slate-50 via-slate-100/90 to-indigo-50/40 p-2"
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
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Header Status Bar */}
          <div className="w-full flex items-center justify-between z-20 px-1 pt-1">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-ping" />
              <div>
                <h2 className="text-[11px] font-bold text-slate-800 tracking-tight leading-tight">Centro Automatización DT</h2>
                <p className="text-[9px] text-slate-500">Procesamiento en tiempo real</p>
              </div>
            </div>
            <div className="flex items-center space-x-1.5 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs">
              <i className="fa-solid fa-shield-halved text-indigo-600 text-[10px]" />
              <span className="text-[9.5px] font-semibold text-slate-700">{getGlobalStatusText()}</span>
            </div>
          </div>

          {/* Vertical Connecting SVG Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 360 520" preserveAspectRatio="none">
            {/* Step 1 -> Step 2 */}
            <path d="M 180 135 L 180 175" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
            <path d="M 180 135 L 180 175" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" className="flowing-path-vertical" />

            {/* Step 2 -> Step 3 */}
            <path d="M 180 250 L 180 290" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
            <path d="M 180 250 L 180 290" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" className="flowing-path-vertical" />

            {/* Step 3 -> Step 4 */}
            <path d="M 180 365 L 180 405" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
            <path d="M 180 365 L 180 405" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" className="flowing-path-vertical" />
          </svg>

          {/* Vertical Timeline Workflow Column */}
          <div className="relative w-full flex-1 flex flex-col items-center justify-between z-10 py-2">

            {/* STEP 1: Validación Laboral */}
            <div className={`glass-step w-full rounded-xl p-3 flex flex-col justify-between relative shadow-xs transition-all duration-300 ${currentStep === 1 ? "active" : currentStep > 1 ? "completed" : ""}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Fase 01</span>
                <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <i className="fa-solid fa-id-card-clip text-[10px]" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 text-slate-800 font-bold text-[11px]">
                    <i className="fa-solid fa-user-check text-indigo-500 text-[10px]" />
                    <span>Validación Laboral</span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5">Verificación de trabajador y causales</p>
                </div>
                <div className="bg-indigo-50/80 border border-indigo-100 rounded-md px-2 py-1 flex items-center space-x-1 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-[8.5px] font-semibold text-indigo-700">Rut & Contrato OK</span>
                </div>
              </div>
            </div>

            {/* STEP 2: Cálculo de finiquito */}
            <div className={`glass-step w-full rounded-xl p-3 flex flex-col justify-between relative shadow-xs transition-all duration-300 ${currentStep === 2 ? "active" : currentStep > 2 ? "completed" : ""}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Fase 02</span>
                <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-xs">
                  <i className="fa-solid fa-calculator text-[10px] animate-spin-slow" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 text-slate-800 font-bold text-[11px]">
                    <i className="fa-solid fa-coins text-purple-500 text-[10px]" />
                    <span>Cálculo de finiquito</span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5">Indemnización y vacaciones</p>
                </div>
                <div className="w-28 space-y-1">
                  <div className="flex justify-between text-[8px] font-semibold text-slate-600">
                    <span>Progreso</span>
                    <span>{currentStep > 2 ? "100%" : `${calcProgress}%`}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${currentStep > 2 ? 100 : calcProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: Aprobación RR.HH. */}
            <div className={`glass-step w-full rounded-xl p-3 flex flex-col justify-between relative shadow-xs transition-all duration-300 ${currentStep === 3 ? "active" : currentStep > 3 ? "completed" : ""}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Fase 03</span>
                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <i className="fa-solid fa-users-gear text-[10px]" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 text-slate-800 font-bold text-[11px]">
                    <i className="fa-solid fa-stamp text-blue-500 text-[10px]" />
                    <span>Aprobación RR.HH.</span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5">Trazabilidad y firma digital</p>
                </div>
                {currentStep >= 3 ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-md px-2 py-1 flex items-center space-x-1 shrink-0">
                    <i className="fa-solid fa-circle-check text-emerald-600 text-[10px]" />
                    <span className="text-[8.5px] font-extrabold text-emerald-700">¡GENERADO Y APROBADO!</span>
                  </div>
                ) : (
                  <div className="bg-blue-50/70 border border-blue-100 rounded-md px-2 py-1 flex items-center space-x-1 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[8.5px] font-semibold text-blue-700">En espera...</span>
                  </div>
                )}
              </div>
            </div>

            {/* STEP 4: Envío a la DT */}
            <div className={`glass-step w-full rounded-xl p-3 flex flex-col justify-between relative shadow-xs transition-all duration-300 ${currentStep === 4 ? "active completed" : ""}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Fase 04</span>
                <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <i className="fa-solid fa-paper-plane text-[10px]" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 text-slate-800 font-bold text-[11px]">
                    <i className="fa-solid fa-envelope-circle-check text-emerald-500 text-[10px]" />
                    <span>Envío a la DT</span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5">Despacho vía Email & SMS</p>
                </div>
                {currentStep === 4 ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-md px-2 py-1 flex items-center space-x-1 shrink-0">
                    <i className="fa-solid fa-paper-plane text-emerald-600 text-[10px] animate-bounce" />
                    <span className="text-[8.5px] font-extrabold text-emerald-700">¡Enviado a la DT!</span>
                  </div>
                ) : (
                  <div className="bg-slate-100 border border-slate-200 rounded-md px-2 py-1 flex items-center space-x-1 shrink-0">
                    <i className="fa-solid fa-clock text-slate-400 text-[9px]" />
                    <span className="text-[8.5px] font-semibold text-slate-500">En cola</span>
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
.finiquitos-anim-container .glass-step {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(226, 232, 240, 0.85);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.finiquitos-anim-container .glass-step.active {
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.06) 0%, rgba(99, 102, 241, 0.12) 100%);
  border-color: #6366f1;
  box-shadow: 0 8px 24px -4px rgba(99, 102, 241, 0.25);
  transform: translateY(-2px);
}

.finiquitos-anim-container .glass-step.completed {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(52, 211, 153, 0.1) 100%);
  border-color: #34d399;
}

@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.finiquitos-anim-container .animate-spin-slow {
  animation: spinSlow 10s linear infinite;
}

@keyframes dashMoveVertical {
  to {
    stroke-dashoffset: -24;
  }
}

.finiquitos-anim-container .flowing-path-vertical {
  stroke-dasharray: 8, 8;
  animation: dashMoveVertical 1.5s linear infinite;
}
`
