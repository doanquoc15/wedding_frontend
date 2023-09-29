"use client";
import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@/stores/Providers";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import ProviderStore from "./context/ProviderStore";
import { ToastContainer } from "react-toastify";
import Header from "@/pages/Header";
import NavBar from "@/pages/NavBar";

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
            <ProviderStore>
              <Header />
              <NavBar />
              <div>{children}</div>
            </ProviderStore>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
export default RootLayout;
