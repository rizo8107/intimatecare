// This script adds FAQ schema to the homepage for better SEO
document.addEventListener('DOMContentLoaded', function() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can Khushboo Bist help with sexual issues?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Khushboo Bist provides personalized coaching for various sexual issues including low desire, painful intercourse, erectile difficulties, and communication problems. She offers evidence-based strategies, educational resources, and compassionate guidance to help individuals and couples overcome intimate challenges."
        }
      },
      {
        "@type": "Question",
        "name": "What sexual issues does Khushboo Bist address?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Khushboo Bist addresses a wide range of sexual issues including low libido, pain during sex, orgasm difficulties, erectile dysfunction, premature ejaculation, mismatched desire levels, and intimacy challenges in relationships."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book a session with Khushboo Bist?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book a session with Khushboo Bist through her website by visiting the Sessions page. She offers both regular one-on-one sessions and special student sessions at a discounted rate."
        }
      },
      {
        "@type": "Question",
        "name": "Does Khushboo Bist offer online sessions for sexual issues?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Khushboo Bist offers online sessions for clients worldwide, making her expertise accessible regardless of location. These virtual sessions provide the same personalized guidance and support as in-person meetings."
        }
      },
      {
        "@type": "Question",
        "name": "What qualifications does Khushboo Bist have as a sex educator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Khushboo Bist is a certified sex educator and intimacy coach with specialized training in sexual wellness, relationship dynamics, and addressing common sexual issues. Her approach combines evidence-based practices with compassionate, personalized guidance."
        }
      }
    ]
  };

  // Create the script element
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(faqSchema);
  
  // Add it to the head
  document.head.appendChild(script);
});
