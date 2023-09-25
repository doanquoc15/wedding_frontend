"use client";
import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@/stores/Providers";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import ProviderStore from "./context/ProviderStore";
import { ToastContainer } from "react-toastify";

function RootLayout({ children }: { children: React.ReactNode }) {
  const THEME = createTheme({
    typography: {
      fontFamily: "var(--font-primary)",
    },
  });
  
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider theme={THEME}>
            <ToastContainer />
            <ProviderStore>{children}</ProviderStore>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
export default RootLayout;
