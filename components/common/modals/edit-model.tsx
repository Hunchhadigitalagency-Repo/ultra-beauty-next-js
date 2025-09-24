import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { ETypes } from "@/types/table";
import TransactionForm from "@/app/dashboard/invoices/[slug]/components/record-transaction-form";
import { useAppSelector } from "@/redux/hooks";

interface EditModalProps {
  type: string;
  setIsOptionClick: (value: boolean) => void;
}

const EditModal: React.FC<EditModalProps> = ({ type, setIsOptionClick }) => {
  const { selectedData } = useAppSelector((state) => state.authentication);

  const formComponentMap: Record<string, React.ReactNode> = {
    [ETypes.INVOICES] : <TransactionForm initialData={selectedData} />,
    [ETypes.TRANSACTIONS] : <TransactionForm initialData={selectedData} />,
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={() => setIsOptionClick(false)}>
      <DialogContent className="sm:w-[484px]  py-4 px-5 flex flex-col justify-between gap-3 bg-white">
        <DialogTitle className="hidden">Edit Modal</DialogTitle>
        {formComponentMap[type] || <p>Form type not supported</p>}
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;