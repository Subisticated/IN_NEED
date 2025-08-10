"use client"
import { useEffect, useState } from "react"
import { useProtectedRoute } from "@/hooks/useProtectedRoute"
import { getDonorProfile } from "@/utils/donorApi"
import { Card, CardContent, CardHeader, CardTitle, Separator } from "@/components/ui/card"
import { Heart, QrCode } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { User } from "@/utils/types"

export default function QRDonorCardPage() {
  useProtectedRoute(["Donor"])
  const [profile, setProfile] = useState<User | null>(null)
  useEffect(() => {
    getDonorProfile().then(setProfile)
  }, [])
  return (
    <div className="max-w-xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>QR Donor Card</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-lg mb-4">
            <div className="mb-4">
              <Heart className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-bold text-lg">In Need</h3>
            </div>
            <Separator className="my-4 bg-blue-400" />
            <div className="text-left space-y-2">
              <p><span className="font-semibold">Name:</span> {profile?.name || "-"}</p>
              <p><span className="font-semibold">Blood Type:</span> {profile?.bloodType || "-"}</p>
              <p><span className="font-semibold">ID:</span> {profile?._id ? `DN-${profile._id.slice(-6).toUpperCase()}` : "-"}</p>
              <p><span className="font-semibold">Status:</span> <Badge className={`ml-2 ${profile?.isAvailable ? "bg-green-500" : "bg-gray-400"}`}>{profile?.isAvailable ? "Available" : "Not Available"}</Badge></p>
            </div>
            <div className="mt-4 bg-white p-3 rounded">
              <div className="w-20 h-20 bg-gray-200 mx-auto rounded flex items-center justify-center">
                {profile?._id ? (
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(profile._id)}`} alt="QR Code" className="h-16 w-16" />
                ) : (
                  <QrCode className="h-12 w-12 text-gray-600" />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
