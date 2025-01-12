/*
  # Fix Order Creation Policies

  1. Changes
    - Update RLS policies for orders and order_items
    - Add proper checks for authenticated users
    - Allow users to create orders and order items

  2. Security
    - Users can only create/read their own orders
    - Order items are linked to order ownership
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users read own orders" ON orders;
DROP POLICY IF EXISTS "Users create own orders" ON orders;
DROP POLICY IF EXISTS "Users read own order items" ON order_items;

-- Create new order policies
CREATE POLICY "Users can manage own orders"
  ON orders
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create new order items policies
CREATE POLICY "Users can manage own order items"
  ON order_items
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);