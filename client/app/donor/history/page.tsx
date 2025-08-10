"use client"
import { useEffect, useState } from "react";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { getDonorHistory } from "@/utils/donorApi";
import { Donation } from "@/utils/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets } from "lucide-react"

export default function DonorHistoryPage() {
  useProtectedRoute(["Donor"]);
  const [donationHistory, setDonationHistory] = useState<Donation[]>([]);
  useEffect(() => {
    getDonorHistory().then(setDonationHistory);
  }, [])
  return (
    <div className="max-w-xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {donationHistory.length === 0 && <div className="text-center text-gray-500">No donation history yet</div>}
            {donationHistory.map((donation, index) => (
              <div key={donation.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Droplets className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{donation.type}</p>
                    <Badge variant="secondary">{donation.status}</Badge>
                  </div>
                  <p className="text-xs text-gray-500">{donation.hospital} | {donation.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
