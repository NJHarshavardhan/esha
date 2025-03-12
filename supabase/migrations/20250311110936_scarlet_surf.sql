/*
  # Update RLS policies for reviews table

  1. Changes
    - Update the INSERT policy for reviews to allow public access
    - This allows unauthenticated users to submit reviews

  2. Security
    - Maintain read access for everyone
    - Allow anyone to submit reviews without authentication
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Allow authenticated users to insert reviews" ON reviews;

-- Create new INSERT policy that allows public access
CREATE POLICY "Allow public to insert reviews"
  ON reviews
  FOR INSERT
  TO public
  WITH CHECK (true);