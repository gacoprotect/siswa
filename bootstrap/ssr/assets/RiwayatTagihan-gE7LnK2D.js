import { jsxDEV } from "react/jsx-dev-runtime";
import { Link } from "@inertiajs/react";
const RiwayatTagihan = ({ tagihans }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(amount);
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "lunas":
        return /* @__PURE__ */ jsxDEV("span", { className: "rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800", children: "Lunas" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 27,
          columnNumber: 24
        }, void 0);
      case "belum_lunas":
        return /* @__PURE__ */ jsxDEV("span", { className: "rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800", children: "Belum Lunas" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 29,
          columnNumber: 24
        }, void 0);
      case "jatuh_tempo":
        return /* @__PURE__ */ jsxDEV("span", { className: "rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800", children: "Jatuh Tempo" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 31,
          columnNumber: 24
        }, void 0);
      default:
        return /* @__PURE__ */ jsxDEV("span", { className: "rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800", children: status }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 33,
          columnNumber: 24
        }, void 0);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "py-6", children: /* @__PURE__ */ jsxDEV("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxDEV("div", { className: "border-b border-gray-200 bg-white p-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-full md:w-1/3", children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "search", className: "block text-sm font-medium text-gray-700", children: "Cari Nomor Tagihan" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 45,
          columnNumber: 33
        }, void 0),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "text",
            id: "search",
            className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
            placeholder: "Cari..."
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
            lineNumber: 48,
            columnNumber: 33
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
        lineNumber: 44,
        columnNumber: 29
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "w-full md:w-1/3", children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "status", className: "block text-sm font-medium text-gray-700", children: "Status" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 56,
          columnNumber: 33
        }, void 0),
        /* @__PURE__ */ jsxDEV(
          "select",
          {
            id: "status",
            className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
            children: [
              /* @__PURE__ */ jsxDEV("option", { value: "", children: "Semua Status" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
                lineNumber: 63,
                columnNumber: 37
              }, void 0),
              /* @__PURE__ */ jsxDEV("option", { value: "lunas", children: "Lunas" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
                lineNumber: 64,
                columnNumber: 37
              }, void 0),
              /* @__PURE__ */ jsxDEV("option", { value: "belum_lunas", children: "Belum Lunas" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
                lineNumber: 65,
                columnNumber: 37
              }, void 0),
              /* @__PURE__ */ jsxDEV("option", { value: "jatuh_tempo", children: "Jatuh Tempo" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
                lineNumber: 66,
                columnNumber: 37
              }, void 0)
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
            lineNumber: 59,
            columnNumber: 33
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
        lineNumber: 55,
        columnNumber: 29
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "flex w-full items-end md:w-1/3", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "button",
          className: "rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none",
          children: "Filter"
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 70,
          columnNumber: 33
        },
        void 0
      ) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
        lineNumber: 69,
        columnNumber: 29
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
      lineNumber: 43,
      columnNumber: 25
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsxDEV("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxDEV("tr", { children: [
        /* @__PURE__ */ jsxDEV("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "No. Tagihan" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 84,
          columnNumber: 41
        }, void 0),
        /* @__PURE__ */ jsxDEV("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "Tanggal Tagihan" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 87,
          columnNumber: 41
        }, void 0),
        /* @__PURE__ */ jsxDEV("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "Jatuh Tempo" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 90,
          columnNumber: 41
        }, void 0),
        /* @__PURE__ */ jsxDEV("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "Jumlah" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 93,
          columnNumber: 41
        }, void 0),
        /* @__PURE__ */ jsxDEV("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "Status" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 96,
          columnNumber: 41
        }, void 0),
        /* @__PURE__ */ jsxDEV("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "Aksi" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 99,
          columnNumber: 41
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
        lineNumber: 83,
        columnNumber: 37
      }, void 0) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
        lineNumber: 82,
        columnNumber: 33
      }, void 0),
      /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-gray-200 bg-white", children: tagihans.map((tagihan) => /* @__PURE__ */ jsxDEV("tr", { children: [
        /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-medium text-gray-900", children: tagihan.nomor_tagihan }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 108,
          columnNumber: 49
        }, void 0) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 107,
          columnNumber: 45
        }, void 0),
        /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-gray-500", children: new Date(tagihan.tanggal_tagihan).toLocaleDateString("id-ID") }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 111,
          columnNumber: 49
        }, void 0) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 110,
          columnNumber: 45
        }, void 0),
        /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-gray-500", children: new Date(tagihan.jatuh_tempo).toLocaleDateString("id-ID") }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 116,
          columnNumber: 49
        }, void 0) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 115,
          columnNumber: 45
        }, void 0),
        /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-medium text-gray-900", children: formatCurrency(tagihan.jumlah) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 121,
          columnNumber: 49
        }, void 0) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 120,
          columnNumber: 45
        }, void 0),
        /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 whitespace-nowrap", children: getStatusBadge(tagihan.status) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 123,
          columnNumber: 45
        }, void 0),
        /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-4 text-sm font-medium whitespace-nowrap", children: /* @__PURE__ */ jsxDEV(Link, { href: route("tagihan.detail", tagihan.id), className: "text-indigo-600 hover:text-indigo-900", children: "Detail" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 125,
          columnNumber: 49
        }, void 0) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
          lineNumber: 124,
          columnNumber: 45
        }, void 0)
      ] }, tagihan.id, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
        lineNumber: 106,
        columnNumber: 41
      }, void 0)) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
        lineNumber: 104,
        columnNumber: 33
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
      lineNumber: 81,
      columnNumber: 29
    }, void 0) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
      lineNumber: 80,
      columnNumber: 25
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
    lineNumber: 41,
    columnNumber: 21
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
    lineNumber: 40,
    columnNumber: 17
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
    lineNumber: 39,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/RiwayatTagihan.tsx",
    lineNumber: 38,
    columnNumber: 9
  }, void 0);
};
export {
  RiwayatTagihan as default
};
