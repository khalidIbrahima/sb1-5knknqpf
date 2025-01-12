-- Add categories if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'vetements') THEN
    INSERT INTO categories (name, slug) VALUES
      ('Vêtements', 'vetements'),
      ('Chaussures', 'chaussures'),
      ('Accessoires', 'accessoires'),
      ('Sport', 'sport'),
      ('Beauté', 'beaute');
  END IF;
END $$;

-- Add new products if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'Robe d''été') THEN
    INSERT INTO products (
      name, description, price, shipping_cost, 
      category, sizes, colors, images
    ) VALUES
      (
        'Robe d''été',
        'Robe légère et élégante parfaite pour l''été',
        25000,
        3000,
        'vetements',
        ARRAY['S', 'M', 'L'],
        ARRAY['Blanc', 'Bleu ciel', 'Rose'],
        ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500']
      ),
      (
        'Sac à main luxe',
        'Sac à main en cuir véritable, finition premium',
        55000,
        4000,
        'accessoires',
        NULL,
        ARRAY['Noir', 'Marron', 'Beige'],
        ARRAY['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500']
      ),
      (
        'Ensemble sport',
        'Ensemble sportswear confortable et tendance',
        35000,
        3500,
        'sport',
        ARRAY['S', 'M', 'L', 'XL'],
        ARRAY['Gris', 'Noir', 'Bleu marine'],
        ARRAY['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500']
      ),
      (
        'Montre classique',
        'Montre élégante avec bracelet en cuir',
        75000,
        2000,
        'accessoires',
        NULL,
        ARRAY['Noir', 'Marron'],
        ARRAY['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500']
      ),
      (
        'Baskets performance',
        'Chaussures de sport haute performance',
        65000,
        5000,
        'sport',
        ARRAY['38', '39', '40', '41', '42', '43', '44'],
        ARRAY['Noir/Rouge', 'Blanc/Bleu', 'Gris/Vert'],
        ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500']
      ),
      (
        'Parfum Élégance',
        'Parfum raffiné aux notes boisées',
        45000,
        2000,
        'beaute',
        NULL,
        NULL,
        ARRAY['https://images.unsplash.com/photo-1541643600914-78b084683601?w=500']
      );

    -- Link new products to active campaign
    INSERT INTO campaign_products (campaign_id, product_id, is_active)
    SELECT 
      c.id,
      p.id,
      true
    FROM campaigns c
    CROSS JOIN (
      SELECT id FROM products 
      WHERE name IN (
        'Robe d''été',
        'Sac à main luxe',
        'Ensemble sport',
        'Montre classique',
        'Baskets performance',
        'Parfum Élégance'
      )
    ) p
    WHERE c.is_active = true;
  END IF;
END $$;