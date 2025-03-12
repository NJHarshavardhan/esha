/*
  # Initial Schema Setup for Mehndi Website

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key)
      - `name` (text)
      - `review` (text)
      - `rating` (integer)
      - `created_at` (timestamp)
    - `gallery_images`
      - `id` (uuid, primary key)
      - `url` (text)
      - `title` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated users to insert reviews
*/

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  review text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  title text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Policies for reviews
CREATE POLICY "Allow public read access for reviews"
  ON reviews
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for gallery_images
CREATE POLICY "Allow public read access for gallery images"
  ON gallery_images
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert gallery images"
  ON gallery_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);