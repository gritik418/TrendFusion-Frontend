"use client";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import ProfileInformation from "@/components/ProfileInformation/ProfileInformation";
import EditableProfileInformation from "@/components/EditableProfileInformation/EditableProfileInformation";
import { FiEdit } from "react-icons/fi";

const Account = () => {
  const [isEditingMode, setIsEditingMode] = useState<boolean>(false);

  return (
    <div className="w-full">
      <div className="w-full mb-6">
        <h1 className="text-3xl mb-3">Personal Information</h1>
        <Separator />
      </div>

      <div className="flex items-center justify-end">
        <div
          onClick={() => setIsEditingMode(!isEditingMode)}
          className="flex bg-gray-200 items-center gap-2 py-1 px-3 rounded-md cursor-pointer font-semibold"
        >
          <FiEdit className="text-xl" />
          Edit
        </div>
      </div>

      {isEditingMode ? <EditableProfileInformation /> : <ProfileInformation />}
    </div>
  );
};

export default Account;
