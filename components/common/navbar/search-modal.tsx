"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Result } from "@/types/product";
import { ArrowUpLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchBox from "../filter/search-box";
import { useAppSelector } from "@/redux/hooks";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";

interface SearchModalprops {
    onClose: () => void;
}

const SearchModal: React.FunctionComponent<SearchModalprops> = ({ onClose }) => {

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const queryParams = new URLSearchParams();
    const { selectedCategories } = useAppSelector(state => state.category);
    const { isLoggedIn } = useAppSelector(state => state.authentication);

    if (selectedCategories.length > 0) {
        queryParams.append("category", selectedCategories.join(","));
    }

    if (searchTerm) {
        queryParams.append("search", searchTerm);
    }

    const path = `public-products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const handleSearchValue = (value: string) => {
        setSearchTerm(value);
    };

    const {
        data: products,
    } = useInfiniteFetch<Result>(path || "", "", searchTerm.toString(), "", isLoggedIn);

    return (
        <div className="absolute right-0 z-50 w-full mt-0 bg-white shadow-md top-full padding-y lg:mt-4">
            <div className="flex flex-col items-center w-full gap-4">
                {/* Search Box */}
                <SearchBox
                    placeholder="Find the Product of Your Choice"
                    searchBoxClassName='w-96 md:w-[500px] xl:w-[800px]'
                    sendValue={handleSearchValue}
                />

                {/* Search Results */}
                <div className="w-96 md:w-[500px] xl:w-[800px] bg-white max-h-[400px] overflow-y-auto">
                    {searchTerm.length > 0 && (
                        products.length > 0 ? (
                            <ul className="space-y-2">
                                {products.map((item, index) => (
                                    <li
                                        key={index}

                                        className="flex items-center justify-between px-2 py-3 rounded-md cursor-pointer select-none focus:bg-pink-100 hover:bg-white hover:shadow-md focus:outline-none"
                                    >
                                        <div className="flex items-center gap-1 md:gap-3">
                                            <div className="relative w-12 h-12 md:w-16 md:h-16">
                                                <Image
                                                    src={item.images[0]?.file}
                                                    alt={item.slug_name}
                                                    fill
                                                    className="object-cover rounded"
                                                />
                                            </div>
                                            <h1 className="text-sm font-medium">{item.name}</h1>
                                        </div>
                                        <ArrowUpLeft onClick={() => {
                                            router.push(`/shop/product/${item.slug_name}`);
                                            onClose();
                                        }}
                                            className="w-4 h-4 md:w-5 md:h-5 hover:shadow-md" />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">
                                No results found
                            </p>
                        )
                    )}
                </div>
            </div>
        </div >
    );
};

export default SearchModal;
