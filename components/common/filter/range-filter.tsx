"use client"
import { Input } from "@/components/ui/input"
import type React from "react"

import { Slider } from "@/components/ui/slider"
import { useState, useEffect } from "react"
import useDebounce from "@/hooks/use-debounce"

interface RangeFilterProps {
  title: string
  value: [number, number]
  min: number
  max: number
  step?: number
  formatValue?: (value: number) => string
  onChange: (value: [number, number]) => void
  debounceDelay?: number
}

export function RangeFilter({  title, value, min, max, step = 1, onChange, debounceDelay = 300 }: RangeFilterProps) {
  const [internalValue, setInternalValue] = useState<[number, number]>(value)
  const [inputValues, setInputValues] = useState<[string, string]>([value[0].toString(), value[1].toString()])


  const debouncedValue = useDebounce(internalValue, debounceDelay)


  useEffect(() => {
    setInternalValue(value)
    setInputValues([value[0].toString(), value[1].toString()])
  }, [value])

  
  useEffect(() => {
    if (debouncedValue[0] !== value[0] || debouncedValue[1] !== value[1]) {
      onChange(debouncedValue)
    }
  }, [debouncedValue, onChange, value])

  const handleSliderChange = (newValue: number[]) => {
    const clampedValue: [number, number] = [
      Math.max(min, Math.min(max, newValue[0])),
      Math.max(min, Math.min(max, newValue[1])),
    ]
    setInternalValue(clampedValue)
    setInputValues([clampedValue[0].toString(), clampedValue[1].toString()])
  }

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setInputValues([inputValue, inputValues[1]])


    const numValue = Number.parseFloat(inputValue)
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(min, Math.min(max, numValue))
      const finalValue = Math.min(clampedValue, internalValue[1])
      setInternalValue([finalValue, internalValue[1]])
    }
  }

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setInputValues([inputValues[0], inputValue])

    const numValue = Number.parseFloat(inputValue)
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(min, Math.min(max, numValue))
      const finalValue = Math.max(clampedValue, internalValue[0])
      setInternalValue([internalValue[0], finalValue])
    }
  }

  const handleInputBlur = (index: 0 | 1) => {
    const newInputValues: [string, string] = [...inputValues]
    newInputValues[index] = internalValue[index].toString()
    setInputValues(newInputValues)
  }

  return (
    <div className="space-y-4 mt-4">
      <h4 className="text-sm font-medium">{title}</h4>
      <div className="space-y-4">
        <Slider
          value={internalValue}
          onValueChange={handleSliderChange}
          max={max}
          min={min}
          step={step}
          className="w-full"
        />
        <div className="flex justify-between items-center gap-2 text-sm text-custom-black">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Min:</span>
            <Input
              type="number"
              value={inputValues[0]}
              onChange={handleMinInputChange}
              onBlur={() => handleInputBlur(0)}
              min={min}
              max={max}
              step={step}
              className="w-20 h-8 text-xs"
            />
          </div>
          <span className="text-gray-400">-</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Max:</span>
            <Input
              type="number"
              value={inputValues[1]}
              onChange={handleMaxInputChange}
              onBlur={() => handleInputBlur(1)}
              min={min}
              max={max}
              step={step}
              className="w-20 h-8 text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
