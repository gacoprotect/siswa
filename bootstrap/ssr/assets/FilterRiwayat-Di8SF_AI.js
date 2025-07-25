import { jsxDEV } from "react/jsx-dev-runtime";
import { usePage, router } from "@inertiajs/react";
import { useState } from "react";
function FilterRiwayat() {
  const { riwayat, filter } = usePage().props;
  const [search, setSearch] = useState(filter || "");
  const handleSubmit = (e) => {
    e.preventDefault();
    router.visit(route("test.dashboard"), {
      method: "get",
      data: { filter: search },
      only: ["riwayat"],
      // hanya update data tabel
      preserveState: true
    });
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxDEV("h1", { className: "text-xl font-bold mb-4", children: "Riwayat Transaksi" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/test/FilterRiwayat.tsx",
      lineNumber: 31,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "mb-4 space-x-2", children: [
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          type: "text",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "border rounded px-3 py-1",
          placeholder: "Cari nama transaksi..."
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/test/FilterRiwayat.tsx",
          lineNumber: 34,
          columnNumber: 17
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("button", { type: "submit", className: "bg-blue-600 text-white px-4 py-1 rounded", children: "Cari" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/test/FilterRiwayat.tsx",
        lineNumber: 41,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/test/FilterRiwayat.tsx",
      lineNumber: 33,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("ul", { className: "bg-white rounded shadow p-4", children: [
      riwayat.length === 0 && /* @__PURE__ */ jsxDEV("li", { className: "text-gray-500", children: "Tidak ada data." }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/test/FilterRiwayat.tsx",
        lineNumber: 47,
        columnNumber: 42
      }, this),
      riwayat.map((item) => /* @__PURE__ */ jsxDEV("li", { className: "border-b py-2", children: [
        item.nama,
        " - Rp",
        item.total.toLocaleString()
      ] }, item.id, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/test/FilterRiwayat.tsx",
        lineNumber: 49,
        columnNumber: 21
      }, this))
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/test/FilterRiwayat.tsx",
      lineNumber: 46,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/test/FilterRiwayat.tsx",
    lineNumber: 30,
    columnNumber: 9
  }, this);
}
export {
  FilterRiwayat as default
};
