/*
  # Fix Campaign RLS Policies

  1. Changes
    - Drop existing campaign policies
    - Add more specific policies for campaign management
    - Add policy for checking active campaigns
    
  2. Security
    - Enable RLS on campaigns table
    - Add policies for public read access
    - Add policies for admin CRUD operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public can view campaigns" ON campaigns;
DROP POLICY IF EXISTS "Admin can insert campaigns" ON campaigns;
DROP POLICY IF EXISTS "Admin can update campaigns" ON campaigns;

-- Create new policies
CREATE POLICY "Anyone can view campaigns"
  ON campaigns FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can manage campaigns"
  ON campaigns
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Function to get active campaign
CREATE OR REPLACE FUNCTION get_active_campaign()
RETURNS SETOF campaigns AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM campaigns
  WHERE is_active = true
    AND now() BETWEEN start_date AND end_date
  ORDER BY start_date DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_active_campaign TO authenticated;
GRANT EXECUTE ON FUNCTION get_active_campaign TO anon;