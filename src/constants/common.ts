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

export const Zone = {
  KHU_A: "KHU_A",
  KHU_B: "KHU_B",
  KHU_C: "KHU_C",
  KHU_D: "KHU_D",
  KHU_VIP: "KHU_VIP",
};

//format date

export const SHORT_DATE_TO_CALC_PROGRESS = "YYYY-M-D";
export const SHORT_DATE = "YYYY-MM-DD";
export const FORM_SHORT_DATE = "MMMM D, YYYY";
export const FORM_LONG_DATE = "dddd, MMMM D, YYYY";
export const LONG_DATE = "YYYY-MM-DD HH:mm:ss";
export const SHORT_TIME = "HH:mm";
export const LONG_TIME = "HH:mm:ss";
export const FORMAT_DATE = "Mon DD, YYYY";
export const FORMAT_DATE_MORE = "M DD, YYYY";
export const FORMAT_DATE_LESS = "MMM D";
export const FORM_SHORT_MONTH = "MMM D, YYYY";
export const FORM_SHORT_TABLE = "DD/MM/YYYY";
export const FORM_SHORT_TABLE_REVERT = "YYYY/MM/DD";
export const FORM_SHORT_TABLE_REVERT_EXPAND = "DD/MM/YYYY";
export const FORM_LONG_DATE_TABLE = "HH:mm, ddd D MMM, YYYY";
export const REQUEST_LONG_DATE = "MMM DD, YYYY";
export const DATE_CALENDAR_SHORT = "DD-MM-YYYY";
export const DATE_CALENDAR_SHORT_FORM = "MM/DD/YYYY";

export const vndToUsdExchangeRate = 0.000041;

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

export const GENDER_OPTIONS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

export const GENDER = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
};

export const GenderObjectLiteral = {
  MALE: "Nam",
  FEMALE: "Nữ",
  OTHER: "Khác",
};

export const PATH = {
  MANAGEMENT_USER: "/admin/users",
  MANAGEMENT_DISH: "/admin/dishes",
  MANAGEMENT_SERVICE: "/admin/services",
  MANAGEMENT_MENU_COMBO: "/admin/combo",
  MANAGEMENT_BOOKING: "/admin/booking",
  MANAGEMENT_TYPE: "/admin/type-dish",

  ACCOUNT: "/tai-khoan/thong-tin"
};
