import React from 'react';
import ResetFilter from './reset-filter';
import DropDownFilter from './dropdown-filter';

const FilterSection: React.FunctionComponent = () => {
    return (
        <aside className="w-72 min-h-96 h-full bg-[#FAFAFA] p-4 rounded-md hidden lg:block">
            <ResetFilter />
            <DropDownFilter />
        </aside>
    )
}

export default FilterSection