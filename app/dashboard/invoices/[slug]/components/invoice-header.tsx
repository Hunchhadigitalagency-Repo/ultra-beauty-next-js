"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { handleError } from "@/lib/error-handler";
import { toast } from "sonner";
import { updateInvoice } from "@/lib/api/invoices/invoice-api";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import AddModal from "@/components/common/modals/add-modal";
import { ETypes } from "@/types/table";
import ButtonLoader from "@/components/common/loader/button-loader";
import Link from "next/link";

interface InvoiceHeaderProps {
  invoiceId: number;
  status: string;
}

const invoiceStatusData = [
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "partialpaid", label: "Partial Paid" },
];

const allowedTransitions: Record<string, string[]> = {
  pending: ["pending", "partialpaid", "paid"],
  partialpaid: ["partialpaid", "paid"],
  paid: ["paid"],
};


export default function InvoiceHeader({ invoiceId, status }: InvoiceHeaderProps) {
  const dispatch = useAppDispatch();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isPending, setIsPending] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (isPending) return;
    setIsPending(true);

    try {
      const updatedStatus = await updateInvoice(invoiceId, newStatus);
      if (updatedStatus.status === 200) {
        toast.success("Invoice status updated successfully");
        dispatch(toggleRefetchTableData());
      }
      setCurrentStatus(newStatus);
    } catch (err) {
      handleError(err, toast);
    } finally {
      setIsPending(false);
    }
  };

  const displayedStatusLabel =
    invoiceStatusData.find((choice) => choice.value === currentStatus)?.label ||
    currentStatus;

  return (
    <div className="flex flex-col gap-6 mb-8 relative z-10 no-print">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-5 border-t border-b border-[#E7E6E6]">
        <p className="text-sm font-medium text-gray-700 mb-2 md:mb-0">
          Select  your Current Payment status and record it.
        </p>

        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex justify-start gap-1 w-auto"
                disabled={isPending}
              >
                {displayedStatusLabel}
                {isPending ? <ButtonLoader className="!w-4 !h-4" /> : ""}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {invoiceStatusData.map((choice) => {
                const isAllowed = allowedTransitions[currentStatus]?.includes(choice.value);

                return (
                  <DropdownMenuItem
                    key={choice.value}
                    onClick={() => isAllowed && handleStatusChange(choice.value)}
                    disabled={!isAllowed || isPending}
                    className="capitalize cursor-pointer"
                  >
                    {choice.label}
                  </DropdownMenuItem>
                );
              })}

            </DropdownMenuContent>
          </DropdownMenu>

          <AddModal type={ETypes.INVOICES} text="Record Transaction" className="bg-[#1477B4]" invoice_id={invoiceId} />
        </div>
      </div>

      {/* --- Row 2: Invoice ID + Print button --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Link
            href={"/dashboard/invoices"}
            className="flex items-center justify-center bg-primary rounded-full w-8 h-8 cursor-pointer hover:bg-sky-700"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </Link>

          <h1 className="text-base font-medium text-foreground">
            Invoice Id: <span className="font-semibold">{invoiceId}</span>
          </h1>
        </div>

        <Button
          onClick={() => window.print()}
          className="bg-orange hover:bg-orange-400 text-white"
        >
          Print Invoice
        </Button>
      </div>
    </div>
  );
}
