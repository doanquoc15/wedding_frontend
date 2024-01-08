"use client";
import { CustomChat, FacebookProvider } from "react-facebook";

export default function CustomChatMessage() {
  return (
    <FacebookProvider appId="3462593613958331" chatSupport>
      <CustomChat pageId="135217426340957"/>
    </FacebookProvider>
  );
}
