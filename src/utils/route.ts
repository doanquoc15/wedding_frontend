//get query by key
export const getQueryParam = (key: string) => {
  if (typeof window === "undefined")
    return;
  const url = new URL(window?.location?.href);
  return url.searchParams.get(key) || "";
};

//add query with key - value
export const addQueryParam = (key: string, value: string) => {
  if (typeof window === "undefined")
    return;
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, "", url.toString());
};

//add multiple queries
export const addQueryParams = (params: Object) => {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });
  window.history.pushState({}, "", url.toString());
};

//function add multiple query
export function addMultipleQueryParams(searchParams, params: Object) {

  // Lấy tất cả các query params hiện tại
  const currentParams = new URLSearchParams(searchParams.toString());

  // Cập nhật các query params mới
  Object.entries(params).forEach(([key, value]) => {
    // Nếu key đã có trên url thì cập nhật giá trị
    if (currentParams.has(key)) {
      currentParams.set(key, String(value));
    } else {
      // Nếu key chưa có trên url thì thêm mới
      currentParams.set(key, String(value));
    }

    // Nếu giá trị của key là null hoặc "" thì xóa key khỏi query
    if (value === null || value === "") {
      currentParams.delete(key);
    }
    window.history.pushState({}, "", `?${currentParams.toString()}`);
  });
}