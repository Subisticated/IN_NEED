"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signup } from "../api/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Donor" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    try {
      await signup(form.name, form.email, form.password, form.role)
      setSuccess("Registration successful! You can now log in.")
      setTimeout(() => router.push("/login"), 1500)
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <Input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        <Input placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
        <Input type="password" placeholder="Password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
        <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="w-full border rounded p-2">
          <option value="Donor">Donor</option>
          <option value="Hospital">Hospital</option>
        </select>
        <Button type="submit" className="w-full">Sign Up</Button>
        <div className="text-sm text-center mt-2">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </div>
      </form>
    </div>
  )
}
