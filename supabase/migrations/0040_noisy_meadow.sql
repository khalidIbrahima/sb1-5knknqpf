-- Check if admin_config table exists before creating
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'admin_config'
  ) THEN
    -- Create admin_config table
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

    -- Insert default config if table was just created
    INSERT INTO admin_config (whatsapp_number)
    VALUES ('+221761800649');
  END IF;
END $$;

-- Update trigger for updated_at if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'admin_config_updated_at'
  ) THEN
    CREATE TRIGGER admin_config_updated_at
      BEFORE UPDATE ON admin_config
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;