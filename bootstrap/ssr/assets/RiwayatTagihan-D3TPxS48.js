import { jsxDEV } from "react/jsx-dev-runtime";
import { useState, useEffect } from "react";
import { FaSpinner, FaChevronDown, FaChevronRight } from "react-icons/fa";
import dayjs from "dayjs";
const RiwayatTagihan = ({ nouid }) => {
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(dayjs().format("YYYY"));
  const [month, setMonth] = useState(dayjs().month() + 1);
  const [showAll, setShowAll] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const fetchData = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (params.t) queryParams.append("t", params.t);
      if (params.m) queryParams.append("m", params.m.toString());
      const response = await fetch(`${route("tagihan.history", nouid)}?${queryParams.toString()}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Data siswa tidak ditemukan");
        }
        throw new Error(`Terjadi kesalahan (${response.status})`);
      }
      const result = await response.json();
      if (!result.success) {
        if (result.errors) {
          const errorMessages = Object.values(result.errors).flat().join(", ");
          throw new Error(`Validasi gagal: ${errorMessages}`);
        }
        throw new Error(result.message || "Gagal memuat data");
      }
      setData(result.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError({
        message: err instanceof Error ? err.message : "Gagal memuat data. Silakan coba lagi.",
        error_code: err == null ? void 0 : err.error_code
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleFilterSubmit = (all = true) => {
    const params = all ? {} : {
      t: year,
      m: month
      // Convert string month to number
    };
    fetchData(params);
  };
  const formatDate = (dateString) => {
    return dayjs(dateString).format("DD MMMM YYYY HH:mm");
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(amount);
  };
  if (loading && !data) {
    return /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-center py-12 text-gray-500", children: [
      /* @__PURE__ */ jsxDEV(FaSpinner, { className: "animate-spin text-2xl mb-2" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
        lineNumber: 123,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("span", { children: "Memuat data tagihan..." }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
        lineNumber: 124,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
      lineNumber: 122,
      columnNumber: 13
    }, void 0);
  }
  if (error) {
    return /* @__PURE__ */ jsxDEV("div", { className: "p-4 text-center", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-red-500 mb-2", children: [
        error.message,
        error.error_code && /* @__PURE__ */ jsxDEV("span", { className: "text-gray-500 text-sm block mt-1", children: [
          "Kode: ",
          error.error_code
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
          lineNumber: 135,
          columnNumber: 25
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
        lineNumber: 132,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => fetchData(),
          className: "mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
          children: "Coba Lagi"
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
          lineNumber: 138,
          columnNumber: 17
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
      lineNumber: 131,
      columnNumber: 13
    }, void 0);
  }
  if (!data) {
    return null;
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "p-4 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-4 mb-8", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2 sm:self-end", children: [
        showAll ? /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              setShowAll(false);
              handleFilterSubmit(false);
            },
            className: "px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 disabled:opacity-50",
            disabled: loading,
            children: "Filter"
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
            lineNumber: 156,
            columnNumber: 33
          },
          void 0
        ) : /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              setShowAll(true);
              handleFilterSubmit(true);
            },
            className: "px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 disabled:opacity-50",
            disabled: loading,
            children: "Tampilkan Semua"
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
            lineNumber: 166,
            columnNumber: 25
          },
          void 0
        ),
        !showAll && /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => handleFilterSubmit(false),
            className: "px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-xl shadow-sm hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 disabled:opacity-50",
            disabled: loading,
            children: "Terapkan Filter"
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
            lineNumber: 177,
            columnNumber: 25
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
        lineNumber: 155,
        columnNumber: 17
      }, void 0),
      !showAll && /* @__PURE__ */ jsxDEV("div", { className: "flex flex-row gap-4 flex-1", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Tahun" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
            lineNumber: 190,
            columnNumber: 29
          }, void 0),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: year,
              onChange: (e) => setYear(e.target.value),
              className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50",
              disabled: loading,
              children: Array.from({ length: 5 }, (_, i) => {
                const y = dayjs().year() - i;
                return /* @__PURE__ */ jsxDEV("option", { value: y, children: y }, y, false, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
                  lineNumber: 202,
                  columnNumber: 41
                }, void 0);
              })
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
              lineNumber: 193,
              columnNumber: 29
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
          lineNumber: 189,
          columnNumber: 25
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Bulan" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
            lineNumber: 211,
            columnNumber: 29
          }, void 0),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: month,
              onChange: (e) => setMonth(Number(e.target.value)),
              className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50",
              disabled: loading,
              children: Array.from({ length: 12 }, (_, i) => {
                const monthNumber = i + 1;
                return /* @__PURE__ */ jsxDEV("option", { value: monthNumber, children: [
                  dayjs().month(i).format("MMMM"),
                  " "
                ] }, monthNumber, true, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
                  lineNumber: 223,
                  columnNumber: 41
                }, void 0);
              })
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
              lineNumber: 214,
              columnNumber: 29
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
          lineNumber: 210,
          columnNumber: 25
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
        lineNumber: 188,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
      lineNumber: 154,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: data.trx.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-center py-8 bg-white rounded-lg shadow", children: /* @__PURE__ */ jsxDEV("p", { className: "text-gray-500", children: "Tidak ada data tagihan untuk ditampilkan" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
      lineNumber: 238,
      columnNumber: 25
    }, void 0) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
      lineNumber: 237,
      columnNumber: 21
    }, void 0) : data.trx.map((trx) => /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-100 rounded-lg shadow overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "flex justify-between items-center p-4 cursor-pointer bg-gray-200 hover:bg-gray-50 transition-colors",
          onClick: () => setExpandedItems((prev) => ({
            ...prev,
            [trx.order_id]: !prev[trx.order_id]
          })),
          children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-sm text-gray-800", children: [
                "ID: ",
                trx.order_id
              ] }, void 0, true, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
                lineNumber: 251,
                columnNumber: 37
              }, void 0),
              /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-500 mt-1", children: formatDate(trx.paid_at) }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
                lineNumber: 252,
                columnNumber: 37
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
              lineNumber: 250,
              columnNumber: 33
            }, void 0),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-gray-800 mr-3", children: formatCurrency(trx.amount) }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
                lineNumber: 257,
                columnNumber: 37
              }, void 0),
              expandedItems[trx.order_id] ? /* @__PURE__ */ jsxDEV(FaChevronDown, { className: "text-gray-500" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
                lineNumber: 261,
                columnNumber: 41
              }, void 0) : /* @__PURE__ */ jsxDEV(FaChevronRight, { className: "text-gray-500" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
                lineNumber: 263,
                columnNumber: 41
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
              lineNumber: 256,
              columnNumber: 33
            }, void 0)
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
          lineNumber: 243,
          columnNumber: 29
        },
        void 0
      ),
      expandedItems[trx.order_id] && /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-t", children: [
        /* @__PURE__ */ jsxDEV("h4", { className: "font-medium text-gray-700 mb-3", children: "Detail Tagihan" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
          lineNumber: 270,
          columnNumber: 37
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: trx.bills.map((bill) => /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center py-2 border-b last:border-b-0", children: [
          /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-gray-800", children: [
            bill.nmr,
            ". ",
            bill.ket
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
            lineNumber: 275,
            columnNumber: 53
          }, void 0) }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
            lineNumber: 274,
            columnNumber: 49
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "text-right", children: /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-gray-800", children: formatCurrency(parseInt(bill.jum)) }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
            lineNumber: 278,
            columnNumber: 53
          }, void 0) }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
            lineNumber: 277,
            columnNumber: 49
          }, void 0)
        ] }, bill.id, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
          lineNumber: 273,
          columnNumber: 45
        }, void 0)) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
          lineNumber: 271,
          columnNumber: 37
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
        lineNumber: 269,
        columnNumber: 33
      }, void 0)
    ] }, trx.order_id, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
      lineNumber: 242,
      columnNumber: 25
    }, void 0)) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
      lineNumber: 235,
      columnNumber: 13
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Tagihan/RiwayatTagihan.tsx",
    lineNumber: 153,
    columnNumber: 9
  }, void 0);
};
export {
  RiwayatTagihan as default
};
