import React from 'react';
import Image from 'next/image';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import {
    ProfileFormValues,
    ProfileSchema
} from '@/schemas/profile/profile-schema';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { zodResolver } from '@hookform/resolvers/zod';
import GenericModal from '@/components/common/modals/generic-modal';
import SingleImageUploader from '@/components/common/ImageUploader/single-image-uploader';
import { cn } from '@/lib/utils';

interface ProfileModalProps {
    onClose: () => void;
}

const ProfileModal: React.FunctionComponent<ProfileModalProps> = ({ onClose }) => {

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            email: '',
            phoneNumber: '',
            gender: undefined,         // or '' if you want a controlled default
            dateOfBirth: undefined,    // or null if your date picker uses it
            profileImage: undefined,
        }
    });

    const onSubmit = (data: ProfileFormValues) => {
        console.log(data);
        onClose();
    };


    return (
        <GenericModal
            title='Change Profile'
            setIsOptionClick={onClose}
            titleClassName='text-primary font-poppins font-normal text-base xl:text-xl'
        >
            <Form {...form}>
                <form className='flex flex-col gap-4 lg:gap-6' onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Profile Image */}
                    <FormField
                        control={form.control}
                        name='profileImage'
                        render={({ field }) => (
                            <FormItem className='space-y-2'>
                                <FormLabel>Profile Image</FormLabel>
                                <div className='grid grid-cols-[35%_65%] lg:grid-cols-[30%_65%] gap-2 lg:gap-5 md:grid-cols-2'>
                                    <div className='w-full flex items-center justify-center'>
                                        <div className='relative w-24 h-24 md:w-28 md:h-28'>
                                            <Image
                                                src='https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                                alt='Profile'
                                                layout='fill'
                                                className='object-cover rounded-full'
                                            />
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <SingleImageUploader
                                            value={field.value}
                                            onChange={field.onChange}
                                            onRemove={() => field.onChange(undefined)}
                                        />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />
                    {/* Email */}
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
                                        className='placeholder:text-xs text-sm'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Phone Number */}
                    <FormField
                        control={form.control}
                        name='phoneNumber'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter your phone number' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Date of Birth */}
                    <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-1">
                                <FormLabel>Date of Birth</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={`w-full bg-white font-normal justify-between ${field.value ? "text-foreground text-sm" : "text-gray-600 text-xs"
                                                    }`}
                                            >
                                                {field.value ? field.value.toLocaleDateString() : 'Select date'}
                                                <ChevronDownIcon className="ml-2 h-4 w-4" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => field.onChange(date)}
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/* Gender */}
                    <FormField
                        control={form.control}
                        name='gender'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className={cn(
                                            !field.value ? "text-gray-600 text-xs" : "text-foreground text-sm"
                                        )}>
                                            <SelectValue placeholder='Select gender' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value='male'>Male</SelectItem>
                                                <SelectItem value='female'>Female</SelectItem>
                                                <SelectItem value='others'>Others</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Submit */}
                    <div>
                        <Button className='w-full' type='submit'>Save Changes</Button>
                    </div>
                </form>
            </Form>
        </GenericModal>
    )
}

export default ProfileModal