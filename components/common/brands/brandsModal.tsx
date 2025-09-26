import Image from 'next/image';
import { MyBrand } from '@/types/product';
import { useRouter } from 'next/navigation';
import SearchBox from '../filter/search-box'
import { Skeleton } from '@/components/ui/skeleton';
import React, { useCallback, useState } from 'react'
import { AlertCircle, ArrowUpLeft } from 'lucide-react';
import { useInfiniteFetch } from '@/hooks/use-infinite-fetch';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleBrands } from '@/redux/features/category-slice';

const BrandsModal = () => {

    const queryParams = new URLSearchParams();
    const [searchTerm, setSearchTerm] = useState("");
    const { isLoggedIn } = useAppSelector(state => state.authentication);


    const router = useRouter();

    if (searchTerm) {
        queryParams.append("search", searchTerm);
    }

    const path = `public-brands${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const {
        data: searchedBrandsData,
        loading
    } = useInfiniteFetch<MyBrand>(path || "", "", searchTerm.toString(), "", isLoggedIn);
    console.log(searchedBrandsData, "searched brand data")

    const handleSearchValue = useCallback((value: string) => {
        setSearchTerm(value);
    }, []);

    const shouldShowResults = searchTerm.length > 0;


    const dispatch = useAppDispatch();

    const handleBrandClick = (brandId: number) => {
        dispatch(toggleBrands({ id: brandId, checked: true }));
        router.push(`/shop`);
    }

    return (
        <div className='relative flex flex-col'>
            <SearchBox
                className='relative py-2 text-sm font-semibold rounded-sm md:text-xl lg:text-base md:mt-5 focus-visible:border-white-500'
                placeholder="Find the brand as your requirement"
                sendValue={handleSearchValue}
            />
            <div className='w-full absolute z-10 top-full'>
                {
                    shouldShowResults &&
                    (
                        loading ?
                            (
                                <ul className="rounded-md border space-y-2 overflow-y-auto divide-y divide-gray-100 h-[280px] lg:h-[350px] p-2">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center justify-between px-2 py-2 border-gray-200"
                                        >
                                            <div className="flex items-center w-full gap-2 md:gap-3">
                                                <Skeleton className="w-12 h-12 rounded md:w-16 md:h-16" />
                                                <Skeleton className="w-full h-12 rounded md:h-16" />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )
                            :
                            searchedBrandsData?.length === 0 ?
                                (
                                    <div className="flex justify-center items-center border rounded h-[350px] md:h-[280px] lg:h-[350px]">
                                        <p className="px-4 py-4 text-sm text-gray-400 md:text-base">
                                            No results found !
                                        </p>
                                    </div>
                                )
                                :
                                <ul className="bg-white rounded-md border space-y-2 overflow-y-auto divide-y divide-gray-100 h-[350px] md:h-[280px] lg:h-[350px]">
                                    {searchedBrandsData?.length > 0 ? searchedBrandsData?.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center justify-between px-2 py-2 border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                                        >
                                            <div className="flex items-center gap-1 md:gap-3">
                                                <div className="relative w-12 h-12 lg:w-16 lg:h-16">
                                                    <Image
                                                        src={item.brand_image}
                                                        alt={item.brand_name || 'Brand Image'}
                                                        fill
                                                        className="object-cover rounded"
                                                    />
                                                </div>
                                                <h1 className="text-sm font-medium">{item.brand_name}</h1>
                                            </div>
                                            <ArrowUpLeft onClick={() => handleBrandClick(item.id)}
                                                className="w-4 h-4 md:w-5 md:h-5" />
                                        </li>
                                    ))
                                        : (
                                            <div className="flex flex-col justify-center items-center border rounded  h-[350px] md:h-[280px] lg:h-[350px]">
                                                <AlertCircle className="w-8 h-8 text-gray-400 mb-2" />
                                                <p className="px-4 py-4 text-sm text-red md:text-base">
                                                    Oops! Something went wrong
                                                </p>
                                            </div>
                                        )
                                    }
                                </ul>
                    )
                }
            </div>
        </div >
    )
}

export default BrandsModal