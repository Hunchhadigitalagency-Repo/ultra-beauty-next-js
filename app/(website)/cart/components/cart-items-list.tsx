import { CartItem } from "@/types/cart";
import CartItemCard from "./cart-item-card";

interface CartItemsListProps {
  items: CartItem[]
  onItemUpdate: (id: string, updates: Partial<CartItem>) => void
  onItemRemove: (id: string) => void
  formatPrice: (price: number) => string
}

export default function CartItemsList({ items, onItemUpdate, onItemRemove, formatPrice }: CartItemsListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItemCard
          key={item.id}
          item={item}
          onUpdate={(updates) => onItemUpdate(item.id, updates)}
          onRemove={() => onItemRemove(item.id)}
          formatPrice={formatPrice}
        />
      ))}
    </div>
  )
}
