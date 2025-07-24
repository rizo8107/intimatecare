-- Create webinars table if it doesn't exist
CREATE TABLE IF NOT EXISTS webinars (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    duration TEXT NOT NULL,
    presenter TEXT NOT NULL,
    image_url TEXT,
    benefits JSONB NOT NULL,
    hook_questions JSONB NOT NULL,
    registration_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_webinars_updated_at ON webinars;
CREATE TRIGGER update_webinars_updated_at
BEFORE UPDATE ON webinars
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert sample webinar data
INSERT INTO webinars (
    title,
    description,
    date,
    time,
    duration,
    presenter,
    image_url,
    benefits,
    hook_questions,
    registration_url,
    is_featured
) VALUES (
    'The Pleasure Paradox: Why Masturbation Might Be Hurting Your Sex Life (And How to Fix It)',
    'Join certified intimacy coach Khushboo Bist for a free, confidential, and shame-free webinar where we''ll have an honest conversation about masturbation.',
    '2025-08-15',
    '19:00',
    '90 minutes',
    'Khushboo Bist',
    '/images/webinar-masturbation.jpg',
    '[
        "Why so many of us carry deep-seated guilt around self-pleasure (and how to release it).",
        "The #1 reason masturbation can interfere with partnered orgasms and what to do about it.",
        "How to turn your solo practice into a tool that enhances your sex life, instead of competing with it.",
        "A simple technique called \"Mindful Masturbation\" to rediscover sensation and pleasure."
    ]',
    '[
        "Do you ever feel a sense of guilt or shame after masturbating?",
        "Is your solo pleasure routine starting to feel more exciting than sex with your partner?",
        "Are you struggling to reach orgasm with your partner, even though it''s easy when you''re alone?",
        "Does the topic of masturbation feel like a secret you have to keep in your relationship?"
    ]',
    'https://forms.gle/yourFormLink',
    true
);

-- Insert another webinar (optional)
INSERT INTO webinars (
    title,
    description,
    date,
    time,
    duration,
    presenter,
    image_url,
    benefits,
    hook_questions,
    registration_url,
    is_featured
) VALUES (
    'Breaking the Silence: Communicating Your Desires in the Bedroom',
    'A practical workshop on how to express your needs and desires to your partner without fear or embarrassment.',
    '2025-09-05',
    '18:30',
    '60 minutes',
    'Dr. Mira Shah',
    '/images/webinar-communication.jpg',
    '[
        "How to overcome the embarrassment of talking about sex with your partner.",
        "Simple frameworks for expressing needs without causing defensiveness.",
        "Practical exercises to build intimacy through communication.",
        "How to handle rejection and navigate differences in desires."
    ]',
    '[
        "Do you find it hard to tell your partner what you really want in bed?",
        "Have you ever faked pleasure to avoid an awkward conversation?",
        "Does bringing up new ideas feel too risky or embarrassing?",
        "Are there desires you''ve been keeping to yourself for too long?"
    ]',
    'https://forms.gle/yourSecondFormLink',
    false
);
