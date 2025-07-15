import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ETypes } from "@/types/table";
import TransactionForm from "@/app/dashboard/transactions/components/transaction-form";

interface AddModalProps {
  type: string;
  text: string;
  className?: string;
}

const AddModal: React.FC<AddModalProps> = ({ type, text, className }) => {
  const formComponentMap: Record<string, React.ReactNode> = {
    [ETypes.TRANSACTIONS]: <TransactionForm initialData={null} />,
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`h-[38px] flex items-center gap-1 hover:bg-transparent border border-transparent hover:border-customBlack hover:text-black px-4 ${className}`}
        >
          <span className="text-sm font-light capitalize">{text}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[484px] rounded-t-lg rounded-b-none py-4 px-5 flex flex-col justify-between gap-3">
        {formComponentMap[type] || <p>Form type not supported</p>}
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
