# ManaBandhu Complete API Reference

Base URL: `/api/v1`

## Authentication
- POST `/auth/login` - Email/password login
- POST `/auth/register` - User registration
- POST `/auth/oauth` - OAuth provider login (Google, Apple, Instagram)
- POST `/auth/otp/send` - Send phone OTP
- POST `/auth/otp/verify` - Verify phone OTP

## Users
- GET `/users/profile` - Get user profile
- PUT `/users/profile` - Update profile
- GET `/users/{id}` - Get user by ID

## Rooms
- GET `/rooms` - Search rooms (filters: location, price, verified)
- POST `/rooms` - Create listing
- GET `/rooms/{id}` - Get room details
- POST `/rooms/{id}/save` - Save room
- GET `/rooms/roommate-match` - Roommate matching algorithm

## Jobs
- GET `/jobs` - Search jobs (filters: keywords, location, verified)
- POST `/jobs` - Post job
- GET `/jobs/{id}` - Job details
- POST `/jobs/{id}/apply` - Apply to job
- POST `/jobs/resume/generate` - AI resume builder
- POST `/jobs/interview/mock` - AI mock interview
- GET `/jobs/referrals` - Get referral opportunities

## Rides
- GET `/rides` - Search rides
- POST `/rides` - Offer ride
- GET `/rides/{id}` - Ride details
- POST `/rides/{id}/request` - Request ride
- POST `/rides/cost-split` - Calculate cost split
- GET `/rides/route-preview` - Get route preview

## Marketplace
- GET `/marketplace` - Get items (filter: category)
- POST `/marketplace` - Create listing
- GET `/marketplace/{id}` - Item details
- GET `/marketplace/auctions` - Get active auctions
- POST `/marketplace/auctions/{id}/bid` - Place bid

## Health
- GET `/health/doctors` - Search doctors (filter: specialty)
- POST `/health/appointments` - Book appointment
- GET `/health/appointments` - Get user appointments
- GET `/health/fitness/challenges` - Get fitness challenges
- POST `/health/fitness/challenges/{id}/join` - Join challenge
- GET `/health/diet/plan` - Get diet plan

## Finance
- GET `/finance/expenses` - Get expenses
- POST `/finance/expenses` - Add expense
- GET `/finance/wallets` - Get group wallets
- POST `/finance/wallets` - Create wallet
- POST `/finance/convert` - Currency conversion
- GET `/finance/reports` - Get financial reports

## Social
- GET `/social/groups` - Get community groups
- POST `/social/groups/{id}/join` - Join group
- POST `/social/posts` - Create post
- GET `/social/posts` - Get feed
- GET `/social/festivals` - Get festival calendar
- GET `/social/food-delivery` - Get desi restaurants
- GET `/social/matrimony` - Get matrimony profiles

## Immigration
- GET `/immigration/news` - Visa news
- GET `/immigration/templates` - Document templates
- GET `/immigration/lawyers` - Find lawyers
- POST `/immigration/lawyers/{id}/book` - Book consultation
- GET `/immigration/status` - Track visa status

## AI
- POST `/ai/chat` - Chat with AI assistant
- GET `/ai/recommendations` - Get personalized recommendations
- POST `/ai/voice-search` - Voice search
- GET `/ai/astrology` - Get astrology reading

## Chat
- GET `/chat/rooms` - Get chat rooms
- POST `/chat/messages` - Send message
- WS `/ws/chat` - WebSocket connection

## Notifications
- GET `/notifications` - Get notifications
- PUT `/notifications/{id}/read` - Mark as read

## Search
- GET `/search` - Global search across all modules

## Response Format

### Success
```json
{
  "data": {},
  "message": "Success"
}
```

### Error
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "status": 400
}
```

## Authentication
All endpoints (except auth) require JWT token in header:
```
Authorization: Bearer <token>
```
