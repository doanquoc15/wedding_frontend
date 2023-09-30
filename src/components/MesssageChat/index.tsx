"use client";
import { FacebookProvider, CustomChat } from "react-facebook";

export default function CustomChatMessage() {
  return (
    <FacebookProvider appId="356231870419739">
      <CustomChat pageId="135217426340957" minimized={Boolean(true)} />
    </FacebookProvider>
  );
}
