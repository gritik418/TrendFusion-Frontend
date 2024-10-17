import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { IoCartOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import MenubarComponent from "../MenubarComponent/MenubarComponent";

const Navbar = () => {
  return (
    <>
      <div className="h-[60px] shadow-lg hidden md:flex bg-white/65 backdrop-blur-sm sticky top-0">
        <div className="h-full container m-auto gap-6 flex items-center">
          <Link
            href={"/"}
            className="flex text-[var(--secondary-color)] text-xl font-bold"
          >
            <Image
              src={"/images/logo.png"}
              height={70}
              width={140}
              alt="logo"
            />
          </Link>
          <SearchBar />

          <MenubarComponent />

          <Link
            href={"/login"}
            className="flex items-center text-lg gap-1 hover:bg-slate-50 transition-colors ease-in-out duration-300 py-1 px-3 rounded-md"
          >
            <CiLogin className="text-2xl" /> Login
          </Link>
          <Link
            href={"/cart"}
            className="flex items-center text-lg gap-1 hover:bg-slate-50 transition-colors ease-in-out duration-300 py-1 px-3 rounded-md"
          >
            <IoCartOutline className="text-2xl" /> Cart
          </Link>
        </div>
      </div>

      <div className="h-[110px] py-2 shadow-lg flex-col flex md:hidden bg-white/65 backdrop-blur-sm sticky top-0">
        <div className="h-full px-3 container m-auto gap-6 justify-between flex items-center">
          <Link
            href={"/"}
            className="flex text-[var(--secondary-color)] text-xl font-bold"
          >
            <Image
              src={"/images/logo.png"}
              height={70}
              width={110}
              alt="logo"
            />
          </Link>

          <div className="flex gap-4">
            <MenubarComponent />
            <Link
              href={"/login"}
              className="flex items-center text-lg gap-1 hover:bg-slate-50 transition-colors ease-in-out duration-300 py-1 px-3 rounded-md"
            >
              <CiLogin className="text-2xl" /> Login
            </Link>
            <Link
              href={"/cart"}
              className="flex items-center text-lg gap-1 hover:bg-slate-50 transition-colors ease-in-out duration-300 py-1 px-3 rounded-md"
            >
              <IoCartOutline className="text-2xl" /> Cart
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <SearchBar />
        </div>
      </div>
    </>
  );
};

export default Navbar;
