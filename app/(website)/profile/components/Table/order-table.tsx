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
            item_image: "https://images.unsplash.com/photo-1725172045217-d1e1f2ecdf62?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            item_name: "Dermama",
        },
    },
    {
        id: "OD002",
        quantity: 1,
        price: 1500,
        total_price: 1500,
        status: "Delivered",
        product: {
            item_image: "https://images.unsplash.com/photo-1648712789205-4a05ebb8d026?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            item_name: "Cosmozone",
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
