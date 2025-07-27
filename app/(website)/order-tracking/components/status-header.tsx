import React from 'react';
import { Button } from '@/components/ui/button';

const StatusHeader: React.FunctionComponent = () => {

    const status = 'delivered';

    return (
        <div className="md:h-12 h-12 px-4 md:px-6 bg-secondary rounded-sm font-medium text-custom-black text-sm flex items-center justify-between">
            {/* Left side: Order Info */}
            <div className="flex flex-wrap gap-2 md:gap-6 text-xs md:text-sm">
                <h4 className='flex gap-1'>
                    Order No:
                    <span>
                        #78647763728
                    </span>
                </h4>
            </div>
            {/* Right Side: Order Status & Actions */}
            <div className="flex justify-between gap-6 items-center">
                {
                    status === 'delivered' ? (
                        <span className="text-white text-sm md:text-base px-3 py-1.5 bg-green-500 rounded-[3px] text-center">
                            Delivered
                        </span>
                    ) : (
                        <div className="flex  items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-black hover:text-red-700 text-xs md:text-sm font-medium h-auto p-0"
                            >
                                Cancel Order
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 p-0 flex items-center justify-center text-black hover:text-gray-600"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M8 4v4M8 12h.01" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>

    )
}

export default StatusHeader