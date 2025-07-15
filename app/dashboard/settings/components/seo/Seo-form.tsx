"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { seoSchema, SeoValues } from "@/schemas/settings/seo-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { handleError } from "@/lib/error-handler";
import { toast } from "sonner";
import { createSeo } from "@/lib/api/settings/seo-api";

const SeoForm = () => {
  const form = useForm<SeoValues>({
    resolver: zodResolver(seoSchema),
    defaultValues: {
      metaKeyword: [],
      metaTitle: "",
      metaDescription: "",
      // primaryColor: "",
      // textColor: "",
      // activate: false,
    },
  });

  const onSubmit = async (data: SeoValues) => {
    try {
      const formData = new FormData();
      data.metaKeyword.forEach((keyword) => {
        formData.append("meta_keyword", JSON.stringify(keyword));
      });
      formData.append("meta_title", data.metaTitle);
      formData.append("meta_description", data.metaDescription);

      const response = await createSeo(formData);
      if (response.status === 201) {
        toast.success("SEO updated successfully");
      }
    } catch (error) {
      handleError(error, toast);
    }
  };

  const TagInput = ({
    value,
    onChange,
    placeholder,
  }: {
    value: string[];
    onChange: (val: string[]) => void;
    placeholder?: string;
  }) => {
    const [input, setInput] = useState("");

    const addTag = (tag: string) => {
      const trimmed = tag.trim();
      if (trimmed && !value.includes(trimmed)) {
        onChange([...value, trimmed]);
      }
    };

    const removeTag = (tag: string) => {
      onChange(value.filter((t) => t !== tag));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag(input);
        setInput("");
      }
    };

    return (
      <div className="flex flex-wrap items-center gap-2 border px-3 py-2 rounded-md min-h-[48px]">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 border px-2 py-1 rounded-full text-sm bg-muted text-muted-foreground"
          >
            {tag}
            <button
              type="button"
              className="text-sm ml-1 cursor-pointer hover:text-red-500"
              onClick={() => removeTag(tag)}
            >
              ✕
            </button>
          </span>
        ))}
        <input
          className="flex-1 bg-transparent outline-none text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      </div>
    );
  };

  return (
    <>
      <Card className="border-none shadow-none rounded-sm p-0">
        <CardContent className="pt-4 pb-8">
          <div className="flex w-full justify-between pb-6">
            <h1 className="font-semibold text-xl">Update SEO</h1>
          </div>

          <Form {...form}>
            <form
              id="setting-seo-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="metaKeyword"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-muted-foreground">
                      META KEYWORDS
                    </FormLabel>
                    <FormControl>
                      <TagInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter keywords and press Enter"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-muted-foreground">
                      META TITLE
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the meta title."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      META DESCRIPTION
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please enter the meta description."
                        className="rounded-xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <div className="flex justify-around">
                <FormField
                  control={form.control}
                  name="primaryColor"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground">
                        PRIMARY COLOR
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="color"
                          {...field}
                          className="w-12 h-10 p-0 border-none bg-transparent cursor-pointer"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="textColor"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground">
                        TEXT COLOR
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="color"
                          {...field}
                          className="w-12 h-10 p-0 border-none bg-transparent cursor-pointer"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="activate"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4 mt-6">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="activate"
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="activate"
                      className="text-muted-foreground"
                    >
                      ACTIVATE
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          form="setting-seo-form"
          className="text-white rounded-sm"
        >
          Update
        </Button>
      </div>
    </>
  );
};

export default SeoForm;
