import { jsxs, jsx } from "react/jsx-runtime";
import { I as InputGroup } from "./InputGroup-1Zv-qQ-V.js";
import { M as Modal } from "./Modal-XQRpvi6T.js";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import "./utils-UO2Utf7z.js";
import "clsx";
import "tailwind-merge";
import "react-icons/bs";
import "lucide-react";
const SearchTagihan = ({ open, onClose, nouid, setTambahTagihan }) => {
  const [loading, setLoading] = useState(false);
  const contoh = [
    {
      id: 1,
      tah: "2025",
      bulid: 8,
      jumlah: 1e5,
      ket: "SPP SMA TA 2025/2026",
      jen: 0,
      // 0 = tagihan, 1 = pengurangan
      sta: 0
    },
    {
      id: 1,
      tah: "2025",
      bulid: 8,
      jumlah: 3e4,
      ket: "Extrakulikuler Agustus-2025",
      jen: 0,
      // 0 = tagihan, 1 = pengurangan
      sta: 0
    }
  ];
  return /* @__PURE__ */ jsxs(Modal, { title: "Pilih Tagihan", isOpen: open, onClose: () => onClose(false), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-2", children: [
      /* @__PURE__ */ jsx(InputGroup, { name: "tahun", label: "Tahun", type: "date", onChange: () => "" }),
      /* @__PURE__ */ jsx(InputGroup, { name: "bulan", label: "Bulan", type: "date", onChange: () => "" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-h-[75vh] space-y-6 overflow-y-auto px-1", children: loading ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-8 text-gray-500", children: [
      /* @__PURE__ */ jsx(FaSpinner, { className: "mb-2 animate-spin text-2xl" }),
      /* @__PURE__ */ jsx("span", { children: "Memuat data tagihan..." })
    ] }) : Object.keys(contoh).length === 0 ? /* @__PURE__ */ jsx("p", { className: "py-4 text-center text-gray-600", children: "Tidak ada data tagihan tersedia" }) : /* @__PURE__ */ jsx("div", {}) })
  ] });
};
export {
  SearchTagihan as default
};
