# ManaBandhu User Flows

## 1. Authentication Flow

```
[Landing] → [Login Screen]
              ├→ Email/Password → [Home]
              ├→ Google OAuth → [Home]
              ├→ Apple OAuth → [Home]
              ├→ Instagram OAuth → [Home]
              └→ Phone OTP → [Verify OTP] → [Home]
```

## 2. Room Finder Flow

```
[Home] → [Room Search]
          ├→ Enter filters (location, price, verified)
          ├→ [Map View] → Select location
          ├→ [Roommate Matching] → View matches
          └→ [Search Results]
              ├→ [Room Details]
              │   ├→ View photos
              │   ├→ Check amenities
              │   ├→ See verified badge
              │   ├→ [Split Expenses Calculator]
              │   └→ [Contact Host] → [Chat]
              └→ Save room → [Saved Rooms]
```

## 3. Job Search Flow

```
[Home] → [Job Search]
          ├→ Enter keywords, location
          ├→ Filter by verified
          └→ [Job Results]
              ├→ [Job Details]
              │   ├→ View description
              │   ├→ Check skills match
              │   ├→ [Apply] → Upload resume
              │   └→ [Request Referral]
              ├→ [AI Resume Builder]
              │   ├→ Enter details
              │   ├→ AI generates resume
              │   └→ Download PDF
              └→ [AI Mock Interview]
                  ├→ Select job type
                  ├→ Answer questions
                  └→ Get AI feedback
```

## 4. Ride Sharing Flow

```
[Home] → [Ride Options]
          ├→ [Offer Ride]
          │   ├→ Enter route, date, seats
          │   ├→ [Route Preview] → View map
          │   ├→ Set price
          │   └→ Publish
          └→ [Find Ride]
              ├→ Enter from/to, date
              ├→ [Cost Split Calculator]
              ├→ [Search Results]
              │   └→ [Ride Details] → [Request Ride]
              └→ [Trip Planner]
                  ├→ Multi-city planning
                  └→ Download visa templates
```

## 5. Marketplace Flow

```
[Home] → [Marketplace]
          ├→ [Browse Items]
          │   ├→ Filter: Buy/Sell/Rent
          │   ├→ [Item Details]
          │   │   ├→ View photos
          │   │   ├→ [Contact Seller] → [Chat]
          │   │   └→ [Make Offer]
          │   └→ [Create Listing]
          │       ├→ Upload photos
          │       ├→ Set price, category
          │       └→ Publish
          └→ [Auctions]
              ├→ [Browse Active Auctions]
              ├→ [Auction Details]
              │   ├→ View current bid
              │   ├→ [Place Bid]
              │   └→ Set auto-bid
              └→ [My Bids]
```

## 6. Health & Wellness Flow

```
[Home] → [Health]
          ├→ [Find Doctors]
          │   ├→ Filter by specialty
          │   ├→ [Doctor Profile]
          │   │   ├→ View rating, reviews
          │   │   ├→ Check telemedicine
          │   │   └→ [Book Appointment]
          │   │       ├→ Select date/time
          │   │       ├→ Choose in-person/telemedicine
          │   │       └→ Confirm booking
          │   └→ [My Appointments]
          ├→ [Fitness Challenges]
          │   ├→ Browse challenges
          │   ├→ [Join Challenge]
          │   └→ Track progress
          └→ [Diet Planner]
              ├→ Set calorie target
              ├→ [Add Meals]
              └→ View reports
```

## 7. Finance Management Flow

```
[Home] → [Finance]
          ├→ [Expense Tracker]
          │   ├→ [Add Expense]
          │   ├→ Categorize
          │   └→ View history
          ├→ [Group Wallets]
          │   ├→ [Create Wallet]
          │   ├→ Add members
          │   ├→ [Add Transaction]
          │   └→ View balance
          ├→ [Currency Converter]
          │   ├→ Select currencies
          │   ├→ Enter amount
          │   └→ Get real-time rate
          └→ [Reports]
              ├→ View spending by category
              ├→ Monthly trends
              └→ Export PDF
```

## 8. Social & Cultural Flow

```
[Home] → [Social]
          ├→ [Community Groups]
          │   ├→ Browse groups
          │   ├→ [Group Details]
          │   │   ├→ View members
          │   │   ├→ [Join Group]
          │   │   └→ [Group Chat]
          │   └→ [Create Post]
          ├→ [Festival Calendar]
          │   ├→ View upcoming festivals
          │   ├→ [Festival Details]
          │   └→ Set reminders
          ├→ [Desi Food Delivery]
          │   ├→ Browse restaurants
          │   ├→ [Restaurant Menu]
          │   ├→ Add to cart
          │   └→ [Checkout]
          └→ [Matrimony]
              ├→ [Browse Profiles]
              ├→ Filter preferences
              ├→ [Profile Details]
              └→ [Express Interest]
```

## 9. Immigration Help Flow

```
[Home] → [Immigration]
          ├→ [Visa News]
          │   ├→ Browse updates
          │   └→ [News Details]
          ├→ [Document Templates]
          │   ├→ Browse by visa type
          │   ├→ [Template Details]
          │   └→ Download PDF
          ├→ [Find Lawyers]
          │   ├→ Filter by specialty
          │   ├→ [Lawyer Profile]
          │   │   ├→ View experience, rating
          │   │   └→ [Book Consultation]
          │   └→ [My Consultations]
          └→ [Visa Status Tracking]
              ├→ Enter application number
              ├→ View timeline
              └→ Get notifications
```

## 10. AI Tools Flow

```
[Home] → [AI Tools]
          ├→ [AI Chatbot]
          │   ├→ Ask questions
          │   ├→ Get recommendations
          │   └→ View chat history
          ├→ [Smart Recommendations]
          │   ├→ View personalized jobs
          │   ├→ View room suggestions
          │   ├→ View ride matches
          │   └→ View event recommendations
          ├→ [Voice Search]
          │   ├→ Tap to record
          │   ├→ AI transcribes
          │   └→ View results
          └→ [Astrology]
              ├→ View daily prediction
              ├→ Check lucky numbers
              └→ Get compatibility
```

## Cross-Module Flows

### Notification Flow
```
[Any Screen] → [Notification Badge]
                └→ [Notifications List]
                    ├→ New message → [Chat]
                    ├→ Ride request → [Ride Details]
                    ├→ Job match → [Job Details]
                    └→ Visa update → [Immigration]
```

### Search Flow
```
[Any Screen] → [Global Search]
                ├→ Search rooms
                ├→ Search jobs
                ├→ Search rides
                ├→ Search marketplace
                └→ Search people
```

### Profile Flow
```
[Any Screen] → [Profile Icon]
                └→ [Profile]
                    ├→ [Edit Profile]
                    ├→ [My Listings]
                    ├→ [My Applications]
                    ├→ [Saved Items]
                    ├→ [Settings]
                    └→ [Logout]
```
