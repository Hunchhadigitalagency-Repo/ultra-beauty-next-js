import CartItemCard from "./cart-item-card";
import { CartResultType } from "@/types/cart";

interface CartItemsListProps {
  items: CartResultType[]
  onRemove: (id: number) => void
  refetch: () => void
}

export default function CartItemsList({ items, onRemove, refetch }: CartItemsListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItemCard
          refetch={refetch}
          onRemove={onRemove}
          key={item.id}
          item={item}
        />
      ))}
    </div>
  )
}
