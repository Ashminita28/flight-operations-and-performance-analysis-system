## Flight Operations and performnce analysis system

## **Overview**

An aviation operator manages daily flight operations using a mix of manual logs, Excel sheets, emails, and reports sent from different teams. Flight schedules, fuel usage, delays, crew notes, and maintenance remarks are recorded separately, often after the flight has already landed.

As the number of flights increases, this approach breaks down. Data arrives late, numbers don’t match across teams, and management decisions are based on outdated or incomplete information. During peak seasons or disruptions (weather, technical issues), the team struggles to understand what is happening in real time.

Performance analysis—such as fuel efficiency, delay causes, or aircraft utilization—requires someone to manually combine multiple spreadsheets, which can take days and still contain errors.

The goal of the new system is to **centralize flight operations data**, provide **near-real-time visibility**, and generate **reliable performance analytics** without depending on manual consolidation.

## **Services Present**

- **Auth Service**
  Authentication of users
- **Flight Service**
  Manages flight records, schedules, status changes.
- **Aircraft Service**

  Maintains aircraft details, assignments, and utilization data.

- **Operational Event Service**
  Manages operational events.
- **Performance Data Service**
  Collects flight metrics such as fuel, duration, payload, and deviations.
- **Analytics & Reporting Service**
  Provides aggregated insights and historical performance reports.
- **Worker Service**
  Executes background processing,heavy calculations and analytics asynchronously.

## **Folder Structure**

```bash
AVIATION_SYSTEM/
│
├── apps/
│ ├── aircraft-service/
│ │ ├── src/
│ │ ├── Dockerfile
│ │ ├── package.json
│ │ ├── .env.example
│ │
│ ├── auth-service/
│ │ ├── src/
│ │ ├── tests/
│ │ ├── Dockerfile
│ │ ├── package.json
│ │ ├── .env.example
| |
│ ├── flight-service/
│ │ ├── src/
│ │ ├── tests/
│ │ ├── Dockerfile
│ │ ├── package.json
│ │ ├── .env.example
| |
│ ├── operational-event-service/
│ │ ├── src/
│ │ ├── tests/
│ │ ├── Dockerfile
│ │ ├── package.json
│ │ ├── .env.example
| |
│ ├── performance-capture-service/
│ │ ├── src/
│ │ ├── tests/
│ │ ├── Dockerfile
│ │ ├── package.json
│ │ ├── .env.example
│ │
│ ├── worker-service/
│ │ ├── src/
│ │ │ ├── queues/
│ │ │ ├── processors/
│ │ │ ├── schedulers/
│ │ │ └── worker.ts
│ │ ├── Dockerfile
│ │ ├── package.json
│ │ ├── .env.example
│ │
│ │
│ └── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── layouts/
│ │ ├── hooks/
│ │ └── store/
│ ├── public/
│ ├── Dockerfile
│ ├── package.json
│
├── packages/ # Shared libraries
│ ├── shared-database/
│ │ ├── src/
│ │ ├── package.json
│ │ └── README.md
│ │
│ ├── shared-middlewares/
│ │ ├── src/
│ │ ├── package.json
│ │ └── README.md
│ │
│ ├── shared-utils/
│ │ ├── src/
│ │ ├── package.json
│ │ └── README.md
│ │
│
├── infra/ # Infrastructure
│ │
│ ├── nginx/
│ │ ├── default.conf
│
├── .husky/ # Git hooks
│ ├── pre-commit
│ └── commit-msg
│
├── .eslint.config.js # Shared ESLint config
├── .prettierrc # Shared Prettier config
├── commitlint.config.cjs # Commit message rules
│
├── docker-compose.yml # Local orchestration entry point
│
├── pnpm-workspace.yaml # pnpm monorepo definition
├── package.json # Root control plane (scripts + tooling)
├── pnpm-lock.yaml
│
├── .env.example # Global environment template
├── .gitignore
│
└── README.md
```

## Technologies Used

# Frontend

- **React** – For building the user interface
- **shadcn/ui** – For modern and accessible UI components and styling.
- **Vitest** – For testing.
- **Zustand** – For state management.

# Backend

- **Node.js** – Runtime environment for the backend server.
- **Express.js** – Web framework for building APIs and handling routes.

# Database

- **PostgreSQL** – Relational database for storing user data and application information.
- **Sequelize** – ORM for database modeling and queries.

# Package Management

- **pnpm** – Fast and efficient package manager for managing dependencies.

# Flight System Project - Setup Guide

Follow these steps to run the project locally.

---

## 1. Clone the repository

```bash
git clone https://github.com/Ashminita28/flight-operations-and-performance-analysis-system.git
cd Aviation_System
git checkout dev

```

## 2. Install dependencies

Install packages in the root folder and then in each service folder:

# Root folder

```bash
pnpm install

# In each service folder
cd apps/services
pnpm install

# In each package foldet
cd packages/shared-
pnpm install
```

## 3. Set up environment variables

Copy the example .env file and fill in your values:

```bash
cp .env.example .env
```

Update database credentials, JWT secrets, email credentials, etc. in .env.

## 4. Run Docker and initialize database

Docker should be installed. Then run:

```bash
docker-compose up -d
docker-compose build
```

Seed and migrate the database. All files stored in the Docker host machine volume will be applied:

```bash
# In terminal
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Then start the services:

```bash
docker-compose up -d
```

## 5. Access the application

```bash
localhost
```
