
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-1">
      {/* full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <IoStar
          key={`star-full-${i}`}
          className="w-3 h-3 md:w-5 md:h-5 fill-orange text-orange"
        />
      ))}

      {/* half star */}
      {hasHalfStar && (
        <IoStarHalf
          key="star-half"
          className="w-3 h-3 md:w-5 md:h-5 fill-orange text-orange"
        />
      )}

      {/* empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <IoStarOutline
          key={`star-empty-${i}`}
          className="w-3 h-3 md:w-5 md:h-5 text-gray-300"    /* outline only */
          fill="none"
          stroke="currentColor"
        />
      ))}


    </div>
  )
}

export default RatingStars