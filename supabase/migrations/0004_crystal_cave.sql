/*
  # Add Campaign Management System
  
  1. New Tables
    - `campaigns`
      - `id` (uuid, primary key)
      - `name` (text)
      - `start_date` (timestamptz)
      - `end_date` (timestamptz)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `created_by` (uuid, references auth.users)
  
  2. Changes
    - Add `campaign_id` to orders table
    
  3. Security
    - Enable RLS on campaigns table
    - Add policies for admin and public access
*/

-- Create campaigns table
CREATE TABLE campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  CONSTRAINT valid_dates CHECK (end_date > start_date)
);

-- Add campaign_id to orders
ALTER TABLE orders 
ADD COLUMN campaign_id uuid REFERENCES campaigns(id);

-- Enable RLS
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Policies for campaigns
CREATE POLICY "Public can view campaigns"
  ON campaigns FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can insert campaigns"
  ON campaigns FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin can update campaigns"
  ON campaigns FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Function to check if campaign is active
CREATE OR REPLACE FUNCTION is_campaign_active(campaign_uuid uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM campaigns
    WHERE id = campaign_uuid
    AND is_active = true
    AND now() BETWEEN start_date AND end_date
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;