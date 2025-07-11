import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { FaFileInvoiceDollar, FaSpinner, FaFileInvoice, FaHistory, FaTrashAlt } from "react-icons/fa";
import { X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import TambahTagihan from "./TambahTagihan-BeFUbly4.js";
import "./Modal-XQRpvi6T.js";
import "./utils-UO2Utf7z.js";
import "clsx";
import "tailwind-merge";
const PaymentButton = ({ setparam, summary }) => {
  const handleBayar = ({ tagihan, spr }) => {
    setparam({
      spr,
      tagihan
    });
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: () => handleBayar({
        tagihan: summary.total_tagihan,
        spr: summary.spr
      }),
      className: "flex items-center gap-2 rounded-lg bg-green-600 p-2 text-sm text-white transition-colors hover:bg-green-700",
      "aria-label": "Bayar tagihan sekarang",
      children: [
        /* @__PURE__ */ jsx(FaFileInvoiceDollar, { className: "text-sm" }),
        "Bayar Sekarang"
      ]
    }
  );
};
const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const TagihanContent = ({ nouid, setTagihanParam }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [buatTagihanModal, setBuatTagihanModal] = useState(false);
  const [groupedData, setGroupedData] = useState([]);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({
    total_tagihan: 0,
    total_disc: 0,
    spr: []
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(route("tagihan.index", nouid));
        if (!response.ok) {
          throw new Error("Gagal memuat data tagihan");
        }
        const data = await response.json();
        if (data.success) {
          throw new Error("Terjadi kesalahan server");
        }
        setGroupedData(data.data);
        setSummary(data.summary);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan jaringan");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [nouid]);
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(amount);
  };
  const getIsFutureBill = (tah, bulan) => {
    const monthNumber = monthNames.indexOf(bulan) + 1;
    const currentDate = /* @__PURE__ */ new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    return parseInt(tah) > currentYear || parseInt(tah) === currentYear && monthNumber > currentMonth;
  };
  const handleTambahTagihan = useCallback(
    (items) => {
      var _a;
      if (!((_a = items == null ? void 0 : items.data) == null ? void 0 : _a.length)) return;
      setGroupedData((prev) => {
        const existingKeys = new Set(prev.map((item) => `${item.tah}-${item.bulan.toLowerCase()}-${item.ket}`));
        const newItems = items.data.filter((item) => {
          const normalizedMonth = item.bulan.toLowerCase();
          const key = `${item.tah}-${normalizedMonth}-${item.ket}`;
          return !existingKeys.has(key);
        });
        const combined = [...prev, ...newItems];
        return combined.sort((a, b) => {
          const yearCompare = parseInt(b.tah) - parseInt(a.tah);
          if (yearCompare !== 0) return yearCompare;
          const monthOrder = [
            "januari",
            "februari",
            "maret",
            "april",
            "mei",
            "juni",
            "juli",
            "agustus",
            "september",
            "oktober",
            "november",
            "desember"
          ];
          return monthOrder.indexOf(a.bulan.toLowerCase()) - monthOrder.indexOf(b.bulan.toLowerCase());
        });
      });
      setSummary((prev) => {
        const existingSpr = new Set(prev.spr);
        const existingDataKeys = new Set(groupedData.map((item) => `${item.tah}-${item.bulan.toLowerCase()}-${item.ket}`));
        let totalNewAmount = 0;
        const newSpr = [];
        items.data.forEach((item, index) => {
          const normalizedMonth = item.bulan.toLowerCase();
          const dataKey = `${item.tah}-${normalizedMonth}-${item.ket}`;
          if (!existingDataKeys.has(dataKey)) {
            if (!existingSpr.has(items.spr[index])) {
              newSpr.push(items.spr[index]);
            }
            totalNewAmount += item.jumlah;
          }
        });
        return {
          ...prev,
          spr: [...prev.spr, ...newSpr],
          total_tagihan: prev.total_tagihan + totalNewAmount
        };
      });
    },
    [groupedData]
  );
  const handleDelete = useCallback((item) => {
    setGroupedData((prev) => prev.filter((bill) => !(bill.tah === item.tah && bill.bulan === item.bulan && bill.ket === item.ket)));
    setSummary((prev) => {
      const amountToRemove = item.jumlah;
      return {
        ...prev,
        total_tagihan: prev.total_tagihan - amountToRemove
      };
    });
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center justify-center space-x-3 py-4", children: [
      /* @__PURE__ */ jsx(FaSpinner, { className: "animate-spin text-3xl text-blue-600" }),
      /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-blue-600", children: "Memuat data" })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-3 p-4 text-red-600", children: [
      /* @__PURE__ */ jsx(X, { className: "animate-pulse" }),
      /* @__PURE__ */ jsx("span", { children: error })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2", children: /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-green-50 p-4 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500", children: "Total Tagihan" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-2xl font-semibold text-gray-900", children: formatCurrency(summary.total_tagihan) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-full bg-white p-3", children: /* @__PURE__ */ jsx(FaFileInvoiceDollar, { className: "text-green-500" }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setBuatTagihanModal(true),
          className: "flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700",
          children: [
            /* @__PURE__ */ jsx(FaFileInvoice, {}),
            "Buat Tagihan"
          ]
        }
      ),
      /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700", children: [
        /* @__PURE__ */ jsx(FaHistory, {}),
        "Riwayat"
      ] })
    ] }),
    groupedData.length === 0 ? /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-dashed border-gray-300 p-8 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Tidak ada data tagihan" }) }) : /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-lg border shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-lg font-semibold", children: "Rincian Tagihan" }),
        /* @__PURE__ */ jsxs("span", { className: "mb-4 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700", children: [
          groupedData.filter((t) => t.jen === 0).length,
          " Tagihan"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "Tagihan" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "Jumlah" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "Keterangan" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-200 bg-white", children: groupedData.map((item) => {
          const isFutureBill = getIsFutureBill(item.tah, item.bulan);
          return /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsxs("td", { className: "flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap text-gray-900", children: [
              isFutureBill && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDelete(item),
                  className: "text-red-500 hover:text-red-700",
                  title: "Hapus Tagihan",
                  children: /* @__PURE__ */ jsx(FaTrashAlt, {})
                }
              ),
              item.tah,
              " - ",
              item.bulan
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm whitespace-nowrap text-gray-900", children: formatCurrency(item.jumlah) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm whitespace-nowrap text-gray-900", children: item.ket })
          ] }, `${item.tah}-${item.bulan}-${item.ket}`);
        }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-3 border-t pt-4", children: [
        summary.total_disc ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Total:" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium text-red-600", children: formatCurrency(summary.total_tagihan - summary.total_disc) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Potongan :" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium text-red-600", children: formatCurrency(summary.total_disc) })
          ] })
        ] }) : null,
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-lg font-semibold", children: [
          /* @__PURE__ */ jsx("span", { children: "Total Tagihan:" }),
          /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: formatCurrency(summary.total_tagihan) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx(PaymentButton, { setparam: setTagihanParam, summary }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(TambahTagihan, { setTambahTagihan: handleTambahTagihan, open: buatTagihanModal, onClose: () => setBuatTagihanModal(false), nouid })
  ] });
};
export {
  TagihanContent as default
};
