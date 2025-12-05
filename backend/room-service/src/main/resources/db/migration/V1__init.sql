CREATE TABLE IF NOT EXISTS room_listing (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    price NUMERIC,
    description TEXT
);

CREATE TABLE IF NOT EXISTS room_listing_amenities (
    room_listing_id UUID REFERENCES room_listing(id),
    amenities VARCHAR(255)
);
