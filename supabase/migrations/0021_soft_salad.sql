-- Drop existing policies
DROP POLICY IF EXISTS "Public read access to campaign products" ON campaign_products;
DROP POLICY IF EXISTS "Admin insert access to campaign products" ON campaign_products;
DROP POLICY IF EXISTS "Admin delete access to campaign products" ON campaign_products;

-- Create new policies with proper admin checks
CREATE POLICY "Anyone can read campaign products"
  ON campaign_products FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can manage campaign products"
  ON campaign_products FOR ALL
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

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_campaign_products_campaign_id 
  ON campaign_products(campaign_id);

CREATE INDEX IF NOT EXISTS idx_campaign_products_product_id 
  ON campaign_products(product_id);