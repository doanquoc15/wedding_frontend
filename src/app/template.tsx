"use client";

import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { ReactNode , Suspense } from "react";

import Providers from "@/stores/Providers";
import Header from "@/pages/Header";
import NavBar from "@/pages/NavBar";
import Footer from "@/pages/Footer";
import CustomChatMessage from "@/components/MesssageChat";
import Slider from "@/components/common/SliderBar";

import ProviderStore from "./context/ProviderStore";
import WithoutContent from "./context/WithoutContent";

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
                  <Slider />
                </>
              </WithoutContent>
              <div className="py-8 px-9">{children}</div>
              <WithoutContent>
                <>
                  <CustomChatMessage />
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
