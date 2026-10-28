"use client"

import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    
    <footer className="relative bg-gray-900 overflow-hidden">

        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                    fill="url(#gradient)" opacity="0.3"></path>
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
            </svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">

            <div className="bg-linear-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 sm:gap-10">

                    <div className="sm:col-span-2 md:col-span-1 lg:col-span-2">
                        <p className="text-white/90 text-base mb-6 leading-relaxed">
                            Tu transformación,<br></br>nuestra pasión
                        </p>
                        <div className="flex gap-3">

                            <a href="https://www.youtube.com/@Ofimundo." className="w-11 h-11 bg-linear-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl flex items-center justify-center transition-all shadow-lg" aria-label="YouTube">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                            </a>

                            <a href="https://www.linkedin.com/company/ofimundo/?originalSubdomain=cl" className="w-11 h-11 bg-linear-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl flex items-center justify-center transition-all shadow-lg" aria-label="LinkedIn">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </a>

                            <a href="https://www.instagram.com/ofimundo_empresas" className="w-11 h-11 bg-linear-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl flex items-center justify-center transition-all shadow-lg" aria-label="Instagram">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/></svg>
                            </a>
                        </div>
                    </div>
                    

                    <div className="sm:col-span-1 md:col-span-1 lg:col-span-2">
                        <h4 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                            <span className="w-1 h-6 bg-linear-to-b from-pink-500 to-purple-600 rounded-full"></span>
                            Empresa
                        </h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Home</Link></li>
                            <li><Link href="/somos-ofimundo" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Somos Ofimundo</Link></li>
                            <li><Link href="/contacto" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Contacto</Link></li>
                        </ul>
                    </div>
                    
                    <div className="sm:col-span-1 md:col-span-1 lg:col-span-2">
                        <h4 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                            <span className="w-1 h-6 bg-linear-to-b from-pink-500 to-purple-600 rounded-full"></span>
                            Servicios
                        </h4>
                        <ul className="space-y-3">
                            <li><Link href="/soluciones#mps" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">MPS</Link></li>
                            <li><Link href="/soluciones#salas" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Salas Colaborativas</Link></li>
                            <li><Link href="/soluciones#automatizaciones" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Automatización</Link></li>
                        </ul>
                    </div>
                    
                    <div className="sm:col-span-1 md:col-span-1 lg:col-span-2">
                        <h4 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                            <span className="w-1 h-6 bg-linear-to-b from-pink-500 to-purple-600 rounded-full"></span>
                            Legal
                        </h4>
                        <ul className="space-y-3 mb-6">
                            <li><Link href="/politica-de-privacidad" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Política de Privacidad</Link></li>
                            <li><a href="https://micuenta.ofimundo.cl/" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Mi Cuenta</a></li>
                            <li><Link href="/conoce-tu-factura" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Conoce tu factura</Link></li>
                        </ul>
                    </div>

                    <div className="sm:col-span-2 md:col-span-2 lg:col-span-4">
                        <h4 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                            <span className="w-1 h-6 bg-linear-to-b from-pink-500 to-purple-600 rounded-full"></span>
                            Grupo Empresarial Ofimundo
                        </h4>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 items-center">
                            <a
                                href="https://www.ofimundo.cl/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-start py-1.5 transition-transform hover:scale-105"
                                title="Ofimundo"
                            >
                                <Image src="/ofimundo.png" alt="Ofimundo" width={180} height={52} className="h-10 sm:h-11 lg:h-12 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity" />
                            </a>
                            <a
                                href="https://dreamtec.cl/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-start py-1.5 transition-transform hover:scale-105"
                                title="Dreamtec"
                            >
                                <Image src="/dreamtec.png" alt="Dreamtec" width={180} height={48} className="h-10 sm:h-11 lg:h-12 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity" />
                            </a>
                            <a
                                href="https://globalhorizonlatam.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-start py-1.5 transition-transform hover:scale-105"
                                title="Global Horizon"
                            >
                                <Image src="/global.png" alt="Global Horizon" width={180} height={58} className="h-10 sm:h-11 lg:h-12 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity" />
                            </a>
                            <a
                                href="https://cxhiway.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-start py-1.5 transition-transform hover:scale-105"
                                title="Hiway"
                            >
                                <Image src="/hiway.png" alt="Hiway" width={180} height={60} className="h-10 sm:h-11 lg:h-12 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="text-center">
                <p className="text-white/60 text-sm">
                    Copyright © 2025 | Ofimundo, todos los derechos reservados
                </p>
            </div>
        </div>
    </footer>
  )
}
