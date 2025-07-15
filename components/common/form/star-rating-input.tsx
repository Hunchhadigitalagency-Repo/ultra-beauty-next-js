"use client"

import { Star } from "lucide-react"
import { useState } from "react"

interface StarRatingProps {
  value: number
  onChange: (rating: number) => void
  maxRating?: number
}

export const StarRating = ({ value, onChange, maxRating = 5 }: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="flex items-center gap-1">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1
        const isActive = starValue <= (hoverRating || value)

        return (
          <button
            key={index}
            type="button"
            className="p-1 transition-colors hover:scale-110"
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => onChange(starValue)}
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                isActive ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-400"
              }`}
            />
          </button>
        )
      })}
      <span className="ml-2 text-sm text-muted-foreground">
        {value > 0 ? `${value} out of ${maxRating}` : "No rating"}
      </span>
    </div>
  )
}
