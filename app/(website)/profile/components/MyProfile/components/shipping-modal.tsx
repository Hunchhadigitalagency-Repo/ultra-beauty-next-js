import React from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import GenericModal from '@/components/common/modals/generic-modal';
import { Button } from '@/components/ui/button';
import { ShippingFormValues, ShippingSchema } from '@/schemas/shipping/shipping-schema';
import { zodResolver } from '@hookform/resolvers/zod';
interface ShippingModalProps {
    onClose: () => void;
}

const ShippingModal: React.FunctionComponent<ShippingModalProps> = ({ onClose }) => {

    const form = useForm<ShippingFormValues>({
        resolver: zodResolver(ShippingSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            alternative_phone: '',
            province: '',
            city: '',
            landmark: '',
            building_floor_street_house: ''
        }
    });

    const onSubmit = (data: ShippingFormValues) => {
        console.log('Shipping Form Submitted:', data);
        onClose();
    };

    return (
        <GenericModal
            title='Change Shipping Details'
            setIsOptionClick={onClose}
            titleClassName='text-primary font-poppins font-normal text-base xl:text-xl'
            modalClassName='max-w-[calc(100%-2rem)] xl:max-w-4xl max-h-80vh overflow-scroll'
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <div className='grid grid-cols-1 xl:grid-cols-2 gap-5'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Enter your Name'
                                            className='placeholder:text-xs text-sm min-w-[300px]'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Enter your email'
                                            className='placeholder:text-xs text-sm min-w-[300px]'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='phone'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Phone Number
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Enter your phone number'
                                            className='placeholder:text-xs text-sm min-w-[300px]'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='alternative_phone'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Alternative Phone Number
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Enter your alternative phone number'
                                            className='placeholder:text-xs text-sm min-w-[300px]'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='province'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Province
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Enter your province'
                                            className='placeholder:text-xs text-sm min-w-[300px]'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='city'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        City
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Enter your city'
                                            className='placeholder:text-xs text-sm min-w-[300px]'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='landmark'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Landmark/ Area
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Enter your alternative phone number'
                                            className='placeholder:text-xs text-sm min-w-[300px]'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='building_floor_street_house'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Building/ Floor/ Street/ House
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Enter your alternative phone number'
                                            className='placeholder:text-xs text-sm min-w-[300px]'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className='w-full'>
                        Save Changes
                    </Button>
                </form>
            </Form>
        </GenericModal>
    )
}

export default ShippingModal