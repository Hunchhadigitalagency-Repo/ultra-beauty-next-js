"use client";

import React, { useState } from "react";
import PageHeader from "@/components/common/header/page-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import InventoryTable from "./components/inventory-table";
import { ETypes } from "@/types/table";

const InventoryManagement = () => {
  const router = useRouter();
  const [dataLength, setDataLength]= useState<number>(0)
  const handleSelect = (option: string) => {
    switch (option) {
      case "purchase":
        router.push("/dashboard/inventory/purchase");
        break;
      case "damage":
        router.push("/dashboard/inventory/damage");
        break;
      case "return":
        router.push("/dashboard/inventory/purchase-return");
        break;
    }
  };

  // Dropdown Button for Manage
  const manageDropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Manage</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleSelect("purchase")}>
          Purchase
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelect("damage")}>
          Damage
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelect("return")}>
          Purchase Return
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // const exportButton = (
  //   <Button
  //     variant="outline"
  //     className="text-orange-500 border-orange-500 bg-white hover:bg-orange-100"
  //   >
  //     <Download className="w-4 h-4 mr-2" />
  //     Export
  //   </Button>
  // );
  
  const getDatalength = (length:number) => {
    setDataLength(length)
  }

  return (
    <div className="space-y-4 bg-white p-4">
      <PageHeader
        type={ETypes.INVENTORY}
        totalItems={dataLength}
        searchPlaceholder="Search by inventory products"
        isSearch={true}
        // hasBulkActions={true}
        customButton={
          <div className="flex gap-2">
            {/* {exportButton} */}
            {manageDropdown}
          </div>
        }
      />
      <InventoryTable setDatalength={getDatalength} />
    </div>
  );
};

export default InventoryManagement;
