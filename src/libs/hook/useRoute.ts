import Router from "next/navigation";

export const UseRoute = (path: string | object) => {
  Router.push(path);
};
