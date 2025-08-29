"use client";
import { toast } from "sonner";
import { useEffect } from "react";
import CartHeader from "./cart-header";
import { CartResponse, } from "@/types/cart";
import OrderSummary from "./order-summary";
import CartItemsList from "./cart-items-list";
import useFetchData from "@/hooks/use-fetch";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import SectionHeader from "@/components/common/header/section-header";
import { deleteAllFromCart, deleteFromCart } from "@/lib/api/cart/cart-apis";
import { clearCartCount, clearVoucherData, decreaseCartCount, deleteAllCartItem, deleteCartItem } from "@/redux/features/cart-slice";


export default function ShoppingCart() {

  const shippingFee = 150;
  const dispatch = useAppDispatch();
  const { data, refetch, loading, error } = useFetchData<CartResponse>('carts', true);
  const CartItems = data?.results;
  const { cartItem, voucherData } = useAppSelector(state => state.cart);
  const totalQuantity = cartItem.length;


  const cartItemsData = CartItems?.map(item => ({
    id: item.id,
    price: item.product.price,
    quantity: item.quantity,
    discount_percentage: item.product.discount_percentage,
    tax_applied: item.product.tax_applied,
  })) ?? [];

  useEffect(() => {
    dispatch(clearVoucherData())
  }, [voucherData, dispatch]);

  const handleSingleCartItemRemove = (id: number) => {
    try {
      deleteFromCart(id);
      refetch();
      dispatch(deleteCartItem(id))
      dispatch(decreaseCartCount())
      toast.success('Item Removed from the Cart')
    } catch (error) {
      toast.error(`Error while removing Item from the cart: ${error}`)
    }
  }

  const handleMultipleCartItemRemove = (id: number[]) => {
    try {
      deleteAllFromCart(id);
      dispatch(deleteAllCartItem())
      dispatch(clearCartCount())
      refetch();
      toast.success('All Item Removed from the Cart')
    } catch (error) {
      toast.error(`Error while removing All Item from the cart: ${error}`)
    }
  }


  return (
    <section className="space-y-4 padding">
      <SectionHeader
        title="Cart"
        description="All the items are ready for checkout"
      />
      {loading ? (
        <p className="text-sm text-center text-muted-foreground">
          Loading Cart Items...
        </p>
      ) : error ? (
        <p className="text-sm font-medium text-center text-red-500">
          Something Went Wrong While Fetching Cart Items
        </p>
      ) : CartItems?.length === 0 ? (
        <p className="text-sm text-center text-muted-foreground">
          No Cart Items found
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
          {/* Cart Items */}
          <div className="order-1 space-y-4 lg:col-span-5">
            <CartHeader
              cartItemsData={cartItemsData}
              onItemRemove={handleSingleCartItemRemove}
              onRemoveMultiple={handleMultipleCartItemRemove}
              cartItemIds={CartItems?.map(item => item.id)}
            />
            {
              CartItems &&
              <CartItemsList
                refetch={refetch}
                onRemove={handleSingleCartItemRemove}
                items={CartItems}

              />
            }
          </div>
          {/* Sidebar */}
          <div className="order-2 space-y-6 lg:col-span-2">
            <OrderSummary
              shippingDetails={null}
              totalItems={totalQuantity}
              shippingFee={shippingFee}
            />
          </div>
        </div>
      )
      }
    </section>
  );
}
