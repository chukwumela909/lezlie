"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as z from "zod"
import { Eye, EyeOff, ArrowLeft, Stethoscope } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const doctorOnboardingSchema = z.object({
  inviteCode: z.string().min(6, "Please enter a valid invite code"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  medicalLicense: z.string().min(5, "Please enter a valid medical license number"),
  specialty: z.string().min(2, "Please enter your medical specialty"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type DoctorOnboardingValues = z.infer<typeof doctorOnboardingSchema>

export default function DoctorOnboardingPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [inviteCodeVerified, setInviteCodeVerified] = useState(false)
  const router = useRouter()

  const form = useForm<DoctorOnboardingValues>({
    resolver: zodResolver(doctorOnboardingSchema),
    defaultValues: {
      inviteCode: "",
      firstName: "",
      lastName: "",
      email: "",
      medicalLicense: "",
      specialty: "",
      password: "",
      confirmPassword: "",
    },
  })

  const verifyInviteCode = async () => {
    const inviteCode = form.getValues("inviteCode")
    if (!inviteCode || inviteCode.length < 6) {
      form.setError("inviteCode", { message: "Please enter a valid invite code" })
      return
    }

    setIsLoading(true)
    try {
      // TODO: Implement actual invite code verification
      console.log("Verifying invite code:", inviteCode)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // TODO: Validate invite code with backend
      setInviteCodeVerified(true)
      
    } catch (error) {
      console.error("Invite code verification error:", error)
      form.setError("inviteCode", { message: "Invalid invite code" })
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: DoctorOnboardingValues) => {
    if (!inviteCodeVerified) {
      form.setError("inviteCode", { message: "Please verify your invite code first" })
      return
    }

    setIsLoading(true)
    try {
      // TODO: Implement actual doctor registration logic
      console.log("Doctor onboarding attempt:", data)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // TODO: Redirect to doctor dashboard after successful registration
      console.log("Navigate to /doctor/dashboard")
      
    } catch (error) {
      console.error("Doctor onboarding error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">SASS</span>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => router.push('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Doctor Onboarding Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Doctor Onboarding</CardTitle>
            <CardDescription>
              Complete your profile to start accepting appointments
            </CardDescription>
          </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="inviteCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invite Code</FormLabel>
                    <FormControl>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Enter invite code"
                          {...field}
                          disabled={inviteCodeVerified}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={verifyInviteCode}
                          disabled={isLoading || inviteCodeVerified}
                        >
                          {inviteCodeVerified ? "Verified" : "Verify"}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {inviteCodeVerified && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Dr. John"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Smith"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="dr.smith@hospital.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medicalLicense"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical License Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="License number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical Specialty</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Cardiology, Pediatrics"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Complete Onboarding"}
                  </Button>
                </>
              )}
            </form>
          </Form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-3"
              onClick={() => {
                // TODO: Navigate to login
                console.log("Navigate to /auth/login")
              }}
            >
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
