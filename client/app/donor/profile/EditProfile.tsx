"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthProvider"

const BLOOD_GROUPS = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
]

export default function EditProfile() {
  const { user, token } = useAuth()
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bloodType: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (!user) return
    setLoading(true)
    axios.get("/api/user/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          bloodType: res.data.bloodType || ""
        })
      })
      .catch(() => setError("Failed to fetch profile"))
      .finally(() => setLoading(false))
  }, [user, token])

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      await axios.put(`/api/user/${user._id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSuccess("Profile updated successfully!")
      setTimeout(() => router.push("/donor/profile"), 1200)
    } catch (err) {
      setError(err.response?.data?.message || "Update failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md space-y-4">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <Input name="email" placeholder="Email" value={form.email} disabled className="bg-gray-100" />
        <Input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
        <Textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <select name="bloodType" value={form.bloodType} onChange={handleChange} className="w-full border rounded p-2">
          <option value="">Select Blood Group</option>
          {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
        </select>
        <Button type="submit" className="w-full" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
      </form>
    </div>
  )
}
