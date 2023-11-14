import { vndToUsdExchangeRate } from "@/constants/common";

// Chuyển đổi từ VND sang USD
export function vndToUsa(vndAmount) {
  return vndAmount * vndToUsdExchangeRate;
}
