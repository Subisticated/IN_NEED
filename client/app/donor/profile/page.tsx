"use client"
import { useEffect, useState } from "react";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { getDonorProfile } from "@/utils/donorApi";
import { User } from "@/utils/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function DonorProfilePage() {
  useProtectedRoute(["Donor"]);
  const [profile, setProfile] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    getDonorProfile().then(setProfile);
  }, [])
  return (
    <div className="max-w-xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>View and edit your donor profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div><b>Name:</b> {profile?.name || '-'}</div>
            <div><b>Email:</b> {profile?.email || '-'}</div>
            <div><b>Blood Type:</b> {profile?.bloodType || '-'}</div>
            <div><b>Role:</b> {profile?.role || '-'}</div>
          </div>
          <Button className="mt-4" variant="outline" size="sm" onClick={() => router.push("/donor/profile/edit-profile")}> <Edit className="mr-2 h-4 w-4" />Edit Profile</Button>
        </CardContent>
      </Card>
    </div>
  )
}
