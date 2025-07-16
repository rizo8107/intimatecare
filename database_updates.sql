-- Add instructor_id column to session_types table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'session_types' AND column_name = 'instructor_id'
    ) THEN
        ALTER TABLE session_types ADD COLUMN instructor_id INTEGER;
    END IF;
END $$;

-- Update existing session types with instructor IDs
UPDATE session_types SET instructor_id = 3 WHERE id = 3; -- Holistic Listening & Cathartic Healing
UPDATE session_types SET instructor_id = 3 WHERE id = 4; -- Tarot Reading (1 hour)
UPDATE session_types SET instructor_id = 3 WHERE id = 5; -- Emotional & Sexual Trauma Listening

-- Create session_packages table if it doesn't exist
CREATE TABLE IF NOT EXISTS session_packages (
    id SERIAL PRIMARY KEY,
    session_type_id INTEGER NOT NULL REFERENCES session_types(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sessions_count INTEGER NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert package deals for Mansi's session types
INSERT INTO session_packages (session_type_id, name, description, sessions_count, price)
VALUES 
    (3, '3 Sessions Package', 'Package of 3 Holistic Listening sessions at a discounted rate', 3, 7500),
    (5, '3 Sessions Package', 'Package of 3 Trauma Listening sessions at a discounted rate', 3, 7500)
ON CONFLICT (id) DO NOTHING;

-- Add package-related columns to bookings table if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookings' AND column_name = 'is_package'
    ) THEN
        ALTER TABLE bookings ADD COLUMN is_package BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookings' AND column_name = 'package_id'
    ) THEN
        ALTER TABLE bookings ADD COLUMN package_id INTEGER;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookings' AND column_name = 'sessions_remaining'
    ) THEN
        ALTER TABLE bookings ADD COLUMN sessions_remaining INTEGER DEFAULT 1;
    END IF;
END $$;

-- Ensure we have all three session types for Mansi
INSERT INTO session_types (id, name, description, price, duration_minutes, instructor_id)
VALUES 
    (3, 'Holistic Listening & Cathartic Healing Sessions', 'A compassionate space where you can share your thoughts, feelings, and worries without fear of judgment.', 1299, 60, 3),
    (4, 'Tarot Reading Sessions', 'Tap into the wisdom of tarot for clarity and guidance in relationships, career, personal growth, and life decisions.', 1299, 60, 3),
    (5, 'Emotional & Sexual Trauma Listening', 'A safe space to process deep emotional wounds, past sexual trauma, and intimacy struggles.', 1299, 60, 3)
ON CONFLICT (id) DO 
    UPDATE SET 
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        duration_minutes = EXCLUDED.duration_minutes,
        instructor_id = EXCLUDED.instructor_id;
