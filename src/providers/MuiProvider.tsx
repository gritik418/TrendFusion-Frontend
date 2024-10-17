"use client";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const MuiProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiProvider;
