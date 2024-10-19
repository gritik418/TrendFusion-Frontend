import { Avatar, TextField } from "@mui/material";
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

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

const EditableProfileInformation = () => {
  return (
    <div className="flex w-full my-8 flex-col">
      <div className="flex justify-center w-full mb-8">
        <Avatar src="/images/avatar.jpeg" sizes="200px" className="h-52 w-52" />
      </div>

      <div className="flex w-full flex-col gap-8">
        <div className="flex gap-8 lg:gap-3 w-full flex-col lg:flex-row justify-between">
          <div className="flex flex-col w-full gap-1 lg:max-w-[50%]">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              className="w-full rounded-md focus:outline-none border-[var(--secondary-color)]"
              defaultValue={user.firstName}
            />
          </div>

          <div className="flex flex-col w-full gap-1 lg:max-w-[50%]">
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              className="w-full rounded-md focus:outline-none border-[var(--secondary-color)]"
              defaultValue={user.lastName}
            />
          </div>
        </div>

        <div className="flex gap-8 lg:gap-3  w-full flex-col lg:flex-row justify-between">
          <div className="flex flex-col w-full gap-1 lg:max-w-[50%]">
            <TextField
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              className="w-full rounded-md focus:outline-none border-[var(--secondary-color)]"
              defaultValue={user.email}
            />
          </div>

          <div className="flex flex-col w-full gap-1 lg:max-w-[50%]">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              className="w-full rounded-md focus:outline-none border-[var(--secondary-color)]"
              defaultValue={user.username}
            />
          </div>
        </div>

        <div className="flex gap-8 lg:gap-3  w-full flex-col lg:flex-row justify-between">
          <div className="flex flex-col w-full gap-1 lg:max-w-[50%]">
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              className="w-full rounded-md focus:outline-none border-[var(--secondary-color)]"
              defaultValue={user.phoneNumber}
            />
          </div>
        </div>

        <div className="flex gap-8 lg:gap-3  w-full justify-between flex-col">
          <label className="text-lg">Your Gender</label>

          <RadioGroup defaultValue="male" className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-end mt-3">
          <button className="text-2xl text-[var(--secondary-color)] py-2 px-6 rounded-md font-semibold">
            Cancel
          </button>
          <button className="bg-[var(--secondary-color)] text-2xl text-white py-2 px-6 rounded-md font-semibold">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditableProfileInformation;
