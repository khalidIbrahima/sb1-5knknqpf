/*
  # Final Fix for User Policies
  
  1. Changes
    - Remove all recursive policy checks
    - Implement direct role-based access
    - Simplify admin checks using auth.jwt()
    - Add basic insert policy for auth triggers
*/

-- Drop existing policies and functions
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Admin can view all profiles" ON users;

-- Basic policies without recursion
CREATE POLICY "Enable read access to own profile"
  ON users FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR
    auth.jwt() ->> 'email' = current_setting('app.settings.admin_email', TRUE)
  );

CREATE POLICY "Enable update access to own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Enable insert for auth trigger"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Simplified admin check without recursion
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN auth.jwt() ->> 'email' = current_setting('app.settings.admin_email', TRUE);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;