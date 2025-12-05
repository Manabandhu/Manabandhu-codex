# ManaBandhu Backend (Monolith)

One Spring Boot 3.2 monolith that contains all domains (auth, users, rooms, rides, jobs, chat, search, notifications) behind a single deployable artifact. We kept clear package boundaries (`com.manabandhu.<module>`) to preserve modularity without the operational overhead of many services.

## Why a Monolith?
- Faster developer loop: no inter-service network hops, feign clients, or gateway wiring.
- Unified database and migrations: one schema on Neon PostgreSQL, Flyway-managed.
- Simplified deployment: one container to ship to Cloud Run with shared configuration (Neon + Upstash).
- Clean modular packages keep code ownership and separation while living in one repo.

## Module Layout
- `com.manabandhu.auth` – JWT issuance, login/oauth endpoints.
- `com.manabandhu.user` – profiles CRUD and current user view.
- `com.manabandhu.room` – room listings with amenities.
- `com.manabandhu.ride` – ride offers and status updates.
- `com.manabandhu.job` – job postings and scam reports.
- `com.manabandhu.chat` – REST chat history + STOMP WebSocket endpoints.
- `com.manabandhu.search` – DB-backed search across rooms/jobs.
- `com.manabandhu.notifications` – simple notification feed per user.
- Shared layers: `com.manabandhu.common` (base entity, ApiResponse, exceptions/utils), `com.manabandhu.config` (CORS, Redis, security/JWT, logging interceptor, WebSocket).

## Configuration
Required environment variables (Neon + Upstash + JWT):
```
NEON_DB_URL=jdbc:postgresql://.../neondb?sslmode=require
NEON_DB_USER=<neon user>
NEON_DB_PASS=<neon password>
UPSTASH_REDIS_URL=rediss://<host>:<port>
UPSTASH_REDIS_TOKEN=<upstash token>
JWT_SECRET=<long random string>
PORT=3080
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:19006
```

`application.yml` binds these under `spring.datasource`, `spring.redis`, and `jwt.secret`. Hikari pool is capped at 15 for Neon. Redis uses SSL via Lettuce with the Upstash token as the password.

## Database & Migrations
- Flyway migrations live in `src/main/resources/db/migrations`.
- Files: `V1__init.sql` (users, profiles, chat, notifications), `V2__room_tables.sql`, `V3__ride_tables.sql`, `V4__job_tables.sql`.
- Run locally with `mvn -DskipTests package` (Flyway runs at startup) or `mvn -DskipTests flyway:migrate` if you want explicit migration.

## Running Locally
1. Ensure Java 21, Maven, and Docker are installed.
2. Fill `infra/env/neon.env` and `infra/env/upstash.env` (or rely on defaults in `docker-compose.yml` for local Postgres/Redis).
3. Start dependencies + backend:
   ```
   cd infra/docker && docker compose up --build
   ```
   The API listens on `:3080`, WebSocket on `/ws`. Health check: `GET http://localhost:3080/api/v1/health`.
4. Without Docker: `cd backend && mvn -DskipTests spring-boot:run`.

## Deploying to Cloud Run
1. Build the container (multi-stage, distroless Java 21):
   ```
   cd backend
   docker build -t gcr.io/<project>/manabandhu-backend:latest .
   ```
2. Push the image to Artifact/GCR.
3. Deploy to Cloud Run with env vars:
   ```
   gcloud run deploy manabandhu-backend \
     --image gcr.io/<project>/manabandhu-backend:latest \
     --region <region> \
     --allow-unauthenticated \
     --set-env-vars NEON_DB_URL=...,NEON_DB_USER=...,NEON_DB_PASS=...,UPSTASH_REDIS_URL=...,UPSTASH_REDIS_TOKEN=...,JWT_SECRET=...,ALLOWED_ORIGINS=...
   ```
4. Configure Cloud SQL TCP or direct Neon SSL URL; Upstash values are URL+token.

## Endpoints (all prefixed with `/api/v1`)
- `auth`: `/auth/login`, `/auth/provider/{provider}`, `/auth/me`
- `users`: `/users`, `/users/{id}`, `/users/me`
- `rooms`: `/rooms`, `/rooms/{id}`
- `rides`: `/rides`, `/rides/{id}`, `/rides/{id}/status`
- `jobs`: `/jobs`, `/jobs/{id}`, `/jobs/{id}/report`
- `chat`: `/chat/rooms/{roomId}` (REST), WebSocket `/ws`
- `search`: `/search?q=...`
- `notifications`: `/notifications`, `/notifications/{id}/read`

JWT is required for all routes except `/api/v1/auth/**`, `/api/v1/health`, Swagger docs, and WebSocket handshake.
