/*
  # Add services table

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `price` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `services` table
    - Add policies for public read access
*/

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access for services"
  ON services
  FOR SELECT
  TO public
  USING (true);

-- Insert initial services
INSERT INTO services (title, description, price) VALUES
  ('Bridal Mehndi', 'Intricate and detailed designs for your special day', 'Starting from $150'),
  ('Party Mehndi', 'Beautiful designs for all occasions', 'Starting from $50'),
  ('Kids Mehndi', 'Simple and cute designs for little ones', 'Starting from $30');