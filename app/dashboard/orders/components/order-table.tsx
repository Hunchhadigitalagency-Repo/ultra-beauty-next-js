"use client";

import CustomTable from "@/components/common/table/custom-table";
import React from "react";
import { OrderConstants } from "./order-constants";
import { useAppDispatch } from "@/redux/hooks";

const OrderTable = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <CustomTable<any>
        cols={OrderConstants(dispatch)}
        data={[]}
        loading={false}
      />
    </div>
  );
};

export default OrderTable;
