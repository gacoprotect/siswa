import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
const AppLayout = ({ children, title, className = "" }) => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto min-h-screen max-w-xl bg-primary shadow-sm rounded-t-lg", children: /* @__PURE__ */ jsx("main", { className: `min-h-[calc(100vh-4rem)] pb-6 ${className}`, children }) })
  ] });
};
export {
  AppLayout as A
};
