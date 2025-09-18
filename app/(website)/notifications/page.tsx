"use client"

import React from 'react'
// import useFetchData from '@/hooks/use-fetch';
import { AlertCircle } from "lucide-react";
import { INotification } from '@/types/cms';
import { Skeleton } from '@/components/ui/skeleton';
import NotificationCard from './components/notification-card'

const Notifications = () => {

    // const { data: notifications, loading, error } = useFetchData<INotification[]>(`cms/notifications-dropdown/`, true);

    const notifications: INotification[] = [
        {
            id: 1,
            link: "https://img.freepik.com/free-psd/view-sofa-interior-design-decor_23-2151772696.jpg",
            description: 'Your Item “Pregnancy Kit”  has been shipped to your current location.',
            is_active: false,
            title: 'Test'
        },
        {
            id: 2,
            link: "https://img.freepik.com/free-psd/view-sofa-interior-design-decor_23-2151772696.jpg",
            description: 'Your Item “Pregnancy Kit”  has been shipped to your current location.',
            is_active: false,
            title: 'Test'
        },
    ];

    const loading = false;
    const error = false;
    return (
        <main className='mt-4 mb-4 '>
            <section className='grid padding'>
                <div className='grid grid-cols-[40%_1fr] sm:grid-cols-[1fr_1fr]'>
                    <h1 className='text-sm text-foreground sm:text-base md:text-lg'>Notifications</h1>
                    <div className='flex justify-around font-light text-center sm:justify-end sm:gap-6 text-primary notifications-action-buttons sm:text-lg '>
                        <p className='font-medium cursor-pointer'>Mark All as Read</p>
                        <p className='font-medium cursor-pointer'>Delete</p>
                    </div>
                </div>
                <div className="w-full divide-y">
                    {
                        loading ? (
                            Array.from({ length: 3 }, (_, i) => (
                                <div
                                    key={i}
                                    className="gap-1 h-[110px] sm:gap-2 grid grid-cols-[26%_1fr] sm:grid-cols-[15%_1fr] md:grid-cols-[12%_1fr] lg:grid-cols-[8%_1fr] xl:grid-cols-[10%_1fr] 2xl:grid-cols-[7%_1fr] pt-3 pb-3"
                                >
                                    {/* Image placeholder */}
                                    <div className="relative w-[70px] h-[80px] lg:h-[90px] xl:h-[100px] xl:w-[90px]">
                                        <Skeleton className="w-full h-full rounded" />
                                    </div>

                                    {/* Text placeholder */}
                                    <div className="flex items-center">
                                        <Skeleton className="w-full h-4" />
                                    </div>
                                </div>
                            ))
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center w-full h-60">
                                <AlertCircle className="w-8 h-8 mb-2 text-red-500" />
                                <p className="text-red-500">Something went wrong!</p>
                            </div>
                        ) : notifications?.length === 0 ? (
                            <div className="flex flex-col items-center justify-center w-full h-60">
                                <AlertCircle className="w-8 h-8 mb-2 text-red-500" />
                                <p className="text-red-500">No Notifications Found!</p>
                            </div>
                        ) : (
                            notifications?.map((notification) => (
                                <NotificationCard
                                    key={notification.id}
                                    imgSrc={notification.link}
                                    title={notification.title}
                                    description={notification.description}
                                    is_active={notification.is_active}
                                />
                            ))
                        )
                    }

                </div>
            </section>
        </main>
    )
}

export default Notifications