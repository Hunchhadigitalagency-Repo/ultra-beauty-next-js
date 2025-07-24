import React from 'react';
import Image from 'next/image';
import CareerHeroImage from '@/assets/brandsCareer.png';
import SectionHeader from '@/components/common/header/section-header';

const CareerHeroSection: React.FunctionComponent = () => {
    return (
        <section className="relative min-h-72 md:min-h-80 lg:h-[450px] rounded-lg shadow-lg overflow-visible xl:mb-40">
            {/* Background Image */}
            <div
                style={{
                    backgroundImage: `url(${CareerHeroImage.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="absolute inset-0 z-0"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-100 md:opacity-50 z-10" />

            {/* Content */}
            <div className="relative z-20 w-full xl:w-[60%] gap-2 flex flex-col padding justify-center items-start h-full">
                <SectionHeader
                    title="Career"
                    description="Here is the career"
                    titleClassName="text-primary"
                    descriptionClassName="text-white"
                    className=""
                />
                <p className='text-white text-xs md:text-sm text-justify leading-tight'>
                    A career in the  cosmetic products  industry  offers  a  wide  range of  exciting
                    opportunities  depending on your interests,  skills,  and  educational  background.
                    If  you  enjoy  science and product creation, you could become a cosmetic chemist or
                    formulator, developing skincare, haircare, or makeup products in a laboratory setting.
                    Those with a business or marketing background might pursue roles such as brand manager
                    or product manager, where they oversee the development and promotion of beauty products
                    from  concep t to  launch.  Creative  individuals may find success as makeup artists,
                    beauty  consultants,  or  even  social media influencers who review products and engage
                    audiences online. If you&apos;re more interested in the technical side, positions in quality
                    control, regulatory affairs, or product packaging and design offer  rewarding
                    pathsAdditionally,  careers  in  cosmetic  marketing and market research allow professionals
                    to analyze trends and develop strategies to meet consumer needs. For those passionate about
                    skincare and wellness, becoming  a dermatologist or licensed aesthetician offers the
                    chance to work directly with clients to improve their skin health.
                </p>
            </div>
            {/* Absolute Image */}
            <div className='hidden xl:block absolute z-20 top-[15%] right-[5%] w-[550px] h-[500px] overflow-hidden rounded-br-[150px]'>
                <Image
                    src='https://images.unsplash.com/photo-1596434300655-e48d3ff3dd5e?q=80&w=972&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt=''
                    fill
                    className='object-cover'
                />
            </div>
        </section>
    )
}

export default CareerHeroSection