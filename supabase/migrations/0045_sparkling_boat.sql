-- First drop any existing policies
DROP POLICY IF EXISTS "Enable read access for order history" ON order_history;
DROP POLICY IF EXISTS "Enable insert access for order history" ON order_history;
DROP POLICY IF EXISTS "Enable read access for orders" ON orders;
DROP POLICY IF EXISTS "Enable insert access for orders" ON orders;
DROP POLICY IF EXISTS "Enable update access for orders" ON orders;
DROP POLICY IF EXISTS "Enable read access for order items" ON order_items;
DROP POLICY IF EXISTS "Enable insert access for order items" ON order_items;

-- Create simplified order policies
CREATE POLICY "Allow read access for orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    auth.jwt() ->> 'email' = current_setting('app.settings.admin_email', TRUE)
  );

CREATE POLICY "Allow insert access for orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
  );

CREATE POLICY "Allow update access for orders"
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

-- Create simplified order items policies
CREATE POLICY "Allow read access for items"
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

CREATE POLICY "Allow insert access for items"
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
CREATE POLICY "Allow read access for history"
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

CREATE POLICY "Allow insert access for history"
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