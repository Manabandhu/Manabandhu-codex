CREATE TABLE IF NOT EXISTS job (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    location VARCHAR(255),
    category VARCHAR(255),
    description TEXT,
    verified BOOLEAN DEFAULT FALSE,
    reported BOOLEAN DEFAULT FALSE
);
