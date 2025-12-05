CREATE TABLE IF NOT EXISTS job (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    location VARCHAR(255),
    category VARCHAR(255),
    description TEXT,
    verified BOOLEAN DEFAULT FALSE,
    reported BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_job_category ON job(category);
CREATE INDEX IF NOT EXISTS idx_job_location ON job(location);
