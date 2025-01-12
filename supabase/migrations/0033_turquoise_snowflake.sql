-- Add shipping method fields to products
ALTER TABLE products
ADD COLUMN air_shipping_available boolean DEFAULT false,
ADD COLUMN sea_shipping_available boolean DEFAULT true,
ADD COLUMN air_shipping_cost decimal(10,2) DEFAULT 0;

-- Rename existing shipping_cost to sea_shipping_cost for clarity
ALTER TABLE products 
RENAME COLUMN shipping_cost TO sea_shipping_cost;

-- Update existing products to have sea shipping available
UPDATE products 
SET sea_shipping_available = true 
WHERE sea_shipping_available IS NULL;

-- Add shipping_method to order_items
ALTER TABLE order_items
ADD COLUMN shipping_method text CHECK (shipping_method IN ('air', 'sea')) DEFAULT 'sea';