"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function AliveDonors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/donors/alive", { headers: { Authorization: `Bearer ${token}` } });
      setDonors(data);
      setLoading(false);
    };
    fetchDonors();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Alive Donors</h2>
        <Button>Add New Alive Donor</Button>
      </div>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th>Name</th><th>Blood Group</th><th>Organ Type</th><th>Contact</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((d: any) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{d.bloodType}</td>
              <td>{d.organType}</td>
              <td>{d.phone}</td>
              <td>{d.status}</td>
              <td>
                <Button size="sm">Edit</Button>
                <Button size="sm" variant="destructive">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
