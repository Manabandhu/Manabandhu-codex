CREATE TABLE doctor (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(100),
    rating DECIMAL(3,2),
    location VARCHAR(255),
    telemedicine BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE appointment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id UUID REFERENCES doctor(id),
    user_id UUID REFERENCES users(id),
    appointment_date TIMESTAMPTZ,
    type VARCHAR(50),
    status VARCHAR(50) DEFAULT 'scheduled',
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE fitness_challenge (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    goal TEXT,
    participants INT DEFAULT 0,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_doctor_specialty ON doctor(specialty);
CREATE INDEX idx_appointment_user ON appointment(user_id, status);
