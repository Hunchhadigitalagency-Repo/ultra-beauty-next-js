import React, { useState } from 'react';
import CustomTable from '@/components/common/table/custom-table';
import DeleteModal from '@/components/common/modals/delete-modal';
import { MyOrderConstants } from './my-order-constants';
import { OrderResponse } from '@/types/profile';
import OrderDetailsModal from './order-model';

export interface OrderTableProps {
    data: OrderResponse[];
}

export interface IOrderDetail {
    id: string;
    quantity: number;
    price: number; // unit price
    total_price: number;
    status?: string;

    // These can be either product or product_variant
    product?: {
        item_image?: string;
        item_name?: string;
    };
    product_variant?: {
        item_image?: string;
        item_name?: string;
    };
}

const orderDetails: IOrderDetail[] = [
    {
        id: "OD001",
        quantity: 2,
        price: 500,
        total_price: 1000,
        status: "Shipped",
        product_variant: {
            item_image: "/images/product1.jpg",
            item_name: "Blue Hoodie",
        },
    },
    {
        id: "OD002",
        quantity: 1,
        price: 1500,
        total_price: 1500,
        status: "Delivered",
        product: {
            item_image: "/images/product2.jpg",
            item_name: "Wireless Headphones",
        },
    },
];

const OrderTable: React.FC<OrderTableProps> = ({ data }) => {
    const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // const handleDeleteClick = (order: OrderResponse) => {
    //     setSelectedOrder(order);
    //     setShowDeleteModal(true);
    // };

    const handleDelete = async () => {
        if (!selectedOrder) return;
        console.log('Deleting Order:', selectedOrder.orderNumber);
        setShowDeleteModal(false);
        setSelectedOrder(null);
    };

    const handleRowClick = (order: OrderResponse) => {
        setSelectedOrder(order);
        setShowDetailsModal(true);
    };

    return (
        <div>

            <CustomTable<any>
                cols={MyOrderConstants()}
                data={data as OrderResponse[]}
                onRowClick={handleRowClick}
                height="h-auto"
                hasSerialNo
            />

            {showDeleteModal && selectedOrder && (
                <DeleteModal
                    onDelete={handleDelete}
                    setIsOptionClick={setShowDeleteModal}
                />
            )}

            {showDetailsModal && selectedOrder && (
                <OrderDetailsModal
                    order={orderDetails}
                    onClose={() => setShowDetailsModal(false)}
                />
            )}
        </div>
    );
};

export default OrderTable;
