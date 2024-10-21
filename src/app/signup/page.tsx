"use client";
import { ChangeEvent, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useUserSignupMutation } from "@/features/api/authApi";
import EmailVerification from "@/components/EmailVerification/EmailVerification";
import { Bounce, toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const SignupPage = () => {
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [userSignup] = useUserSignupMutation();
  const [open, setOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<SignupErrors>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    confirmPassword: "",
    password: "",
  });
  const [signupData, setSignupData] = useState<SignupDataType>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const toggleShow = () => {
    setShow(!show);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSignup = async () => {
    setErrors({
      confirmPassword: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      username: "",
    });
    setEmail("");
    setLoading(true);
    const { data, error } = await userSignup(signupData);
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
      setOpen(true);
      setEmail(signupData.email);
      setSignupData({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        confirmPassword: "",
        password: "",
      });
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
    <>
      <Navbar />
      <div>
        <div className="container p-3 m-auto my-16 flex">
          <div className="hidden md:flex w-1/2 items-center justify-center">
            <Image
              className="h-full max-h-[550px]"
              src={"/images/signup.png"}
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
                Welcome!
              </h1>
              <h2 className="text-lg sm:text-xl text-[var(--primary-color)]">
                Create an account
              </h2>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="firstName" className="text-gray-500 text-lg">
                Enter your First Name
              </label>
              <input
                className="bg-slate-100 py-2 px-2 rounded-md outline-[var(--secondary-color)]"
                type="text"
                id="firstName"
                name="firstName"
                value={signupData.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm font-normal">
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="lastName" className="text-gray-500 text-lg">
                Enter your Last Name
              </label>
              <input
                className="bg-slate-100 py-2 px-2 rounded-md outline-[var(--secondary-color)]"
                type="text"
                id="lastName"
                name="lastName"
                value={signupData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm font-normal">
                  {errors.lastName}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-gray-500 text-lg">
                Enter your Email
              </label>
              <input
                className="bg-slate-100 py-2 px-2 rounded-md outline-[var(--secondary-color)]"
                type="email"
                id="email"
                name="email"
                value={signupData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm font-normal">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-gray-500 text-lg">
                Enter your Username
              </label>
              <input
                className="bg-slate-100 py-2 px-2 rounded-md outline-[var(--secondary-color)]"
                type="text"
                id="username"
                name="username"
                value={signupData.username}
                onChange={handleChange}
                placeholder="Username"
              />
              {errors.username && (
                <span className="text-red-500 text-sm font-normal">
                  {errors.username}
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
                  value={signupData.password}
                  onChange={handleChange}
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

            <div className="flex flex-col gap-1">
              <label
                htmlFor="confirmPassword"
                className="text-gray-500 text-lg"
              >
                Enter Confirm Password
              </label>
              <div className="bg-slate-100 rounded-md relative">
                <input
                  className="h-full w-full py-2 px-2 bg-transparent outline-[var(--secondary-color)] rounded-md"
                  type={show ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
                <span
                  onClick={toggleShow}
                  className="cursor-pointer text-xs absolute top-[50%] right-2 -translate-y-[50%] text-[var(--primary-color)] bg-white p-1 rounded-md font-medium"
                >
                  {show ? "HIDE" : "SHOW"}
                </span>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm font-normal">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button
              onClick={handleSignup}
              className="bg-[var(--secondary-color)] mt-6 text-white font-bold text-xl py-2 rounded-md"
            >
              {loading ? "Processing..." : "Signup"}
            </button>

            <p className="text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-lg font-bold text-[var(--secondary-color)]"
              >
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
      <EmailVerification email={email} open={open} setOpen={setOpen} />
    </>
  );
};

export default SignupPage;
