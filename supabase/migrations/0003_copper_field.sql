/*
  # Add shipping cost to products

  1. Changes
    - Add shipping_cost column to products table
    - Set default value to 0
    - Add check constraint to ensure non-negative values

  2. Data Integrity
    - Uses decimal type for precise currency calculations
    - Includes check constraint for data validation
*/

-- Add shipping_cost column to products
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS shipping_cost decimal(10,2) NOT NULL 
DEFAULT 0 
CHECK (shipping_cost >= 0);

-- Update products view for admin
CREATE OR REPLACE VIEW admin_products AS
SELECT 
  p.*,
  p.price + p.shipping_cost as total_cost
FROM products p
WHERE is_admin();

GRANT SELECT ON admin_products TO authenticated;