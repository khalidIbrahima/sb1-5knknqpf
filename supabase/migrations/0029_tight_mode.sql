-- Seed data for testing and development

-- Create test users if they don't exist
DO $$
DECLARE
  user1_id uuid := '11111111-1111-1111-1111-111111111111';
  user2_id uuid := '22222222-2222-2222-2222-222222222222';
  user3_id uuid := '33333333-3333-3333-3333-333333333333';
BEGIN
  -- Only insert auth.users if they don't exist
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = user1_id) THEN
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      aud,
      role
    ) VALUES
      (
        user1_id,
        '00000000-0000-0000-0000-000000000000',
        'customer1@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        now() - interval '30 days',
        now(),
        '{"provider":"email","providers":["email"]}',
        '{}',
        'authenticated',
        'authenticated'
      );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = user2_id) THEN
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      aud,
      role
    ) VALUES
      (
        user2_id,
        '00000000-0000-0000-0000-000000000000',
        'customer2@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        now() - interval '25 days',
        now(),
        '{"provider":"email","providers":["email"]}',
        '{}',
        'authenticated',
        'authenticated'
      );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = user3_id) THEN
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      aud,
      role
    ) VALUES
      (
        user3_id,
        '00000000-0000-0000-0000-000000000000',
        'customer3@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        now() - interval '20 days',
        now(),
        '{"provider":"email","providers":["email"]}',
        '{}',
        'authenticated',
        'authenticated'
      );
  END IF;

  -- Insert public.users if they don't exist
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = user1_id) THEN
    INSERT INTO public.users (id, email, is_admin, created_at)
    VALUES
      (user1_id, 'customer1@example.com', false, now() - interval '30 days'),
      (user2_id, 'customer2@example.com', false, now() - interval '25 days'),
      (user3_id, 'customer3@example.com', false, now() - interval '20 days');
  END IF;
END $$;

-- Create a test campaign if none exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM campaigns WHERE is_active = true) THEN
    INSERT INTO campaigns (name, start_date, end_date, is_active)
    VALUES ('Campagne Test', now(), now() + interval '30 days', true);
  END IF;
END $$;

-- Create some test products if none exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM products LIMIT 1) THEN
    INSERT INTO products (name, description, price, shipping_cost, category, sizes, colors, images)
    VALUES
      (
        'T-shirt Premium',
        'T-shirt en coton de haute qualité',
        15000,
        2500,
        'vetements',
        ARRAY['S', 'M', 'L', 'XL'],
        ARRAY['Noir', 'Blanc', 'Bleu'],
        ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500']
      ),
      (
        'Sneakers Urban',
        'Sneakers confortables et stylées',
        45000,
        5000,
        'chaussures',
        ARRAY['38', '39', '40', '41', '42'],
        ARRAY['Noir', 'Blanc'],
        ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500']
      );

    -- Link products to active campaign
    INSERT INTO campaign_products (campaign_id, product_id, is_active)
    SELECT 
      c.id,
      p.id,
      true
    FROM campaigns c
    CROSS JOIN products p
    WHERE c.is_active = true;
  END IF;
END $$;

-- Insert dummy orders if none exist
DO $$
DECLARE
  user1_id uuid := '11111111-1111-1111-1111-111111111111';
  user2_id uuid := '22222222-2222-2222-2222-222222222222';
  user3_id uuid := '33333333-3333-3333-3333-333333333333';
BEGIN
  IF NOT EXISTS (SELECT 1 FROM orders LIMIT 1) THEN
    INSERT INTO orders (
      id, user_id, status, total_amount, is_paid, 
      payment_method, shipping_info, campaign_id,
      created_at
    )
    SELECT
      gen_random_uuid(),
      user_id,
      status,
      total_amount,
      is_paid,
      payment_method,
      shipping_info,
      (SELECT id FROM campaigns WHERE is_active = true ORDER BY start_date DESC LIMIT 1),
      created_at
    FROM (
      VALUES
        (
          user1_id,
          'livré',
          75000,
          true,
          'card',
          '{"full_name": "Amadou Diallo", "phone": "+221777777777", "address": "123 Rue Félix Faure", "city": "Dakar", "additional_info": "Près du marché Sandaga"}',
          now() - interval '15 days'
        ),
        (
          user2_id,
          'en_transit',
          125000,
          true,
          'orange_money',
          '{"full_name": "Fatou Sow", "phone": "+221766666666", "address": "45 Avenue Lamine Gueye", "city": "Dakar", "additional_info": ""}',
          now() - interval '10 days'
        ),
        (
          user3_id,
          'en_preparation',
          95000,
          true,
          'wave',
          '{"full_name": "Moussa Ndiaye", "phone": "+221755555555", "address": "78 Boulevard de la République", "city": "Saint-Louis", "additional_info": "Quartier Sud"}',
          now() - interval '5 days'
        ),
        (
          user1_id,
          'validé',
          150000,
          false,
          'card',
          '{"full_name": "Amadou Diallo", "phone": "+221777777777", "address": "123 Rue Félix Faure", "city": "Dakar", "additional_info": "Près du marché Sandaga"}',
          now() - interval '2 days'
        )
    ) AS v(user_id, status, total_amount, is_paid, payment_method, shipping_info, created_at);

    -- Insert order items for new orders
    INSERT INTO order_items (
      order_id,
      product_id,
      quantity,
      price,
      size,
      color
    )
    SELECT
      o.id,
      p.id,
      FLOOR(RANDOM() * 2) + 1,
      p.price,
      p.sizes[1],
      p.colors[1]
    FROM orders o
    CROSS JOIN LATERAL (
      SELECT id, price, sizes[1], colors[1]
      FROM products
      ORDER BY RANDOM()
      LIMIT 1
    ) p;

    -- Insert order history entries for new orders
    INSERT INTO order_history (
      order_id,
      status,
      created_at,
      created_by
    )
    SELECT
      id as order_id,
      status,
      created_at,
      user_id as created_by
    FROM orders;
  END IF;
END $$;