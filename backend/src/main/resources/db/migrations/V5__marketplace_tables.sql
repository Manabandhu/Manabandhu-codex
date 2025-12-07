CREATE TABLE marketplace_item (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    category VARCHAR(50),
    images TEXT[],
    location VARCHAR(255),
    seller_id UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE auction (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID REFERENCES marketplace_item(id),
    start_price DECIMAL(10,2),
    current_bid DECIMAL(10,2),
    highest_bidder UUID REFERENCES users(id),
    end_time TIMESTAMPTZ,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_marketplace_category ON marketplace_item(category, status);
CREATE INDEX idx_auction_status ON auction(status, end_time);
