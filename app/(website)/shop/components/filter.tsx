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

            {showFilter &&
                <div className="absolute top-8 md:top-11 right-0 z-50 w-72  bg-[#FAFAFA] p-4 space-y-6 shadow-lg rounded-l-md lg:hidden">
                    <div className="flex justify-end">
                        <X className="w-5 h-5 cursor-pointer" onClick={onClose} />
                    </div>
                    <ResetFilter />
                    <DropDownFilter />
                </div>
            }

            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-72 p-4 space-y-6 bg-[#FAFAFA] shadow-md rounded-md">
                <ResetFilter />
                <DropDownFilter />
            </aside>
        </section>
    );
};

export default FilterSection;
