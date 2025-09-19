"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import SectionHeader from "../header/section-header";
import useFetchData from "@/hooks/use-fetch";
import australis from "@/assets/australis.png"

// interface Notification {
//     id: number;
//     image: string;
//     message: string;
//     read: boolean
// }
export type NotificatoinResponses = NotificationResponse[]

interface NotificationResponse {
    id: number
    image: any
    title: string
    description: string
    link: string
    is_active: boolean
}

// const notifications: Notification[] = [
//     {
//         id: 1,
//         image: "https://img.freepik.com/free-psd/view-sofa-interior-design-decor_23-2151772696.jpg",
//         message: 'Your Item “Pregnancy Kit”  has been shipped to your current location.',
//         read: false
//     },
//     {
//         id: 2,
//         image: "https://img.freepik.com/free-psd/view-sofa-interior-design-decor_23-2151772696.jpg",
//         message: 'Your Item “Pregnancy Kit”  has been shipped to your current location.',
//         read: true
//     },
// ];



const NotificationModal = ({ onClose }: { onClose: () => void }) => {

    const { data, loading, error } = useFetchData<NotificatoinResponses>("cms/notifications-dropdown/")
    return (
        <div className="absolute w-[350px] md:w-[500px] space-y-4 p-5 z-50 top-full right-4 sm:right-12 lg:right-16 bg-white padding-y shadow-md mt-0 lg:mt-4">
            <div className="flex justify-between items-center border-b pb-2">
                <SectionHeader
                    title="Notification"
                    titleClassName="text-xl xl:text-xl text-primary font-poppins font-medium"
                />
                <button onClick={onClose} aria-label="Close">
                    <X className="w-5 h-5 cursor-pointer" />
                </button>
            </div>

            {loading ? (
                <div className='h-60 flex w-full justify-center items-center'>
                    <p className='text-gray'>
                        Loading Notification...
                    </p>
                </div>
            ) : error ? (
                <div className='h-60 flex w-full justify-center items-center'>
                    <p className='text-red'>
                        Something went wrong while Fetching Notification
                    </p>
                </div>
            ) : data?.length === 0 ? (
                <div className='h-60 flex w-full justify-center items-center'>
                    <p className='text-red'>
                        Something went wrong while Fetching Notification
                    </p>
                </div>
            ) : (
                <div><div className="w-full flex justify-end gap-5 items-center">
                    <button className="text-primary text-sm font-medium cursor-pointer">
                        Mark All as Read
                    </button>
                    <button className="text-primary text-sm font-medium cursor-pointer">
                        Delete All Notification
                    </button>
                </div>
                    <div className="max-h-[350px] overflow-y-auto space-y-4">
                        {data?.map((notification) => (
                            <div key={notification.id} className="flex items-start gap-3 pb-3">
                                <Image
                                    src={notification.image || australis}
                                    width={300}
                                    height={300}
                                    alt="Notification"
                                    className="w-12 h-12 rounded object-cover"
                                />
                                <p className={`text-sm text-foreground ${notification.is_active ? 'font-normal' : 'font-medium'}`}>
                                    {notification.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>)}


        </div>
    );
};

export default NotificationModal;