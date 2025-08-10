"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Phone, MapPin, Navigation, Heart, Clock, Users, Calendar, AlertTriangle, Info, Search } from "lucide-react"
import Link from "next/link"

export default function EmergencyPortal() {
  const [autoLocate, setAutoLocate] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const nearbyHospitals = [
    {
      id: 1,
      name: "City General Hospital",
      distance: "0.8 km",
      status: "Available",
      bloodBank: "Full Stock",
      emergencyWait: "15 min",
      phone: "+1-555-0101",
    },
    {
      id: 2,
      name: "St. Mary's Medical Center",
      distance: "1.2 km",
      status: "Busy",
      bloodBank: "Low Stock",
      emergencyWait: "25 min",
      phone: "+1-555-0102",
    },
    {
      id: 3,
      name: "Regional Medical Center",
      distance: "2.1 km",
      status: "Available",
      bloodBank: "Full Stock",
      emergencyWait: "10 min",
      phone: "+1-555-0103",
    },
    {
      id: 4,
      name: "Metro Emergency Hospital",
      distance: "2.8 km",
      status: "Full",
      bloodBank: "Medium Stock",
      emergencyWait: "45 min",
      phone: "+1-555-0104",
    },
  ]

  const upcomingCamps = [
    {
      id: 1,
      title: "Community Blood Drive",
      hospital: "City General Hospital",
      date: "Feb 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "City Community Center",
      rsvpCount: 32,
      maxCapacity: 50,
    },
    {
      id: 2,
      title: "University Health Fair",
      hospital: "St. Mary's Medical Center",
      date: "Feb 20, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "State University Campus",
      rsvpCount: 78,
      maxCapacity: 100,
    },
    {
      id: 3,
      title: "Corporate Wellness Drive",
      hospital: "Regional Medical Center",
      date: "Feb 25, 2024",
      time: "8:00 AM - 2:00 PM",
      location: "Tech Park Business Center",
      rsvpCount: 45,
      maxCapacity: 75,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Busy":
        return "bg-yellow-100 text-yellow-800"
      case "Full":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getBloodBankColor = (stock: string) => {
    switch (stock) {
      case "Full Stock":
        return "text-green-600"
      case "Medium Stock":
        return "text-yellow-600"
      case "Low Stock":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">In Need</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="destructive" className="animate-pulse">
                <AlertTriangle className="mr-1 h-3 w-3" />
                Emergency Portal
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Emergency Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-8 mb-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Emergency Medical Access</h1>
            <p className="text-xl mb-8 text-red-100">Get immediate help and find nearby medical facilities</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 flex-1" onClick={() => window.open('tel:911')}>
                <Phone className="mr-2 h-6 w-6" />
                Call Ambulance (911)
              </Button>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Input
                    placeholder="Search hospitals or enter location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white text-gray-900"
                  />
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <Switch
                    checked={autoLocate}
                    onCheckedChange={setAutoLocate}
                    className="data-[state=checked]:bg-blue-500"
                  />
                  <span className="text-red-100">Auto-locate me</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Hospital Map & List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Nearby Hospitals Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Interactive Map View</p>
                    <p className="text-sm">Hospital locations with real-time status</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hospital List */}
            <Card>
              <CardHeader>
                <CardTitle>Nearby Hospitals</CardTitle>
                <CardDescription>Real-time availability and emergency wait times</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nearbyHospitals.map((hospital) => (
                    <Card key={hospital.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{hospital.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center">
                              <Navigation className="mr-1 h-3 w-3" />
                              {hospital.distance}
                            </span>
                            <span className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {hospital.emergencyWait} wait
                            </span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(hospital.status)}>{hospital.status}</Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <span className={`text-sm font-medium ${getBloodBankColor(hospital.bloodBank)}`}>
                            🩸 {hospital.bloodBank}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => window.open('tel:' + hospital.phone)}>
                            <Phone className="mr-1 h-3 w-3" />
                            Call
                          </Button>
                          <Button size="sm" onClick={() => window.open('https://maps.google.com/?q=' + encodeURIComponent(hospital.name))}>
                            <Navigation className="mr-1 h-3 w-3" />
                            Directions
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Info & Blood Camps */}
          <div className="space-y-6">
            {/* Quick Emergency Info */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Emergency Numbers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium">Ambulance</span>
                  <span className="font-bold text-red-600">911</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Poison Control</span>
                  <span className="font-bold text-blue-600">1-800-222-1222</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Crisis Hotline</span>
                  <span className="font-bold text-green-600">988</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info Cards */}
            <div className="space-y-4">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">How to Become a Donor</h3>
                    <p className="text-sm text-gray-600">Learn about donation requirements</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Heart className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">CPR & First Aid</h3>
                    <p className="text-sm text-gray-600">Emergency response guide</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Info className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Blood Compatibility Chart</h3>
                    <p className="text-sm text-gray-600">Donor-recipient matching</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Blood Donation Camps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Upcoming Blood Camps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingCamps.map((camp) => (
                    <Card key={camp.id} className="p-4 border-l-4 border-l-blue-500">
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm">{camp.title}</h3>
                        <p className="text-xs text-gray-600">{camp.hospital}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{camp.date}</span>
                          <span>{camp.time}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">{camp.location}</span>
                          <Badge variant="outline" className="text-xs">
                            {camp.rsvpCount}/{camp.maxCapacity} RSVP
                          </Badge>
                        </div>
                        <Button size="sm" className="w-full mt-2" onClick={() => alert('RSVP submitted!')}>
                          RSVP Now
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
