-- Add updated_by column to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS updated_by uuid REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS updated_by_email text;

-- Create function to set updated_by_email
CREATE OR REPLACE FUNCTION set_order_updated_by_email()
RETURNS TRIGGER AS $$
BEGIN
  SELECT email INTO NEW.updated_by_email
  FROM auth.users
  WHERE id = NEW.updated_by;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_by_email
DROP TRIGGER IF EXISTS set_order_updated_by_email ON orders;
CREATE TRIGGER set_order_updated_by_email
  BEFORE INSERT OR UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_updated_by_email();

-- Update existing orders to set updated_by_email
UPDATE orders o
SET updated_by_email = u.email
FROM auth.users u
WHERE o.updated_by = u.id
AND o.updated_by_email IS NULL;