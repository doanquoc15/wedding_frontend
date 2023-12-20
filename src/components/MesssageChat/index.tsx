"use client";
import { CustomChat, FacebookProvider } from "react-facebook";

export default function CustomChatMessage() {
  return (
    <FacebookProvider appId="1528171267932881">
      <CustomChat pageId="135217426340957"/>
    </FacebookProvider>
  );
}
