"use client";
import Navbar from "@/components/Navbar/Navbar";
import { useUserLoginMutation } from "@/features/api/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Bounce, toast } from "react-toastify";

const LoginPage = () => {
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();
  const [errors, setErrors] = useState<LoginErrors>({
    identifier: "",
    password: "",
  });
  const [loginData, setLoginData] = useState<LoginDataType>({
    identifier: "",
    password: "",
  });

  const handleLogin = async () => {
    setErrors({ identifier: "", password: "" });
    setLoading(true);
    const { data, error } = await userLogin(loginData);
    setLoading(false);

    if (error) {
      const response = error as FetchBaseQueryError;
      if (response.status === "FETCH_ERROR") {
        toast.error("Check your internet.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return;
      }
      const errorResponse = response.data as AuthResponse;
      if (errorResponse?.errors) {
        setErrors(errorResponse.errors);
      } else {
        toast.error(errorResponse?.message, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      return;
    }
    if (data?.success) {
      router.push("/");
      toast.success(data?.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else if (data?.success && data.message) {
      toast.error(data?.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const toggleShow = () => {
    setShow(!show);
  };
  return (
    <div>
      <Navbar />

      <div className="container p-3 m-auto my-16 flex">
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
              name="identifier"
              placeholder="Email or Username"
              onChange={handleChange}
              value={loginData.identifier}
            />
            {errors.identifier && (
              <span className="text-red-500 text-sm font-normal">
                {errors.identifier}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-gray-500 text-lg">
              Enter your Password
            </label>
            <div className="bg-slate-100 rounded-md relative">
              <input
                className="h-full w-full py-2 px-2 bg-transparent outline-[var(--secondary-color)] rounded-md"
                type={show ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={loginData.password}
              />
              <span
                onClick={toggleShow}
                className="cursor-pointer text-xs absolute top-[50%] right-2 -translate-y-[50%] text-[var(--primary-color)] bg-white p-1 rounded-md font-medium"
              >
                {show ? "HIDE" : "SHOW"}
              </span>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm font-normal">
                {errors.password}
              </span>
            )}
          </div>

          <button
            onClick={handleLogin}
            className="bg-[var(--secondary-color)] mt-6 text-white font-bold text-xl py-2 rounded-md"
          >
            {loading ? "Processing..." : "Login"}
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
