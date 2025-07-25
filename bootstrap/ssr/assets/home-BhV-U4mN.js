import { jsxDEV } from "react/jsx-dev-runtime";
import { a as useDebugLogger } from "./use-debug-logger-DbMTik7y.js";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";
function Home() {
  const [loading, setLoading] = useState(false);
  const { log } = useDebugLogger();
  const goToDashboard = () => {
    router.visit(route("test.dashboard"), {
      method: "get",
      only: ["message"],
      data: { mode: "admin" },
      onStart: () => {
        log("loading...");
      },
      onSuccess: () => {
      },
      onFinish: (data) => {
        toast.success("Berhasil Horee!!");
        log(data);
      }
    });
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "p-6 flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxDEV("h1", { className: "text-xl font-semibold mb-4", children: "Halaman Home" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/test/home.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: goToDashboard,
        className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",
        children: "Visit ke Dashboard Test"
      },
      void 0,
      false,
      {
        fileName: "/home/webserver-1/siswa/resources/js/pages/test/home.tsx",
        lineNumber: 29,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(Link, { href: "/test/dashboard", className: "px-4 py-2 text-center items-center justify-center bg-blue-600 text-white rounded hover:bg-blue-700", children: "Link ke Dashboard" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/test/home.tsx",
      lineNumber: 36,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV("button", { onClick: () => router.visit("/test/dashboard", {
      only: ["stats"],
      preserveState: true,
      onStart: () => setLoading(true),
      onFinish: () => setLoading(false)
    }), children: loading ? "Loading..." : "Pergi ke Dashboard" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/test/home.tsx",
      lineNumber: 42,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/test/home.tsx",
      lineNumber: 41,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/test/home.tsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
}
export {
  Home as default
};
