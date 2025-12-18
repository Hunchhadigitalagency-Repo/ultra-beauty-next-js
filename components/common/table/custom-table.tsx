"use client";

import React from "react";
import type { JSX } from "react";
import { Skeleton } from "../../ui/skeleton";
import { Checkbox } from "../../ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addSelectedItem,
  removeSelectedItem,
  toggleSelectAll,
} from "@/redux/features/table-slice";
import { Col } from "@/types/table";

interface TableProps<T> {
  cols: Col<T>[];
  data: T[];
  bordered?: boolean;
  hoverable?: boolean;
  striped?: boolean;
  isDark?: boolean;
  loading?: boolean;
  tableType?: string;
  isLog?: boolean;
  onRowClick?: (item: T) => void;
  height?: string;
  firstHeaderWidth?: string;
  hasSerialNo?: boolean;
  enableBulkSelect?: boolean;
  getItemId?: (item: T) => string;
  rowClass?: string;
  error?: any;
}

const CustomTable = <T,>({
  cols,
  data,
  onRowClick,
  loading = false,
  height = "h-[60vh]",
  firstHeaderWidth,
  hasSerialNo = false,
  enableBulkSelect = false,
  getItemId = (item: any) => item.slug_name || item.id,
  striped = true,
  rowClass,
}: TableProps<T>): JSX.Element => {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector((state) => state.table.selectedIds) || [];

  const totalCols =
    cols.length + (hasSerialNo ? 1 : 0) + (enableBulkSelect ? 1 : 0);

  const handleRowSelect = (itemId: string, checked: boolean) => {
    if (checked) {
      dispatch(addSelectedItem(itemId));
    } else {
      dispatch(removeSelectedItem(itemId));
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    const allIds = data.map((item) => getItemId(item));
    dispatch(toggleSelectAll(allIds));
  };

  // Check if all items are selected
  const isAllSelected =
    data?.length > 0 &&
    selectedIds?.length === data.length &&
    data.every((item) => selectedIds.includes(getItemId(item)));

  const isIndeterminate =
    selectedIds.length > 0 &&
    !isAllSelected &&
    data.some((item) => selectedIds.includes(getItemId(item)));

  if (loading) {
    // Show loading skeleton
    return (
      <div className="space-y-4 pt-7">
        {Array.from({ length: 5 }).map((_, rowIdx) => (
          <div key={rowIdx} className="flex justify-between items-center">
            {Array.from({ length: totalCols }).map((_, colIdx) => (
              <Skeleton key={colIdx} className="w-[100px] h-10" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        No Data Available!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className={`relative overflow-x-auto ${height} border border-gray-200 rounded-md`}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr
              className={`sticky z-10 border-b border-gray-200 ${
                rowClass ? rowClass : "bg-gray-100"
              }`}
            >
              {enableBulkSelect && (
                <th className="px-4 py-3 font-medium text-sm text-left whitespace-nowrap w-12">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all rows"
                    {...(isIndeterminate && { "data-state": "indeterminate" })}
                  />
                </th>
              )}
              {hasSerialNo && (
                <th className="px-4 py-3 font-medium text-sm text-left whitespace-nowrap">
                  S.N.
                </th>
              )}
              {cols.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-4 py-3 font-medium text-[13px] text-gray-600 uppercase text-left whitespace-nowrap ${
                    firstHeaderWidth && idx === 0 ? firstHeaderWidth : ""
                  } ${
                    idx === cols.length - 1 &&
                    typeof col.title === "string" &&
                    col.title?.toLowerCase().includes("action")
                      ? "text-right"
                      : ""
                  }`}
                >
                  <div className="">{col.title}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.map((item, rowIndex) => {
                const itemId = getItemId(item);
                const isSelected = selectedIds.includes(itemId);

                const rowBgClass =
                  rowClass && rowClass.includes("bg-none")
                    ? ""
                    : isSelected
                    ? "bg-blue-50"
                    : striped && rowIndex % 2 === 1
                    ? "bg-white"
                    : "bg-white";

                return (
                  <tr
                    key={rowIndex}
                    onClick={() => {
                      if (onRowClick) {
                        onRowClick(item);
                      }
                    }}
                    className={`
                      ${onRowClick ? "cursor-pointer" : ""}
                      ${rowClass}
                      ${rowBgClass}
                      hover:bg-gray-100/50 border-t border-gray-200 first:border-t-0 text-sm
                    `}
                  >
                    {enableBulkSelect && (
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) =>
                            handleRowSelect(itemId, checked as boolean)
                          }
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Select row ${rowIndex + 1}`}
                        />
                      </td>
                    )}
                    {hasSerialNo && (
                      <td className="px-4 py-3">{rowIndex + 1}</td>
                    )}
                    {cols.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className={`px-4 py-3 ${
                          !hasSerialNo && colIndex === 0
                            ? ""
                            : colIndex === cols.length - 1
                            ? ""
                            : "min-w-[120px]"
                        } ${colIndex === cols.length - 1 && "text-right"}`}
                      >
                        {col.render(item)}
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
