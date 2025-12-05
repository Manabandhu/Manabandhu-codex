CREATE TABLE IF NOT EXISTS ride (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route VARCHAR(255) NOT NULL,
    time VARCHAR(255),
    seats INT,
    notes TEXT,
    status VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ride_route ON ride(route);
