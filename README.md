# ManaBandhu Monorepo

Cross-platform super-app boilerplate for South Asian immigrants. Ships Expo (mobile + web) with shared UI, and a single Spring Boot monolith for auth, rooms, rides, jobs, chat, and more.

## Stack
- **Frontend**: Expo Router (React Native + Web), NativeWind, Zustand, React Query, shared UI in `packages/ui`, shared types in `packages/types`
- **Backend**: Spring Boot 3 (Java 21) monolith with 9 domain modules, JWT security, JPA, Flyway migrations, Redis caching
- **Infra**: Turborepo, Docker Compose, GitHub Actions CI, Neon PostgreSQL, Upstash Redis

## Getting Started
1. Install Node 20+ and Java 21+.
2. Install deps: `npm install` (root installs all workspace deps).
3. Copy envs: `cp .env.example .env` and fill secrets (API base, Firebase keys, JWT secret, Neon DB URL/user/pass, Upstash Redis URL/token).

### Frontend
 - Dev: `cd frontend && npm start` (then `i`/`a` for iOS/Android or `w` for web)
- Shared UI in `packages/ui`, stores/API in `packages/utils`

### Backend (local)
- Start stack: `docker compose -f infra/docker/docker-compose.yml up --build` (defaults to local Postgres/Redis; override with Neon/Upstash envs).
- Service runs at `:3080` (`/api/v1` endpoints, health at `/api/v1/health`). See `backend/README.md` for module map, envs, and Cloud Run deploy steps.

### Testing & Linting
- Frontend lint: `npm run lint` (turborepo fan-out).
- Backend build: `cd backend && mvn package -DskipTests`.

### Deployment
- **Database**: Neon PostgreSQL with SSL
- **Cache**: Upstash Redis
- **Backend**: Docker to Cloud Run/Render/Fly
- **Mobile/Web**: EAS build + Vercel
- Full guide: `docs/DEPLOYMENT.md`

## Monorepo Layout
```
frontend/           # Expo (mobile + web)
backend/            # Spring Boot monolith
packages/
  ui/               # shared components
  utils/            # API client, stores
  types/            # shared types
infra/              # docker, CI
docs/               # documentation
```

## Complete Features (100%)

### ✅ All 9 Super-App Modules Implemented

1. **Room Finder** - Search, map view, roommate matching, verified listings, split expenses
2. **Jobs & Career** - Listings, AI resume builder, AI mock interviews, referrals network
3. **Finance** - Expense tracker, group wallets, currency converter, reports & analytics
4. **Ride Sharing** - Offer/request rides, cost split, route preview, trip planner
5. **Marketplace** - Buy/sell/rent, auction system with live bidding
6. **Social & Cultural** - Community groups, festival calendar, desi food delivery, matrimony
7. **Health & Lifestyle** - Doctor search, telemedicine, fitness challenges, diet planner
8. **Immigration** - Visa news, document templates, lawyer booking, status tracking
9. **AI Tools** - Chatbot, smart recommendations, voice search, astrology

### 🎨 Design System
- Poppins/Inter fonts
- Gradient blues (#0EA5E9 → #0369A1) + orange accents (#F97316)
- 16-24px border radius
- 8-point spacing grid
- Material 3 style icons
- Light/dark mode ready
- Micro animations

### 📱 60+ Screens
See `docs/FEATURES.md` for full screen list

### 🗄️ Complete Database Schema
17 tables with full relationships - see `docs/api/database-schema.md`

### 🚀 REST APIs
80+ endpoints across all modules - see `docs/api/endpoints.md`

## Documentation

📚 **[Complete Documentation](./docs/README.md)** - Start here for all guides

### Quick Links
- **[Auth Setup](./docs/auth/README.md)** - Authentication & onboarding implementation
- **[API Reference](./docs/api/endpoints.md)** - All REST endpoints
- **[Database Schema](./docs/api/database-schema.md)** - Complete ER diagram
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Production deployment
- **[Features List](./docs/FEATURES.md)** - All 60+ screens

## Next Steps
- Configure OAuth providers (Firebase)
- Add media storage (S3/R2)
- Set up monitoring (Sentry)
- Deploy to production
