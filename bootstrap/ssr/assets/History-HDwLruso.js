import { jsx, jsxs } from "react/jsx-runtime";
import { A as AppLayout } from "./AppLayout-CqEdbHnq.js";
import { usePage, router } from "@inertiajs/react";
import { Banknote, CreditCard, Wallet, ArrowUp, ShoppingCart, ArrowDown, XCircle, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Detail from "./Detail-B7iBo_-6.js";
import "react-toastify";
import "framer-motion";
const History = () => {
  const { transactions, nouid } = usePage().props;
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500", size: 16 });
      case "pending":
        return /* @__PURE__ */ jsx(Clock, { className: "text-yellow-500", size: 16 });
      case "failed":
        return /* @__PURE__ */ jsx(XCircle, { className: "text-red-500", size: 16 });
      case "canceled":
        return /* @__PURE__ */ jsx(XCircle, { className: "text-red-500", size: 16 });
      default:
        return null;
    }
  };
  const getTypeIcon = (type) => {
    switch (type) {
      case "topup":
      case "deposit":
        return /* @__PURE__ */ jsx(ArrowDown, { className: "text-blue-500", size: 20 });
      case "payment":
      case "purchase":
        return /* @__PURE__ */ jsx(ShoppingCart, { className: "text-purple-500", size: 20 });
      case "transfer":
        return /* @__PURE__ */ jsx(ArrowUp, { className: "text-orange-500", size: 20 });
      case "withdraw":
        return /* @__PURE__ */ jsx(Wallet, { className: "text-amber-500", size: 20 });
      case "bank_transfer":
      case "credit_card":
        return /* @__PURE__ */ jsx(CreditCard, { className: "text-indigo-500", size: 20 });
      default:
        return /* @__PURE__ */ jsx(Banknote, { className: "text-gray-500", size: 20 });
    }
  };
  const formatCurrency = (amount) => {
    const num = parseFloat(amount);
    return num.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    });
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  return /* @__PURE__ */ jsx(AppLayout, { title: "Riwayat Transaksi", children: /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-lg bg-white shadow-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => window.history.back(), className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(FaArrowAltCircleLeft, { className: "text-primary-foreground" }),
        /* @__PURE__ */ jsx("span", { children: "Kembali" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-white", children: "Riwayat Transaksi" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "divide-y", children: transactions.map((trx) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex cursor-pointer items-center p-4 transition-colors hover:bg-gray-50",
        onClick: () => setSelectedTransaction(trx),
        children: [
          /* @__PURE__ */ jsx("div", { className: "mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100", children: getTypeIcon(trx.type || trx.payment_type) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-medium capitalize", children: trx.type || trx.payment_type.replace("_", " ") }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: trx.note || `Order: ${trx.order_id}` }),
            /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center text-sm", children: [
              getStatusIcon(trx.status),
              /* @__PURE__ */ jsx("span", { className: "ml-1 text-gray-500 capitalize", children: trx.status })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `text-right ${trx.status === "failed" || trx.status === "canceled" ? "text-red-600" : parseFloat(trx.amount) > 0 ? "text-green-600" : "text-red-600"}`,
              children: [
                /* @__PURE__ */ jsxs("div", { className: `font-medium`, children: [
                  parseFloat(trx.amount) > 0 ? "+" : "",
                  formatCurrency(trx.amount)
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-gray-400", children: formatDate(trx.created_at) }),
                trx.status === "pending" && /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "mt-2 inline-block rounded-lg bg-blue-500 px-3 py-1 text-xs font-medium text-white transition hover:bg-blue-600",
                    onClick: (e) => {
                      e.stopPropagation();
                      router.get(`/${nouid}/payment/${trx.order_id}`);
                    },
                    children: "Bayar Sekarang"
                  }
                )
              ]
            }
          )
        ]
      },
      trx.id
    )) }),
    selectedTransaction && /* @__PURE__ */ jsx(Detail, { transaction: selectedTransaction, onClose: () => setSelectedTransaction(null) })
  ] }) });
};
export {
  History as default
};
