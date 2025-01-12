-- First drop any existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow read access for orders" ON orders;
DROP POLICY IF EXISTS "Allow insert access for orders" ON orders;
DROP POLICY IF EXISTS "Allow update access for orders" ON orders;
DROP POLICY IF EXISTS "Allow read access for items" ON order_items;
DROP POLICY IF EXISTS "Allow insert access for items" ON order_items;
DROP POLICY IF EXISTS "Allow read access for history" ON order_history;
DROP POLICY IF EXISTS "Allow insert access for history" ON order_history;

-- Create new order policies with unique names
CREATE POLICY "order_select_policy"
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

CREATE POLICY "order_insert_policy"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
  );

CREATE POLICY "order_update_policy"
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

-- Create order items policies with unique names
CREATE POLICY "order_items_select_policy"
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

CREATE POLICY "order_items_insert_policy"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Create order history policies with unique names
CREATE POLICY "order_history_select_policy"
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

CREATE POLICY "order_history_insert_policy"
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