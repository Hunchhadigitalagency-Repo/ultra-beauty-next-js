"use client";

import type React from "react";
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
  getItemId?: (item: T) => number;
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
  getItemId = (item: any) => item.id,
  striped = true,
}: TableProps<T>): JSX.Element => {

  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector((state) => state.table.selectedIds);

  const totalCols =
    cols.length + (hasSerialNo ? 1 : 0) + (enableBulkSelect ? 1 : 0);

  // Handle individual row selection
  const handleRowSelect = (itemId: number, checked: boolean) => {
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
    data.length > 0 &&
    selectedIds?.length === data.length &&
    data.every((item) => selectedIds.includes(getItemId(item)));

  const isIndeterminate =
    selectedIds.length > 0 &&
    !isAllSelected &&
    data.some((item) => selectedIds.includes(getItemId(item)));

  return (
    <div className="space-y-4">
      <div
        className={`relative overflow-x-auto ${height} rounded-md`}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="sticky top-0 bg-secondary z-10 border-b border-gray-200">
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
                <th className="px-4 text-gray py-3 font-medium text-sm text-left whitespace-nowrap">
                  S.N.
                </th>
              )}
              {cols.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-4 py-3 font-medium text-[13px] text-gray uppercase text-left whitespace-nowrap ${firstHeaderWidth && idx === 0 ? firstHeaderWidth : ""
                    } ${idx === cols.length - 1 && "text-right"} `}
                >
                  <div className="">{col.title}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={totalCols}>
                  <div className="space-y-4 pt-7">
                    {Array.from({ length: 5 }).map((_, rowIdx) => (
                      <div
                        key={rowIdx}
                        className="flex justify-between items-center"
                      >
                        {Array.from({ length: totalCols }).map((_, colIdx) => (
                          <Skeleton key={colIdx} className="w-[100px] h-10" />
                        ))}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={totalCols}>
                  <div className="flex items-center justify-center h-[300px]">
                    No Data Available!
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, rowIndex) => {
                const itemId = getItemId(item);
                const isSelected = selectedIds.includes(itemId);

                return (
                  <tr
                    key={rowIndex}
                    onClick={() => {
                      // Only trigger row click if not clicking on checkbox
                      if (onRowClick) {
                        onRowClick(item);
                      }
                    }}
                    className={`
                      ${onRowClick ? "cursor-pointer" : ""}
                      ${isSelected
                        ? "bg-blue-50"
                        : striped && rowIndex % 2 === 1
                          ? "bg-white"
                          : "bg-white"
                      }
                      hover:bg-[#FAFAFA] cursor-pointer border-t border-gray-200 first:border-t-0 text-sm
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
                        className={`px-4 py-3 ${!hasSerialNo && colIndex === 0
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
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;