import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface GenericModalProps {
    children: React.ReactNode;
    title: string;
    setIsOptionClick: (value: boolean) => void;
}

const GenericModal: React.FC<GenericModalProps> = ({
    children,
    title,
    setIsOptionClick,
}) => {
    const closeDialog = () => {
        setIsOptionClick(false);
        document.getElementById("closeDialog")?.click();
    };

    return (
        <Dialog defaultOpen={true} onOpenChange={closeDialog}>
            <DialogContent className="sm:w-[484px] rounded-t-lg py-4 px-5 flex flex-col justify-between gap-3 bg-white">
                <DialogTitle className="pt-1 pb-4">
                    <p className="text-foreground font-medium text-xl">{title}</p>
                </DialogTitle>

                {children}
            </DialogContent>
        </Dialog>
    );
};

export default GenericModal;
