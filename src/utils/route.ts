export const getQueryParam = (key: string) => {
  if (typeof window !== "undefined") {
    const url = new URL(window?.location?.href);
    return url.searchParams.get(key) || "";
  }
  return null;
};
  
export const addQueryParam = (key: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, "", url.toString());
};
  