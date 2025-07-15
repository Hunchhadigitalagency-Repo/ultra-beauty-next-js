import React from 'react';
import Image from 'next/image';
import OrderTable from '../Table/order-table';

const data = [
    {
        id: 1,
        orderNumber: 'ORD-001',
        orderDate: '2025-07-10',
        items: {
            image: 'https://www.shutterstock.com/image-photo/washington-dc-usa-april-7-600nw-2609091587.jpg',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, iusto.',
        },
        status: 'Delivered',
        quantity: 2,
        total: 1200,
    },
    {
        id: 2,
        orderNumber: 'ORD-002',
        orderDate: '2025-07-11',
        items: {
            image: 'https://www.shutterstock.com/image-photo/washington-dc-usa-april-7-600nw-2609091587.jpg',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, iusto.',
        },
        status: 'Processed',
        quantity: 1,
        total: 100,
    },
];

const MyProfile: React.FunctionComponent = () => {


    return (
        <section className="flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-[0.35fr_0.65fr] gap-10">
                {/* Personal Information */}
                <div className="border border-[#E2E2E2] rounded-sm">
                    <div className="flex justify-between items-center p-3">
                        <p className="font-medium text-sm md:text-base">Personal Information</p>
                        <p className="text-[#1477B4] cursor-pointer text-sm md:text-base">Change</p>
                    </div>
                    <div className="border-t border-[#CFCECE] p-4 flex gap-4">
                        <div className="flex justify-center items-center">
                            <div className=" relative w-20 h-20">
                                <Image
                                    src="https://www.shutterstock.com/image-photo/washington-dc-usa-april-7-600nw-2609091587.jpg"
                                    alt="profile image"
                                    layout='fill'
                                    className='object-cover rounded-full'
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <p className="text-[#FF9900] font-semibold text-lg">Hemant Jung Karki</p>
                            <p className="font-medium text-sm">hemantajungkarki@gmail.com</p>
                            <p className="font-medium text-sm">+977-9824386694</p>
                            <p className="font-medium text-sm text-[#5D5D5D]">DOB: 1997-01-19</p>
                            <p className="font-medium text-sm text-[#5D5D5D]">Gender: None</p>
                        </div>
                    </div>
                </div>

                {/* Shipping Details */}
                <div className="border border-[#E2E2E2] rounded-sm">
                    <div className="flex justify-between items-center p-3">
                        <p className="font-medium text-sm md:text-base flex gap-3">
                            Shipping Details
                            <span className="text-[#7C7C7C] font-normal uppercase">
                                default address
                            </span>
                        </p>
                        <p className="text-[#1477B4] cursor-pointer text-sm md:text-base">
                            Change
                        </p>
                    </div>
                    <div className="border-t border-[#CFCECE] p-4 flex flex-col gap-1.5">
                        <p className="text-[#FF9900] font-semibold text-lg">Hemant Jung Karki</p>
                        <p className="font-medium text-sm">hemantajungkarki@gmail.com</p>
                        <p className="font-medium text-sm">+977-9824386694</p>
                        <p className="font-medium text-sm">
                            Itahai, Sunsari Nepal, Ward now 10, oppositie to nepal telcome offe and some other t
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h1 className="text-[#1477B4] font-medium text-xl">Recent Orders</h1>
                <OrderTable data={data} />
            </div>
        </section>
    );
};

export default MyProfile;
