-- Create instructor_content table for dynamic instructor pages
CREATE TABLE IF NOT EXISTS instructor_content (
  id SERIAL PRIMARY KEY,
  instructor_name VARCHAR(255) NOT NULL,
  content_type VARCHAR(100) NOT NULL, -- 'highlight', 'support_area', 'offering', 'page_section', etc.
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon_name VARCHAR(100),
  icon_color VARCHAR(20) DEFAULT '#FF5A84',
  category VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  is_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert content for Mansi
INSERT INTO instructor_content (instructor_name, content_type, title, description, icon_name, icon_color, display_order)
VALUES 
-- Highlights
('Mansi', 'highlight', '1.5+ Years Experience', NULL, 'Star', '#FFD700', 1),
('Mansi', 'highlight', 'Intuitive Healing', NULL, 'Heart', '#FF5A84', 2),
('Mansi', 'highlight', 'Judgment-Free Zone', NULL, 'MessageCircle', '#3498db', 3),

-- Page sections
('Mansi', 'page_section', 'Holistic Listening & Intuitive Healing', 'A safe, non-judgmental space where you can feel heard, witnessed, and truly understood.', NULL, NULL, 1),
('Mansi', 'page_section', 'Session Details', 'During our sessions, I create a container for you to explore your inner landscape with curiosity rather than judgment. I offer intuitive guidance, embodiment practices, and reflective prompts to help you connect with your authentic self.', NULL, NULL, 2),
('Mansi', 'page_section', 'Sexual Wellness Support', 'As a trained sexual wellness coach, I provide a safe space to explore challenges around intimacy, desire, and pleasure. All sessions are clothed conversations—I do not offer physical touch or demonstrations.', NULL, NULL, 3),
('Mansi', 'page_section', 'Non-Sexual Holistic Support', 'Other areas where I can hold space for your journey:', NULL, NULL, 4),
('Mansi', 'page_section', 'What You''ll Receive Post-Session', 'Each session is more than a conversation—it''s an energetic exchange. Based on our time together, you may receive:', NULL, NULL, 5),
('Mansi', 'page_section', 'Ready to Begin Your Journey?', 'Take the first step toward healing and self-discovery. Book a session with Mansi and experience a safe space where you can explore, express, and embrace your authentic self.', NULL, NULL, 6),

-- Support areas - Sexual Wellness
('Mansi', 'support_area', 'Desire Blocks', 'Shame or fear around sexual desires', 'Lock', '#FF5A84', 1),
('Mansi', 'support_area', 'Past Trauma', 'Sexual shutdown due to past trauma', 'Shield', '#FF5A84', 2),
('Mansi', 'support_area', 'Communication', 'Lack of communication with partners', 'MessageSquare', '#FF5A84', 3),
('Mansi', 'support_area', 'Life Changes', 'Navigating desire after childbirth or menopause', 'Calendar', '#FF5A84', 4),
('Mansi', 'support_area', 'Self-pleasure', 'Self-pleasure & orgasm blockages', 'Heart', '#FF5A84', 5),
('Mansi', 'support_area', 'Energetic', 'Energetic disconnection from yoni/womb', 'Zap', '#FF5A84', 6),

-- Support areas - Holistic Support
('Mansi', 'support_area', 'Emotional Processing', 'Navigating difficult emotions', 'Heart', '#853f92', 7),
('Mansi', 'support_area', 'Life Transitions', 'Support through major life changes', 'Compass', '#853f92', 8),
('Mansi', 'support_area', 'Relationship Dynamics', 'Understanding patterns in relationships', 'Users', '#853f92', 9),
('Mansi', 'support_area', 'Self-Discovery', 'Reconnecting with your authentic self', 'Search', '#853f92', 10),

-- Post-session offerings
('Mansi', 'offering', 'Personalized Practices', 'Custom embodiment or meditation practices', 'Sparkles', '#FF5A84', 1),
('Mansi', 'offering', 'Resource Recommendations', 'Books, podcasts, or workshops to explore', 'BookOpen', '#FF5A84', 2),
('Mansi', 'offering', 'Journal Prompts', 'Reflective writing exercises for continued growth', 'PenTool', '#FF5A84', 3);

-- Add session types if they don't exist
INSERT INTO session_types (name, description, price, duration_minutes)
SELECT 'First Session', '1.5 hours of dedicated space', 1111, 90
WHERE NOT EXISTS (SELECT 1 FROM session_types WHERE name = 'First Session');

INSERT INTO session_types (name, description, price, duration_minutes)
SELECT 'Follow-Up Sessions', '1 hour of continued support', 555, 60
WHERE NOT EXISTS (SELECT 1 FROM session_types WHERE name = 'Follow-Up Sessions');
