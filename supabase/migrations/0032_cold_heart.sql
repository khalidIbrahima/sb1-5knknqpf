/*
  # Link orders to campaign C2

  This migration updates existing orders to link them with campaign C2 if they fall within
  the campaign's date range and don't already have a campaign assigned.
*/

DO $$
DECLARE
  target_campaign_id uuid;
BEGIN
  -- Get the campaign ID for C2
  SELECT id INTO target_campaign_id
  FROM campaigns
  WHERE name = 'C2'
  LIMIT 1;

  -- If campaign exists, update orders
  IF target_campaign_id IS NOT NULL THEN
    -- Update orders without campaign_id to link them to C2
    UPDATE orders
    SET campaign_id = target_campaign_id
    WHERE campaign_id IS NULL
    AND created_at >= (
      SELECT start_date 
      FROM campaigns 
      WHERE id = target_campaign_id
    )
    AND created_at <= (
      SELECT end_date 
      FROM campaigns 
      WHERE id = target_campaign_id
    );
  END IF;
END $$;