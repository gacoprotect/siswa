import { jsxDEV } from "react/jsx-dev-runtime";
import { A as AppLayout } from "./AppLayout-Dr7OzoMY.js";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { u as useLogger } from "./logger-context-CghNbJb_.js";
import "./use-debug-logger-DbMTik7y.js";
import "react-toastify";
const History = () => {
  console.count("Component Render");
  const { log } = useLogger();
  const { transactions, nouid } = usePage().props;
  log("Data Transaksi : ", transactions);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  return /* @__PURE__ */ jsxDEV(AppLayout, { title: "Riwayat Transaksi", children: /* @__PURE__ */ jsxDEV("div", { className: "overflow-hidden rounded-lg bg-white shadow-md" }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/History.tsx",
    lineNumber: 78,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/History.tsx",
    lineNumber: 77,
    columnNumber: 9
  }, void 0);
};
export {
  History as default
};
