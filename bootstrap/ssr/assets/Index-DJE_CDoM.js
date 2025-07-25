import { jsxDEV, Fragment } from "react/jsx-dev-runtime";
import { M as Modal } from "./Modal-i8ZK7ROr.js";
import { m as maskPhoneNumber, c as cn, f as formatIDR } from "./utils-UO2Utf7z.js";
import { usePage, useForm, Head, router } from "@inertiajs/react";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { P as PinStep, O as OtpStep, a as PinPage } from "./Pin-DWv5vTyH.js";
import clsx from "clsx";
import { FaSpinner, FaArrowAltCircleLeft, FaUser, FaIdCard, FaGraduationCap, FaCog, FaKey, FaExchangeAlt, FaWallet, FaPlusCircle, FaHistory, FaFileInvoiceDollar, FaUserGraduate, FaFootballBall } from "react-icons/fa";
import { u as useLogger } from "./logger-context-CghNbJb_.js";
import { u as useToast } from "./use-toast-BUXgu9gQ.js";
import { A as AppLayout } from "./AppLayout-Dr7OzoMY.js";
import { T } from "../ssr.js";
import TagihanContent from "./TagihanContent-Di3zsTRa.js";
import Topup from "./Topup-Blj8Strg.js";
import PaymentPage from "./Tagihan-BX6MMm1c.js";
import DataSiswaContent from "./DataSiswaContent-XafqE3jV.js";
import Excul from "./Excul-BHct6cn3.js";
import SetupPinPage from "./SetupPin-BAFWGCBG.js";
import { C as ConfirmDialog } from "./ConfirmDialog -CuDab5xe.js";
import { AlertCircle, ShieldOff, XCircle, CheckCircle } from "lucide-react";
import { FiLogOut } from "react-icons/fi";
import { u as useAppConfig } from "./use-debug-logger-DbMTik7y.js";
import "./InputGroup-CoQ5g3dV.js";
import "react-icons/bs";
import "tailwind-merge";
import "react-toastify";
import "@inertiajs/react/server";
import "react-dom/server";
import "./TambahTagihan-BJRTGkp9.js";
import "./RiwayatTagihan-D3TPxS48.js";
import "dayjs";
import "@radix-ui/react-dialog";
const PhoneStep = ({
  phone,
  errors,
  processing,
  registeredPhone,
  onPhoneChange,
  onSubmit
}) => {
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-center text-2xl font-bold text-gray-900", children: "Masukkan Nomor HP Anda yang terdaftar" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/PhoneStep.tsx",
        lineNumber: 24,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { className: "mt-2 text-center text-sm text-gray-600", children: [
        "Kami akan mengirimkan kode OTP ke nomor ini ",
        /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/PhoneStep.tsx",
          lineNumber: 26,
          columnNumber: 55
        }, void 0),
        registeredPhone
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/PhoneStep.tsx",
        lineNumber: 25,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/PhoneStep.tsx",
      lineNumber: 23,
      columnNumber: 7
    }, void 0),
    errors.phone && /* @__PURE__ */ jsxDEV("div", { className: "text-center text-sm text-red-500", children: errors.phone }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/components/PhoneStep.tsx",
      lineNumber: 31,
      columnNumber: 24
    }, void 0),
    /* @__PURE__ */ jsxDEV("form", { onSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700", children: "Nomor Handphone" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/PhoneStep.tsx",
          lineNumber: 35,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "relative mt-1 rounded-md shadow-sm", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ jsxDEV("span", { className: "text-gray-500 sm:text-sm", children: "+62" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/PhoneStep.tsx",
            lineNumber: 40,
            columnNumber: 15
          }, void 0) }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/PhoneStep.tsx",
            lineNumber: 39,
            columnNumber: 13
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
              value: phone,
              onChange: (e) => onPhoneChange(e.target.value.replace(/\D/g, "")),
              required: true
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/components/PhoneStep.tsx",
              lineNumber: 42,
              columnNumber: 13
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/components/PhoneStep.tsx",
          lineNumber: 38,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/PhoneStep.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "submit",
          disabled: processing || phone.length < 10,
          className: `flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${phone.length >= 10 ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" : "cursor-not-allowed bg-gray-400"} focus:ring-2 focus:ring-offset-2 focus:outline-none`,
          children: processing ? "Mengirim OTP..." : "Kirim Kode OTP"
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/PhoneStep.tsx",
          lineNumber: 58,
          columnNumber: 11
        },
        void 0
      ) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/PhoneStep.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/PhoneStep.tsx",
      lineNumber: 33,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/components/PhoneStep.tsx",
    lineNumber: 22,
    columnNumber: 5
  }, void 0);
};
const Blokir = ({ open, onClose, setLoading }) => {
  const [step, setStep] = useState("pin");
  const { errors, data: pageData } = usePage().props;
  const [countdown, setCountdown] = useState(0);
  const [inputType, setInputType] = useState("password");
  const { data, setData, post, processing, reset } = useForm({
    phone: "",
    otp: "",
    pin: "",
    nouid: pageData.nouid ?? ""
  });
  const otpRefs = useRef(Array(6).fill(null));
  const pinRefs = useRef(Array(6).fill(null));
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1e3);
    return () => clearTimeout(timer);
  }, [countdown]);
  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const nouidFromUrl = pathParts[1];
    setData("nouid", nouidFromUrl);
  }, [setData]);
  useEffect(() => {
    var _a, _b;
    if (open && step === "pin" && pinRefs.current[0]) {
      (_a = pinRefs.current[0]) == null ? void 0 : _a.focus();
    }
    if (open && step === "otp" && otpRefs.current[0]) {
      (_b = otpRefs.current[0]) == null ? void 0 : _b.focus();
    }
  }, [open, step]);
  const handlePinChange = (value, index) => {
    const newPin = data.pin.split("");
    newPin[index] = value.charAt(value.length - 1) || "";
    setData("pin", newPin.join(""));
  };
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    const url = route("otp.send", pageData.nouid);
    post(url, {
      onSuccess: () => {
        setStep("otp");
        setCountdown(60);
      }
    });
  };
  const redirect = () => {
    router.post(
      route("siswa.blocked", pageData.nouid),
      {},
      {
        onFinish: () => {
          onClose();
          setTimeout(() => {
            setLoading == null ? void 0 : setLoading(false);
          }, 5e3);
        }
      }
    );
  };
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    post(route("otp.verif", pageData.nouid), {
      onSuccess: () => {
        setLoading == null ? void 0 : setLoading(true);
        console.log("KARTU DIBLOKIR");
        redirect();
      }
    });
  };
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(data.pin)) return;
    post(route("siswa.verify-pin", { nouid: pageData.nouid, p: "auth" }), {
      preserveState: true,
      onSuccess: () => {
        setStep("phone");
        reset();
      },
      onError: () => {
        var _a;
        setData("pin", "");
        if (pinRefs.current[0]) {
          (_a = pinRefs.current[0]) == null ? void 0 : _a.focus();
        }
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
      if (refs.current[focusIndex]) {
        (_a = refs.current[focusIndex]) == null ? void 0 : _a.focus();
      }
    }
  };
  return /* @__PURE__ */ jsxDEV(Modal, { title: "Verifikasi PIN", isOpen: open, onClose, children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center", children: [
    /* @__PURE__ */ jsxDEV(Head, { title: step === "pin" ? "Verifikasi PIN" : step === "otp" ? "Verifikasi OTP" : "Verifikasi Nomor Telepon" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/components/blokir.tsx",
      lineNumber: 164,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-md rounded-lg", children: [
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
          fileName: "/home/webserver-1/siswa/resources/js/components/blokir.tsx",
          lineNumber: 168,
          columnNumber: 25
        },
        void 0
      ),
      step === "phone" && /* @__PURE__ */ jsxDEV(
        PhoneStep,
        {
          phone: data.phone,
          errors,
          processing,
          registeredPhone: maskPhoneNumber(pageData.siswa.tel ?? ""),
          onPhoneChange: (value) => setData("phone", value),
          onSubmit: handlePhoneSubmit
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/blokir.tsx",
          lineNumber: 186,
          columnNumber: 25
        },
        void 0
      ),
      step === "otp" && /* @__PURE__ */ jsxDEV(
        OtpStep,
        {
          otp: data.otp,
          phone: data.phone,
          errors,
          processing,
          countdown,
          onOtpChange: (value, index) => handleDigitChange(value, "otp", index),
          onKeyDown: handleOtpKeyDown,
          onBack: () => setStep("phone"),
          onResendOtp: resendOtp,
          onSubmit: handleOtpSubmit,
          inputRefs: otpRefs
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/blokir.tsx",
          lineNumber: 197,
          columnNumber: 25
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/blokir.tsx",
      lineNumber: 166,
      columnNumber: 17
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/components/blokir.tsx",
    lineNumber: 163,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/blokir.tsx",
    lineNumber: 162,
    columnNumber: 9
  }, void 0);
};
const Loading = ({ text = "Loading", variant = "full" }) => {
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      className: clsx(
        "flex justify-center items-center flex-col z-50",
        variant === "full" && "h-screen bg-white",
        variant === "overlay" && "fixed inset-0 bg-black/50 backdrop-blur-sm"
      ),
      children: [
        /* @__PURE__ */ jsxDEV(FaSpinner, { className: "animate-spin text-3xl text-blue-500" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/loading-screen.tsx",
          lineNumber: 18,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-b from-blue-200 to-blue-600 bg-clip-text text-2xl font-bold tracking-wider text-transparent", children: text }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/loading-screen.tsx",
            lineNumber: 21,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "animate-loading-line absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-blue-200 to-blue-600" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/loading-screen.tsx",
            lineNumber: 24,
            columnNumber: 17
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/components/loading-screen.tsx",
          lineNumber: 20,
          columnNumber: 13
        }, void 0)
      ]
    },
    void 0,
    true,
    {
      fileName: "/home/webserver-1/siswa/resources/js/components/loading-screen.tsx",
      lineNumber: 10,
      columnNumber: 9
    },
    void 0
  );
};
const ActiveContent = ({ activeItem, menuItems, onBack }) => {
  if (activeItem === null) return null;
  const item = menuItems[activeItem];
  if (!(item == null ? void 0 : item.content)) return /* @__PURE__ */ jsxDEV("div", { children: "Konten tidak tersedia" }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/active-content.tsx",
    lineNumber: 9,
    columnNumber: 32
  }, void 0);
  return /* @__PURE__ */ jsxDEV(AppLayout, { title: (item == null ? void 0 : item.title) || "MAI", children: /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen overflow-hidden rounded-lg bg-white shadow-md", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onBack,
          className: "flex items-center space-x-2 transition-opacity hover:opacity-80",
          "aria-label": "Kembali",
          children: [
            /* @__PURE__ */ jsxDEV(FaArrowAltCircleLeft, { className: "text-primary-foreground" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/active-content.tsx",
              lineNumber: 20,
              columnNumber: 25
            }, void 0),
            /* @__PURE__ */ jsxDEV("span", { children: "Kembali" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/active-content.tsx",
              lineNumber: 21,
              columnNumber: 25
            }, void 0)
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/active-content.tsx",
          lineNumber: 15,
          columnNumber: 21
        },
        void 0
      ),
      /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-bold text-white", children: item == null ? void 0 : item.title }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/active-content.tsx",
        lineNumber: 23,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/active-content.tsx",
      lineNumber: 14,
      columnNumber: 17
    }, void 0),
    item.content
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/active-content.tsx",
    lineNumber: 13,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/active-content.tsx",
    lineNumber: 12,
    columnNumber: 9
  }, void 0);
};
const StudentInfo = ({ auth, siswaData, onBlockRequest }) => {
  var _a, _b, _c;
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest(".menu-container")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);
  return /* @__PURE__ */ jsxDEV("div", { className: "relative flex w-full flex-col items-start rounded-t-lg bg-white p-4 px-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
      /* @__PURE__ */ jsxDEV(FaUser, { className: "flex-shrink-0 text-xl text-primary" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/student-info.tsx",
        lineNumber: 30,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("h2", { className: "truncate text-3xl font-semibold text-primary", children: ((_a = auth.user) == null ? void 0 : _a.namlen) ?? siswaData.siswa.namlen ?? "******" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/student-info.tsx",
        lineNumber: 31,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/student-info.tsx",
      lineNumber: 29,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
      /* @__PURE__ */ jsxDEV(FaIdCard, { className: "flex-shrink-0 text-lg text-primary" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/student-info.tsx",
        lineNumber: 34,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { className: "text-primary md:text-lg", children: [
        "NIS: ",
        ((_b = auth.user) == null ? void 0 : _b.nis) ?? siswaData.siswa.nis ?? "*****"
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/student-info.tsx",
        lineNumber: 35,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/student-info.tsx",
      lineNumber: 33,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
      /* @__PURE__ */ jsxDEV(FaGraduationCap, { className: "flex-shrink-0 text-lg text-primary" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/student-info.tsx",
        lineNumber: 38,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { className: "text-primary md:text-lg", children: [
        "Kelas: ",
        ((_c = auth.user) == null ? void 0 : _c.kel) ?? siswaData.siswa.kel ?? "***"
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/student-info.tsx",
        lineNumber: 39,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/student-info.tsx",
      lineNumber: 37,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute right-4 bottom-2 menu-container", children: /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setMenuOpen((prev) => !prev),
          className: "p-2 focus:outline-none",
          "aria-label": "Menu pengaturan",
          children: /* @__PURE__ */ jsxDEV(FaCog, { className: "text-xl text-blue-500" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/student-info.tsx",
            lineNumber: 50,
            columnNumber: 25
          }, void 0)
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/student-info.tsx",
          lineNumber: 45,
          columnNumber: 21
        },
        void 0
      ),
      menuOpen && /* @__PURE__ */ jsxDEV("div", { className: "absolute right-0 z-10 mt-1 w-40 rounded-md border bg-white shadow-md", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => {
            setMenuOpen(false);
            setDialogOpen(true);
          },
          className: "w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50",
          children: "🔒 Blokir Kartu"
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/student-info.tsx",
          lineNumber: 55,
          columnNumber: 29
        },
        void 0
      ) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/student-info.tsx",
        lineNumber: 54,
        columnNumber: 25
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/student-info.tsx",
      lineNumber: 44,
      columnNumber: 17
    }, void 0) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/student-info.tsx",
      lineNumber: 43,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV(
      ConfirmDialog,
      {
        open: dialogOpen,
        onOpenChange: setDialogOpen,
        title: "Konfirmasi Blokir",
        description: "Apakah kamu yakin ingin memblokir kartu siswa ini?",
        confirmText: "Ya, Blokir",
        onConfirm: onBlockRequest
      },
      void 0,
      false,
      {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/student-info.tsx",
        lineNumber: 69,
        columnNumber: 13
      },
      void 0
    )
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/student-info.tsx",
    lineNumber: 28,
    columnNumber: 9
  }, void 0);
};
const ActionButtons = ({ auth, data, hasPined, onPinModalOpen, onSetupPinModalOpen, onLogout }) => {
  var _a, _b;
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const register = () => {
    router.get(route("register", data.nouid));
  };
  const disabled = ((_a = data.summary) == null ? void 0 : _a.reg) === 0;
  if (disabled) {
    return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center gap-4 border-t-2 border-b-2 border-blue-500 bg-white p-2 px-6", children: [
      /* @__PURE__ */ jsxDEV(AlertCircle, { className: "font-medium text-amber-600" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/action-buttons.tsx",
        lineNumber: 29,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("span", { className: "font-medium text-amber-600", children: "Status Akun sedang dalam verifikasi" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/action-buttons.tsx",
        lineNumber: 30,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/action-buttons.tsx",
      lineNumber: 28,
      columnNumber: 13
    }, void 0);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "grid w-full grid-cols-2 items-center gap-4 border-b-2 p-2 px-6", children: [
    auth.user ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setLogoutDialogOpen(true),
          className: "flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-red-800 px-4 py-3 text-white shadow-sm transition-colors hover:bg-red-700",
          children: [
            /* @__PURE__ */ jsxDEV(FiLogOut, { className: "text-lg" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/action-buttons.tsx",
              lineNumber: 43,
              columnNumber: 25
            }, void 0),
            /* @__PURE__ */ jsxDEV("span", { children: "Keluar" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/action-buttons.tsx",
              lineNumber: 44,
              columnNumber: 25
            }, void 0)
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/action-buttons.tsx",
          lineNumber: 39,
          columnNumber: 21
        },
        void 0
      ),
      /* @__PURE__ */ jsxDEV(
        ConfirmDialog,
        {
          open: logoutDialogOpen,
          onOpenChange: setLogoutDialogOpen,
          title: "Konfirmasi Logout",
          description: "Anda yakin ingin keluar?",
          confirmText: "Ya, Keluar",
          onConfirm: onLogout
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/action-buttons.tsx",
          lineNumber: 47,
          columnNumber: 21
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/action-buttons.tsx",
      lineNumber: 38,
      columnNumber: 17
    }, void 0) : /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: onPinModalOpen,
        className: "flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50",
        disabled,
        children: [
          /* @__PURE__ */ jsxDEV(FaKey, { className: "text-lg" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/action-buttons.tsx",
            lineNumber: 62,
            columnNumber: 21
          }, void 0),
          /* @__PURE__ */ jsxDEV("span", { children: "Masukan PIN" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/action-buttons.tsx",
            lineNumber: 63,
            columnNumber: 21
          }, void 0)
        ]
      },
      void 0,
      true,
      {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/action-buttons.tsx",
        lineNumber: 57,
        columnNumber: 17
      },
      void 0
    ),
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => {
          var _a2;
          if (hasPined) {
            onSetupPinModalOpen();
          } else if (!hasPined && ((_a2 = data.summary) == null ? void 0 : _a2.reg) === 1) {
            onSetupPinModalOpen();
          } else {
            register();
          }
        },
        className: "flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50",
        disabled,
        children: [
          /* @__PURE__ */ jsxDEV(FaExchangeAlt, { className: "text-lg" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/action-buttons.tsx",
            lineNumber: 80,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDEV("span", { children: hasPined ? "Ubah PIN" : !hasPined && ((_b = data.summary) == null ? void 0 : _b.reg) === 1 ? "Buat Pin" : "daftar" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/action-buttons.tsx",
            lineNumber: 81,
            columnNumber: 17
          }, void 0)
        ]
      },
      void 0,
      true,
      {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/action-buttons.tsx",
        lineNumber: 67,
        columnNumber: 13
      },
      void 0
    )
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/action-buttons.tsx",
    lineNumber: 36,
    columnNumber: 9
  }, void 0);
};
const BalanceSection = ({ formattedSaldo, onNavigate }) => /* @__PURE__ */ jsxDEV("div", { className: "mb-4 w-full shadow-[0px_10px_10px_-4px_rgba(0,0,0,0.1)] shadow-black", children: /* @__PURE__ */ jsxDEV("div", { className: "flex w-full flex-row items-center justify-between gap-4 p-4 sm:px-6", children: [
  /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col space-y-4", children: [
    /* @__PURE__ */ jsxDEV("h1", { className: "text-lg font-semibold text-primary-foreground", children: "Saldo Tabungan" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/balance-section.tsx",
      lineNumber: 10,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-primary-foreground", children: [
      /* @__PURE__ */ jsxDEV(FaWallet, { className: "text-xl" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/balance-section.tsx",
        lineNumber: 12,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-bold", children: formattedSaldo }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/balance-section.tsx",
        lineNumber: 13,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/balance-section.tsx",
      lineNumber: 11,
      columnNumber: 17
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/balance-section.tsx",
    lineNumber: 9,
    columnNumber: 13
  }, void 0),
  /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-end justify-end space-y-4", children: [
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => onNavigate("topup"),
        className: "flex items-center gap-2 rounded-md bg-primary-foreground px-4 py-2 text-primary hover:bg-accent",
        children: [
          /* @__PURE__ */ jsxDEV(FaPlusCircle, {}, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/balance-section.tsx",
            lineNumber: 22,
            columnNumber: 21
          }, void 0),
          /* @__PURE__ */ jsxDEV("span", { children: "Topup" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/balance-section.tsx",
            lineNumber: 23,
            columnNumber: 21
          }, void 0)
        ]
      },
      void 0,
      true,
      {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/balance-section.tsx",
        lineNumber: 18,
        columnNumber: 17
      },
      void 0
    ),
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => onNavigate("riwayat"),
        className: "flex items-center gap-2 rounded-md bg-primary-foreground px-4 py-2 text-primary hover:bg-accent",
        children: [
          /* @__PURE__ */ jsxDEV(FaHistory, {}, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/balance-section.tsx",
            lineNumber: 29,
            columnNumber: 21
          }, void 0),
          /* @__PURE__ */ jsxDEV("span", { children: "Riwayat" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/balance-section.tsx",
            lineNumber: 30,
            columnNumber: 21
          }, void 0)
        ]
      },
      void 0,
      true,
      {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/balance-section.tsx",
        lineNumber: 25,
        columnNumber: 17
      },
      void 0
    )
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/balance-section.tsx",
    lineNumber: 17,
    columnNumber: 13
  }, void 0)
] }, void 0, true, {
  fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/balance-section.tsx",
  lineNumber: 8,
  columnNumber: 9
}, void 0) }, void 0, false, {
  fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/balance-section.tsx",
  lineNumber: 7,
  columnNumber: 5
}, void 0);
const MenuItems = ({ menuItems, onItemClick }) => /* @__PURE__ */ jsxDEV("div", { className: "mb-6 grid grid-cols-3 gap-4 px-4 sm:grid-cols-5", children: menuItems.map((item, index) => /* @__PURE__ */ jsxDEV(
  "button",
  {
    className: `flex flex-col items-center justify-center rounded-xl border border-t-5 p-2 transition duration-200 ${item.color}`,
    onClick: () => onItemClick(index),
    children: [
      item.icon,
      /* @__PURE__ */ jsxDEV("span", { className: "mt-2 text-center text-sm font-semibold text-gray-800", children: item.title }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/menu-items.tsx",
        lineNumber: 17,
        columnNumber: 17
      }, void 0)
    ]
  },
  index,
  true,
  {
    fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/menu-items.tsx",
    lineNumber: 11,
    columnNumber: 13
  },
  void 0
)) }, void 0, false, {
  fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/menu-items.tsx",
  lineNumber: 9,
  columnNumber: 5
}, void 0);
const StatusCard = ({
  variant,
  title,
  description,
  icon,
  className
}) => {
  const defaultIcons = {
    success: /* @__PURE__ */ jsxDEV(CheckCircle, { className: "h-10 w-10 text-green-500" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/components/status-card.tsx",
      lineNumber: 21,
      columnNumber: 18
    }, void 0),
    error: /* @__PURE__ */ jsxDEV(XCircle, { className: "h-10 w-10 text-red-500" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/components/status-card.tsx",
      lineNumber: 22,
      columnNumber: 16
    }, void 0),
    blocked: /* @__PURE__ */ jsxDEV(ShieldOff, { className: "h-10 w-10 text-red-500" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/components/status-card.tsx",
      lineNumber: 23,
      columnNumber: 18
    }, void 0)
  };
  const variantStyles = {
    success: {
      container: "border-blue-200 bg-blue-50 hover:shadow-blue-200",
      text: "text-blue-600",
      description: "text-blue-700"
    },
    error: {
      container: "border-red-300 bg-red-50 hover:shadow-red-200",
      text: "text-red-600",
      description: "text-red-700"
    },
    blocked: {
      container: "border-red-400 bg-red-50",
      text: "text-red-600",
      description: "text-red-700"
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "m-4 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(
    "div",
    {
      className: cn(
        "relative w-full max-w-xl rounded-2xl border shadow-md transition-all duration-300",
        variantStyles[variant].container,
        className
      ),
      children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center p-6 text-center", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: icon || defaultIcons[variant] }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/status-card.tsx",
          lineNumber: 55,
          columnNumber: 21
        }, void 0),
        /* @__PURE__ */ jsxDEV("h3", { className: cn("mb-2 text-xl font-bold", variantStyles[variant].text), children: title }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/status-card.tsx",
          lineNumber: 56,
          columnNumber: 21
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: cn("space-y-1 text-sm", variantStyles[variant].description), children: typeof description === "string" ? /* @__PURE__ */ jsxDEV("p", { children: description }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/status-card.tsx",
          lineNumber: 60,
          columnNumber: 60
        }, void 0) : description }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/status-card.tsx",
          lineNumber: 59,
          columnNumber: 21
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/status-card.tsx",
        lineNumber: 54,
        columnNumber: 17
      }, void 0)
    },
    void 0,
    false,
    {
      fileName: "/home/webserver-1/siswa/resources/js/components/status-card.tsx",
      lineNumber: 47,
      columnNumber: 13
    },
    void 0
  ) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/status-card.tsx",
    lineNumber: 46,
    columnNumber: 9
  }, void 0);
};
const RegistrationStatus = ({ data }) => {
  var _a, _b, _c;
  if (((_a = data.summary) == null ? void 0 : _a.reg) === 0) {
    return /* @__PURE__ */ jsxDEV(
      StatusCard,
      {
        variant: "success",
        title: "Pendaftaran Anda berhasil",
        description: /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV("p", { children: "Terima kasih! Kami sedang memverifikasi data Anda." }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/registration-status.tsx",
            lineNumber: 14,
            columnNumber: 25
          }, void 0),
          /* @__PURE__ */ jsxDEV("p", { children: "PIN akan dikirim ke nomor WhatsApp Anda setelah disetujui." }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/registration-status.tsx",
            lineNumber: 15,
            columnNumber: 25
          }, void 0),
          /* @__PURE__ */ jsxDEV("p", { children: "Pastikan nomor WhatsApp yang Anda daftarkan aktif untuk menerima informasi lebih lanjut." }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/registration-status.tsx",
            lineNumber: 16,
            columnNumber: 25
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/registration-status.tsx",
          lineNumber: 13,
          columnNumber: 21
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/registration-status.tsx",
        lineNumber: 9,
        columnNumber: 13
      },
      void 0
    );
  }
  if (((_b = data.summary) == null ? void 0 : _b.reg) === -1) {
    return /* @__PURE__ */ jsxDEV(
      StatusCard,
      {
        variant: "error",
        title: "Pendaftaran Anda ditolak",
        description: /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV("p", { children: "Mohon maaf, pendaftaran Anda belum dapat disetujui pada saat ini." }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/registration-status.tsx",
            lineNumber: 30,
            columnNumber: 25
          }, void 0),
          /* @__PURE__ */ jsxDEV("p", { children: "Silakan mendaftar kembali dengan memastikan seluruh data telah lengkap dan sesuai ketentuan." }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/registration-status.tsx",
            lineNumber: 31,
            columnNumber: 25
          }, void 0),
          /* @__PURE__ */ jsxDEV("p", { children: "Jika membutuhkan bantuan, silakan hubungi tim kami melalui kontak resmi yang tersedia." }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/registration-status.tsx",
            lineNumber: 32,
            columnNumber: 25
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/registration-status.tsx",
          lineNumber: 29,
          columnNumber: 21
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/registration-status.tsx",
        lineNumber: 25,
        columnNumber: 13
      },
      void 0
    );
  }
  if (((_c = data.summary) == null ? void 0 : _c.reg) === -2) {
    return /* @__PURE__ */ jsxDEV(
      StatusCard,
      {
        variant: "blocked",
        title: "Kartu Diblokir",
        description: "Kartu ini telah diblokir dan tidak dapat digunakan. Silakan hubungi pihak terkait untuk informasi lebih lanjut."
      },
      void 0,
      false,
      {
        fileName: "/home/webserver-1/siswa/resources/js/components/siswa/dashboard/registration-status.tsx",
        lineNumber: 41,
        columnNumber: 13
      },
      void 0
    );
  }
  return null;
};
function SiswaDashboard() {
  var _a, _b;
  const { auth, data: initialData } = usePage().props;
  const { log } = useLogger();
  const { props } = usePage();
  if (useAppConfig().APP_DEBUG) {
    useEffect(() => {
      console.count("Component Render");
      log(props);
    }, []);
  }
  const [siswaData, setSiswaData] = useState({
    idok: initialData.idok,
    active: initialData.active,
    nouid: initialData.nouid,
    balance: initialData.balance,
    summary: initialData.summary,
    siswa: initialData.siswa
  });
  const [activeItem, setActiveItem] = useState(null);
  const [page, setPage] = useState("index");
  const [isLoading, setIsLoading] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  const [hasPined, setHasPined] = useState(Boolean((_a = initialData.summary) == null ? void 0 : _a.pin));
  const [openModal, setOpenModal] = useState(null);
  const [tagihanParam, setTagihanParam] = useState({
    spr: [],
    tagihan: 0
  });
  useToast(usePage().props);
  useEffect(() => {
    setSiswaData((prev) => ({ ...prev, initialData }));
  }, [initialData]);
  const menuItems = useMemo(() => [
    {
      title: "Tagihan",
      icon: /* @__PURE__ */ jsxDEV(FaFileInvoiceDollar, { className: "h-6 w-6 text-green-600" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
        lineNumber: 88,
        columnNumber: 19
      }, this),
      color: "border-green-700 bg-green-50 hover:bg-green-100",
      content: /* @__PURE__ */ jsxDEV(
        TagihanContent,
        {
          nouid: siswaData.nouid,
          setTagihanParam: (v) => {
            setTagihanParam(v);
            setPage("tagihan");
          },
          onClose: () => setActiveItem(null)
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
          lineNumber: 91,
          columnNumber: 17
        },
        this
      )
    },
    {
      title: "Data Siswa",
      icon: /* @__PURE__ */ jsxDEV(FaUserGraduate, { className: "h-6 w-6 text-amber-600" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
        lineNumber: 103,
        columnNumber: 19
      }, this),
      color: "border-amber-700 bg-amber-50 hover:bg-amber-100",
      content: /* @__PURE__ */ jsxDEV(DataSiswaContent, { nouid: siswaData.nouid, siswa: siswaData.siswa }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
        lineNumber: 105,
        columnNumber: 22
      }, this)
    },
    {
      title: "Kegiatan",
      icon: /* @__PURE__ */ jsxDEV(FaFootballBall, { className: "h-6 w-6 text-rose-600" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
        lineNumber: 109,
        columnNumber: 19
      }, this),
      color: "border-rose-700 bg-rose-50 hover:bg-rose-100",
      content: /* @__PURE__ */ jsxDEV(Excul, { nouid: siswaData.nouid }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
        lineNumber: 111,
        columnNumber: 22
      }, this)
    }
  ], [siswaData]);
  const formattedSaldo = useMemo(() => formatIDR((siswaData == null ? void 0 : siswaData.balance) || 0), [siswaData == null ? void 0 : siswaData.balance]);
  const navigateToPage = useCallback((newPage) => {
    if (newPage === "riwayat") {
      setIsHistory(true);
      setOpenModal("pin");
    } else {
      setPage(newPage);
    }
  }, []);
  const refreshData = useCallback(() => {
    setIsLoading(true);
    router.visit(T("siswa.index", siswaData.nouid), {
      only: ["data"],
      preserveState: true,
      onSuccess: () => setIsLoading(false),
      onError: () => setIsLoading(false)
    });
    console.count("Refresh Data");
  }, [siswaData.nouid]);
  const openPinModal = useCallback(() => {
    if (!isLoading) setOpenModal("pin");
  }, [isLoading]);
  const openSetupPinModal = useCallback(() => {
    if (!isLoading) setOpenModal("setupPin");
  }, [isLoading]);
  const closeModal = useCallback((success = false) => {
    setOpenModal(null);
    if (!success) {
      setIsHistory(false);
      setPage("index");
    }
  }, []);
  const handleLogout = useCallback(() => {
    router.post(
      T("siswa.logout", siswaData.nouid),
      {},
      {
        onStart: () => setIsLoading(true),
        onFinish: () => setIsLoading(false)
      }
    );
  }, [siswaData.nouid]);
  const handleBlockRequest = useCallback(() => {
    setOpenModal("blokir");
  }, []);
  if (!siswaData.active) {
    return /* @__PURE__ */ jsxDEV(AppLayout, { title: "Kartu Siswa", children: /* @__PURE__ */ jsxDEV("div", { className: "flex min-h-screen items-center bg-white", children: /* @__PURE__ */ jsxDEV("div", { className: "mx-2 flex w-full flex-col items-center justify-center rounded-lg border-2 border-red-400 bg-red-50 p-6 text-center shadow-sm", children: [
      /* @__PURE__ */ jsxDEV("h3", { className: "mb-2 text-lg font-semibold text-red-600", children: "🔒 Kartu Diblokir" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
        lineNumber: 178,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "mb-4 text-sm text-red-700", children: "Kartu ini telah diblokir dan tidak dapat digunakan. Silakan aktifkan kembali untuk melanjutkan." }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
        lineNumber: 179,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: openSetupPinModal,
          className: "inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700",
          children: "🔓 Aktifkan Kembali"
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
          lineNumber: 182,
          columnNumber: 25
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
      lineNumber: 177,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
      lineNumber: 176,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
      lineNumber: 175,
      columnNumber: 13
    }, this);
  }
  if (activeItem !== null) {
    return /* @__PURE__ */ jsxDEV(
      ActiveContent,
      {
        activeItem,
        menuItems,
        onBack: () => setActiveItem(null)
      },
      void 0,
      false,
      {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
        lineNumber: 197,
        columnNumber: 13
      },
      this
    );
  }
  switch (page) {
    case "topup":
      return /* @__PURE__ */ jsxDEV(
        Topup,
        {
          siswa: siswaData.siswa,
          nouid: siswaData.nouid,
          onClose: () => {
            setPage("index");
            closeModal();
            refreshData();
          }
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
          lineNumber: 209,
          columnNumber: 17
        },
        this
      );
    case "tagihan":
      return /* @__PURE__ */ jsxDEV(
        PaymentPage,
        {
          siswa: siswaData.siswa,
          tagihanParam: { ...tagihanParam, nouid: siswaData.nouid },
          onClose: () => {
            setPage("index");
            closeModal();
            refreshData();
          }
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
          lineNumber: 221,
          columnNumber: 17
        },
        this
      );
    default:
      return /* @__PURE__ */ jsxDEV(Fragment, { children: [
        isLoading && /* @__PURE__ */ jsxDEV(Loading, { text: "Memuat Data", variant: "overlay" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
          lineNumber: 234,
          columnNumber: 35
        }, this),
        /* @__PURE__ */ jsxDEV(AppLayout, { title: ((_b = auth.user) == null ? void 0 : _b.namlen) ?? "Login", children: [
          /* @__PURE__ */ jsxDEV(
            StudentInfo,
            {
              auth,
              siswaData,
              onBlockRequest: handleBlockRequest
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
              lineNumber: 237,
              columnNumber: 25
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            ActionButtons,
            {
              auth,
              data: siswaData,
              hasPined,
              onPinModalOpen: openPinModal,
              onSetupPinModalOpen: openSetupPinModal,
              onLogout: handleLogout
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
              lineNumber: 243,
              columnNumber: 25
            },
            this
          ),
          auth.user && /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV(
              BalanceSection,
              {
                formattedSaldo,
                onNavigate: navigateToPage
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
                lineNumber: 254,
                columnNumber: 33
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              MenuItems,
              {
                menuItems,
                onItemClick: setActiveItem
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
                lineNumber: 258,
                columnNumber: 33
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
            lineNumber: 253,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV(RegistrationStatus, { data: siswaData }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
            lineNumber: 265,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
          lineNumber: 236,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV(
          Blokir,
          {
            open: openModal === "blokir",
            onClose: () => closeModal(),
            setLoading: setIsLoading
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
            lineNumber: 269,
            columnNumber: 21
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          PinPage,
          {
            open: openModal === "pin",
            hasPin: hasPined,
            setPage,
            handle: auth.user ? isHistory ? "riwayat" : "auth" : "index",
            onClose: (success) => {
              closeModal(success);
              if (!success) setIsHistory(false);
            }
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
            lineNumber: 275,
            columnNumber: 21
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          SetupPinPage,
          {
            open: openModal === "setupPin",
            hasPin: hasPined,
            setHasPined: () => setHasPined(true),
            onClose: () => {
              closeModal();
            }
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
            lineNumber: 286,
            columnNumber: 21
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Index.tsx",
        lineNumber: 233,
        columnNumber: 17
      }, this);
  }
}
export {
  SiswaDashboard as default
};
