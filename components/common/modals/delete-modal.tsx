// import React from "react";

// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
// } from "@/components/ui/dialog";
// import { useAppDispatch } from "@/redux/hooks";

// import { Button } from "@/components/ui/button";

// import { toast } from "sonner";
// import { handleError } from "@/lib/error-handler";
// import {
//   clearSelection,
//   toggleRefetchTableData,
// } from "@/redux/features/table-slice";

// interface DeleteModalProps {
//   itemName?: string;
//   onDelete: () => Promise<void>;
//   setIsOptionClick: (value: boolean) => void;
//   isMultiple?: boolean;
//   type?: string;
// }

// const DeleteModal: React.FC<DeleteModalProps> = ({
//   itemName = "This item",
//   onDelete,
//   setIsOptionClick,
//   isMultiple = false,
// }) => {
//   const dispatch = useAppDispatch();

//   const handleDelete = async () => {
//     try {
//       await onDelete();

//       dispatch(toggleRefetchTableData());
//       if (isMultiple) {
//         dispatch(clearSelection());
//       }
//       toast.success(`${itemName} has been successfully deleted!`);

//       closeDialog();
//     } catch (error) {
//       handleError(error, toast);
//     }
//   };

//   const closeDialog = () => {
//     setIsOptionClick(false);
//     document.getElementById("closeDialog")?.click();
//   };

//   return (
//     <Dialog defaultOpen={true} onOpenChange={() => setIsOptionClick(false)}>
//       <DialogContent className="sm:w-[484px] rounded-t-lg  py-4 px-5 flex flex-col justify-between gap-3 bg-white">
//         <DialogHeader className="pt-1 pb-4">
//           <h1 className="text-textColor font-semibold text-2xl tracking-tight">
//             Are you sure you want to delete?
//           </h1>
//         </DialogHeader>

//         <p className="text-[13.4px] leading-[22px]">
//           <span className="font-semibold">{itemName}</span> will be permanently
//           deleted from the system. Do you want to delete?
//         </p>

//         <div className="flex justify-end pt-4 pb-2 gap-4">
//           <DialogClose className="text-primary hover:text-red cursor-pointer">
//             Cancel
//           </DialogClose>
//           <Button variant={"destructive"} onClick={handleDelete}>
//             Delete
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default DeleteModal;

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import {
  clearSelection,
  toggleRefetchTableData,
} from "@/redux/features/table-slice";
import { handleError } from "@/lib/error-handler";
import { ESecure } from "@/types/table";
import { check_access } from "@/lib/api/auth/auth-api";

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
  type = "",
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState<string>("");

  const is_need = ESecure[type] 

  const handleSecureDelete = async () => {
    try {
      setLoading(true);
      if (!password) throw new Error("Please enter your password");

      await check_access(password); 
      await handleDelete(); 
    } catch  {
      toast.error("Access denied");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await onDelete();

      dispatch(toggleRefetchTableData());
      if (isMultiple) {
        dispatch(clearSelection());
      }
      toast.success(`${itemName} has been successfully deleted!`);
      closeDialog();
    } catch (error) {
      handleError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  const closeDialog = () => {
    setIsOptionClick(false);
    document.getElementById("closeDialog")?.click();
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={() => setIsOptionClick(false)}>
      <DialogContent className="sm:w-[484px] rounded-t-lg py-4 px-5 flex flex-col justify-between gap-3 bg-white">
        <DialogHeader className="pt-1 pb-4">
          <h1 className="text-textColor font-semibold text-2xl tracking-tight">
            {is_need
              ? "Confirm Admin Access"
              : "Are you sure you want to delete?"}
          </h1>
        </DialogHeader>

        {is_need ? (
          <>
            <p className="text-[13.4px] leading-[22px]">
              To delete <b>{itemName}</b> from user management, please verify
              your password for access control.
            </p>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        ) : (
          <p className="text-[13.4px] leading-[22px]">
            <span className="font-semibold">{itemName}</span> will be
            permanently deleted from the system. Do you want to continue?
          </p>
        )}

        <div className="flex justify-end pt-4 pb-2 gap-4">
          <DialogClose className="text-primary hover:text-red cursor-pointer">
            Cancel
          </DialogClose>
          <Button
            variant="destructive"
            onClick={is_need ? handleSecureDelete : handleDelete}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner className="mr-2" />{" "}
                {is_need ? "Verifying..." : "Deleting..."}
              </>
            ) : is_need ? (
              "Verify & Delete"
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
