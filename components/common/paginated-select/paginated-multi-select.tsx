"use client";

import type React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { Search, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  IDropdownFilterOption,
  IPaginatedDropdown,
  IPaginatedDropdownData,
} from "@/types/dropdown";

interface PaginatedMultiSelectProps {
  selectedValues?: string[];
  onSelectionChange: (values: string[]) => void;
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

export function PaginatedMultiSelect({
  selectedValues = [],
  onSelectionChange,
  placeholder = "Search Products",
  fetchData,
  filterOptions = [],
  className,
  title = "Select Users",
}: PaginatedMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IPaginatedDropdownData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<IPaginatedDropdownData[]>(
    []
  );

  const searchTimeoutRef = useRef<NodeJS.Timeout>(null);
  // const commandListRef = useRef<HTMLDivElement>(null);

  // Load data with pagination, search, and filter
  const loadData = useCallback(
    async (page: number, search = "", filter = "", append = false) => {
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
        setTotalPages(response.total_pages);
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

  // Handle individual item selection
  const handleItemSelect = (itemId: string) => {
    const newSelection = selectedValues.includes(itemId)
      ? selectedValues.filter((id) => id !== itemId)
      : [...selectedValues, itemId];

    onSelectionChange(newSelection);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedValues.length === data.length && data.length > 0) {
      // Deselect all
      onSelectionChange([]);
    } else {
      // Select all visible items
      const allIds = data.map((item) => item.id.toString());
      onSelectionChange(allIds);
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

  const isAllSelected =
    data.length > 0 && selectedValues.length === data.length;
  const isIndeterminate =
    selectedValues.length > 0 && selectedValues.length < data.length;

  const selectedFilterLabel =
    filterOptions.find((f) => f.id === selectedFilter)?.name || "Filter";

  // Update selected items when selection or data changes
  useEffect(() => {
    if (selectedValues.length > 0) {
      const items = data.filter((item) =>
        selectedValues.includes(item.id.toString())
      );
      setSelectedItems(items);
    } else {
      setSelectedItems([]);
    }
  }, [selectedValues, data]);

  // Fetch selected items that might not be in current visible data
  const fetchSelectedItems = useCallback(async () => {
    if (selectedValues.length > 0) {
      try {
        // Get all selected items (you might need to modify your fetchData to accept specific IDs)
        const response = await fetchData(1, "", selectedFilter);
        const allItems = response.results;
        const items = allItems.filter((item) =>
          selectedValues.includes(item.id.toString())
        );
        setSelectedItems(items);
      } catch (error) {
        console.error("Error fetching selected items:", error);
      }
    }
  }, [selectedValues, selectedFilter, fetchData]);

  // Call fetchSelectedItems when component mounts if there are pre-selected values
  useEffect(() => {
    if (selectedValues.length > 0 && selectedItems.length === 0) {
      fetchSelectedItems();
    }
  }, [selectedValues, selectedItems.length, fetchSelectedItems]);

  return (
    <div className={cn("w-full ", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal bg-white border-gray-200 hover:bg-gray-50 min-h-[40px] h-auto py-2"
          >
            <div className="flex flex-col items-start w-full">
              {selectedItems.length > 0 ? (
                <div className="flex flex-wrap gap-1 w-full">
                  {selectedItems.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-1 bg-pink-100 text-pink-800 px-2 py-1 rounded-md text-xs"
                    >
                      <Avatar className="w-4 h-4">
                        <AvatarImage src={item.image || "/placeholder.svg"} />
                        <AvatarFallback className="bg-pink-200 text-pink-800 text-[10px]">
                          {item.name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate max-w-[80px]">{item.name}</span>
                    </div>
                  ))}
                  {selectedItems.length > 3 && (
                    <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                      +{selectedItems.length - 3} more
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-sm font-medium text-gray-900 mb-1">
                  {title}
                </span>
              )}
            </div>
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
                      className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 h-8"
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
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            {/* Select All Option */}
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) {
                        el.indeterminate = isIndeterminate;
                      }
                    }}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-pink-400 bg-white border-gray-300 rounded focus:ring-pink-400 focus:ring-2 accent-pink-400"
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Select All Users
                </span>
              </div>
            </div>

            {/* User List */}
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
                    onClick={() => handleItemSelect(item.id.toString())}
                  >
                    <input
                      type="checkbox"
                      checked={selectedValues.includes(item.id.toString())}
                      onChange={() => handleItemSelect(item.id.toString())}
                      className="w-4 h-4 text-pink-500 bg-white border-gray-300 rounded focus:ring-pink-500 focus:ring-2 accent-pink-500"
                    />
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={item.image || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                        {item.name?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-900 flex-1">
                      {item.name}
                    </span>
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
                  Showing {data.length} items • Page {currentPage} of{" "}
                  {totalPages}
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
