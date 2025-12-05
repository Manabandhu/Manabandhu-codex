# ManaBandhu Monorepo

Cross-platform super-app boilerplate for South Asian immigrants. Ships Expo (mobile + web) with shared UI, and Spring Boot microservices for auth, rooms, rides, jobs, chat, and more.

## Stack
- **Frontend**: Expo Router (React Native + Web), NativeWind, Zustand, React Query, React Hook Form + Zod, shared UI in `packages/ui`, shared types in `packages/types`.
- **Backend**: Spring Boot 3 (Java 21) microservices (API Gateway, Auth, User, Room, Ride, Job, Chat) using WebFlux, Security + JWT, JPA, Redis, Kafka hooks, Meilisearch.
- **Infra**: Turborepo workspaces, Docker & Compose, GitHub Actions CI, PostgreSQL, Redis, Meilisearch, Kafka.

## Getting Started
1. Install Node 20+ and Java 21+.
2. Install deps: `npm install` (root installs all workspace deps).
3. Copy envs: `cp .env.example .env` and fill secrets (API base, Firebase keys, JWT secret, DB URLs, Meili keys).

### Frontend
- Dev mobile: `cd apps/mobile && npm start` (then `i`/`a` for iOS/Android or `w` for web).
- Dev web-only: `cd apps/web && npm start`.
- Shared UI is in `packages/ui`; global stores/API utilities in `packages/utils`.
- OTA/EAS: configure `app.json` projectId and run `eas update --branch preview`.
 - Example screens: login, home, room listing, job posting, ride offer, community/events, finance tools, immigration help.

### Backend (local)
- Start infra/services: `docker compose -f infra/docker/docker-compose.yml up --build`.
- Services: gateway `:8080`, auth `:8081`, user `:8082`, room `:8083`, ride `:8084`, job `:8085`, chat `:8086`.
- Each service exposes REST under `/v1/**`; room-service uses WebFlux router; chat-service exposes WebSocket `/ws`.

### Testing & Linting
- Frontend lint: `npm run lint` (turborepo fan-out).
- Backend build: `cd backend && mvn package -DskipTests`.

### Deployment
- **Backend**: build Docker images per service (Dockerfiles included) and deploy to Fly.io/Render; point gateway to deployed service URLs.
- **Web**: deploy `apps/web` to Vercel (Expo Router web output).
- **Mobile**: EAS build for iOS/Android; OTA via `eas update`.

## Monorepo Layout
```
apps/
  mobile/           # Expo app (mobile + web)
  web/              # Expo web entry
backend/
  api-gateway/
  auth-service/
  user-service/
  room-service/
  ride-service/
  job-service/
  chat-service/
packages/
  ui/               # shared RN components
  utils/            # axios client, Zustand stores, hooks
  types/            # shared TS types
infra/
  docker/           # docker-compose
  github-actions/   # CI templates
docs/               # architecture notes
```

## Feature Stubs
- **Auth**: email/password + OAuth providers via Firebase stub (`apps/mobile/src/api/firebase.ts`), JWT issuance in auth-service.
- **Rooms**: multi-step form stub, Meilisearch client wired, WebFlux router example.
- **Rides**: ride offer form + status update endpoint.
- **Jobs**: posting + scam report endpoint.
- **Chat**: REST fetch + WebSocket STOMP broker placeholder.
- **Finance**: types and store placeholders ready for expansion.

## Next Steps
- Connect Firebase/Apple/Instagram credentials and wire provider flows in the login screen.
- Harden security (JWT validation at gateway + downstream services), add migration tooling per service, and seed data.
- Attach storage (Cloudflare R2/S3) for media uploads and wire Meilisearch indexing on room mutations.
