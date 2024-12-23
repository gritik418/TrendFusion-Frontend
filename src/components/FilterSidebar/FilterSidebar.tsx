"use client";
import { FilterObject, Filters } from "@/app/search/page";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Checkbox, FormControl, NativeSelect } from "@mui/material";
import { Minus, Plus } from "lucide-react";
import React, { ChangeEvent, Dispatch, useState } from "react";
import CustomSidebarTrigger from "../CustomSidebarTrigger/CustomSidebarTrigger";
import PriceRangeSlider from "../PriceRangeSlider/PriceRangeSlider";

const FilterSidebar = ({
  children,
  filters,
  minPrice,
  maxPrice,
  filterOptions,
  setFilterOptions,
  setFilterQuery,
}: {
  children: React.ReactNode;
  filters?: Filters;
  minPrice?: number;
  maxPrice?: number;
  filterOptions: FilterObject;
  setFilterOptions: Dispatch<React.SetStateAction<FilterObject>>;
  setFilterQuery: Dispatch<React.SetStateAction<string>>;
}) => {
  const [value, setValue] = useState("p-lth");
  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement>,
    value: string,
    type: string
  ) => {
    let q = filterOptions;
    if (e.target.checked) {
      if (type === "brands") {
        q.brand.push(value);
      }
      if (type === "categories") {
        q.category.push(value);
      }
      if (type === "colors") {
        q.color.push(value);
      }
      if (type === "size") {
        q.size.push(value);
      }
    } else {
      if (type === "brands") {
        q.brand = q.brand.filter((item: string) => {
          return item !== value;
        });
      }
      if (type === "categories") {
        q.category = q.category.filter((item: string) => {
          return item !== value;
        });
      }
      if (type === "colors") {
        q.color = q.color.filter((item: string) => {
          return item !== value;
        });
      }
      if (type === "size") {
        q.size = q.size.filter((item: string) => {
          return item !== value;
        });
      }
    }
    setFilterOptions(q);
    let query = "";

    q.brand.forEach((brand) => {
      query += `&brand=${brand}`;
    });
    q.category.forEach((category) => {
      query += `&category=${category}`;
    });
    q.color.forEach((color) => {
      query += `&color=${color}`;
    });
    q.size.forEach((size) => {
      query += `&size=${size}`;
    });

    setFilterQuery(query);
  };

  const handleClearFilters = () => {
    setFilterOptions({
      brand: [],
      category: [],
      color: [],
      size: [],
      min: 0,
    });
    setFilterQuery("");
  };

  const checkSelected = (item: string, value: string): boolean => {
    if (item === "brands") {
      if (filterOptions.brand.includes(value)) {
        return true;
      }
    }
    if (item === "categories") {
      if (filterOptions.category.includes(value)) {
        return true;
      }
    }
    if (item === "colors") {
      if (filterOptions.color.includes(value)) {
        return true;
      }
    }
    if (item === "size") {
      if (filterOptions.size.includes(value)) {
        return true;
      }
    }
    return false;
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    if (e.target.value.split("-")[0] === "p") {
      setFilterOptions((prev) => ({ ...prev, sortCriteria: "price" }));
    } else {
      setFilterOptions((prev) => ({ ...prev, sortCriteria: "rating" }));
    }
    if (e.target.value.split("-")[1] === "asc") {
      setFilterOptions((prev) => ({ ...prev, sortOrder: "asc" }));
    } else {
      setFilterOptions((prev) => ({ ...prev, sortOrder: "desc" }));
    }
  };

  return (
    <SidebarProvider>
      {filters && (
        <Sidebar className="border-0 pt-[110px] md:pt-[60px]">
          <SidebarHeader>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl mt-4 mb-6 font-semibold">Filters</h1>
              <p
                onClick={handleClearFilters}
                className="text-xs uppercase text-[var(--secondary-color)] font-bold cursor-pointer"
              >
                Clear all
              </p>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {typeof minPrice === "number" &&
                  typeof maxPrice === "number" && (
                    <div className="border-b-2 px-2 pb-3 mb-2 flex gap-3 text-gray-500 font-semibold flex-col">
                      <SidebarMenuSubItem>Price</SidebarMenuSubItem>
                      <div className="px-6">
                        <PriceRangeSlider
                          filterOptions={filterOptions}
                          setFilterOptions={setFilterOptions}
                          minPrice={minPrice}
                          maxPrice={maxPrice}
                        />
                      </div>
                    </div>
                  )}

                <div className="border-b-2 px-2 pb-3 mb-2 flex gap-3 text-gray-500 font-semibold flex-col">
                  <SidebarMenuSubItem>Sort</SidebarMenuSubItem>
                  <div className="px-6">
                    <FormControl
                      sx={{ minWidth: 140, width: "100%" }}
                      size="small"
                    >
                      <NativeSelect
                        variant="outlined"
                        className="w-full"
                        value={value}
                        defaultValue="p-asc"
                        onChange={handleSortChange}
                      >
                        <option value="p-asc">Price - Low to High</option>
                        <option value={"p-desc"}>Price - High to Low</option>
                        <option value={"r-asc"}>Rating - Low to High</option>
                        <option value={"r-desc"}>Rating - High to Low</option>
                      </NativeSelect>
                    </FormControl>
                  </div>
                </div>

                <>
                  {filters &&
                    Object.entries(filters).map((item: [string, string[]]) => (
                      <Collapsible
                        key={item[0]}
                        defaultOpen={true}
                        className="group/collapsible"
                      >
                        <SidebarMenuItem className="border-b-2 pb-3 flex gap-3 text-gray-500 font-semibold flex-col">
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                              {item[0].charAt(0).toUpperCase() +
                                item[0].slice(1)}{" "}
                              <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                              <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          {item[1]?.length ? (
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {item[1].map((subItem) => (
                                  <SidebarMenuSubItem key={subItem}>
                                    <SidebarMenuSubButton>
                                      <Checkbox
                                        onChange={(e) =>
                                          handleFilterChange(
                                            e,
                                            subItem,
                                            item[0]
                                          )
                                        }
                                        checked={checkSelected(
                                          item[0],
                                          subItem
                                        )}
                                        size="small"
                                      />
                                      <p>
                                        {subItem.charAt(0).toUpperCase() +
                                          subItem.slice(1)}{" "}
                                      </p>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          ) : null}
                        </SidebarMenuItem>
                      </Collapsible>
                    ))}
                </>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
      )}
      <SidebarInset>
        <header className="flex md:hidden h-16 shrink-0 items-center gap-2 px-4">
          <CustomSidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className="flex md:pt-8 flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default FilterSidebar;
