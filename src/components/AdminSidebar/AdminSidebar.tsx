"use client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { FaTshirt, FaUserCircle } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
} from "../ui/sidebar";

const data = [
  {
    label: "Menu",
    items: [
      {
        title: "Dashboard",
        isLink: true,
        icon: <MdSpaceDashboard className="text-xl" />,
        link: "/admin/dashboard",
      },
      {
        title: "Products",
        isLink: false,
        isActive: true,
        icon: <FaTshirt className="text-xl" />,
        subItems: [
          {
            title: "Products",
            link: "/admin/dashboard/products",
          },
          {
            title: "Add Product",
            link: "/admin/dashboard/products/add",
          },
        ],
      },
    ],
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        } as any
      }
      className="flex py-4 px-4 bg-gray-50 w-[var(--sidebar-width)] h-screen flex-col"
    >
      <Sidebar className="px-2">
        <div className="flex py-3 mb-4">
          <Image src={"/images/logo.png"} alt="logo" width={90} height={60} />
        </div>
        <SidebarContent>
          {data.map(({ items, label }) => (
            <SidebarGroup>
              <SidebarGroupLabel className="uppercase">
                {label}
              </SidebarGroupLabel>
              <SidebarMenu>
                {items.map((item) => {
                  if (item.isLink) {
                    return (
                      <Link href={item.link!}>
                        <SidebarMenuItem
                          className={`${
                            pathname === item.link
                              ? "bg-[var(--light-color)] hover:text-[var(--secondary-color)] text-[var(--secondary-color)] font-semibold text-lg"
                              : ""
                          } `}
                        >
                          <SidebarMenuButton
                            tooltip={item.title}
                            className={`${
                              pathname === item.link
                                ? "hover:text-[var(--secondary-color)]"
                                : ""
                            }`}
                          >
                            {item.icon as React.ReactNode}
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </Link>
                    );
                  }
                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={item.isActive}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon as React.ReactNode}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <a
                                    href={subItem.link}
                                    className={`${
                                      pathname === subItem.link
                                        ? "bg-[var(--light-color)] text-[var(--secondary-color)] font-semibold text-sm"
                                        : ""
                                    } `}
                                  >
                                    <span
                                      className={`${
                                        pathname === subItem.link
                                          ? "bg-[var(--light-color)] text-[var(--secondary-color)] font-semibold text-sm"
                                          : ""
                                      } `}
                                    >
                                      {subItem.title}
                                    </span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarGroup>
            <SidebarGroupLabel className="uppercase">Account</SidebarGroupLabel>
            <SidebarMenu>
              <Link href={"/admin/account"}>
                <SidebarMenuItem
                  className={`${
                    pathname === "/admin/account"
                      ? "bg-[var(--light-color)] hover:text-[var(--secondary-color)] text-[var(--secondary-color)] font-semibold text-lg"
                      : ""
                  } `}
                >
                  <SidebarMenuButton>
                    <FaUserCircle className="text-xl" /> Account
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>

              <Link href={"/admin/user"}>
                <SidebarMenuItem
                  className={`${
                    pathname === "/admin/user"
                      ? "bg-[var(--light-color)] hover:text-[var(--secondary-color)] text-[var(--secondary-color)] font-semibold text-lg"
                      : ""
                  } `}
                >
                  <SidebarMenuButton>
                    <HiUsers className="text-xl" /> Manage User
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BiLogOut className="text-3xl font-bold" /> Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
};

export default AdminSidebar;
