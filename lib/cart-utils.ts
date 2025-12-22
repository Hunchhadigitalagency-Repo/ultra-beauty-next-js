import { CartItems } from "@/types/cart";

export const formatPrice = (price: number): string => {
  return `Nrs. ${price.toLocaleString()}`;
};

export const calculateSubtotal = (items: CartItems[]): number => {
  return items.reduce(
    (sum, item) =>
      sum + parseFloat(item.price || item.currentPrice || "0") * item.quantity,
    0
  );
};

export const calculateTotalItems = (items: CartItems[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const calculateDiscountedPrice = (
  price: string | undefined,
  discountPercentage: string | undefined,
  flashSaleDiscount?: string | undefined,
  isFlash?: boolean
): string => {
  const parsedPrice = parseFloat(price ?? "0");
  const parsedDiscount = parseFloat(
    isFlash ? flashSaleDiscount ?? "0" : discountPercentage ?? "0"
  );
  
  const total = parsedPrice - (parsedPrice * parsedDiscount) / 100;
  return total.toString();
};

export const calculateTaxAmount = (items: any[]): number => {
  return items.reduce((sum, item) => {
    if (item.is_tax_applicable && item.tax_percent) {
      return sum + (item.currentPrice * item.quantity * item.tax_percent) / 100;
    }
    return sum;
  }, 0);
};
