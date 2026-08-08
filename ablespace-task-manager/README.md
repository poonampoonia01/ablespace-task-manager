# AbleSpace Task Management System

A full-stack task management application built from the provided AbleSpace technical assessment and the supplied Figma screenshots.

## Stack

- Frontend: Next.js App Router, React, TypeScript, Tailwind CSS
- Backend: NestJS, TypeScript
- Database: PostgreSQL
- ORM: Prisma
- Icons: Lucide React
- API: REST

## Features

- Guest login
- Responsive sidebar
- Board/Kanban view
- List/table view
- Search
- Field visibility menu
- Status/priority/member/label/date support
- Add task
- Task detail page
- Subtasks
- Comments
- Activity/updates
- Theme persistence
- PostgreSQL persistence through NestJS + Prisma
- Seed data matching the supplied task examples

## Project structure

```text
ablespace-task-manager/
├── frontend/
└── backend/
```

## Run locally

### 1. Database

Create a PostgreSQL database and copy:

```bash
cd backend
cp .env.example .env
```

Set:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ablespace"
PORT=4000
FRONTEND_URL="http://localhost:3000"
```

### 2. Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
```

API:

```text
http://localhost:4000
```

### 3. Frontend

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

Frontend:

```text
http://localhost:3000
```

### Frontend environment

```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

## Main API endpoints

```text
POST   /auth/guest

GET    /tasks
GET    /tasks/:id
POST   /tasks
PATCH  /tasks/:id
DELETE /tasks/:id

GET    /tasks/:id/subtasks
POST   /tasks/:id/subtasks
PATCH  /subtasks/:id
DELETE /subtasks/:id

GET    /tasks/:id/comments
POST   /tasks/:id/comments

GET    /users
GET    /labels
```

## Design notes

The supplied screenshots were used as the visual reference for the login, task board, list view, fields menu, search state, and task detail interactions.

Intentional implementation choices:
- Guest authentication is fully functional.
- Google login is represented as a UI action and is not connected to OAuth credentials.
- The task system uses PostgreSQL so task/member/label/subtask/comment relationships remain normalized.
- The application uses REST APIs and simple guest identity persistence rather than introducing unnecessary authentication infrastructure for the assessment.

## Responsive behavior

- Desktop: persistent sidebar and multi-column board
- Tablet: compact navigation and horizontally scrollable board
- Mobile: collapsible sidebar, stacked content and horizontally scrollable task columns

## Part 2

The Part 2 product walkthrough/UX analysis should be submitted separately with screenshots or a video, as requested by the assessment.
