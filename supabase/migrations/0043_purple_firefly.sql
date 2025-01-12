-- Drop existing policies
DROP POLICY IF EXISTS "Allow users to read own profile" ON users;
DROP POLICY IF EXISTS "Allow users to update own profile" ON users;
DROP POLICY IF EXISTS "Allow system to create users" ON users;
DROP POLICY IF EXISTS "Allow admin to read all profiles" ON users;

-- Create new non-recursive policies
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

CREATE POLICY "Enable system insert"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Update handle_new_user function to be more robust
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER SECURITY DEFINER AS $$
DECLARE
  admin_email text;
BEGIN
  -- Get admin email from settings
  admin_email := current_setting('app.settings.admin_email', TRUE);
  
  -- Insert new user
  INSERT INTO public.users (id, email, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    CASE WHEN admin_email IS NOT NULL AND NEW.email = admin_email
      THEN true
      ELSE false
    END
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;