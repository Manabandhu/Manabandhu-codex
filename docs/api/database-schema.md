# ManaBandhu Database ER Diagram

## Entity Relationships

```
┌─────────────┐
│   users     │
│─────────────│
│ id (PK)     │◄──┐
│ email       │   │
│ password    │   │
│ name        │   │
│ verified    │   │
└─────────────┘   │
                  │
┌─────────────────┼────────────────────────────────────┐
│                 │                                    │
│  ┌──────────────▼──────┐  ┌──────────────────┐     │
│  │  user_profile       │  │  marketplace_item│     │
│  │─────────────────────│  │──────────────────│     │
│  │ id (PK)             │  │ id (PK)          │     │
│  │ user_account_id(FK) │  │ seller_id (FK)   │◄────┤
│  │ avatar_url          │  │ title            │     │
│  └─────────────────────┘  │ price            │     │
│                           │ category         │     │
│  ┌──────────────────┐     └──────────────────┘     │
│  │  expense         │              │                │
│  │──────────────────│              │                │
│  │ id (PK)          │              ▼                │
│  │ user_id (FK)     │◄────┐  ┌──────────────┐      │
│  │ amount           │     │  │  auction     │      │
│  │ category         │     │  │──────────────│      │
│  └──────────────────┘     │  │ id (PK)      │      │
│                           │  │ item_id (FK) │      │
│  ┌──────────────────┐     │  │ current_bid  │      │
│  │  appointment     │     │  │ highest_bidder│      │
│  │──────────────────│     │  └──────────────┘      │
│  │ id (PK)          │     │                         │
│  │ user_id (FK)     │◄────┤                         │
│  │ doctor_id (FK)   │     │                         │
│  │ status           │     │                         │
│  └──────────────────┘     │                         │
│         │                 │                         │
│         ▼                 │                         │
│  ┌──────────────────┐     │                         │
│  │  doctor          │     │                         │
│  │──────────────────│     │                         │
│  │ id (PK)          │     │                         │
│  │ name             │     │                         │
│  │ specialty        │     │                         │
│  │ telemedicine     │     │                         │
│  └──────────────────┘     │                         │
│                           │                         │
│  ┌──────────────────┐     │                         │
│  │  social_post     │     │                         │
│  │──────────────────│     │                         │
│  │ id (PK)          │     │                         │
│  │ user_id (FK)     │◄────┘                         │
│  │ content          │                               │
│  │ likes            │                               │
│  └──────────────────┘                               │
│                                                     │
│  ┌──────────────────┐                               │
│  │  notification    │                               │
│  │──────────────────│                               │
│  │ id (PK)          │                               │
│  │ user_id (FK)     │◄──────────────────────────────┘
│  │ type             │
│  │ read             │
│  └──────────────────┘

┌──────────────────┐
│  room            │
│──────────────────│
│ id (PK)          │
│ title            │
│ price            │
│ location         │
│ verified         │
└──────────────────┘

┌──────────────────┐
│  ride            │
│──────────────────│
│ id (PK)          │
│ route            │
│ date             │
│ cost_split       │
└──────────────────┘

┌──────────────────┐
│  job             │
│──────────────────│
│ id (PK)          │
│ title            │
│ company          │
│ verified         │
└──────────────────┘

┌──────────────────┐
│  wallet          │
│──────────────────│
│ id (PK)          │
│ name             │
│ balance          │
└──────────────────┘

┌──────────────────┐
│  social_group    │
│──────────────────│
│ id (PK)          │
│ name             │
│ member_count     │
└──────────────────┘

┌──────────────────┐
│  festival        │
│──────────────────│
│ id (PK)          │
│ name             │
│ date             │
└──────────────────┘

┌──────────────────┐
│fitness_challenge │
│──────────────────│
│ id (PK)          │
│ title            │
│ participants     │
└──────────────────┘
```

## Key Relationships

1. **users → user_profile**: One-to-One
2. **users → marketplace_item**: One-to-Many (seller)
3. **users → expense**: One-to-Many
4. **users → appointment**: One-to-Many
5. **users → social_post**: One-to-Many
6. **users → notification**: One-to-Many
7. **marketplace_item → auction**: One-to-One
8. **doctor → appointment**: One-to-Many

## Indexes

- `idx_user_profile_user_account` on user_profile(user_account_id)
- `idx_notification_user` on notification(user_id, read)
- `idx_marketplace_category` on marketplace_item(category, status)
- `idx_auction_status` on auction(status, end_time)
- `idx_doctor_specialty` on doctor(specialty)
- `idx_appointment_user` on appointment(user_id, status)
- `idx_expense_user` on expense(user_id, created_at)
- `idx_post_user` on social_post(user_id, created_at)
