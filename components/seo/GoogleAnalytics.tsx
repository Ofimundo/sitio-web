// components/seo/GoogleAnalytics.tsx
export default function GoogleAnalytics() {
  return (
    <>
      {/* Google Analytics 4 - G-HP2KGDHVKW */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-HP2KGDHVKW"
      />
      
      {/* Google Ads - AW-18087757055 */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-18087757055"
      />
      
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Configuración GA4
            gtag('config', 'G-HP2KGDHVKW');
            
            // Configuración Google Ads
            gtag('config', 'AW-18087757055');
          `,
        }}
      />
    </>
  );
}