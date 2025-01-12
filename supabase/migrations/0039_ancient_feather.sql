-- Add WhatsApp configuration table
CREATE TABLE admin_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  whatsapp_number text NOT NULL DEFAULT '+221761800649',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_config ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Anyone can read admin config"
  ON admin_config FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can update config"
  ON admin_config FOR UPDATE
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

-- Insert default config
INSERT INTO admin_config (whatsapp_number)
VALUES ('+221761800649');