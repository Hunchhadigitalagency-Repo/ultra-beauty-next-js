"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";
import { useState } from "react";
import {
  ContactFormValues,
  contactSchema,
} from "@/schemas/contact/contact-schema";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiBase from "@/services/api-base-instance";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Textarea } from "@/components/ui/textarea";


export default function ContactForm() {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      subject: "",
      // message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      setIsLoading(true);
      const response = await apiBase.post('cms/contactus/', values);
      if (response.status === 201) {
        toast.success('Message Sent Successfully')
      }
      form.reset();
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-custom-black">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your First Name"
                    className="border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-custom-black">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Last Name"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-custom-black">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Email Address"
                    type="email"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-custom-black">
                  Subject
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter The Subject"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-custom-black">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter The Message"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-40"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* Submit Button */}

          <Button
            disabled={isLoading}
            type="submit"
            className={
              `w-full  
              bg-primary
               text-white px-8 py-5 rounded-md`
            }>
            {isLoading ? 'Submitting' : 'Submit Now'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
