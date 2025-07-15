import React from "react";
import OrderProductDetails from "./Order-Details";

interface OrderProducts {
    quantity: number;
    name: string;
    price: number;
}

interface OrderHearderDetails {
    itemId: string;
    totalItems: number;
    status: string;
    orderItems:OrderProducts[];
}

const OrderHeader = ({
    itemId,
    totalItems,
    status,
    // orderItems,
}: OrderHearderDetails) => {
    return (
        <section>
            <div className="md:h-16 h-12 px-4 md:px-6 bg-gray-300 rounded-sm font-medium text-custom-black text-sm flex items-center justify-between">
                {/* Left side: Order Info */}
                <div className="flex flex-wrap gap-2 md:gap-6 text-xs md:text-sm">
                    <h4>#32424234234{itemId}</h4>
                    <h4>Total Items: {totalItems}</h4>
                </div>

                {/* Right side: Status */}
                <span className="text-white text-xs md:text-sm px-3 py-1.5 bg-[#1477B4] rounded-[3px] w-[80px] text-center">
                    {status}
                </span>
            </div>

            <OrderProductDetails
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
        </section>
    );
};

export default OrderHeader;
