// import type { Metadata } from "next"
import type { Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// SEO Imports deshabilitados
// import GoogleAnalytics from '@/components/seo/GoogleAnalytics';
// import { GoogleTagManagerHead, GoogleTagManagerBody } from '@/components/seo/GoogleTagManager';
// import LinkedInInsight from '@/components/seo/LinkedInInsight';

const inter = Inter({ subsets: ["latin"] })

/* SEO Metadata - Comentado
export const metadata: Metadata = {
  title: {
    default: "Ofimundo - Soluciones Tecnológicas para Empresas",
    template: '%s | Ofimundo'
  },
  description: "Encuentra equipos multifuncionales, impresoras, scanners y más. Soluciones de impresión y tecnología para tu empresa.",
  verification: {
    google: 'Q56fSpUrhFF8wjDSsn_pklfrhAZ2sCT1o_SrZfuE5lU',
  },
  keywords: ["multifuncionales", "impresoras", "ofimundo", "MPS", "equipos de oficina"],
  authors: [{ name: 'Ofimundo' }],
  creator: 'Ofimundo',
  publisher: 'Ofimundo',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    title: "Ofimundo - Soluciones Tecnológicas para Empresas",
    description: "Encuentra equipos multifuncionales, impresoras, scanners y más. Soluciones de impresión y tecnología para tu empresa.",
    siteName: 'Ofimundo', 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}
*/

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  width: "device-width",
  initialScale: 1,
}

const themeScript = `
  try {
    const saved = localStorage.getItem('ofimundo-theme');
    const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  } catch (_) {}
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-CL" className="bg-background" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* SEO - Componentes comentados */}
        {/* <GoogleTagManagerHead /> */}
        {/* <GoogleAnalytics /> */}
        {/* <LinkedInInsight /> */}
        <meta charSet="UTF-8" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* SEO - Componente comentado */}
        {/* <GoogleTagManagerBody /> */}
        {children}
      </body>
    </html>
  )
}
