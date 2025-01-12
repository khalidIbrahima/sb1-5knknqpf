/*
  # Fix User Policies - Final

  1. Changes
    - Simplify user policies to prevent recursion
    - Remove circular dependencies in admin checks
    - Add basic profile management policies
*/

-- Drop existing policies and functions
DROP POLICY IF EXISTS "Allow users to read own profile" ON users;
DROP POLICY IF EXISTS "Allow admin to read all profiles" ON users;
DROP POLICY IF EXISTS "Allow users to update own profile" ON users;

-- Basic user profile policies
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Simplified admin check function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM users 
    WHERE id = auth.uid() 
    AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin-specific policy for viewing all profiles
CREATE POLICY "Admin can view all profiles"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM users 
      WHERE id = auth.uid() 
      AND is_admin = true
    )
  );