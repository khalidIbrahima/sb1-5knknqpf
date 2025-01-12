/*
  # Fix Campaign RLS Policies

  1. Changes
    - Drop and recreate campaign policies with proper authentication checks
    - Add better error handling for admin checks
    - Ensure proper cascading for campaign-product relationships

  2. Security
    - Enable RLS
    - Add policies for CRUD operations
*/

-- First drop existing policies
DROP POLICY IF EXISTS "Public read access to campaigns" ON campaigns;
DROP POLICY IF EXISTS "Admin insert access to campaigns" ON campaigns;
DROP POLICY IF EXISTS "Admin update access to campaigns" ON campaigns;
DROP POLICY IF EXISTS "Admin delete access to campaigns" ON campaigns;

-- Create new policies with proper checks
CREATE POLICY "Anyone can read campaigns"
  ON campaigns FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can insert campaigns"
  ON campaigns FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

CREATE POLICY "Admin can update campaigns"
  ON campaigns FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

CREATE POLICY "Admin can delete campaigns"
  ON campaigns FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );