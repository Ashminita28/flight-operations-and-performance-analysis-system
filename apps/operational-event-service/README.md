# Operational Event Service

The **Operational Event Service** tracks real-time flight events and operational updates.

---

# Features

- Record flight events
- Update events
- Fetch events by flight
- Event notifications

---

# Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- RabbitMQ

---

# Port

Operational Event Service runs on port: 3003

---

# Core Functionalities

### Event Recording

Operations can:

- Log events (delay, boarding, departure, etc.)

System ensures:

- Valid flight reference
- Status transitions validation

---

### Event Management

Users can:

- View all events
- Get events per flight
- Update events

---

### Notifications

System:

- Publishes events via RabbitMQ

---

# API Endpoints

GET `/api/operations/events`

POST `/api/operations/:flightId/events`

PUT `/api/operations/:flightId/events/:id`

GET `/api/operations/:flight_id/events`

---

# Folder Structure

## src ├── controllers ├── services ├── repositories ├── routes ├── types

# Purpose in System

This service provides real-time operational visibility and event tracking for flights.
