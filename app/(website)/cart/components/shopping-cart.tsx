"use client";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";
import CartHeader from "./cart-header";
import { CartResponse, } from "@/types/cart";
import OrderSummary from "./order-summary";
import CartItemsList from "./cart-items-list";
import useFetchData from "@/hooks/use-fetch";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import SectionHeader from "@/components/common/header/section-header";
import { deleteAllFromCart, deleteFromCart } from "@/lib/api/cart/cart-apis";
import { clearCartCount, clearVoucherData, decreaseCartCount, deleteAllCartItem, deleteCartItem, setCartItems, } from "@/redux/features/cart-slice";
import { AlertCircle } from "lucide-react";


export default function ShoppingCart() {

  const shippingFee = 150;
  const dispatch = useAppDispatch();
  const { data, refetch, loading, error } = useFetchData<CartResponse>('carts/', true);
  const CartItems = data?.results;
  const { cartItem, voucherData } = useAppSelector(state => state.cart);
  const totalQuantity = cartItem.length;

  const cartItemsData = useMemo(() => {
    if (!CartItems) return [];
    return CartItems.map(item => ({
      id: item.id,
      price: item.product.price,
      quantity: item.quantity,
      discount_percentage: item.product.discount_percentage,
      tax_applied: item.product.tax_applied,
      image: item.product.images?.[0].file,
      name: item.product.name,
    }));
  }, [CartItems]);



  useEffect(() => {
    if (!cartItemsData || cartItemsData.length === 0) return;
    dispatch(setCartItems(cartItemsData))

  }, [cartItemsData, dispatch]);

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
        <div className='flex items-center justify-center w-full h-60'>
          <p className='font-extralight text-sm text-gray-400'>
            Loading Cart Items...
          </p>
        </div>
      ) : error ? (
        <div className='flex flex-col items-center justify-center w-full h-60'>
          <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
          <p className='font-extralight text-sm text-gray-400'>
            Oops! Something went wrong...
          </p>
        </div>
      ) : CartItems?.length === 0 ? (
       <div className='flex flex-col items-center justify-center w-full h-60'>
                   <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
                   <p className='font-extralight text-sm text-gray-400 capitalize'>
                     Oops! no Products in cart right now...
                   </p>
                 </div>
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
