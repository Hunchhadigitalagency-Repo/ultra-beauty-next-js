import React from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { StarRating } from '@/components/common/form/star-rating-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReviewFormValues, ReviewSchema } from '@/schemas/cms/review-schema';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import GenericModal from '@/components/common/modals/generic-modal';
import { ReviewModalProps } from '@/types/profile';


const ReviewModal: React.FC<ReviewModalProps> = ({
    title,
    description,
    image,
    isModalOpen,
    setIsModalOpen,
}) => {
    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(ReviewSchema),
    });

    const handleSaveReview = async (data: ReviewFormValues) => {
        try {
            console.log('Submitting Review:', data);
            // TODO: API Call

            toast.success('Review submitted successfully!');
            setIsModalOpen(false);
            form.reset();
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review.');
        }
    };

    return (
        <>
            {isModalOpen && (
                <GenericModal
                    title="Rate and Review purchased Product"
                    description ="Review the product"
                    titleClassName='text-sm xl:text-xl font-playfair font-semibold text-primary font-bold'
                    descriptionClassName='text-xs xl:text-xs'
                    setIsOptionClick={() => {
                        setIsModalOpen(false);
                        form.reset();
                    }}
                >
                    
                    <Form {...form}>
                        <form
                            id="review-form"
                            onSubmit={form.handleSubmit(handleSaveReview)}
                        >
                            <div className="flex gap-5">
                                <div className="flex justify-center items-center">
                                    <div className="w-20 h-30 md:w-30 md:h-full relative shrink-0">
                                        <Image
                                            fill
                                            src={image}
                                            alt="Product Image"
                                            className="rounded-br-[30px] object-cover "
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col gap-2">
                                    <p className="font-semibold break-words text-sm  font-playfair ">
                                        {title}
                                    </p>
                                    <p className='text-xs '>{description}</p>
                                   
                                    <FormField
                                        control={form.control}
                                        name="rating"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <StarRating
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-xs md:sm font-semibold text-[#5D5D5D]">
                                    Review Detail
                                </p>
                                <FormField
                                    control={form.control}
                                    name="review"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="What do you think about this Product?"
                                                    className="min-h-[120px] resize-none placeholder:text-xs"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="w-full  pt-4 pb-2 gap-4">
                                <Button
                                    form="review-form"
                                    variant="default"
                                    type="submit"
                                    className='w-full'
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                </GenericModal>
            )}
        </>
    );
};

export default ReviewModal;
