"use client"
import DataCard from "@/components/common/cards/data-card";
import useFetchData from "@/hooks/use-fetch";
import { IStockOut } from "@/types/orders";
import Image from "next/image";
import React from "react";

export interface Results {
  results: IStockOut[];
}

const StockOutSection = () => {
  const { data: stockOut } = useFetchData<Results>("/stockout/", true);
  const stockOuts = stockOut?.results;
  return (
    <DataCard
      title="Stock Out"
      filter={
        <div className="rounded-full border bg-gray h-8 w-8 flex items-center justify-center">
          <span className="text-accent-foreground font-medium text-sm">{stockOuts?.length}</span>
        </div>
      }
      className="h-full"
    >
      <div className="space-y-4 h-[220px] overflow-y-auto">
        {stockOuts && stockOuts.length > 0 ? (
          stockOuts.map((item: any, index: number) => (
            <div className="flex items-center gap-10" key={index}>
              <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg?height=40&width=40"}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="font-sm text-sm text-foreground text-lg">{item.name}</span>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">✅ All items are in stock</p>
          </div>
        )}
      </div>

    </DataCard>
  );
};

export default StockOutSection;
