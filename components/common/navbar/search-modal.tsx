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
    } = useInfiniteFetch<Result>(path || "", "16", "", "", isLoggedIn);

    return (
        <div className="absolute w-full z-50 top-full right-0 bg-white padding-y shadow-md mt-0 lg:mt-4">
            <div className="w-full flex flex-col gap-4 items-center">
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

                                        className="flex items-center justify-between py-3 px-2 focus:bg-pink-100 rounded-md hover:bg-white cursor-pointer hover:shadow-md focus:outline-none select-none"
                                    >
                                        <div className="flex items-center gap-1 md:gap-3">
                                            <div className="relative w-12 h-12 md:w-16 md:h-16">
                                                <Image
                                                    src={item.images[0]?.file}
                                                    alt={item.slug_name}
                                                    fill
                                                    className="rounded object-cover"
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
                            <p className="text-gray-500 text-sm">
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
