import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";


interface SingleProductAccordionProps {
    title: string;
    description: string;
}

const SingleProductAccordion: React.FunctionComponent<SingleProductAccordionProps> = ({ title, description }) => {
    return (
        <Accordion className='mb-0 sm:mb-4' type="single" collapsible>
            <AccordionItem className='w-[90vw] sm:w-full' value="item-1">
                <AccordionTrigger className="bg-secondary cursor-pointer rounded-none text-md py-3 px-5 hover:no-underline">
                    {title}
                </AccordionTrigger>
                <AccordionContent className="pl-3 pt-3">
                    <div
                        className="text-sm leading-relaxed text-foreground flex flex-wrap text-justify"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default SingleProductAccordion