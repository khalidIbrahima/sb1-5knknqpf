-- Drop all order-related policies
DROP POLICY IF EXISTS "Enable read access for orders" ON orders;
DROP POLICY IF EXISTS "Enable insert access for orders" ON orders;
DROP POLICY IF EXISTS "Enable update access for orders" ON orders;
DROP POLICY IF EXISTS "Enable read access for order items" ON order_items;
DROP POLICY IF EXISTS "Enable insert access for order items" ON order_items;
DROP POLICY IF EXISTS "Enable read access for order history" ON order_history;
DROP POLICY IF EXISTS "Enable insert access for order history" ON order_history;

-- Drop any other policies that might exist with different names
DROP POLICY IF EXISTS "Users read orders" ON orders;
DROP POLICY IF EXISTS "Users create orders" ON orders;
DROP POLICY IF EXISTS "Users and admins update orders" ON orders;
DROP POLICY IF EXISTS "Users read items" ON order_items;
DROP POLICY IF EXISTS "Users create items" ON order_items;
DROP POLICY IF EXISTS "Users read history" ON order_history;
DROP POLICY IF EXISTS "Users create history" ON order_history;
DROP POLICY IF EXISTS "order_select_policy" ON orders;
DROP POLICY IF EXISTS "order_insert_policy" ON orders;
DROP POLICY IF EXISTS "order_update_policy" ON orders;
DROP POLICY IF EXISTS "order_items_select_policy" ON order_items;
DROP POLICY IF EXISTS "order_items_insert_policy" ON order_items;
DROP POLICY IF EXISTS "order_history_select_policy" ON order_history;
DROP POLICY IF EXISTS "order_history_insert_policy" ON order_history;