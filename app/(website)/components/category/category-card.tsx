import React from "react";
import Image from "next/image";

interface CategoryCardProps {
    id: number;
    title: string;
    image: string | null;
    onCategoryClick?: (categoryId: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, onCategoryClick, id }) => {

    const handleCategoryClick = () => {
        if (onCategoryClick) {
            onCategoryClick(id);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full gap-4" onClick={handleCategoryClick}>
            <div className="relative w-full overflow-hidden rounded-lg cursor-pointer h-36 md:h-48 group">
                <Image
                    src={image || "/placeholder.png"}
                    alt={title || "Category image"}
                    fill
                    className="object-contain"
                />
            </div>
            <p className="text-sm font-medium text-center uppercase md:text-base">
                {title}
            </p>
        </div>
    );
};

export default CategoryCard;
