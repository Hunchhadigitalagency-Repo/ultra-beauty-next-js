"use client";
import CustomTable from "@/components/common/table/custom-table";
import { useAppDispatch } from "@/redux/hooks";
import React from "react";
import { TransactionConstants } from "./transaction-constants";

const TransactionTable = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <CustomTable
        cols={TransactionConstants(dispatch)}
        data={[]}
        enableBulkSelect={true}
      />
    </div>
  );
};

export default TransactionTable;
