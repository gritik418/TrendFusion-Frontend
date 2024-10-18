"use client";

import { cva } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Separator } from "../ui/separator";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type SubItem = {
  href: string;
  title: string;
};

export interface SidebarNavItem {
  href?: string;
  title: string;
  icon: JSX.Element;
  subItems?: SubItem[];
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarNavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="w-[270px] flex flex-col max-h-max ">
      {items.map((item) => {
        if (item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${
                pathname === item.href
                  ? "bg-[var(--light-color)] text-[var(--secondary-color)]"
                  : "bg-white"
              } rounded-none`}
            >
              <div className="flex flex-col">
                <div className="flex gap-3 items-center px-5 py-4">
                  {item.icon}
                  <p className="text-lg text-gray-500 uppercase font-semibold">
                    {item.title}
                  </p>
                </div>
                {item.subItems &&
                  item.subItems.map((subItem: SubItem) => {
                    return (
                      <Link
                        href={subItem.href}
                        className={`${
                          pathname === subItem.href
                            ? "bg-[var(--light-color)] text-[var(--secondary-color)] font-semibold text-lg"
                            : "bg-white text-lg font-normal"
                        } flex pl-10 p-3 flex-col gap-3`}
                      >
                        <div>
                          <p>{subItem.title}</p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
              <Separator />
            </Link>
          );

        return (
          <div
            key={item.href}
            className={`${
              pathname === item.href
                ? "bg-[var(--light-color)] text-[var(--secondary-color)]"
                : "bg-white"
            } rounded-none cursor-pointer`}
          >
            <div className="flex flex-col">
              <div className="flex gap-3 items-center px-5 py-4">
                {item.icon}
                <p className="text-lg text-gray-500 uppercase font-semibold">
                  {item.title}
                </p>
              </div>
              {item.subItems &&
                item.subItems.map((subItem: SubItem) => {
                  return (
                    <Link
                      href={subItem.href}
                      className={`${
                        pathname === subItem.href
                          ? "bg-[var(--light-color)] text-[var(--secondary-color)] font-semibold text-lg"
                          : "bg-white text-lg font-normal"
                      } flex pl-10 p-3 flex-col gap-3`}
                    >
                      <div>
                        <p>{subItem.title}</p>
                      </div>
                    </Link>
                  );
                })}
            </div>
            <Separator />
          </div>
        );
      })}
    </nav>
  );
}
