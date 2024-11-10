import {
  Avatar,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";
import { IoImages } from "react-icons/io5";
import Image from "next/image";

const EditableProfileInformation = () => {
  const user: User = useSelector(selectUser);
  const [avatarPreview, setAvatarPreview] = useState<any>();
  const [avatar, setAvatar] = useState<any>();
  const [backgroudUpdateLoading, setBackgroudUpdateLoading] =
    useState<boolean>(false);
  const [updateUserInfoLoading, setUpdateUserInfoLoading] =
    useState<boolean>(false);
  const [userData, setUserData] = useState<{
    firstName: string;
    lastName?: string;
    username: string;
    phoneNumber?: string;
    gender: "male" | "female";
  }>({
    firstName: user.firstName,
    lastName: user.lastName || "",
    username: user.username,
    phoneNumber: user.phoneNumber || "",
    gender: user.gender || "male",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length! > 0) {
      var file = e.target?.files![0];
      setAvatar(e.target?.files![0]);
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
    }
  };

  const handleUpdateUserData = () => {
    setUpdateUserInfoLoading(!updateUserInfoLoading);
  };
  return (
    <div className="flex w-full my-8 flex-col">
      <div className="flex flex-col items-center justify-center w-full mb-8">
        <div className="relative mb-8">
          <Avatar
            className="h-52 w-52"
            sizes="200px"
            src={avatarPreview || user.avatar || ""}
          />
          <label
            htmlFor="background"
            className="cursor-pointer absolute bottom-1 right-2 h-[40px] w-[50px] rounded-lg grid place-items-center bg-gray-200"
          >
            <IoImages className="text-[#095699] text-2xl" />
          </label>
          <input
            onChange={handleChangeAvatar}
            type="file"
            id="background"
            className="hidden"
          />
        </div>

        <button className="bg-[var(--secondary-color)] h-9 flex items-center justify-center w-32 text-white py-1 rounded-md font-semibold">
          {backgroudUpdateLoading ? (
            <Image
              src={"/images/loader.gif"}
              alt="loading"
              height={30}
              width={30}
            />
          ) : (
            "Update Avatar"
          )}
        </button>
      </div>

      <div className="flex w-full mt-8 flex-col gap-8">
        <div className="flex gap-8 lg:gap-3 w-full flex-col lg:flex-row justify-between">
          <div className="flex flex-col w-full gap-1 lg:max-w-[50%]">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              name="firstName"
              onChange={handleChange}
              className="w-full rounded-md focus:outline-none border-[var(--secondary-color)]"
              defaultValue={userData.firstName}
            />
          </div>

          <div className="flex flex-col w-full gap-1 lg:max-w-[50%]">
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              name="lastName"
              onChange={handleChange}
              className="w-full rounded-md focus:outline-none border-[var(--secondary-color)]"
              defaultValue={userData.lastName}
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
              value={user.email}
            />
          </div>

          <div className="flex flex-col w-full gap-1 lg:max-w-[50%]">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              name="username"
              onChange={handleChange}
              className="w-full rounded-md focus:outline-none border-[var(--secondary-color)]"
              defaultValue={userData.username}
            />
          </div>
        </div>

        <div className="flex gap-8 lg:gap-3  w-full flex-col lg:flex-row justify-between">
          <div className="flex flex-col w-full gap-1 lg:max-w-[50%]">
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              onChange={handleChange}
              className="w-full rounded-md focus:outline-none border-[var(--secondary-color)]"
              defaultValue={userData.phoneNumber}
            />
          </div>
        </div>

        <div className="flex gap-8 lg:gap-3  w-full justify-between flex-col">
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Gender
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="gender"
              value={userData.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="flex justify-end mt-3">
          <button className="text-2xl text-[var(--secondary-color)] py-2 px-6 rounded-md font-semibold">
            Cancel
          </button>
          <button
            onClick={handleUpdateUserData}
            className="bg-[var(--secondary-color)] text-2xl text-white w-24 h-14 flex items-center justify-center rounded-md font-semibold"
          >
            {updateUserInfoLoading ? (
              <Image
                src={"/images/loader.gif"}
                alt="loading"
                height={30}
                width={30}
              />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditableProfileInformation;
