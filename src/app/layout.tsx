import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Sky View",
    template: "%s | Sky View",
  },
  description: "Management services for your restaurant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <div>{children}
        </div>
      </body>
    </html>
  );
}
