"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import QuantityRow from "@/components/common/product/quantity-row";
import PriceRow from "@/components/common/product/price-row";

import { CartItemCardProps } from "@/types/cart";
import { updateCart } from "@/lib/api/cart/cart-apis";
import { calculateDiscountedPrice } from "@/lib/cart-utils";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearVoucherData,
  toggleCartItem,
  updateCartItemQuantity,
  updateSelectedCartItem,
} from "@/redux/features/cart-slice";

import useDebounce from "@/hooks/use-debounce";

export default function CartItemCard({ item, onRemove }: CartItemCardProps) {
  const dispatch = useAppDispatch();

  const { cartItem } = useAppSelector((state) => state.cart);
  const { profileDetails } = useAppSelector((state) => state.authentication);

  const quantity = item.quantity;

  const [localQuantity, setLocalQuantity] = useState(quantity);

  const debouncedQuantity = useDebounce(localQuantity, 600);

  const Variants = item.product_variant?.product_variants;

  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  useEffect(() => {
    if (debouncedQuantity === quantity) return;

    updateCart(
      profileDetails.id,
      item.product.slug_name,
      debouncedQuantity,
      item.id
    ).catch(() => {
      dispatch(
        updateCartItemQuantity({
          id: item.id,
          quantity,
        })
      );
    });
  }, [debouncedQuantity]);

  const handleUpdate = (type: "increment" | "decrement") => {
    if (type === "decrement" && localQuantity === 1) {
      onRemove(item.id);
      return;
    }
    const availableStock = item.product_variant.item_quantity || item.quantity;

    if (type === "increment" && localQuantity >= availableStock) {
      console.log("Cannot exceed available stock");
      return;
    }
    const newQuantity =
      type === "increment" ? localQuantity + 1 : localQuantity - 1;

    setLocalQuantity(newQuantity);

    const discountedPrice = Number(
      calculateDiscountedPrice(
        item.product.price,
        item.product.discount_percentage,
        item.product.flash_sale_discount,
        item.is_flash_sale
      )
    );

    dispatch(
      updateCartItemQuantity({
        id: item.id,
        quantity: newQuantity,
      })
    );

    if (cartItem.some((ci) => ci.id === item.id)) {
      dispatch(
        updateSelectedCartItem({
          id: item.id,
          quantity: newQuantity,
          price: item.product.price,
        })
      );
    }
  };

  const onCheckboxChange = () => {
    const discountedPrice = Number(
      calculateDiscountedPrice(
        item.product.price,
        item.product.discount_percentage,
        item.product.flash_sale_discount,
        item.product.is_flash_sale
      )
    );

    dispatch(
      toggleCartItem({
        id: item.id,
        quantity: item.quantity,
        name: item.product.name,
        is_flash_sale: item.product.is_flash_sale,
        flash_sale_discount: item.product.flash_sale_discount,
        image: item.product.images?.[0].file,
        price: item.product.price,
        discount_percentage: item.product.discount_percentage,
        tax_applied: item.product.tax_applied,
      })
    );

    dispatch(clearVoucherData());
  };

  return (
    <div className="relative flex flex-col p-2 bg-white border-b rounded-lg md:p-4">
      <div className="flex justify-end w-full mb-2">
        <Button
          variant="ghost"
          className="w-8 h-8 p-0 text-black hover:text-red-700"
          onClick={() => onRemove(item.id)}
          aria-label="Remove item"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row">
        <div className="flex items-center gap-3 shrink-0">
          <Checkbox
            checked={cartItem.some((ci) => ci.id === item.id)}
            onCheckedChange={onCheckboxChange}
          />

          <Link
            href={`shop/${item.product.slug_name}`}
            className="relative w-[110px] h-[110px] rounded-lg overflow-hidden border"
          >
            <Image
              src={item.product.images?.[0].file || "/placeholder.svg"}
              alt={item.product.name}
              fill
              className="object-cover"
            />
          </Link>
        </div>

        <div className="flex flex-col flex-1 gap-3">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {Variants?.map((variant) => (
              <Badge key={variant.id} variant="outline" className="bg-gray-50">
                {variant.attribute.name.toUpperCase()} :{" "}
                {variant.attribute_variant.name.toUpperCase()}
              </Badge>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold">{item.product.name}</h3>
            <p
              className="text-sm text-gray-600 line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: item.product.general_description,
              }}
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <PriceRow
              discountTag={
                item.product.is_flash_sale
                  ? item.product.flash_sale_discount
                  : item.product.discount_percentage
              }
              previousPrice={
                item.product.discount_percentage
                  ? item.product.price
                  : undefined
              }
              price={
                calculateDiscountedPrice(
                  item.product.price,
                  item.product.discount_percentage,
                  item.product.flash_sale_discount,
                  item.product.is_flash_sale
                ) || item.product.price
              }
            />

            <QuantityRow
              value={localQuantity}
              loading={false}
              onDecrease={() => handleUpdate("decrement")}
              onIncrease={() => handleUpdate("increment")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
