import Cookies from "universal-cookie";
import { addMonths, addYears } from "date-fns";

import { CookieKey } from "@/constants/common";

const cookies = new Cookies();

export const CookiesStorage = {
  getCookieData(key: string) {
    return cookies.get(key);
  },
  setCookieData(key: string, data: any) {
    const currentTime = new Date();
    const expires = addMonths(currentTime, 1);
    cookies.set(key, data, { expires, path: "/" });
  },
  clearCookieData(key: string) {
    cookies.remove(key, { path: "/" });
  },

  getAccessToken() {
    return localStorage.getItem("accessToken");
  },

  setAccessToken(accessToken: string) {
    const currentTime = new Date();
    const expires = addYears(currentTime, 1);
    cookies.set(CookieKey.accessToken, accessToken, {
      path: "/",
      expires,
    });
  },
  clearAccessToken() {
    cookies.remove(CookieKey.accessToken, { path: "/" });
  },

  authenticated() {
    const accessToken = cookies.get(CookieKey.accessToken);
    return accessToken !== undefined;
  },
};
