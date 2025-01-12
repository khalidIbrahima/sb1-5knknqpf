-- Add market_price column to products
ALTER TABLE products 
ADD COLUMN market_price decimal(10,2) DEFAULT NULL;

-- Update existing products with example market prices (20% higher than current price)
UPDATE products 
SET market_price = price * 1.2
WHERE market_price IS NULL;