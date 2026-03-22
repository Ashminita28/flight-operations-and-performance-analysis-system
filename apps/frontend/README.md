# Flight Operations and Performance Analysis System – Frontend

A modern React-based frontend application for managing flight operations, performance analytics, and operational insights in an aviation context.

---

## 📌 Project Overview

This application provides a comprehensive dashboard for airline operations management, featuring:

- Real-time flight tracking
- Performance analytics
- Delay analysis
- Operational event management

Built with modern React patterns and TypeScript, the system supports **role-based access control** for:

- Admin
- Analyst
- Operations personnel

---

## 🧰 Tech Stack

- **Framework:** React 19.2.0 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4.2.0 (custom theme)
- **State Management:** Zustand (with persistence)
- **Routing:** React Router DOM 7.13.0 (lazy loading)
- **Tables:** TanStack React Table 8.21.3 + DND Kit
- **Forms:** React Hook Form 7.71.2 + Zod
- **HTTP Client:** Axios 1.13.5
- **Charts:** Recharts 2.15.4
- **UI Components:** Radix UI + shadcn/ui
- **Icons:** Lucide React, Tabler Icons
- **Theming:** next-themes (dark/light mode)
- **Notifications:** Sonner
- **Drag & Drop:** DND Kit
- **Utilities:** clsx, tailwind-merge

---

## 📁 Folder Structure

```
apps/frontend/
├── src/
│   ├── api/                 # API configuration and error handling
│   │   └── api.ts          # Axios wrapper with base URL and credentials
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components (buttons, dialogs, etc.)
│   │   ├── data-table.tsx # TanStack table with DND sorting
│   │   ├── active-flights-table.tsx
│   │   ├── analytics-counters.tsx
│   │   ├── delay-analysis-chart.tsx
│   │   ├── on-time-performance-chart.tsx
│   │   └── export-report-form.tsx
│   ├── hooks/             # Custom React hooks
│   │   └── use-mobile.ts  # Mobile breakpoint detection
│   ├── lib/               # Utility functions
│   │   └── utils.ts       # Class name merging utility
│   ├── pages/             # Page components
│   │   ├── common/        # Public/auth pages
│   │   │   ├── HomePage.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── ForgotPassword.tsx
│   │   │   ├── ResetPassword.tsx
│   │   │   └── Profile.tsx
│   │   ├── admin/         # Admin-only pages
│   │   │   └── UserMangement.tsx
│   │   ├── operations/    # Operations pages
│   │   │   ├── AircraftRegister.tsx
│   │   │   ├── FlightRegistration.tsx
│   │   │   ├── OperationalEventModal.tsx
│   │   │   ├── PerformanceModal.tsx
│   │   │   └── UpdateStatusModal.tsx
│   │   ├── MainDashboard.tsx
│   │   ├── FlightDashboard.tsx
│   │   └── FlightDetail.tsx
│   ├── routes/            # Routing configuration
│   │   ├── AppRoutes.tsx  # Main routes with lazy loading
│   │   ├── AuthInitialize.tsx # Auth state initialization
│   │   └── ProtectedRoute.tsx # Route protection with roles
│   ├── schemas/           # Zod validation schemas
│   │   ├── login-schema.ts
│   │   ├── flight-schema.ts
│   │   ├── aircraft-schema.ts
│   │   ├── performance-schema.ts
│   │   ├── operation-schema.ts
│   │   └── export-schema.ts
│   ├── services/          # API service layer
│   │   ├── auth-service.ts
│   │   ├── flight-service.ts
│   │   ├── aircraft-service.ts
│   │   ├── analytics-service.ts
│   │   ├── delay-service.ts
│   │   ├── notification-service.ts
│   │   ├── operation-service.ts
│   │   └── performance-service.ts
│   ├── store/             # Zustand state stores
│   │   ├── auth-store.ts      # Authentication state
│   │   ├── flight-store.ts    # Flight data management
│   │   ├── aircraft-store.ts  # Aircraft data
│   │   ├── analytics-store.ts # Analytics data
│   │   ├── delay-store.ts     # Delay analysis
│   │   ├── notification-store.ts
│   │   ├── operation-store.ts # Operational events
│   │   └── performance-store.ts # Performance metrics
│   ├── types/             # TypeScript type definitions
│   │   ├── types.ts       # Core domain types
│   │   └── analytics-types.ts
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles with Tailwind
├── public/                # Static assets
├── Dockerfile             # Container build configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── eslint.config.js       # ESLint configuration
```

---

## 🏗️ Application Architecture

### Layered Architecture

API → Services → Zustand Store → UI Components

- **API Layer** → Axios wrapper (`/api`)
- **Service Layer** → Domain-specific API calls
- **Store Layer** → Zustand state + async actions
- **UI Layer** → React components

---

## 🧠 State Management (Zustand)

Domain-driven stores:

- `auth-store` → authentication & user session
- `flight-store` → flight data + pagination/filtering
- `aircraft-store` → aircraft management
- `analytics-store` → dashboard analytics
- `delay-store` → delay categorization
- `operation-store` → operational events
- `performance-store` → performance metrics
- `notification-store` → alerts & notifications

### Store Pattern

- `loading` state
- `error` state
- async actions
- `AbortController` for request cancellation

---

## 🔄 Data Flow

API (Axios) ↓ Services ↓ Zustand Store ↓ React Components

---

## 🌐 API Integration

- **Base URL:** `/api` (proxied)
- **Auth:** Cookie-based (`credentials: "include"`)
- **Response Format:**

`json`

```
{
  "success": true,
  "data": {},
  "message": ""
}

```

## 🚀 Key Features

### Dashboards

- Analytics dashboard (charts + KPIs)
- Flight dashboard (operations overview)
- Flight detail view

### Flight Management

- Flight creation & updates
- Status tracking
- Aircraft assignment
- Event logging

### Analytics & Reporting

- On-time performance
- Delay categorization
- Fuel efficiency & emissions
- Exportable reports

### User Management

- Role-based access control
- Authentication (JWT/cookies)
- Profile management

---

## 📊 Table System (TanStack Table)

- Server-side pagination
- Multi-column sorting
- Column filters + global search
- Drag & drop (DND Kit)
- Column visibility toggling
- Export support

---

## 🧭 Routing

- React Router with lazy loading
- Code splitting via `React.lazy`
- Protected routes via `ProtectedRoute`
- Role-based access enforcement

---

## 🎨 UI System

### Component Library

- shadcn/ui + Radix UI primitives
- Tailwind CSS with custom theme

### Patterns

- Reusable data tables
- Form handling with validation (Zod)
- Chart components (Recharts)
- Dialogs/modals (Radix)
- Skeleton loaders

### Theming

- Dark/Light mode via `next-themes`

---

## 📱 Responsive Design

- Mobile-first approach
- Tailwind breakpoints
- `useIsMobile` hook
- Container-based responsiveness

---

## ⚙️ Environment Variables

Currently none.

- API base URL is hardcoded: `/api`
- Authentication handled via cookies

---

## 🛠️ Build & Run

### Prerequisites

- Node.js
- pnpm

### Install

```bash
pnpm install
```

```bash
pnpm build
```
