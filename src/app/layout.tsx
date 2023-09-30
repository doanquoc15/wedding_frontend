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
import Footer from "@/pages/Footer";
import CustomChatMessage from "@/components/MesssageChat";
import Slider from "@/components/common/SliderBar";

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
              <Slider />
              <div className="py-8 px-9">{children}</div>
              <CustomChatMessage />
              <Footer />
            </ProviderStore>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
export default RootLayout;
