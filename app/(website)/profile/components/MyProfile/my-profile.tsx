import React from 'react';
import Image from 'next/image';
import OrderTable from '../Table/order-table';

export const data = [
    {
        id: 1,
        orderNumber: 'ORD-001',
        orderDate: '2025-07-10',
        items: [
            {
                image: 'https://images.unsplash.com/photo-1567001193226-f2ed96e9f9f3?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                description: 'Soap',
            }, {
                image: 'https://images.unsplash.com/photo-1614159102397-ccd6c2400397?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                description: 'Oil',
            }
        ],
        status: 'Delivered',
        quantity: 2,
        total: 1200,
    }
];

const MyProfile: React.FunctionComponent = () => {


    return (
        <section className="flex flex-col gap-8 bg-[#FAFAFA]">
            <div className="grid grid-cols-1 lg:grid-cols-[0.35fr_0.65fr] gap-10">
                {/* Personal Information */}
                <div className="border border-[#E2E2E2] rounded-sm">
                    <div className="flex justify-between items-center p-3">
                        <p className="font-medium text-sm md:text-base">Personal Information</p>
                        <p className="text-primary cursor-pointer text-sm md:text-base">Change</p>
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
                            <p className="text-primary font-semibold text-lg">Hemant Jung Karki</p>
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
                        <p className="text-primary cursor-pointer text-sm md:text-base">
                            Change
                        </p>
                    </div>
                    <div className="border-t border-[#CFCECE] p-4 flex flex-col gap-1.5">
                        <p className="text-primary font-semibold text-lg">Hemant Jung Karki</p>
                        <p className="font-medium text-sm">hemantajungkarki@gmail.com</p>
                        <p className="font-medium text-sm">+977-9824386694</p>
                        <p className="font-medium text-sm">
                            Itahai, Sunsari Nepal, Ward now 10, oppositie to nepal telcome offe and some other t
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h1 className="text-primary font-medium text-xl">Recent Orders</h1>
                <OrderTable data={data} />
            </div>
        </section>
    );
};

export default MyProfile;
