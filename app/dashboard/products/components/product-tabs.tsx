"use client";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import ProductTabsTrigger from "./product-tabs-trigger";
import { useInfiniteFetchProducts } from "@/hooks/use-infinite-fetch-products";
import { ProductConstants } from "./products-constants";
import CustomTable from "@/components/common/table/custom-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { IDashboardProduct } from "@/types/product";
import { setCounts } from "@/redux/features/product-count";
import ProductDetailSlider from "./product-slider";
import { setselectedString } from "@/redux/features/authentication-slice";

const ProductTabs = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<IDashboardProduct | null>(null);
  const persistedCounts = useAppSelector((state) => state.products.count);

  const getActivePath = (tab: string) => {
    switch (tab) {
      case "all":
        return "/products";
      case "available":
        return "/products/?is_published=true";
      case "disabled":
        return "/products/?is_published=false";
      case "featured":
        return "/products/?is_Featured=true";
      default:
        return "/products";
    }
  };

  useEffect(() => {
    dispatch(setselectedString(activeTab));
  }, [activeTab, dispatch]);

  const { data, counts, loading, hasMore, fetchNext } =
    useInfiniteFetchProducts(getActivePath(activeTab));
  const scrollId = "infinite-scroll-container";

  useEffect(() => {
    if (counts && persistedCounts.total === 0) {
      dispatch(setCounts(counts));
    }
  }, [counts, dispatch, persistedCounts.total]);

  const handleRowClick = (product: IDashboardProduct) => {
    setSelectedProduct(product);
  };

  const handleCloseSlider = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap items-center h-full w-full gap-4">
          <ProductTabsTrigger value="all" count={persistedCounts.total} title="All" />
          <ProductTabsTrigger
            value="available"
            count={persistedCounts.available}
            title="Available"
          />
          <ProductTabsTrigger
            value="disabled"
            count={persistedCounts.disabled}
            title="Disabled"
          />
          <ProductTabsTrigger
            value="featured"
            count={persistedCounts.featured}
            title="Featured"
          />
        </TabsList>
        <TabsContent value={activeTab} className="w-full">
          <div id={scrollId} className="overflow-y-auto h-[calc(100vh-240px)]">
            <InfiniteScroll
              dataLength={data.length}
              next={fetchNext}
              hasMore={hasMore}
              loader={<InfiniteScrollLoader />}
              scrollableTarget={scrollId}
            >
              <CustomTable<any>
                cols={ProductConstants(dispatch)}
                data={data}
                loading={loading && data.length === 0}
                enableBulkSelect={true}
                getItemId={(product) => Number(product?.slug_name)}
                onRowClick={handleRowClick}
                height="h-auto"
                striped
              />
            </InfiniteScroll>
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Detail Slider */}
      <ProductDetailSlider
        data={selectedProduct}
        onClose={handleCloseSlider}
      />
    </>
  );
};

export default ProductTabs;