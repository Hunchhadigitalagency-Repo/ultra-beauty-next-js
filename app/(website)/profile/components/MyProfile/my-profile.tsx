import React, { useState } from 'react';
import Image from 'next/image';
import OrderTable from '../Table/order-table';
import { ORDER_DETAILS } from '@/constants/order-data';
import ProfileModal from './components/profile-modal';
import ShippingDetailsModal from './components/shipping-details-modal';
import ShippingModal from './components/shipping-modal';


const MyProfile: React.FunctionComponent = () => {

    const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
    const [showShippingModal, setShowShippingModal] = useState<boolean>(false);
    const [showShippingDetailsModal, setShowShippingDetailsModal] = useState<boolean>(false);

    const toggleProfileModal = () => {
        setShowProfileModal(prev => !prev)
    }

    const toggleShippingModal = () => {
        setShowShippingModal(prev => !prev)
    }

    const toggleShippingDetailsModal = () => {
        setShowShippingDetailsModal(prev => !prev)
    }

    return (
        <section className="flex flex-col gap-8 bg-[#FAFAFA]">

            {/* Profile Modal */}
            {showProfileModal && <ProfileModal onClose={toggleProfileModal} />}

            {/* Shipping Details Modal */}
            {showShippingDetailsModal && <ShippingDetailsModal onClose={toggleShippingDetailsModal} />}

            {/* Shipping Modal */}
            {showShippingModal && <ShippingModal onClose={toggleShippingModal} />}

            <div className="grid grid-cols-1 lg:grid-cols-[0.35fr_0.65fr] gap-10">
                {/* Personal Information */}
                <div className="border border-[#E2E2E2] rounded-sm">
                    <div className="flex justify-between items-center p-3">
                        <p className="font-medium text-sm md:text-base">
                            Personal Information
                        </p>
                        <button
                            onClick={toggleProfileModal}
                            className="text-primary cursor-pointer text-sm md:text-base"
                        >
                            Change
                        </button>
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
                        <p className="font-medium text-sm md:text-base flex items-center gap-3">
                            Shipping Details
                            <span className="text-[#7C7C7C] font-normal text-xs md:text-base uppercase">
                                default address
                            </span>
                        </p>
                        <div className='flex gap-2 md:gap-3 lg:gap-5'>
                            <button
                                onClick={toggleShippingDetailsModal}
                                className="text-primary cursor-pointer text-sm md:text-base"
                            >
                                View
                            </button>
                            <button
                                onClick={toggleShippingModal}
                                className="text-primary cursor-pointer text-sm md:text-base"
                            >
                                Change
                            </button>
                        </div>
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
                <OrderTable data={ORDER_DETAILS} />
            </div>
        </section>
    );
};

export default MyProfile;
