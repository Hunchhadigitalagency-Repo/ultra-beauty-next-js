import React from 'react'
import Image from 'next/image'
import { Bell } from 'lucide-react'


interface NotificationCardProps {
    imgSrc: string,
    title: string,
    description: string,
    is_active: boolean
}


const NotificationCard: React.FC<NotificationCardProps> = ({description, is_active }) => {

    return (
        <div className='gap-1 h-[110px] sm:gap-2 grid grid-cols-[26%_1fr] sm:grid-cols-[15%_1fr] md:grid-cols-[12%_1fr] lg:grid-cols-[8%_1fr] xl:grid-cols-[10%_1fr] 2xl:grid-cols-[7%_1fr] pt-3 pb-3'>
            <div className='relative w-[70px] h-[80px] lg:h-[90px] rounded xl:h-[100px] xl:w-[90px] '>
                <Bell />
            </div>
            <div className='flex items-center'>
                <p className={`text-sm sm:text-md md:text-base text-foreground ${is_active ? 'font-normal' : 'font-medium'}`}>
                    {description}
                </p>
            </div>
        </div>
    )
}

export default NotificationCard