-- Function to end campaign and deactivate its products
CREATE OR REPLACE FUNCTION end_campaign(campaign_uuid uuid)
RETURNS void AS $$
BEGIN
  -- Update campaign status
  UPDATE campaigns
  SET is_active = false
  WHERE id = campaign_uuid;

  -- Deactivate all products in the campaign
  UPDATE campaign_products
  SET is_active = false
  WHERE campaign_id = campaign_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to automatically end expired campaigns
CREATE OR REPLACE FUNCTION auto_end_expired_campaigns()
RETURNS trigger AS $$
BEGIN
  -- End campaigns that have reached their end date
  UPDATE campaigns
  SET is_active = false
  WHERE id = NEW.id 
    AND is_active = true 
    AND end_date <= CURRENT_TIMESTAMP;

  -- Deactivate products for ended campaigns
  UPDATE campaign_products
  SET is_active = false
  WHERE campaign_id = NEW.id 
    AND is_active = true
    AND EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = campaign_products.campaign_id
      AND campaigns.is_active = false
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-ending campaigns
DROP TRIGGER IF EXISTS check_campaign_end_date ON campaigns;
CREATE TRIGGER check_campaign_end_date
  AFTER INSERT OR UPDATE OF end_date
  ON campaigns
  FOR EACH ROW
  EXECUTE FUNCTION auto_end_expired_campaigns();

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION end_campaign TO authenticated;