# Service Responsibilities

- **auth-service**: AuthN (email/password, OAuth tokens from Firebase), JWT issuance, user creation. Uses shared Neon DB + Upstash Redis.
- **user-service**: Profile CRUD, preferences, verification status. Shared Neon DB + Upstash Redis.
- **room-service**: Room listings, search/index to Meilisearch, media metadata (R2/S3). Shared Neon DB.
- **ride-service**: Ride offers/requests, status updates, live updates via WebSocket/Kafka hooks. Shared Neon DB + Upstash Redis.
- **job-service**: Job postings, verification flag, scam reports. Shared Neon DB + Upstash Redis.
- **chat-service**: Messaging, WebSocket endpoints for 1-1/group rooms. Shared Neon DB + Upstash Redis.
- **api-gateway**: Routing, API versioning, future JWT validation and rate limiting.
