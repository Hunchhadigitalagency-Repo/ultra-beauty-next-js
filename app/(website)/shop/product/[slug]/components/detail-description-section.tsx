'use client';
// import DOMPurify from 'dompurify';
import React from 'react';
// import useFetchData from '@/hooks/use-fetch';
// import { SingleProductResponse } from '@/types/product';
import SingleProductAccordion from './single-product-accordion';

const DetailDecription: React.FunctionComponent = () => {
    // const [expanded, setExpanded] = useState(false);
    // const slug = params?.slug as string;
    // const { data } = useFetchData<SingleProductResponse>(`/public-products/${slug}`);

    return (
        <section className='w-full'>
            {/* {
                data?.detail_description && (
                    <div className="flex flex-col gap-5 text-sm leading-relaxed text-foreground">
                        <SectionHeader
                            title="More Description"
                            titleClassName='font-semibold'
                        />
                        <div
                            className={`${expanded ? "" : "line-clamp-10"} text-base`}
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.detail_description) }}
                        />

                        {
                            data?.detail_description && (
                                <div
                                    onClick={() => setExpanded(!expanded)}
                                    className="text-base font-medium cursor-pointer text-secondary hover:text-primary hover:underline"
                                >
                                    {expanded ? "Read Less" : "Read More"}
                                </div>
                            )
                        }
                    </div>
                )
            } */}
            <div className='detail-description flex flex-col gap-4'>
                <SingleProductAccordion
                    title="How To Use"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum animi reiciendis laboriosam repellendus accusamus non quo harum vero fugit, dolor explicabo delectus unde commodi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate saepe iure ex rem, nobis nulla asperiores odit quos ab suscipit reprehenderit quasi doloribus cum, ipsam temporibus a eos dolorem tempore aliquam, fugit ea repellendus? Voluptatem voluptate magni iure ipsam, saepe temporibus aut nulla. Illum tenetur ut, quos necessitatibus minus optio!"
                />
                <SingleProductAccordion
                    title="Ingredients"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum animi reiciendis laboriosam repellendus accusamus non quo harum vero fugit, dolor explicabo delectus unde commodi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate saepe iure ex rem, nobis nulla asperiores odit quos ab suscipit reprehenderit quasi doloribus cum, ipsam temporibus a eos dolorem tempore aliquam, fugit ea repellendus? Voluptatem voluptate magni iure ipsam, saepe temporibus aut nulla. Illum tenetur ut, quos necessitatibus minus optio!"
                />
            </div>
        </section>
    )
}

export default DetailDecription