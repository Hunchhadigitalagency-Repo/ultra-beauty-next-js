import React from 'react';
import { RefreshCcw } from 'lucide-react';

const ResetFilter: React.FunctionComponent = () => {
    return (
        <div className="flex items-center justify-between mb-4">
            <h1 className="font-semibold text-lg">Filters</h1>
            <RefreshCcw className="w-5 h-5 cursor-pointer" />
        </div>
    )
}

export default ResetFilter