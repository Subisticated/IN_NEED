"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Overview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const [alive, deceased, bloodReq, organReq, bloodInv, organInv] = await Promise.all([
        axios.get("/api/donors/alive", { headers }),
        axios.get("/api/donors/deceased", { headers }),
        axios.get("/api/requests/blood?status=pending", { headers }),
        axios.get("/api/requests/organ?status=pending", { headers }),
        axios.get("/api/inventory/blood", { headers }),
        axios.get("/api/inventory/organs", { headers }),
      ]);
      setStats({
        alive: alive.data.length,
        deceased: deceased.data.length,
        bloodReq: bloodReq.data.length,
        organReq: organReq.data.length,
        bloodInv: bloodInv.data,
        organInv: organInv.data,
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle>Alive Donors</CardTitle></CardHeader>
        <CardContent>{stats.alive}</CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Deceased Donors</CardTitle></CardHeader>
        <CardContent>{stats.deceased}</CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Pending Blood Requests</CardTitle></CardHeader>
        <CardContent>{stats.bloodReq}</CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Pending Organ Requests</CardTitle></CardHeader>
        <CardContent>{stats.organReq}</CardContent>
      </Card>
      {/* Example chart for blood inventory */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader><CardTitle>Blood Inventory</CardTitle></CardHeader>
        <CardContent>
          <Bar
            data={{
              labels: stats.bloodInv.map((b: any) => b.type),
              datasets: [{ label: "Units", data: stats.bloodInv.map((b: any) => b.units), backgroundColor: "rgba(59,130,246,0.5)" }]
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
