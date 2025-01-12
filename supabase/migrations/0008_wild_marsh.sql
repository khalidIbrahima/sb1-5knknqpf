/*
  # Admin User Setup and Permissions

  1. Changes
    - Add trigger to create user profile on auth.users insert
    - Add function to set initial admin user
    - Update RLS policies for better security
*/

-- Create trigger to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.email = NULLIF(current_setting('app.settings.admin_email', TRUE), '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to ensure admin exists
CREATE OR REPLACE FUNCTION ensure_admin_exists() 
RETURNS void AS $$
DECLARE
  admin_email text;
BEGIN
  admin_email := NULLIF(current_setting('app.settings.admin_email', TRUE), '');
  
  IF admin_email IS NOT NULL THEN
    INSERT INTO public.users (id, email, is_admin)
    VALUES (
      (SELECT id FROM auth.users WHERE email = admin_email),
      admin_email,
      true
    )
    ON CONFLICT (email) DO UPDATE
    SET is_admin = true;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update policies for better security
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR
    (SELECT is_admin FROM users WHERE id = auth.uid())
  );

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Run initial setup
SELECT ensure_admin_exists();