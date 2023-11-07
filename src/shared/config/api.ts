import { isNil } from "lodash";
import { camelizeKeys } from "humps";

import { stringifyParams } from "@/utils/api";
import { CookieKey, ROUTER } from "@/constants/common";
import { ROUTE } from "@/constants/route";

import axios from "./axiosClient";
import { CookiesStorage } from "./cookie";

const defaultOptions = {};
const API_URL = "http://localhost:8080";

export const generateToken = () => ({
  Authorization: `Bearer ${CookiesStorage.getCookieData("token")}`,
});

function getNotAuthApi(path: string, options: any = {}, apiURL?: string) {
  return axios.get(`${API_URL || apiURL}/${path.replace(/^\//, "")}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
    },
  });
}

function getApi(path: string, options: any = {}, apiURL?: string) {
  return axios.get(`${API_URL || apiURL}/${path.replace(/^\//, "")}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function getApiWithParams(
  path: string,
  params: object,
  options: any = {},
  apiURL?: string
) {
  return axios.get(`${API_URL || apiURL}/${path.replace(/^\//, "")}`, {
    ...defaultOptions,
    ...options,
    params: params,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function postApi(path: string, data: any, options: any = {}) {
  return axios.post(`${API_URL}/${path.replace(/^\//, "")}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function postApiWithParams(
  path: string,
  params: object,
  data: any,
  options: any = {},
  apiURL?: string
) {
  return axios.post(`${API_URL || apiURL}/${path.replace(/^\//, "")}`, data, {
    ...defaultOptions,
    ...options,
    params: params,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function putApi(path: string, data: any, options: any = {}) {
  return axios.put(`${API_URL}/${path.replace(/^\//, "")}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function putApiWithParams(
  path: string,
  params: object,
  data: any,
  options: any = {}
) {
  return axios.put(`${API_URL}/${path.replace(/^\//, "")}`, data, {
    ...defaultOptions,
    ...options,
    params: params,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function patchApi(path: string, data: any, options: any = {}) {
  return axios.patch(`${API_URL}/${path.replace(/^\//, "")}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function deleteApi(path: string, options: any = {}) {
  return axios.delete(`${API_URL}/${path.replace(/^\//, "")}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function deleteApiWithParams(path: string, params: object, options: any = {}) {
  return axios.delete(`${API_URL}/${path.replace(/^\//, "")}`, {
    ...defaultOptions,
    ...options,
    params: params,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function handleErrorStatus(error: any) {
  const status = error?.status || error?.response?.status || null;
  switch (status) {
    case 401:
      window.location.href = ROUTE.SIGN_IN;

      return error;
    case 403: {
      window.location.href = ROUTER.FORBIDDEN;
      return error;
    }
    case 404:
      return error;
    case 200:
    case 201:
    case 204:
    case 400:
    case 422:
      return error;
    case 500:
      return error;
    default:
      CookiesStorage.setCookieData(
        CookieKey.networkError,
        status ? `ERR-0${status}` : "ERR-ANOTHER"
      );
      return error;
  }
}

axios.interceptors.response.use(
  (response) => {
    let data = response?.data;
    if (data) {
      data = camelizeKeys(data);
    }
    return handleErrorStatus({ ...response, data });
  },
  (error) => {
    const errorResponse = error.response;

    return Promise.reject(handleErrorStatus(errorResponse));
  }
);

axios.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    if (
      newConfig.headers &&
      newConfig.headers["Content-Type"] === "application/json"
    )
      return newConfig;
    if (config.params) {
      newConfig.params = config.params;
    }
    if (config.data) {
      newConfig.data = camelizeKeys(config.data);
    }
    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.defaults.paramsSerializer = (params) =>
  stringifyParams({
    params: camelizeKeys({ ...params }),
    option: {
      encode: !isNil(params?.tags) || false,
    },
  });

const Api = {
  get: getApi,
  post: postApi,
  put: putApi,
  delete: deleteApi,
  deleteParams: deleteApiWithParams,
  patch: patchApi,
  getNotAuth: getNotAuthApi,
  getWithParams: getApiWithParams,
  postWithParams: postApiWithParams,
  putWithParams: putApiWithParams,
};

export default Api;
