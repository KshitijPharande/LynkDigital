"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast, Toaster } from "sonner"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function AdminLogin() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.message || "Invalid email or password", { position: "top-right" })
        setIsLoading(false)
        return
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token)
      toast.success("Login successful")
      router.push("/admin/leads")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a192f]">
      <Toaster />
      <div className="bg-[#10243a] p-10 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-white">Admin Login</h1>
        <p className="mb-6 text-gray-300">Enter your credentials to access the admin dashboard</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-white">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-[#162a40] text-white border border-[#22334a] focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-white">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-[#162a40] text-white border border-[#22334a] focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2">
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  )
} 