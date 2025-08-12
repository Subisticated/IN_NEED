"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeceasedDonors() {
  const [donors, setDonors] = useState([]);
  useEffect(() => {
    const fetchDonors = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/donors/deceased", { headers: { Authorization: `Bearer ${token}` } });
      setDonors(data);
    };
    fetchDonors();
  }, []);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Deceased Donors</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th>Name</th><th>Blood Group</th><th>Organ Type</th><th>Contact</th><th>Expires In</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((d: any) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{d.bloodType}</td>
              <td>{d.organType}</td>
              <td>{d.phone}</td>
              <td>{/* calculate expiry timer here */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
