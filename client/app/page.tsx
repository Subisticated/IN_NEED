'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Hospital, Users, Phone } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">In Need</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/emergency" className="text-gray-700 hover:text-blue-600">
                Emergency
              </Link>
              <Link href="/donor" className="text-gray-700 hover:text-blue-600">
                Donor Portal
              </Link>
              <Link href="/hospital" className="text-gray-700 hover:text-blue-600">
                Hospital Portal
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Connecting Lives Through Donation</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Emergency blood and organ donation platform connecting hospitals and donors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/emergency">
              <Button size="lg" variant="destructive" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3">
                <Phone className="mr-2 h-5 w-5" />
                Emergency Access
              </Button>
            </Link>
            <Link href="/donor">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-3">
                Become a Donor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Portal Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Donor Portal</CardTitle>
              <CardDescription>
                Manage your donor profile, view history, and access your digital donor card
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => window.location.href = '/donor'}>
                Access Donor Portal
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Hospital className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Hospital Portal</CardTitle>
              <CardDescription>Post requests, manage organ listings, and organize blood donation camps</CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => window.location.href = '/hospital'}>
                Access Hospital Portal
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-red-200">
            <CardHeader className="text-center">
              <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-red-600">Emergency Access</CardTitle>
              <CardDescription>Find nearby hospitals, call ambulance, and access emergency resources</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => window.location.href = '/emergency'}>
                Emergency Portal
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-gray-600">Registered Donors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Partner Hospitals</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">25,000+</div>
              <div className="text-gray-600">Lives Saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">In Need</span>
              </div>
              <p className="text-gray-400">Connecting lives through emergency blood and organ donations.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/emergency" className="hover:text-white">
                    Emergency
                  </Link>
                </li>
                <li>
                  <Link href="/donor" className="hover:text-white">
                    Donor Portal
                  </Link>
                </li>
                <li>
                  <Link href="/hospital" className="hover:text-white">
                    Hospital Portal
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    How to Donate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    CPR & First Aid
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blood Compatibility
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Emergency</h3>
              <p className="text-red-400 text-lg font-bold">911</p>
              <p className="text-gray-400">24/7 Emergency Hotline</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 In Need Healthcare Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
