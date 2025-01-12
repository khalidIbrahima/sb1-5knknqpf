-- Drop existing view
DROP VIEW IF EXISTS admin_products;

-- Ensure all required columns exist
DO $$ 
BEGIN
  -- Add missing columns if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'category'
  ) THEN
    ALTER TABLE products ADD COLUMN category text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'sea_shipping_cost'
  ) THEN
    ALTER TABLE products ADD COLUMN sea_shipping_cost decimal(10,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'air_shipping_cost'
  ) THEN
    ALTER TABLE products ADD COLUMN air_shipping_cost decimal(10,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'sea_shipping_available'
  ) THEN
    ALTER TABLE products ADD COLUMN sea_shipping_available boolean DEFAULT true;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'air_shipping_available'
  ) THEN
    ALTER TABLE products ADD COLUMN air_shipping_available boolean DEFAULT false;
  END IF;
END $$;

-- Recreate admin_products view
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