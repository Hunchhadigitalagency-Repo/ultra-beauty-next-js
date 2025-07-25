"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, RefreshCcw } from "lucide-react";
import OrderSummary from "../../cart/components/order-summary";
import SectionHeader from "@/components/common/header/section-header";
import CheckoutProductCard from "../../checkout/components/checkout-product-card";
import CheckoutProductHeader from "../../checkout/components/checkout-product-header";

const CheckoutFilledPage: React.FunctionComponent = () => {
    return (
        <div className="p-4 ml-10">
            <div className="mb-6">
                <SectionHeader
                    title="Check Out"
                    description="Purchase the item from here"
                />
            </div>

            <div className="flex flex-col lg:flex-row gap-8 mb-8">
                <div className="flex flex-col gap-4">

                    <div className="w-full flex flex-col gap-4 justify-between lg:flex-1 rounded-md">
                        <div className="py-2 px-4 bg-[#EBEBEB] rounded-sm font-medium text-custom-black text-base">
                            <h2>Shipping details</h2>
                        </div>
                        <div className="flex flex-row items-start sm:items-center justify-between gap-3 bg-[#EDF8FF] p-4 rounded-md border border-[#1477B4]">
                            <div className="flex items-start gap-2 text-sm text-[#1477B4]">
                                <MapPin className="w-4 h-4 mt-1 text-blue-600" />
                                <span>
                                    Itahari, Sunsari, Nepal, ward 2, oppo - sit of mahendra gate and some text
                                </span>
                            </div>
                            <Button
                                variant="outline"
                                className="text-sm mt-2 sm:mt-0 whitespace-nowrap"
                            >
                                Add New Address
                                <RefreshCcw className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Button className="bg-[#1477B4] text-white rounded-[2px] w-full sm:w-auto">
                                Continue and Pay
                            </Button>
                        </div>

                    </div>

                    <div className="w-full lg:w-[350px] shrink-0 md:hidden">
                        <OrderSummary
                            location={"location"}
                            totalItems={5}
                            subtotal={590}
                            shippingFee={1500}
                            total={15000}
                            voucherCode={"voucherCode"}
                            onVoucherCodeChange={(code) => console.log(code)}
                            onApplyVoucher={() => console.log("Apply Voucher")}
                            isCheckout={true}
                        />
                    </div>

                    <div className="flex-1 space-y-2 mt-10">
                        <CheckoutProductHeader
                            selectedItem={1}
                            totalItems={5}
                            totalQuantity={2}
                        />
                        <CheckoutProductCard
                            item={{
                                id: 1,
                                name: "Sleek Pregnancy Cushion with some random text abd long text",
                                description:
                                    "Pregnancy Care / Pillow/ Name of the Project will go here and it can be long but with some long text",
                                image:
                                    "https://img.freepik.com/free-psd/view-sofa-interior-design-decor_23-2151772696.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
                                color: "Blue",
                                size: "XXL",
                                originalPrice: 45000,
                                currentPrice: 45000,
                                discount: 20,
                                quantity: 1,
                                selected: true,
                            }}
                        />
                        <CheckoutProductHeader
                            selectedItem={1}
                            totalItems={5}
                            totalQuantity={2}
                        />
                        <CheckoutProductCard
                            item={{
                                id: 1,
                                name: "Sleek Pregnancy Cushion with some random text abd long text",
                                description:
                                    "Pregnancy Care / Pillow/ Name of the Project will go here and it can be long but with some long text",
                                image:
                                    "https://img.freepik.com/free-psd/view-sofa-interior-design-decor_23-2151772696.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
                                color: "Blue",
                                size: "XXL",
                                originalPrice: 45000,
                                currentPrice: 45000,
                                discount: 20,
                                quantity: 1,
                                selected: true,
                            }}
                        />
                        <Link
                            href={"/shop"}
                            className="text-primary transition-all duration-300 ease-in-out flex justify-center gap-2 uppercase text-xl hover:text-sky-500"
                        >
                            <span className="font-bold">CONTINUE TO SHOP </span>
                            <ArrowRight />
                        </Link>
                    </div>
                </div>
                <div className="w-full lg:w-[350px] shrink-0 hidden md:block">
                    <OrderSummary
                        location={"location"}
                        totalItems={5}
                        subtotal={590}
                        shippingFee={1500}
                        total={15000}
                        voucherCode={"voucherCode"}
                        onVoucherCodeChange={(code) => console.log(code)}
                        onApplyVoucher={() => console.log("Apply Voucher")}
                        isCheckout={true}
                    />
                </div>
            </div>


        </div>
    );
};

export default CheckoutFilledPage;
