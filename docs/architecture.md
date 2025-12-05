# ManaBandhu Architecture

- **Frontend**: Expo + React Native Web via Expo Router, NativeWind design system, Zustand for global session cache, React Query for API cache, shared UI in `packages/ui`.
- **Backend**: Spring Boot 3 microservices (auth, user, room, ride, job, chat) behind Spring Cloud Gateway. WebFlux for reactive IO, JPA for persistence, Redis cache, Kafka hooks for async, Meilisearch indexing for rooms.
- **Data**: Neon PostgreSQL for relational data (single shared cluster, SSL required), Upstash Redis for cache/session, Meilisearch for search, Kafka for async events.
- **Infra**: Docker Compose for local orchestration (with optional local Postgres/Redis profiles), GitHub Actions for CI, Fly.io/Render ready Docker images, Vercel for web, Expo EAS for OTA/mobile.
- **Contracts**: API versioned under `/v1`, DTO boundaries per service, Feign clients for cross-service calls.
