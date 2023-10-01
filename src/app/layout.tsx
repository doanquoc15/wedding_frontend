import { ReactNode } from "react";

import ClientComponent from "./context/ClientComponent";

export const metadata = {
  title: {
    default:"Sky View",
    template:"%s | Sky View"
  },
  description:"..."
};

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientComponent>
          {children}
        </ClientComponent>
      </body>
    </html>
  );
}
export default RootLayout;
