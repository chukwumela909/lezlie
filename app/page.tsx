"use client"

import { useRouter } from "next/navigation"
import { Calendar, Clock, Users, Shield, ArrowRight, Heart, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AUTH_ROUTES } from "@/lib/navigation/routes"

export default function Home() {
  const router = useRouter()

  const features = [
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description: "Book appointments with your preferred doctors in just a few clicks"
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Get instant notifications about appointment confirmations and changes"
    },
    {
      icon: Users,
      title: "For Everyone",
      description: "Designed for patients, doctors, and healthcare administrators"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your medical information is protected with enterprise-grade security"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">SASS</span>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push(AUTH_ROUTES.LOGIN)}
          >
            Book Appointment
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?fm=jpg&q=80&w=1920&ixlib=rb-4.0.3')"
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-blue-900/40"></div>
        
        {/* Content overlay */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl">
            {/* Text Content */}
            <div className="text-white">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Smart Appointment
                <span className="text-blue-300"> Scheduling</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl">
                Streamline your healthcare experience with our intelligent appointment booking system. 
                Connect patients with doctors effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-blue-50"
                  onClick={() => router.push(AUTH_ROUTES.REGISTER)}
                >
                  Get Started as Patient
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4 bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 shadow-lg"
                  onClick={() => router.push(AUTH_ROUTES.DOCTOR_ONBOARDING)}
                >
                  Join as Doctor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose SASS?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built specifically for modern healthcare needs with cutting-edge technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* CTA Text */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Healthcare Experience?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of patients and healthcare providers already using SASS
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-3"
                onClick={() => router.push(AUTH_ROUTES.REGISTER)}
              >
                Start Your Journey Today
              </Button>
            </div>
            
            {/* CTA Image */}
            <div className="relative">
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl h-[350px] bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1638202993928-7267aad84c31?fm=jpg&q=80&w=600&ixlib=rb-4.0.3')"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              </div>
              {/* Trust indicators */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Stethoscope className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">SASS</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 Smart Appointment Scheduling System. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
