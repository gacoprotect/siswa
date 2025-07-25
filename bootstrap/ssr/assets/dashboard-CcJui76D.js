import { jsxDEV } from "react/jsx-dev-runtime";
import { usePage, router } from "@inertiajs/react";
function Dashboard() {
  const { message, stats, waktu, activeTab, infoUmum, grafik, riwayat } = usePage().props;
  const reloadStats = () => {
    router.visit("/test/dashboard", {
      only: ["waktu"],
      preserveState: true
    });
  };
  const changeTab = (tab) => {
    router.visit(route("test.dashboard"), {
      method: "get",
      data: { tab },
      only: [tab, "activeTab"],
      // hanya ambil props sesuai tab
      preserveState: true
    });
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "p-6 space-y-4", children: [
    /* @__PURE__ */ jsxDEV("h1", { className: "text-xl font-bold", children: "Dashboard Test" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
      lineNumber: 43,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("p", { children: message }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
      lineNumber: 44,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-100 p-4 rounded", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "font-semibold mb-2", children: "Statistik" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
        lineNumber: 47,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { children: [
        "Siswa: ",
        stats.siswa
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
        lineNumber: 48,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { children: [
        "Guru: ",
        stats.guru
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
        lineNumber: 49,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-600 mt-2", children: [
        "Diperbarui: ",
        waktu
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
        lineNumber: 50,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: reloadStats,
          className: "mt-4 px-4 py-2 bg-blue-600 text-white rounded",
          children: "Refresh Statistik"
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
          lineNumber: 51,
          columnNumber: 17
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
      lineNumber: 46,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxDEV("h1", { className: "text-xl font-bold mb-4", children: "Dashboard Interaktif" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
        lineNumber: 60,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-x-2 mb-6", children: ["infoUmum", "grafik", "riwayat"].map((tab) => /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => changeTab(tab),
          className: `px-4 py-2 rounded ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"}`,
          children: tab
        },
        tab,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
          lineNumber: 64,
          columnNumber: 25
        },
        this
      )) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
        lineNumber: 62,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white p-4 rounded shadow", children: [
        activeTab === "infoUmum" && /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-semibold mb-2", children: "Info Umum" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
            lineNumber: 77,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { children: [
            "Siswa: ",
            infoUmum == null ? void 0 : infoUmum.jumlahSiswa
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
            lineNumber: 78,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("p", { children: [
            "Guru: ",
            infoUmum == null ? void 0 : infoUmum.jumlahGuru
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
            lineNumber: 79,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
          lineNumber: 76,
          columnNumber: 25
        }, this),
        activeTab === "grafik" && /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-semibold mb-2", children: "Grafik Pendaftaran" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
            lineNumber: 85,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("pre", { children: JSON.stringify(grafik, null, 2) }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
            lineNumber: 86,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
          lineNumber: 84,
          columnNumber: 25
        }, this),
        activeTab === "riwayat" && /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-semibold mb-2", children: "Riwayat Transaksi" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
            lineNumber: 92,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV(
            "form",
            {
              onSubmit: (e) => {
                e.preventDefault();
                router.visit(route("test.dashboard"), {
                  method: "get",
                  data: {
                    tab: "riwayat",
                    filter: document.getElementById("filterInput").value
                  },
                  only: ["riwayat", "activeTab"],
                  preserveState: true
                });
              },
              className: "mb-4 space-x-2",
              children: [
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    id: "filterInput",
                    defaultValue: new URLSearchParams(location.search).get("filter") || "",
                    placeholder: "Cari transaksi...",
                    className: "border px-3 py-1 rounded"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
                    lineNumber: 109,
                    columnNumber: 33
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("button", { type: "submit", className: "bg-blue-600 text-white px-3 py-1 rounded", children: "Cari" }, void 0, false, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
                  lineNumber: 115,
                  columnNumber: 33
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
              lineNumber: 94,
              columnNumber: 29
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("ul", { children: [
            (riwayat == null ? void 0 : riwayat.length) === 0 && /* @__PURE__ */ jsxDEV("li", { children: "Tidak ada data." }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
              lineNumber: 121,
              columnNumber: 59
            }, this),
            riwayat == null ? void 0 : riwayat.map((r) => /* @__PURE__ */ jsxDEV("li", { children: [
              r.nama,
              " - Rp",
              r.total.toLocaleString()
            ] }, r.id, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
              lineNumber: 123,
              columnNumber: 37
            }, this))
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
            lineNumber: 120,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
          lineNumber: 91,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
        lineNumber: 74,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
      lineNumber: 59,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/test/dashboard.tsx",
    lineNumber: 42,
    columnNumber: 9
  }, this);
}
export {
  Dashboard as default
};
