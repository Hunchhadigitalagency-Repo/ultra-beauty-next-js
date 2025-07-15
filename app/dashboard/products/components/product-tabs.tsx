"use client";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { useState } from "react";
import ProductTabsTrigger from "./product-tabs-trigger";
import { useInfiniteFetchProducts } from "@/hooks/use-infinite-fetch-products";
import { ProductConstants } from "./products-constants";
import CustomTable from "@/components/common/table/custom-table";
import { useAppDispatch } from "@/redux/hooks";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductTabs = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<string>("all");
  const { data, counts, loading, hasMore, fetchNext } =
    useInfiniteFetchProducts(`/products/`);

  const scrollId = "infinite-scroll-container";

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-full w-full">
        <ProductTabsTrigger
          value="all"
          count={counts.total}
          title="All Products"
        />
        <ProductTabsTrigger
          value="available"
          count={counts.available}
          title="Available Products"
        />
        <ProductTabsTrigger
          value="disabled"
          count={counts.disabled}
          title="Disable Products"
        />
        <ProductTabsTrigger
          value="featured"
          count={counts.featured}
          title="Featured Products"
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
            <CustomTable
              cols={ProductConstants(dispatch)}
              data={data}
              loading={loading}
              enableBulkSelect={true}
              getItemId={(product) => product.id}
              height="h-auto"
              striped={true}
            />
          </InfiniteScroll>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
