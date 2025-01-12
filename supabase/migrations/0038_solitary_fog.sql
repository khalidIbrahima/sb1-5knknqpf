-- Add delivery addresses table
CREATE TABLE delivery_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  additional_info text,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add RLS
ALTER TABLE delivery_addresses ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Users can manage their own addresses"
  ON delivery_addresses
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Add function to ensure only one default address
CREATE OR REPLACE FUNCTION handle_default_address()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_default THEN
    UPDATE delivery_addresses
    SET is_default = false
    WHERE user_id = NEW.user_id
    AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER set_default_address
  BEFORE INSERT OR UPDATE ON delivery_addresses
  FOR EACH ROW
  EXECUTE FUNCTION handle_default_address();

-- Add index for better performance
CREATE INDEX idx_delivery_addresses_user_id ON delivery_addresses(user_id);