'use client'

import { useEffect, useRef, useState } from "react"
import { isGestionCuentasAnimation } from "@/lib/automatizaciones-helpers"

export { isGestionCuentasAnimation }

export function GestionCuentasAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current
        const scaleX = clientWidth / 920
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

  return (
    <div
      ref={containerRef}
      className="gestion-cuentas-anim-container relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-b from-[#fafbff] to-[#edf2fb]"
    >
      <style dangerouslySetInnerHTML={{ __html: animationCss }} />
      <div
        className="scene-scale-wrapper flex items-center justify-center"
        style={{
          width: 920,
          height: 520,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
        }}
      >
        <div className="scene">
          <div className="panel p1">
            <div className="title">✔ Validación automática</div>
            <div className="text">Facturas y documentos tributarios</div>
          </div>

          <div className="panel p2">
            <div className="title">⚖ Reglas contables</div>
            <div className="text">Centros de costo, cuentas, impuestos y aceptación automática.</div>
          </div>

          <div className="panel p3">
            <div className="title">👥 Flujo de aprobación</div>
            <div className="text">Aprobaciones, alertas y trazabilidad completa.</div>
          </div>

          <div className="panel p4">
            <div style={{ fontSize: "28px" }}>📊</div>
            <div className="text">Reportes diarios y mensuales</div>
          </div>

          <div className="tray">
            <div className="paper" />
            <div className="paper" />
            <div className="paper" />
          </div>

          <div className="belt" />

          <div className="machine">
            <div className="screen">
              <div className="icon">📚</div>
              <h3>Contabilizando</h3>
              <span>Asiento automático</span>
            </div>
            <div className="light" />
          </div>

          <div className="doc move1">FACTURA</div>
          <div className="doc move2">FACTURA</div>

          <div className="output">
            <div className="ledger">
              <h4>LIBRO DIARIO</h4>

              <div className="line" />
              <div className="line" />
              <div className="line" />
              <div className="line" />

              <div className="tag">✓ CONTABILIZADO</div>
            </div>

            <div className="dot d1" />
            <div className="dot d2" />
            <div className="dot d3" />
            <div className="dot d4" />
          </div>

          <svg viewBox="0 0 920 520">
            <path className="path" d="M145 255 C220 255,250 185,325 125" />
            <path className="flow" d="M145 255 C220 255,250 185,325 125" />

            <path className="path" d="M430 120 C560 85,650 90,760 135" />
            <path className="flow" d="M430 120 C560 85,650 90,760 135" />

            <path className="path" d="M430 300 C360 390,300 420,260 395" />
            <path className="flow" d="M430 300 C360 390,300 420,260 395" />

            <path className="path" d="M585 235 C630 235,660 235,710 235" />
            <path className="flow" d="M585 235 C630 235,660 235,710 235" />
          </svg>
        </div>
      </div>
    </div>
  )
}

const animationCss = `
.gestion-cuentas-anim-container .scene {
    width: 920px;
    height: 520px;
    position: relative;
    overflow: hidden;
    border-radius: 28px;
    background: linear-gradient(180deg, #fafbff, #edf2fb);
}

.gestion-cuentas-anim-container .panel {
    position: absolute;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.85);
    border-radius: 18px;
    padding: 14px 16px;
    box-shadow: 0 10px 25px rgba(90, 110, 180, 0.12);
    color: #445;
}

.gestion-cuentas-anim-container .title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 6px;
}

.gestion-cuentas-anim-container .text {
    font-size: 12px;
    color: #667;
    line-height: 1.45;
}

.gestion-cuentas-anim-container .p1 { left: 250px; top: 28px; width: 180px; }
.gestion-cuentas-anim-container .p2 { right: 45px; top: 48px; width: 200px; }
.gestion-cuentas-anim-container .p3 { left: 215px; bottom: 28px; width: 210px; }
.gestion-cuentas-anim-container .p4 { right: 30px; bottom: 35px; width: 160px; text-align: center; }

.gestion-cuentas-anim-container .tray {
    position: absolute;
    left: 35px;
    top: 175px;
    width: 120px;
    height: 145px;
    background: #4f5bd0;
    border-radius: 18px;
    box-shadow: 0 20px 35px rgba(79, 91, 208, 0.35);
}

.gestion-cuentas-anim-container .paper {
    position: absolute;
    width: 80px;
    height: 100px;
    background: #fff;
    border-radius: 8px;
    left: 20px;
    border: 1px solid #dde3f3;
}

.gestion-cuentas-anim-container .paper:nth-child(1) { top: -6px; }
.gestion-cuentas-anim-container .paper:nth-child(2) { top: 2px; left: 26px; }
.gestion-cuentas-anim-container .paper:nth-child(3) { top: 10px; left: 32px; }

.gestion-cuentas-anim-container .paper:before {
    content: "FACTURA";
    position: absolute;
    top: 8px;
    left: 8px;
    font-size: 8px;
    font-weight: 700;
    color: #546;
}

.gestion-cuentas-anim-container .paper:after {
    content: "";
    position: absolute;
    left: 10px;
    bottom: 12px;
    width: 54px;
    height: 3px;
    background: #d8deef;
    box-shadow: 0 -10px #d8deef, 0 -20px #d8deef;
}

.gestion-cuentas-anim-container .belt {
    position: absolute;
    left: 150px;
    top: 250px;
    width: 450px;
    height: 54px;
    background: #26337c;
    border-radius: 28px;
    overflow: hidden;
}

.gestion-cuentas-anim-container .belt:before {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
        90deg,
        #3545aa 0 18px,
        #2b3789 18px 36px
    );
    animation: belt 1s linear infinite;
}

.gestion-cuentas-anim-container .machine {
    position: absolute;
    left: 325px;
    top: 118px;
    width: 210px;
    height: 185px;
    border-radius: 22px;
    background: linear-gradient(#ffffff, #dfe6fb);
    box-shadow: 0 22px 45px rgba(90, 110, 220, 0.25);
}

.gestion-cuentas-anim-container .screen {
    position: absolute;
    left: 30px;
    top: 25px;
    width: 150px;
    height: 95px;
    border-radius: 14px;
    background: #1b2359;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    box-shadow: inset 0 0 25px rgba(130, 90, 255, 0.25);
}

.gestion-cuentas-anim-container .screen .icon {
    font-size: 28px;
    animation: pulse 1.5s infinite;
}

.gestion-cuentas-anim-container .screen h3 {
    font-size: 17px;
    margin-top: 6px;
    font-weight: bold;
}

.gestion-cuentas-anim-container .screen span {
    font-size: 11px;
    color: #cfd7ff;
}

.gestion-cuentas-anim-container .light {
    position: absolute;
    right: 22px;
    bottom: 18px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #6a74ff;
    box-shadow: 0 0 15px #6a74ff;
    animation: pulse 1s infinite;
}

.gestion-cuentas-anim-container .doc {
    position: absolute;
    width: 82px;
    height: 96px;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dfe4ef;
    display: flex;
    justify-content: center;
    padding-top: 8px;
    font-size: 8px;
    font-weight: 700;
    color: #556;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.18);
}

.gestion-cuentas-anim-container .doc:after {
    content: "";
    position: absolute;
    bottom: 12px;
    width: 54px;
    height: 3px;
    background: #d8deef;
    box-shadow: 0 -10px #d8deef, 0 -20px #d8deef;
}

.gestion-cuentas-anim-container .move1 { animation: travel 6s linear infinite; }
.gestion-cuentas-anim-container .move2 { animation: travel 6s linear infinite 3s; }

.gestion-cuentas-anim-container .output {
    position: absolute;
    right: 78px;
    top: 205px;
    width: 185px;
    height: 130px;
    border-radius: 20px;
    background: linear-gradient(180deg, #5b66df, #4958c6);
    box-shadow: 0 18px 35px rgba(76, 88, 200, 0.35);
}

.gestion-cuentas-anim-container .ledger {
    position: absolute;
    left: 22px;
    top: -28px;
    width: 140px;
    height: 155px;
    background: #fff;
    border-radius: 10px;
    transform: rotate(-8deg);
    box-shadow: 0 16px 28px rgba(0, 0, 0, 0.18);
}

.gestion-cuentas-anim-container .ledger h4 {
    text-align: center;
    margin-top: 12px;
    font-size: 14px;
    color: #334;
    font-weight: bold;
}

.gestion-cuentas-anim-container .line {
    height: 3px;
    width: 95px;
    background: #d8deef;
    margin: 8px auto;
}

.gestion-cuentas-anim-container .tag {
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 16px;
    background: #41c67b;
    color: #fff;
    text-align: center;
    padding: 8px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
}

.gestion-cuentas-anim-container .dot {
    position: absolute;
    bottom: 18px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #69b8ff;
    box-shadow: 0 0 12px #69b8ff;
    animation: pulse 1.2s infinite;
}

.gestion-cuentas-anim-container .d1 { left: 20px; }
.gestion-cuentas-anim-container .d2 { left: 50px; animation-delay: .3s; }
.gestion-cuentas-anim-container .d3 { left: 80px; animation-delay: .6s; }
.gestion-cuentas-anim-container .d4 { left: 110px; animation-delay: .9s; }

.gestion-cuentas-anim-container svg {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.gestion-cuentas-anim-container .path {
    fill: none;
    stroke: #8ec8ff;
    stroke-width: 3;
    stroke-dasharray: 8 8;
    opacity: .35;
}

.gestion-cuentas-anim-container .flow {
    fill: none;
    stroke: #5caeff;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-dasharray: 18 180;
    animation: dash 3s linear infinite;
}

@keyframes dash {
  to { stroke-dashoffset: -198; }
}

@keyframes pulse {
  50% {
    transform: scale(.85);
    opacity: .45;
  }
}

@keyframes belt {
  to {
    background-position: 36px 0;
  }
}

@keyframes travel {
  0% {
    left: 160px;
    top: 228px;
    opacity: 0;
    transform: rotate(-8deg) scale(.8);
  }
  10% { opacity: 1; }
  35% { left: 260px; }
  55% { left: 365px; }
  75% { left: 485px; }
  100% {
    left: 610px;
    top: 195px;
    opacity: 0;
    transform: rotate(-6deg);
  }
}
`
