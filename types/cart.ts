export interface CartItem {
  id: string
  name: string
  description: string
  image: string
  color: string
  size: string
  originalPrice: number
  currentPrice: number
  discount: number
  quantity: number
  selected: boolean
}


export interface CartItemCardProps {
  item: CartItem
  onUpdate: (updates: Partial<CartItem>) => void
  onRemove: () => void
  formatPrice: (price: number) => string
}


export interface LocationCardProps {
  location: string
}
