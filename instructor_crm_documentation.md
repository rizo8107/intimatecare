# Instructor Content Management for CRM

This document outlines the database schema and instructions for creating, updating, and managing instructor content from a CRM. The system is designed around a central `instructors` table, with all other content types linked via a foreign key.

## Core Concept: UUID as the Primary Link

Every instructor has a unique `id` (UUID). This `id` is used as the `instructor_id` in all other tables to link content (like session types, highlights, testimonials, etc.) to that specific instructor.

**CRM Workflow for Adding a New Instructor:**

1.  **Generate a new UUID** for the new instructor.
2.  **Insert a new record** into the `instructors` table with the core details.
3.  **Use the generated UUID** to insert records into the other content tables (`session_types`, `instructor_highlights`, etc.).

---

## Database Schema

Below are the detailed schemas for each table involved in managing instructor content.

### 1. `instructors`

This is the main table for instructor profiles.

| Column              | Type                        | Constraints                               |
| ------------------- | --------------------------- | ----------------------------------------- |
| `id`                | `UUID`                      | **Primary Key**                           |
| `name`              | `VARCHAR(255)`              | `NOT NULL`                                |
| `email`             | `VARCHAR(255)`              | `NOT NULL`, `UNIQUE`                      |
| `specialization`    | `VARCHAR(255)`              |                                           |
| `bio`               | `TEXT`                      |                                           |
| `experience`        | `VARCHAR(255)`              |                                           |
| `profile_image_url` | `VARCHAR(255)`              | URL to an image (e.g., `/images/name.jpg`)|
| `highlight_color`   | `VARCHAR(20)`               | `DEFAULT '#FF5A84'`                       |
| `secondary_color`   | `VARCHAR(20)`               | `DEFAULT '#853f92'`                       |
| `created_at`        | `TIMESTAMP WITH TIME ZONE`  | `DEFAULT NOW()`                           |

### 2. `session_types`

Defines the different session types an instructor offers (e.g., first session, follow-up).

| Column             | Type                        | Constraints                               |
| ------------------ | --------------------------- | ----------------------------------------- |
| `id`               | `SERIAL`                    | **Primary Key**                           |
| `instructor_id`    | `UUID`                      | `NOT NULL`, Foreign Key to `instructors.id` |
| `name`             | `VARCHAR(255)`              | `NOT NULL`                                |
| `description`      | `TEXT`                      |                                           |
| `price`            | `NUMERIC`                   |                                           |
| `duration_minutes` | `INTEGER`                   |                                           |
| `is_first_session` | `BOOLEAN`                   | `DEFAULT FALSE`                           |
| `created_at`       | `TIMESTAMP WITH TIME ZONE`  | `DEFAULT NOW()`                           |

### 3. `instructor_highlights`

Short, eye-catching highlights for the instructor's page.

| Column          | Type                        | Constraints                               |
| --------------- | --------------------------- | ----------------------------------------- |
| `id`            | `SERIAL`                    | **Primary Key**                           |
| `instructor_id` | `UUID`                      | `NOT NULL`, Foreign Key to `instructors.id` |
| `title`         | `VARCHAR(255)`              | `NOT NULL`                                |
| `icon_name`     | `VARCHAR(100)`              | Name of a `lucide-react` icon (e.g., 'Star') |
| `icon_color`    | `VARCHAR(20)`               | `DEFAULT '#FF5A84'`                       |
| `display_order` | `INTEGER`                   | `DEFAULT 0` (for ordering)                |
| `created_at`    | `TIMESTAMP WITH TIME ZONE`  | `DEFAULT NOW()`                           |

### 4. `instructor_support_areas`

Areas where the instructor provides support, grouped by category.

| Column          | Type                        | Constraints                               |
| --------------- | --------------------------- | ----------------------------------------- |
| `id`            | `SERIAL`                    | **Primary Key**                           |
| `instructor_id` | `UUID`                      | `NOT NULL`, Foreign Key to `instructors.id` |
| `category`      | `VARCHAR(100)`              | `NOT NULL` (e.g., 'Sexual Wellness')      |
| `title`         | `VARCHAR(255)`              | `NOT NULL`                                |
| `description`   | `TEXT`                      |                                           |
| `icon_name`     | `VARCHAR(100)`              | Name of a `lucide-react` icon             |
| `display_order` | `INTEGER`                   | `DEFAULT 0`                               |
| `created_at`    | `TIMESTAMP WITH TIME ZONE`  | `DEFAULT NOW()`                           |

### 5. `instructor_offerings`

Post-session offerings or takeaways for the client.

| Column          | Type                        | Constraints                               |
| --------------- | --------------------------- | ----------------------------------------- |
| `id`            | `SERIAL`                    | **Primary Key**                           |
| `instructor_id` | `UUID`                      | `NOT NULL`, Foreign Key to `instructors.id` |
| `title`         | `VARCHAR(255)`              | `NOT NULL`                                |
| `description`   | `TEXT`                      |                                           |
| `icon_name`     | `VARCHAR(100)`              | Name of a `lucide-react` icon             |
| `display_order` | `INTEGER`                   | `DEFAULT 0`                               |
| `created_at`    | `TIMESTAMP WITH TIME ZONE`  | `DEFAULT NOW()`                           |

### 6. `instructor_page_sections`

Defines the main content sections of the instructor's page.

| Column          | Type                        | Constraints                               |
| --------------- | --------------------------- | ----------------------------------------- |
| `id`            | `SERIAL`                    | **Primary Key**                           |
| `instructor_id` | `UUID`                      | `NOT NULL`, Foreign Key to `instructors.id` |
| `section_type`  | `VARCHAR(100)`              | `NOT NULL` (e.g., 'intro', 'closing')     |
| `title`         | `VARCHAR(255)`              | `NOT NULL`                                |
| `subtitle`      | `VARCHAR(255)`              |                                           |
| `content`       | `TEXT`                      |                                           |
| `display_order` | `INTEGER`                   | `DEFAULT 0`                               |
| `created_at`    | `TIMESTAMP WITH TIME ZONE`  | `DEFAULT NOW()`                           |

### 7. `instructor_testimonials`

Client testimonials for the instructor.

| Column               | Type                        | Constraints                               |
| -------------------- | --------------------------- | ----------------------------------------- |
| `id`                 | `SERIAL`                    | **Primary Key**                           |
| `instructor_id`      | `UUID`                      | `NOT NULL`, Foreign Key to `instructors.id` |
| `client_name`        | `VARCHAR(255)`              | `NOT NULL`                                |
| `client_description` | `VARCHAR(255)`              |                                           |
| `content`            | `TEXT`                      | `NOT NULL`                                |
| `rating`             | `INTEGER`                   | `CHECK (rating BETWEEN 1 AND 5)`          |
| `created_at`         | `TIMESTAMP WITH TIME ZONE`  | `DEFAULT NOW()`                           |

---

## Example SQL for CRM Backend

Your CRM's backend can use the following SQL transaction as a template for adding a new instructor. The frontend form would collect this data, and the backend would execute the insertions.

```sql
-- This script adds a new instructor named 'Alex' and their related content.

-- Step 1: Define the new instructor's UUID. This should be generated by your backend.
DO $$
DECLARE
    alex_uuid UUID := '4e5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s'; -- Generate a new UUID here
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
  '/images/alex-profile.jpg',
  '#3498db',
  '#2c3e50'
);

-- Step 3: Insert session types for the new instructor.
INSERT INTO session_types (instructor_id, name, description, price, duration_minutes, is_first_session)
VALUES 
(alex_uuid, 'Intro to Mindfulness', '60-minute introductory session', 999, 60, true);

-- Step 4: Insert highlights for the new instructor.
INSERT INTO instructor_highlights (instructor_id, title, icon_name, icon_color, display_order)
VALUES 
(alex_uuid, 'Certified Mindfulness Coach', 'Award', '#f1c40f', 1);

-- ... and so on for all other content types ...

END $$;
```
