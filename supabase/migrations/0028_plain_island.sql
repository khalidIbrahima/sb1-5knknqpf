/*
  # Order Management Improvements

  1. Updates
    - Add total_items column to orders
    - Add tracking_url column to orders
    - Add notification preferences for admin users
    
  2. Security
    - Add RLS policies for order history
*/

-- Add new columns to orders
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS total_items integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS tracking_url text;

-- Add notification preferences to users
ALTER TABLE users
ADD COLUMN IF NOT EXISTS notification_preferences jsonb DEFAULT '{"order_notifications": true}'::jsonb;

-- Create order history table
CREATE TABLE IF NOT EXISTS order_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  status text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE order_history ENABLE ROW LEVEL SECURITY;

-- Create policies for order history
CREATE POLICY "Users can view own order history"
  ON order_history
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_history.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admin can manage order history"
  ON order_history
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

-- Function to update total_items
CREATE OR REPLACE FUNCTION update_order_total_items()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE orders
  SET total_items = (
    SELECT COALESCE(SUM(quantity), 0)
    FROM order_items
    WHERE order_id = NEW.order_id
  )
  WHERE id = NEW.order_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for total_items
CREATE TRIGGER update_order_total_items_trigger
  AFTER INSERT OR UPDATE OR DELETE ON order_items
  FOR EACH ROW
  EXECUTE FUNCTION update_order_total_items();