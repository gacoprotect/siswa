import { jsxDEV } from "react/jsx-dev-runtime";
import { L as LoggerProvider } from "./logger-context-CghNbJb_.js";
import { u as useAppConfig } from "./use-debug-logger-DbMTik7y.js";
import { Head } from "@inertiajs/react";
import { ToastContainer } from "react-toastify";
const AppLayout = ({ children, title, className = "" }) => {
  const config = useAppConfig();
  const isDebug = config.APP_DEBUG;
  const isDev = config.APP_ENV === "local";
  return /* @__PURE__ */ jsxDEV(LoggerProvider, { children: /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen relative bg-primary overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV(Head, { title }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/Layout/AppLayout.tsx",
      lineNumber: 21,
      columnNumber: 17
    }, void 0),
    (isDev || isDebug) && /* @__PURE__ */ jsxDEV("div", { className: "fixed w-60 h-50 flex flex-col justify-end rotate-45 origin-top-right top-0 -right-42 z-50 bg-yellow-300/50 text-center py-1 px-8 text-black animate-pulse text-sm", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-yellow-900", children: "MODE" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/Layout/AppLayout.tsx",
        lineNumber: 26,
        columnNumber: 25
      }, void 0),
      /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-yellow-900", children: isDebug ? "DEBUG ACTIVED" : "production" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/Layout/AppLayout.tsx",
        lineNumber: 27,
        columnNumber: 25
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/Layout/AppLayout.tsx",
      lineNumber: 25,
      columnNumber: 21
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "mx-auto min-h-screen max-w-xl rounded-t-lg bg-primary shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxDEV("main", { className: `${className} h-full`, children: [
      /* @__PURE__ */ jsxDEV(
        ToastContainer,
        {
          position: "top-right",
          autoClose: 3e3,
          hideProgressBar: false,
          newestOnTop: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: "colored"
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/Layout/AppLayout.tsx",
          lineNumber: 35,
          columnNumber: 25
        },
        void 0
      ),
      children
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/Layout/AppLayout.tsx",
      lineNumber: 34,
      columnNumber: 21
    }, void 0) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/Layout/AppLayout.tsx",
      lineNumber: 33,
      columnNumber: 17
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/Layout/AppLayout.tsx",
    lineNumber: 20,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/Layout/AppLayout.tsx",
    lineNumber: 19,
    columnNumber: 9
  }, void 0);
};
export {
  AppLayout as A
};
