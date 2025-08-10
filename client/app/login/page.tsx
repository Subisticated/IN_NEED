"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "../api/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      const data = await login(email, password)
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      if (data.user.role === "Donor") router.push("/donor")
      else if (data.user.role === "Hospital") router.push("/hospital")
      else router.push("/")
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Button type="submit" className="w-full">Login</Button>
        <div className="text-sm text-center mt-2">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </div>
      </form>
    </div>
  )
}
