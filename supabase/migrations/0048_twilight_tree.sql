-- Drop existing policies
DROP POLICY IF EXISTS "Users read orders" ON orders;
DROP POLICY IF EXISTS "Users create orders" ON orders;
DROP POLICY IF EXISTS "Users and admins update orders" ON orders;

-- Create simplified order policies that don't depend on users table
CREATE POLICY "Enable read access for orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    auth.jwt() ->> 'email' = current_setting('app.settings.admin_email', TRUE)
  );

CREATE POLICY "Enable insert access for orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
  );

CREATE POLICY "Enable update access for orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    user_id = auth.uid() OR
    auth.jwt() ->> 'email' = current_setting('app.settings.admin_email', TRUE)
  )
  WITH CHECK (
    user_id = auth.uid() OR
    auth.jwt() ->> 'email' = current_setting('app.settings.admin_email', TRUE)
  );

-- Update order items policies
CREATE POLICY "Enable read access for order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND (
        orders.user_id = auth.uid() OR
        auth.jwt() ->> 'email' = current_setting('app.settings.admin_email', TRUE)
      )
    )
  );

CREATE POLICY "Enable insert access for order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Update order history policies
CREATE POLICY "Enable read access for order history"
  ON order_history FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_history.order_id
      AND (
        orders.user_id = auth.uid() OR
        auth.jwt() ->> 'email' = current_setting('app.settings.admin_email', TRUE)
      )
    )
  );

CREATE POLICY "Enable insert access for order history"
  ON order_history FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_history.order_id
      AND (
        orders.user_id = auth.uid() OR
        auth.jwt() ->> 'email' = current_setting('app.settings.admin_email', TRUE)
      )
    )
  );