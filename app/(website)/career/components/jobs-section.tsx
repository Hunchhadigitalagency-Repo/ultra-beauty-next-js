'use client'
import React, { useState } from 'react';
import { LuAppWindow } from "react-icons/lu";
import useFetchData from '@/hooks/use-fetch';
import SectionHeader from '@/components/common/header/section-header';

interface CareerJobResponse {
    slug: string;
    job_title: string;
    job_description: string;
    job_requirement: string;
    job_responsibility: string;
    job_type: string;
    position: string;
    end_date: string;
    location: string;
    salary: number;
    is_active: boolean;
}





const JobsSection: React.FunctionComponent = () => {
    const { data, loading, error } = useFetchData<CareerJobResponse[]>(
        "public-career/"
    )

    const [activeJobIndex, setActiveJobIndex] = useState<number>(0)

    if (loading) return <p>Loading jobs...</p>;
    if (error) return <p>Error loading jobs: {error?.message}</p>;
    if (!data || !data.length) return <p>No jobs available.</p>;

    return (
        <section className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div className='relative'>
                <SectionHeader
                    title='Current Opening '
                    description='Do you think you are a good fit? Apply now. We would love to meet you.'
                    titleClassName='pt-5 text-primary'
                    descriptionClassName='font-poppins text-sm md:text-base pb-5'
                />
                <p className='absolute top-6 right-5 font-semibold text-sm md:text-base'>Total Openings ({data?.length})</p>
                <aside className='flex flex-col gap-5 h-100 overflow-auto'>
                    {data.map((job, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveJobIndex(index)}
                            className={`flex items-center gap-3  rounded-lg p-4 shadow-sm cursor-pointer ${index === activeJobIndex ? "bg-[#EEE] " : "bg-white "}`}
                        >
                            <div className={`h-10 w-10 rounded-lg ${index === activeJobIndex ? "bg-[#FFE6E8]" : ""} flex justify-center items-center`}>
                                <LuAppWindow
                                    className={`w-6 h-6 ${index === activeJobIndex ? "text-primary" : "text-gray-500"
                                        }`}
                                /></div>
                            <div className='flex flex-col items-start'>
                                <div className={`font-semibold ${index === activeJobIndex ? "text-primary" : ""}`}>
                                    {job?.job_title}
                                </div>
                                <div className='text-sm'>
                                    <p>
                                        {job?.job_type} . {job?.location} . {job?.salary ? job?.salary : "N_D"}
                                    </p>
                                </div>
                            </div>

                        </button>
                    ))}
                </aside>
            </div>

            {/* right side */}
            <div className='border bg-white rounded-lg p-6 shadow-s lg:min-h-130 lg:h-130 flex flex-col'>
                <div className='shrink-0'>
                    <p className='text-xl md:text-2xl font-bold pb-2 text-primary'>
                        {data[activeJobIndex]?.position}
                    </p>

                </div>
                <div className='overflow-auto'>
                    <h2 className='text-base  font-bold  text-primary'>
                        Job Description
                    </h2>
                    <div

                        dangerouslySetInnerHTML={{ __html: data[activeJobIndex].job_description }}
                        className='my-2'


                    />

                    <h3 className='text-lg font-semibold text-primary'>
                        Responsibilities
                    </h3>

                    <div

                        dangerouslySetInnerHTML={{ __html: data[activeJobIndex].job_responsibility }}
                        className='my-2'
                    />
                    <h3 className='text-lg font-semibold text-primary '>
                        Requirements
                    </h3>
                    <div
                        dangerouslySetInnerHTML={{ __html: data[activeJobIndex].job_requirement }}
                        className='my-2'
                    >

                    </div>
                </div>



            </div>


        </section>
    )
}

export default JobsSection