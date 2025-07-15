import React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/redux/hooks";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { handleError } from "@/lib/error-handler";
import {
  clearSelection,
  toggleRefetchTableData,
} from "@/redux/features/table-slice";

interface DeleteModalProps {
  itemName?: string;
  onDelete: () => Promise<void>;
  setIsOptionClick: (value: boolean) => void;
  isMultiple?: boolean;
  type?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  itemName = "This item",
  onDelete,
  setIsOptionClick,
  isMultiple = false,
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      await onDelete();

      dispatch(toggleRefetchTableData());
      if (isMultiple) {
        dispatch(clearSelection());
      }
      toast.success(`${itemName} has been successfully deleted!`);

      closeDialog();
    } catch (error) {
      handleError(error, toast);
    }
  };

  const closeDialog = () => {
    setIsOptionClick(false);
    document.getElementById("closeDialog")?.click();
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={() => setIsOptionClick(false)}>
      <DialogContent className="sm:w-[484px] rounded-t-lg  py-4 px-5 flex flex-col justify-between gap-3 bg-white">
        <DialogHeader className="pt-1 pb-4">
          <h1 className="text-textColor font-semibold text-2xl tracking-tight">
            Are you sure you want to delete?
          </h1>
        </DialogHeader>

        <p className="text-[13.4px] leading-[22px]">
          <span className="font-semibold">{itemName}</span> will be permanently
          deleted from the system. Do you want to delete?
        </p>

        <div className="flex justify-end pt-4 pb-2 gap-4">
          <DialogClose className="text-primary hover:text-red cursor-pointer">
            Cancel
          </DialogClose>
          <Button variant={"destructive"} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
