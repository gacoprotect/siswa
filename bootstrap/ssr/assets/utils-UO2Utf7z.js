import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const maskPhoneNumber = (phoneNumber, visibleDigits = 2) => {
  if (phoneNumber.length <= visibleDigits * 2) {
    return phoneNumber;
  }
  const firstPart = phoneNumber.substring(0, 4);
  const lastPart = phoneNumber.substring(phoneNumber.length - visibleDigits);
  const maskedPart = "*".repeat(phoneNumber.length - visibleDigits * 2);
  return `${firstPart}${maskedPart}${lastPart}`;
};
function formatIDR(value) {
  const amount = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(amount)) return "Rp 0 ,-";
  const formatted = amount.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return `Rp ${formatted} ,-`;
}
export {
  cn as c,
  formatIDR as f,
  maskPhoneNumber as m
};
