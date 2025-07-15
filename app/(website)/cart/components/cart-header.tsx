"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface CartHeaderProps {
  totalItems: number
  selectedItems: number
  allSelected: boolean
  onSelectAll: (checked: boolean) => void
  onDeleteAll: () => void
}

export default function CartHeader({
  totalItems,
  selectedItems,
  allSelected,
  onSelectAll,
  onDeleteAll,
}: CartHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#EBEBEB]  text-custom-black">
      <div className="flex items-center gap-2">
        <Checkbox className="bg-white border-custom-black h-6 w-6"  checked={allSelected} onCheckedChange={onSelectAll} />
        <span className="text-sm font-medium">Select All ({totalItems})</span>
      </div>
      <Button variant="ghost" size="sm" onClick={onDeleteAll} className="text-red-600 hover:text-red-700">
        <X className="w-4 h-4 mr-1" />
        Delete All ({selectedItems})
      </Button>
    </div>
  )
}
