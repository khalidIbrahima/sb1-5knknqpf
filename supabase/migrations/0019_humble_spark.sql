/*
  # Add category management policies

  1. Changes
    - Add RLS policies for category management
    - Only admin can create/update/delete categories
    - Anyone can read categories
*/

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public read categories" ON categories;
DROP POLICY IF EXISTS "Admin manage categories" ON categories;

-- Create new policies
CREATE POLICY "Anyone can read categories"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can manage categories"
  ON categories FOR ALL
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