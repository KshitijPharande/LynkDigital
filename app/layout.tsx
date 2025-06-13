import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import RootLayoutClient from "./components/root-layout-client"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://lynkdigital.co.in'),
  title: {
    default: 'Lynk Digital | Transform Your Digital Presence',
    template: '%s | Lynk Digital'
  },
  description: 'Transform your digital presence with Lynk Digital. Expert web design, UI/UX, digital marketing, and brand development services in Mumbai, Maharashtra. Tailored solutions for modern businesses.',
  keywords: ['web design', 'digital marketing', 'UI/UX design', 'SEO services', 'social media marketing', 'brand development', 'digital strategy'],
  authors: [{ name: 'Lynk Digital' }],
  creator: 'Lynk Digital',
  publisher: 'Lynk Digital',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lynkdigital.co.in',
    siteName: 'Lynk Digital',
    title: 'Lynk Digital | Transform Your Digital Presence',
    description: 'Transform your digital presence with expert web design, UI/UX, and digital marketing services. Custom solutions for modern businesses.',
    images: [
      {
        url: 'https://lynkdigital.co.in/lynk-logo.webp',
        width: 500,
        height: 500,
        alt: 'Lynk Digital - Modern Digital Solutions',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '3lb-4I42I4zb7MIahCpGxYBJL7zIfTMNCKKQmoIk9Bg',
  },
  alternates: {
    canonical: 'https://lynkdigital.co.in',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head>
      {/* Google tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZL7RELQQCJ"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZL7RELQQCJ');
          `
        }}
      />
     <meta name="viewport" content="width=device-width, initial-scale=1" />
     <meta name="format-detection" content="telephone=no" />
     <meta name="image" content="https://lynkdigital.co.in/lynk-logo.webp" />
     <meta property="og:image" content="https://lynkdigital.co.in/lynk-logo.webp" />
     <meta property="og:image:width" content="500" />
     <meta property="og:image:height" content="500" />
     <meta property="og:image:alt" content="Lynk Digital - Modern Digital Solutions" />
     <meta name="twitter:card" content="summary_large_image" />
     <meta name="twitter:site" content="@lynkdigital" />
     <meta name="twitter:title" content="Lynk Digital | Transform Your Digital Presence" />
     <meta name="twitter:description" content="Transform your digital presence with expert web design, UI/UX, and digital marketing services. Custom solutions for modern businesses." />
     <meta name="twitter:image" content="https://lynkdigital.co.in/lynk-logo.webp" />
     <meta name="twitter:image:alt" content="Lynk Digital - Modern Digital Solutions" />
     <link rel="preconnect" href="https://fonts.googleapis.com" />
     <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
     <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
     <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
     <link rel="preload" href="/lynkdigital.svg" as="image" type="image/svg+xml" />
     <link rel="preload" href="/lynk-logo.jpg" as="image" type="image/jpeg" />
     <meta name="theme-color" content="#000000" />
     <link rel="icon" href="/lynkdigital.svg" type="image/svg+xml" /> 
     <link rel="shortcut icon" href="/lynkdigital.svg" type="image/svg+xml" />
     <link rel="apple-touch-icon" href="/lynk-logo.png" />
     <link rel="apple-touch-icon" sizes="180x180" href="/lynk-logo.png" />
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Lynk Digital",
            "url": "https://lynkdigital.co.in",
            "logo": {
              "@type": "ImageObject",
              "url": "https://lynkdigital.co.in/lynk-logo.webp",
              "width": 500,
              "height": 500,
              "caption": "Lynk Digital Logo"
            },
            "description": "Transform your digital presence with expert web design, UI/UX, and digital marketing services.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-8010195467",
              "contactType": "customer service",
              "email": "hello@lynkdigital.co.in"
            },
            "sameAs": [
              "https://www.instagram.com/lynk.digital_?igsh=Zm5jazNleGlqZDg3"
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://lynkdigital.co.in"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://lynkdigital.co.in/services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "About",
                "item": "https://lynkdigital.co.in/about"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Contact",
                "item": "https://lynkdigital.co.in/contact"
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://lynkdigital.co.in",
            "name": "Lynk Digital",
            "description": "Transform your digital presence with expert web design, UI/UX, and digital marketing services.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://lynkdigital.co.in/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </head>
      <body className={inter.className}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  )
}
