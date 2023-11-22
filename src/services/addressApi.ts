import axios from "axios";

const API_HOST = "https://provinces.open-api.vn/api";

export const callAPIAddress = async (code: number, type?: string) => {
  const { data } = await axios.get(`${API_HOST}/${type}/${code}?depth=2`);
  return data;
};

export const getAllProvince = async () => {
  const { data } = await axios.get(`${API_HOST}/?depth=1`);
  return data;
};
