/*
  # Add created_by tracking to products

  1. Changes
    - Add created_by column to products table
    - Add foreign key constraint to auth.users
    - Set default value to current user
*/

-- Add created_by column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE products 
    ADD COLUMN created_by uuid REFERENCES auth.users(id);
  END IF;
END $$;