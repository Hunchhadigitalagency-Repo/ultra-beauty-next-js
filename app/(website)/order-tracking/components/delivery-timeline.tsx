"use client";

import React from "react";

interface StatusItem {
    date: string;
    title: string;
    isActive?: boolean;
    reviewLink?: boolean;
}

interface TimelineProps {
    statuses: StatusItem[];
}

const DeliveryTimeline: React.FunctionComponent<TimelineProps> = ({ statuses }) => {
    return (
        <div className="p-2 md:p-4 w-full lg:w-1/2 flex flex-col">
            {statuses.map((status, idx) => (
                <div
                    key={idx}
                    className={`grid grid-cols-3 w-3/4 justify-center  items-center relative `}
                >
                    <div className="w-[140px] text-base text-gray-700 flex-shrink-0 sm:mb-0 ">
                        {status.date}
                    </div>

                    <div className="relative mx-4 flex flex-col items-center">
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-white z-10 ${status.isActive ? "bg-green-500" : "bg-gray-300"
                                }`}
                        >
                            ✓
                        </div>
                        {idx !== statuses.length - 1 && (
                            <div className=" mt-2 md:mt-4md:h-[40px] w-px h-[35px] bg-gray-600 mb-1" />
                        )}
                    </div>

                    <div className="relative">
                        <h3
                            className={`absoulte text-base md:text-base font-semibold ${status.isActive ? "text-green-500" : "text-gray-500"
                                }`}
                        >
                            {status.title}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DeliveryTimeline;