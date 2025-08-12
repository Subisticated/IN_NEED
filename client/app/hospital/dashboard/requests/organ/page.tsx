"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function OrganRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/requests/organ", { headers: { Authorization: `Bearer ${token}` } });
      setRequests(data);
      setLoading(false);
    };
    fetchRequests();
  }, []);

  const handleAction = async (id: string, action: "accept" | "reject") => {
    const token = localStorage.getItem("token");
    await axios.post(`/api/requests/organ/${id}/${action}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    setRequests(reqs => reqs.filter((r: any) => r._id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Organ Requests</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th>Patient</th><th>Organ</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r: any) => (
            <tr key={r._id}>
              <td>{r.patientName}</td>
              <td>{r.organType}</td>
              <td>{r.status}</td>
              <td>
                <Button size="sm" onClick={() => handleAction(r._id, "accept")}>Accept</Button>
                <Button size="sm" variant="destructive" onClick={() => handleAction(r._id, "reject")}>Reject</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
