/*
  # Add category management improvements
  
  1. Changes
    - Add updated_at trigger for categories
    - Update category management policies
*/

-- Create or replace the updated_at function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'categories_updated_at'
  ) THEN
    CREATE TRIGGER categories_updated_at
      BEFORE UPDATE ON categories
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Drop existing policies
DROP POLICY IF EXISTS "Admin can create categories" ON categories;
DROP POLICY IF EXISTS "Admin can update categories" ON categories;

-- Create new focused policies
CREATE POLICY "Admin create categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());