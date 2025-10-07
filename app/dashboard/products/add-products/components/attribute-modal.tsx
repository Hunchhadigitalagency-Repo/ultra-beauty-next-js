"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useFetchDropdown from "@/hooks/use-fetch-dropdown";
import type { IAttribute } from "@/types/Settings";
import { FormCombobox } from "@/components/common/form/form-combobox";
// import { useEffect, useState } from "react";

const attributeSchema = z.object({
  name: z.string().min(1, "Please select an attribute name"),
  value: z.string().min(1, "Please select an attribute value"),
});

type AttributeFormData = z.infer<typeof attributeSchema>;


interface AttMana {
  id: number ;
  value: string[]
}

interface AttributeModalProps {
  isOpen: boolean;
  currentVariantId?: number | null;
  existingVariants?: AttMana[];
  onClose: () => void;
  toDelete?: {
    id: number | null, name: string | null
  },
  onSave?: (data: {
    attribute: string;
    attribute_variant: string;
    attribute_name: string;
    variant_name: string;
  }) => void;
}


const AttributeModal = ({ isOpen, currentVariantId, onClose, onSave,  }: AttributeModalProps) => {
  const { data: attributes } = useFetchDropdown<IAttribute>(
    "/attribute/?pagination=false"
  );
  
  // const [selectedAttributes, setSelectedAttributes] = useState<AttMana[]>(existingVariants ?? []);
  
  
//   useEffect(() => {
//     setSelectedAttributes(existingVarian ts ?? [])
//   }, [existingVariants])

// console.log(selectedAttributes);


//   useEffect(() => {
//     if (toDelete?.id !== undefined) {
//       setSelectedAttributes((prev) =>
//         prev
//           .map((item) =>
//             item.id === toDelete.id
//               ? {
//                 ...item,
//                 value: item.value.filter(
//                   (val) =>
//                     (toDelete.name && val !== toDelete.name) ||
//                     (toDelete.id && val !== String(toDelete.id))
//                 ),
//               }
//               : item
//           )
//           .filter((item) => item.value.length > 0)
//       );
//     }
//   }, [toDelete]);


  const form = useForm<AttributeFormData>({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      name: "",
      value: "",
    },
  });



  const onSubmit = (data: AttributeFormData, event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const selectedAttribute = attributes?.find(
      (attr) => attr.id.toString() === data.name
    );
    const selectedVariation = selectedAttribute?.variations.find(
      (variation) => variation.id.toString() === data.value
    );

    if (selectedAttribute && selectedVariation && currentVariantId !== undefined) {
      onSave?.({
        attribute: data.name,
        attribute_variant: data.value,
        attribute_name: selectedAttribute.name,
        variant_name: selectedVariation.name,
      });

      // setSelectedAttributes((prev) => {
      //   console.log('this is that', prev);

      //   const existing = prev.find((item) => item.id === currentVariantId);

      //   if (existing) {
      //     return prev.map((item) =>
      //       item.id === currentVariantId
      //         ? {
      //           ...item,
      //           value: [...new Set([...item.value, selectedAttribute.name])],
      //         }
      //         : item
      //     );
      //   }

      //   return [
      //     ...prev,
      //     {
      //       id: currentVariantId,
      //       value: [selectedAttribute.name],
      //     },
      //   ];
      // });

    }

    form.reset();
    onClose();
  };


  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit((data) => onSubmit(data, event))(event);
  };

  // console.log('updating thing', selectedAttributes);


  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Attribute Management</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <FormCombobox
              form={form}
              name="name"
              label="Attribute Name"
              placeholder="Select an attribute"
              searchPlaceholder="Search Attribute Name..."
              options={
                attributes
                  // ?.filter((attribute) => {
                  //   const alreadySelected = selectedAttributes.some(
                  //     (attr) =>
                  //       attr.id === currentVariantId &&
                  //       attr.value.includes(attribute.name)
                  //   );
                  //   return !alreadySelected;
                  // })
                  .map((attribute) => ({
                    value: attribute.id.toString(),
                    label: attribute.name,
                  })) || []
              }

            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => {
                const selectedAttribute = form.watch("name");
                const variations =
                  attributes?.find(
                    (attribute) => attribute.id.toString() === selectedAttribute
                  )?.variations || [];
                return (
                  <FormItem>
                    <FormLabel>
                      ATTRIBUTE VALUE
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Attribute Value" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {variations.length > 0 ? (
                          variations.map((option, index) => (
                            <SelectItem
                              key={`variation-${option.id}-${index}`}
                              value={option.id.toString()}
                            >
                              {option.name}
                            </SelectItem>
                          ))
                        ) : (
                          <p className="text-sm px-4">No variations Found</p>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Save Button */}
            <div className="flex justify-end w-full">
              <Button
                type="submit"
                className="w-auto px-10 bg-black rounded-3xl hover:bg-gray-500"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AttributeModal;
