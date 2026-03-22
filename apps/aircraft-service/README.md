# Aircraft Service

The **Aircraft Service** handles the complete lifecycle of aircraft including registration, updates, status management, and airport mapping.

---

# Features

- Register aircraft
- Update aircraft details
- Change aircraft status
- Delete aircraft
- Aircraft listing
- Airport listing
- Filtering and pagination support

---

# Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- Sequelize ORM

---

# Port

Aircraft Service runs on port: 3001

---

# Core Functionalities

### Aircraft Registration

Operations team can:

- Register new aircraft
- Add aircraft specifications
- Assign base airport

System ensures:

- Unique registration
- Valid aircraft data

---

### Aircraft Management

Users can:

- View all aircraft
- Get aircraft by ID
- Update aircraft details
- Delete aircraft

---

### Aircraft Status Management

Operations can:

- Change aircraft status (active, maintenance, inactive)

---

### Airport Management

System provides:

- List of available airports

---

# API Endpoints

### Aircraft

POST `/api/aircraft`

GET `/api/aircraft`

GET `/api/aircraft/:id`

PUT `/api/aircraft/:id`

PATCH `/api/aircraft/:id/status`

DELETE `/api/aircraft/:id`

---

### Airports

GET `/api/airports`

---

# Folder Structure

src ├── controllers ├── services ├── repositories ├── routes ├── types

---

# Purpose in System

The Aircraft Service manages aircraft inventory and availability used across flight operations.
