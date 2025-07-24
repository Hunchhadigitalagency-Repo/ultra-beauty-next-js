import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GenericModal from '../../modals/generic-modal';

interface ConfirmationModalProps {
    onClose: () => void;
}

const ConfirmationModal: React.FunctionComponent<ConfirmationModalProps> = ({ onClose }) => {
    return (
        <GenericModal title="News Letter Confirm" setIsOptionClick={onClose} >
            <div className="flex flex-col gap-6">
                <div className="border-2 border-dashed flex justify-center items-center py-6 flex-col gap-5 border-[#CECECE]ß">
                    <div className="p-5 rounded-full bg-[#D2D2D2]">
                        <Check className="text-primary w-10 h-10" />
                    </div>
                    <p className="text-[#A3A3A3]">Your email is send!</p>
                </div>
                <div className="flex justify-between items-center">
                    <Button
                        variant='default'
                        className="px-[15%] rounded-full"
                        onClick={onClose}
                    >
                        OK
                    </Button>
                    <Button
                        className="border-primary bg-white text-primary px-[15%] rounded-full"
                        variant='outline'
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </GenericModal>
    )
}

export default ConfirmationModal