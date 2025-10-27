"use client"
import HeaderBackCard from "@/components/common/cards/header-back-card"
import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader"
import { StarRating } from "@/components/common/form/star-rating-input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createTestimonials, updateTestimonials } from "@/lib/api/cms/testimonials-api"
import { handleError } from "@/lib/error-handler"
import { type TestimonialFormValues, testimonialSchema } from "@/schemas/cms/testimonials-schema"
import type { IDashboardITestimonial } from "@/types/cms"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import useFetchData from "@/hooks/use-fetch"
import { Spinner } from "@/components/ui/spinner"

interface TestimonialFormProps {
  initialData: IDashboardITestimonial | null
}

const TestimonialForm = ({ initialData }: TestimonialFormProps) => {
  const router = useRouter()
  const title = initialData ? "Edit Testimonial" : "Add Testimonial"
  const isEditMode = Boolean(initialData)
  const [loading, setLoading] = useState(false);

  const testiUrl = isEditMode ? `/cms/testimonials/${initialData?.slug}` : ""
  const { data: navigationInfo } = useFetchData<IDashboardITestimonial>(testiUrl)

  const emptyDefaults: TestimonialFormValues = {
    name: "",
    company: "",
    designation: "",
    is_active: false,
    is_video: false,
    message: "",
    rating: 0,
    image: "",
  }

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: emptyDefaults,
  })

  const isVideo = useWatch({ control: form.control, name: "is_video" })

  useEffect(() => {
    if (isEditMode) {
      const dataToUse = navigationInfo || initialData

      if (dataToUse) {
        if (dataToUse.is_video) {
          form.reset({
            name: dataToUse.name,
            company: dataToUse.company,
            designation: dataToUse.designation,
            is_active: dataToUse.is_active,
            is_video: true,
            video_url: dataToUse.video_url ?? "",
          })
        } else {
          form.reset({
            name: dataToUse.name,
            company: dataToUse.company,
            designation: dataToUse.designation,
            is_active: dataToUse.is_active,
            is_video: false,
            message: dataToUse.message ?? "",
            image: dataToUse.image ?? "",
            rating: dataToUse.rating ?? 0,
          })
        }
      }
    }
  }, [isEditMode, navigationInfo, initialData, form])

  const onSubmit = async (data: TestimonialFormValues) => {
    setLoading(true);
    try {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("designation", data.designation)
      formData.append("company", data.company)
      formData.append("is_active", data.is_active.toString())
      formData.append("is_video", data.is_video.toString())

      if (data.is_video) {
        formData.append("video_link", data.video_url)
      } else {
        formData.append("message", data.message)
        formData.append("rating", data.rating.toString())
        if (data.image instanceof File) {
          formData.append("image", data.image)
        }
      }

      if (initialData) {
        const response = await updateTestimonials(initialData.slug, formData)
        if (response.status === 200) {
          toast.success("Testimonial updated successfully")
          router.push("/dashboard/testimonials")
        }
      } else {
        const response = await createTestimonials(formData)
        if (response.status === 201) {
          toast.success("Testimonial created successfully")
          router.push("/dashboard/testimonials")
        }
      }
    } catch (error) {
      handleError(error, toast)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card className="border-none shadow-none rounded-sm p-0">
        <CardContent className="pt-4 pb-8">
          <div className="flex w-full justify-between pb-6">
            <HeaderBackCard title={title} fallBackLink="/dashboard/testimonials" />
          </div>

          <Form {...form}>
            <form id="testimonial-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NAME</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Designation */}
                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DESIGNATION</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., CEO" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company */}
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>COMPANY</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Hunchha Digital Pvt. Ltd." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Switch for Video/Text */}
              <FormField
                control={form.control}
                name="is_video"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4 mt-6">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="is_video"
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <FormLabel htmlFor="is_video" className="text-muted-foreground">
                      IS VIDEO
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Conditional Fields */}
              {isVideo ? (
                // Video testimonial
                <FormField
                  control={form.control}
                  name="video_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VIDEO URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/video" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <>
                  {/* Text testimonial */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>MESSAGE</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter the testimonial message"
                            className="min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IMAGE</FormLabel>
                        <FormControl>
                          <SingleImageUploader
                            onChange={field.onChange}
                            onRemove={() => field.onChange(undefined)}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RATING</FormLabel>
                        <FormControl>
                          <StarRating value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* Active switch */}
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4 mt-6">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="is_active"
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <FormLabel htmlFor="is_active" className="text-muted-foreground">
                      ACTIVATE
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button type="submit" form="testimonial-form" className="text-white rounded-sm">
          {loading ? <Spinner /> : "Save" }
        </Button>
      </div>
    </>
  )
}

export default TestimonialForm
