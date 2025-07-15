import { CartItem } from "@/types/cart"

export const formatPrice = (price: number): string => {
  return `Nrs. ${price.toLocaleString()}`
}

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0)
}

export const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}
