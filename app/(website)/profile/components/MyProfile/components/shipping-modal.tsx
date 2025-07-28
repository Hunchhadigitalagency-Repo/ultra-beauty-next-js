import GenericModal from '@/components/common/modals/generic-modal';
import React from 'react';

interface ShippingModalProps {
    onClose: () => void;
}

const ShippingModal: React.FunctionComponent<ShippingModalProps> = ({ onClose }) => {
    return (
        <GenericModal
            title='Change Shipping Details'
            setIsOptionClick={onClose}
            titleClassName='text-primary font-poppins font-normal text-base xl:text-xl'
        >
            <div>Shipping Modal</div>
        </GenericModal>
    )
}

export default ShippingModal