'use client'

import { useEffect, useRef, useState } from "react"
import { isSaldosBancariosAnimation } from "@/lib/automatizaciones-helpers"

export { isSaldosBancariosAnimation }

export function SaldosBancariosAnimation() {
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
      className="saldos-anim-container relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-b from-[#fafbff] to-[#eef3fc]"
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
            <div className="title">🏦 Actualización 24/7</div>
            <div className="text">Sincronización continua de saldos bancarios.</div>
          </div>

          <div className="panel p2">
            <div className="title">✔ Reglas financieras</div>
            <div className="text">Validación de movimientos, conciliación y alertas automáticas.</div>
          </div>

          <div className="panel p3">
            <div className="title">🔔 Monitoreo en tiempo real</div>
            <div className="text">Flujos de aprobación y trazabilidad financiera.</div>
          </div>

          <div className="panel p4">
            <div style={{ fontSize: "28px" }}>📈</div>
            <div className="text">Reportes diarios y mensuales</div>
          </div>

          <div className="bank">
            <div className="icon">🏦</div>
            <span>BANCO</span>
          </div>

          <div className="belt" />

          <div className="machine">
            <div className="screen">
              <div className="icon">💳</div>
              <h3>Conciliando</h3>
              <span>Saldos Bancarios</span>
            </div>
            <div className="light" />
          </div>

          <div className="tx move1">TRANSFER</div>
          <div className="tx move2">DEPÓSITO</div>

          <div className="output">
            <div className="dashboard">
              <h4>SALDO ACTUAL</h4>

              <div className="balance">$2.8M</div>

              <div className="chart">
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
              </div>

              <div className="tag">✓ ACTUALIZADO</div>
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
.saldos-anim-container .scene {
    width: 920px;
    height: 520px;
    position: relative;
    overflow: hidden;
    border-radius: 28px;
    background: linear-gradient(180deg, #fafbff, #eef3fc);
}

.saldos-anim-container .panel {
    position: absolute;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.9);
    border-radius: 18px;
    padding: 14px 16px;
    box-shadow: 0 10px 25px rgba(90, 110, 180, 0.12);
}

.saldos-anim-container .title {
    font-size: 14px;
    font-weight: 700;
    color: #334;
    margin-bottom: 6px;
}

.saldos-anim-container .text {
    font-size: 12px;
    color: #667;
    line-height: 1.45;
}

.saldos-anim-container .p1 { left: 250px; top: 28px; width: 180px; }
.saldos-anim-container .p2 { right: 45px; top: 48px; width: 200px; }
.saldos-anim-container .p3 { left: 215px; bottom: 28px; width: 200px; }
.saldos-anim-container .p4 { right: 30px; bottom: 35px; width: 160px; text-align: center; }

.saldos-anim-container .bank {
    position: absolute;
    left: 35px;
    top: 170px;
    width: 120px;
    height: 145px;
    background: #4F5BD0;
    border-radius: 18px;
    box-shadow: 0 20px 35px rgba(79, 91, 208, 0.35);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
}

.saldos-anim-container .bank .icon {
    font-size: 42px;
    margin-bottom: 8px;
}

.saldos-anim-container .bank span {
    font-size: 13px;
    font-weight: 700;
}

.saldos-anim-container .belt {
    position: absolute;
    left: 150px;
    top: 250px;
    width: 450px;
    height: 54px;
    background: #26337C;
    border-radius: 28px;
    overflow: hidden;
}

.saldos-anim-container .belt:before {
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

.saldos-anim-container .machine {
    position: absolute;
    left: 325px;
    top: 118px;
    width: 210px;
    height: 185px;
    border-radius: 22px;
    background: linear-gradient(#fff, #dfe6fb);
    box-shadow: 0 22px 45px rgba(90, 110, 220, 0.25);
}

.saldos-anim-container .screen {
    position: absolute;
    left: 30px;
    top: 25px;
    width: 150px;
    height: 95px;
    border-radius: 14px;
    background: #1b2359;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: inset 0 0 25px rgba(120, 90, 255, 0.25);
}

.saldos-anim-container .screen .icon {
    font-size: 30px;
    animation: pulse 1.5s infinite;
}

.saldos-anim-container .screen h3 {
    font-size: 17px;
    margin-top: 6px;
    font-weight: bold;
}

.saldos-anim-container .screen span {
    font-size: 11px;
    color: #cfd7ff;
}

.saldos-anim-container .light {
    position: absolute;
    right: 22px;
    bottom: 18px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #6A74FF;
    box-shadow: 0 0 15px #6A74FF;
    animation: pulse 1s infinite;
}

.saldos-anim-container .tx {
    position: absolute;
    width: 78px;
    height: 50px;
    background: white;
    border-radius: 12px;
    border: 1px solid #dfe5f4;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    font-weight: 700;
    color: #445;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}

.saldos-anim-container .move1 { animation: travel 6s linear infinite; }
.saldos-anim-container .move2 { animation: travel 6s linear infinite 3s; }

.saldos-anim-container .output {
    position: absolute;
    right: 78px;
    top: 200px;
    width: 185px;
    height: 135px;
    border-radius: 20px;
    background: linear-gradient(180deg, #5B66DF, #4958C6);
    box-shadow: 0 18px 35px rgba(76, 88, 200, 0.35);
}

.saldos-anim-container .dashboard {
    position: absolute;
    left: 18px;
    top: -25px;
    width: 148px;
    height: 155px;
    background: white;
    border-radius: 12px;
    transform: rotate(-8deg);
    box-shadow: 0 16px 28px rgba(0, 0, 0, 0.18);
    padding: 12px;
}

.saldos-anim-container .dashboard h4 {
    font-size: 13px;
    color: #334;
    text-align: center;
    font-weight: bold;
}

.saldos-anim-container .balance {
    margin-top: 12px;
    text-align: center;
    font-size: 22px;
    font-weight: 800;
    color: #1BAA61;
    animation: blink 2s infinite;
}

.saldos-anim-container .chart {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 6px;
    height: 42px;
    margin-top: 12px;
}

.saldos-anim-container .bar {
    width: 12px;
    background: #5B66DF;
    border-radius: 4px 4px 0 0;
    animation: bars 1.8s infinite;
}

.saldos-anim-container .bar:nth-child(1) { height: 16px; }
.saldos-anim-container .bar:nth-child(2) { height: 28px; animation-delay: .3s; }
.saldos-anim-container .bar:nth-child(3) { height: 36px; animation-delay: .6s; }
.saldos-anim-container .bar:nth-child(4) { height: 22px; animation-delay: .9s; }

.saldos-anim-container .tag {
    position: absolute;
    left: 14px;
    right: 14px;
    bottom: 12px;
    background: #42C87B;
    color: white;
    text-align: center;
    padding: 6px;
    border-radius: 18px;
    font-size: 11px;
    font-weight: 700;
}

.saldos-anim-container .dot {
    position: absolute;
    width: 10px;
    height: 10px;
    bottom: 18px;
    border-radius: 50%;
    background: #69B7FF;
    box-shadow: 0 0 12px #69B7FF;
    animation: pulse 1.2s infinite;
}

.saldos-anim-container .d1 { left: 20px; }
.saldos-anim-container .d2 { left: 50px; animation-delay: .3s; }
.saldos-anim-container .d3 { left: 80px; animation-delay: .6s; }
.saldos-anim-container .d4 { left: 110px; animation-delay: .9s; }

.saldos-anim-container svg {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.saldos-anim-container .path {
    fill: none;
    stroke: #8EC8FF;
    stroke-width: 3;
    stroke-dasharray: 8 8;
    opacity: .35;
}

.saldos-anim-container .flow {
    fill: none;
    stroke: #58A6FF;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-dasharray: 18 180;
    animation: dash 3s linear infinite;
}

@keyframes dash {
  to { stroke-dashoffset: -198; }
}

@keyframes belt {
  to { background-position: 36px 0; }
}

@keyframes pulse {
  50% { transform: scale(.85); opacity: .45; }
}

@keyframes blink {
  50% { opacity: .55; }
}

@keyframes bars {
  50% { transform: scaleY(.6); }
}

@keyframes travel {
  0% {
    left: 160px;
    top: 230px;
    opacity: 0;
    transform: scale(.8);
  }
  10% { opacity: 1; }
  35% { left: 260px; }
  55% { left: 370px; }
  75% { left: 485px; }
  100% {
    left: 610px;
    top: 205px;
    opacity: 0;
  }
}
`
