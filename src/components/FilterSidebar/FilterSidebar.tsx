"use client";

import React from "react";
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
} from "@/components/ui/sidebar";
import { Minus, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarRail } from "@/components/ui/sidebar";
import CustomSidebarTrigger from "../CustomSidebarTrigger/CustomSidebarTrigger";
import PriceRangeSlider from "../PriceRangeSlider/PriceRangeSlider";

const filters = [
  {
    title: "Brand",
    items: [
      {
        title: "Installation",
      },
      {
        title: "Project Structure",
      },
    ],
  },
  {
    title: "Building Your Application",
    items: [
      {
        title: "Routing",
      },
      {
        title: "Data Fetching",
        isActive: true,
      },
      {
        title: "Rendering",
      },
      {
        title: "Caching",
      },
      {
        title: "Styling",
      },
      {
        title: "Optimizing",
      },
      {
        title: "Configuring",
      },
      {
        title: "Testing",
      },
      {
        title: "Authentication",
      },
      {
        title: "Deploying",
      },
      {
        title: "Upgrading",
      },
      {
        title: "Examples",
      },
    ],
  },
  {
    title: "API Reference",
    items: [
      {
        title: "Components",
      },
      {
        title: "File Conventions",
      },
      {
        title: "Functions",
      },
      {
        title: "next.config.js Options",
      },
      {
        title: "CLI",
      },
      {
        title: "Edge Runtime",
      },
    ],
  },
  {
    title: "Architecture",
    items: [
      {
        title: "Accessibility",
      },
      {
        title: "Fast Refresh",
      },
      {
        title: "Next.js Compiler",
      },
      {
        title: "Supported Browsers",
      },
      {
        title: "Turbopack",
      },
    ],
  },
  {
    title: "Community",
    items: [
      {
        title: "Contribution Guide",
        url: "#",
      },
    ],
  },
];

const FilterSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <Sidebar className="border-0 pt-[110px] md:pt-[60px]">
        <SidebarHeader>
          <h1 className="text-3xl mt-4 mb-6 font-semibold">Filters</h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <div className="border-b-2 px-2 pb-3 flex gap-3 text-gray-500 font-semibold flex-col">
                <SidebarMenuSubItem>Price</SidebarMenuSubItem>
                <PriceRangeSlider />
              </div>
              {filters.map((item, index) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={index === 1}
                  className="group/collapsible"
                >
                  <SidebarMenuItem className="border-b-2 pb-3 flex gap-3 text-gray-500 font-semibold flex-col">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {item.title}{" "}
                        <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                        <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.items?.length ? (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((item) => (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton asChild>
                                <p>{item.title}</p>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
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
