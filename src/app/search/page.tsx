"use client";
import DetailedProductItem from "@/components/DetailedProductItem/DetailedProductItem";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";
import Navbar from "@/components/Navbar/Navbar";
import ProductItem from "@/components/ProductItem/ProductItem";
import { useSearchParams } from "next/navigation";
import React from "react";
import styles from "./Search.module.css";
import { useSearchProductsQuery } from "@/features/api/productApi";
import Image from "next/image";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const { data, isLoading } = useSearchProductsQuery(searchQuery);

  return (
    <div>
      <Navbar />
      <FilterSidebar>
        {searchQuery && (
          <h1 className="text-2xl font-normal mb-4">
            Showing results for:{" "}
            <span className="font-semibold"> {searchParams.get("q")}</span>
          </h1>
        )}

        <>
          {isLoading ? (
            <div className="h-full w-full flex-col flex items-center justify-center">
              <p>Loading...</p>
            </div>
          ) : (
            <>
              {data?.products && data.products!.length > 0 ? (
                <>
                  <div className={`${styles.gridContainer} grid lg:hidden`}>
                    {data &&
                      data.products!.map((product: Product) => (
                        <ProductItem
                          product={product}
                          key={product.productId}
                        />
                      ))}
                  </div>

                  <div className="hidden grid-flow-row col-auto lg:flex m-6 gap-4 flex-wrap">
                    {data &&
                      data.products!.map((product: Product) => (
                        <DetailedProductItem
                          product={product}
                          key={product.productId}
                        />
                      ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col justify-center items-center pt-10">
                  <Image
                    src={"/images/no-product-found.png"}
                    alt="img"
                    height={180}
                    width={240}
                  />
                  <h2 className="text-2xl text-gray-600">Product not found</h2>
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
