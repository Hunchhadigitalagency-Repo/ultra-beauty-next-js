import { CartItem } from "@/types/cart"

export const formatPrice = (price: number): string => {
  return `Nrs. ${price.toLocaleString()}`
}

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
}

export const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export const calculateDiscountedPrice = (price: string | undefined, discountPercentage: string | undefined): string => {
  const parsedPrice = parseFloat(price ?? "0")
  const parsedDiscount = parseFloat(discountPercentage ?? "0")
  const total = parsedPrice - (parsedPrice * parsedDiscount / 100)
  return total.toString()
}
