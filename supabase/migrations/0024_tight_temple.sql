-- Add payment_method column to orders
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS payment_method text,
ADD COLUMN IF NOT EXISTS shipping_info jsonb;

-- Update existing orders with default values
UPDATE orders 
SET 
  payment_method = 'card',
  shipping_info = '{}'::jsonb
WHERE payment_method IS NULL;

-- Make columns required for new orders
ALTER TABLE orders
ALTER COLUMN payment_method SET NOT NULL,
ALTER COLUMN shipping_info SET NOT NULL;