/*
  # Add Admin Product Management Policies

  1. New Policies
    - Admin can create/update/delete products and categories
    - Uses email check against environment variable
    - Maintains existing public read access

  2. Security
    - Uses secure admin check function
    - Policies use SECURITY DEFINER for extra safety
*/

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  -- Get admin email from environment variable via current_setting
  -- Note: The environment variable must be set in Supabase dashboard
  RETURN (
    auth.jwt() ->> 'email' = COALESCE(
      current_setting('app.settings.admin_email', TRUE),
      current_setting('ADMIN_EMAIL', TRUE)
    )
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin policies for products
CREATE POLICY "Admin can insert products"
  ON products FOR INSERT TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin can update products"
  ON products FOR UPDATE TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin can delete products"
  ON products FOR DELETE TO authenticated
  USING (is_admin());

-- Admin policies for categories
CREATE POLICY "Admin can insert categories"
  ON categories FOR INSERT TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin can update categories"
  ON categories FOR UPDATE TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin can delete categories"
  ON categories FOR DELETE TO authenticated
  USING (is_admin());