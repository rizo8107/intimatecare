-- This script adds a new instructor named 'Alex' and their related content.
-- You can use this as a template to add more instructors.

-- Step 1: Define the new instructor's UUID. You can generate a new one online.
DO $$
DECLARE
    alex_uuid UUID := '4e5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s';
BEGIN

-- Step 2: Insert the new instructor into the 'instructors' table.
INSERT INTO instructors (id, name, email, specialization, bio, experience, profile_image_url, highlight_color, secondary_color)
VALUES (
  alex_uuid, 
  'Alex',
  'alex@intimatecare.com',
  'Mindfulness & Stress Reduction',
  'Guiding you to find calm and clarity in a chaotic world through practical mindfulness techniques.',
  '5+ Years Experience',
  '/images/alex-profile.jpg', -- Make sure you have this image in your /public/images folder
  '#3498db', -- A nice blue
  '#2c3e50'  -- A deep navy
);

-- Step 3: Insert session types for the new instructor.
INSERT INTO session_types (instructor_id, name, description, price, duration_minutes, is_first_session)
VALUES 
(alex_uuid, 'Intro to Mindfulness', '60-minute introductory session', 999, 60, true),
(alex_uuid, 'Deep Dive Session', '90-minute follow-up session', 1499, 90, false);

-- Step 4: Insert highlights for the new instructor.
INSERT INTO instructor_highlights (instructor_id, title, icon_name, icon_color, display_order)
VALUES 
(alex_uuid, 'Certified Mindfulness Coach', 'Award', '#f1c40f', 1),
(alex_uuid, '500+ Clients Helped', 'Users', '#2ecc71', 2),
(alex_uuid, 'Personalized Techniques', 'PenTool', '#e74c3c', 3);

-- Step 5: Insert support areas for the new instructor.
INSERT INTO instructor_support_areas (instructor_id, category, title, description, icon_name, display_order)
VALUES 
(alex_uuid, 'Mindfulness Practices', 'Stress & Anxiety', 'Learn techniques to manage daily stressors.', 'Zap', 1),
(alex_uuid, 'Mindfulness Practices', 'Focus & Clarity', 'Improve your concentration and mental clarity.', 'Compass', 2),
(alex_uuid, 'Mindfulness Practices', 'Emotional Regulation', 'Develop a healthier relationship with your emotions.', 'Heart', 3);

-- Step 6: Insert post-session offerings for the new instructor.
INSERT INTO instructor_offerings (instructor_id, title, description, icon_name, display_order)
VALUES 
(alex_uuid, 'Guided Meditations', 'Custom audio recordings to support your practice.', 'Mic', 1),
(alex_uuid, 'Mindfulness Worksheets', 'Practical exercises to integrate into your daily life.', 'FileText', 2);

-- Step 7: Insert page sections for the new instructor.
INSERT INTO instructor_page_sections (instructor_id, section_type, title, subtitle, content, display_order)
VALUES 
(alex_uuid, 'intro', 'Find Your Inner Calm', 'With Alex', 'Guiding you to find calm and clarity in a chaotic world through practical mindfulness techniques.', 1),
(alex_uuid, 'closing', 'Ready to Start Your Practice?', NULL, 'Book a session with Alex to begin your journey toward a more mindful and peaceful life.', 2);

-- Step 8: Insert testimonials for the new instructor.
INSERT INTO instructor_testimonials (instructor_id, client_name, client_description, content, rating)
VALUES 
(alex_uuid, 'Jenna B.', 'Software Developer', 'Alex’s sessions were a game-changer for my anxiety. I feel more in control and at peace than ever before.', 5);

END $$;
