"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FaHeart, FaUserAlt } from "react-icons/fa";
import { IoIosBasket, IoIosSettings } from "react-icons/io";
import Link from "next/link";
import { MdReviews } from "react-icons/md";
import { RiShutDownLine } from "react-icons/ri";

const data = {
  navMain: [
    {
      title: "Account",
      isLink: false,
      url: "#",
      icon: <FaUserAlt className="text-lg text-[var(--secondary-color)]" />,
      isActive: true,
      items: [
        {
          title: "Profile Information",
          url: "/account",
        },
        {
          title: "Manage Addresses",
          url: "/account/addresses",
        },
      ],
    },
    {
      title: "My Orders",
      url: "/account/orders",
      isLink: true,
      icon: <IoIosBasket className="text-xl text-[var(--secondary-color)]" />,
    },
    {
      title: "My Wishlist",
      url: "/account/wishlist",
      isLink: true,
      icon: <FaHeart className="text-lg text-[var(--secondary-color)]" />,
    },
    {
      title: "My Reviews",
      url: "/account/reviews",
      isLink: true,
      icon: <MdReviews className="text-xl text-[var(--secondary-color)]" />,
    },
    {
      title: "Settings",
      url: "#",
      isActive: true,
      isLink: false,
      icon: (
        <IoIosSettings className="text-3xl text-[var(--secondary-color)]" />
      ),
      items: [
        {
          title: "Appearance",
          url: "/account/appearance",
        },
      ],
    },
    {
      title: "Logout",
      url: "#",
      isLink: true,
      icon: (
        <RiShutDownLine className="text-xl text-[var(--secondary-color)]" />
      ),
    },
  ],
};

export default function AppSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="mt-[110px] md:mt-[60px]">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex size-8 items-center justify-center bg-transparent text-sidebar-primary-foreground">
                    <Avatar className="size-10">
                      <Image
                        src="/images/avatar.jpeg"
                        alt=""
                        className="h-full w-full"
                        height={40}
                        width={40}
                      />
                    </Avatar>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate text-xs">Hello,</span>
                    <span className="truncate font-semibold">Ritik Gupta</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {data.navMain.map((item) => {
                if (item.isLink) {
                  return (
                    <Link href={item.url}>
                      <SidebarMenuItem
                        className={`${
                          pathname === item.url
                            ? "bg-[var(--light-color)] hover:text-[var(--secondary-color)] text-[var(--secondary-color)] font-semibold text-lg"
                            : ""
                        } `}
                      >
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={`${
                            pathname === item.url
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
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a
                                  href={subItem.url}
                                  className={`${
                                    pathname === subItem.url
                                      ? "bg-[var(--light-color)] text-[var(--secondary-color)] font-semibold text-sm"
                                      : ""
                                  } `}
                                >
                                  <span
                                    className={`${
                                      pathname === subItem.url
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
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex mt-3 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <main className="px-3 md:px-5 lg:px-7 pb-7 pt-3">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
