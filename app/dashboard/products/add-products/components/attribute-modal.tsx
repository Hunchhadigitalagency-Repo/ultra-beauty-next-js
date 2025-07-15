"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import useFetchDropdown from "@/hooks/use-fetch-dropdown"
import type { IAttribute } from "@/types/Settings"
import { FormCombobox } from "@/components/common/form/form-combobox"

const attributeSchema = z.object({
  name: z.string().min(1, "Please select an attribute name"),
  value: z.string().min(1, "Please select an attribute value"),
})

type AttributeFormData = z.infer<typeof attributeSchema>

interface AttributeModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: {
    attribute: string
    attribute_variant: string
    attribute_name: string
    variant_name: string
  }) => void
}

const AttributeModal = ({ isOpen, onClose, onSave }: AttributeModalProps) => {
  const { data: attributes } = useFetchDropdown<IAttribute>("/attribute/?pagination=false")

  const form = useForm<AttributeFormData>({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      name: "",
      value: "",
    },
  })

  const onSubmit = (data: AttributeFormData) => {
    const selectedAttribute = attributes?.find((attr) => attr.id.toString() === data.name)
    const selectedVariation = selectedAttribute?.variations.find((variation) => variation.id.toString() === data.value)

    if (selectedAttribute && selectedVariation) {
      onSave({
        attribute: data.name,
        attribute_variant: data.value,
        attribute_name: selectedAttribute.name,
        variant_name: selectedVariation.name,
      })
    }

    form.reset()
    onClose()
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Attribute Management</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormCombobox
              form={form}
              name="name"
              label="Attribute Name"
              placeholder="Select Attribute Name"
              searchPlaceholder="Search Attribute Name..."
              options={
                attributes?.map((attribute) => ({
                  value: attribute.id.toString(),
                  label: attribute.name,
                })) || []
              }
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => {
                const selectedAttribute = form.watch("name")
                const variations =
                  attributes?.find((attribute) => attribute.id.toString() === selectedAttribute)?.variations || []
                return (
                  <FormItem>
                    <FormLabel className="">
                      ATTRIBUTE VALUE
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue defaultValue={field.value?.toString()} placeholder="Select Attribute Value" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {variations.length > 0 ? (
                          variations.map((option, index) => {
                            return (
                              <SelectItem
                                key={`variation-${option.id}-${option.name}-${index}`}
                                value={option?.id ? option.id.toString() : ""}
                              >
                                {option.name}
                              </SelectItem>
                            )
                          })
                        ) : (
                          <p className="text-sm px-4">No variations Found</p>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AttributeModal
