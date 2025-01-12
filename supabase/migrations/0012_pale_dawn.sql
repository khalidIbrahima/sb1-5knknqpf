/*
  # Fix Product Schema
  
  1. Changes
    - Drop dependent view first
    - Add category column to products table
    - Update existing category_id references
    - Recreate view with new structure
*/

-- First drop the dependent view
DROP VIEW IF EXISTS admin_products;

-- Safely add category column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'category'
  ) THEN
    -- Add new category column
    ALTER TABLE products ADD COLUMN category text;
    
    -- Migrate data from category_id if it exists
    IF EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'products' AND column_name = 'category_id'
    ) THEN
      UPDATE products 
      SET category = (
        SELECT slug FROM categories WHERE categories.id = products.category_id
      );
      
      -- Drop the old foreign key constraint and column
      ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_id_fkey;
      ALTER TABLE products DROP COLUMN IF EXISTS category_id;
    END IF;
  END IF;
END $$;

-- Recreate the admin_products view with new structure
CREATE OR REPLACE VIEW admin_products AS
SELECT 
  p.*,
  p.price + p.shipping_cost as total_cost
FROM products p
WHERE is_admin();