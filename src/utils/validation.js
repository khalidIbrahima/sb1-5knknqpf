/**
 * Validates product data before save/update
 */
export const validateProductData = (data) => {
  if (!data) {
    throw new Error('Données du produit invalides');
  }

  // Required fields
  if (!data.name?.trim()) {
    throw new Error('Le nom du produit est requis');
  }

  if (!data.price || Number(data.price) <= 0) {
    throw new Error('Le prix doit être supérieur à 0');
  }

  // Validate shipping methods
  if (!data.sea_shipping_available && !data.air_shipping_available) {
    throw new Error('Au moins une option de livraison doit être activée');
  }

  // Validate shipping costs
  if (data.sea_shipping_available && (!data.sea_shipping_cost || Number(data.sea_shipping_cost) < 0)) {
    throw new Error('Le coût de livraison maritime doit être défini');
  }

  if (data.air_shipping_available && (!data.air_shipping_cost || Number(data.air_shipping_cost) < 0)) {
    throw new Error('Le coût de livraison aérien doit être défini');
  }

  // Validate market price if provided
  if (data.market_price) {
    const price = Number(data.price);
    const marketPrice = Number(data.market_price);
    
    if (marketPrice <= price) {
      throw new Error('Le prix du marché doit être supérieur au prix de vente');
    }
  }

  return true;
};

/**
 * Validates that a product has at least one shipping method enabled
 */
export const validateProductShipping = (product) => {
  if (!product) return false;
  return product.sea_shipping_available || product.air_shipping_available;
};

/**
 * Validates that a product can be added to a campaign
 */
export const validateProductForCampaign = (product) => {
  if (!product) {
    throw new Error('Produit invalide');
  }
  
  // Check if at least one shipping method is available
  if (!validateProductShipping(product)) {
    throw new Error('Le produit doit avoir au moins une option de livraison activée');
  }

  // Validate price
  if (!product.price || Number(product.price) <= 0) {
    throw new Error('Le prix du produit doit être supérieur à 0');
  }

  return true;
};