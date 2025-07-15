import React, { useState } from 'react';
import CustomTable from '@/components/common/table/custom-table';
import DeleteModal from '@/components/common/modals/delete-modal';
import { MyOrderConstants } from './my-order-constants';
import { OrderResponse } from '@/types/profile';

interface OrderTableProps {
    data: OrderResponse[];
}

const OrderTable: React.FC<OrderTableProps> = ({ data }) => {
    const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteClick = (order: OrderResponse) => {
        setSelectedOrder(order);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!selectedOrder) return;
        console.log('Deleting Order:', selectedOrder.orderNumber);
        setShowDeleteModal(false);
        setSelectedOrder(null);
    };

    return (
        <div>
            <CustomTable
                cols={MyOrderConstants(handleDeleteClick)}
                data={data}
                // loading={loading && data.length === 0}
                onRowClick={() => { }}
                height="h-auto"
                hasSerialNo
            />

            {showDeleteModal && selectedOrder && (
                <DeleteModal
                    itemName={`Order ${selectedOrder.orderNumber}`}
                    onDelete={handleDelete}
                    setIsOptionClick={setShowDeleteModal}
                />
            )}
        </div>
    );
};

export default OrderTable;
