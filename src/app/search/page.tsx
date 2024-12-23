"use client";
import DetailedProductItem from "@/components/DetailedProductItem/DetailedProductItem";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";
import Navbar from "@/components/Navbar/Navbar";
import ProductItem from "@/components/ProductItem/ProductItem";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  searchProductsAsync,
  selectFilters,
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
  selectSearchProductLoading,
} from "@/features/product/productSlice";
import { Dispatch } from "@reduxjs/toolkit";

export type Filters = {
  brands: string[];
  categories: string[];
  colors: string[];
  size: string[];
};

export type FilterObject = {
  brand: string[];
  category: string[];
  color: string[];
  size: string[];
  min: number;
  max?: number;
  sortCriteria?: "price" | "rating";
  sortOrder?: "asc" | "desc";
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [filterQuery, setFilterQuery] = useState<string>("");
  const [filterOptions, setFilterOptions] = useState<FilterObject>({
    brand: [],
    category: [],
    color: [],
    size: [],
    min: 0,
  });
  const dispatch = useDispatch<Dispatch<any>>();
  const isLoading: boolean = useSelector(selectSearchProductLoading);
  const minPrice: number = useSelector(selectMinPrice);
  const maxPrice: number = useSelector(selectMaxPrice);
  const products = useSelector(selectProducts);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(
      searchProductsAsync({
        searchQuery: searchQuery + filterQuery,
        minPrice: filterOptions.min,
        maxPrice: filterOptions.max,
        sortCriteria: filterOptions.sortCriteria,
        sortOrder: filterOptions.sortOrder,
      })
    );
  }, [filterQuery, searchQuery, filterOptions]);

  return (
    <div>
      <Navbar />
      <FilterSidebar
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        setFilterQuery={setFilterQuery}
        maxPrice={maxPrice}
        minPrice={minPrice}
        filters={filters}
      >
        {searchQuery && (
          <h1 className="text-2xl font-normal mb-4">
            Showing results for:{" "}
            <span className="font-semibold"> {searchParams.get("q")}</span>
          </h1>
        )}

        <>
          {isLoading ? (
            <div className="h-[60%] w-full flex-col flex items-center justify-center">
              <Image
                src={"/images/loading.gif"}
                alt="loading"
                height={140}
                width={140}
              />
            </div>
          ) : (
            <>
              {products && products!.length > 0 ? (
                <>
                  <div className={`${styles.gridContainer} grid lg:hidden`}>
                    {products &&
                      products!.map((product: Product) => (
                        <ProductItem
                          product={product}
                          key={product.productId}
                        />
                      ))}
                  </div>

                  <div className="hidden grid-flow-row col-auto lg:flex m-6 gap-4 flex-wrap">
                    {products &&
                      products!.map((product: Product) => (
                        <DetailedProductItem
                          product={product}
                          key={product.productId}
                        />
                      ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col justify-center items-center h-[60%]">
                  <Image
                    src={"/images/no-product-found.png"}
                    alt="img"
                    height={180}
                    width={240}
                  />
                  <h2 className="text-2xl text-gray-600">
                    Sorry, no results found!
                  </h2>
                </div>
              )}
            </>
          )}
        </>
      </FilterSidebar>
    </div>
  );
};

export default SearchPage;
