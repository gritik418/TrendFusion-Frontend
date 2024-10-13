import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
  MenubarSeparator,
  MenubarShortcut,
  MenubarItem,
} from "../ui/menubar";
import { FaBoxOpen, FaHeart, FaUser, FaUserCircle } from "react-icons/fa";
import { RiShutDownLine } from "react-icons/ri";

const MenubarComponent = () => {
  return (
    <Menubar className="border-none cursor-pointer bg-gray-100">
      <MenubarMenu>
        <MenubarTrigger className="flex gap-2 text-lg border-none cursor-pointer">
          <FaUser /> Ritik
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="flex gap-2">
            <FaUserCircle /> Profile
          </MenubarItem>
          <MenubarItem className="flex gap-2">
            <FaBoxOpen /> Orders
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex gap-2">
            <FaHeart className="text-red-500" /> Wishlist
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex gap-2">
            <RiShutDownLine /> Logout
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MenubarComponent;
