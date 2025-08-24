import React from 'react';
import { RefreshCcw } from 'lucide-react';
import { useAppDispatch } from '@/redux/hooks';
import { resetFilters } from '@/redux/features/category-slice'

const ResetFilter: React.FunctionComponent = () => {

    const dispatch = useAppDispatch();

    const handleResetFilter = () => {
        dispatch(resetFilters())
    }
    return (
        <div className="flex items-center justify-between mb-4">
            <h1 className="font-semibold text-lg">Filters</h1>
            <RefreshCcw onClick={handleResetFilter} className="w-5 h-5 cursor-pointer" />
        </div>
    )
}

export default ResetFilter