CREATE TABLE expense (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    description VARCHAR(255),
    amount DECIMAL(10,2),
    currency VARCHAR(10),
    category VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE wallet (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    balance DECIMAL(10,2),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE social_group (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    description TEXT,
    member_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE social_post (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    content TEXT,
    images TEXT[],
    likes INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE festival (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    date DATE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_expense_user ON expense(user_id, created_at);
CREATE INDEX idx_post_user ON social_post(user_id, created_at);
