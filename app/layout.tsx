import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://lynkdigital.co.in'),
  title: {
    default: 'Lynk Digital | Transform Your Digital Presence',
    template: '%s | Lynk Digital'
  },
  description: 'Transform your digital presence with Lynk Digital. Expert web design, UI/UX, digital marketing, and brand development services tailored for modern businesses.',
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
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
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
     <link rel="icon" href="/lynkdigital.svg" type="image/svg+xml" /> 
     <link rel="shortcut icon" href="/lynkdigital.svg" type="image/svg+xml" />
    </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark" disableTransitionOnChange>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ScrollToTop/>
        </ThemeProvider>
      </body>
    </html>
  )
}
