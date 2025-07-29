"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import SectionHeader from "../header/section-header";

interface Notification {
    id: number;
    image: string;
    message: string;
    read: boolean
}

const notifications: Notification[] = [
    {
        id: 1,
        image: "https://img.freepik.com/free-psd/view-sofa-interior-design-decor_23-2151772696.jpg",
        message: 'Your Item “Pregnancy Kit”  has been shipped to your current location.',
        read: false
    },
    {
        id: 2,
        image: "https://img.freepik.com/free-psd/view-sofa-interior-design-decor_23-2151772696.jpg",
        message: 'Your Item “Pregnancy Kit”  has been shipped to your current location.',
        read: true
    },
];

const NotificationModal = ({ onClose }: { onClose: () => void }) => {
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
            <div className="w-full flex justify-end gap-5 items-center">
                <button className="text-primary text-sm font-medium cursor-pointer">
                    Mark All as Read
                </button>
                <button className="text-primary text-sm font-medium cursor-pointer">
                    Delete All Notification
                </button>
            </div>
            <div className="max-h-[350px] overflow-y-auto space-y-4">
                {notifications.map((note) => (
                    <div key={note.id} className="flex items-start gap-3 pb-3">
                        <Image
                            src={note.image}
                            width={300}
                            height={300}
                            alt="Notification"
                            className="w-12 h-12 rounded object-cover"
                        />
                        <p className={`text-sm text-foreground ${note.read ? 'font-normal' : 'font-medium'}`}>
                            {note.message}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationModal;