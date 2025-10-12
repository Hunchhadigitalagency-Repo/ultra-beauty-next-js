"use client";
import React, { useState } from "react";
import SectionHeader from "@/components/common/header/section-header";
import { addOrderByAdmin } from "@/lib/api/order/order-apis";
import { toast } from "sonner";
import { calculateSubtotal, calculateTaxAmount, calculateTotalItems } from "@/lib/cart-utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import COD from '@/assets/Cashondelivery.png';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { resetCheckout } from "@/redux/features/checkout-slice";
import OrderSummary from "../components/order-summery-dashboard";

const Payment = () => {
    const { voucher, shippingInfo, productItems } = useAppSelector(state => state.checkouts);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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

           await addOrderByAdmin(payload);

            toast.success("Order placed successfully by Admin!");
            dispatch(resetCheckout());
            router.push('/dashboard/orders');
        } catch (error: any) {
            toast.error(error?.response?.data?.detail || "Order failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="px-6 lg:px-14 py-8 flex flex-col gap-8 bg-gray-50 min-h-screen">
            <SectionHeader
                title="Payment"
                description="Review your order and complete the purchase."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* COD Option */}
                    <div className="border rounded-lg p-5 flex flex-col max-h-[200px] items-center gap-4 bg-white shadow-sm hover:shadow-md transition">
                        <div className="w-24 h-24 relative">
                            <Image src={COD} alt="Cash on Delivery" fill className="object-contain" />
                        </div>
                        <p className="text-base font-medium text-gray-800">Cash on Delivery</p>
                        <span className="text-sm text-gray-500 text-center">Pay with cash when your order is delivered.</span>
                    </div>

                    {/* Confirm Order */}
                    <div className="border rounded-lg p-6 flex flex-col gap-4 bg-white shadow-sm hover:shadow-md h-fit transition     ">
                        <h2 className="text-lg font-semibold text-primary">Confirm Order</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 text-sm md:text-base">
                            <li>Ensure your shipping information is correct.</li>
                            <li>Review your cart items and quantities.</li>
                            <li>Confirm payment method as Cash on Delivery.</li>
                        </ol>
                        <button
                            onClick={handlePlaceOrder}
                            disabled={loading}
                            className="mt-4 bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Placing Order..." : "Confirm Order"}
                        </button>
                    </div>
                </div>

                {/* Order Summary */}
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
                    products={productItems.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        quantity: item.quantity,
                        price: item.currentPrice,
                        total: item.currentPrice * item.quantity,
                    }))}
                />
            </div>
        </section>
    );
};

export default Payment;
