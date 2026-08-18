'use client'

import { useEffect, useRef, useState } from "react"
import { isFiniquitosDtAnimation } from "@/lib/automatizaciones-helpers"

export { isFiniquitosDtAnimation }

export function FiniquitosDtAnimation() {
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
      className="finiquitos-anim-container relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-b from-[#fafbff] to-[#eef3fc]"
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
            <div className="title">📋 Validación laboral</div>
            <div className="text">Verificación automática de datos del trabajador y contrato.</div>
          </div>

          <div className="panel p2">
            <div className="title">🧮 Cálculo DT</div>
            <div className="text">Indemnización, vacaciones, descuentos y haberes conforme a normativa.</div>
          </div>

          <div className="panel p3">
            <div className="title">👥 Aprobación RR.HH.</div>
            <div className="text">Flujo automático con trazabilidad y notificaciones.</div>
          </div>

          <div className="panel p4">
            <div style={{ fontSize: "30px" }}>✉️</div>
            <div className="text">Envío al trabajador</div>
          </div>

          <div className="tray">
            <div className="paper" />
            <div className="paper" />
            <div className="paper" />
          </div>

          <div className="belt" />

          <div className="machine">
            <div className="screen">
              <div className="icon">⚙️</div>
              <h3>Calculando</h3>
              <span>Finiquito DT</span>
            </div>
            <div className="light" />
          </div>

          <div className="doc move1">FINIQUITO</div>
          <div className="doc move2">FINIQUITO</div>

          <div className="output">
            <div className="finalDoc">
              <h4>FINIQUITO</h4>
              <p>Documento DT</p>
              <div className="tag">✓ GENERADO</div>
            </div>

            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
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
.finiquitos-anim-container .scene {
    width: 920px;
    height: 520px;
    position: relative;
    overflow: hidden;
    border-radius: 28px;
    background: linear-gradient(180deg, #fafbff, #eef3fc);
}

.finiquitos-anim-container .panel {
    position: absolute;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 18px;
    padding: 14px 16px;
    box-shadow: 0 10px 25px rgba(90, 110, 180, 0.12);
    color: #435;
}

.finiquitos-anim-container .title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.finiquitos-anim-container .text {
    font-size: 12px;
    color: #667;
    line-height: 1.45;
}

.finiquitos-anim-container .p1 { left: 250px; top: 28px; width: 180px; }
.finiquitos-anim-container .p2 { right: 45px; top: 48px; width: 200px; }
.finiquitos-anim-container .p3 { left: 220px; bottom: 28px; width: 190px; }
.finiquitos-anim-container .p4 { right: 30px; bottom: 35px; width: 150px; text-align: center; }

.finiquitos-anim-container .tray {
    position: absolute;
    left: 35px;
    top: 175px;
    width: 120px;
    height: 145px;
    background: #4c58c9;
    border-radius: 18px;
    box-shadow: 0 20px 35px rgba(76, 88, 200, 0.35);
}

.finiquitos-anim-container .paper {
    position: absolute;
    width: 80px;
    height: 100px;
    background: white;
    border-radius: 8px;
    left: 20px;
    border: 1px solid #dfe4f2;
}

.finiquitos-anim-container .paper:nth-child(1) { top: -6px; }
.finiquitos-anim-container .paper:nth-child(2) { top: 2px; left: 26px; }
.finiquitos-anim-container .paper:nth-child(3) { top: 10px; left: 32px; }

.finiquitos-anim-container .paper:before {
    content: "DT";
    position: absolute;
    top: 8px;
    left: 10px;
    font-size: 9px;
    font-weight: 700;
    color: #586;
}

.finiquitos-anim-container .paper:after {
    content: "";
    position: absolute;
    bottom: 12px;
    left: 10px;
    width: 54px;
    height: 3px;
    background: #d8deef;
    box-shadow: 0 -10px #d8deef, 0 -20px #d8deef;
}

.finiquitos-anim-container .belt {
    position: absolute;
    left: 150px;
    top: 250px;
    width: 450px;
    height: 54px;
    background: #26337c;
    border-radius: 28px;
    overflow: hidden;
}

.finiquitos-anim-container .belt:before {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      90deg,
      #3444aa 0 18px,
      #2a3688 18px 36px
    );
    animation: belt 1s linear infinite;
}

.finiquitos-anim-container .machine {
    position: absolute;
    left: 325px;
    top: 118px;
    width: 210px;
    height: 185px;
    border-radius: 22px;
    background: linear-gradient(#fff, #dfe6fb);
    box-shadow: 0 22px 45px rgba(90, 110, 220, 0.25);
}

.finiquitos-anim-container .screen {
    position: absolute;
    left: 30px;
    top: 25px;
    width: 150px;
    height: 95px;
    background: #1b2359;
    border-radius: 14px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: inset 0 0 25px rgba(135, 90, 255, 0.25);
}

.finiquitos-anim-container .screen .icon {
    font-size: 30px;
    animation: pulse 1.5s infinite;
}

.finiquitos-anim-container .screen h3 {
    font-size: 18px;
    margin-top: 5px;
    font-weight: bold;
}

.finiquitos-anim-container .screen span {
    font-size: 11px;
    color: #cad4ff;
}

.finiquitos-anim-container .light {
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

.finiquitos-anim-container .doc {
    position: absolute;
    width: 82px;
    height: 96px;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dfe4ef;
    display: flex;
    justify-content: center;
    padding-top: 8px;
    font-size: 9px;
    font-weight: 700;
    color: #556;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.18);
}

.finiquitos-anim-container .doc:after {
    content: "";
    position: absolute;
    bottom: 12px;
    width: 54px;
    height: 3px;
    background: #d8deef;
    box-shadow: 0 -10px #d8deef, 0 -20px #d8deef;
}

.finiquitos-anim-container .move1 { animation: travel 6s linear infinite; }
.finiquitos-anim-container .move2 { animation: travel 6s linear infinite 3s; }

.finiquitos-anim-container .output {
    position: absolute;
    right: 80px;
    top: 210px;
    width: 180px;
    height: 125px;
    border-radius: 20px;
    background: linear-gradient(180deg, #5a66de, #4958c6);
    box-shadow: 0 18px 35px rgba(76, 88, 200, 0.35);
}

.finiquitos-anim-container .finalDoc {
    position: absolute;
    left: 22px;
    top: -28px;
    width: 136px;
    height: 152px;
    background: #fff;
    border-radius: 10px;
    transform: rotate(-8deg);
    box-shadow: 0 16px 28px rgba(0, 0, 0, 0.18);
}

.finiquitos-anim-container .finalDoc h4 {
    text-align: center;
    margin-top: 14px;
    font-size: 15px;
    color: #334;
    font-weight: bold;
}

.finiquitos-anim-container .finalDoc p {
    font-size: 11px;
    text-align: center;
    color: #777;
    margin-top: 8px;
}

.finiquitos-anim-container .tag {
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

.finiquitos-anim-container .dot {
    position: absolute;
    bottom: 18px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #69b8ff;
    box-shadow: 0 0 12px #69b8ff;
    animation: pulse 1.2s infinite;
}

.finiquitos-anim-container .dot:nth-child(2) { left: 20px; }
.finiquitos-anim-container .dot:nth-child(3) { left: 50px; animation-delay: .3s; }
.finiquitos-anim-container .dot:nth-child(4) { left: 80px; animation-delay: .6s; }
.finiquitos-anim-container .dot:nth-child(5) { left: 110px; animation-delay: .9s; }

.finiquitos-anim-container svg {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.finiquitos-anim-container .path {
    fill: none;
    stroke: #8cc8ff;
    stroke-width: 3;
    stroke-dasharray: 8 8;
    opacity: .35;
}

.finiquitos-anim-container .flow {
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
