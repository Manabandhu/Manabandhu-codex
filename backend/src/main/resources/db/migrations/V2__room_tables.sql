CREATE TABLE IF NOT EXISTS room_listing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    price NUMERIC,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS room_listing_amenities (
    room_listing_id UUID REFERENCES room_listing(id) ON DELETE CASCADE,
    amenity VARCHAR(255)
);

CREATE INDEX IF NOT EXISTS idx_room_listing_location ON room_listing(location);
