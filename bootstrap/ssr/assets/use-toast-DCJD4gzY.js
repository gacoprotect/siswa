import { useEffect } from "react";
import { toast } from "react-toastify";
const useToast = ({ errors, flash }) => {
  useEffect(() => {
    const allErrors = Object.values(errors || {});
    allErrors.forEach((err) => {
      if (err) {
        console.error(err, { toastId: `err-${err}` });
      }
    });
  }, [errors]);
  useEffect(() => {
    if (flash == null ? void 0 : flash.message) {
      if (flash.success === true) {
        toast.success(flash.message, { toastId: `flash-${flash.message}` });
      } else if (flash.success === false) {
        toast.error(flash.message, { toastId: `flash-${flash.message}` });
      }
    }
  }, [flash]);
};
export {
  useToast as u
};
