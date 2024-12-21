"use client";
import { selectUser } from "@/features/user/userSlice";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaArrowCircleRight } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import AddPhoneNumber from "../AddPhoneNumber/AddPhoneNumber";
import { Separator } from "../ui/separator";

const CheckLogin = ({
  setActiveStep,
}: {
  setActiveStep: Dispatch<SetStateAction<number>>;
}) => {
  const user: User = useSelector(selectUser);
  const [showAddNumber, setShowAddNumber] = useState<boolean>(false);

  const checkDisabled = (): boolean => {
    if (!user._id) {
      return true;
    }
    if (!user.phoneNumber) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <h1 className="text-4xl mb-2">Login</h1>
      <Separator />

      {user._id && (
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-4 justify-between">
            <div className="flex flex-col md:flex-row md:gap-4">
              <p className="text-lg text-gray-400 font-semibold">Name </p>

              <p className="text-xl">
                {user.firstName} {user?.lastName || ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-between">
            <div className="flex flex-col md:flex-row md:gap-4">
              <p className="text-lg text-gray-400 font-semibold">Phone </p>
              {user.phoneNumber && !showAddNumber ? (
                <p className="text-xl">{user.phoneNumber}</p>
              ) : showAddNumber ? (
                <AddPhoneNumber />
              ) : (
                <p
                  onClick={() => setShowAddNumber(!showAddNumber)}
                  className="cursor-pointer bg-gray-200 gap-1 flex items-center justify-center py-1 px-3 rounded-md"
                >
                  <IoMdAdd /> Add
                </p>
              )}
            </div>

            <button
              onClick={() => {
                setShowAddNumber(!showAddNumber);
              }}
              className="flex items-center gap-1 bg-gray-200 py-1 px-2 rounded-md"
            >
              <CiEdit className="text-xl" />
            </button>
          </div>
        </div>
      )}

      {user._id && (
        <p className="text-xl text-green-700 font-semibold mt-6">
          Logged in as <span className="text-xl font-bold">Ritik</span>
        </p>
      )}

      {!user._id && (
        <div className="flex flex-col items-start">
          <Link
            href={"/login"}
            className="bg-[var(--secondary-color)] mt-10 text-white text-2xl py-2 px-6 rounded-md font-semibold"
          >
            Login
          </Link>
          <p className="mt-4 text-2xl">Please Login to continue.</p>
        </div>
      )}

      {user._id && (
        <div className="flex justify-end mt-8">
          <button
            disabled={checkDisabled()}
            className="rounded-full disabled:text-gray-400 text-green-700 z-10"
          >
            <FaArrowCircleRight
              onClick={() => setActiveStep(1)}
              className="text-4xl cursor-pointer"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckLogin;
