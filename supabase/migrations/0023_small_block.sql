-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can read campaign products" ON campaign_products;
DROP POLICY IF EXISTS "Admin can manage campaign products" ON campaign_products;

-- Create new focused policies
CREATE POLICY "Public read access to campaign products"
  ON campaign_products FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin insert access to campaign products"
  ON campaign_products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

CREATE POLICY "Admin update access to campaign products"
  ON campaign_products FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

CREATE POLICY "Admin delete access to campaign products"
  ON campaign_products FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

-- Add unique constraint if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'campaign_products_campaign_id_product_id_key'
  ) THEN
    ALTER TABLE campaign_products
    ADD CONSTRAINT campaign_products_campaign_id_product_id_key
    UNIQUE (campaign_id, product_id);
  END IF;
END $$;