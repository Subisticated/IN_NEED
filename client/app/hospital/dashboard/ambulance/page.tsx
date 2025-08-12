"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function Ambulance() {
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmbulances = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/ambulances", { headers: { Authorization: `Bearer ${token}` } });
      setAmbulances(data);
      setLoading(false);
    };
    fetchAmbulances();
  }, []);

  const toggleStatus = async (id: string) => {
    const token = localStorage.getItem("token");
    await axios.put(`/api/ambulances/${id}/toggle`, {}, { headers: { Authorization: `Bearer ${token}` } });
    setAmbulances(ambs => ambs.map((a: any) => a._id === id ? { ...a, available: !a.available } : a));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Ambulance Services</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th>Number</th><th>Driver</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ambulances.map((a: any) => (
            <tr key={a._id}>
              <td>{a.number}</td>
              <td>{a.driver}</td>
              <td>{a.available ? "Available" : "Unavailable"}</td>
              <td>
                <Button size="sm" onClick={() => toggleStatus(a._id)}>{a.available ? "Set Unavailable" : "Set Available"}</Button>
                <Button size="sm" variant="destructive">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
