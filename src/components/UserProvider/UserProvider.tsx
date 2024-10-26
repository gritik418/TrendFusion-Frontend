"use client";
import { getUserAsync, selectUser } from "@/features/user/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const user: User | null = useSelector(selectUser);

  useEffect(() => {
    if (user && user._id) return;
    dispatch(getUserAsync());
  }, [dispatch]);

  return <div>{children}</div>;
};

export default UserProvider;
