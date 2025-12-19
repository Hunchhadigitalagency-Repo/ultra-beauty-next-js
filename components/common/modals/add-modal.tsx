import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ETypes } from "@/types/table";
import TransactionForm from "@/app/dashboard/invoices/[slug]/components/record-transaction-form";

interface AddModalProps {
  type: string;
  text: string;
  className?: string;
  invoice_id?: number;
  disabled?: boolean;
}

const AddModal: React.FC<AddModalProps> = ({
  type,
  text,
  invoice_id,
  className,
  disabled = false,
}) => {
  const formComponentMap: Record<string, React.ReactNode> = {
    [ETypes.INVOICES]: (
      <TransactionForm initialData={null} invoice={invoice_id?.toString()} />
    ),
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={` flex items-center gap-1 hover:bg-yellow-600 border border-transparent hover:border-customBlack hover:text-white px-4 ${className}`}
        disabled={disabled}
        >
          <span className="text-sm font-light capitalize">{text}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[484px]  py-4 px-5 flex flex-col justify-between gap-3 bg-white">
        <DialogTitle className="hidden">Add Modal</DialogTitle>
        {formComponentMap[type] || <p>Form type not supported</p>}
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
