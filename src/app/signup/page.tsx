"use client";
import React, { ChangeEvent, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useUserSignupMutation } from "@/features/api/authApi";
import EmailVerification from "@/components/EmailVerification/EmailVerification";

const SignupPage = () => {
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userSignup] = useUserSignupMutation();
  const [open, setOpen] = useState<boolean>(false);
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
    setLoading(true);
    const { data, error } = await userSignup(signupData);
    setLoading(false);
    console.log(data, error);
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
      <EmailVerification open={open} setOpen={setOpen} />
    </>
  );
};

export default SignupPage;
