# Deployment Guide

## Frontend (Vercel)
1. Build the frontend:
   - cd frontend
   - npm install
   - npm run build
2. Deploy the generated dist folder to Vercel.
3. Set VITE_API_URL to your backend URL.

## Backend (Render)
1. Create a new Web Service on Render.
2. Point it to the backend folder.
3. Set environment variables:
   - PORT
   - MONGO_URI
   - JWT_SECRET
   - OPENAI_API_KEY
4. Start the service with:
   - npm install
   - npm run start
