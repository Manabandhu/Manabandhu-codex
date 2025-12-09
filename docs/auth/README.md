# Authentication & Onboarding Documentation

Complete implementation guide for auth and onboarding features.

## 📁 Files

### Implementation Guides
- **[backend-implementation.md](./backend-implementation.md)** - Complete backend setup with Spring Boot, database schema, JWT, and API endpoints
- **[frontend-fixes.md](./frontend-fixes.md)** - Frontend implementation details and fixes applied
- **[code-review-fixes.md](./code-review-fixes.md)** - Critical issues found and resolved during code review

## 🚀 Quick Start

### Backend Setup
1. Run database migration: `mvn flyway:migrate`
2. Build: `mvn clean package`
3. Start: `java -jar target/manabandhu-backend-1.0.0.jar`

### Frontend Setup
1. Install dependencies: `npm install @react-native-async-storage/async-storage`
2. Start: `cd frontend && npm start`

## 📋 Features Implemented

### Authentication
- ✅ Email/password login
- ✅ User registration (signup)
- ✅ Password reset flow
- ✅ JWT token authentication
- ✅ Refresh token support
- ✅ Token persistence (AsyncStorage)
- ✅ Auto token refresh on 401

### Onboarding
- ✅ Multi-step onboarding form
- ✅ Country selection
- ✅ Purpose selection (student, professional, etc.)
- ✅ Profile completion tracking
- ✅ Skip option

### Security
- ✅ BCrypt password hashing
- ✅ JWT token signing (HS256)
- ✅ Token expiry (24h access, 7d refresh)
- ✅ Protected endpoints
- ✅ Error handling without info leakage

## 🔗 API Endpoints

- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/onboarding` - Complete onboarding
- `POST /api/v1/auth/password-reset/request` - Request password reset
- `GET /api/v1/auth/me` - Get current user

## 📊 Database Schema

### users table
- id, email, password, name, phone, auth_provider, verified, active

### user_profile table
- id, user_account_id, email, name, country, city, purposes, bio, date_of_birth, gender, onboarding_completed

## 🧪 Testing

See [backend-implementation.md](./backend-implementation.md) for cURL examples and testing guide.

## 📝 Next Steps

1. Email verification
2. OAuth providers (Google, Facebook, Apple)
3. Phone OTP verification
4. Rate limiting
5. 2FA support
