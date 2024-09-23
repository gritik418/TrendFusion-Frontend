import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

const LoginPage = () => {
  return (
    <div className="">
      <Navbar />

      <div className="container p-3 m-auto mt-16 flex">
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <Image
            className="h-full"
            src={"/images/login.jpg"}
            height={400}
            width={500}
            alt="login image"
          />
        </div>

        <div className="w-full md:w-1/2 flex gap-5 flex-col justify-center px-4">
          <div className="flex flex-col items-center gap-2 mb-5">
            <Image
              src={"/images/logo.png"}
              height={80}
              width={130}
              alt="logo"
            />
            <h1 className="text-3xl sm:text-5xl font-bold text-[var(--secondary-color)]">
              Welcome Back
            </h1>
            <h2 className="text-lg sm:text-xl text-[var(--primary-color)]">
              Login to your account
            </h2>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-gray-500 text-lg">
              Enter your Email or Username
            </label>
            <input
              className="bg-slate-100 py-2 px-2 rounded-md outline-[var(--secondary-color)]"
              type="email"
              id="email"
              name="email"
              placeholder="Email or Username"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-gray-500 text-lg">
              Enter your Password
            </label>
            <div className="bg-slate-100 rounded-md relative">
              <input
                className="h-full w-full py-2 px-2 bg-transparent outline-[var(--secondary-color)] rounded-md"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
              <FaEye className="cursor-pointer absolute top-[50%] right-2 -translate-y-[50%] text-[var(--primary-color)] text-lg" />
            </div>
          </div>

          <button className="bg-[var(--secondary-color)] mt-6 text-white font-bold text-xl py-2 rounded-md">
            Login
          </button>

          <p className="text-center">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-lg font-bold text-[var(--secondary-color)]"
            >
              Create an account
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;