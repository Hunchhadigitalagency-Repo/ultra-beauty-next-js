"use client";

import React from "react";

interface StatusItem {
    date: string;
    title: string;
    description: string;
    isActive?: boolean;
    reviewLink?: boolean;
}

interface TimelineProps {
    statuses: StatusItem[];
}

const DeliveryTimeline: React.FunctionComponent<TimelineProps> = ({ statuses }) => {
    return (
        <div className="p-2 md:p-4 w-full lg:w-1/2">
            {statuses.map((status, idx) => (
                <div
                    key={idx}
                    className={`flex w-full justify-center items-center relative flex-row`}
                >
                    <div className="w-[140px] text-sm text-gray-700 flex-shrink-0 sm:mb-0 ">
                        {status.date}
                    </div>

                    <div className="relative mx-4 flex flex-col items-center">
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-white z-10 ${status.isActive ? "bg-green-500" : "bg-[#7FBCFF]"
                                }`}
                        >
                            ✓
                        </div>
                        {idx !== statuses.length - 1 && (
                            <div className=" mt-2 md:mt-4md:h-[40px] w-px h-[35px] bg-gray-600 mb-1" />
                        )}
                    </div>

                    <div className="">
                        <h3
                            className={`text-sm md:text-base font-semibold ${status.isActive ? "text-green-500" : "text-black"
                                }`}
                        >
                            {status.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-700">
                            {status.description}<br />
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DeliveryTimeline;