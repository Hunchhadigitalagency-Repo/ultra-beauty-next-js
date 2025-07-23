import React from 'react';
import { X } from 'lucide-react';
import ResetFilter from './reset-filter';
import DropDownFilter from './dropdown-filter';


interface MobileFilterProps {
    onclose: () => void;
}

const MobileFilter: React.FunctionComponent<MobileFilterProps> = ({ onclose }) => {
    return (
        <div
            className="absolute top-15 right-0 z-50 min-w-72 w-[80%] md:w-[70%] space-y-6 padding max-h-[80vh] bg-[#FAFAFA] shadow-lg rounded-md lg:hidden"
        >
            <div className="flex justify-end">
                <X onClick={onclose} className="w-5 h-5 cursor-pointer" />
            </div>
            <ResetFilter />
            <DropDownFilter />
        </div>
    )
}

export default MobileFilter