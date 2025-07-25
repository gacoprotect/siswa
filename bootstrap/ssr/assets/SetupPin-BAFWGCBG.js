import { jsxDEV, Fragment } from "react/jsx-dev-runtime";
import { M as Modal } from "./Modal-i8ZK7ROr.js";
import { m as maskPhoneNumber } from "./utils-UO2Utf7z.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import "./InputGroup-CoQ5g3dV.js";
import "react-icons/bs";
import "clsx";
import "tailwind-merge";
const SetupPinPage = ({ setHasPined, hasPin, open, onClose }) => {
  const { auth, data: pageData, errors } = usePage().props;
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
    const url = route("otp.send", pageData.nouid);
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
  const renderPhoneStep = () => {
    var _a;
    return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-center text-2xl font-bold text-gray-900", children: hasPin ? "Masukkan Nomor HP Anda yang terdaftar" : "Daftarkan Nomor HP Anda" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
          lineNumber: 125,
          columnNumber: 17
        }, void 0),
        /* @__PURE__ */ jsxDEV("p", { className: "mt-2 text-center text-sm text-gray-600", children: [
          "Kami akan mengirimkan kode OTP ke nomor ini ",
          /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
            lineNumber: 129,
            columnNumber: 65
          }, void 0),
          maskPhoneNumber(((_a = auth.user) == null ? void 0 : _a.tel) ?? "")
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
          lineNumber: 128,
          columnNumber: 17
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
        lineNumber: 124,
        columnNumber: 13
      }, void 0),
      errors.phone && /* @__PURE__ */ jsxDEV("div", { className: "text-center text-sm text-red-500", children: errors.phone }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
        lineNumber: 134,
        columnNumber: 30
      }, void 0),
      /* @__PURE__ */ jsxDEV("form", { onSubmit: handlePhoneSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700", children: "Nomor Handphone" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
            lineNumber: 138,
            columnNumber: 21
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "relative mt-1 rounded-md shadow-sm", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ jsxDEV("span", { className: "text-gray-500 sm:text-sm", children: "+62" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
              lineNumber: 143,
              columnNumber: 29
            }, void 0) }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
              lineNumber: 142,
              columnNumber: 25
            }, void 0),
            /* @__PURE__ */ jsxDEV(
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
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
                lineNumber: 145,
                columnNumber: 25
              },
              void 0
            )
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
            lineNumber: 141,
            columnNumber: 21
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
          lineNumber: 137,
          columnNumber: 17
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "submit",
            disabled: processing || data.phone.length < 10,
            className: `flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${data.phone.length >= 10 ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" : "cursor-not-allowed bg-gray-400"} focus:ring-2 focus:ring-offset-2 focus:outline-none`,
            children: processing ? "Mengirim OTP..." : "Kirim Kode OTP"
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
            lineNumber: 160,
            columnNumber: 21
          },
          void 0
        ) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
          lineNumber: 159,
          columnNumber: 17
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
        lineNumber: 136,
        columnNumber: 13
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
      lineNumber: 123,
      columnNumber: 9
    }, void 0);
  };
  const renderOtpStep = () => /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("button", { onClick: () => setStep("phone"), className: "flex items-center text-sm text-gray-600 hover:text-gray-800", children: [
      /* @__PURE__ */ jsxDEV(ArrowLeftIcon, { className: "mr-1 h-4 w-4" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
        lineNumber: 177,
        columnNumber: 17
      }, void 0),
      "Kembali"
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
      lineNumber: 176,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-center text-2xl font-bold text-gray-900", children: "Verifikasi OTP" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
        lineNumber: 182,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { className: "mt-2 text-center text-sm text-gray-600", children: [
        "Masukkan 6 digit kode OTP yang dikirim ke +62",
        data.phone
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
        lineNumber: 183,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
      lineNumber: 181,
      columnNumber: 13
    }, void 0),
    errors.message && /* @__PURE__ */ jsxDEV("div", { className: "text-center text-sm text-red-500", children: errors.message }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
      lineNumber: 186,
      columnNumber: 32
    }, void 0),
    /* @__PURE__ */ jsxDEV("form", { onSubmit: handleOtpSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center space-x-2", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsxDEV(
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
        index,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
          lineNumber: 191,
          columnNumber: 25
        },
        void 0
      )) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
        lineNumber: 189,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: countdown > 0 ? /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-500", children: [
        "Kirim ulang OTP dalam ",
        countdown,
        " detik"
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
        lineNumber: 215,
        columnNumber: 25
      }, void 0) : /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: resendOtp, className: "text-sm text-blue-600 hover:text-blue-800", children: "Kirim Ulang OTP" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
        lineNumber: 217,
        columnNumber: 25
      }, void 0) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
        lineNumber: 213,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "submit",
          disabled: processing || data.otp.length !== 6,
          className: `flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${data.otp.length === 6 ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" : "cursor-not-allowed bg-gray-400"} focus:ring-2 focus:ring-offset-2 focus:outline-none`,
          children: processing ? "Memverifikasi..." : "Verifikasi"
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
          lineNumber: 224,
          columnNumber: 21
        },
        void 0
      ) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
        lineNumber: 223,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
      lineNumber: 188,
      columnNumber: 13
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
    lineNumber: 175,
    columnNumber: 9
  }, void 0);
  const renderPinStep = () => /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-center text-2xl font-bold text-gray-900", children: "Buat PIN 6 Digit Baru" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
        lineNumber: 241,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { className: "mt-2 text-center text-sm text-gray-600", children: "Untuk keamanan akun Anda" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
        lineNumber: 242,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
      lineNumber: 240,
      columnNumber: 13
    }, void 0),
    (errors.pin || errors.pin_confirmation) && /* @__PURE__ */ jsxDEV("div", { className: "text-center text-sm text-red-500", children: errors.pin || errors.pin_confirmation }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
      lineNumber: 246,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV("form", { onSubmit: handlePinSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { htmlFor: "pin", className: "mb-2 block text-center text-sm font-medium text-gray-700", children: "Masukkan PIN Baru" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
            lineNumber: 252,
            columnNumber: 25
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center space-x-2", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsxDEV(
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
            index,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
              lineNumber: 257,
              columnNumber: 33
            },
            void 0
          )) }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
            lineNumber: 255,
            columnNumber: 25
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
          lineNumber: 251,
          columnNumber: 21
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { htmlFor: "pin_confirmation", className: "mb-2 block text-center text-sm font-medium text-gray-700", children: "Konfirmasi PIN Baru" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
            lineNumber: 281,
            columnNumber: 25
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center space-x-2", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsxDEV(
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
            index,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
              lineNumber: 286,
              columnNumber: 33
            },
            void 0
          )) }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
            lineNumber: 284,
            columnNumber: 25
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
          lineNumber: 280,
          columnNumber: 21
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "button",
            className: "flex items-center text-sm text-gray-600 hover:text-gray-800",
            onClick: () => setInputType(inputType === "password" ? "text" : "password"),
            children: inputType === "password" ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(EyeIcon, { className: "mr-1 h-4 w-4" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
                lineNumber: 319,
                columnNumber: 37
              }, void 0),
              "Tampilkan PIN"
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
              lineNumber: 318,
              columnNumber: 33
            }, void 0) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(EyeOffIcon, { className: "mr-1 h-4 w-4" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
                lineNumber: 324,
                columnNumber: 37
              }, void 0),
              "Sembunyikan PIN"
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
              lineNumber: 323,
              columnNumber: 33
            }, void 0)
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
            lineNumber: 312,
            columnNumber: 25
          },
          void 0
        ) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
          lineNumber: 311,
          columnNumber: 21
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
        lineNumber: 250,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "submit",
          disabled: processing || data.pin.length !== 6 || data.pin !== data.pin_confirmation,
          className: `flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${data.pin.length === 6 && data.pin === data.pin_confirmation ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" : "cursor-not-allowed bg-gray-400"} focus:ring-2 focus:ring-offset-2 focus:outline-none`,
          children: processing ? "Menyimpan..." : "Simpan PIN"
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
          lineNumber: 333,
          columnNumber: 21
        },
        void 0
      ) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
        lineNumber: 332,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
      lineNumber: 249,
      columnNumber: 13
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
    lineNumber: 239,
    columnNumber: 9
  }, void 0);
  return /* @__PURE__ */ jsxDEV(Modal, { isOpen: open, onClose, header: false, children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center p-2", children: [
    /* @__PURE__ */ jsxDEV(Head, { title: step === "phone" ? "Daftar Nomor HP" : step === "otp" ? "Verifikasi OTP" : "Buat PIN" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
      lineNumber: 352,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-md rounded-lg", children: [
      step === "phone" && renderPhoneStep(),
      step === "otp" && renderOtpStep(),
      step === "pin" && renderPinStep()
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
      lineNumber: 354,
      columnNumber: 17
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
    lineNumber: 351,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/SetupPin.tsx",
    lineNumber: 350,
    columnNumber: 9
  }, void 0);
};
export {
  SetupPinPage as default
};
