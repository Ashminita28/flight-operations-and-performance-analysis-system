# Auth Service

The **Auth Service** handles authentication, authorization, and user management.

---

# Features

- User registration
- Login / logout
- JWT authentication
- Role-based access control
- Refresh token
- Password reset (OTP)

---

# Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT

---

# Port

Auth Service runs on port: 3000

---

# Core Functionalities

### Authentication

Users can:

- Register
- Login
- Logout

System ensures:

- Secure token generation
- Role assignment

---

### Authorization

System provides:

- Role-based access (Admin, Operations, Manager, Analyst)

---

### Password Management

Users can:

- Request OTP
- Reset password

---

# API Endpoints

POST `/api/auth/register`

POST `/api/auth/login`

POST `/api/auth/logout`

POST `/api/auth/refresh-token`

POST `/api/auth/forgot-password`

POST `/api/auth/reset-password`

GET `/api/admin/users`

GET `/api/user/profile`

---

# Folder Structure

```
src ├── controllers ├── services ├── repositories ├── routes ├── utils
```

---

# Purpose in System

The Auth Service secures all system services and manages user identity and access control.
