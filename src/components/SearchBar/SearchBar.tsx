"use client";
import {
  getSuggestionsAsync,
  selectSuggestions,
} from "@/features/product/productSlice";
import { Dispatch } from "@reduxjs/toolkit";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { TfiSearch } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const items: string[] = useSelector(selectSuggestions);
  const dispatch = useDispatch<Dispatch<any>>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowOptions(true);
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (searchQuery.length > 2) {
        dispatch(getSuggestionsAsync(searchQuery));
      }
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [searchQuery, dispatch]);

  return (
    <div className="flex flex-col w-full relative">
      <div className="flex bg-blue-50 py-1 px-4 items-center rounded-md gap-2 w-full">
        <TfiSearch className="text-xl text-gray-500" />

        <input
          onClick={() => setShowOptions(!showOptions)}
          type="text"
          onChange={handleChange}
          className="text-lg hover:outline-none hover:border-none border-b-0 bg-transparent text-gray-700 w-full outline-none"
          placeholder="Search for Products, Brands and More"
        />
      </div>
      {showOptions && items?.length > 0 && (
        <div className="flex flex-col py-3 px-1 gap-1 overflow-scroll max-h-60 shadow-md absolute w-full top-full bg-white rounded-md">
          {items.map((item: string) => (
            <Link
              key={item}
              onClick={() => setShowOptions(false)}
              href={`/search?q=${item}`}
              className="hover:bg-blue-50 p-2 rounded-md"
            >
              <p>{item}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
