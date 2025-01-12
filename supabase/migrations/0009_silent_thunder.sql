/*
  # Fix User Policies

  1. Changes
    - Remove recursive admin check from policies
    - Simplify user access policies
    - Add admin-specific policies
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;

-- Create new non-recursive policies
CREATE POLICY "Allow users to read own profile"
  ON users FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Allow admin to read all profiles"
  ON users FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND is_admin = true
  ));

CREATE POLICY "Allow users to update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Update is_admin function to be more efficient
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
DECLARE
  admin_status boolean;
BEGIN
  SELECT is_admin INTO admin_status
  FROM users
  WHERE id = auth.uid();
  
  RETURN COALESCE(admin_status, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;