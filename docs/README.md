# ManaBandhu Documentation

Complete documentation for the ManaBandhu super-app monorepo.

## 📚 Documentation Structure

### 🔐 Authentication & Onboarding
**[auth/](./auth/)** - Complete auth implementation
- Backend setup with Spring Boot & JWT
- Frontend screens & hooks
- Database schema & migrations
- Code review fixes

### 🔌 API Reference
**[api/](./api/)** - REST API documentation
- 80+ endpoints across 9 modules
- Database schema (17 tables)
- Request/response examples

### 📋 Project Documentation
- **[FEATURES.md](./FEATURES.md)** - Complete feature list (60+ screens)
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment guide (Cloud Run, Vercel, EAS)
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Project completion report
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Latest implementation summary
- **[ORGANIZATION_SUMMARY.md](./ORGANIZATION_SUMMARY.md)** - Complete file organization summary

## 🚀 Quick Links

### Getting Started
1. [Project README](../README.md) - Main project overview
2. [Auth Setup](./auth/README.md) - Authentication setup
3. [API Endpoints](./api/endpoints.md) - API reference

### Development
- [Backend Implementation](./auth/backend-implementation.md)
- [Frontend Fixes](./auth/frontend-fixes.md)
- [Database Schema](./api/database-schema.md)

### Deployment
- [Deployment Guide](./DEPLOYMENT.md)
- [Features List](./FEATURES.md)

## 🏗️ Architecture

```
ManaBandhu/
├── frontend/          # Expo (React Native + Web)
├── backend/           # Spring Boot monolith
├── packages/
│   ├── ui/           # Shared components
│   ├── utils/        # API client, stores
│   └── types/        # Shared types
├── infra/            # Docker, CI/CD
└── docs/             # Documentation (you are here)
```

## 📊 Tech Stack

### Frontend
- Expo Router (React Native + Web)
- NativeWind (Tailwind CSS)
- Zustand (State management)
- React Query (Data fetching)
- TypeScript

### Backend
- Spring Boot 3 (Java 21)
- PostgreSQL (Neon)
- Redis (Upstash)
- JWT Authentication
- Flyway Migrations

### Infrastructure
- Turborepo (Monorepo)
- Docker Compose
- GitHub Actions
- Cloud Run / Vercel / EAS

## 🎯 Features

### 9 Super-App Modules
1. Room Finder
2. Jobs & Career
3. Finance Tools
4. Ride Sharing
5. Marketplace
6. Social & Cultural
7. Health & Lifestyle
8. Immigration
9. AI Tools

See [FEATURES.md](./FEATURES.md) for complete list.

## 🧪 Testing

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
cd frontend
npm test
```

## 📝 Contributing

1. Read the relevant documentation
2. Follow the existing code structure
3. Update documentation for new features
4. Test thoroughly before committing

## 📞 Support

For questions or issues, refer to:
- [Auth Documentation](./auth/README.md)
- [API Reference](./api/README.md)
- [Deployment Guide](./DEPLOYMENT.md)
