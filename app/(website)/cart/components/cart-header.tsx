"use client"

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CartItem } from "@/types/cart";
import { toggleAllCartItems } from "@/redux/features/cart-slice";

interface CartHeaderProps {
  cartItemIds: number[] | undefined;
  onItemRemove: (id: number) => void;
  onRemoveMultiple: (id: number[]) => void;
  cartItemsData: CartItem[]
}

export default function CartHeader({ cartItemIds, onItemRemove, cartItemsData, onRemoveMultiple }: CartHeaderProps) {
  const dispatch = useAppDispatch();
  const { cartItem } = useAppSelector(state => state.cart);

  const allSelected = cartItemIds?.every(id =>
    cartItem.some(item => item.id === id)
  );

  const handleDelete = (ids: number[]) => { if (ids.length === 1) { onItemRemove(ids[0]); } else { onRemoveMultiple(ids); } }

  const handleToggleAll = () => {
    dispatch(toggleAllCartItems(cartItemsData))
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-secondary  text-custom-black">
      <div className="flex items-center gap-2">
        <Checkbox className="w-6 h-6 bg-white border-custom-black"
          checked={allSelected}
          onClick={() => handleToggleAll}
        />
        <span className="text-sm font-medium">Select All
          ({cartItemsData.length})
        </span>
      </div>
      {cartItem.length >= 1 &&
        <Button variant="ghost" size="sm"
          onClick={() => handleDelete(cartItem.map(item => item.id))}
          className="text-red-600 hover:text-red-700">
          <X className="w-4 h-4 mr-1" />
          Delete
          {cartItem.length === cartItemIds?.length ? ` All (${cartItem.length})` : `(${cartItem.length})`}
        </Button>
      }
    </div>
  )
}
