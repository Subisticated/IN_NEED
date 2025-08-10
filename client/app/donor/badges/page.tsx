"use client"
import { useEffect, useState } from "react";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { getDonorBadges } from "@/utils/donorApi";
import { Badge } from "@/utils/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function DonorBadgesPage() {
  useProtectedRoute(["Donor"]);
  const [badges, setBadges] = useState<Badge[]>([]);
  useEffect(() => {
    getDonorBadges().then(setBadges);
  }, []);
  return (
    <div className="max-w-xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Achievement Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.length === 0 && <div className="col-span-4 text-center text-gray-500">No badges yet</div>}
              {badges.map((badge, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                      <div className="text-2xl mb-2">{badge.icon}</div>
                      <div className="text-sm font-medium">{badge.name}</div>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{badge.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  )
}
