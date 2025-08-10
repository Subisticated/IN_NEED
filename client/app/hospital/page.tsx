"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Hospital,
  Heart,
  Plus,
  Eye,
  CheckCircle,
  X,
  Clock,
  AlertTriangle,
  Users,
  Calendar,
  MapPin,
  Upload,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { logout } from "../api/auth"

export default function HospitalPortal() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const router = useRouter()

  const requests = [
    {
      id: 1,
      type: "Blood",
      bloodType: "O-",
      urgency: "Critical",
      hospital: "City General Hospital",
      status: "Active",
      timeLeft: "2h 30m",
    },
    {
      id: 2,
      type: "Kidney",
      bloodType: "A+",
      urgency: "Urgent",
      hospital: "St. Mary's Medical Center",
      status: "Active",
      timeLeft: "8h 15m",
    },
    {
      id: 3,
      type: "Blood",
      bloodType: "B+",
      urgency: "Normal",
      hospital: "Regional Medical Center",
      status: "Fulfilled",
      timeLeft: "Completed",
    },
  ]

  const organListings = [
    {
      id: 1,
      organ: "Heart",
      bloodType: "AB+",
      timeLeft: "4h 23m",
      hospital: "Metro General",
      status: "Available",
    },
    {
      id: 2,
      organ: "Liver",
      bloodType: "O+",
      timeLeft: "6h 45m",
      hospital: "City Medical",
      status: "Reserved",
    },
    {
      id: 3,
      organ: "Kidney",
      bloodType: "A-",
      timeLeft: "12h 10m",
      hospital: "Regional Center",
      status: "Available",
    },
  ]

  const bloodCamps = [
    {
      id: 1,
      title: "Community Blood Drive",
      date: "2024-02-15",
      time: "09:00 AM",
      location: "City Community Center",
      expectedDonors: 50,
      rsvpCount: 32,
    },
    {
      id: 2,
      title: "University Health Fair",
      date: "2024-02-20",
      time: "10:00 AM",
      location: "State University Campus",
      expectedDonors: 100,
      rsvpCount: 78,
    },
  ]

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-100 text-red-800"
      case "Urgent":
        return "bg-orange-100 text-orange-800"
      case "Normal":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  useEffect(() => {
    // Protect Hospital Portal: redirect to login if not authenticated
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (!token) {
        window.location.href = "/login"
      }
    }
  }, [])

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
              <span className="text-sm text-gray-600">City General Hospital</span>
              <Button variant="outline" size="sm" onClick={() => { logout(); window.location.href = "/login" }}>Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("dashboard")}
            >
              <Hospital className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === "post-request" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("post-request")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Post Request
            </Button>
            <Button
              variant={activeTab === "organ-listings" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("organ-listings")}
            >
              <Heart className="mr-2 h-4 w-4" />
              Organ Listings
            </Button>
            <Button
              variant={activeTab === "usage-log" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("usage-log")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Usage Log
            </Button>
            <Button
              variant={activeTab === "camp-manager" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("camp-manager")}
            >
              <Users className="mr-2 h-4 w-4" />
              Camp Manager
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Request
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Critical Requests</p>
                        <p className="text-2xl font-bold text-gray-900">3</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Active Requests</p>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Fulfilled Today</p>
                        <p className="text-2xl font-bold text-gray-900">8</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Available Donors</p>
                        <p className="text-2xl font-bold text-gray-900">156</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Requests Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Requests</CardTitle>
                  <CardDescription>Manage your blood and organ requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Blood Type</TableHead>
                        <TableHead>Urgency</TableHead>
                        <TableHead>Hospital</TableHead>
                        <TableHead>Time Left</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.type}</TableCell>
                          <TableCell>{request.bloodType}</TableCell>
                          <TableCell>
                            <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                          </TableCell>
                          <TableCell>{request.hospital}</TableCell>
                          <TableCell>{request.timeLeft}</TableCell>
                          <TableCell>
                            <Badge variant={request.status === "Active" ? "default" : "secondary"}>
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "post-request" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">Post New Request</h1>

              <Card>
                <CardHeader>
                  <CardTitle>Request Details</CardTitle>
                  <CardDescription>Fill in the details for your blood or organ request</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="request-type">Request Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blood">Blood</SelectItem>
                          <SelectItem value="kidney">Kidney</SelectItem>
                          <SelectItem value="liver">Liver</SelectItem>
                          <SelectItem value="heart">Heart</SelectItem>
                          <SelectItem value="lung">Lung</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="blood-type">Blood Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a+">A+</SelectItem>
                          <SelectItem value="a-">A-</SelectItem>
                          <SelectItem value="b+">B+</SelectItem>
                          <SelectItem value="b-">B-</SelectItem>
                          <SelectItem value="ab+">AB+</SelectItem>
                          <SelectItem value="ab-">AB-</SelectItem>
                          <SelectItem value="o+">O+</SelectItem>
                          <SelectItem value="o-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="urgency">Urgency Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="quantity">Quantity Needed</Label>
                      <Input placeholder="e.g., 2 units, 1 organ" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="hospital-info">Hospital Information</Label>
                    <Input placeholder="Hospital name and department" />
                  </div>

                  <div>
                    <Label htmlFor="additional-info">Additional Information</Label>
                    <Textarea placeholder="Any additional details about the request..." />
                  </div>

                  <Button className="w-full">Submit Request</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "organ-listings" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">Deceased Organ Listings</h1>

              <Card>
                <CardHeader>
                  <CardTitle>Available Organs</CardTitle>
                  <CardDescription>Organs available for transplantation with expiry countdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Organ Type</TableHead>
                        <TableHead>Blood Type</TableHead>
                        <TableHead>Time Remaining</TableHead>
                        <TableHead>Source Hospital</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {organListings.map((organ) => (
                        <TableRow key={organ.id}>
                          <TableCell className="font-medium">{organ.organ}</TableCell>
                          <TableCell>{organ.bloodType}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-orange-500" />
                              <span className="font-mono text-sm">{organ.timeLeft}</span>
                            </div>
                          </TableCell>
                          <TableCell>{organ.hospital}</TableCell>
                          <TableCell>
                            <Badge variant={organ.status === "Available" ? "default" : "secondary"}>
                              {organ.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                              <Button size="sm">Request</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "usage-log" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">Usage Log</h1>

              <Card>
                <CardHeader>
                  <CardTitle>Mark Donation Status</CardTitle>
                  <CardDescription>Update the status of received donations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="donation-id">Donation ID</Label>
                      <Input placeholder="Enter donation ID" />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="used">Used</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="proof-upload">Upload Proof</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="remarks">Remarks</Label>
                    <Textarea placeholder="Additional remarks or notes..." />
                  </div>

                  <Button className="w-full">Update Status</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "camp-manager" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Blood Camp Manager</h1>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Camp
                </Button>
              </div>

              {/* Existing Camps */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Blood Donation Camps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bloodCamps.map((camp) => (
                      <Card key={camp.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg">{camp.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center">
                                <Calendar className="mr-1 h-4 w-4" />
                                {camp.date} at {camp.time}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="mr-1 h-4 w-4" />
                                {camp.location}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Badge variant="outline">Expected: {camp.expectedDonors} donors</Badge>
                              <Badge variant="secondary">
                                RSVP: {camp.rsvpCount}/{camp.expectedDonors}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              View RSVPs
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Create New Camp Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Create New Blood Donation Camp</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="camp-title">Camp Title</Label>
                    <Input placeholder="Enter camp title" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="camp-date">Date</Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label htmlFor="camp-time">Time</Label>
                      <Input type="time" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="camp-location">Location</Label>
                    <Input placeholder="Enter camp location" />
                  </div>

                  <div>
                    <Label htmlFor="expected-donors">Expected Number of Donors</Label>
                    <Input type="number" placeholder="50" />
                  </div>

                  <Button className="w-full">Create Blood Camp</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
