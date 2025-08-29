"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CartItemCardProps } from "@/types/cart";
import { Checkbox } from "@/components/ui/checkbox";
import { updateCart } from "@/lib/api/cart/cart-apis";
import PriceRow from "@/components/common/product/price-row";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearVoucherData, toggleCartItem, updateCartItemQuantity } from "@/redux/features/cart-slice";
import QuantityRow from "@/components/common/product/quantity-row";
import { calculateDiscountedPrice } from "@/lib/cart-utils";

export default function CartItemCard({ item, onRemove, refetch }: CartItemCardProps) {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const Variants = item.product_variant?.product_variants;
  const { cartItem } = useAppSelector(state => state.cart);
  const { profileDetails } = useAppSelector(state => state.authentication);
  const quantity = item.quantity;


  const handleUpdate = async (type: string) => {
    if (loading) return;
    setLoading(true);

    try {
      if (type === "decrement" && quantity === 1) {
        onRemove(item.id);
        return;
      }

      const newQuantity = type === "increment" ? quantity + 1 : quantity - 1;

      dispatch(updateCartItemQuantity({
        id: item.id,
        quantity: newQuantity
      }));

      await updateCart(profileDetails.id, item.product.slug_name, newQuantity, item.id);
      refetch()

    } catch (error) {
      dispatch(updateCartItemQuantity({
        id: item.id,
        quantity: quantity
      }));
      console.error("Failed to update cart quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  const onCheckboxChange = () => {
    dispatch(toggleCartItem({
      id: item.id,
      quantity: item.quantity,
      price: (parseFloat(calculateDiscountedPrice(item.product.price, item.product.discount_percentage))).toString(),
      discount_percentage: item.product.discount_percentage,
      tax_applied: item.product.tax_applied
    }));
    dispatch(clearVoucherData())
  }

  return (
    <div className="relative flex flex-col p-2 bg-white border-b rounded-lg md:p-4">
      <div className="flex justify-end w-full mb-2">
        <Button
          variant="ghost"
          className="w-8 h-8 p-0 text-black top-2 hover:text-red-700"
          onClick={() => onRemove(item.id)}
          aria-label="Remove item"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex flex-row items-start gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <Checkbox
            className="w-4 h-4 mt-1 bg-white border-gray-300 md:w-5 md:h-5 "
            checked={cartItem.some(cartItem => cartItem.id === item.id)}
            onCheckedChange={onCheckboxChange}
          />
          <div className="relative w-[80px] h-[80px] md:w-[110px] md:h-[110px] rounded-lg overflow-hidden border border-gray-100 shadow-sm">
            <Image
              src={item.product.images[0].file || "/placeholder.svg"}
              alt={item.product.name}
              fill
              className="object-cover"
            />
            {
              item.product.discount_percentage &&
              <div className="absolute bottom-1 right-1 bg-secondary text-white text-[10px] md:text-xs px-1 md:px-2 py-1 rounded-full">
                {parseFloat(item.product.discount_percentage)}% Off
              </div>
            }
          </div>
        </div>

        <div className="flex flex-col flex-1 w-full gap-3">
          <div className="grid w-full grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {
              Variants?.map((item) => (
                <Badge key={item.id} variant="outline" className="w-full py-1 border-gray-200 rounded-xs bg-gray-50 md:py-2">
                  {item.attribute.name.toUpperCase()}: {item.attribute_variant.name.toUpperCase()}
                </Badge>
              ))
            }
          </div>

          <div className="">
            <h3 className="mb-1 text-base font-semibold font-playfair text-gray-900 lg:text-2xl">
              {item.product.name}
            </h3>
            <p dangerouslySetInnerHTML={{ __html: item.product.general_description }} className="text-sm leading-snug text-gray-600 line-clamp-2">
            </p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <div className="w-full">
              <PriceRow
                discountTag={item.product.discount_percentage}
                previousPrice={item.product.discount_percentage ? item.product.price : undefined}
                price={calculateDiscountedPrice(item.product.price, item.product.discount_percentage) || item.product.price}
                discountClassName="text-[12px]  md:text-sm"
              />
            </div>
            <div className="flex justify-end w-full">
              <QuantityRow
                loading={loading}
                onDecrease={() => handleUpdate('decrement')}
                value={quantity}
                onIncrease={() => handleUpdate('increment')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}