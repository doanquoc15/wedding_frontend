"use client";
import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { StylesProvider } from "@mui/styles";

import { themeCreator } from "./base";

export const ThemeContext = createContext((_themeName: string): void => {
});

const ThemeProviderWrapper = ({ children }) => {
  const [themeName, _setThemeName] = useState("PureLightTheme");

  useEffect(() => {
    const curThemeName =
      window.localStorage.getItem("appTheme") || "PureLightTheme";
    _setThemeName(curThemeName);
  }, []);

  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    window?.localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
