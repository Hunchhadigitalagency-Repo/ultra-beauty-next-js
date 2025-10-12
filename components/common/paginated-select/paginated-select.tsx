"use client";

import type React from "react";

import { useState, useEffect, useCallback, useRef } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { IPaginatedDropdown, IPaginatedDropdownData } from "@/types/dropdown";

interface PaginatedSelectProps {
  value?: string;
  onValueChange: (value: string, slug_name?: string) => void;
  placeholder?: string;
  fetchData: (page: number, search?: string) => Promise<IPaginatedDropdown>;
  className?: string;
}

export function PaginatedSelect({
  value,
  onValueChange,
  placeholder = "Select an option",
  fetchData,
  className,
}: PaginatedSelectProps) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IPaginatedDropdownData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);
  const [selectedItem, setSelectedItem] =
    useState<IPaginatedDropdownData | null>(null);
  const [initialLoad, setInitialLoad] = useState(false);

  const searchTimeoutRef = useRef<NodeJS.Timeout>(null);
  const commandListRef = useRef<HTMLDivElement>(null);

  const loadData = useCallback(
    async (page: number, search = "", append = false) => {
      setLoading(true);
      try {
        const response = await fetchData(page, search);

        let resultsToSet = response.results || response;

        if (page === 1 && !search && value && !append) {
          const selectedExists = response.results.some(
            (item) =>
              item?.id?.toString() === value ||

              item?.slug_name === value
          );

          if (!selectedExists && selectedItem) {
            // Add the selected item to the beginning of the results
            resultsToSet = [selectedItem, ...response.results];
          }
        }

        if (append) {
          // Deduplicate when appending new pages
          setData((prevData) => {
            const existingIds = new Set(prevData.map((item) => item.id));
            const newItems = resultsToSet.filter(
              (item) => !existingIds.has(item.id)
            );
            return [...prevData, ...newItems];
          });
        } else {
          setData(resultsToSet);
        }

        setCurrentPage(response.current_page);
        setHasMore(response.current_page < response.total_pages);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    },
    [fetchData, value, selectedItem]
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
        loadData(1, search, false);
      }, 300);
    },
    [loadData]
  );

  // Load more data for pagination
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadData(currentPage + 1, searchTerm, true);
    }
  }, [loading, hasMore, currentPage, searchTerm, loadData]);

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

  useEffect(() => {
    if (!initialLoad && value) {
      setInitialLoad(true);
      loadData(1, "", false);
    }

    if (open && !initialLoad) {
      setInitialLoad(true);
      loadData(1, "", false);
    }
  }, [open, initialLoad, loadData, value]);

  useEffect(() => {
    if (!open) {
      setInitialLoad(false);
      setData([]);
      setSearchTerm("");
      setCurrentPage(1);
      setHasMore(true);
    }
  }, [open]);

  useEffect(() => {
    if (value) {
      const item = data.find((item) => item.id.toString() === value || item?.slug_name?.toString() === value);

      if (item) {
        setSelectedItem(item);
      }
    } else {
      setSelectedItem(null);
    }
  }, [value, data]);

  const handleSelect = (selectedValue: string) => {
    const numericValue = Number.parseInt(selectedValue);
    const item = data.find((item) => item.id === numericValue);
    if (item) {
      setSelectedItem(item);
      onValueChange(item.id.toString(), item.slug_name?.toString());
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-10 w-full justify-between text-sm border-[#DADADA] rounded-sm p-[10px] font-normal bg-white",
            !selectedItem && "text-muted-foreground",
            className
          )}
        >
          {selectedItem ? selectedItem.user || selectedItem.name : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search..."
            value={searchTerm}
            onValueChange={handleSearch}
          />
          <CommandList
            ref={commandListRef}
            onScroll={handleScroll}
            className="max-h-60"
          >
            <CommandEmpty>
              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Loading...
                </div>
              ) : (
                "No results found."
              )}
            </CommandEmpty>
            <CommandGroup>
              {data?.map((item) => {
                return (
                  <CommandItem
                    key={item.id}
                    value={item.id.toString()}
                    onSelect={handleSelect}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 bg-pink-500",
                        selectedItem?.id === item.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={item.image} />
                      <AvatarFallback>{item.user?.charAt(0) || item?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="ml-3">{item.user || item.name}</span>
                  </CommandItem>
                )
              })}
              {loading && data?.length > 0 && (
                <div className="flex items-center justify-center py-2">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Loading more...
                  </span>
                </div>
              )}
              {!hasMore && data?.length > 0 && (
                <div className="py-2 text-center text-xs text-muted-foreground border-t">
                  Showing {data?.length} items
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
