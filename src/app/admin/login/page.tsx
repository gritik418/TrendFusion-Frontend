"use client";
import { useAdminLoginMutation } from "@/features/api/admin/adminAuthApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { Bounce, toast } from "react-toastify";

const AdminLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [adminLogin] = useAdminLoginMutation();
  const router = useRouter();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async () => {
    setErrors({ email: "", password: "" });
    setLoading(true);
    const { data, error } = await adminLogin(loginData);
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
      router.push("/admin/dashboard");
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

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="flex shadow-md flex-col p-6 bg-white rounded-lg max-w-[480px] w-[90%]">
        <h1 className="text-3xl">Login</h1>

        <div className="flex flex-col mt-10 gap-8">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xl text-gray-500">
              Enter your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border-2 rounded-md py-2 px-2 focus:outline-[var(--secondary-color)]"
            />
            {errors.email && (
              <span className="text-red-500 text-sm font-normal">
                {errors.email}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-xl text-gray-500">
              Enter your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border-2 rounded-md py-2 px-2 focus:outline-[var(--secondary-color)]"
            />
            {errors.password && (
              <span className="text-red-500 text-sm font-normal">
                {errors.password}
              </span>
            )}
          </div>
        </div>

        <div className="flex my-10 items-center justify-center">
          <button
            onClick={handleLogin}
            className="bg-[var(--secondary-color)] py-2 text-white rounded-md px-6 text-2xl"
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
