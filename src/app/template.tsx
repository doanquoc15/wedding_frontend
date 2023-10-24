"use client";

import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { ReactNode } from "react";

import Providers from "@/stores/Providers";
import Header from "@/pages/Header";
import NavBar from "@/pages/NavBar";
import Footer from "@/pages/Footer";
import CustomChatMessage from "@/components/MesssageChat";

import ProviderStore from "../context/ProviderStore";
import WithoutContent from "../context/WithoutContent";

function RootLayout({ children }: { children: ReactNode }) {
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
              <WithoutContent>
                <>
                  <Header />
                  <NavBar />
                </>
              </WithoutContent>
              <div className="py-8 px-9">{children}</div>
              <WithoutContent>
                <>
                  {/*<CustomChatMessage />*/}
                  <Footer />
                </>
              </WithoutContent>
            </ProviderStore>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
export default RootLayout;
