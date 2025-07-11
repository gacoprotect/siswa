import { jsxs, jsx } from "react/jsx-runtime";
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
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center justify-center space-x-3 py-4", children: [
      /* @__PURE__ */ jsx(FaSpinner, { className: "animate-spin text-3xl text-blue-600" }),
      /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-blue-600", children: "Memuat data" })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center justify-center space-x-3 py-4", children: [
      /* @__PURE__ */ jsx(X, { className: "text-3xl text-red-600" }),
      /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-red-600", children: error })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6 flex items-center justify-between", children: /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-800", children: "Ekstrakurikuler" }) }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white p-6 shadow", children: [
      /* @__PURE__ */ jsxs("h4", { className: "mb-4 flex items-center gap-2 border-b pb-2 text-lg font-semibold text-gray-800", children: [
        /* @__PURE__ */ jsx(FaRunning, { className: "text-indigo-500" }),
        "Ekstrakurikuler Yang Diikuti"
      ] }),
      subExcul.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: subExcul.map((activity) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border p-4 transition-shadow hover:shadow-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h5", { className: "text-lg font-bold", children: activity.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
              "Status: ",
              /* @__PURE__ */ jsx("span", { className: "font-medium text-green-600", children: activity.status })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: (e) => unsubs({ e, id: activity.id }),
              className: "text-sm font-medium text-red-600 hover:text-red-800",
              children: "Keluar"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Rabu, 14.00-16.00" }),
          /* @__PURE__ */ jsx("span", { className: "rounded bg-blue-100 px-2 py-1 text-xs text-blue-800", children: "Lihat Jadwal" })
        ] })
      ] }, activity.id)) }) : /* @__PURE__ */ jsxs("div", { className: "py-8 text-center text-gray-500", children: [
        /* @__PURE__ */ jsx("p", { children: "Anda belum terdaftar dalam ekstrakurikuler apapun" }),
        /* @__PURE__ */ jsx("button", { className: "mt-4 font-medium text-indigo-600 hover:text-indigo-800", children: "Daftar Sekarang" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white p-6 shadow", children: [
      /* @__PURE__ */ jsxs("h4", { className: "mb-4 flex items-center gap-2 border-b pb-2 text-lg font-semibold text-gray-800", children: [
        /* @__PURE__ */ jsx(FaBook, { className: "text-indigo-500" }),
        "Daftar Ekstrakurikuler Tersedia"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", children: excul.map((ext) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border p-4 transition-shadow hover:shadow-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-3 flex items-center gap-3", children: /* @__PURE__ */ jsx("h5", { className: "text-lg font-bold", children: ext.name }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 text-gray-600", children: [
            /* @__PURE__ */ jsx(FaCalendarAlt, { className: "text-gray-400" }),
            ext.day,
            ", ",
            ext.time
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
            "Pelatih: ",
            ext.coach
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                "Kuota: ",
                ext.registered,
                "/",
                ext.quota
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 h-1.5 w-full rounded-full bg-gray-200", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "h-1.5 rounded-full bg-green-500",
                  style: {
                    width: `${ext.registered / ext.quota * 100}%`
                  }
                }
              ) })
            ] }),
            ext.registered === ext.quota ? /* @__PURE__ */ jsx("span", { className: "rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800", children: "Kuota Pendaftaran Penuh" }) : subExcul.some((a) => a.id === ext.id) ? /* @__PURE__ */ jsx("span", { className: "rounded bg-green-100 px-2 py-1 text-xs text-green-800", children: "Sudah Terdaftar" }) : /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: (e) => subscribe({ e, id: ext.id }),
                className: cn(
                  `flex items-center justify-center space-x-2 rounded bg-indigo-600 px-3 py-1 text-xs text-white hover:bg-indigo-700`,
                  `${process === ext.id && "bg-indigo-400 hover:bg-indigo-500"}`
                ),
                disabled: process === ext.id,
                children: [
                  process === ext.id && /* @__PURE__ */ jsx(FaSpinner, { className: "animate-spin" }),
                  /* @__PURE__ */ jsx("span", { children: "Daftar" })
                ]
              }
            )
          ] })
        ] })
      ] }, ext.id)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded border-l-4 border-blue-400 bg-blue-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx(FaInfoCircle, { className: "mt-1 flex-shrink-0 text-blue-500" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-medium text-blue-800", children: "Informasi Penting" }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-1 list-disc space-y-1 pl-5 text-sm text-blue-700", children: [
          /* @__PURE__ */ jsx("li", { children: "Setiap siswa boleh mengikuti maksimal 2 ekstrakurikuler" }),
          /* @__PURE__ */ jsx("li", { children: "Pendaftaran ditutup ketika kuota terpenuhi" }),
          /* @__PURE__ */ jsx("li", { children: "Kehadiran minimal 80% untuk mendapatkan sertifikat" })
        ] })
      ] })
    ] }) })
  ] });
};
export {
  Excul as default
};
