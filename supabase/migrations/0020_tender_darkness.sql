/*
  # Add hierarchical categories support
  
  1. Changes
    - Add parent_id for hierarchical structure
    - Add level column to track depth
    - Add path array to store ancestry path
  
  2. Security
    - Maintain existing RLS policies
*/

-- First drop the existing trigger that's causing the conflict
DROP TRIGGER IF EXISTS categories_updated_at ON categories;

-- Add columns for hierarchical structure
ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES categories(id),
ADD COLUMN IF NOT EXISTS level integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS path text[];

-- Create index for faster tree operations
CREATE INDEX IF NOT EXISTS category_path_gin_idx ON categories USING gin(path);

-- Update existing categories to set initial paths
UPDATE categories 
SET 
  path = ARRAY[id::text],
  level = 1
WHERE path IS NULL;

-- Create function to maintain hierarchy
CREATE OR REPLACE FUNCTION maintain_category_hierarchy()
RETURNS TRIGGER AS $$
DECLARE
  parent_path text[];
BEGIN
  IF NEW.parent_id IS NULL THEN
    NEW.path = ARRAY[NEW.id::text];
    NEW.level = 1;
  ELSE
    SELECT path INTO parent_path FROM categories WHERE id = NEW.parent_id;
    IF FOUND THEN
      NEW.path = array_append(parent_path, NEW.id::text);
      NEW.level = array_length(NEW.path, 1);
    ELSE
      NEW.path = ARRAY[NEW.id::text];
      NEW.level = 1;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for hierarchy maintenance
CREATE TRIGGER maintain_category_hierarchy
  BEFORE INSERT OR UPDATE OF parent_id
  ON categories
  FOR EACH ROW
  EXECUTE FUNCTION maintain_category_hierarchy();

-- Recreate the updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();