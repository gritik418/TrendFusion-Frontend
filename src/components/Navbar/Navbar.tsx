"use client";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { IoCartOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import MenubarComponent from "../MenubarComponent/MenubarComponent";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";

const Navbar = () => {
  const user: User = useSelector(selectUser);

  return (
    <>
      <div className="z-50 h-[60px] shadow-lg hidden md:flex bg-white/85 backdrop-blur-md sticky top-0">
        <div className="h-full container m-auto gap-6 flex items-center">
          <Link
            href={"/"}
            className="flex text-[var(--secondary-color)] text-xl font-bold"
          >
            <Image
              src={"/images/logo.png"}
              style={{ height: "auto" }}
              height={70}
              width={140}
              className="h-auto"
              alt="logo"
            />
          </Link>
          <SearchBar />

          {user._id && <MenubarComponent />}

          {!user._id && (
            <Link
              href={"/login"}
              className="flex items-center text-lg gap-1 hover:bg-slate-50 transition-colors ease-in-out duration-300 py-1 px-3 rounded-md"
            >
              <CiLogin className="text-2xl" /> Login
            </Link>
          )}
          <Link
            href={"/cart"}
            className="flex items-center text-lg gap-1 hover:bg-slate-50 transition-colors ease-in-out duration-300 py-1 px-3 rounded-md"
          >
            <IoCartOutline className="text-2xl" /> Cart
          </Link>
        </div>
      </div>

      <div className="z-50 h-[110px] py-2 shadow-lg flex-col flex md:hidden bg-white/85 backdrop-blur-md sticky top-0">
        <div className="h-full px-3 container m-auto gap-6 justify-between flex items-center">
          <Link
            href={"/"}
            className="flex text-[var(--secondary-color)] text-xl font-bold"
          >
            <Image
              src={"/images/logo.png"}
              height={70}
              style={{ height: "auto" }}
              width={110}
              className="h-auto"
              alt="logo"
            />
          </Link>

          <div className="flex gap-4">
            {user._id && <MenubarComponent />}

            {!user._id && (
              <Link
                href={"/login"}
                className="flex items-center text-lg gap-1 hover:bg-slate-50 transition-colors ease-in-out duration-300 py-1 px-3 rounded-md"
              >
                <CiLogin className="text-2xl" /> Login
              </Link>
            )}
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
