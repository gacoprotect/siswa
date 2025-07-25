import { jsxDEV, Fragment } from "react/jsx-dev-runtime";
import { M as Modal } from "./Modal-i8ZK7ROr.js";
import { useState, useCallback, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import "./utils-UO2Utf7z.js";
import "clsx";
import "tailwind-merge";
import "lucide-react";
import "./InputGroup-CoQ5g3dV.js";
import "react-icons/bs";
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
  return /* @__PURE__ */ jsxDEV(Modal, { title: "Pilih Tagihan", isOpen: open, onClose: () => onClose(false), children: /* @__PURE__ */ jsxDEV("div", { className: "max-h-[75vh] space-y-6 overflow-y-auto px-1", children: loading ? /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-center py-8 text-gray-500", children: [
    /* @__PURE__ */ jsxDEV(FaSpinner, { className: "mb-2 animate-spin text-2xl" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
      lineNumber: 111,
      columnNumber: 25
    }, void 0),
    /* @__PURE__ */ jsxDEV("span", { children: "Memuat data tagihan..." }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
      lineNumber: 112,
      columnNumber: 25
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
    lineNumber: 110,
    columnNumber: 21
  }, void 0) : Object.keys(grouped).length === 0 ? /* @__PURE__ */ jsxDEV("p", { className: "py-4 text-center text-gray-600", children: "Tidak ada data tagihan tersedia" }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
    lineNumber: 115,
    columnNumber: 21
  }, void 0) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("label", { className: "mb-2 block text-sm font-semibold text-gray-700", children: "Sampai:" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
        lineNumber: 121,
        columnNumber: 33
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-row gap-3", children: [
        /* @__PURE__ */ jsxDEV(
          "select",
          {
            value: selectedYear,
            onChange: (e) => {
              setSelectedYear(e.target.value);
              setSelectedMonth("");
            },
            className: "w-full rounded-md border bg-white px-4 py-2 text-gray-800",
            children: [
              /* @__PURE__ */ jsxDEV("option", { value: "", children: "-- Pilih Tahun --" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
                lineNumber: 131,
                columnNumber: 41
              }, void 0),
              Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a)).map((year) => /* @__PURE__ */ jsxDEV("option", { value: year, children: [
                "Tahun ",
                year
              ] }, year, true, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
                lineNumber: 135,
                columnNumber: 49
              }, void 0))
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
            lineNumber: 123,
            columnNumber: 37
          },
          void 0
        ),
        /* @__PURE__ */ jsxDEV(
          "select",
          {
            value: selectedMonth,
            onChange: (e) => setSelectedMonth(parseInt(e.target.value)),
            className: "w-full rounded-md border bg-white px-4 py-2 text-gray-800 capitalize",
            disabled: !selectedYear,
            children: [
              /* @__PURE__ */ jsxDEV("option", { value: "", children: "-- Pilih Bulan --" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
                lineNumber: 147,
                columnNumber: 41
              }, void 0),
              monthOptions.map(({ value, label }) => /* @__PURE__ */ jsxDEV("option", { value, children: label }, value, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
                lineNumber: 149,
                columnNumber: 45
              }, void 0))
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
            lineNumber: 141,
            columnNumber: 37
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
        lineNumber: 122,
        columnNumber: 33
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
      lineNumber: 120,
      columnNumber: 29
    }, void 0) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
      lineNumber: 118,
      columnNumber: 25
    }, void 0),
    error && /* @__PURE__ */ jsxDEV("p", { className: "pt-2 text-sm text-red-600", children: error }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
      lineNumber: 159,
      columnNumber: 35
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsxDEV(
      "button",
      {
        disabled: !selectedYear || !selectedMonth,
        onClick: handleSubmit,
        className: "rounded-md bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700",
        children: "Tambahkan Tagihan"
      },
      void 0,
      false,
      {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
        lineNumber: 163,
        columnNumber: 29
      },
      void 0
    ) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
      lineNumber: 162,
      columnNumber: 25
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
    lineNumber: 117,
    columnNumber: 21
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
    lineNumber: 108,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TambahTagihan.tsx",
    lineNumber: 107,
    columnNumber: 9
  }, void 0);
};
export {
  TambahTagihan as default
};
