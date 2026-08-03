# Project LOOP

Project LOOP is a production-ready AI SaaS web application for customer feedback intelligence.

## Features
- Authentication with JWT and role-based access
- Multi-tenant organization management
- CRUD feedback workflows with AI enrichment
- AI assistant powered by OpenAI using RAG-style context
- Dashboard, analytics, reports, notifications, and settings

## Tech Stack
- Frontend: React 19, Vite, TypeScript, Tailwind CSS, Shadcn-inspired UI
- Backend: Node.js, Express.js, MongoDB Atlas/Mongoose
- AI: OpenAI API
- Charts: Recharts
- Auth: JWT + bcrypt

## Setup
1. Install dependencies:
   - npm install
2. Create a .env file based on .env.example
3. Seed demo data:
   - npm run seed
4. Start the app:
   - npm run dev

## API Overview
- POST /api/auth/register
- POST /api/auth/login
- GET /api/feedback
- POST /api/feedback
- GET /api/feedback/analytics
- GET /api/reports/pdf
- GET /api/reports/csv
- POST /api/chats

## Deployment
- Frontend: Vercel
- Backend: Render

## Notes
- The frontend is wired to the backend through Vite proxy.
- Replace the demo OpenAI key and MongoDB URI before production deployment.
