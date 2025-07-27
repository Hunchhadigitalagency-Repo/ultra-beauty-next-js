import { Button } from '@/components/ui/button'
import React from 'react'

const StatusHeader = () => {
    return (
        <div className="md:h-12 h-12 px-4 md:px-6 bg-gray-300 rounded-sm font-medium text-custom-black text-sm flex items-center justify-between">
            {/* Left side: Order Info */}
            <div className="flex flex-wrap gap-2 md:gap-6 text-xs md:text-sm">
                <h4>#32424234234</h4>
            </div>

            <div className="flex justify-between gap-6 items-center">
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
                <span className="text-white text-sm md:text-base px-3 py-1.5 bg-green-500 rounded-[3px] w-[80px] text-center">
                    Deliver
                </span>
            </div> {/* Right side: Status */}
        </div>

    )
}

export default StatusHeader