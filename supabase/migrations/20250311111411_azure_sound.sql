/*
  # Add quotes table and enhance gallery images

  1. New Tables
    - `quotes`
      - `id` (uuid, primary key)
      - `text` (text)
      - `author` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `quotes` table
    - Add policies for public read access
*/

CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  author text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access for quotes"
  ON quotes
  FOR SELECT
  TO public
  USING (true);

-- Insert some initial quotes
INSERT INTO quotes (text, author) VALUES
  ('Beauty lies in the hands of the creator', 'Unknown'),
  ('Henna is not just art, it''s a tradition that connects generations', 'Ancient Wisdom'),
  ('Every design tells a story', 'Mehndi Artist'),
  ('Where tradition meets creativity', 'Modern Artisan');