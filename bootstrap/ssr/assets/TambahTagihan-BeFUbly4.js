import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { M as Modal } from "./Modal-XQRpvi6T.js";
import { useState, useCallback, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import "./utils-UO2Utf7z.js";
import "clsx";
import "tailwind-merge";
import "lucide-react";
const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const TambahTagihan = ({ open, onClose, nouid, setTambahTagihan }) => {
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [error, setError] = useState("");
  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const url = route("api.tagihan.exists", { nouid });
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      const data = json.data || {};
      setGrouped(data);
    } catch (err) {
      console.error("Gagal ambil tagihan:", err);
    } finally {
      setLoading(false);
    }
  }, [nouid]);
  useEffect(() => {
    if (open) {
      setSelectedYear("");
      setSelectedMonth("");
      setError("");
      getData();
    }
  }, [open, getData]);
  const monthOptions = selectedYear ? (grouped[selectedYear] || []).sort((a, b) => a - b).map((monthNumber) => ({
    value: monthNumber,
    label: monthNames[monthNumber - 1]
    // indeks bulan 0-based
  })) : [];
  const handleSubmit = useCallback(async () => {
    if (!selectedYear || !selectedMonth) {
      setError("Harap pilih tahun dan bulan terlebih dahulu.");
      return;
    }
    setError("");
    try {
      const url = route("api.tagihan.add", { nouid }) + `?t=${selectedYear}&b=${selectedMonth}`;
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);
      const data = json.data || {};
      setTambahTagihan(data);
      onClose(false);
    } catch (err) {
      console.error("Gagal ambil tagihan:", err);
      setError("Gagal mengambil data tagihan. Coba lagi.");
    }
  }, [nouid, selectedYear, selectedMonth, onClose, setTambahTagihan]);
  return /* @__PURE__ */ jsx(Modal, { title: "Pilih Tagihan", isOpen: open, onClose: () => onClose(false), children: /* @__PURE__ */ jsx("div", { className: "max-h-[75vh] space-y-6 overflow-y-auto px-1", children: loading ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-8 text-gray-500", children: [
    /* @__PURE__ */ jsx(FaSpinner, { className: "mb-2 animate-spin text-2xl" }),
    /* @__PURE__ */ jsx("span", { children: "Memuat data tagihan..." })
  ] }) : Object.keys(grouped).length === 0 ? /* @__PURE__ */ jsx("p", { className: "py-4 text-center text-gray-600", children: "Tidak ada data tagihan tersedia" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-semibold text-gray-700", children: "Sampai:" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-3", children: [
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: selectedYear,
            onChange: (e) => {
              setSelectedYear(e.target.value);
              setSelectedMonth("");
            },
            className: "w-full rounded-md border bg-white px-4 py-2 text-gray-800",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Tahun --" }),
              Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a)).map((year) => /* @__PURE__ */ jsxs("option", { value: year, children: [
                "Tahun ",
                year
              ] }, year))
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: selectedMonth,
            onChange: (e) => setSelectedMonth(parseInt(e.target.value)),
            className: "w-full rounded-md border bg-white px-4 py-2 text-gray-800 capitalize",
            disabled: !selectedYear,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Bulan --" }),
              monthOptions.map(({ value, label }) => /* @__PURE__ */ jsx("option", { value, children: label }, value))
            ]
          }
        )
      ] })
    ] }) }),
    error && /* @__PURE__ */ jsx("p", { className: "pt-2 text-sm text-red-600", children: error }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsx(
      "button",
      {
        disabled: !selectedYear || !selectedMonth,
        onClick: handleSubmit,
        className: "rounded-md bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700",
        children: "Tambahkan Tagihan"
      }
    ) })
  ] }) }) });
};
export {
  TambahTagihan as default
};
