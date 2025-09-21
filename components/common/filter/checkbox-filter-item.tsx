"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FilterItemProps {
  id: string
  label: string
  count?: number
  checked: boolean
  onChange: (checked: boolean) => void
}

export function CheckboxFilterItem({ id, label, count, checked, onChange }: FilterItemProps) {
  return (
    <div className="flex items-center justify-between">
      <Label
        className="flex items-center space-x-2 cursor-pointer"
        htmlFor={id}
      >
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(checked) => onChange(checked as boolean)}
        />
        <span className="text-xs sm:text-sm font-medium font-poppins text-muted-foreground">
          {label}
        </span>
      </Label>
      {
        count !== undefined &&
        <span className="text-xs text-muted-foreground">
          {count}
        </span>
      }
    </div>
  )
}
