/*
  # Campaign Products Relationship

  1. New Tables
    - `campaign_products`: Junction table for campaigns and products
      - `id` (uuid, primary key)
      - `campaign_id` (uuid, foreign key to campaigns)
      - `product_id` (uuid, foreign key to products)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `campaign_products` table
    - Add policies for admin management
*/

-- Create campaign_products junction table
CREATE TABLE campaign_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(campaign_id, product_id)
);

-- Enable RLS
ALTER TABLE campaign_products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access to campaign products"
  ON campaign_products FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin insert access to campaign products"
  ON campaign_products FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin delete access to campaign products"
  ON campaign_products FOR DELETE
  TO authenticated
  USING (is_admin());