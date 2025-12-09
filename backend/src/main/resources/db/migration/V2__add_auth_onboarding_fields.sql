-- Add new fields to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_provider VARCHAR(50) DEFAULT 'email';
ALTER TABLE users ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

-- Add onboarding fields to user_profile table
ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS country VARCHAR(100);
ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS purposes TEXT;
ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS gender VARCHAR(20);
ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_auth_provider ON users(auth_provider);
CREATE INDEX IF NOT EXISTS idx_user_profile_onboarding ON user_profile(onboarding_completed);
