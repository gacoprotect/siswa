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
export {
  cn as c,
  maskPhoneNumber as m
};
