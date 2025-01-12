/*
  # Fix Campaign RLS Policies

  1. Changes
    - Drop existing campaign policies
    - Create new policies for admin access
    - Add proper RLS checks using is_admin() function

  2. Security
    - Enable RLS on campaigns table
    - Add policies for SELECT, INSERT, UPDATE, DELETE
    - Ensure admin-only access for modifications
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view campaigns" ON campaigns;
DROP POLICY IF EXISTS "Admin can manage campaigns" ON campaigns;

-- Create new focused policies
CREATE POLICY "Public read access to campaigns"
  ON campaigns FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin insert access to campaigns"
  ON campaigns FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin update access to campaigns"
  ON campaigns FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin delete access to campaigns"
  ON campaigns FOR DELETE
  TO authenticated
  USING (is_admin());