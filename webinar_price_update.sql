-- Add price column to webinars table
ALTER TABLE webinars
ADD COLUMN IF NOT EXISTS price NUMERIC(10, 2) DEFAULT 1499.00;

-- Update existing webinars to have the default price
UPDATE webinars
SET price = 1499.00
WHERE price IS NULL;

-- Add price to sample webinar data
UPDATE webinars
SET price = 1499.00
WHERE title = 'The Pleasure Paradox: Why Masturbation Might Be Hurting Your Sex Life (And How to Fix It)';

UPDATE webinars
SET price = 999.00
WHERE title = 'Breaking the Silence: Communicating Your Desires in the Bedroom';

-- Comment: This migration adds a price field to the webinars table
-- with a default value of ₹1499.00 and updates existing records.
-- The price is stored as a numeric value with 2 decimal places.
