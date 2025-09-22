'use client'
import { useInfiniteFetch } from '@/hooks/use-infinite-fetch';
import React from 'react'
import ProductsListDashboard from './components/products';
import { IProduct } from '@/types/product';
import { useAppSelector } from '@/redux/hooks';
import PageHeader from '@/components/common/header/page-header';
import { ScribbleProductCard } from '@/components/ui/product-scribble';
import OrderItems from './components/order-items';

const CreateOrderDashboard = () => {

    const { searchQuery } = useAppSelector(state => state.filter)
    const { data, loading } =
        useInfiniteFetch<IProduct>(`/products/?page_size=8`, "search_product", searchQuery);

    return (
        <>
            <main className='bg-white flex flex-col p-4'>
                <PageHeader
                    isSearch={true}
                    isCreateOrder={true}
                    headerPath='/dashboard/orders'
                    headerTitle='Create Order'
                />
                {
                    loading && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4 bg-white p-4">
                                <ScribbleProductCard />
                                <ScribbleProductCard />
                                <ScribbleProductCard />
                                <ScribbleProductCard />
                            </div>
                        </>
                    )
                }
                <ProductsListDashboard
                    products={data}
                />
                <OrderItems isShipping={false} />
            </main>
        </>
    )
}

export default CreateOrderDashboard