/*
  # Add Payment Flag to Orders

  1. Changes
    - Add is_paid column to orders table with default false
    - Update existing orders to have is_paid = false
    - Make is_paid column required for new orders

  2. Security
    - No changes to RLS policies needed as they are inherited from the orders table
*/

-- Add is_paid column with default value
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS is_paid boolean DEFAULT false;

-- Update existing orders
UPDATE orders 
SET is_paid = false
WHERE is_paid IS NULL;

-- Make column required
ALTER TABLE orders
ALTER COLUMN is_paid SET NOT NULL;