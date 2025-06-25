import { jsx, jsxs } from "react/jsx-runtime";
import { A as AppLayout } from "./AppLayout-BOCrgB5m.js";
import { Link } from "@inertiajs/react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
const History = ({ siswa, nouid, onClose, transactions }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return /* @__PURE__ */ jsx(AppLayout, { title: "Riwayat Transaksi", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => onClose(), className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(FaArrowAltCircleLeft, { className: "text-primary-foreground" }),
        /* @__PURE__ */ jsx("span", { children: "Kembali" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-white", children: "Riwayat Transaksi" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-lg bg-white shadow", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "Order ID" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "Jumlah" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "Bank" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "Tanggal" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase", children: "Aksi" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-200 bg-white", children: transactions.data.map((transaction) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900", children: transaction.order_id }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-sm whitespace-nowrap text-gray-500", children: [
          "Rp ",
          transaction.amount.toLocaleString("id-ID")
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm whitespace-nowrap text-gray-500", children: transaction.bank.toUpperCase() }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx(
          "span",
          {
            className: `inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${getStatusColor(
              transaction.status
            )}`,
            children: transaction.status
          }
        ) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm whitespace-nowrap text-gray-500", children: new Date(transaction.created_at).toLocaleString("id-ID") }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm font-medium whitespace-nowrap", children: /* @__PURE__ */ jsx(
          Link,
          {
            href: `/${transaction.nouid}/transactions/${transaction.order_id}`,
            className: "text-blue-600 hover:text-blue-900",
            children: "Detail"
          }
        ) })
      ] }, transaction.id)) })
    ] }) }) })
  ] }) });
};
export {
  History as default
};
