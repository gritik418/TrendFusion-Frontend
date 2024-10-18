"use client";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#b2ccc2",
      main: "#6a9c89",
      dark: "#476b5e",
      contrastText: "#f0f5f3",
    },
    secondary: {
      light: "#79d2c6",
      main: "#16423c",
      dark: "#206057",
      contrastText: "#c6ece7",
    },
  },
});

const MuiProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiProvider;
