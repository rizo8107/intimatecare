-- This script will reset and set up the tables required for the instructor booking page.
-- WARNING: This will delete any existing data in these tables.

-- Drop existing tables in reverse order of creation to handle foreign key dependencies.
-- Using CASCADE to automatically drop any dependent objects like foreign keys.
DROP TABLE IF EXISTS instructor_testimonials CASCADE;
DROP TABLE IF EXISTS instructor_page_sections CASCADE;
DROP TABLE IF EXISTS instructor_offerings CASCADE;
DROP TABLE IF EXISTS instructor_support_areas CASCADE;
DROP TABLE IF EXISTS instructor_highlights CASCADE;
DROP TABLE IF EXISTS session_types CASCADE;
DROP TABLE IF EXISTS instructors CASCADE;

-- Create instructors table
CREATE TABLE instructors (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  specialization VARCHAR(255),
  bio TEXT,
  experience VARCHAR(255),
  profile_image_url VARCHAR(255),
  highlight_color VARCHAR(20) DEFAULT '#FF5A84',
  secondary_color VARCHAR(20) DEFAULT '#853f92',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create session_types table
CREATE TABLE session_types (
  id SERIAL PRIMARY KEY,
  instructor_id UUID NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC,
  duration_minutes INTEGER,
  is_first_session BOOLEAN DEFAULT FALSE,
  is_external BOOLEAN DEFAULT FALSE,
  external_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create instructor_highlights table
CREATE TABLE instructor_highlights (
  id SERIAL PRIMARY KEY,
  instructor_id UUID NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  icon_name VARCHAR(100),
  icon_color VARCHAR(20) DEFAULT '#FF5A84',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create instructor_support_areas table
CREATE TABLE instructor_support_areas (
  id SERIAL PRIMARY KEY,
  instructor_id UUID NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon_name VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create instructor_offerings table
CREATE TABLE instructor_offerings (
  id SERIAL PRIMARY KEY,
  instructor_id UUID NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon_name VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create instructor_page_sections table
CREATE TABLE instructor_page_sections (
  id SERIAL PRIMARY KEY,
  instructor_id UUID NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  section_type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  content TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create instructor_testimonials table
CREATE TABLE instructor_testimonials (
  id SERIAL PRIMARY KEY,
  instructor_id UUID NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  client_name VARCHAR(255) NOT NULL,
  client_description VARCHAR(255),
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Mansi as an instructor
INSERT INTO instructors (id, name, email, specialization, bio, experience, profile_image_url, highlight_color, secondary_color)
VALUES (
  'decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 
  'Mansi', 
  'mansi@intimatecare.com', 
  'Holistic Listening & Intuitive Healing', 
  'A safe, non-judgmental space where you can feel heard, witnessed, and truly understood.', 
  '1.5+ Years Experience',
  '/images/mansi-profile.jpg',
  '#FF5A84',
  '#853f92'
);

-- Insert session types
INSERT INTO session_types (instructor_id, name, description, price, duration_minutes, is_first_session, is_external, external_url)
VALUES 
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'First Session', '1.5 hours of dedicated space', 1111, 90, true, false, null),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Follow-Up Sessions', '1 hour of continued support', 555, 60, false, false, null),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Group Workshop', 'Join our monthly group healing circle', 999, 120, false, true, 'https://intimatecare.com/workshops/healing-circle');

-- Insert highlights
INSERT INTO instructor_highlights (instructor_id, title, icon_name, icon_color, display_order)
VALUES 
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', '1.5+ Years Experience', 'Star', '#FFD700', 1),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Intuitive Healing', 'Heart', '#FF5A84', 2),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Judgment-Free Zone', 'MessageCircle', '#3498db', 3);

-- Insert support areas (Sexual Wellness category)
INSERT INTO instructor_support_areas (instructor_id, category, title, description, icon_name, display_order)
VALUES 
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Sexual Wellness', 'Desire Blocks', 'Shame or fear around sexual desires', 'Lock', 1),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Sexual Wellness', 'Past Trauma', 'Sexual shutdown due to past trauma', 'Shield', 2),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Sexual Wellness', 'Communication', 'Lack of communication with partners', 'MessageSquare', 3),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Sexual Wellness', 'Life Changes', 'Navigating desire after childbirth or menopause', 'Calendar', 4),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Sexual Wellness', 'Self-pleasure', 'Self-pleasure & orgasm blockages', 'Heart', 5),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Sexual Wellness', 'Energetic', 'Energetic disconnection from yoni/womb', 'Zap', 6);

-- Insert support areas (Non-Sexual Holistic Support category)
INSERT INTO instructor_support_areas (instructor_id, category, title, description, icon_name, display_order)
VALUES 
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Holistic Support', 'Emotional Processing', 'Anxiety, overthinking & emotional overwhelm', 'FileText', 1),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Holistic Support', 'Relationship Patterns', 'Relationship dynamics & people-pleasing behaviors', 'Users', 2),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Holistic Support', 'Inner Child Work', 'Inner child grief & abandonment healing', 'User', 3),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Holistic Support', 'Creative Expression', 'Creative blocks & fear of expression', 'Edit', 4),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Holistic Support', 'Emotional Numbness', 'Feeling lost, stuck, or emotionally numb', 'Coffee', 5),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Holistic Support', 'Life Transitions', 'Navigating breakups, career changes, identity shifts', 'Activity', 6);

-- Insert post-session offerings
INSERT INTO instructor_offerings (instructor_id, title, description, icon_name, display_order)
VALUES 
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Journaling Prompts', 'Personalized prompts to continue your inner exploration', 'FileText', 1),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Embodiment Practices', 'Sensory exercises and breath practices for grounding', 'Coffee', 2),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Reflection Tools', 'Ritual suggestions to support your healing journey', 'Plus', 3),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Tarot/Oracle Guidance', 'Intuitive card readings when spiritually called', 'Monitor', 4),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Voice Notes', 'Personalized reminders available upon request', 'Mic', 5);

-- Insert page sections
INSERT INTO instructor_page_sections (instructor_id, section_type, title, subtitle, content, display_order)
VALUES 
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'intro', 'Holistic Listening & Intuitive Healing', 'With Mansi', 'A safe, non-judgmental space where you can feel heard, witnessed, and truly understood.', 1),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'session_details', 'Session Details', NULL, 'During our sessions, I create a container for you to explore your inner landscape with curiosity rather than judgment. I offer intuitive guidance, embodiment practices, and reflective prompts to help you connect with your authentic self.', 2),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'sexual_wellness', 'Sexual Wellness Support', NULL, 'As a trained sexual wellness coach, I provide a safe space to explore challenges around intimacy, desire, and pleasure. All sessions are clothed conversations—I do not offer physical touch or demonstrations.', 3),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'holistic_support', 'Non-Sexual Holistic Support', NULL, 'Other areas where I can hold space for your journey:', 4),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'post_session', 'What You''ll Receive Post-Session', NULL, 'Each session is more than a conversation—it''s an energetic exchange. Based on our time together, you may receive:', 5),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'closing', 'Ready to Begin Your Journey?', NULL, 'Take the first step toward healing and self-discovery. Book a session with Mansi and experience a safe space where you can explore, express, and embrace your authentic self.', 6),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'footer', 'Come as you are—there is no fixing, only feeling.', NULL, 'No diagnosis. No pressure. Just presence. A bridge between what you feel and what you haven''t yet dared to speak—whether you''re a man holding back tears, a woman silenced by shame, or anyone seeking wholeness.', 7);

-- Insert testimonials
INSERT INTO instructor_testimonials (instructor_id, client_name, client_description, content, rating)
VALUES 
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Sarah M.', '32, Healing from relationship trauma', 'Mansi created such a safe space for me to explore feelings I''ve been avoiding for years. Her intuitive guidance helped me reconnect with parts of myself I had shut down.', 5),
('decdcdba-55d0-4891-b94e-e2a0dc1f7e24', 'Raj K.', '28, Working through intimacy blocks', 'I never thought I could speak so openly about my struggles with intimacy. Mansi''s non-judgmental approach made all the difference. I feel more embodied and present now.', 5);
