import { SidebarNav, SidebarNavItem } from "@/components/SidebarNav/SidebarNav";
import Navbar from "@/components/Navbar/Navbar";
import { Avatar } from "@mui/material";
import { FaHeart, FaUserAlt } from "react-icons/fa";
import { IoIosBasket } from "react-icons/io";
import { MdReviews } from "react-icons/md";
import { RiShutDownLine } from "react-icons/ri";

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Account",
    icon: <FaUserAlt className="text-lg text-blue-600" />,
    subItems: [
      {
        title: "Profile Information",
        href: "/account",
      },
      {
        title: "Manage Addresses",
        href: "/account/addresses",
      },
    ],
  },
  {
    title: "My Orders",
    icon: <IoIosBasket className="text-xl text-blue-600" />,
    href: "/orders",
  },
  {
    title: "My Wishlist",
    icon: <FaHeart className="text-lg text-blue-600" />,
    href: "/wishlist",
  },
  {
    title: "My Reviews",
    icon: <MdReviews className="text-xl text-blue-600" />,
    href: "/reviews",
  },
  {
    title: "Logout",
    icon: <RiShutDownLine className="text-xl text-blue-600" />,
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="min-h-screen relative">
      <Navbar />

      <div className="bg-[#eeeeee] p-5 pb-4 pt-10">
        <div className="bg-white space-y-6 mb-4 p-4 md:block">
          <div className="space-y-0.5 flex gap-3">
            <Avatar sizes="120px" className="h-16 w-16" />
            <div className="flex flex-col">
              <h2 className="text-lg">Hello,</h2>
              <p className="text-2xl font-bold">Ritik Gupta</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex bg-white">
            <SidebarNav items={sidebarNavItems} />
          </div>

          <div className="flex bg-white w-full p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
