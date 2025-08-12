"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function Inventory() {
  const [blood, setBlood] = useState([]);
  const [organs, setOrgans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const [bloodRes, organRes] = await Promise.all([
        axios.get("/api/inventory/blood", { headers }),
        axios.get("/api/inventory/organs", { headers })
      ]);
      setBlood(bloodRes.data);
      setOrgans(organRes.data);
      setLoading(false);
    };
    fetchInventory();
    const interval = setInterval(fetchInventory, 30000);
    return () => clearInterval(interval);
  }, []);

  const updateBlood = async (id: string, units: number) => {
    const token = localStorage.getItem("token");
    await axios.put(`/api/inventory/blood/${id}`, { units }, { headers: { Authorization: `Bearer ${token}` } });
  };
  const updateOrgan = async (id: string, status: string) => {
    const token = localStorage.getItem("token");
    await axios.put(`/api/inventory/organs/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Blood Stock</h2>
        <table className="w-full table-auto border">
          <thead>
            <tr>
              <th>Type</th><th>Units</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blood.map((b: any) => (
              <tr key={b._id}>
                <td>{b.type}</td>
                <td><input type="number" value={b.units} onChange={e => updateBlood(b._id, Number(e.target.value))} className="border rounded p-1 w-20" /></td>
                <td><Button size="sm" onClick={() => updateBlood(b._id, b.units)}>Save</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Organ Stock</h2>
        <table className="w-full table-auto border">
          <thead>
            <tr>
              <th>Type</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {organs.map((o: any) => (
              <tr key={o._id}>
                <td>{o.type}</td>
                <td><input type="text" value={o.status} onChange={e => updateOrgan(o._id, e.target.value)} className="border rounded p-1 w-32" /></td>
                <td><Button size="sm" onClick={() => updateOrgan(o._id, o.status)}>Save</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
