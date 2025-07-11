import { jsx, jsxs } from "react/jsx-runtime";
import { M as Modal } from "./Modal-XQRpvi6T.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { FaKey } from "react-icons/fa";
import "./utils-UO2Utf7z.js";
import "clsx";
import "tailwind-merge";
import "lucide-react";
const PinPage = ({ handle, setPage, setOpenSetupPin, hasPin, open, onClose }) => {
  const { errors, data: pageData } = usePage().props;
  const { data, setData, post, processing, reset } = useForm({
    pin: "",
    nouid: pageData.nouid ?? ""
  });
  const [inputType, setInputType] = useState("password");
  const inputRefs = useRef(Array(6).fill(null));
  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const nouidFromUrl = pathParts[1];
    setData("nouid", nouidFromUrl);
  }, [setData]);
  useEffect(() => {
    var _a;
    if (open && inputRefs.current[0]) {
      (_a = inputRefs.current[0]) == null ? void 0 : _a.focus();
    }
  }, [open]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(data.pin)) {
      return;
    }
    post(route("siswa.verify-pin", { nouid: pageData.nouid, p: handle }), {
      preserveState: true,
      onSuccess: () => {
        onClose(true);
        reset();
        if (handle === "riwayat") {
          setPage("riwayat");
        }
      },
      onError: () => {
        var _a;
        setData("pin", "");
        setPage("index");
        if (inputRefs.current[0]) {
          (_a = inputRefs.current[0]) == null ? void 0 : _a.focus();
        }
      }
    });
  };
  const handlePinChange = (e, index) => {
    var _a;
    const value = e.target.value.replace(/\D/g, "");
    const newPin = data.pin.split("");
    newPin[index] = value.charAt(value.length - 1) || "";
    setData("pin", newPin.join(""));
    if (value && index < 5 && inputRefs.current[index + 1]) {
      (_a = inputRefs.current[index + 1]) == null ? void 0 : _a.focus();
    }
  };
  const handleKeyDown = (e, index) => {
    var _a;
    if (e.key === "Backspace" && !data.pin[index] && index > 0 && inputRefs.current[index - 1]) {
      (_a = inputRefs.current[index - 1]) == null ? void 0 : _a.focus();
    }
  };
  const handlePaste = (e) => {
    var _a;
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, 6);
    if (pasteData.length > 0) {
      setData("pin", pasteData);
      const focusIndex = Math.min(pasteData.length - 1, 5);
      if (inputRefs.current[focusIndex]) {
        (_a = inputRefs.current[focusIndex]) == null ? void 0 : _a.focus();
      }
    }
  };
  return /* @__PURE__ */ jsx(Modal, { title: hasPin ? "" : "Anda Belum Membuat PIN", isOpen: open, onClose: () => onClose(false), children: hasPin ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
    /* @__PURE__ */ jsx(Head, { title: "Masukkan PIN" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md space-y-8", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Masukkan PIN" }) }),
      errors.pin && /* @__PURE__ */ jsx("div", { className: "mb-4 text-center text-sm text-red-500", children: errors.pin }),
      /* @__PURE__ */ jsxs("form", { className: "mt-8 space-y-6", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center space-x-2", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsx(
          "input",
          {
            ref: (el) => {
              inputRefs.current[index] = el;
            },
            type: inputType,
            inputMode: "numeric",
            pattern: "[0-9]",
            maxLength: 1,
            required: true,
            autoComplete: "off",
            className: "h-12 w-12 rounded-md border border-gray-300 text-center text-2xl focus:border-blue-500 focus:ring-blue-500 focus:outline-none",
            value: data.pin[index] || "",
            onChange: (e) => handlePinChange(e, index),
            onKeyDown: (e) => handleKeyDown(e, index),
            onPaste: handlePaste
          },
          index
        )) }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "text-sm text-gray-600 hover:text-gray-800",
            onClick: () => setInputType(inputType === "password" ? "text" : "password"),
            children: inputType === "password" ? "Tampilkan PIN" : "Sembunyikan PIN"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col space-y-2", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing || data.pin.length !== 6,
            className: `group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white ${data.pin.length === 6 ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none" : "cursor-not-allowed bg-gray-400"}`,
            children: processing ? "Memverifikasi..." : "Masuk"
          }
        ) })
      ] })
    ] })
  ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center space-y-4 rounded-xl p-6 text-center", children: [
    /* @__PURE__ */ jsx("p", { className: "max-w-md text-sm", children: "Silakan verifikasi nomor WhatsApp Anda dan buat PIN terlebih dahulu sebelum melanjutkan." }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: setOpenSetupPin,
        className: "flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50",
        children: [
          /* @__PURE__ */ jsx(FaKey, { className: "text-lg" }),
          /* @__PURE__ */ jsx("span", { children: "Buat PIN" })
        ]
      }
    )
  ] }) });
};
export {
  PinPage as default
};
