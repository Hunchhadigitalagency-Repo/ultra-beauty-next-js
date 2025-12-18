"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { updateOrderStatus } from "@/lib/api/order/order-apis";
import ConfirmModal from "./confirm-modal";

type Status = {
  id: number;
  name: string;
  primary_color: string;
  text_color: string;
  position: number
};

type OrderStatusDropdownProps = {
  currentStatus: Status;
  orderId: number;
};

const OrderStatusDropdown: React.FC<OrderStatusDropdownProps> = ({
  currentStatus,
  orderId,
}) => {

  const { orderStatusDropdown } = useAppSelector((state) => state.dropdown);
  const [selectedStatus, setSelectedStatus] = useState<Status>(currentStatus);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch();

  let formattedStatus: Status[] = [];

  if (orderStatusDropdown) {
    formattedStatus = [...orderStatusDropdown].sort(
      (a, b) => a.position - b.position
    );
  }
  const [pendingStatus, setPendingStatus] = useState<Status | null>(null);

  const handleSelect = (status: Status) => {
    if (status.id === selectedStatus.id) return;
    setPendingStatus(status);
    setOpen(true);
  };

  const confirmUpdate = async () => {
    if (!pendingStatus) return;
    setLoading(true);
    try {
      const res = await updateOrderStatus(orderId, pendingStatus.id);
      if (res.status === 201 || res.status === 200) {
        setSelectedStatus(pendingStatus);
        toast.success(`Order status updated to ${pendingStatus.name}`);
        dispatch(toggleRefetchTableData())
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("Failed to update order status");
    } finally {
      setLoading(false);
      setOpen(false);
      setPendingStatus(null);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <ConfirmModal
        is_reverse={pendingStatus && pendingStatus?.position < currentStatus.position}
        showConfirmModal={open}
        is_loading={loading}
        setShowConfirmModal={setOpen}
        onConfirm={confirmUpdate}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={loading}>
          <Button
            className="text-xs px-3 py-1 rounded-full capitalize flex items-center gap-1"
            style={{
              backgroundColor: selectedStatus?.primary_color,
              color: selectedStatus?.text_color,
              opacity: loading ? 0.6 : 1,
            }}
          >
            {selectedStatus?.name}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" onClick={(e) => e.stopPropagation()}>
          {formattedStatus?.map((status) => (
            <DropdownMenuItem
              key={status.id}
              onClick={() => handleSelect(status)}
              className="capitalize cursor-pointer"
            >
              <span
                style={{
                  padding: "4px 8px",
                }}
              >
                {status.name}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default OrderStatusDropdown;
