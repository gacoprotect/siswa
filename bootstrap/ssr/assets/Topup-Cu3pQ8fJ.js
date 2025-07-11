import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { I as InputGroup } from "./InputGroup-1Zv-qQ-V.js";
import { A as AppLayout } from "./AppLayout-CqEdbHnq.js";
import { usePage, router } from "@inertiajs/react";
import { X, Check, Copy } from "lucide-react";
import { useState, useCallback, useEffect, useMemo } from "react";
import { FaArrowAltCircleLeft, FaSpinner } from "react-icons/fa";
import "./utils-UO2Utf7z.js";
import "clsx";
import "tailwind-merge";
import "react-icons/bs";
import "react-toastify";
const MINIMAL_TOPUP = 1e4;
const NOMINALS = [
  { id: 1, amount: 5e4 },
  { id: 2, amount: 1e5 },
  { id: 3, amount: 2e5 },
  { id: 4, amount: 3e5 },
  { id: 5, amount: 5e5 },
  { id: 6, amount: 1e6 }
];
const Topup = ({ siswa, nouid, onClose }) => {
  const { errors } = usePage().props;
  const [va, setVa] = useState(null);
  const [selectedNominal, setSelectedNominal] = useState(null);
  const [customNominal, setCustomNominal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [copyError, setCopyError] = useState(null);
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    if (!va) {
      setCopyError("Nomor VA belum tersedia");
      return;
    }
    try {
      await navigator.clipboard.writeText(va);
      setCopied(true);
      setCopyError(null);
      setTimeout(() => setCopied(false), 2e3);
    } catch (err) {
      setCopyError("Gagal menyalin nomor VA. Silakan salin manual.");
      console.error("Gagal menyalin:", err);
    }
  }, [va]);
  const fetchVaNumber = useCallback(async () => {
    try {
      setIsLoading(true);
      setFormError(null);
      setCopyError(null);
      const response = await fetch(route("api.reqVA", nouid));
      if (!response.ok) {
        throw new Error("Gagal memuat data pembayaran");
      }
      const data = await response.json();
      if (data.success !== true) {
        throw new Error(data.message || "Terjadi kesalahan pada server");
      }
      setVa(data.va_number);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Terjadi kesalahan jaringan");
    } finally {
      setIsLoading(false);
    }
  }, [nouid]);
  useEffect(() => {
    fetchVaNumber();
  }, [fetchVaNumber]);
  const nominalValue = useMemo(() => {
    var _a;
    if (customNominal) {
      return parseInt(customNominal);
    }
    if (selectedNominal) {
      return ((_a = NOMINALS.find((n) => n.id === selectedNominal)) == null ? void 0 : _a.amount) || null;
    }
    return null;
  }, [customNominal, selectedNominal]);
  const validateForm = useCallback(() => {
    if (!nominalValue) {
      setFormError("Harap pilih nominal topup!");
      return false;
    }
    if (nominalValue < MINIMAL_TOPUP) {
      setFormError(`Minimal topup adalah Rp ${MINIMAL_TOPUP.toLocaleString("id-ID")}`);
      return false;
    }
    if (!va) {
      setFormError("Nomor Virtual Account tidak valid");
      return false;
    }
    return true;
  }, [nominalValue, va]);
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setFormError(null);
      if (!validateForm()) {
        setIsSubmitting(false);
        return;
      }
      try {
        await router.post(
          route("topup.charge", nouid),
          {
            va_number: va,
            amount: nominalValue,
            nouid
          },
          {
            onError: (errors2) => {
              setFormError((errors2 == null ? void 0 : errors2.message) || "Gagal memproses pembayaran");
            }
          }
        );
      } catch (err) {
        setFormError("Terjadi kesalahan saat memproses pembayaran");
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [nominalValue, nouid, validateForm, va]
  );
  return /* @__PURE__ */ jsx(AppLayout, { title: "Top Up", children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen overflow-hidden rounded-lg bg-white shadow-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground", children: [
      /* @__PURE__ */ jsxs("button", { onClick: onClose, className: "flex items-center space-x-2 transition-opacity hover:opacity-80", "aria-label": "Kembali", children: [
        /* @__PURE__ */ jsx(FaArrowAltCircleLeft, { className: "text-primary-foreground" }),
        /* @__PURE__ */ jsx("span", { children: "Kembali" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-white", children: "Topup Saldo" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col items-center justify-center space-y-3", children: [
      /* @__PURE__ */ jsx(FaSpinner, { className: "animate-spin text-3xl text-blue-600" }),
      /* @__PURE__ */ jsx("span", { className: "text-lg text-gray-700", children: "Memuat data pembayaran..." })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
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
        formError && /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-start space-x-2 rounded-lg bg-red-100 p-3 text-red-700", children: [
          /* @__PURE__ */ jsx(X, { className: "mt-0.5 h-5 w-5 flex-shrink-0" }),
          /* @__PURE__ */ jsx("span", { children: formError })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-3 text-lg font-semibold", children: "Bank" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Nomor Virtual Account:" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-lg font-bold", children: va || "Loading..." }),
              va && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleCopy,
                  className: "text-gray-500 hover:text-black",
                  "aria-label": "Salin nomor VA",
                  type: "button",
                  children: copied ? /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-green-500" }) : /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" })
                }
              )
            ] }),
            copyError && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500", children: copyError }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Salin nomor VA untuk melakukan pembayaran melalui ATM/Mobile Banking" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxs("div", { className: `mb-6`, children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-3 text-lg font-semibold text-primary", children: "Pilih Nominal" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              NOMINALS.map((nominal) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: `${formError && "border-2 border-red-600"} rounded-lg border p-3 transition-all ${selectedNominal === nominal.id ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-primary bg-primary-foreground hover:bg-primary-foreground/40"}`,
                  onClick: () => {
                    setSelectedNominal(nominal.id);
                    setCustomNominal("");
                    setFormError(null);
                  },
                  "aria-label": `Pilih Rp ${nominal.amount.toLocaleString("id-ID")}`,
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
                    setFormError(null);
                  },
                  name: "nominal",
                  placeholder: "Masukkan nominal custom",
                  value: customNominal,
                  prefix: "Rp",
                  className: `col-span-2 ${formError && "border-2 border-red-600"}`,
                  type: "number",
                  min: MINIMAL_TOPUP
                }
              ),
              errors.nominal && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500", children: errors.nominal })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "w-full rounded-lg bg-blue-600 px-4 py-3 text-white transition duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400",
              disabled: isSubmitting,
              "aria-label": "Lanjutkan pembayaran",
              children: isSubmitting ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                /* @__PURE__ */ jsx(FaSpinner, { className: "animate-spin" }),
                "Memproses..."
              ] }) : "Lanjutkan Pembayaran"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-6 max-w-md rounded-lg bg-white p-6 shadow-md", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-3 text-lg font-semibold", children: "Panduan Topup" }),
        /* @__PURE__ */ jsxs("ul", { className: "list-disc space-y-2 pl-5 text-sm text-gray-700", children: [
          /* @__PURE__ */ jsx("li", { children: "Proses topup membutuhkan waktu 1-5 menit" }),
          /* @__PURE__ */ jsx("li", { children: "Pastikan nominal yang ditransfer sesuai dengan yang dipilih" }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Minimal topup Rp ",
            MINIMAL_TOPUP.toLocaleString("id-ID")
          ] }),
          /* @__PURE__ */ jsx("li", { children: "Jika mengalami kendala, hubungi customer service" })
        ] })
      ] })
    ] })
  ] }) });
};
export {
  Topup as default
};
