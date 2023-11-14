import { vndToUsdExchangeRate } from "@/constants/common";

// Chuyển đổi từ USD sang VND
function usdToVnd(usdAmount) {
  return usdAmount / vndToUsdExchangeRate;
}