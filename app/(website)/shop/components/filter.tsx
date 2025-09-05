import React from 'react';
import { X } from 'lucide-react';
import ResetFilter from './reset-filter';
import DropDownFilter from './dropdown-filter';

interface FilterSectionProps {
    showFilter: boolean;
    onClose: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ showFilter, onClose }) => {

    return (
        <section>
            <div
                className={`
            absolute top-8 md:top-11 lg:top-0 right-0  z-50 h-auto min-w-72 bg-[#FAFAFA] rounded-md p-4 space-y-6 shadow-lg
            ${showFilter ? 'block' : 'hidden'}
            lg:static lg:block lg:shadow-none lg:h-auto lg:w-72 `}
            >
                <div className="flex justify-end lg:hidden">
                    <X className="w-5 h-5 cursor-pointer" onClick={onClose} />
                </div>

                <ResetFilter />
                <DropDownFilter />
            </div>
        </section>


    );
};

export default FilterSection;
