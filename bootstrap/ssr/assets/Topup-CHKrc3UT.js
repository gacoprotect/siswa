import { jsxs, jsx } from "react/jsx-runtime";
import { b as bca, a as bni, c as bri, m as mandiri, p as permata } from "./permata-CpPHCBfo.js";
import { c as cn } from "./utils-DODlBKb1.js";
import { BsStarFill } from "react-icons/bs";
import { A as AppLayout } from "./AppLayout-BOCrgB5m.js";
import axios from "axios";
import { useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import "clsx";
import "tailwind-merge";
import "@inertiajs/react";
const InputGroup = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  checked = false,
  error,
  placeholder,
  className = "",
  required = false,
  disabled = false,
  prefix = "",
  subfix = "",
  rows = 4,
  tsize,
  min
}) => {
  const commonClass = `
    [type='number']::-webkit-outer-spin-button,
  [type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  [type='number'] {
    -moz-appearance: textfield;
  }
    mt-1 block w-full outline-none
    ${type === "toggle" ? "rounded-full" : "rounded-md"} 
    border ${error ? "border-red-500" : "border-gray-300"} 
    bg-muted/20 px-3 py-2 shadow-sm transition-all duration-200 text-md
    ${disabled ? "cursor-not-allowed bg-gray-100" : ""} 
    ${prefix ? "pl-12" : "pr-10"}`;
  const handleChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };
  const handleRatingChange = (rating) => {
    onChange(rating);
  };
  const renderInput = () => {
    if (type === "textarea") {
      return /* @__PURE__ */ jsx(
        "textarea",
        {
          id: name,
          name,
          rows,
          value,
          onChange: handleChange,
          placeholder: placeholder || `Enter ${String(label).toLowerCase()}`,
          className: commonClass,
          required,
          disabled,
          "aria-invalid": !!error,
          "aria-describedby": error ? `${name}-error` : void 0
        }
      );
    }
    if (type === "rating") {
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => handleRatingChange(star),
            className: "text-2xl focus:outline-none",
            "aria-label": `Rate ${star} star`,
            children: /* @__PURE__ */ jsx(BsStarFill, { className: star <= Number(value) ? "text-yellow-400" : "text-secondary-foreground" })
          },
          star
        )),
        /* @__PURE__ */ jsx("input", { type: "hidden", name, value, onChange: handleChange })
      ] });
    }
    if (type === "checkbox") {
      return /* @__PURE__ */ jsx("input", { type: "checkbox", id: name, name, checked, onChange: (e) => onChange == null ? void 0 : onChange(e.target.checked), className: "" });
    }
    if (type === "toggle") {
      const text = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
        xl: "text-xl"
      };
      const tsizes = {
        xs: "h-4 w-12",
        sm: "h-5 w-14",
        // Small size
        md: "h-5 w-16",
        // Medium size (default)
        lg: "h-6 w-18",
        // Large size
        xl: "h-7 w-20"
        // Extra large size
      };
      const toggleSize = tsizes[tsize ?? "md"];
      const textToggleSize = text[tsize ?? "md"];
      return /* @__PURE__ */ jsxs("label", { className: `relative inline-flex items-center ${toggleSize}`, children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", className: "peer sr-only", checked, onChange: (e) => onChange == null ? void 0 : onChange(e.target.checked), name }),
        /* @__PURE__ */ jsx("div", { className: "h-full w-full rounded-full bg-gray-300 transition-colors duration-300 peer-checked:bg-green-500" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-0.5 left-0.5 aspect-square h-[calc(100%-4px)] rounded-full bg-white shadow transition-transform duration-300 peer-checked:right-0.5 peer-checked:left-auto" }),
        /* @__PURE__ */ jsx("span", { className: `absolute right-2 ${textToggleSize} font-medium text-gray-600 peer-checked:hidden`, children: "No" }),
        /* @__PURE__ */ jsx("span", { className: `absolute left-2 hidden ${textToggleSize} font-medium text-white peer-checked:inline`, children: "Yes" })
      ] });
    }
    return /* @__PURE__ */ jsx(
      "input",
      {
        id: name,
        name,
        type: type === "currency" ? "number" : type,
        value,
        onChange: handleChange,
        placeholder: placeholder ? placeholder : label ? `Ketik ${label == null ? void 0 : label.toLowerCase()}` : `Ketik ${name == null ? void 0 : name.toLowerCase()}`,
        className: cn(
          commonClass,
          "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        ),
        required,
        disabled,
        "aria-invalid": !!error,
        "aria-describedby": error ? `${name}-error` : void 0,
        step: type === "currency" ? "0.01" : void 0,
        min
      }
    );
  };
  return /* @__PURE__ */ jsxs("div", { className, children: [
    label && /* @__PURE__ */ jsxs("label", { htmlFor: name, className: "block text-sm font-medium text-secondary-foreground", children: [
      label,
      required && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: " *" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
      prefix && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center bg-muted px-3", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-muted-foreground", children: prefix }) }),
      renderInput(),
      subfix && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-muted-foreground", children: subfix }) })
    ] }),
    error && /* @__PURE__ */ jsx("p", { id: `${name}-error`, className: "mt-1 text-sm text-red-600", children: error })
  ] });
};
const Topup = ({ siswa, nouid, onClose }) => {
  const banks = [
    { id: 1, title: "BCA", name: "bca", logo: bca, payment_type: "bank_transfer" },
    { id: 2, title: "BNI", name: "bni", logo: bni, payment_type: "bank_transfer" },
    { id: 3, title: "BRI", name: "bri", logo: bri, payment_type: "bank_transfer" },
    { id: 4, title: "Mandiri", name: "mandiri", logo: mandiri, payment_type: "bank_transfer" },
    { id: 5, title: "Permata", name: "permata", logo: permata, payment_type: "bank_transfer" }
  ];
  const nominals = [
    { id: 1, amount: 5e4 },
    { id: 2, amount: 1e5 },
    { id: 3, amount: 2e5 },
    { id: 4, amount: 5e5 },
    { id: 5, amount: 1e6 }
  ];
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedNominal, setSelectedNominal] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customNominal, setCustomNominal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    var _a;
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const bank = banks.find((bank2) => bank2.name === selectedBank);
    const nominalValue = customNominal ? parseInt(customNominal) : selectedNominal ? (_a = nominals.find((n) => n.id === selectedNominal)) == null ? void 0 : _a.amount : null;
    if (!bank || !nominalValue || !phoneNumber) {
      setError("Harap lengkapi semua data!");
      setIsLoading(false);
      return;
    }
    if (nominalValue < 1e4) {
      setError("Nominal minimal Rp 10.000");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(route("topup.charge", nouid), {
        bank: bank.name,
        amount: nominalValue,
        phone: phoneNumber,
        nouid
        // Tambahkan nouid ke request
      });
      if (response.data.success) {
        window.location.href = `/${nouid}/payment-instruction?id=${response.data.data.order_id}`;
      } else {
        setError(response.data.message || "Terjadi kesalahan saat memproses pembayaran");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memproses pembayaran");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(AppLayout, { title: "Top Up", children: [
    /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-lg bg-white shadow-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground", children: [
        /* @__PURE__ */ jsxs("button", { onClick: () => onClose(), className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(FaArrowAltCircleLeft, { className: "text-primary-foreground" }),
          /* @__PURE__ */ jsx("span", { children: "Kembali" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-white", children: "Topup Saldo" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 rounded-lg bg-gray-50 p-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-lg font-semibold", children: "Informasi Siswa" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Nama" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: siswa.namlen })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "NISN" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: siswa.nis })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Kelas" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: siswa.kel })
            ] })
          ] })
        ] }),
        error && /* @__PURE__ */ jsx("div", { className: "mb-4 rounded-lg bg-red-100 p-3 text-red-700", children: error }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-3 text-lg font-semibold", children: "Pilih Bank" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3", children: banks.map((bank) => /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                className: `flex flex-col items-center rounded-lg border p-3 ${selectedBank === bank.name ? "border-blue-500 bg-blue-50" : "border-gray-300"}`,
                onClick: () => setSelectedBank(bank.name),
                children: [
                  /* @__PURE__ */ jsx("img", { src: bank.logo, alt: bank.name, className: "mb-1 h-8" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm", children: bank.title })
                ]
              },
              bank.id
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-3 text-lg font-semibold text-primary", children: "Pilih Nominal" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              nominals.map((nominal) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: `rounded-lg border p-3 transition-all ${selectedNominal === nominal.id ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-primary bg-primary-foreground hover:bg-primary-foreground/40"}`,
                  onClick: () => {
                    setSelectedNominal(nominal.id);
                    setCustomNominal("");
                  },
                  children: /* @__PURE__ */ jsxs("div", { className: "font-medium", children: [
                    "Rp ",
                    nominal.amount.toLocaleString("id-ID")
                  ] })
                },
                nominal.id
              )),
              /* @__PURE__ */ jsx(
                InputGroup,
                {
                  onChange: (value) => {
                    setCustomNominal(value ? String(value) : "");
                    setSelectedNominal(null);
                  },
                  name: "nominal",
                  placeholder: "Masukkan Nominal Topup Anda",
                  value: customNominal,
                  prefix: "Rp",
                  className: "col-span-2",
                  type: "number",
                  min: "10000"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "mb-1 block text-sm font-medium text-gray-700", children: "Nomor Handphone" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                id: "phone",
                className: "w-full rounded-lg border border-gray-300 p-3",
                placeholder: "Contoh: 081234567890",
                value: phoneNumber,
                onChange: (e) => setPhoneNumber(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "w-full rounded-lg bg-blue-600 px-4 py-3 text-white transition duration-200 hover:bg-blue-700 disabled:bg-blue-400",
              disabled: isLoading,
              children: isLoading ? "Memproses..." : "Lanjutkan Pembayaran"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-6 max-w-md rounded-lg bg-white p-6 shadow-md", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-3 text-lg font-semibold", children: "Informasi Penting" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc space-y-2 pl-5 text-sm text-gray-700", children: [
        /* @__PURE__ */ jsx("li", { children: "Pastikan nomor handphone yang dimasukkan benar" }),
        /* @__PURE__ */ jsx("li", { children: "Proses topup membutuhkan waktu 1-5 menit" }),
        /* @__PURE__ */ jsx("li", { children: "Jika mengalami kendala, hubungi customer service kami" }),
        /* @__PURE__ */ jsx("li", { children: "Minimal topup Rp 10.000" })
      ] })
    ] })
  ] });
};
export {
  Topup as default
};
