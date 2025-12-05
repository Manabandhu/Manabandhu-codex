CREATE TABLE IF NOT EXISTS ride (
    id UUID PRIMARY KEY,
    route VARCHAR(255) NOT NULL,
    time VARCHAR(255),
    seats INT,
    notes TEXT,
    status VARCHAR(64)
);
