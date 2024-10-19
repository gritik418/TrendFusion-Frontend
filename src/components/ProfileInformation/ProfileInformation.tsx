import { Avatar } from "@mui/material";
import React from "react";

const user: User = {
  firstName: "John",
  lastName: "Doe",
  gender: "male",
  email: "john.doe@example.com",
  username: "johndoe123",
  phoneNumber: "+1234567890",

  avatar: "https://example.com/avatar.jpg",

  provider: "google",
  password: "securePassword123",
  verificationCode: "123456",
  verificationCodeExpiry: new Date(Date.now() + 3600000), // 1 hour from now
  addresses: [],
  wishlist: [],
  userRole: "customer",
  isVerified: true,
  orderHistory: [],
};

const ProfileInformation = () => {
  return (
    <div className="flex w-full my-8 flex-col">
      <div className="flex justify-center w-full mb-8">
        <Avatar src="/images/avatar.jpeg" sizes="200px" className="h-52 w-52" />
      </div>

      <div className="flex w-full flex-col gap-8">
        <div className="flex gap-8 lg:gap-3 w-full flex-col lg:flex-row justify-between">
          <div className="flex flex-col w-full gap-1 lg:max-w-[50%]">
            <p className="text-lg">First Name</p>
            <input
              readOnly
              className="w-full border-2 p-3 rounded-md focus:outline-none border-[var(--secondary-color)]"
              value={user.firstName}
            />
          </div>

          <div className="flex flex-col w-full gap-1 lg:max-w-[50%]">
            <p className="text-lg">Last Name</p>
            <input
              readOnly
              className="w-full border-2 p-3 rounded-md focus:outline-none border-[var(--secondary-color)]"
              value={user.lastName}
            />
          </div>
        </div>

        <div className="flex gap-8 lg:gap-3  w-full flex-col lg:flex-row justify-between">
          <div className="flex flex-col w-full gap-1 lg:max-w-[50%]">
            <p className="text-lg">Email Address</p>
            <input
              readOnly
              className="w-full border-2 p-3 rounded-md focus:outline-none border-[var(--secondary-color)]"
              value={user.email}
            />
          </div>

          <div className="flex flex-col w-full gap-1 lg:max-w-[50%]">
            <p className="text-lg">Username</p>
            <input
              readOnly
              className="w-full border-2 p-3 rounded-md focus:outline-none border-[var(--secondary-color)]"
              value={user.username}
            />
          </div>
        </div>

        <div className="flex gap-8 lg:gap-3  w-full flex-col lg:flex-row justify-between">
          <div className="flex flex-col w-full gap-1 lg:max-w-[50%]">
            <p className="text-lg">Phone Number</p>
            <input
              readOnly
              className="w-full border-2 p-3 rounded-md focus:outline-none border-[var(--secondary-color)]"
              value={user.phoneNumber}
            />
          </div>
        </div>

        <div className="flex gap-8 lg:gap-3  w-full justify-between flex-col">
          <p className="text-lg">Your Gender</p>

          <div className="flex gap-6">
            <div className="flex items-center gap-2 cursor-default">
              <span className="h-6 w-6 flex p-[2px] rounded-full border-2 border-gray-400">
                <span
                  className={`${
                    user.gender === "male" ? "bg-gray-400" : ""
                  } h-full rounded-full w-full`}
                ></span>
              </span>
              <p>Male</p>
            </div>

            <div className="flex items-center gap-2 cursor-default">
              <span className="h-6 w-6 flex p-[2px] rounded-full border-2 border-gray-400">
                <span
                  className={`${
                    user.gender === "female" ? "bg-gray-400" : ""
                  } h-full rounded-full w-full`}
                ></span>
              </span>
              <p>Female</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
