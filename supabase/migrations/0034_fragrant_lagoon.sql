-- First drop the dependent view
DROP VIEW IF EXISTS admin_products;

-- Add shipping method columns
ALTER TABLE products
ADD COLUMN IF NOT EXISTS air_shipping_cost decimal(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS air_shipping_available boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS sea_shipping_cost decimal(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS sea_shipping_available boolean DEFAULT true;

-- Add shipping_method to order_items
ALTER TABLE order_items
ADD COLUMN IF NOT EXISTS shipping_method text CHECK (shipping_method IN ('air', 'sea')) DEFAULT 'sea';

-- Update existing products to have sea shipping available
UPDATE products 
SET sea_shipping_available = true 
WHERE sea_shipping_available IS NULL;

-- Recreate the admin_products view
CREATE OR REPLACE VIEW admin_products AS
SELECT 
  p.*,
  p.price + COALESCE(p.sea_shipping_cost, 0) as total_sea_cost,
  p.price + COALESCE(p.air_shipping_cost, 0) as total_air_cost
FROM products p
WHERE EXISTS (
  SELECT 1 FROM users
  WHERE users.id = auth.uid()
  AND users.is_admin = true
);