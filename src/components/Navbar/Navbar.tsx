"use client";
import { selectCartCount } from "@/features/cart/cartSlice";
import { selectUser } from "@/features/user/userSlice";
import Image from "next/image";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import MenubarComponent from "../MenubarComponent/MenubarComponent";
import SearchBar from "../SearchBar/SearchBar";
import UserProvider from "../UserProvider/UserProvider";

const Navbar = () => {
  const user: User = useSelector(selectUser);
  const cartCount: number = useSelector(selectCartCount);

  return (
    <>
      <UserProvider>
        <span></span>
      </UserProvider>
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
            className="flex items-center relative text-lg gap-1 hover:bg-slate-50 transition-colors ease-in-out duration-300 py-1 px-3 rounded-md"
          >
            <IoCartOutline className="text-2xl" /> Cart
            {cartCount > 0 ? (
              <>
                {cartCount > 9 ? (
                  <div className="span h-5 w-5 rounded-full text-white flex items-center justify-center text-xs bg-[var(--secondary-color)] absolute top-0 left-6">
                    9+
                  </div>
                ) : (
                  <div className="span h-5 w-5 rounded-full text-white flex items-center justify-center text-xs bg-[var(--secondary-color)] absolute top-0 left-6">
                    {cartCount}
                  </div>
                )}
              </>
            ) : null}
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
              className="flex relative items-center text-lg gap-1 hover:bg-slate-50 transition-colors ease-in-out duration-300 py-1 px-3 rounded-md"
            >
              <IoCartOutline className="text-2xl" /> Cart
              {cartCount > 0 ? (
                <>
                  {cartCount > 9 ? (
                    <div className="span h-5 w-5 rounded-full text-white flex items-center justify-center text-xs bg-[var(--secondary-color)] absolute top-0 left-6">
                      9+
                    </div>
                  ) : (
                    <div className="span h-5 w-5 rounded-full text-white flex items-center justify-center text-xs bg-[var(--secondary-color)] absolute top-0 left-6">
                      {cartCount}
                    </div>
                  )}
                </>
              ) : null}
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
