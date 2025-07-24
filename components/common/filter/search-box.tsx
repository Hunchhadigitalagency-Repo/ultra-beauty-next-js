"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useDebounce from "@/hooks/use-debounce";
import {
  clearSearchQuery,
  setSearchQuery,
} from "@/redux/features/filter-slice";

const SearchBox = ({
  className,
  placeholder = "Search",
  iconClassName
}: {
  className?: string;
  placeholder?: string;
  iconClassName?: string;
}) => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.filter);
  const [searchInput, setSearchInput] = useState(searchQuery || "");
  const debouncedValue = useDebounce(searchInput, 500);

  // Sync with Redux state
  useEffect(() => {
    setSearchInput(searchQuery || "");
  }, [searchQuery]);

  // Update Redux store with debounced value
  useEffect(() => {
    const search = debouncedValue?.trim();
    dispatch(setSearchQuery(search));
  }, [debouncedValue, dispatch]);

  const handleClear = () => {
    dispatch(clearSearchQuery());
    setSearchInput("");
  };

  useEffect(() => {
    return () => {
      dispatch(clearSearchQuery());
    };
  }, [dispatch]);

  return (
    <div className="lg:w-[400px]">
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <Input
          type="text"
          id="default-search"
          onChange={(e) => setSearchInput(e.target.value)}
          className={`block w-full min-w-[220px] lg:w-[400px] p-4 h-10 text-sm text-textColor bg-white border focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#414042] rounded-sm ${className}  pr-8`}
          placeholder={placeholder}
          value={searchInput}
          required
        />
        {searchInput ? (
          <Button
            variant="ghost"
            className="absolute inset-y-0 end-0 hover:bg-transparent hover:text-black pr-3"
            onClick={handleClear}
          >
            <X className={` ${iconClassName} h-4 w-4`} />
          </Button>
        ) : (
          <div className={`${iconClassName} absolute inset-y-0 end-0 flex items-center pr-3 pointer-events-none`}>
            <svg
              className="w-4 h-4 text-customBlack"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
