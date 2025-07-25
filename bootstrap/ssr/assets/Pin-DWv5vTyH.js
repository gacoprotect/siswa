import { jsxDEV } from "react/jsx-dev-runtime";
import { ArrowLeftIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { M as Modal } from "./Modal-i8ZK7ROr.js";
import { u as useLogger } from "./logger-context-CghNbJb_.js";
import { usePage, useForm, Head, router } from "@inertiajs/react";
import { FaKey } from "react-icons/fa";
const DigitInput = React.forwardRef(
  ({ value, onChange, onKeyDown, onPaste, type = "text", error = false, autoFocus = false }, ref) => /* @__PURE__ */ jsxDEV(
    "input",
    {
      ref,
      type,
      inputMode: "numeric",
      pattern: "[0-9]*",
      maxLength: 1,
      required: true,
      autoComplete: "off",
      className: `h-12 w-12 rounded-md border text-center text-2xl focus:ring-1 focus:outline-none ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"}`,
      value,
      onChange,
      onKeyDown,
      onPaste,
      autoFocus,
      onFocus: (e) => e.target.select()
    },
    void 0,
    false,
    {
      fileName: "/home/webserver-1/siswa/resources/js/components/DigitInput.tsx",
      lineNumber: 19,
      columnNumber: 5
    },
    void 0
  )
);
DigitInput.displayName = "DigitInput";
const OtpStep = ({
  otp,
  phone,
  errors,
  processing,
  countdown,
  onOtpChange,
  onKeyDown,
  onBack,
  onResendOtp,
  onSubmit,
  inputRefs
}) => {
  const handleChange = (e, index) => {
    var _a;
    const value = e.target.value.replace(/\D/g, "");
    onOtpChange(value, index);
    if (value && index < 5 && inputRefs.current[index + 1]) {
      (_a = inputRefs.current[index + 1]) == null ? void 0 : _a.focus();
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("button", { onClick: onBack, className: "flex items-center text-sm text-gray-600 hover:text-gray-800", type: "button", children: [
      /* @__PURE__ */ jsxDEV(ArrowLeftIcon, { className: "mr-1 h-4 w-4" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/OtpStep.tsx",
        lineNumber: 45,
        columnNumber: 17
      }, void 0),
      "Kembali"
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/OtpStep.tsx",
      lineNumber: 44,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-center text-2xl font-bold text-gray-900", children: "Verifikasi OTP" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/OtpStep.tsx",
        lineNumber: 50,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { className: "mt-2 text-center text-sm text-gray-600", children: [
        "Masukkan 6 digit kode OTP yang dikirim ke ",
        phone ?? "Whatsapp Anda"
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/OtpStep.tsx",
        lineNumber: 51,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/OtpStep.tsx",
      lineNumber: 49,
      columnNumber: 13
    }, void 0),
    errors.otp && /* @__PURE__ */ jsxDEV("div", { className: "text-center text-sm text-red-500", children: errors.otp }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/components/OtpStep.tsx",
      lineNumber: 54,
      columnNumber: 28
    }, void 0),
    /* @__PURE__ */ jsxDEV("form", { onSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center space-x-2", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsxDEV(
        DigitInput,
        {
          ref: (el) => {
            inputRefs.current[index] = el;
          },
          value: otp[index] || "",
          onChange: (e) => handleChange(e, index),
          onKeyDown: (e) => onKeyDown(e, index),
          error: !!errors.otp,
          autoFocus: index === 0
        },
        index,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/OtpStep.tsx",
          lineNumber: 59,
          columnNumber: 25
        },
        void 0
      )) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/OtpStep.tsx",
        lineNumber: 57,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: countdown > 0 ? /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-500", children: [
        "Kirim ulang OTP dalam ",
        countdown,
        " detik"
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/OtpStep.tsx",
        lineNumber: 76,
        columnNumber: 25
      }, void 0) : /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: onResendOtp, className: "text-sm text-blue-600 hover:text-blue-800", children: "Kirim Ulang OTP" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/OtpStep.tsx",
        lineNumber: 78,
        columnNumber: 25
      }, void 0) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/OtpStep.tsx",
        lineNumber: 74,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "submit",
          disabled: processing || otp.length !== 6,
          className: `flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${otp.length === 6 ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" : "cursor-not-allowed bg-gray-400"} focus:ring-2 focus:ring-offset-2 focus:outline-none`,
          children: processing ? "Memverifikasi..." : "Verifikasi"
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/OtpStep.tsx",
          lineNumber: 85,
          columnNumber: 21
        },
        void 0
      ) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/OtpStep.tsx",
        lineNumber: 84,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/OtpStep.tsx",
      lineNumber: 56,
      columnNumber: 13
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/components/OtpStep.tsx",
    lineNumber: 43,
    columnNumber: 9
  }, void 0);
};
const PinStep = ({
  pin,
  errors,
  inputType,
  processing,
  onPinChange,
  onKeyDown,
  onPaste,
  onToggleInputType,
  onSubmit,
  // setInputRef,
  inputRefs
}) => {
  const [isError, setIsError] = useState(Boolean(Object.keys(errors).length > 0));
  const handleChange = (e, index) => {
    var _a;
    setIsError(false);
    const value = e.target.value.replace(/\D/g, "");
    onPinChange(e, index);
    if (value && index < 5 && inputRefs.current[index + 1]) {
      (_a = inputRefs.current[index + 1]) == null ? void 0 : _a.focus();
    }
  };
  useEffect(() => {
    if (errors) {
      setIsError(Boolean(Object.keys(errors).length > 0));
    }
  }, [errors]);
  return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-md space-y-8", children: [
    /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Masukkan PIN" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/components/PinStep.tsx",
      lineNumber: 52,
      columnNumber: 21
    }, void 0) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/components/PinStep.tsx",
      lineNumber: 51,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV("form", { className: "mt-8 space-y-6", onSubmit, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center space-x-2", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsxDEV(
        DigitInput,
        {
          ref: (el) => {
            inputRefs.current[index] = el;
          },
          type: inputType,
          value: pin[index] || "",
          onChange: (e) => handleChange(e, index),
          onKeyDown: (e) => onKeyDown(e, index),
          onPaste,
          autoFocus: index === 0,
          error: isError
        },
        index,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/PinStep.tsx",
          lineNumber: 59,
          columnNumber: 29
        },
        void 0
      )) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/PinStep.tsx",
        lineNumber: 57,
        columnNumber: 21
      }, void 0),
      isError && ((errors.pin || errors.message) && /* @__PURE__ */ jsxDEV("div", { className: "mb-4 flex flex-col text-center text-sm text-red-500", children: [
        /* @__PURE__ */ jsxDEV("span", { children: errors.pin ?? errors.message }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/PinStep.tsx",
          lineNumber: 77,
          columnNumber: 33
        }, void 0),
        parseInt(errors.remaining) < 3 && /* @__PURE__ */ jsxDEV("span", { children: errors.remaining ? `sisa percobaan ${errors.remaining}` : "" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/PinStep.tsx",
          lineNumber: 78,
          columnNumber: 68
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/PinStep.tsx",
        lineNumber: 76,
        columnNumber: 29
      }, void 0)),
      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxDEV("button", { type: "button", className: "text-sm text-gray-600 hover:text-gray-800", onClick: onToggleInputType, children: inputType === "password" ? "Tampilkan PIN" : "Sembunyikan PIN" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/PinStep.tsx",
        lineNumber: 82,
        columnNumber: 25
      }, void 0) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/PinStep.tsx",
        lineNumber: 81,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col space-y-2", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "submit",
          disabled: processing || pin.length !== 6,
          className: `group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white ${pin.length === 6 ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none" : "cursor-not-allowed bg-gray-400"}`,
          children: processing ? "Memverifikasi..." : "Masuk"
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/PinStep.tsx",
          lineNumber: 88,
          columnNumber: 25
        },
        void 0
      ) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/PinStep.tsx",
        lineNumber: 87,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/PinStep.tsx",
      lineNumber: 56,
      columnNumber: 17
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/components/PinStep.tsx",
    lineNumber: 50,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/PinStep.tsx",
    lineNumber: 49,
    columnNumber: 9
  }, void 0);
};
const SetupPinStep = ({
  errors,
  inputType,
  onToggleInputType,
  onSukses
}) => {
  const { data: pageData } = usePage().props;
  const [isError, setIsError] = useState(Boolean(Object.keys(errors).length > 0));
  const { data, setData, post, processing, reset } = useForm({
    pin: "",
    pin_confirmation: ""
  });
  const pinRefs = React.useRef(Array(6).fill(null));
  const pinConfirmationRefs = React.useRef(Array(6).fill(null));
  const onSubmit = (e) => {
    e.preventDefault();
    post(route("siswa.process-setup-pin", pageData.nouid), {
      onSuccess: () => {
        onSukses == null ? void 0 : onSukses();
        reset();
      }
    });
  };
  const handlePinChange = (value, index, field) => {
    var _a;
    const newValue = data[field].split("");
    newValue[index] = value.charAt(value.length - 1) || "";
    setData(field, newValue.join(""));
    if (value && index < 5) {
      const refs = field === "pin" ? pinRefs : pinConfirmationRefs;
      (_a = refs.current[index + 1]) == null ? void 0 : _a.focus();
    }
  };
  const handleKeyDown = (e, index, field) => {
    var _a;
    if (e.key === "Backspace" && !data[field][index] && index > 0) {
      const refs = field === "pin" ? pinRefs : pinConfirmationRefs;
      (_a = refs.current[index - 1]) == null ? void 0 : _a.focus();
    }
  };
  const handlePaste = (e, field) => {
    var _a;
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, 6);
    if (pasteData.length > 0) {
      setData(field, pasteData);
      const focusIndex = Math.min(pasteData.length - 1, 5);
      const refs = field === "pin" ? pinRefs : pinConfirmationRefs;
      (_a = refs.current[focusIndex]) == null ? void 0 : _a.focus();
    }
  };
  useEffect(() => {
    setIsError(Boolean(Object.keys(errors).length > 0));
  }, [errors]);
  return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-md space-y-8", children: [
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-center text-2xl font-bold text-gray-900", children: "Buat PIN 6 Digit Baru" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
        lineNumber: 77,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { className: "mt-2 text-center text-sm text-gray-600", children: "Untuk keamanan akun Anda" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
        lineNumber: 78,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
      lineNumber: 76,
      columnNumber: 17
    }, void 0),
    (errors.pin || errors.pin_confirmation) && /* @__PURE__ */ jsxDEV("div", { className: "text-center text-sm text-red-500", children: errors.pin || errors.pin_confirmation }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
      lineNumber: 82,
      columnNumber: 21
    }, void 0),
    /* @__PURE__ */ jsxDEV("form", { className: "mt-8 space-y-6", onSubmit, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2 justify-center space-x-4", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { htmlFor: "pin", className: "mb-2 block text-center text-sm font-medium text-gray-700", children: "Masukkan PIN Baru" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
            lineNumber: 88,
            columnNumber: 29
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "flex space-x-2", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsxDEV(
            DigitInput,
            {
              ref: (el) => {
                pinRefs.current[index] = el;
              },
              type: inputType,
              value: data.pin[index] || "",
              onChange: (e) => {
                const value = e.target.value.replace(/\D/g, "");
                handlePinChange(value, index, "pin");
              },
              onKeyDown: (e) => handleKeyDown(e, index, "pin"),
              onPaste: (e) => handlePaste(e, "pin"),
              autoFocus: index === 0 && data.pin.length === 0,
              error: isError
            },
            `pin-${index}`,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
              lineNumber: 93,
              columnNumber: 37
            },
            void 0
          )) }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
            lineNumber: 91,
            columnNumber: 29
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
          lineNumber: 87,
          columnNumber: 25
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { htmlFor: "pin_confirmation", className: "mb-2 block text-center text-sm font-medium text-gray-700", children: "Konfirmasi PIN Baru" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
            lineNumber: 112,
            columnNumber: 29
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "flex space-x-2", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsxDEV(
            DigitInput,
            {
              ref: (el) => {
                pinConfirmationRefs.current[index] = el;
              },
              type: inputType,
              value: data.pin_confirmation[index] || "",
              onChange: (e) => {
                const value = e.target.value.replace(/\D/g, "");
                handlePinChange(value, index, "pin_confirmation");
              },
              onKeyDown: (e) => handleKeyDown(e, index, "pin_confirmation"),
              onPaste: (e) => handlePaste(e, "pin_confirmation"),
              autoFocus: index === 0 && data.pin.length === 6 && data.pin_confirmation.length === 0,
              error: isError
            },
            `pin-confirm-${index}`,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
              lineNumber: 117,
              columnNumber: 37
            },
            void 0
          )) }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
            lineNumber: 115,
            columnNumber: 29
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
          lineNumber: 111,
          columnNumber: 25
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
        lineNumber: 86,
        columnNumber: 21
      }, void 0),
      isError && ((errors.pin || errors.message) && /* @__PURE__ */ jsxDEV("div", { className: "mb-4 flex flex-col text-center text-sm text-red-500", children: [
        /* @__PURE__ */ jsxDEV("span", { children: errors.pin ?? errors.message }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
          lineNumber: 139,
          columnNumber: 33
        }, void 0),
        errors.remaining && parseInt(errors.remaining) < 3 && /* @__PURE__ */ jsxDEV("span", { children: `Sisa percobaan ${errors.remaining}` }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
          lineNumber: 141,
          columnNumber: 37
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
        lineNumber: 138,
        columnNumber: 29
      }, void 0)),
      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "button",
          className: "text-sm text-gray-600 hover:text-gray-800",
          onClick: onToggleInputType,
          children: inputType === "password" ? "Tampilkan PIN" : "Sembunyikan PIN"
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
          lineNumber: 148,
          columnNumber: 25
        },
        void 0
      ) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
        lineNumber: 147,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col space-y-2", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "submit",
          disabled: processing || data.pin.length !== 6 || data.pin_confirmation.length !== 6,
          className: `group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white ${data.pin.length === 6 && data.pin_confirmation.length === 6 ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none" : "cursor-not-allowed bg-gray-400"}`,
          children: processing ? "Memproses..." : "Simpan PIN"
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
          lineNumber: 158,
          columnNumber: 25
        },
        void 0
      ) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
        lineNumber: 157,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
      lineNumber: 85,
      columnNumber: 17
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
    lineNumber: 75,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/SetupPinStep.tsx",
    lineNumber: 74,
    columnNumber: 9
  }, void 0);
};
const PinPage = ({ handle, setPage, hasPin, open, onClose }) => {
  const { errors, data: pageData } = usePage().props;
  const { error, log } = useLogger();
  const { data, setData, post, processing, reset } = useForm({
    pin: "",
    nouid: pageData.nouid ?? "",
    otp: ""
  });
  const [inputType, setInputType] = useState("password");
  const [countdown, setCountdown] = useState(0);
  const [step, setStep] = useState("pin");
  const pinRefs = useRef(Array(6).fill(null));
  const otpRefs = useRef(Array(6).fill(null));
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1e3);
    return () => clearTimeout(timer);
  }, [countdown]);
  useEffect(() => {
    var _a, _b;
    if (open && pinRefs.current[0]) {
      (_a = pinRefs.current[0]) == null ? void 0 : _a.focus();
    }
    if (open && otpRefs.current[0]) {
      (_b = otpRefs.current[0]) == null ? void 0 : _b.focus();
    }
  }, [open]);
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(data.pin)) return;
    post(route("siswa.verify-pin", { nouid: pageData.nouid, p: handle ?? "auth" }), {
      preserveState: true,
      onSuccess: () => {
        setPage("index");
        reset();
        onClose(false);
      },
      onError: () => {
        var _a;
        setData("pin", "");
        if (pinRefs.current[0]) {
          (_a = pinRefs.current[0]) == null ? void 0 : _a.focus();
        }
        error(errors);
      },
      onFinish: () => {
      }
    });
  };
  const handlePinChange = (value, index) => {
    const newPin = data.pin.split("");
    newPin[index] = value.charAt(value.length - 1) || "";
    setData("pin", newPin.join(""));
  };
  const register = () => {
    router.get(route("register", data.nouid));
  };
  const handlePinKeyDown = (e, index) => {
    var _a;
    if (e.key === "Backspace" && !data.pin[index] && index > 0 && pinRefs.current[index - 1]) {
      (_a = pinRefs.current[index - 1]) == null ? void 0 : _a.focus();
    }
  };
  const handlePaste = (e, field) => {
    var _a;
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, 6);
    if (pasteData.length > 0) {
      setData(field, pasteData);
      const focusIndex = Math.min(pasteData.length - 1, 5);
      const refs = pinRefs;
      if (refs == null ? void 0 : refs.current[focusIndex]) {
        (_a = refs.current[focusIndex]) == null ? void 0 : _a.focus();
      }
    }
  };
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    post(route("otp.verif", pageData.nouid), {
      onSuccess: () => {
        log("OTP SUKSES");
        setStep("setup");
      },
      onError: () => {
        log("OTP GAGAL");
      }
    });
  };
  const resendOtp = () => {
    post(route("otp.send", pageData.nouid), {
      onSuccess: () => {
        setCountdown(60);
      }
    });
  };
  const handleDigitChange = (value, field, index) => {
    const newValue = data[field].split("");
    newValue[index] = value.charAt(value.length - 1) || "";
    setData(field, newValue.join(""));
  };
  const handleOtpKeyDown = (e, index) => {
    var _a;
    if (e.key === "Backspace" && !data.otp[index] && index > 0 && otpRefs.current[index - 1]) {
      (_a = otpRefs.current[index - 1]) == null ? void 0 : _a.focus();
    }
  };
  useEffect(() => {
    log("STEP : ", step);
    if (errors.pin && parseInt(errors.remaining) === 0) {
      setStep("otp");
    }
  }, [errors.pin]);
  return /* @__PURE__ */ jsxDEV(Modal, { title: hasPin ? "" : "Anda Belum Terverifikasi", isOpen: open, onClose: () => onClose(false), header: false, children: hasPin ? /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center p-2", children: [
    /* @__PURE__ */ jsxDEV(Head, { title: "Masukkan PIN" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Pin.tsx",
      lineNumber: 155,
      columnNumber: 21
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-md space-y-8", children: [
      step === "pin" && /* @__PURE__ */ jsxDEV(
        PinStep,
        {
          pin: data.pin,
          errors,
          inputType,
          processing,
          onPinChange: (e, index) => handlePinChange(e.target.value, index),
          onKeyDown: handlePinKeyDown,
          onPaste: (e) => handlePaste(e, "pin"),
          onToggleInputType: () => setInputType(inputType === "password" ? "text" : "password"),
          onSubmit: handlePinSubmit,
          setInputRef: (el, index) => {
            pinRefs.current[index] = el;
          },
          inputRefs: pinRefs
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Pin.tsx",
          lineNumber: 158,
          columnNumber: 29
        },
        void 0
      ),
      // (parseInt(errors.remaining) === 0) && 
      step === "otp" && /* @__PURE__ */ jsxDEV(
        OtpStep,
        {
          otp: data.otp,
          errors,
          processing,
          countdown,
          onOtpChange: (value, index) => handleDigitChange(value, "otp", index),
          onKeyDown: handleOtpKeyDown,
          onBack: () => onClose(false),
          onResendOtp: resendOtp,
          onSubmit: handleOtpSubmit,
          inputRefs: otpRefs
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Pin.tsx",
          lineNumber: 178,
          columnNumber: 33
        },
        void 0
      ),
      step === "setup" && /* @__PURE__ */ jsxDEV(
        SetupPinStep,
        {
          errors,
          inputType,
          onToggleInputType: () => setInputType(inputType === "password" ? "text" : "password"),
          onSukses: () => onClose(false)
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Pin.tsx",
          lineNumber: 192,
          columnNumber: 29
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Pin.tsx",
      lineNumber: 156,
      columnNumber: 21
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Pin.tsx",
    lineNumber: 154,
    columnNumber: 17
  }, void 0) : /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-center space-y-4 rounded-xl p-6 text-center", children: [
    /* @__PURE__ */ jsxDEV("p", { className: "max-w-md text-sm", children: "Untuk melanjutkan silahkan verifikasi identitas diri Anda terlebih dahulu" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Pin.tsx",
      lineNumber: 203,
      columnNumber: 21
    }, void 0),
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: register,
        className: "flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50",
        children: [
          /* @__PURE__ */ jsxDEV(FaKey, { className: "text-lg" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Pin.tsx",
            lineNumber: 208,
            columnNumber: 25
          }, void 0),
          /* @__PURE__ */ jsxDEV("span", { children: "Verifikasi Sekarang" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Pin.tsx",
            lineNumber: 209,
            columnNumber: 25
          }, void 0)
        ]
      },
      void 0,
      true,
      {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Pin.tsx",
        lineNumber: 204,
        columnNumber: 21
      },
      void 0
    )
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Pin.tsx",
    lineNumber: 202,
    columnNumber: 17
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Pin.tsx",
    lineNumber: 152,
    columnNumber: 9
  }, void 0);
};
const Pin = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PinPage
}, Symbol.toStringTag, { value: "Module" }));
export {
  OtpStep as O,
  PinStep as P,
  PinPage as a,
  Pin as b
};
