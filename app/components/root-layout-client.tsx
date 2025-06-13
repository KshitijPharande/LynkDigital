"use client"

import { usePathname } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/scroll-to-top"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith("/admin")

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {!isAdminPage && <Header />}
      {children}
      {!isAdminPage && <Footer />}
      <ScrollToTop />
      <SpeedInsights />
      <Analytics />
    </ThemeProvider>
  )
} 