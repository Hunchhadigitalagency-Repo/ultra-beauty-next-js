"use client";

import {
  calculateSubtotal,
  calculateTotalItems,
  formatPrice,
} from "@/lib/cart-utils";
import { useState } from "react";
import CartHeader from "./cart-header";
import CartItemsList from "./cart-items-list";
import OrderSummary from "./order-summary";
import { CartItem, } from "@/types/cart";
import SectionHeader from "@/components/common/header/section-header";
import useFetchDataToken from "@/hooks/use-fetch-data-token";

export const defaultCartItems: CartItem[] = [
  {
    id: "1",
    name: "Sleek Pregnancy Cushion with some random text abd long text",
    description:
      "A product that will help the Pregnancy women to grow and some random text that fits",
    image:
      "https://img.freepik.com/premium-photo/pillow-mockup_1263326-58166.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
    color: "Blue",
    size: "XXL",
    originalPrice: 45000,
    currentPrice: 45000,
    discount: 20,
    quantity: 1,
    selected: true,
  },
  {
    id: "2",
    name: "Sleek Pregnancy Cushion with some random text abd long text",
    description:
      "A product that will help the Pregnancy women to grow and some random text that fits",
    image:
      "https://img.freepik.com/premium-photo/pillow-mockup_1263326-58166.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
    color: "Blue",
    size: "XXL",
    originalPrice: 45000,
    currentPrice: 45000,
    discount: 20,
    quantity: 1,
    selected: true,
  },
  {
    id: "3",
    name: "Sleek Pregnancy Cushion with some random text abd long text",
    description:
      "A product that will help the Pregnancy women to grow and some random text that fits",
    image:
      "https://img.freepik.com/premium-photo/pillow-mockup_1263326-58166.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
    color: "Blue",
    size: "XXL",
    originalPrice: 45000,
    currentPrice: 45000,
    discount: 20,
    quantity: 1,
    selected: true,
  },
];

interface CartProps {
  items?: CartItem[];
  shippingFee?: number;
  location?: string;
  onItemUpdate?: (id: string, updates: Partial<CartItem>) => void;
  onItemRemove?: (id: string) => void;
}

export default function ShoppingCart({
  items = defaultCartItems,
  shippingFee = 250,
  location = "Itahari, Sunsari, Nepal, ward 2, opposite of mahendra gate and some text",
  onItemUpdate,
  onItemRemove,
}: CartProps) {

  const { data } = useFetchDataToken('/carts/')

  const [cartItems, setCartItems] = useState<CartItem[]>(items);
  const [voucherCode, setVoucherCode] = useState("");

  console.log("this is the cart data", data)

  const handleItemUpdate = (id: string, updates: Partial<CartItem>) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    onItemUpdate?.(id, updates);
  };

  const handleItemRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    onItemRemove?.(id);
  };

  const handleSelectAll = (checked: boolean) => {
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, selected: checked }))
    );
  };

  const handleDeleteAll = () => {
    const selectedIds = cartItems
      .filter((item) => item.selected)
      .map((item) => item.id);
    setCartItems((prev) => prev.filter((item) => !item.selected));
    selectedIds.forEach((id) => onItemRemove?.(id));
  };

  const handleApplyVoucher = () => {
    console.log("Applying voucher:", voucherCode);
    // Implement voucher logic here
  };

  const selectedItems = cartItems.filter((item) => item.selected);
  const totalItems = calculateTotalItems(selectedItems);
  const subtotal = calculateSubtotal(selectedItems);
  const total = subtotal + shippingFee;
  const allSelected =
    cartItems.length > 0 && cartItems.every((item) => item.selected);

  return (
    <section className="padding space-y-4">
      <SectionHeader
        title="Bag"
        description="All the items are ready for checkout"
      />

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-5 space-y-4">
          <CartHeader
            totalItems={cartItems.length}
            selectedItems={selectedItems.length}
            allSelected={allSelected}
            onSelectAll={handleSelectAll}
            onDeleteAll={handleDeleteAll}
          />

          <CartItemsList
            items={cartItems}
            onItemUpdate={handleItemUpdate}
            onItemRemove={handleItemRemove}
            formatPrice={formatPrice}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          <OrderSummary
            location={location}
            totalItems={totalItems}
            subtotal={subtotal}
            shippingFee={shippingFee}
            total={total}
            voucherCode={voucherCode}
            onVoucherCodeChange={setVoucherCode}
            onApplyVoucher={handleApplyVoucher}
          />
        </div>
      </div>
    </section>
  );
}
