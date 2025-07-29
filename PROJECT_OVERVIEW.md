# Smart Appointment Scheduling System (SASS)

## Project Overview

A lightweight, web-only replacement for phone-based clinic bookings.

**Key Features:**
- **Three clicks**: patient picks doctor → chooses slot → done
- **Doctors** see live calendars and block breaks
- **Admins** manage users and watch real-time KPIs
- Built with **Next.js**, **TailwindCSS**, and **shadcn/ui** components—zero custom CSS
- Four auth flows (login, patient register, doctor invite, admin setup) feed role-based dashboards
- All screens are mobile-first and share the same design tokens for instant consistency

---

## Architecture Stack

- **Framework**: Next.js
- **Styling**: TailwindCSS + shadcn/ui components
- **Authentication**: JWT-based role management
- **Data Fetching**: useSWR for real-time updates
- **Theme**: Light/dark mode via next-themes

---

## Auth Flows

### 1. Universal Login
Single email/password form that automatically redirects based on role:
- **Patient** → `/patient/dashboard`
- **Doctor** → `/doctor/dashboard`
- **Admin** → `/admin/dashboard`

### 2. Patient Self-Registration
- Public sign-up screen: name, email, password
- No invite needed
- Immediate access after registration

### 3. Doctor Onboarding
- Invite-code screen plus medical-license and specialty fields
- Only accessible with a valid invite code
- Admin-initiated process

### 4. Admin One-Time Setup
- First-run screen to create the super-admin account
- Disabled once an admin exists
- Initial system configuration

---

## Screen Inventory

All screens built with shadcn/ui components for consistency.

### Auth Screens
- `/login` - Universal login form
- `/register` - Patient self-registration
- `/doctor/onboarding` - Doctor invitation flow
- `/admin/setup` - Initial admin setup

### Patient Dashboard
- `/patient/dashboard` - Upcoming & past appointments cards, quick "Book" button
- `/patient/book/[doctorId]` - Calendar picker + available time slot grid
- `/patient/history` - Full appointment history filterable by date range

### Doctor Dashboard
- `/doctor/dashboard` - Live daily/weekly calendar of patient bookings
- `/doctor/availability` - Weekday toggles & break-time editor

### Admin Dashboard
- `/admin/dashboard` - KPI tiles (today's bookings, active doctors, total users)
- `/admin/users` - Searchable table of patients & doctors with add/edit/delete actions
- `/admin/settings` - SMTP toggle, backup button, log viewer

### Global Components
- Toast pop-ups for confirmations & errors
- Responsive mobile-first layout (Tailwind only)

---

## Navigation & Routing Rules

- **Middleware** reads JWT role and redirects after login
- **404 fallback** to `/login` if unauthenticated
- **Doctors & Admins** cannot self-register; they must be invited or pre-seeded
- Role-based access control throughout the application

---

## Visual Style Guidelines

- **TailwindCSS classes only** – no custom CSS files
- **Light/dark theme** switch via next-themes
- **All interactive elements** use shadcn/ui components:
  - Button
  - Card
  - Calendar
  - Table
  - Form components
  - Toast notifications
- **Mobile-first** responsive design
- **Consistent design tokens** across all screens

---

## Mock Data & Real-Time Simulation

- **Temporary arrays** in API routes return JSON immediately
- **useSWR** re-fetches every 5 seconds to mimic live updates
- **Slots turn grey** instantly for everyone when booked
- **Real-time KPI updates** on admin dashboard
- **Live calendar synchronization** for doctors

---

## User Roles & Permissions

### Patient
- Book appointments with available doctors
- View upcoming and past appointments
- Self-registration capability
- Access to personal appointment history

### Doctor
- View and manage appointment calendar
- Set availability and break times
- Access to patient booking information
- Invite-only registration

### Admin
- Manage all users (patients and doctors)
- View system-wide KPIs and analytics
- Configure system settings
- One-time setup process
- User management and oversight

---

## Technical Implementation Notes

- **Zero custom CSS** - relies entirely on TailwindCSS and shadcn/ui
- **Component consistency** through shared design system
- **Real-time updates** simulated through frequent API polling
- **Mobile-first approach** ensures optimal mobile experience
- **JWT-based authentication** with role-based routing
- **Middleware protection** for secure route access
