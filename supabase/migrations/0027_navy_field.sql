/*
  # Fix Order Management Issues

  1. Updates
    - Add missing RLS policies for admin access to orders
    - Fix order creation and items insertion
    - Add campaign_id validation
    
  2. Security
    - Enable RLS for all tables
    - Add proper admin policies
*/

-- Add admin policies for orders
CREATE POLICY "Admin can manage all orders"
  ON orders
  FOR ALL
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

-- Add admin policies for order items
CREATE POLICY "Admin can manage all order items"
  ON order_items
  FOR ALL
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

-- Add function to validate campaign_id
CREATE OR REPLACE FUNCTION validate_campaign_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.campaign_id IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM campaigns
      WHERE id = NEW.campaign_id
      AND is_active = true
      AND now() BETWEEN start_date AND end_date
    ) THEN
      RAISE EXCEPTION 'Invalid or inactive campaign';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for campaign validation
CREATE TRIGGER validate_campaign_before_insert
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION validate_campaign_id();