"use client"

import React from 'react'
// import useFetchData from '@/hooks/use-fetch';
import { AlertCircle } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';
import useFetchData from '@/hooks/use-fetch';
import Image from 'next/image';
import australis from "@/assets/australis.png"

export type NotificatoinResponses = NotificationResponse[]

interface NotificationResponse {
    id: number
    image: any
    title: string
    description: string
    link: string
    is_active: boolean
}

const Notifications = () => {
    const { data: notifications, loading, error } = useFetchData<NotificatoinResponses>("cms/notifications-dropdown/", true)

    return (
        <main className='mt-4 mb-4 '>
            <section className='grid padding'>
                <h1 className='text-sm text-foreground sm:text-base md:text-lg'>Notifications</h1>
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
                            notifications?.map((item) => (
                                <div key={item.id} className='gap-1 h-[110px] sm:gap-2 grid grid-cols-[26%_1fr] sm:grid-cols-[15%_1fr] md:grid-cols-[12%_1fr] lg:grid-cols-[8%_1fr] xl:grid-cols-[10%_1fr] 2xl:grid-cols-[7%_1fr] pt-3 pb-3'>
                                    <div className='relative w-[70px] h-[80px] lg:h-[90px] rounded xl:h-[100px] xl:w-[90px] '>
                                        <Image className='object-contain' src={item.image || australis} alt={item.title} fill />
                                    </div>
                                    <div className='flex items-center'>
                                        <p className={`text-sm sm:text-md md:text-base text-foreground ${item.is_active ? 'font-normal' : 'font-medium'}`}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            )

                            ))
                    }

                </div>
            </section>
        </main>
    )
}

export default Notifications