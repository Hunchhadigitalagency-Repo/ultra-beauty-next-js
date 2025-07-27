import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import SectionHeader from "../header/section-header";

interface GenericModalProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    titleClassName?: string;
    descriptionClassName?:string;
    setIsOptionClick: (value: boolean) => void;
}

const GenericModal: React.FC<GenericModalProps> = ({
    children,
    title,
    description,
    titleClassName,
    descriptionClassName,
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
                    <SectionHeader
                        title={title}
                        description={description}
                        titleClassName={titleClassName}
                        descriptionClassName={descriptionClassName}
                    />
                </DialogTitle>

                {children}
            </DialogContent>
        </Dialog>
    );
};

export default GenericModal;
