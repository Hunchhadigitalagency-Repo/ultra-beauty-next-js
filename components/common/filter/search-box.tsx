"use client";
import { X } from "lucide-react";
import {
  clearSearchQuery,
  setSearchQuery,
} from "@/redux/features/filter-slice";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/hooks";
import useDebounce from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

interface SearchBoxProps extends React.ComponentProps<typeof Input> {
  className?: string;
  placeholder?: string;
  searchBoxClassName?: string;
  iconClassName?: string;
  sendValue?: (value: string) => void;
}


const SearchBox = ({
  className,
  placeholder = "Search",
  iconClassName,
  sendValue,
  ...props
}: SearchBoxProps) => {

  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState("");
  const debouncedValue = useDebounce(searchInput, 500);


  useEffect(() => {
    const search = debouncedValue?.trim();
    dispatch(setSearchQuery(search));

    if (sendValue) {
      sendValue(search); // <-- lift debounced value to parent
    }
  }, [debouncedValue, dispatch, sendValue]);

  useEffect(() => {
    return () => {
      dispatch(clearSearchQuery());
    };
  }, [dispatch]);

  const handleClear = () => {
    setSearchInput("");

    dispatch(clearSearchQuery());
    if (sendValue) {
      sendValue(""); // also lift cleared value
    }
  };


  return (
    <div className="w-full">
      <div className="relative">
        <Input
          type="text"
          id="default-search"
          onChange={(e) => setSearchInput(e.target.value)}
          className={`block p-4 h-12 text-sm text-textColor bg-white border focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#EEEEEE] rounded-sm ${className}  pr-8`}
          placeholder={placeholder}
          value={searchInput}
          required
          {...props}
        />
        {
          searchInput ? (
            <Button
              variant="ghost"
              className="absolute inset-y-0 pr-3 end-0 hover:bg-transparent hover:text-black"
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
          )
        }
      </div>
    </div>
  );
};

export default SearchBox;
