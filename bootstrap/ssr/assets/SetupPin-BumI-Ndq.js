import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { M as Modal } from "./Modal-XQRpvi6T.js";
import { m as maskPhoneNumber } from "./utils-UO2Utf7z.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import "clsx";
import "tailwind-merge";
const SetupPinPage = ({ setHasPined, hasPin, open, onClose }) => {
  const { data: pageData, errors } = usePage().props;
  const [step, setStep] = useState("phone");
  const [countdown, setCountdown] = useState(0);
  const { data, setData, post, processing, reset } = useForm({
    phone: "",
    otp: "",
    pin: "",
    pin_confirmation: ""
  });
  const [inputType, setInputType] = useState("password");
  const otpRefs = useRef(Array(6).fill(null));
  const pinRefs = useRef(Array(6).fill(null));
  const confirmPinRefs = useRef(Array(6).fill(null));
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1e3);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    const url = hasPin ? route("siswa.forgot-pin", pageData.nouid) : route("otp.send", pageData.nouid);
    post(url, {
      onSuccess: () => {
        setStep("otp");
        setCountdown(60);
        if (otpRefs.current[0]) {
          otpRefs.current[0].focus();
        }
      }
    });
  };
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    post(route("otp.verif", pageData.nouid), {
      onSuccess: () => {
        setStep("pin");
        if (pinRefs.current[0]) {
          pinRefs.current[0].focus();
        }
      }
    });
  };
  const handlePinSubmit = (e) => {
    e.preventDefault();
    post(route("siswa.process-setup-pin", pageData.nouid), {
      onSuccess: () => {
        onClose();
        setHasPined();
        reset();
        setStep("phone");
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
  const handleOtpChange = (e, index) => {
    var _a;
    const value = e.target.value.replace(/\D/g, "");
    const newOtp = data.otp.split("");
    newOtp[index] = value.charAt(value.length - 1) || "";
    setData("otp", newOtp.join(""));
    if (value && index < 5 && otpRefs.current[index + 1]) {
      (_a = otpRefs.current[index + 1]) == null ? void 0 : _a.focus();
    }
  };
  const handlePinChange = (e, index, field, refs) => {
    var _a, _b;
    const value = e.target.value.replace(/\D/g, "");
    const newPin = data[field].split("");
    newPin[index] = value.charAt(value.length - 1) || "";
    setData(field, newPin.join(""));
    if (value && index < 5 && refs.current[index + 1]) {
      (_a = refs.current[index + 1]) == null ? void 0 : _a.focus();
    }
    if (field === "pin" && newPin.join("").length === 6 && confirmPinRefs.current[0]) {
      (_b = confirmPinRefs.current[0]) == null ? void 0 : _b.focus();
    }
  };
  const handleKeyDown = (e, index, refs) => {
    var _a;
    if (e.key === "Backspace" && !data.otp[index] && index > 0 && refs.current[index - 1]) {
      (_a = refs.current[index - 1]) == null ? void 0 : _a.focus();
    }
  };
  const renderPhoneStep = () => /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-center text-2xl font-bold text-gray-900", children: hasPin ? "Masukkan Nomor HP Anda yang terdaftar" : "Daftarkan Nomor HP Anda" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-center text-sm text-gray-600", children: [
        "Kami akan mengirimkan kode OTP ke nomor ini ",
        /* @__PURE__ */ jsx("br", {}),
        maskPhoneNumber(pageData.siswa.tel ?? "")
      ] })
    ] }),
    errors.phone && /* @__PURE__ */ jsx("div", { className: "text-center text-sm text-red-500", children: errors.phone }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handlePhoneSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700", children: "Nomor Handphone" }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-1 rounded-md shadow-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ jsx("span", { className: "text-gray-500 sm:text-sm", children: "+62" }) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "tel",
              id: "phone",
              name: "phone",
              autoComplete: "tel",
              className: `block w-full rounded-md border-2 ${errors.phone ? "border-red-500" : "border-gray-300"} py-2 pl-12 focus:border-blue-500 focus:ring-blue-500`,
              placeholder: "8123456789",
              value: data.phone,
              onChange: (e) => setData("phone", e.target.value.replace(/\D/g, "")),
              required: true
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing || data.phone.length < 10,
          className: `flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${data.phone.length >= 10 ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" : "cursor-not-allowed bg-gray-400"} focus:ring-2 focus:ring-offset-2 focus:outline-none`,
          children: processing ? "Mengirim OTP..." : "Kirim Kode OTP"
        }
      ) })
    ] })
  ] });
  const renderOtpStep = () => /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("button", { onClick: () => setStep("phone"), className: "flex items-center text-sm text-gray-600 hover:text-gray-800", children: [
      /* @__PURE__ */ jsx(ArrowLeftIcon, { className: "mr-1 h-4 w-4" }),
      "Kembali"
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-center text-2xl font-bold text-gray-900", children: "Verifikasi OTP" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-center text-sm text-gray-600", children: [
        "Masukkan 6 digit kode OTP yang dikirim ke +62",
        data.phone
      ] })
    ] }),
    errors.message && /* @__PURE__ */ jsx("div", { className: "text-center text-sm text-red-500", children: errors.message }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleOtpSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center space-x-2", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsx(
        "input",
        {
          ref: (el) => {
            otpRefs.current[index] = el;
          },
          type: "text",
          inputMode: "numeric",
          pattern: "[0-9]",
          maxLength: 1,
          required: true,
          autoComplete: "off",
          className: `h-12 w-12 rounded-md border text-center text-2xl focus:ring-1 focus:outline-none ${errors ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"}`,
          value: data.otp[index] || "",
          onChange: (e) => handleOtpChange(e, index),
          onKeyDown: (e) => handleKeyDown(e, index, otpRefs),
          onFocus: (e) => e.target.select()
        },
        index
      )) }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: countdown > 0 ? /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
        "Kirim ulang OTP dalam ",
        countdown,
        " detik"
      ] }) : /* @__PURE__ */ jsx("button", { type: "button", onClick: resendOtp, className: "text-sm text-blue-600 hover:text-blue-800", children: "Kirim Ulang OTP" }) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing || data.otp.length !== 6,
          className: `flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${data.otp.length === 6 ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" : "cursor-not-allowed bg-gray-400"} focus:ring-2 focus:ring-offset-2 focus:outline-none`,
          children: processing ? "Memverifikasi..." : "Verifikasi"
        }
      ) })
    ] })
  ] });
  const renderPinStep = () => /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-center text-2xl font-bold text-gray-900", children: "Buat PIN 6 Digit Baru" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-sm text-gray-600", children: "Untuk keamanan akun Anda" })
    ] }),
    (errors.pin || errors.pin_confirmation) && /* @__PURE__ */ jsx("div", { className: "text-center text-sm text-red-500", children: errors.pin || errors.pin_confirmation }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handlePinSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "pin", className: "mb-2 block text-center text-sm font-medium text-gray-700", children: "Masukkan PIN Baru" }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center space-x-2", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsx(
            "input",
            {
              ref: (el) => {
                pinRefs.current[index] = el;
              },
              type: inputType,
              inputMode: "numeric",
              pattern: "[0-9]",
              maxLength: 1,
              required: true,
              autoComplete: "off",
              className: `h-12 w-12 rounded-md border text-center text-2xl focus:ring-1 focus:outline-none ${errors.pin ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"}`,
              value: data.pin[index] || "",
              onChange: (e) => handlePinChange(e, index, "pin", pinRefs),
              onKeyDown: (e) => handleKeyDown(e, index, pinRefs),
              onFocus: (e) => e.target.select()
            },
            index
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "pin_confirmation", className: "mb-2 block text-center text-sm font-medium text-gray-700", children: "Konfirmasi PIN Baru" }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center space-x-2", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsx(
            "input",
            {
              ref: (el) => {
                confirmPinRefs.current[index] = el;
              },
              type: inputType,
              inputMode: "numeric",
              pattern: "[0-9]",
              maxLength: 1,
              required: true,
              autoComplete: "off",
              className: `h-12 w-12 rounded-md border text-center text-2xl focus:ring-1 focus:outline-none ${errors.pin_confirmation ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"}`,
              value: data.pin_confirmation[index] || "",
              onChange: (e) => handlePinChange(e, index, "pin_confirmation", confirmPinRefs),
              onKeyDown: (e) => handleKeyDown(e, index, confirmPinRefs),
              onFocus: (e) => e.target.select()
            },
            index
          )) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "flex items-center text-sm text-gray-600 hover:text-gray-800",
            onClick: () => setInputType(inputType === "password" ? "text" : "password"),
            children: inputType === "password" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(EyeIcon, { className: "mr-1 h-4 w-4" }),
              "Tampilkan PIN"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(EyeOffIcon, { className: "mr-1 h-4 w-4" }),
              "Sembunyikan PIN"
            ] })
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing || data.pin.length !== 6 || data.pin !== data.pin_confirmation,
          className: `flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${data.pin.length === 6 && data.pin === data.pin_confirmation ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" : "cursor-not-allowed bg-gray-400"} focus:ring-2 focus:ring-offset-2 focus:outline-none`,
          children: processing ? "Menyimpan..." : "Simpan PIN"
        }
      ) })
    ] })
  ] });
  return /* @__PURE__ */ jsx(Modal, { isOpen: open, onClose, header: false, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
    /* @__PURE__ */ jsx(Head, { title: step === "phone" ? "Daftar Nomor HP" : step === "otp" ? "Verifikasi OTP" : "Buat PIN" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md rounded-lg", children: [
      step === "phone" && renderPhoneStep(),
      step === "otp" && renderOtpStep(),
      step === "pin" && renderPinStep()
    ] })
  ] }) });
};
export {
  SetupPinPage as default
};
