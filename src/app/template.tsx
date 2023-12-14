"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ReactNode } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
// eslint-disable-next-line import/order
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "../styles/globals.scss";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import Providers from "@/stores/Providers";
import ProviderStore from "@/context/ProviderStore";
import ThemeProviderWrapper from "@/theme/ThemeProvider";

function TemplateLayout({ children }: {
  children: ReactNode
}) {
  // @ts-ignore
  const THEME = createTheme({
    typography: {
      fontFamily: "var(--font-primary)",
      fontSize: 13
    },
  });

  return (
    <>
      <Providers>
        <ThemeProviderWrapper>
          <ThemeProvider theme={THEME}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <ToastContainer/>
              <ProviderStore>
                {children}
              </ProviderStore>
            </LocalizationProvider>
          </ThemeProvider>
        </ThemeProviderWrapper>
      </Providers>
    </>
  );
}

export default TemplateLayout;