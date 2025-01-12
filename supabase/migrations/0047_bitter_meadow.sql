-- First drop any existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow read access for orders" ON orders;
DROP POLICY IF EXISTS "Allow insert access for orders" ON orders;
DROP POLICY IF EXISTS "Allow update access for orders" ON orders;
DROP POLICY IF EXISTS "Allow read access for items" ON order_items;
DROP POLICY IF EXISTS "Allow insert access for items" ON order_items;
DROP POLICY IF EXISTS "Allow read access for history" ON order_history;
DROP POLICY IF EXISTS "Allow insert access for history" ON order_history;

-- Create simplified order policies
CREATE POLICY "Users read orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

CREATE POLICY "Users create orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
  );

CREATE POLICY "Users and admins update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  )
  WITH CHECK (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

-- Create simplified order items policies
CREATE POLICY "Users read items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND (
        orders.user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM users
          WHERE users.id = auth.uid()
          AND users.is_admin = true
        )
      )
    )
  );

CREATE POLICY "Users create items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Create simplified order history policies 
CREATE POLICY "Users read history"
  ON order_history FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_history.order_id
      AND (
        orders.user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM users
          WHERE users.id = auth.uid()
          AND users.is_admin = true
        )
      )
    )
  );

CREATE POLICY "Users create history"
  ON order_history FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_history.order_id
      AND (
        orders.user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM users
          WHERE users.id = auth.uid()
          AND users.is_admin = true
        )
      )
    )
  );