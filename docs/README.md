# ManaBandhu Documentation

## Quick Links
- [Complete Features](./complete-features.md) - All 9 modules, 60+ screens
- [API Reference](./api-complete.md) - 80+ REST endpoints
- [Database Schema](./er-diagram.md) - 17 tables with relationships
- [Deployment Guide](./deployment-complete.md) - Production deployment
- [Completion Report](./COMPLETION-REPORT.md) - 100% feature completion

## Architecture Overview

### Monolithic Design
- **Single Backend**: Spring Boot 3 with 9 modular packages
- **Single Frontend**: Expo (React Native + Web)
- **Single Database**: Neon PostgreSQL
- **Single Cache**: Upstash Redis

### Tech Stack
- Frontend: Expo Router, NativeWind, Zustand, React Query
- Backend: Spring Boot 3, Java 21, JPA, Flyway
- Database: PostgreSQL (Neon)
- Cache: Redis (Upstash)
- Deployment: Docker, Cloud Run, Vercel, EAS

## Module Structure

### 1. Room Finder
- Search with filters, map view, roommate matching
- Verified listings, split expenses
- Files: `frontend/app/(forms)/room-*`, `backend/.../room/`

### 2. Jobs & Career
- Listings, AI resume builder, mock interviews, referrals
- Files: `frontend/app/jobs/`, `backend/.../job/`

### 3. Finance
- Expense tracker, group wallets, currency converter
- Files: `frontend/app/(main)/finance.tsx`, `backend/.../finance/`

### 4. Ride Sharing
- Offer/request rides, cost split, route preview
- Files: `frontend/app/(forms)/ride-*`, `backend/.../ride/`

### 5. Marketplace
- Buy/sell/rent, auction system
- Files: `frontend/app/marketplace/`, `backend/.../marketplace/`

### 6. Social & Cultural
- Groups, festivals, food delivery, matrimony
- Files: `frontend/app/social/`, `backend/.../social/`

### 7. Health & Lifestyle
- Doctor search, telemedicine, fitness, diet
- Files: `frontend/app/health/`, `backend/.../health/`

### 8. Immigration
- Visa tracking, lawyer booking, templates
- Files: `frontend/app/(main)/immigration.tsx`

### 9. AI Tools
- Chatbot, recommendations, voice search, astrology
- Files: `frontend/app/ai/`, `backend/.../ai/`

## Development

### Setup
```bash
npm install
cp .env.example .env
# Fill in: API_BASE_URL, Firebase keys, DB credentials
```

### Run Frontend
```bash
cd frontend
npm start
# Press 'i' for iOS, 'a' for Android, 'w' for web
```

### Run Backend
```bash
docker compose -f infra/docker/docker-compose.yml up
# Backend at http://localhost:3080
```

## Design System

### Colors
- Primary: #0EA5E9 → #0369A1 (gradient blues)
- Accent: #F97316 (orange)

### Typography
- Display: Poppins
- Body: Inter

### Spacing
- 8-point grid (8px, 16px, 24px, 32px...)

### Components
- Button, Card, TextField, Badge, IconButton
- Location: `packages/ui/src/components/`

## API Structure

All endpoints under `/api/v1`:
- `/auth` - Authentication
- `/rooms` - Room listings
- `/jobs` - Job postings
- `/rides` - Ride sharing
- `/marketplace` - Buy/sell/rent
- `/health` - Healthcare
- `/finance` - Financial tools
- `/social` - Community
- `/ai` - AI features

See [api-complete.md](./api-complete.md) for full reference.

## Database

17 tables across 7 migrations:
- V1: Base (users, profiles, chat, notifications)
- V2: Rooms
- V3: Rides
- V4: Jobs
- V5: Marketplace & Auctions
- V6: Health
- V7: Finance & Social

See [er-diagram.md](./er-diagram.md) for relationships.

## Deployment

### Quick Deploy
1. Set up Neon DB + Upstash Redis
2. Build backend: `docker build -t manabandhu backend/`
3. Deploy to Cloud Run
4. Deploy mobile: `eas build --platform all`
5. Deploy web: Vercel auto-deploys from Expo

See [deployment-complete.md](./deployment-complete.md) for detailed steps.

## Project Status

✅ **100% Complete** - All 9 modules, 60+ screens, full API coverage

See [COMPLETION-REPORT.md](./COMPLETION-REPORT.md) for details.
