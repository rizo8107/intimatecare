-- Function for updating timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create student_bookings table if it doesn't exist
CREATE TABLE IF NOT EXISTS student_bookings (
    id SERIAL PRIMARY KEY,
    
    -- Personal Information
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    
    -- Student Information
    college VARCHAR(255) NOT NULL,
    course_and_year VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    id_card_filename VARCHAR(255),
    id_card_url VARCHAR(512),
    
    -- Session Details
    session_type VARCHAR(100) NOT NULL DEFAULT 'Student Session',
    preferred_date DATE NOT NULL,
    preferred_time TIME NOT NULL,
    slot_id INTEGER,
    
    -- Session Questions
    brings_to_session TEXT NOT NULL,
    hopes_to_gain TEXT NOT NULL,
    specific_topics TEXT NOT NULL,
    spoken_to_someone TEXT NOT NULL,
    looking_for TEXT NOT NULL,
    anything_else TEXT,
    join_whatsapp_channel VARCHAR(10) NOT NULL,
    
    -- Payment Information
    price DECIMAL(10, 2) NOT NULL DEFAULT 299.00,
    payment_status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    cf_order_id VARCHAR(255),
    cf_payment_id VARCHAR(255),
    payment_timestamp TIMESTAMP,
    
    -- System Fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'BOOKED'
);

-- Create indexes for student_bookings if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_sb_email') THEN
        CREATE INDEX idx_sb_email ON student_bookings(email);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_sb_phone') THEN
        CREATE INDEX idx_sb_phone ON student_bookings(phone);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_sb_payment_status') THEN
        CREATE INDEX idx_sb_payment_status ON student_bookings(payment_status);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_sb_status') THEN
        CREATE INDEX idx_sb_status ON student_bookings(status);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_sb_preferred_date') THEN
        CREATE INDEX idx_sb_preferred_date ON student_bookings(preferred_date);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_sb_created_at') THEN
        CREATE INDEX idx_sb_created_at ON student_bookings(created_at);
    END IF;
END $$;

-- Drop trigger if it exists and create it
DROP TRIGGER IF EXISTS update_student_bookings_timestamp ON student_bookings;
CREATE TRIGGER update_student_bookings_timestamp
BEFORE UPDATE ON student_bookings
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Add a booking_reference column to available_slots if it doesn't exist
DO $$
BEGIN
    -- Check if the column exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'available_slots' AND column_name = 'booking_reference'
    ) THEN
        -- Add the column if it doesn't exist
        ALTER TABLE available_slots ADD COLUMN booking_reference VARCHAR(255);
    END IF;
END $$;

-- Create a function to update booking status in available_slots
CREATE OR REPLACE FUNCTION update_slot_booking_status()
RETURNS TRIGGER AS $$
BEGIN
    -- When a new booking is created, update the corresponding slot
    IF (TG_OP = 'INSERT') THEN
        UPDATE available_slots 
        SET booking_status = TRUE, 
            booking_reference = NEW.id::text
        WHERE id = NEW.slot_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to update slot status when a booking is made
DROP TRIGGER IF EXISTS after_booking_insert ON student_bookings;
CREATE TRIGGER after_booking_insert
AFTER INSERT ON student_bookings
FOR EACH ROW
WHEN (NEW.slot_id IS NOT NULL)
EXECUTE FUNCTION update_slot_booking_status();
