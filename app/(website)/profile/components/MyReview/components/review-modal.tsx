import React from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { ReviewModalProps } from '@/types/profile';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { postReview } from '@/lib/api/review/review-api';
import GenericModal from '@/components/common/modals/generic-modal';
import { StarRating } from '@/components/common/form/star-rating-input';
import { ReviewFormValues, ReviewSchema } from '@/schemas/cms/review-schema';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

const ReviewModal: React.FC<ReviewModalProps> = ({
    title,
    description,
    image,
    isModalOpen,
    slug,
    setIsModalOpen,
    onReviewSave
}) => {

    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(ReviewSchema),
    });

    const handleSaveReview = async (data: ReviewFormValues) => {
        const { review, rating } = data;
        onReviewSave?.();

        if (!slug) {
            toast.error("Slug is missing, cannot submit review.");
            return;
        }

        const response = await postReview(slug, review || '', String(rating));
        toast.success(response.data.message || 'Review submitted successfully!');
        setIsModalOpen(false);
        form.reset();
    };

    return (
        <>
            {
                isModalOpen && (
                    <GenericModal
                        title="Rate and Review purchased Product"
                        titleClassName='text-sm md:text-base xl:text-xl font-playfair font-semibold text-primary font-bold'
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
                                <div className="flex gap-5 p-2 border rounded-md">
                                    <div className="flex items-center justify-center">
                                        <div className="relative w-20 h-30 md:w-30 md:h-full shrink-0">
                                            <Image
                                                fill
                                                src={image}
                                                alt="Product Image"
                                                className="rounded-br-[30px] object-cover "
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col flex-1 gap-2">
                                        <p className="text-sm font-semibold break-words md:text-base font-playfair ">
                                            {title}
                                        </p>
                                        <p
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
                                            className='text-xs line-clamp-2 ' />

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

                                <div className="w-full gap-4 pt-4 pb-2">
                                    <Button
                                        form="review-form"
                                        variant="default"
                                        type="submit"
                                        className='w-full'
                                        onClick={onReviewSave}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </GenericModal>
                )
            }
        </>
    );
};

export default ReviewModal;
