export const formatPrice = (price = 0) => {
  const safePrice = Number(price) || 0;
  return `${safePrice.toLocaleString()} FCFA`;
};

export const formatPhoneNumber = (phone = '') => {
  if (!phone) return '';
  return phone.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
};