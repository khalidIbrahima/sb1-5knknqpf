/*
  # Update campaign products schema
  
  1. Changes
    - Add is_active and updated_at to campaign_products
    - Remove is_active from products table
    - Update admin_products view
  
  2. Data Migration
    - Move existing product status to campaign_products
*/

-- First drop the dependent view
DROP VIEW IF EXISTS admin_products;

-- Add is_active and updated_at to campaign_products
ALTER TABLE campaign_products 
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_campaign_products_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER campaign_products_updated_at
  BEFORE UPDATE ON campaign_products
  FOR EACH ROW
  EXECUTE FUNCTION update_campaign_products_updated_at();

-- Remove is_active from products if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'is_active'
  ) THEN
    -- First, migrate existing product status to campaign_products
    INSERT INTO campaign_products (campaign_id, product_id, is_active)
    SELECT 
      c.id as campaign_id,
      p.id as product_id,
      p.is_active
    FROM products p
    CROSS JOIN (
      SELECT id FROM campaigns 
      WHERE now() BETWEEN start_date AND end_date 
      ORDER BY start_date DESC 
      LIMIT 1
    ) c
    WHERE NOT EXISTS (
      SELECT 1 FROM campaign_products cp 
      WHERE cp.product_id = p.id AND cp.campaign_id = c.id
    );

    -- Then remove the column from products
    ALTER TABLE products DROP COLUMN is_active;
  END IF;
END $$;

-- Recreate the admin_products view
CREATE OR REPLACE VIEW admin_products AS
SELECT 
  p.*,
  p.price + p.shipping_cost as total_cost,
  cp.is_active
FROM products p
LEFT JOIN campaign_products cp ON p.id = cp.product_id
WHERE EXISTS (
  SELECT 1 FROM users
  WHERE users.id = auth.uid()
  AND users.is_admin = true
);