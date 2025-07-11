import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { M as Modal } from "./Modal-XQRpvi6T.js";
import { m as maskPhoneNumber, c as cn, f as formatIDR } from "./utils-UO2Utf7z.js";
import { usePage, useForm, Head, router } from "@inertiajs/react";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ArrowLeftIcon } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { u as useToast } from "./use-toast-DCJD4gzY.js";
import { A as AppLayout } from "./AppLayout-CqEdbHnq.js";
import { FaFileInvoiceDollar, FaUserGraduate, FaFootballBall, FaTimes, FaAtom, FaUser, FaIdCard, FaGraduationCap, FaCog, FaKey, FaExchangeAlt, FaWallet, FaPlusCircle, FaHistory } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { T } from "../ssr.js";
import Topup from "./Topup-Cu3pQ8fJ.js";
import PaymentPage from "./Tagihan-B6YTCssC.js";
import DataSiswaContent from "./DataSiswaContent-C60nKkkZ.js";
import Excul from "./Excul-Y7xU6cUe.js";
import PinPage from "./Pin-_xh2jcAH.js";
import SetupPinPage from "./SetupPin-BumI-Ndq.js";
import TagihanContent from "./TagihanContent-KcHHrG4C.js";
import "clsx";
import "tailwind-merge";
import "react-toastify";
import "@inertiajs/react/server";
import "react-dom/server";
import "./InputGroup-1Zv-qQ-V.js";
import "react-icons/bs";
import "./TambahTagihan-BeFUbly4.js";
const DigitInput = React.forwardRef(
  ({ value, onChange, onKeyDown, onPaste, type = "text", error = false, autoFocus = false }, ref) => /* @__PURE__ */ jsx(
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
    }
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
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("button", { onClick: onBack, className: "flex items-center text-sm text-gray-600 hover:text-gray-800", type: "button", children: [
      /* @__PURE__ */ jsx(ArrowLeftIcon, { className: "mr-1 h-4 w-4" }),
      "Kembali"
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-center text-2xl font-bold text-gray-900", children: "Verifikasi OTP" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-center text-sm text-gray-600", children: [
        "Masukkan 6 digit kode OTP yang dikirim ke +62",
        phone
      ] })
    ] }),
    errors.otp && /* @__PURE__ */ jsx("div", { className: "text-center text-sm text-red-500", children: errors.otp }),
    /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center space-x-2", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsx(
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
        index
      )) }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: countdown > 0 ? /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
        "Kirim ulang OTP dalam ",
        countdown,
        " detik"
      ] }) : /* @__PURE__ */ jsx("button", { type: "button", onClick: onResendOtp, className: "text-sm text-blue-600 hover:text-blue-800", children: "Kirim Ulang OTP" }) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing || otp.length !== 6,
          className: `flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${otp.length === 6 ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" : "cursor-not-allowed bg-gray-400"} focus:ring-2 focus:ring-offset-2 focus:outline-none`,
          children: processing ? "Memverifikasi..." : "Verifikasi"
        }
      ) })
    ] })
  ] });
};
const PhoneStep = ({
  phone,
  errors,
  processing,
  registeredPhone,
  onPhoneChange,
  onSubmit
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-center text-2xl font-bold text-gray-900", children: "Masukkan Nomor HP Anda yang terdaftar" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-center text-sm text-gray-600", children: [
        "Kami akan mengirimkan kode OTP ke nomor ini ",
        /* @__PURE__ */ jsx("br", {}),
        registeredPhone
      ] })
    ] }),
    errors.phone && /* @__PURE__ */ jsx("div", { className: "text-center text-sm text-red-500", children: errors.phone }),
    /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-6", children: [
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
              value: phone,
              onChange: (e) => onPhoneChange(e.target.value.replace(/\D/g, "")),
              required: true
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing || phone.length < 10,
          className: `flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${phone.length >= 10 ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" : "cursor-not-allowed bg-gray-400"} focus:ring-2 focus:ring-offset-2 focus:outline-none`,
          children: processing ? "Mengirim OTP..." : "Kirim Kode OTP"
        }
      ) })
    ] })
  ] });
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
  setInputRef,
  inputRefs
}) => {
  const handleChange = (e, index) => {
    var _a;
    const value = e.target.value.replace(/\D/g, "");
    onPinChange(e, index);
    if (value && index < 5 && inputRefs.current[index + 1]) {
      (_a = inputRefs.current[index + 1]) == null ? void 0 : _a.focus();
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md space-y-8", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Masukkan PIN" }) }),
    errors.pin && /* @__PURE__ */ jsx("div", { className: "mb-4 text-center text-sm text-red-500", children: errors.pin }),
    /* @__PURE__ */ jsxs("form", { className: "mt-8 space-y-6", onSubmit, children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center space-x-2", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsx(
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
          autoFocus: index === 0
        },
        index
      )) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("button", { type: "button", className: "text-sm text-gray-600 hover:text-gray-800", onClick: onToggleInputType, children: inputType === "password" ? "Tampilkan PIN" : "Sembunyikan PIN" }) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col space-y-2", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing || pin.length !== 6,
          className: `group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white ${pin.length === 6 ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none" : "cursor-not-allowed bg-gray-400"}`,
          children: processing ? "Memverifikasi..." : "Masuk"
        }
      ) })
    ] })
  ] }) });
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
  return /* @__PURE__ */ jsx(Modal, { title: "Verifikasi PIN", isOpen: open, onClose, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
    /* @__PURE__ */ jsx(Head, { title: step === "pin" ? "Verifikasi PIN" : step === "otp" ? "Verifikasi OTP" : "Verifikasi Nomor Telepon" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md rounded-lg", children: [
      step === "pin" && /* @__PURE__ */ jsx(
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
        }
      ),
      step === "phone" && /* @__PURE__ */ jsx(
        PhoneStep,
        {
          phone: data.phone,
          errors,
          processing,
          registeredPhone: maskPhoneNumber(pageData.siswa.tel ?? ""),
          onPhoneChange: (value) => setData("phone", value),
          onSubmit: handlePhoneSubmit
        }
      ),
      step === "otp" && /* @__PURE__ */ jsx(
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
        }
      )
    ] })
  ] }) });
};
function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Ya",
  cancelText = "Batal",
  onConfirm,
  children,
  variant = "danger"
}) {
  const handleConfirm = useCallback(() => {
    onConfirm();
    onOpenChange(false);
  }, [onConfirm, onOpenChange]);
  return /* @__PURE__ */ jsxs(Dialog.Root, { open, onOpenChange, children: [
    children && children,
    /* @__PURE__ */ jsxs(Dialog.Portal, { children: [
      /* @__PURE__ */ jsx(Dialog.Overlay, { className: "fixed inset-0 bg-black/30 backdrop-blur-sm" }),
      /* @__PURE__ */ jsxs(Dialog.Content, { className: "fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg", children: [
        /* @__PURE__ */ jsx(Dialog.Title, { className: "mb-2 text-xl font-bold text-gray-800", children: title }),
        /* @__PURE__ */ jsx(Dialog.Description, { className: "mb-4 text-sm text-gray-600", children: description }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-3", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => onOpenChange(false), className: "rounded-md bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200", children: cancelText }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleConfirm,
              className: cn(
                `rounded-md px-4 py-2 text-sm text-white`,
                variant === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
              ),
              children: confirmText
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function SiswaDashboard() {
  const { auth, data } = usePage().props;
  console.log(data);
  const [siswaData, setSiswaData] = useState(data);
  const [activeItem, setActiveItem] = useState(null);
  const [page, setPage] = useState("index");
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  const [hasPined, setHasPined] = useState(data.siswa.has_pin);
  const [openModal, setOpenModal] = useState(null);
  const [tagihanParam, setTagihanParam] = useState({
    spr: [],
    tagihan: 0
  });
  useToast(usePage().props);
  useEffect(() => {
    setSiswaData(data);
  }, [data]);
  const navigateToPage = useCallback(async (newPage) => {
    if (newPage === "riwayat") {
      setIsHistory(true);
      setOpenModal("pin");
    } else {
      setPage(newPage);
    }
  }, []);
  const menuItems = useMemo(
    () => [
      {
        title: "Tagihan",
        icon: /* @__PURE__ */ jsx(FaFileInvoiceDollar, { className: "h-6 w-6 text-green-600" }),
        color: "border-green-700 bg-green-50 hover:bg-green-100",
        content: /* @__PURE__ */ jsx(
          TagihanContent,
          {
            nouid: siswaData.nouid,
            setTagihanParam: (v) => {
              setTagihanParam(v);
              navigateToPage("tagihan");
            }
          }
        )
      },
      {
        title: "Data Siswa",
        icon: /* @__PURE__ */ jsx(FaUserGraduate, { className: "h-6 w-6 text-amber-600" }),
        color: "border-amber-700 bg-amber-50 hover:bg-amber-100",
        content: /* @__PURE__ */ jsx(DataSiswaContent, { nouid: siswaData.nouid, siswa: siswaData.siswa })
      },
      {
        title: "Ekstrakurikuler",
        icon: /* @__PURE__ */ jsx(FaFootballBall, { className: "h-6 w-6 text-rose-600" }),
        color: "border-rose-700 bg-rose-50 hover:bg-rose-100",
        content: /* @__PURE__ */ jsx(Excul, { nouid: data.nouid })
      }
    ],
    [siswaData, navigateToPage, data]
  );
  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(T("api.siswa", siswaData.nouid) + `?nouid=${encodeURIComponent(siswaData.nouid)}`);
      if (!res.ok) {
        console.error("Terjadi kesalahan saat mengambil data siswa");
      }
      const data2 = await res.json();
      if (data2.success !== true) {
        console.error(data2.message || "Terjadi kesalahan pada server");
      }
      setSiswaData(data2.data);
    } catch (err) {
      setIsLoading(false);
      console.error(err instanceof Error ? err.message : "Terjadi kesalahan jaringan");
    } finally {
      setIsLoading(false);
    }
  }, [siswaData]);
  const openPinModal = useCallback(async () => {
    if (!isLoading) setOpenModal("pin");
  }, [isLoading]);
  const openSetupPinModal = useCallback(async () => {
    if (!isLoading) setOpenModal("setupPin");
  }, [isLoading]);
  const closeModal = useCallback(async (success = false) => {
    setOpenModal(null);
    if (!success) {
      setIsHistory(false);
      setPage("index");
    }
  }, []);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const handleLogout = useCallback(() => {
    router.post(
      T("siswa.logout", siswaData.nouid),
      {},
      {
        onStart: () => setIsLoading(true),
        onSuccess: () => setIsLoading(false),
        onError: () => setIsLoading(false)
      }
    );
  }, [siswaData.nouid]);
  const formattedSaldo = useMemo(() => formatIDR((siswaData == null ? void 0 : siswaData.siswa.balance) || 0), [siswaData == null ? void 0 : siswaData.siswa.balance]);
  const renderActiveContent = useMemo(() => {
    if (activeItem === null) return null;
    const item = menuItems[activeItem];
    return (item == null ? void 0 : item.content) ? /* @__PURE__ */ jsxs("div", { className: "relative rounded-xl border border-t-4 border-gray-800 bg-blue-50 p-2 pt-8 shadow-lg", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveItem(null),
          className: "absolute top-3 right-3 text-gray-500 transition hover:text-red-500",
          "aria-label": "Tutup",
          children: /* @__PURE__ */ jsx(FaTimes, { className: "h-5 w-5" })
        }
      ),
      item.content
    ] }) : /* @__PURE__ */ jsx("div", { children: "Konten tidak tersedia" });
  }, [activeItem, menuItems]);
  const StudentInfo = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    return /* @__PURE__ */ jsxs("div", { className: "relative flex w-full flex-col items-start rounded-t-lg bg-white p-4 px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx(FaUser, { className: "flex-shrink-0 text-xl text-primary" }),
        /* @__PURE__ */ jsx("h2", { className: "truncate text-3xl font-semibold text-primary", children: (siswaData == null ? void 0 : siswaData.siswa.namlen) || "******" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx(FaIdCard, { className: "flex-shrink-0 text-lg text-primary" }),
        /* @__PURE__ */ jsxs("p", { className: "text-primary md:text-lg", children: [
          "NIS: ",
          (siswaData == null ? void 0 : siswaData.siswa.nis) || "*****"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx(FaGraduationCap, { className: "flex-shrink-0 text-lg text-primary" }),
        /* @__PURE__ */ jsxs("p", { className: "text-primary md:text-lg", children: [
          "Kelas: ",
          (siswaData == null ? void 0 : siswaData.siswa.kel) || "******"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute right-4 bottom-2", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "cursor-pointer p-2", onClick: () => setMenuOpen((prev) => !prev), children: /* @__PURE__ */ jsx(FaCog, { className: "text-xl text-blue-500" }) }),
        menuOpen && /* @__PURE__ */ jsx("div", { className: "absolute right-0 z-10 mt-1 w-40 rounded-md border bg-white shadow-md", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setMenuOpen(false);
              setDialogOpen(true);
            },
            className: "w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50",
            children: "🔒 Blokir Kartu"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(
        ConfirmDialog,
        {
          open: dialogOpen,
          onOpenChange: setDialogOpen,
          title: "Konfirmasi Blokir",
          description: "Apakah kamu yakin ingin memblokir kartu siswa ini?",
          confirmText: "Ya, Blokir",
          onConfirm: () => {
            setOpenModal("blokir");
            setIsBlocked(true);
          }
        }
      )
    ] });
  };
  const ActionButtons = () => /* @__PURE__ */ jsxs("div", { className: "grid w-full grid-cols-2 items-center gap-4 border-b-2 p-2 px-6", children: [
    auth.user ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setLogoutDialogOpen(true),
          className: "flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-red-800 px-4 py-3 text-white shadow-sm transition-colors hover:bg-red-700",
          children: [
            /* @__PURE__ */ jsx(FiLogOut, { className: "text-lg" }),
            /* @__PURE__ */ jsx("span", { children: "Keluar" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        ConfirmDialog,
        {
          open: logoutDialogOpen,
          onOpenChange: setLogoutDialogOpen,
          title: "Konfirmasi Logout",
          description: "Anda yakin ingin keluar?",
          confirmText: "Ya, Keluar",
          onConfirm: handleLogout
        }
      )
    ] }) : /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: openPinModal,
        className: "flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50",
        children: [
          /* @__PURE__ */ jsx(FaKey, { className: "text-lg" }),
          /* @__PURE__ */ jsx("span", { children: "Masukan PIN" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: openSetupPinModal,
        className: "flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50",
        children: [
          /* @__PURE__ */ jsx(FaExchangeAlt, { className: "text-lg" }),
          /* @__PURE__ */ jsx("span", { children: hasPined ? "Ubah PIN" : "Buat Pin" })
        ]
      }
    )
  ] });
  const BalanceSection = () => /* @__PURE__ */ jsx("div", { className: "mb-4 w-full shadow-[0px_10px_10px_-4px_rgba(0,0,0,0.1)] shadow-black", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-row items-center justify-between gap-4 p-4 sm:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-lg font-semibold text-primary-foreground", children: "Saldo Tabungan" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-primary-foreground", children: [
        /* @__PURE__ */ jsx(FaWallet, { className: "text-xl" }),
        /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: formattedSaldo })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end justify-end space-y-4", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => navigateToPage("topup"),
          className: "flex items-center gap-2 rounded-md bg-primary-foreground px-4 py-2 text-primary hover:bg-accent",
          children: [
            /* @__PURE__ */ jsx(FaPlusCircle, {}),
            /* @__PURE__ */ jsx("span", { children: "Topup" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => navigateToPage("riwayat"),
          className: "flex items-center gap-2 rounded-md bg-primary-foreground px-4 py-2 text-primary hover:bg-accent",
          children: [
            /* @__PURE__ */ jsx(FaHistory, {}),
            /* @__PURE__ */ jsx("span", { children: "Riwayat" })
          ]
        }
      )
    ] })
  ] }) });
  const MenuItems = () => /* @__PURE__ */ jsx("div", { className: "mb-6 grid grid-cols-3 gap-4 px-4 sm:grid-cols-5", children: menuItems.map((item, index) => /* @__PURE__ */ jsxs(
    "button",
    {
      className: `flex flex-col items-center justify-center rounded-xl border border-t-5 p-2 transition duration-200 ${item.color}`,
      onClick: () => setActiveItem(index),
      children: [
        item.icon,
        /* @__PURE__ */ jsx("span", { className: "mt-2 text-center text-sm font-semibold text-gray-800", children: item.title })
      ]
    },
    index
  )) });
  if (isLoading) {
    return /* @__PURE__ */ jsx(AppLayout, { title: "Loading...", children: /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col items-center justify-center space-y-6 bg-blue-100", children: [
      /* @__PURE__ */ jsx(FaAtom, { className: "animate-spin-slow text-5xl text-blue-400" }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-2xl font-bold tracking-wider text-transparent", children: "Memuat Data" }),
        /* @__PURE__ */ jsx("div", { className: "animate-loading-line absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600" })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    !data.active ? /* @__PURE__ */ jsx(AppLayout, { title: "Kartu Siswa", children: /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center bg-white", children: /* @__PURE__ */ jsxs("div", { className: "mx-2 flex w-full flex-col items-center justify-center rounded-lg border-2 border-red-400 bg-red-50 p-6 text-center shadow-sm", children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-semibold text-red-600", children: "🔒 Kartu Diblokir" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm text-red-700", children: "Kartu ini telah diblokir dan tidak dapat digunakan. Silakan aktifkan kembali untuk melanjutkan." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setOpenModal("setupPin"),
          className: "inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700",
          children: "🔓 Aktifkan Kembali"
        }
      )
    ] }) }) }) : /* @__PURE__ */ jsx(Fragment, { children: page === "index" ? /* @__PURE__ */ jsxs(AppLayout, { title: (siswaData == null ? void 0 : siswaData.siswa.namlen) || "Login", children: [
      /* @__PURE__ */ jsx(StudentInfo, {}),
      /* @__PURE__ */ jsx(ActionButtons, {}),
      auth.user && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(BalanceSection, {}),
        /* @__PURE__ */ jsx(MenuItems, {}),
        renderActiveContent
      ] })
    ] }) : page === "topup" ? /* @__PURE__ */ jsx(
      Topup,
      {
        siswa: siswaData.siswa,
        nouid: siswaData.nouid,
        onClose: () => {
          setPage("index");
          closeModal();
          refreshData();
        }
      }
    ) : page === "tagihan" ? /* @__PURE__ */ jsx(
      PaymentPage,
      {
        siswa: siswaData.siswa,
        tagihanParam: { ...tagihanParam, nouid: siswaData.nouid },
        onClose: () => {
          setPage("index");
          closeModal();
          refreshData();
        }
      }
    ) : null }),
    /* @__PURE__ */ jsx(Blokir, { open: openModal === "blokir", onClose: () => closeModal(), setLoading: (v) => setIsLoading(v) }),
    /* @__PURE__ */ jsx(
      PinPage,
      {
        open: openModal === "pin",
        hasPin: hasPined,
        handle: !auth.user ? "index" : isHistory ? "riwayat" : "auth",
        setPage,
        setOpenSetupPin: openSetupPinModal,
        onClose: (success) => {
          closeModal(success);
          if (!success) setIsHistory(false);
        }
      }
    ),
    /* @__PURE__ */ jsx(
      SetupPinPage,
      {
        open: openModal === "setupPin",
        hasPin: hasPined,
        setHasPined: () => setHasPined(true),
        onClose: () => {
          closeModal();
          refreshData();
        }
      }
    )
  ] });
}
export {
  SiswaDashboard as default
};
