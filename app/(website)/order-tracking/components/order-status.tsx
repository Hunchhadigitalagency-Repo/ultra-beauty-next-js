'use client';
import React from 'react';
import { FaSyncAlt, FaBox, FaTruck, FaCheck } from 'react-icons/fa';

type StepStatus = 'pending' | 'onProcess' | 'complete';

interface OrderStatusMap {
    processing: StepStatus;
    packed: StepStatus;
    shipped: StepStatus;
    delivered: StepStatus;
}

interface Step {
    key: keyof OrderStatusMap;
    label: string;
    icon: React.ElementType;
}

const steps: Step[] = [
    { key: 'processing', label: 'Processing', icon: FaSyncAlt },
    { key: 'packed', label: 'Packed', icon: FaBox },
    { key: 'shipped', label: 'Shipped', icon: FaTruck },
    { key: 'delivered', label: 'Delivered', icon: FaCheck },
];

interface OrderStatusProps {
    status: OrderStatusMap;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
    return (
        <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-4 flex-wrap sm:flex-nowrap">
            {steps.map((step, index) => {
                const stepStatus = status[step.key];
                const Icon = step.icon;

                let circleClass =
                    'rounded-full flex items-center justify-center text-white mb-2 text-base ' +
                    'w-10 h-10 sm:w-16 sm:h-16 sm:text-xl';

                if (stepStatus === 'complete') {
                    circleClass += ' bg-green-500';
                } else if (stepStatus === 'onProcess') {
                    circleClass += ' bg-primary';
                } else {
                    circleClass += ' bg-gray-300';
                }

                return (
                    <React.Fragment key={step.key}>
                        <div className="flex flex-col items-center text-center mb-4 sm:mb-0">
                            <div className={circleClass}>
                                <Icon />
                            </div>
                            <p className="text-xs sm:text-sm font-medium">{step.label}</p>
                            <p className="text-xs">
                                {stepStatus === 'complete'
                                    ? 'Completed'
                                    : stepStatus === 'onProcess'
                                        ? 'In Progress'
                                        : 'Pending'}
                            </p>
                        </div>
                        {index !== steps.length - 1 && (
                            <div className="flex w-[20px] md:w-[150px] h-[1.5px] border-primary border-dashed border-t-2 -mt-10" />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default OrderStatus;
