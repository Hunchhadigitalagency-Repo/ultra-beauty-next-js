"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

export const commentSchema = z.object({
  comment: z.string().min(1, { message: "Comment is required." }),
  notifyCustomer: z.boolean(),
});

type CommentValues = z.infer<typeof commentSchema>;

interface IComment {
  comment: string;
  notify_customer: boolean;
}

interface CommentFormProps {
  initialData: IComment | null;
  order_slug?: string;
}

function CommentForm({ initialData, order_slug }: CommentFormProps) {
  const form = useForm<CommentValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: initialData
      ? {
          comment: initialData.comment,
          notifyCustomer: initialData.notify_customer,
        }
      : {
          comment: "",
          notifyCustomer: false,
        },
  });

  const onSubmit = async (data: CommentValues) => {
    console.log(data, order_slug);
  };

  return (
    <div className="bg-white rounded-sm p-4">
      <Form {...form}>
        <form
          id="comment-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-gray-800">
                  Add Comment
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add your comment down here."
                    className="rounded-xs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div className="flex items-center justify-between pt-3">
            <FormField
              control={form.control}
              name="notifyCustomer"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                  <FormControl>
                    <Input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4"
                    />
                  </FormControl>
                  <FormLabel className="text-muted-foreground text-sm">
                    Notify Customer
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
        </form>
      </Form>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          form="comment-form"
          className="text-white rounded-sm"
        >
          Save Comment
        </Button>
      </div>
    </div>
  );
}

export default CommentForm;
