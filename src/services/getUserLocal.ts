import { LocalStorage } from "@/shared/config/localStorage";

export const getUserLocal = () => {
  const user = LocalStorage.get("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};