"use client";

import type React from "react";
import { useState, useEffect, useCallback, useRef } from "react";

import {
  IDropdownFilterOption,
  IPaginatedDropdown,
  IPaginatedDropdownData,
} from "@/types/dropdown";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search, Filter, Loader2, ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PaginatedProductSelectProps {
  selectedValues?: IPaginatedDropdownData[];
  onSelectionChange: (values: IPaginatedDropdownData[]) => void;
  placeholder?: string;
  fetchData: (
    page: number,
    search?: string,
    filter?: string
  ) => Promise<IPaginatedDropdown>;
  filterOptions?: IDropdownFilterOption[];
  className?: string;
  title?: string;
}

export default function PaginatedProductSelect({
  selectedValues = [],
  onSelectionChange,
  placeholder = "Search Products",
  fetchData,
  filterOptions = [],
  className,
  title = "Select Users",
}: PaginatedProductSelectProps) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IPaginatedDropdownData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState(false);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const loadData = useCallback(
    async (page: number, search = "", filter = "", append = false) => {
      console.log('loading the data');

      setLoading(true);
      try {
        const response = await fetchData(page, search, filter);

        if (append) {
          setData((prevData) => {
            const existingIds = new Set(prevData.map((item) => item.id));
            const newItems = response.results.filter(
              (item) => !existingIds.has(item.id)
            );
            return [...prevData, ...newItems];
          });
        } else {
          setData(response.results);
        }
        setCurrentPage(response.current_page);
        setHasMore(response.current_page < response.total_pages);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    },
    [fetchData]
  );

  // Handle search with debouncing
  const handleSearch = useCallback(
    (search: string) => {
      // console.log('thjis is search', search);

      setSearchTerm(search);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      searchTimeoutRef.current = setTimeout(() => {
        setCurrentPage(1);
        setHasMore(true);
        loadData(1, search, selectedFilter, false);
      }, 300);
    },
    [loadData, selectedFilter]
  );

  // Load more data for pagination
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadData(currentPage + 1, searchTerm, selectedFilter, true);
    }
  }, [loading, hasMore, currentPage, searchTerm, selectedFilter, loadData]);

  // Handle scroll to load more
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (
        scrollHeight - scrollTop <= clientHeight + 50 &&
        hasMore &&
        !loading
      ) {
        loadMore();
      }
    },
    [hasMore, loading, loadMore]
  );

  // Load initial data when component opens
  useEffect(() => {
    if (open && !initialLoad) {
      setInitialLoad(true);
      loadData(1, "", selectedFilter, false);
    }
  }, [open, initialLoad, loadData, selectedFilter]);

  // Reset when component closes
  useEffect(() => {
    if (!open) {
      setInitialLoad(false);
      setData([]);
      setSearchTerm("");
      setCurrentPage(1);
      setHasMore(true);
    }
  }, [open]);

  // Handle individual item selection (now using full objects)
  const handleItemSelect = (item: IPaginatedDropdownData) => {
    const exists = selectedValues?.some((s) => s.id === item.id);
    if (exists) {
      // remove
      onSelectionChange(selectedValues.filter((s) => s.id !== item.id));
    } else {
      // add
      onSelectionChange([...selectedValues, item]);
    }
  };

  // Handle select all (for visible page items)
  const areAllVisibleSelected =
    data.length > 0 &&
    data.every((d) => selectedValues.some((s) => s.id === d.id));

  const visibleSelectedCount = data.filter((d) =>
    selectedValues.some((s) => s.id === d.id)
  ).length;

  const isIndeterminate =
    visibleSelectedCount > 0 && visibleSelectedCount < data.length;

  const handleSelectAll = () => {
    if (data.length === 0) return;

    if (areAllVisibleSelected) {
      const newSelection = selectedValues.filter(
        (s) => !data.some((d) => d.id === s.id)
      );
      onSelectionChange(newSelection);
    } else {
      const merged = [
        ...selectedValues.filter((s) => !data.some((d) => d.id === s.id)),
        ...data,
      ];
      onSelectionChange(merged);
    }
  };

  // Handle filter selection
  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId);
    setFilterOpen(false);
    setCurrentPage(1);
    setHasMore(true);
    loadData(1, searchTerm, filterId, false);
  };

  const selectedFilterLabel =
    filterOptions.find((f) => f.id === selectedFilter)?.name || "Filter";

  return (
    <div className={cn("w-full ", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal bg-white border-gray-200 hover:bg-gray-50 h-9 py-2"
          >
            <div className="flex flex-col items-start w-full">
              {selectedValues.length > 0 ? (
                <div className="flex flex-wrap gap-1 w-full">
                  {/* Mobile → show only 2 */}
                  <div className="flex flex-wrap gap-1 w-full sm:hidden">
                    {selectedValues.slice(0, 2).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-1 bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-xs"
                      >
                        <Avatar className="w-4 h-4">
                          <AvatarImage src={item.image || "/placeholder.svg"} />
                          <AvatarFallback className="bg-orange-200 text-orange-800 text-[10px]">
                            {item.name?.charAt(0)?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate max-w-[80px]">{item.name}</span>
                      </div>
                    ))}
                    {selectedValues.length > 2 && (
                      <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                        +{selectedValues.length - 2} more
                      </div>
                    )}
                  </div>

                  {/* Larger screens → show 3 */}
                  <div className="hidden sm:flex flex-wrap gap-1 w-full">
                    {selectedValues.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-1 bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-xs"
                      >
                        <Avatar className="w-4 h-4">
                          <AvatarImage src={item.image || "/placeholder.svg"} />
                          <AvatarFallback className="bg-orange-200 text-orange-800 text-[10px]">
                            {item.name?.charAt(0)?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate max-w-[80px]">{item.name}</span>
                      </div>
                    ))}
                    {selectedValues.length > 3 && (
                      <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                        +{selectedValues.length - 3} more
                      </div>
                    )}
                  </div>
                </div>

              ) : (
                <span className="text-sm font-normal text-muted-foreground ">
                  {title}
                </span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[400px] p-0 bg-white border border-gray-200"
          align="start"
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">{title}</h3>
              {filterOptions.length > 0 && (
                <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 h-8"
                    >
                      <Filter className="w-3 h-3 mr-1" />
                      {selectedFilterLabel}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-1" align="end">
                    <div className="space-y-1">
                      {filterOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleFilterSelect(option.id)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-sm"
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            {/* Select All Option */}
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={areAllVisibleSelected}
                      ref={(el) => {
                        if (el) {
                          el.indeterminate = isIndeterminate;
                        }
                      }}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-red-500 bg-white border-gray-300 rounded focus:ring-red-500 focus:ring-2 accent-red-500"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    Selected Products List
                  </span>
                </div>

                <div className="flex items-center justify-center bg-[#EBEBEB] text-foreground rounded-sm size-8">
                  <span className="text-xs">({selectedValues.length})</span>
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="max-h-60 overflow-y-auto" onScroll={handleScroll}>
              {data.length === 0 && !loading ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No results found.
                </div>
              ) : (
                data.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                    onClick={() => handleItemSelect(item)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedValues.some((s) => s.id === item.id)}
                      onChange={() => handleItemSelect(item)}
                      className="w-4 h-4 text-red-600 bg-white border-gray-300 rounded focus:ring-red-600 focus:ring-2 accent-red-600"
                    />
                    <Avatar className="w-15 h-15 !rounded-lg">
                      <AvatarImage
                        src={item.image || "/placeholder.svg"}
                        className="rounded-lg"
                      />
                      <AvatarFallback className="bg-gray-200 text-gray-600 text-xs rounded-lg">
                        {item.name?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h5 className="text-sm text-foreground flex-1 text-ellipsis line-clamp-2">
                        {item.name}
                      </h5>
                      <span className="text-accent-foreground text-xs">
                        Product SKU:{" "}
                      </span>
                    </div>
                  </div>
                ))
              )}

              {loading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span className="text-sm text-gray-500">
                    {data.length > 0 ? "Loading more..." : "Loading..."}
                  </span>
                </div>
              )}

              {!hasMore && data.length > 0 && (
                <div className="py-3 text-center text-xs text-gray-500 border-t border-gray-100 mt-2">
                  Showing {data.length} items
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
