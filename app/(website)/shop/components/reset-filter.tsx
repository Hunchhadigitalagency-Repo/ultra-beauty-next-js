import React from 'react';
import { RefreshCcw } from 'lucide-react';
import { useAppDispatch } from '@/redux/hooks';
import { resetFilters, setPriceRange } from '@/redux/features/category-slice';

const ResetFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleResetFilter = () => {
    dispatch(resetFilters());
    dispatch(setPriceRange([10, 10000]))
  };

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Title */}
      <h1 className="font-poppins font-semibold text-xl sm:text-2xl text-gray-800">
        Filters
      </h1>

      {/* Reset Button */}
      <button
        onClick={handleResetFilter}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white transition-all duration-200 shadow-sm hover:shadow-md group"
        aria-label="Reset Filters"
      >
        <RefreshCcw className="w-5 h-5 text-gray-700 group-hover:rotate-180 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default ResetFilter;
