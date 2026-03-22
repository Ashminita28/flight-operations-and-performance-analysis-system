# Performance Capture Service

The **Performance Capture Service** records and analyzes flight performance metrics.

---

# Features

- Record performance data
- Calculate fuel efficiency
- Calculate load factor
- Track emissions
- Fetch performance records

---

# Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL

---

# Port

Performance Service runs on port: 3004

---

# Core Functionalities

### Performance Recording

Operations can:

- Record fuel usage
- Record passengers and payload
- Record flight duration

System calculates:

- Fuel efficiency
- Load factor
- CO2 emissions
- Average speed

---

### Performance Retrieval

Users can:

- Get all performance data
- Get data by flight

---

# API Endpoints

POST `/api/performance/:flightId`

GET `/api/performance`

GET `/api/performance/:flight_id`

---

# Folder Structure

src ├── controllers ├── services ├── repositories ├── routes

---

# Purpose in System

This service provides analytical insights into flight efficiency and performance metrics.
