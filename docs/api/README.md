# API Documentation

Complete API reference and database schema for ManaBandhu backend.

## 📁 Files

- **[endpoints.md](./endpoints.md)** - Complete list of 80+ REST API endpoints across all modules
- **[database-schema.md](./database-schema.md)** - ER diagram and database schema with 17 tables

## 🔗 Base URL

```
http://localhost:3080/api/v1
```

## 📋 Modules

1. **Auth** - Authentication & authorization
2. **Rooms** - Room finder & roommate matching
3. **Jobs** - Job listings & career tools
4. **Finance** - Expense tracking & group wallets
5. **Rides** - Ride sharing & cost split
6. **Marketplace** - Buy/sell/rent items
7. **Social** - Community & cultural events
8. **Health** - Doctor search & telemedicine
9. **Immigration** - Visa tracking & documents
10. **AI** - Chatbot & recommendations
11. **Chat** - Real-time messaging
12. **Notifications** - Push & in-app notifications

## 🔐 Authentication

Most endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

Get token from:
- `POST /auth/login`
- `POST /auth/signup`

## 📊 Response Format

All responses wrapped in ApiResponse:
```json
{
  "success": true,
  "data": { ... },
  "message": "Success"
}
```

## 🧪 Testing

Use cURL, Postman, or any HTTP client. See [endpoints.md](./endpoints.md) for detailed examples.
