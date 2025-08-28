import React from "react";
import Image from "next/image";

interface CategoryCardProps {
    title: string;
    image: string | null;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-2">
            <div className="relative w-full overflow-hidden rounded-lg cursor-pointer h-36 md:h-52 lg:h-64 group">
                <Image
                    src={image || "/placeholder.png"}
                    alt={title || "Category image"}
                    fill
                    className="object-cover"
                />
            </div>
            <p className="text-sm font-medium text-center uppercase sm:text-base">
                {title}
            </p>
        </div>
    );
};

export default CategoryCard;
