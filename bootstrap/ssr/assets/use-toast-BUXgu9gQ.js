import { u as useLogger } from "./logger-context-CghNbJb_.js";
import { useEffect } from "react";
import { toast } from "react-toastify";
const useToast = ({ errors, flash }) => {
  const { error, log } = useLogger();
  useEffect(() => {
    const allErrors = Object.values(errors || {});
    allErrors.forEach((err) => {
      if (err) {
        error(err, { toastId: `err-${err}` });
      }
    });
  }, [errors, error]);
  useEffect(() => {
    if (flash == null ? void 0 : flash.message) {
      if (flash.success === true) {
        toast.success(flash.message, { toastId: `flash-${flash.message}` });
        log(flash.message);
      } else if (flash.success === false) {
        toast.error(flash.message, { toastId: `flash-${flash.message}` });
        error(flash.message);
      }
    }
  }, [flash, log, error]);
};
export {
  useToast as u
};
