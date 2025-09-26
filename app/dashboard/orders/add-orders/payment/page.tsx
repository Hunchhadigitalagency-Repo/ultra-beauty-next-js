"use client";
import React, { useState } from "react";
import SectionHeader from "@/components/common/header/section-header";
import { addOrderByAdmin,  } from "@/lib/api/order/order-apis";
import { toast } from "sonner";
import { calculateSubtotal, calculateTaxAmount, calculateTotalItems } from "@/lib/cart-utils";
// import { CartItem } from "@/types/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import COD from '@/assets/Cashondelivery.png';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { resetCheckout } from "@/redux/features/checkout-slice";
import OrderSummary from "../components/order-summery-dashboard";

const Payment = () => {

    const { voucher, shippingInfo, productItems } = useAppSelector(state => state.checkouts)
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const hasVoucher = Boolean(voucher); 
    const discount = 0;
    const shippingFee = 100; 

    const selectedItems = productItems.filter((item: any) => item.selected);
    const totalItems = calculateTotalItems(selectedItems);
    const subtotal = calculateSubtotal(selectedItems);
    const taxAmount = calculateTaxAmount(selectedItems);

    const voucherDiscount = hasVoucher ? (discount / 100) * subtotal : 0;
    const total = subtotal + taxAmount + shippingFee - voucherDiscount;

    const handlePlaceOrder = async () => {
        try {
            if (!productItems.length || !shippingInfo) {
                toast.error("Missing cart items or shipping info");
                return;
            }

            setLoading(true);

            const items = productItems.map((item: any) => ({
                slug_name: item.slug,
                variantId: item.attribute?.[0]?.id ? Number(item.attribute?.[0]?.id) : undefined,
                quantity: item.quantity,
            }));

            const payload = {
                payment_method: "cod", 
                shipping_fee: shippingFee, 
                shipping_info: shippingInfo,
                items,
                coupon: voucher ? { code: voucher.coupon.code } : undefined,
            };

            // Call your admin API
            const response = await addOrderByAdmin(payload);

            toast.success("Order placed successfully by Admin!");
            console.log("Created order:", response.data);
            dispatch(resetCheckout())
            router.push('/dashboard/orders')
        } catch (error: any) {
            console.log(error);

            toast.error(error?.response?.data?.detail || "Order failed!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="px-6 lg:px-14 py-8 flex flex-col gap-5 lg:gap-10 bg-white">
            <SectionHeader
                title="Payment"
                description="Purchase the item from here"
            />

            <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_0.3fr] gap-10">
                <div className="grid grid-cols-1 lg:grid-cols-[0.3fr_0.7fr] gap-6 items-start h-40">
                    {/* Left side - COD option */}
                    <div className="border border-[#7C7C7C] h-full rounded-md flex flex-col items-center p-4 gap-3">
                        <div className="w-30 h-30 relative">
                            <Image
                                src={COD}
                                layout="fill"
                                alt="COD"
                                className="object-contain"
                            />
                        </div>
                        <p className="font-medium text-base">Cash on Delivery</p>
                    </div>

                    {/* Right side - Confirm Order */}
                    <div className="border border-[#7C7C7C] rounded-md p-6 flex flex-col gap-4 h-full">
                        <h2 className="font-medium text-[#1477B4] text-lg">Confirm Order</h2>
                        <ol className="list-decimal pl-4 text-sm md:text-base font-medium text-gray-700">
                            <li>Here will be some information regarding the payment.</li>
                            <li>Here will be another information regarding the payment.</li>
                            <li>Here will be other info.</li>
                        </ol>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={loading}
                            className="bg-[#FF9900] hover:bg-[#e68900] transition text-white font-medium py-2 rounded-md text-sm md:text-base mt-3"
                        >
                            {loading ? "Placing Order..." : "Confirm Order"}
                        </button>
                    </div>
                </div>


                {/* Order summary */}
                <OrderSummary
                    location={""}
                    shippingData={shippingInfo as any}
                    totalItems={totalItems}
                    subtotal={subtotal}
                    discount={voucherDiscount}
                    shippingFee={shippingFee}
                    taxAmount={taxAmount}
                    total={total}
                    isVoucherApplied={hasVoucher}
                    // products={productItems.map((item) => ({
                    //     id: item.id,
                    //     name: item.name,
                    //     quantity: item.quantity,
                    //     price: item.currentPrice,
                    //     total: item.currentPrice * item.quantity,
                    // }))}
                />
            </div>
        </section>
    );
};

export default Payment;
