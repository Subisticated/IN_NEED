"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HospitalProfile() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
    license: "",
    logo: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios.get("/api/hospital/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setForm(res.data))
      .catch(() => setError("Failed to fetch profile"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      await axios.put("/api/hospital/profile/update", form, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md space-y-4">
        <h2 className="text-2xl font-bold mb-4">Hospital Profile</h2>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <Input name="name" placeholder="Hospital Name" value={form.name} onChange={handleChange} required />
        <Input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <Input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} />
        <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <Input name="license" placeholder="License Info" value={form.license} onChange={handleChange} />
        {/* Logo upload */}
        <input type="file" accept="image/*" onChange={e => setForm(f => ({ ...f, logo: e.target.files?.[0] }))} />
        <Button type="submit" className="w-full" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
      </form>
    </div>
  );
}
