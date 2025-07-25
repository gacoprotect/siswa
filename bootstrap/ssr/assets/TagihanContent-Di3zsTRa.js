import { jsxDEV, Fragment } from "react/jsx-dev-runtime";
import { FaFileInvoiceDollar, FaSpinner, FaFileInvoice, FaHistory } from "react-icons/fa";
import { X } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import TambahTagihan from "./TambahTagihan-BJRTGkp9.js";
import RiwayatTagihan from "./RiwayatTagihan-D3TPxS48.js";
import "./Modal-i8ZK7ROr.js";
import "./utils-UO2Utf7z.js";
import "clsx";
import "tailwind-merge";
import "./InputGroup-CoQ5g3dV.js";
import "react-icons/bs";
import "dayjs";
const PaymentButton = ({ onClose, setparam, summary }) => {
  const handleBayar = ({ tagihan, spr }) => {
    setparam({
      spr,
      tagihan
    });
    onClose();
  };
  return /* @__PURE__ */ jsxDEV(
    "button",
    {
      onClick: () => handleBayar({
        tagihan: summary.total_tagihan,
        spr: summary.spr
      }),
      className: "flex items-center gap-2 rounded-lg bg-green-600 p-2 text-sm text-white transition-colors hover:bg-green-700",
      "aria-label": "Bayar tagihan sekarang",
      children: [
        /* @__PURE__ */ jsxDEV(FaFileInvoiceDollar, { className: "text-sm" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/tagihanButton.tsx",
          lineNumber: 31,
          columnNumber: 13
        }, void 0),
        "Bayar Sekarang"
      ]
    },
    void 0,
    true,
    {
      fileName: "/home/webserver-1/siswa/resources/js/components/tagihanButton.tsx",
      lineNumber: 21,
      columnNumber: 9
    },
    void 0
  );
};
const TagihanContent = ({ nouid, setTagihanParam, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [riwayat, setRiwayat] = useState(false);
  const [buatTagihanModal, setBuatTagihanModal] = useState(false);
  const [groupedData, setGroupedData] = useState([]);
  const [error, setError] = useState(null);
  const initialSummary = {
    total_tagihan: 0,
    total_disc: 0,
    spr: []
  };
  const [summary, setSummary] = useState(initialSummary);
  const fetchData = useCallback(async () => {
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
  }, [nouid]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(amount);
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
  if (isLoading) {
    return /* @__PURE__ */ jsxDEV("div", { className: "flex min-h-screen flex-col items-center justify-center space-y-3", children: [
      /* @__PURE__ */ jsxDEV(FaSpinner, { className: "animate-spin text-3xl text-blue-600" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
        lineNumber: 148,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("span", { className: "text-lg text-gray-700", children: "Memuat data..." }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
        lineNumber: 149,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
      lineNumber: 147,
      columnNumber: 13
    }, void 0);
  }
  if (error) {
    return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center space-x-3 p-4 text-red-600", children: [
      /* @__PURE__ */ jsxDEV(X, { className: "animate-pulse" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
        lineNumber: 157,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("span", { children: error }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
        lineNumber: 158,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
      lineNumber: 156,
      columnNumber: 13
    }, void 0);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 p-4", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "grid gap-4 md:grid-cols-2", children: /* @__PURE__ */ jsxDEV("div", { className: "rounded-lg bg-green-50 p-4 shadow-sm", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-medium text-gray-500", children: "Total Tagihan" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
          lineNumber: 171,
          columnNumber: 29
        }, void 0),
        /* @__PURE__ */ jsxDEV("p", { className: "mt-1 text-2xl font-semibold text-gray-900", children: formatCurrency(summary.total_tagihan) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
          lineNumber: 172,
          columnNumber: 29
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
        lineNumber: 170,
        columnNumber: 25
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "rounded-full bg-white p-3", children: /* @__PURE__ */ jsxDEV(FaFileInvoiceDollar, { className: "text-green-500" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
        lineNumber: 175,
        columnNumber: 29
      }, void 0) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
        lineNumber: 174,
        columnNumber: 25
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
      lineNumber: 169,
      columnNumber: 21
    }, void 0) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
      lineNumber: 168,
      columnNumber: 17
    }, void 0) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
      lineNumber: 167,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => {
            setRiwayat(false);
            setBuatTagihanModal(true);
          },
          className: "flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700",
          children: [
            /* @__PURE__ */ jsxDEV(FaFileInvoice, {}, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
              lineNumber: 190,
              columnNumber: 21
            }, void 0),
            "Buat Tagihan"
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
          lineNumber: 183,
          columnNumber: 17
        },
        void 0
      ),
      /* @__PURE__ */ jsxDEV("button", { onClick: () => setRiwayat(!riwayat), className: "flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700", children: [
        /* @__PURE__ */ jsxDEV(FaHistory, {}, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
          lineNumber: 194,
          columnNumber: 21
        }, void 0),
        "Riwayat"
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
        lineNumber: 193,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
      lineNumber: 182,
      columnNumber: 13
    }, void 0),
    riwayat ? /* @__PURE__ */ jsxDEV(RiwayatTagihan, { nouid }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
      lineNumber: 200,
      columnNumber: 25
    }, void 0) : groupedData.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "rounded-lg border border-dashed border-gray-300 p-8 text-center", children: /* @__PURE__ */ jsxDEV("p", { className: "text-gray-500", children: "Tidak ada data tagihan" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
      lineNumber: 202,
      columnNumber: 21
    }, void 0) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
      lineNumber: 201,
      columnNumber: 17
    }, void 0) : /* @__PURE__ */ jsxDEV("div", { className: "overflow-hidden rounded-lg border shadow-sm", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-white p-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "mb-4 text-lg font-semibold", children: "Rincian Tagihan" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
          lineNumber: 208,
          columnNumber: 29
        }, void 0),
        /* @__PURE__ */ jsxDEV("span", { className: "mb-4 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700", children: [
          groupedData.filter((t) => t.jen === 0).length,
          " Tagihan"
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
          lineNumber: 209,
          columnNumber: 29
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
        lineNumber: 207,
        columnNumber: 25
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV("table", { className: "min-w-full divide-y divide-gray-200", children: [
        /* @__PURE__ */ jsxDEV("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxDEV("tr", { children: [
          /* @__PURE__ */ jsxDEV("th", { className: "px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "Tagihan" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
            lineNumber: 218,
            columnNumber: 41
          }, void 0),
          /* @__PURE__ */ jsxDEV("th", { className: "px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "Jumlah" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
            lineNumber: 219,
            columnNumber: 41
          }, void 0),
          /* @__PURE__ */ jsxDEV("th", { className: "px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "Keterangan" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
            lineNumber: 220,
            columnNumber: 41
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
          lineNumber: 217,
          columnNumber: 37
        }, void 0) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
          lineNumber: 216,
          columnNumber: 33
        }, void 0),
        /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-gray-200 bg-white", children: groupedData.map((item) => {
          return /* @__PURE__ */ jsxDEV("tr", { children: [
            /* @__PURE__ */ jsxDEV("td", { className: "flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap text-gray-900", children: [
              item.tah,
              " - ",
              item.bulan
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
              lineNumber: 227,
              columnNumber: 49
            }, void 0),
            /* @__PURE__ */ jsxDEV("td", { className: "px-4 py-3 text-sm whitespace-nowrap text-gray-900", children: formatCurrency(item.jumlah) }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
              lineNumber: 230,
              columnNumber: 49
            }, void 0),
            /* @__PURE__ */ jsxDEV("td", { className: "px-4 py-3 text-sm whitespace-nowrap text-gray-900", children: item.ket }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
              lineNumber: 231,
              columnNumber: 49
            }, void 0)
          ] }, `${item.tah}-${item.bulan}-${item.ket}`, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
            lineNumber: 226,
            columnNumber: 45
          }, void 0);
        }) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
          lineNumber: 223,
          columnNumber: 33
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
        lineNumber: 215,
        columnNumber: 29
      }, void 0) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
        lineNumber: 214,
        columnNumber: 25
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-6 space-y-3 border-t pt-4", children: [
        summary.total_disc ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: "Total:" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
              lineNumber: 244,
              columnNumber: 41
            }, void 0),
            /* @__PURE__ */ jsxDEV("span", { className: "font-medium text-red-600", children: formatCurrency(summary.total_tagihan - summary.total_disc) }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
              lineNumber: 245,
              columnNumber: 41
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
            lineNumber: 243,
            columnNumber: 37
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: "Potongan :" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
              lineNumber: 248,
              columnNumber: 41
            }, void 0),
            /* @__PURE__ */ jsxDEV("span", { className: "font-medium text-red-600", children: formatCurrency(summary.total_disc) }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
              lineNumber: 249,
              columnNumber: 41
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
            lineNumber: 247,
            columnNumber: 37
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
          lineNumber: 242,
          columnNumber: 33
        }, void 0) : null,
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-lg font-semibold", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Total Tagihan:" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
            lineNumber: 255,
            columnNumber: 33
          }, void 0),
          /* @__PURE__ */ jsxDEV("span", { className: "text-blue-600", children: formatCurrency(summary.total_tagihan) }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
            lineNumber: 256,
            columnNumber: 33
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
          lineNumber: 254,
          columnNumber: 29
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "pt-4 flex items-center gap-4", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              className: "rounded-lg bg-red-600 p-2 text-sm text-white transition-colors hover:bg-red-700",
              onClick: () => {
                fetchData();
              },
              children: "Batal"
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
              lineNumber: 259,
              columnNumber: 33
            },
            void 0
          ),
          /* @__PURE__ */ jsxDEV(PaymentButton, { onClose, setparam: setTagihanParam, summary }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
            lineNumber: 265,
            columnNumber: 33
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
          lineNumber: 258,
          columnNumber: 29
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
        lineNumber: 240,
        columnNumber: 25
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
      lineNumber: 206,
      columnNumber: 21
    }, void 0) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
      lineNumber: 205,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV(TambahTagihan, { setTambahTagihan: handleTambahTagihan, open: buatTagihanModal, onClose: () => setBuatTagihanModal(false), nouid }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
      lineNumber: 273,
      columnNumber: 13
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/TagihanContent.tsx",
    lineNumber: 165,
    columnNumber: 9
  }, void 0);
};
export {
  TagihanContent as default
};
