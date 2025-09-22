"use client";
import PageHeader from "@/components/common/header/page-header";
import CustomTable from "@/components/common/table/custom-table";
// import { Button } from "@/components/ui/button";
// import { Download } from "lucide-react";
import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { CancelRequest } from "@/types/cancel";
import { ReturnRequestConstant } from "./components/return-request-constant";
import ReturnRequestDetails from "./components/return-request-details";
import { useReturnRequests } from "@/components/seeds/return-request";

const CancelRequestPage = () => {
  const dispatch = useAppDispatch();
  const [selectedRequest, setSelectedRequest] = useState<CancelRequest | null>(
    null
  );
  const { returnRequest, isLoading } = useReturnRequests();
  // const exportButton = (
  //   <Button
  //     variant="outline"
  //     className="text-orange-500 border-orange-500 bg-white hover:bg-orange-100"
  //   >
  //     <Download className="w-4 h-4 mr-2" />
  //     Export
  //   </Button>
  // );

  return (
    <div className="bg-white p-4 flex flex-col gap-4 h-full">
      <PageHeader
        type="Return Request"
        totalItems={returnRequest.length}
        searchPlaceholder="Search Products Name"
      // customButton={exportButton}
      />

      <CustomTable
        cols={ReturnRequestConstant(dispatch)}
        data={returnRequest as CancelRequest[]}
        loading={isLoading}
        height="h-auto"
        onRowClick={(row) => setSelectedRequest(row)}
      />

      {selectedRequest && (
        <ReturnRequestDetails
          data={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
};

export default CancelRequestPage;
