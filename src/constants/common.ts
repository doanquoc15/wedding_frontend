export const CookieKey = {
  accessToken: "accessToken",
  currentRoles: "CurrentRoles",
  previousUrl: "previousUrl",
  networkError: "networkError",
};

export const ROUTER = {
  FORBIDDEN: "/403",
};

export const WITHOUT_CONTENT = [
  "quan-tri",
  "dang-nhap",
  "dang-ky",
  "not-found",
];

export const Zone ={
  KHU_A:"KHU_A",
  KHU_B:"KHU_B",
  KHU_C:"KHU_C",
  KHU_D:"KHU_D",
  KHU_VIP:"KHU_VIP",
};

export const MENU_PAGE_SIZE = 6;

//Breadcrumb
export const HOME_BREADCRUMB = [
  {
    href: "/",
    name: "Trang chủ",
  },
];

export const INTRODUCTION_BREADCRUMB = [
  ...HOME_BREADCRUMB,
  {
    href: "/gioi-thieu",
    name: "Giới thiệu",
  },
];

export const MENU_BREADCRUMB = [
  ...HOME_BREADCRUMB,
  {
    href: "/menu",
    name: "Menu",
  },
];

export const SERVICE_BREADCRUMB = [
  ...HOME_BREADCRUMB,
  {
    href: "/dich-vu",
    name: "Dịch vụ",
  },
];
