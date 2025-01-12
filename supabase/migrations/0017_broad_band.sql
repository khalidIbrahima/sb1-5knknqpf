/*
  # Fix Product RLS Policies

  1. Changes
    - Drop and recreate product policies with proper authentication checks
    - Add policies for all CRUD operations
    - Ensure proper admin access

  2. Security
    - Enable RLS
    - Add policies for public read access
    - Add policies for admin management
*/

-- First drop existing policies
DROP POLICY IF EXISTS "Public read products" ON products;
DROP POLICY IF EXISTS "Admin can insert products" ON products;
DROP POLICY IF EXISTS "Admin can update products" ON products;
DROP POLICY IF EXISTS "Admin can delete products" ON products;

-- Create new policies with proper checks
CREATE POLICY "Anyone can read products"
  ON products FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

CREATE POLICY "Admin can update products"
  ON products FOR UPDATE
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

CREATE POLICY "Admin can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );