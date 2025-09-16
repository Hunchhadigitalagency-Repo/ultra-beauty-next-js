"use client";

import Image from "next/image";
import { Result } from "@/types/product";
import { ArrowUpLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchBox from "../filter/search-box";
import { useAppSelector } from "@/redux/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useCallback, useState } from "react";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";

interface SearchModalprops {
    onClose?: () => void;
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

    const handleSearchValue = useCallback((value: string) => {
        setSearchTerm(value);
    }, []);

    const {
        data: products, loading
    } = useInfiniteFetch<Result>(path || "", "", searchTerm.toString(), "", isLoggedIn);


    return (
        <div className="flex flex-col items-center w-full gap-2 ">
            {/* Search Box */}
            <SearchBox
                placeholder="Find the Product of Your Choice"
                sendValue={handleSearchValue}
            />

            {/* Search Results */}
            <div className="w-full bg-white rounded-md">
                {loading ?
                    <ul className="rounded-md border space-y-2 overflow-y-auto divide-y divide-gray-100 h-[400px] lg:h-[350px] xl:h-[450px] p-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <li
                                key={i}
                                className="flex items-center justify-between px-2 py-3 border-gray-200"
                            >
                                <div className="flex items-center w-full gap-2 md:gap-3">
                                    <Skeleton className="w-12 h-12 rounded md:w-16 md:h-16" />
                                    <Skeleton className="w-full h-12 rounded md:h-16" />
                                </div>
                            </li>
                        ))}
                    </ul>
                    : searchTerm.length > 0 && (
                        products.length > 0 ? (
                            <ul className="rounded-md border space-y-2 overflow-y-auto divide-y divide-gray-100 h-[400px] lg:h-[350px] xl:h-[450px]">
                                {products.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between px-2 py-3 border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
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
                                            onClose?.();
                                        }}
                                            className="w-4 h-4 md:w-5 md:h-5 hover:shadow-md" />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex justify-center items-center border rounded  h-[400px] lg:h-[350px] xl:h-[450px]">
                                <p className="px-4 py-4 text-sm text-red md:text-base">
                                    No results found !
                                </p>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default SearchModal;
