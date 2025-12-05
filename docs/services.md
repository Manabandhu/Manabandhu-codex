# Service Responsibilities

- **auth-service**: AuthN (email/password, OAuth tokens from Firebase), JWT issuance, user creation.
- **user-service**: Profile CRUD, preferences, verification status.
- **room-service**: Room listings, search/index to Meilisearch, media metadata (R2/S3).
- **ride-service**: Ride offers/requests, status updates, live updates via WebSocket/Kafka hooks.
- **job-service**: Job postings, verification flag, scam reports.
- **chat-service**: Messaging, WebSocket endpoints for 1-1/group rooms.
- **api-gateway**: Routing, API versioning, future JWT validation and rate limiting.
