import { jsxDEV } from "react/jsx-dev-runtime";
import { c as cn } from "./utils-UO2Utf7z.js";
import { router } from "@inertiajs/react";
import { X } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { FaSpinner, FaRunning, FaBook, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import "clsx";
import "tailwind-merge";
const Excul = ({ nouid }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [process, setProcess] = useState(null);
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState({
    sub: [],
    excul: []
  });
  const [subexcul, setsubExcul] = useState(initialData.sub);
  const fetchData = useCallback(
    async (load = true) => {
      try {
        if (load) setIsLoading(true);
        setError(null);
        const response = await fetch(route("api.excul", nouid) + "?nouid=" + nouid);
        if (!response.ok) {
          throw new Error("Gagal memuat data");
        }
        const data = await response.json();
        if (!data.success) {
          throw new Error("Terjadi kesalahan server");
        }
        setInitialData(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan jaringan");
      } finally {
        if (load) setIsLoading(false);
      }
    },
    [nouid]
  );
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    setsubExcul(initialData.sub);
  }, [initialData.sub]);
  const excul = initialData.excul;
  const subExcul = initialData.excul.filter((e) => subexcul.includes(e.id)).map((e) => ({
    id: e.id,
    name: e.name,
    status: "Aktif"
  }));
  const subscribe = ({ e, id }) => {
    e.preventDefault();
    if (subexcul.includes(id)) return;
    setProcess(id);
    router.post(
      route("subs.excul", nouid),
      { excul: id },
      {
        preserveScroll: true,
        preserveState: true,
        onError: (errors) => {
          console.error("Validasi gagal:", errors);
        },
        onFinish: () => {
          fetchData(false);
          setProcess(null);
        }
      }
    );
  };
  const unsubs = ({ e, id }) => {
    e.preventDefault();
    if (!subexcul.includes(id)) return;
    router.post(
      route("unsubs.excul", nouid),
      { excul: id },
      {
        preserveScroll: true,
        preserveState: true,
        onError: (errors) => {
          console.error("Validasi gagal:", errors);
        },
        onFinish: () => {
          fetchData(false);
        }
      }
    );
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxDEV("div", { className: "flex flex-row items-center justify-center space-x-3 py-4", children: [
      /* @__PURE__ */ jsxDEV(FaSpinner, { className: "animate-spin text-3xl text-blue-600" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
        lineNumber: 115,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("span", { className: "text-lg font-bold text-blue-600", children: "Memuat data" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
        lineNumber: 116,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
      lineNumber: 114,
      columnNumber: 13
    }, void 0);
  }
  if (error) {
    return /* @__PURE__ */ jsxDEV("div", { className: "flex flex-row items-center justify-center space-x-3 py-4", children: [
      /* @__PURE__ */ jsxDEV(X, { className: "text-3xl text-red-600" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
        lineNumber: 123,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("span", { className: "text-lg font-bold text-red-600", children: error }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
        lineNumber: 124,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
      lineNumber: 122,
      columnNumber: 13
    }, void 0);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 p-4", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "mb-6 flex items-center justify-between", children: /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-bold text-gray-800", children: "Ekstrakurikuler" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
      lineNumber: 131,
      columnNumber: 17
    }, void 0) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
      lineNumber: 130,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "rounded-lg bg-white p-6 shadow", children: [
      /* @__PURE__ */ jsxDEV("h4", { className: "mb-4 flex items-center gap-2 border-b pb-2 text-lg font-semibold text-gray-800", children: [
        /* @__PURE__ */ jsxDEV(FaRunning, { className: "text-indigo-500" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
          lineNumber: 137,
          columnNumber: 21
        }, void 0),
        "Ekstrakurikuler Yang Diikuti"
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
        lineNumber: 136,
        columnNumber: 17
      }, void 0),
      subExcul.length > 0 ? /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: subExcul.map((activity) => /* @__PURE__ */ jsxDEV("div", { className: "rounded-lg border p-4 transition-shadow hover:shadow-md", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h5", { className: "text-lg font-bold", children: activity.name }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
              lineNumber: 147,
              columnNumber: 41
            }, void 0),
            /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600", children: [
              "Status: ",
              /* @__PURE__ */ jsxDEV("span", { className: "font-medium text-green-600", children: activity.status }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
                lineNumber: 149,
                columnNumber: 53
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
              lineNumber: 148,
              columnNumber: 41
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
            lineNumber: 146,
            columnNumber: 37
          }, void 0),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: (e) => unsubs({ e, id: activity.id }),
              className: "text-sm font-medium text-red-600 hover:text-red-800",
              children: "Keluar"
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
              lineNumber: 152,
              columnNumber: 37
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
          lineNumber: 145,
          columnNumber: 33
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-3 flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-gray-500", children: "Rabu, 14.00-16.00" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
            lineNumber: 160,
            columnNumber: 37
          }, void 0),
          /* @__PURE__ */ jsxDEV("span", { className: "rounded bg-blue-100 px-2 py-1 text-xs text-blue-800", children: "Lihat Jadwal" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
            lineNumber: 161,
            columnNumber: 37
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
          lineNumber: 159,
          columnNumber: 33
        }, void 0)
      ] }, activity.id, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
        lineNumber: 144,
        columnNumber: 29
      }, void 0)) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
        lineNumber: 142,
        columnNumber: 21
      }, void 0) : /* @__PURE__ */ jsxDEV("div", { className: "py-8 text-center text-gray-500", children: [
        /* @__PURE__ */ jsxDEV("p", { children: "Anda belum terdaftar dalam ekstrakurikuler apapun" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
          lineNumber: 168,
          columnNumber: 25
        }, void 0),
        /* @__PURE__ */ jsxDEV("button", { className: "mt-4 font-medium text-indigo-600 hover:text-indigo-800", children: "Daftar Sekarang" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
          lineNumber: 169,
          columnNumber: 25
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
        lineNumber: 167,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
      lineNumber: 135,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "rounded-lg bg-white p-6 shadow", children: [
      /* @__PURE__ */ jsxDEV("h4", { className: "mb-4 flex items-center gap-2 border-b pb-2 text-lg font-semibold text-gray-800", children: [
        /* @__PURE__ */ jsxDEV(FaBook, { className: "text-indigo-500" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
          lineNumber: 177,
          columnNumber: 21
        }, void 0),
        "Daftar Ekstrakurikuler Tersedia"
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
        lineNumber: 176,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", children: excul.map((ext) => /* @__PURE__ */ jsxDEV("div", { className: "rounded-lg border p-4 transition-shadow hover:shadow-lg", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "mb-3 flex items-center gap-3", children: /* @__PURE__ */ jsxDEV("h5", { className: "text-lg font-bold", children: ext.name }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
          lineNumber: 186,
          columnNumber: 33
        }, void 0) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
          lineNumber: 184,
          columnNumber: 29
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2 text-gray-600", children: [
            /* @__PURE__ */ jsxDEV(FaCalendarAlt, { className: "text-gray-400" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
              lineNumber: 191,
              columnNumber: 37
            }, void 0),
            ext.day,
            ", ",
            ext.time
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
            lineNumber: 190,
            columnNumber: 33
          }, void 0),
          /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600", children: [
            "Pelatih: ",
            ext.coach
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
            lineNumber: 194,
            columnNumber: 33
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pt-2", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-500", children: [
                "Kuota: ",
                ext.registered,
                "/",
                ext.quota
              ] }, void 0, true, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
                lineNumber: 197,
                columnNumber: 41
              }, void 0),
              /* @__PURE__ */ jsxDEV("div", { className: "mt-1 h-1.5 w-full rounded-full bg-gray-200", children: /* @__PURE__ */ jsxDEV(
                "div",
                {
                  className: "h-1.5 rounded-full bg-green-500",
                  style: {
                    width: `${ext.registered / ext.quota * 100}%`
                  }
                },
                void 0,
                false,
                {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
                  lineNumber: 201,
                  columnNumber: 45
                },
                void 0
              ) }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
                lineNumber: 200,
                columnNumber: 41
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
              lineNumber: 196,
              columnNumber: 37
            }, void 0),
            ext.registered === ext.quota ? /* @__PURE__ */ jsxDEV("span", { className: "rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800", children: "Kuota Pendaftaran Penuh" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
              lineNumber: 210,
              columnNumber: 41
            }, void 0) : subExcul.some((a) => a.id === ext.id) ? /* @__PURE__ */ jsxDEV("span", { className: "rounded bg-green-100 px-2 py-1 text-xs text-green-800", children: "Sudah Terdaftar" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
              lineNumber: 212,
              columnNumber: 41
            }, void 0) : /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: (e) => subscribe({ e, id: ext.id }),
                className: cn(
                  `flex items-center justify-center space-x-2 rounded bg-indigo-600 px-3 py-1 text-xs text-white hover:bg-indigo-700`,
                  `${process === ext.id && "bg-indigo-400 hover:bg-indigo-500"}`
                ),
                disabled: process === ext.id,
                children: [
                  process === ext.id && /* @__PURE__ */ jsxDEV(FaSpinner, { className: "animate-spin" }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
                    lineNumber: 222,
                    columnNumber: 68
                  }, void 0),
                  /* @__PURE__ */ jsxDEV("span", { children: "Daftar" }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
                    lineNumber: 223,
                    columnNumber: 45
                  }, void 0)
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
                lineNumber: 214,
                columnNumber: 41
              },
              void 0
            )
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
            lineNumber: 195,
            columnNumber: 33
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
          lineNumber: 189,
          columnNumber: 29
        }, void 0)
      ] }, ext.id, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
        lineNumber: 183,
        columnNumber: 25
      }, void 0)) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
        lineNumber: 181,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
      lineNumber: 175,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "rounded border-l-4 border-blue-400 bg-blue-50 p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxDEV(FaInfoCircle, { className: "mt-1 flex-shrink-0 text-blue-500" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
        lineNumber: 236,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h4", { className: "font-medium text-blue-800", children: "Informasi Penting" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
          lineNumber: 238,
          columnNumber: 25
        }, void 0),
        /* @__PURE__ */ jsxDEV("ul", { className: "mt-1 list-disc space-y-1 pl-5 text-sm text-blue-700", children: [
          /* @__PURE__ */ jsxDEV("li", { children: "Setiap siswa boleh mengikuti maksimal 2 ekstrakurikuler" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
            lineNumber: 240,
            columnNumber: 29
          }, void 0),
          /* @__PURE__ */ jsxDEV("li", { children: "Pendaftaran ditutup ketika kuota terpenuhi" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
            lineNumber: 241,
            columnNumber: 29
          }, void 0),
          /* @__PURE__ */ jsxDEV("li", { children: "Kehadiran minimal 80% untuk mendapatkan sertifikat" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
            lineNumber: 242,
            columnNumber: 29
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
          lineNumber: 239,
          columnNumber: 25
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
        lineNumber: 237,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
      lineNumber: 235,
      columnNumber: 17
    }, void 0) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
      lineNumber: 234,
      columnNumber: 13
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/Excul.tsx",
    lineNumber: 129,
    columnNumber: 9
  }, void 0);
};
export {
  Excul as default
};
