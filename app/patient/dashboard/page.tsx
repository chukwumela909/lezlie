"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stethoscope, Calendar, Clock, User, Settings, LogOut, Bell, Plus, ChevronRight, MapPin, Phone, CheckCircle, X, AlertCircle } from "lucide-react"

export default function PatientDashboard() {
  const router = useRouter()
  const [activeView, setActiveView] = useState("dashboard") // dashboard, history, settings, booking
  const [notifications, setNotifications] = useState(2)
  const [showBookingFlow, setShowBookingFlow] = useState(false)
  const [bookingStep, setBookingStep] = useState(1) // 1: doctor selection, 2: time selection, 3: confirmation
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [isBooking, setIsBooking] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertConfig, setAlertConfig] = useState({
    type: "success" as "success" | "error" | "warning" | "info",
    title: "",
    message: "",
    onConfirm: () => {},
    onCancel: () => {},
    showCancel: false
  })

  // Dummy data
  const availableDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      experience: "15 years",
      rating: 4.9,
      image: "👩‍⚕️",
      nextAvailable: "Tomorrow"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Cardiology",
      experience: "12 years",
      rating: 4.8,
      image: "👨‍⚕️",
      nextAvailable: "Friday"
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Dermatology",
      experience: "8 years",
      rating: 4.7,
      image: "👩‍⚕️",
      nextAvailable: "Next Week"
    },
    {
      id: 4,
      name: "Dr. Robert Wilson",
      specialty: "Orthopedics",
      experience: "20 years",
      rating: 4.9,
      image: "👨‍⚕️",
      nextAvailable: "Monday"
    }
  ]

  const availableTimeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ]
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      type: "General Checkup",
      date: "2025-07-30",
      time: "2:00 PM",
      location: "Room 201",
      status: "confirmed"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Cardiology",
      type: "Heart Consultation",
      date: "2025-08-05",
      time: "10:30 AM",
      location: "Room 105",
      status: "pending"
    }
  ]

  const appointmentHistory = [
    {
      id: 1,
      doctor: "Dr. Emily Davis",
      specialty: "Dermatology",
      type: "Skin Examination",
      date: "2025-07-20",
      time: "3:00 PM",
      status: "completed",
      notes: "Follow-up in 6 months"
    },
    {
      id: 2,
      doctor: "Dr. Robert Wilson",
      specialty: "Orthopedics",
      type: "Knee Consultation",
      date: "2025-07-15",
      time: "11:00 AM",
      status: "completed",
      notes: "Prescribed physical therapy"
    },
    {
      id: 3,
      doctor: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      type: "Annual Physical",
      date: "2025-06-30",
      time: "9:00 AM",
      status: "completed",
      notes: "All tests normal"
    }
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Appointment confirmed",
      details: "Dr. Sarah Johnson - Tomorrow 2:00 PM",
      time: "2 hours ago",
      type: "appointment"
    },
    {
      id: 2,
      action: "Lab results available",
      details: "Blood work - All results normal",
      time: "1 day ago",
      type: "results"
    },
    {
      id: 3,
      action: "Prescription refilled",
      details: "Vitamin D supplement",
      time: "3 days ago",
      type: "prescription"
    }
  ]

  const handleLogout = () => {
    // Simulate logout
    console.log("Logging out...")
    router.push("/")
  }

  const handleBookAppointment = () => {
    setShowBookingFlow(true)
    setBookingStep(1)
    setActiveView("booking")
  }

  const selectDoctor = (doctor: any) => {
    setSelectedDoctor(doctor)
    setBookingStep(2)
  }

  const selectDateTime = (date: string, time: string) => {
    setSelectedDate(date)
    setSelectedTime(time)
    setBookingStep(3)
  }

  const confirmBooking = async () => {
    setIsBooking(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Show success message
      showSuccessAlert(
        "🎉 Appointment Booked Successfully!",
        `Your appointment has been confirmed!\n\nDoctor: ${selectedDoctor.name}\nDate: ${new Date(selectedDate).toLocaleDateString()}\nTime: ${selectedTime}\n\nYou will receive a confirmation email shortly.`,
        () => {
          // Reset booking flow
          setShowBookingFlow(false)
          setBookingStep(1)
          setSelectedDoctor(null)
          setSelectedDate("")
          setSelectedTime("")
          setActiveView("dashboard")
          setShowAlert(false)
        }
      )
      
    } catch (error) {
      showErrorAlert(
        "Booking Failed",
        "Sorry, there was an error booking your appointment. Please try again or contact support if the problem persists."
      )
    } finally {
      setIsBooking(false)
    }
  }

  const cancelBooking = () => {
    showConfirmAlert(
      "Cancel Booking Process",
      "Are you sure you want to cancel the booking process? All your selections will be lost.",
      () => {
        setShowBookingFlow(false)
        setBookingStep(1)
        setSelectedDoctor(null)
        setSelectedDate("")
        setSelectedTime("")
        setActiveView("dashboard")
        setShowAlert(false)
      }
    )
  }

  const handleReschedule = (appointmentId: number) => {
    showInfoAlert(
      "Reschedule Appointment",
      "In a real app, this would open a calendar picker to select a new date and time for your appointment."
    )
  }

  const handleCancelAppointment = (appointmentId: number) => {
    showConfirmAlert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment? This action cannot be undone.",
      () => {
        showSuccessAlert(
          "Appointment Cancelled",
          `Your appointment has been successfully cancelled. You will receive a confirmation email shortly.`
        )
        setShowAlert(false)
      }
    )
  }

  const clearNotifications = () => {
    setNotifications(0)
  }

  // Custom alert helpers
  const showSuccessAlert = (title: string, message: string, onConfirm = () => {}) => {
    setAlertConfig({
      type: "success",
      title,
      message,
      onConfirm,
      onCancel: () => {},
      showCancel: false
    })
    setShowAlert(true)
  }

  const showErrorAlert = (title: string, message: string) => {
    setAlertConfig({
      type: "error",
      title,
      message,
      onConfirm: () => setShowAlert(false),
      onCancel: () => {},
      showCancel: false
    })
    setShowAlert(true)
  }

  const showConfirmAlert = (title: string, message: string, onConfirm: () => void) => {
    setAlertConfig({
      type: "warning",
      title,
      message,
      onConfirm,
      onCancel: () => setShowAlert(false),
      showCancel: true
    })
    setShowAlert(true)
  }

  const showInfoAlert = (title: string, message: string) => {
    setAlertConfig({
      type: "info",
      title,
      message,
      onConfirm: () => setShowAlert(false),
      onCancel: () => {},
      showCancel: false
    })
    setShowAlert(true)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">SASS</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={clearNotifications}
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">John Patient</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setActiveView("settings")}
              >
                <Settings className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-4 border-b">
            <button
              onClick={() => setActiveView("dashboard")}
              className={`px-4 py-2 font-medium ${
                activeView === "dashboard"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveView("history")}
              className={`px-4 py-2 font-medium ${
                activeView === "history"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Appointment History
            </button>
            <button
              onClick={() => setActiveView("settings")}
              className={`px-4 py-2 font-medium ${
                activeView === "settings"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Dashboard View */}
        {activeView === "dashboard" && (
          <>
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
              <p className="text-gray-600">Manage your appointments and health information here.</p>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={handleBookAppointment}>
                  <Plus className="h-5 w-5 mr-2" />
                  Book New Appointment
                </Button>
                <Button variant="outline" size="lg" onClick={() => setActiveView("history")}>
                  <Calendar className="h-5 w-5 mr-2" />
                  View History
                </Button>
                <Button variant="outline" size="lg" onClick={() => showInfoAlert("Calendar View", "Calendar view feature coming soon! This will show all your appointments in a monthly calendar format.")}>
                  <Clock className="h-5 w-5 mr-2" />
                  My Calendar
                </Button>
              </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Appointments */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                          Upcoming Appointments
                        </CardTitle>
                        <CardDescription>Your next scheduled visits</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setActiveView("history")}>
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{appointment.doctor}</h4>
                            <p className="text-sm text-gray-600">{appointment.type}</p>
                            <p className="text-sm text-blue-600">{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {appointment.location}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleReschedule(appointment.id)}
                            >
                              Reschedule
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleCancelAppointment(appointment.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No more upcoming appointments</p>
                        <Button className="mt-4" onClick={handleBookAppointment}>
                          Book Your Next Visit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Side Panel */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Appointments</span>
                      <span className="font-semibold">{appointmentHistory.length + upcomingAppointments.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">This Month</span>
                      <span className="font-semibold">{upcomingAppointments.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Next Visit</span>
                      <span className="font-semibold text-blue-600">
                        {upcomingAppointments.length > 0 ? "Tomorrow" : "None scheduled"}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.slice(0, 3).map((activity) => (
                        <div key={activity.id} className="text-sm">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-gray-500">{activity.details}</p>
                          <p className="text-xs text-gray-400">{activity.time}</p>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        View All Activity
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* History View */}
        {activeView === "history" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment History</h2>
              <p className="text-gray-600">View all your past appointments and medical visits.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Past Appointments</CardTitle>
                <CardDescription>Complete history of your medical visits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointmentHistory.map((appointment) => (
                    <div key={appointment.id} className="flex items-center p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{appointment.doctor}</h4>
                            <p className="text-sm text-gray-600">{appointment.specialty}</p>
                            <p className="text-sm text-blue-600">{appointment.type}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                            </p>
                            {appointment.notes && (
                              <p className="text-sm text-green-600 mt-1">
                                Note: {appointment.notes}
                              </p>
                            )}
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleBookAppointment}
                        >
                          Book Again
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings View */}
        {activeView === "settings" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h2>
              <p className="text-gray-600">Manage your profile and preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-gray-900">John Patient</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">john.patient@email.com</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900">(555) 123-4567</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <p className="text-gray-900">January 15, 1990</p>
                  </div>
                  <Button className="w-full">Edit Profile</Button>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to be notified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Email Notifications</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">SMS Reminders</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Appointment Confirmations</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Lab Result Alerts</span>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <Button variant="outline" className="w-full">Save Preferences</Button>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                  <CardDescription>Your emergency contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                    <p className="text-gray-900">Jane Patient</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                    <p className="text-gray-900">Spouse</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <p className="text-gray-900">(555) 987-6543</p>
                  </div>
                  <Button variant="outline" className="w-full">Update Contact</Button>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                  <CardDescription>Manage your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Update Contact Info
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <LogOut className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Booking Flow */}
        {activeView === "booking" && (
          <div>
            {/* Booking Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Book New Appointment</h2>
                <p className="text-gray-600">Select a doctor and preferred time for your visit.</p>
              </div>
              <Button variant="outline" onClick={cancelBooking}>
                Cancel Booking
              </Button>
            </div>

            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 ${bookingStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    1
                  </div>
                  <span className="font-medium">Select Doctor</span>
                </div>
                <div className={`h-px w-12 ${bookingStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <div className={`flex items-center space-x-2 ${bookingStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    2
                  </div>
                  <span className="font-medium">Select Time</span>
                </div>
                <div className={`h-px w-12 ${bookingStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <div className={`flex items-center space-x-2 ${bookingStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    3
                  </div>
                  <span className="font-medium">Confirm</span>
                </div>
              </div>
            </div>

            {/* Step 1: Doctor Selection */}
            {bookingStep === 1 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Doctor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableDoctors.map((doctor) => (
                    <Card key={doctor.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => selectDoctor(doctor)}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="text-4xl">{doctor.image}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                            <p className="text-sm text-gray-500">{doctor.experience} experience</p>
                            <div className="flex items-center mt-2">
                              <span className="text-yellow-500">⭐</span>
                              <span className="text-sm text-gray-600 ml-1">{doctor.rating}/5.0</span>
                            </div>
                            <p className="text-sm text-blue-600 mt-1">Next available: {doctor.nextAvailable}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Time Selection */}
            {bookingStep === 2 && selectedDoctor && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Date & Time</h3>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span>Booking with:</span>
                    <span className="font-medium">{selectedDoctor.name}</span>
                    <span>•</span>
                    <span>{selectedDoctor.specialty}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Date Selection */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Select Date</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { date: "2025-07-30", label: "Tomorrow", day: "Wed" },
                        { date: "2025-07-31", label: "Thursday", day: "Thu" },
                        { date: "2025-08-01", label: "Friday", day: "Fri" },
                        { date: "2025-08-04", label: "Monday", day: "Mon" },
                        { date: "2025-08-05", label: "Tuesday", day: "Tue" },
                        { date: "2025-08-06", label: "Wednesday", day: "Wed" }
                      ].map((dateOption) => (
                        <button
                          key={dateOption.date}
                          onClick={() => setSelectedDate(dateOption.date)}
                          className={`p-3 border rounded-lg text-center hover:bg-blue-50 ${
                            selectedDate === dateOption.date ? 'bg-blue-100 border-blue-500' : 'border-gray-200'
                          }`}
                        >
                          <div className="font-medium text-gray-900">{dateOption.label}</div>
                          <div className="text-sm text-gray-500">{dateOption.day}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Select Time</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {availableTimeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 border rounded-lg text-center hover:bg-blue-50 ${
                            selectedTime === time ? 'bg-blue-100 border-blue-500' : 'border-gray-200'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex space-x-4">
                  <Button variant="outline" onClick={() => setBookingStep(1)}>
                    Back to Doctors
                  </Button>
                  <Button 
                    onClick={() => selectDateTime(selectedDate, selectedTime)}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1"
                  >
                    Continue to Confirmation
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {bookingStep === 3 && selectedDoctor && selectedDate && selectedTime && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Confirm Your Appointment</h3>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Doctor:</span>
                        <span className="font-medium">{selectedDoctor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Specialty:</span>
                        <span className="font-medium">{selectedDoctor.specialty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Patient:</span>
                        <span className="font-medium">John Patient</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Appointment Type:</span>
                        <span className="font-medium">General Consultation</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Before Your Appointment</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Arrive 15 minutes early for check-in</li>
                    <li>• Bring a valid ID and insurance card</li>
                    <li>• List any current medications</li>
                    <li>• You'll receive a confirmation email shortly</li>
                  </ul>
                </div>

                <div className="mt-8 flex space-x-4">
                  <Button variant="outline" onClick={() => setBookingStep(2)}>
                    Back to Time Selection
                  </Button>
                  <Button 
                    onClick={confirmBooking}
                    disabled={isBooking}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {isBooking ? "Booking..." : "Confirm Appointment"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Custom Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Alert Header */}
            <div className={`flex items-center p-6 rounded-t-lg ${
              alertConfig.type === "success" ? "bg-green-50" :
              alertConfig.type === "error" ? "bg-red-50" :
              alertConfig.type === "warning" ? "bg-yellow-50" :
              "bg-blue-50"
            }`}>
              <div className={`flex-shrink-0 mr-4 ${
                alertConfig.type === "success" ? "text-green-600" :
                alertConfig.type === "error" ? "text-red-600" :
                alertConfig.type === "warning" ? "text-yellow-600" :
                "text-blue-600"
              }`}>
                {alertConfig.type === "success" && <CheckCircle className="h-8 w-8" />}
                {alertConfig.type === "error" && <X className="h-8 w-8" />}
                {alertConfig.type === "warning" && <AlertCircle className="h-8 w-8" />}
                {alertConfig.type === "info" && <Stethoscope className="h-8 w-8" />}
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${
                  alertConfig.type === "success" ? "text-green-900" :
                  alertConfig.type === "error" ? "text-red-900" :
                  alertConfig.type === "warning" ? "text-yellow-900" :
                  "text-blue-900"
                }`}>
                  {alertConfig.title}
                </h3>
              </div>
            </div>

            {/* Alert Body */}
            <div className="p-6">
              <p className="text-gray-700 whitespace-pre-line">
                {alertConfig.message}
              </p>
            </div>

            {/* Alert Actions */}
            <div className="flex justify-end space-x-3 p-6 bg-gray-50 rounded-b-lg">
              {alertConfig.showCancel && (
                <Button 
                  variant="outline" 
                  onClick={alertConfig.onCancel}
                >
                  Cancel
                </Button>
              )}
              <Button 
                onClick={alertConfig.onConfirm}
                className={
                  alertConfig.type === "success" ? "bg-green-600 hover:bg-green-700" :
                  alertConfig.type === "error" ? "bg-red-600 hover:bg-red-700" :
                  alertConfig.type === "warning" ? "bg-yellow-600 hover:bg-yellow-700" :
                  "bg-blue-600 hover:bg-blue-700"
                }
              >
                {alertConfig.showCancel ? "Confirm" : "OK"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
