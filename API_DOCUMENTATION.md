# API Documentation

## Authentication
### Register
POST /api/auth/register
Body:
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123"
}

### Login
POST /api/auth/login
Body:
{
  "email": "jane@example.com",
  "password": "password123"
}

## Feedback
### List feedback
GET /api/feedback
Headers:
Authorization: Bearer <token>

### Create feedback
POST /api/feedback
Headers:
Authorization: Bearer <token>
Body:
{
  "customerName": "Jane",
  "email": "jane@example.com",
  "product": "Analytics Suite",
  "source": "Email",
  "feedbackText": "The dashboard is amazing.",
  "rating": 5,
  "date": "2026-08-01",
  "category": "Experience",
  "sentiment": "positive",
  "status": "new"
}

## Analytics
GET /api/feedback/analytics

## Reports
GET /api/reports/pdf
GET /api/reports/csv

## AI Assistant
POST /api/chats

## Organization
GET /api/organizations
POST /api/organizations/invite
