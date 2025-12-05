CREATE TABLE IF NOT EXISTS user_profile (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    verified BOOLEAN DEFAULT FALSE,
    avatar_url VARCHAR(255)
);
