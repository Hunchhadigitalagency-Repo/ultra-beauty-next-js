"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

import { Dispatch, SetStateAction, } from "react";

interface ConfirmModalProps {
    showConfirmModal: boolean;
    is_reverse: boolean | null;
    is_loading: boolean;
    setShowConfirmModal: Dispatch<SetStateAction<boolean>>;
    onConfirm: () => void;
}

const ConfirmModal = ({
    showConfirmModal,
    is_reverse,
    is_loading,
    setShowConfirmModal,
    onConfirm,
}: ConfirmModalProps) => {
    return (
        <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{is_reverse ? "Reverse " : "Update"} the status of Order?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to {is_reverse ? "Reverse " : "Update"} the order status?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onConfirm} disabled={is_loading}>
                        {
                            is_loading ? <Spinner /> : "Yes "
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmModal;