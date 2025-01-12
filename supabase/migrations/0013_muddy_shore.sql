/*
  # Simplify User Policies and Admin Check
  
  1. Changes
    - Simplify user policies to avoid recursion
    - Update admin check to use environment variable directly
    - Add proper indexes for performance
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access to own profile" ON users;
DROP POLICY IF EXISTS "Enable update access to own profile" ON users;
DROP POLICY IF EXISTS "Enable insert for auth trigger" ON users;

-- Create index for performance
CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);

-- Simple policies without recursion
CREATE POLICY "Allow read own profile"
  ON users FOR SELECT
  TO authenticated
  USING (
    id = auth.uid()
  );

CREATE POLICY "Allow admin read all"
  ON users FOR SELECT
  TO authenticated
  USING (
    email = current_setting('app.settings.admin_email', TRUE)
  );

CREATE POLICY "Allow update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Allow system insert"
  ON users FOR INSERT
  WITH CHECK (true);

-- Simplified admin check function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE email = current_setting('app.settings.admin_email', TRUE)
    AND id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;