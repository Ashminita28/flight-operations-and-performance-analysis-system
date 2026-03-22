# Flight Service

The **Flight Service** manages flight scheduling, tracking, and lifecycle including creation, updates, status changes, and search.

---

# Features

- Create flights
- Update flights
- Delete flights
- Search flights
- Flight status updates
- Date-based filtering
- Pagination support

---

# Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- Sequelize ORM

---

# Port

Flight Service runs on port: 3002

---

# Core Functionalities

### Flight Creation

Operations team can:

- Create flights
- Assign aircraft
- Define route (origin/destination)
- Set schedules

System ensures:

- No overlapping aircraft schedules
- Valid time constraints

---

### Flight Management

Users can:

- Get all flights
- Get flight by ID
- Update flight details
- Delete flights

---

### Flight Status Management

Operations can:

- Update flight status (scheduled, delayed, departed, landed)

---

### Flight Search

Users can:

- Search by flight number
- Filter by date, status, route

---

# API Endpoints

POST `/api/flights`

GET `/api/flights`

GET `/api/flights/:id`

PUT `/api/flights/:id`

PATCH `/api/flights/:id/status`

DELETE `/api/flights/:id`

GET `/api/flights/search`

GET `/api/flights/today`

---

# Folder Structure

src ├── controllers ├── services ├── repositories ├── routes ├── types

---

# Purpose in System

The Flight Service is the core module responsible for managing all flight operations and scheduling.
