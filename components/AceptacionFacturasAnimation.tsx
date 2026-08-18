'use client'

import { useEffect, useRef, useState } from "react"
import { isAceptacionFacturasAnimation } from "@/lib/automatizaciones-helpers"

export { isAceptacionFacturasAnimation }

export function AceptacionFacturasAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current
        const scaleX = clientWidth / 920
        const scaleY = clientHeight / 520
        // Use fit scale so it never overflows
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
      className="factura-anim-container relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-b from-[#f7f8fd] to-[#edf2fb]"
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
          <div className="card validation">
            <div className="title">✔ Validación</div>
            <div className="small">Automática de facturas</div>
          </div>

          <div className="card rules">
            <div className="title">Reglas de negocio</div>
            <ul>
              <li>Datos fiscales</li>
              <li>Montos válidos</li>
              <li>Duplicados</li>
              <li>Formato correcto</li>
            </ul>
          </div>

          <div className="card alert">
            <div style={{ fontSize: "32px" }}>🔔</div>
            <div className="small">Alertas</div>
          </div>

          <div className="card approval">
            <div className="title">👥 Flujo de aprobación</div>
            <div className="small">Notificación y trazabilidad completa</div>
          </div>

          <div className="input">
            <div className="stack">
              <div className="sheet" />
              <div className="sheet" />
              <div className="sheet" />
              <div className="sheet" />
            </div>
          </div>

          <div className="belt" />

          <div className="machine">
            <div className="screen">
              <div className="icon">⚙️</div>
              <h3>Validando</h3>
              <span>Procesando documento</span>
            </div>
            <div className="side" />
            <div className="light" />
          </div>

          <div className="doc move1">FACTURA</div>
          <div className="doc move2">FACTURA</div>

          <div className="output">
            <div className="outDoc">
              <h4>FACTURA</h4>
              <div className="ok">✔ ACEPTADA</div>
            </div>

            <div className="dot d1" />
            <div className="dot d2" />
            <div className="dot d3" />
            <div className="dot d4" />
          </div>

          <svg viewBox="0 0 920 520">
            <path className="path" d="M150 255 C220 255,250 180,315 120" />
            <path className="flow" d="M150 255 C220 255,250 180,315 120" />

            <path className="path" d="M420 120 C560 90,650 90,760 140" />
            <path className="flow" d="M420 120 C560 90,650 90,760 140" />

            <path className="path" d="M420 300 C360 390,280 420,220 380" />
            <path className="flow" d="M420 300 C360 390,280 420,220 380" />

            <path className="path" d="M585 235 C620 235,640 235,700 235" />
            <path className="flow" d="M585 235 C620 235,640 235,700 235" />
          </svg>
        </div>
      </div>
    </div>
  )
}

const animationCss = `
.factura-anim-container .scene {
    width: 920px;
    height: 520px;
    position: relative;
    border-radius: 30px;
    overflow: hidden;
    background: linear-gradient(180deg, #f7f8fd, #edf2fb);
}

.factura-anim-container .card {
    position: absolute;
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 18px;
    padding: 16px;
    color: #445;
    box-shadow: 0 10px 30px rgba(95, 103, 170, 0.12);
}

.factura-anim-container .validation {
    width: 170px;
    top: 35px;
    left: 285px;
}

.factura-anim-container .rules {
    width: 190px;
    top: 55px;
    right: 65px;
}

.factura-anim-container .alert {
    width: 110px;
    top: 135px;
    right: 20px;
    text-align: center;
}

.factura-anim-container .approval {
    width: 210px;
    bottom: 30px;
    left: 200px;
}

.factura-anim-container .input {
    position: absolute;
    left: 40px;
    top: 170px;
    width: 120px;
    height: 145px;
    background: #4e5ac7;
    border-radius: 18px;
    box-shadow: 0 20px 35px rgba(74, 92, 220, 0.35);
}

.factura-anim-container .stack {
    position: absolute;
    left: 18px;
    top: -10px;
}

.factura-anim-container .sheet {
    position: absolute;
    width: 78px;
    height: 100px;
    background: white;
    border-radius: 8px;
    border: 1px solid #dfe5f4;
}

.factura-anim-container .sheet:nth-child(1) { left: 0; top: 0; }
.factura-anim-container .sheet:nth-child(2) { left: 6px; top: 6px; }
.factura-anim-container .sheet:nth-child(3) { left: 12px; top: 12px; }
.factura-anim-container .sheet:nth-child(4) { left: 18px; top: 18px; }

.factura-anim-container .sheet:before {
    content: "FACTURA";
    position: absolute;
    top: 8px;
    left: 8px;
    font-size: 9px;
    font-weight: 700;
    color: #526;
}

.factura-anim-container .sheet:after {
    content: "";
    position: absolute;
    left: 10px;
    bottom: 12px;
    width: 55px;
    height: 3px;
    background: #d8deef;
    box-shadow: 0 -10px #d8deef, 0 -20px #d8deef;
}

.factura-anim-container .machine {
    position: absolute;
    left: 315px;
    top: 120px;
    width: 210px;
    height: 190px;
    background: linear-gradient(180deg, #ffffff, #dfe6fb);
    border-radius: 22px;
    box-shadow: 0 25px 50px rgba(120, 130, 220, 0.28);
}

.factura-anim-container .screen {
    position: absolute;
    left: 32px;
    top: 28px;
    width: 145px;
    height: 95px;
    border-radius: 14px;
    background: #1d2258;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    box-shadow: inset 0 0 20px rgba(125, 90, 255, 0.35);
}

.factura-anim-container .screen .icon {
    font-size: 30px;
    animation: pulse 1.8s infinite;
}

.factura-anim-container .screen h3 {
    margin-top: 6px;
    font-size: 18px;
    font-weight: bold;
}

.factura-anim-container .screen span {
    font-size: 11px;
    color: #cfd6ff;
}

.factura-anim-container .side {
    position: absolute;
    right: 18px;
    top: 45px;
    width: 26px;
    height: 55px;
    background: linear-gradient(#6774ff, #a86cff);
    border-radius: 8px;
}

.factura-anim-container .light {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #6f7cff;
    bottom: 18px;
    right: 28px;
    box-shadow: 0 0 15px #6f7cff;
    animation: pulse 1s infinite;
}

.factura-anim-container .belt {
    position: absolute;
    left: 165px;
    top: 255px;
    width: 420px;
    height: 52px;
    border-radius: 26px;
    background: #222b63;
    overflow: hidden;
    box-shadow: 0 12px 25px rgba(32, 42, 120, 0.25);
}

.factura-anim-container .belt:before {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      90deg,
      #3340a0 0 18px,
      #293480 18px 36px
    );
    animation: belt 1.2s linear infinite;
}

.factura-anim-container .doc {
    position: absolute;
    width: 78px;
    height: 92px;
    background: white;
    border-radius: 8px;
    border: 1px solid #d9dff0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 8px;
    font-size: 9px;
    font-weight: 700;
    color: #556;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.18);
}

.factura-anim-container .doc:after {
    content: "";
    position: absolute;
    bottom: 12px;
    width: 50px;
    height: 3px;
    background: #d7dcef;
    box-shadow: 0 -10px #d7dcef, 0 -20px #d7dcef;
}

.factura-anim-container .move1 {
    animation: travel 6s linear infinite;
}

.factura-anim-container .move2 {
    animation: travel 6s linear infinite 3s;
}

.factura-anim-container .output {
    position: absolute;
    right: 95px;
    top: 215px;
    width: 175px;
    height: 118px;
    background: linear-gradient(180deg, #5b66df, #4d5cc9);
    border-radius: 20px;
    box-shadow: 0 18px 35px rgba(76, 88, 200, 0.35);
}

.factura-anim-container .outDoc {
    position: absolute;
    left: 20px;
    top: -30px;
    width: 135px;
    height: 150px;
    background: white;
    border-radius: 10px;
    transform: rotate(-8deg);
    box-shadow: 0 18px 30px rgba(0, 0, 0, 0.18);
}

.factura-anim-container .outDoc h4 {
    text-align: center;
    margin-top: 12px;
    color: #425;
    font-weight: bold;
}

.factura-anim-container .ok {
    position: absolute;
    bottom: 18px;
    left: 18px;
    right: 18px;
    background: #42c87b;
    color: white;
    text-align: center;
    padding: 8px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
}

.factura-anim-container .dot {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #69b7ff;
    box-shadow: 0 0 12px #69b7ff;
    animation: pulse 1.2s infinite;
}

.factura-anim-container .d1 { bottom: 18px; left: 18px; }
.factura-anim-container .d2 { bottom: 18px; left: 48px; animation-delay: .3s; }
.factura-anim-container .d3 { bottom: 18px; left: 78px; animation-delay: .6s; }
.factura-anim-container .d4 { bottom: 18px; left: 108px; animation-delay: .9s; }

.factura-anim-container svg {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.factura-anim-container .path {
    fill: none;
    stroke: #8ec8ff;
    stroke-width: 3;
    stroke-dasharray: 8 8;
    opacity: .35;
}

.factura-anim-container .flow {
    fill: none;
    stroke: #58a6ff;
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
    opacity: .4;
    transform: scale(.9);
  }
}

@keyframes belt {
  to {
    background-position: 36px 0;
  }
}

@keyframes travel {
  0% {
    left: 175px;
    top: 232px;
    opacity: 0;
    transform: scale(.8) rotate(-10deg);
  }
  10% {
    opacity: 1;
  }
  35% {
    left: 255px;
    top: 232px;
  }
  55% {
    left: 360px;
    top: 232px;
  }
  75% {
    left: 475px;
    top: 232px;
  }
  100% {
    left: 620px;
    top: 195px;
    opacity: 0;
    transform: scale(.95) rotate(-8deg);
  }
}

.factura-anim-container .small {
    font-size: 12px;
    color: #667;
    margin-top: 8px;
    line-height: 1.4;
}

.factura-anim-container .rules ul {
    margin-top: 8px;
    padding-left: 18px;
    font-size: 12px;
    line-height: 1.6;
}

.factura-anim-container .title {
    font-weight: 700;
    color: #334;
    display: flex;
    align-items: center;
    gap: 8px;
}
`
