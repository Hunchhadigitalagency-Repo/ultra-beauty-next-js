"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2 } from "lucide-react";
import { handleDeleteMultipleData } from "@/lib/delete-data-utils";
import DeleteModal from "../modals/delete-modal";

interface BulkActionsProps {
  data: number[];
  type: string;
}

const BulkActions: React.FC<BulkActionsProps> = ({ data, type }) => {
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  if (data.length === 0) return null;

  const handleDeleteClick = (value: boolean) => {
    setIsDeleteClick(value);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-white"
          >
            Bulk Action
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          {/* <DropdownMenuItem
            onClick={onExport}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" /> Export Selected
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onArchive}
            className="flex items-center gap-2"
          >
            <Archive className="h-4 w-4" /> Archive Selected
          </DropdownMenuItem> */}

          <DropdownMenuItem
            onClick={() => handleDeleteClick(true)}
            className="flex items-center gap-2 text-red-600"
          >
            <Trash2 className="h-4 w-4" /> Delete Selected
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isDeleteClick && (
        <DeleteModal
          itemName={"All the selected items"}
          onDelete={() =>
            handleDeleteMultipleData(
              data,
              type
            )
          }
          setIsOptionClick={setIsDeleteClick}
        />
      )}
    </>
  );
};

export default BulkActions;
