"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Toaster } from "sonner"
import { motion } from "framer-motion"

const navigation = [
  { name: "Leads", href: "/admin/leads" },
  { name: "Clients", href: "/admin/clients" },
  { name: "Invoices", href: "/admin/invoices" },
  { name: "Dashboard", href: "/admin/dashboard" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")
      if (!token && pathname !== "/admin") {
        router.push("/admin")
        return
      }
      // Optionally, verify token with a lightweight API call
      if (token && pathname !== "/admin") {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (res.status === 401) {
            localStorage.removeItem("token")
            router.push("/admin")
            return
          }
        } catch {
          localStorage.removeItem("token")
          router.push("/admin")
          return
        }
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/admin")
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (pathname === "/admin") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#0a192f]">
      <nav className="bg-[#112240] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/admin/leads" className="text-xl font-bold text-white">
                  Lynk Digital Admin
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === item.href
                        ? "border-lynk-blue text-white"
                        : "border-transparent text-gray-400 hover:border-gray-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="outline" onClick={handleLogout} className="text-white border-white hover:bg-[#233554]">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <motion.div key={pathname} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
          {children}
        </motion.div>
      </main>
      <Toaster />
    </div>
  )
} 