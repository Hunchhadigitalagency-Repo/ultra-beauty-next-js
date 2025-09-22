"use client"

import HeaderBackCard from "@/components/common/cards/header-back-card"
import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { handleError } from "@/lib/error-handler"
import { TeamFormValues, TeamSchema } from "@/schemas/cms/team-schema"
import type { ITeam } from "@/types/cms"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useEffect } from "react"
import { createTeam, updateTeam } from "@/lib/api/cms/team-api"

interface TeamFormProps {
  initialData?: ITeam | null
}

const TeamForm = ({ initialData }: TeamFormProps) => {
  const router = useRouter()
  const title = initialData ? "Edit Team" : "Add Team"
  const isEditMode = Boolean(initialData)

  const emptyDefaults: TeamFormValues = {
    name: "",
    designation: "",
    description: "",
    is_active: true,
    photo: "",
    linkedin_link: "",
    facebook_link: "",
    twitter_link: "",
    instagram_link: "",
  }

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(TeamSchema),
    defaultValues: emptyDefaults,
  })

  // Reset with initial data when editing
  useEffect(() => {
    if (isEditMode && initialData) {
      form.reset({
        name: initialData.name,
        designation: initialData.designation,
        description: initialData.description,
        is_active: initialData.is_active,
        photo: initialData.photo,
        linkedin_link: initialData.linkedin_link ?? "",
        facebook_link: initialData.facebook_link ?? "",
        twitter_link: initialData.twitter_link ?? "",
        instagram_link: initialData.instagram_link ?? "",
      })
    }
  }, [isEditMode, initialData, form])

  const onSubmit = async (data: TeamFormValues) => {
    try {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("designation", data.designation)
      formData.append("description", data.description)
      formData.append("is_active", data.is_active.toString())
      formData.append("linkedin_link", data.linkedin_link ?? "")
      formData.append("facebook_link", data.facebook_link ?? "")
      formData.append("twitter_link", data.twitter_link ?? "")
      formData.append("instagram_link", data.instagram_link ?? "")

      if (data.photo instanceof File) {
        formData.append("photo", data.photo)
      } else if (typeof data.photo === "string") {
        formData.append("photo", data.photo)
      }

      if (initialData) {
        const response = await updateTeam(initialData.id, formData)
        if (response.status === 200) {
          toast.success("Team member updated successfully")
          router.push("/dashboard/team")
        }
      } else {
        const response = await createTeam(formData)
        if (response.status === 201) {
          toast.success("Team member created successfully")
          router.push("/dashboard/team")
        }
      }
    } catch (error) {
      handleError(error, toast)
    }
  }

  return (
    <>
      <Card className="border-none shadow-none rounded-sm p-0">
        <CardContent className="pt-4 pb-8">
          <div className="flex w-full justify-between pb-6">
            <HeaderBackCard title={title} fallBackLink="/dashboard/team" />
          </div>

          <Form {...form}>
            <form id="team-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name & Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NAME</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DESIGNATION</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter designation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DESCRIPTION</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter description"
                        className="min-h-[100px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Photo */}
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PHOTO</FormLabel>
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

              {/* Social Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="linkedin_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LINKEDIN URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter LinkedIn URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="facebook_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>FACEBOOK URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Facebook URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="twitter_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TWITTER URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Twitter URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="instagram_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>INSTAGRAM URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Instagram URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Active Switch */}
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4 mt-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="is_active"
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <FormLabel htmlFor="is_active" className="text-muted-foreground">
                      ACTIVE
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
        <Button type="submit" form="team-form" className="text-white rounded-sm">
          Save
        </Button>
      </div>
    </>
  )
}

export default TeamForm
