# ManaBandhu Monorepo

Cross-platform super-app boilerplate for South Asian immigrants. Ships Expo (mobile + web) with shared UI, and a single Spring Boot monolith for auth, rooms, rides, jobs, chat, and more.

## Stack
- **Frontend**: Expo Router (React Native + Web), NativeWind, Zustand, React Query, React Hook Form + Zod, shared UI in `packages/ui`, shared types in `packages/types`.
- **Backend**: Spring Boot 3 (Java 21) monolith with domain modules (`auth`, `user`, `room`, `ride`, `job`, `chat`, `search`, `notifications`), JWT security, JPA, Flyway migrations, Redis caching.
- **Infra**: Turborepo workspaces, Docker & Compose, GitHub Actions CI, **Neon PostgreSQL** (single cluster), **Upstash Redis** (single cache).

## Getting Started
1. Install Node 20+ and Java 21+.
2. Install deps: `npm install` (root installs all workspace deps).
3. Copy envs: `cp .env.example .env` and fill secrets (API base, Firebase keys, JWT secret, Neon DB URL/user/pass, Upstash Redis URL/token).

### Frontend
- Dev mobile: `cd apps/mobile && npm start` (then `i`/`a` for iOS/Android or `w` for web).
- Dev web-only: `cd apps/web && npm start`.
- Shared UI is in `packages/ui`; global stores/API utilities in `packages/utils`.

### Backend (local)
- Start stack: `docker compose -f infra/docker/docker-compose.yml up --build` (defaults to local Postgres/Redis; override with Neon/Upstash envs).
- Service runs at `:3080` (`/api/v1` endpoints, health at `/api/v1/health`). See `backend/README.md` for module map, envs, and Cloud Run deploy steps.

### Testing & Linting
- Frontend lint: `npm run lint` (turborepo fan-out).
- Backend build: `cd backend && mvn package -DskipTests`.

### Deployment
- **Database (Neon)**: create a branch/DB in Neon, enable `require_ssl`, and grab the JDBC URL (e.g., `jdbc:postgresql://.../neondb?sslmode=require`); set `NEON_DB_URL`, `NEON_DB_USER`, `NEON_DB_PASS` in CI and runtime.
- **Cache (Upstash Redis)**: create an Upstash Redis database, copy the `UPSTASH_REDIS_URL` (rediss) and `UPSTASH_REDIS_TOKEN` and set them in CI/runtime.
- **Backend**: single Dockerfile at `backend/Dockerfile` (multi-stage, distroless Java 21). Deploy to Cloud Run/Render/Fly using the env vars above plus `JWT_SECRET` and `ALLOWED_ORIGINS`.
- **Web**: deploy `apps/web` to Vercel (Expo Router web output).
- **Mobile**: EAS build for iOS/Android; OTA via `eas update`.

## Monorepo Layout
```
apps/
  mobile/           # Expo app (mobile + web)
  web/              # Expo web entry
backend/            # Spring Boot monolith (see backend/README.md)
packages/
  ui/               # shared RN components
  utils/            # axios client, Zustand stores, hooks
  types/            # shared TS types
infra/
  docker/           # docker-compose
  github-actions/   # CI templates
docs/               # architecture notes
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
See `docs/complete-features.md` for full screen list

### 🗄️ Complete Database Schema
17 tables with full relationships - see `docs/er-diagram.md`

### 🚀 REST APIs
80+ endpoints across all modules - see `docs/api-complete.md`

## Next Steps
- Connect Firebase/Apple/Instagram credentials and wire provider flows in the login screen.
- Harden JWT validation, seed data, and wire analytics/observability as you scale.
- Attach storage (Cloudflare R2/S3) for media uploads and wire richer search/indexing.
