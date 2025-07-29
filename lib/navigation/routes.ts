export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DOCTOR_ONBOARDING: '/doctor/onboarding',
  ADMIN_SETUP: '/admin/setup',
} as const

export const DASHBOARD_ROUTES = {
  PATIENT: '/patient/dashboard',
  DOCTOR: '/doctor/dashboard',
  ADMIN: '/admin/dashboard',
} as const

export const USER_ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]
