"use client";

import React from "react";
import Image from "next/image";
import { AlertCircle, Bell, X, Dot } from "lucide-react"; 
import SectionHeader from "../header/section-header";
import useFetchData from "@/hooks/use-fetch";
import australis from "@/assets/australis.png" 

export type NotificatoinResponses = NotificationResponse[]

interface NotificationResponse {
    id: number
    image: string 
    title: string
    description: string
    link: string
    is_active: boolean 
}

const NotificationModal = ({ onClose }: { onClose: () => void }) => {

    const { data, loading, error } = useFetchData<NotificationResponse[]>('/cms/notifications/all-notification/')

    
    const getNotificationImage = (imagePath: string | any) => {
        return imagePath || australis; 
    }

    return (
        <div 
            className="absolute w-[350px] md:w-[420px] lg:w-[450px] space-y-4 p-5 z-50 top-full right-4 sm:right-12 lg:right-16 
                       bg-white shadow-xl rounded-lg border border-gray-100 mt-2 lg:mt-4 overflow-hidden"
        >
            
            <div className="flex justify-between items-center border-b pb-3 border-gray-200">
                <SectionHeader
                    title="Notifications"
                    titleClassName="text-xl text-gray-800 font-semibold font-poppins"
                />
                <button 
                    onClick={onClose} 
                    aria-label="Close"
                    className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            
            {loading ? (
                <div className='h-60 flex flex-col w-full justify-center items-center'>
                    <p className='font-light text-sm text-gray-400'>Loading Notifications...</p>
                </div>
            ) : error ? (
                <div className='h-60 flex flex-col w-full justify-center items-center text-center'>
                    <AlertCircle className="w-6 h-6 mb-2 text-red-500" />
                    <p className='font-light text-sm text-red-500'>Oops! Failed to load notifications.</p>
                </div>
            ) : data?.length === 0 ? (
                <div className='h-60 flex flex-col w-full justify-center items-center'>
                    <Bell className="w-8 h-8 mb-2 text-gray-300" />
                    <p className='font-light text-sm text-gray-400'>No new notifications.</p>
                </div>
            ) : (
                <div className="max-h-[400px] overflow-y-auto space-y-1 -mx-5 px-5"> 
                    {data?.map((notification) => (
                        
                        <a 
                            key={notification.id} 
                            href={notification.link} 
                            onClick={onClose} 
                            className={`
                                flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-150 relative
                                ${notification.is_active 
                                    ? 'bg-white hover:bg-gray-50' 
                                    : 'bg-indigo-50/50 hover:bg-indigo-100' 
                                }
                            `}
                        >
                            
                            <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border border-gray-200 mt-0.5">
                                <Image
                                    src={getNotificationImage(notification.image)}
                                    alt={notification.title}
                                    width={40}
                                    height={40}
                                    objectFit="cover"
                                />
                            </div>

                            
                            <div className="flex-grow min-w-0">
                                <h4 className={`text-sm font-semibold text-gray-800 ${!notification.is_active && 'text-indigo-700'}`}>
                                    {notification.title}
                                </h4>
                                <p className="text-xs text-gray-600 mt-0.5 break-words">
                                    {notification.description}
                                </p>
                                
                                
                            </div>
                            
                            
                            {!notification.is_active && (
                                <Dot className="absolute top-1 right-1 w-6 h-6 text-indigo-500 fill-indigo-500" />
                            )}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationModal;