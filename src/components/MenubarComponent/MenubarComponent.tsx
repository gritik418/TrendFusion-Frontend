"use client";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
  MenubarSeparator,
  MenubarItem,
} from "../ui/menubar";
import { FaBoxOpen, FaHeart, FaUser, FaUserCircle } from "react-icons/fa";
import { RiShutDownLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";

const MenubarComponent = () => {
  const router = useRouter();
  const user: User = useSelector(selectUser);

  return (
    <Menubar className="border-none cursor-pointer bg-gray-100">
      <MenubarMenu>
        <MenubarTrigger className="flex gap-2 text-lg border-none cursor-pointer">
          <FaUser /> {user.firstName}
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onClick={() => router.push("/account")}
            className="flex gap-2 cursor-pointer"
          >
            <FaUserCircle /> Profile
          </MenubarItem>
          <MenubarItem
            onClick={() => router.push("/account/orders")}
            className="flex gap-2 cursor-pointer"
          >
            <FaBoxOpen /> Orders
          </MenubarItem>
          <MenubarItem className="flex gap-2 cursor-pointer">
            <FaHeart className="text-red-500" /> Wishlist
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex gap-2 cursor-pointer">
            <RiShutDownLine /> Logout
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MenubarComponent;
