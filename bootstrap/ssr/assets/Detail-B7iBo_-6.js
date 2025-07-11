import { jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion } from "framer-motion";
import { X, Landmark, CreditCard, Smartphone, Share2, Copy, Banknote, Wallet, ArrowUp, ShoppingCart, ArrowDown, Ban, XCircle, Clock, CheckCircle, AlertCircle } from "lucide-react";
const Detail = ({ transaction, onClose }) => {
  console.log(transaction);
  const getStatusBadge = (status) => {
    switch (status) {
      case "success":
        return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "mr-1 h-4 w-4" }),
          "Berhasil"
        ] });
      case "pending":
        return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800", children: [
          /* @__PURE__ */ jsx(Clock, { className: "mr-1 h-4 w-4" }),
          "Menunggu"
        ] });
      case "failed":
        return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800", children: [
          /* @__PURE__ */ jsx(XCircle, { className: "mr-1 h-4 w-4" }),
          "Gagal"
        ] });
      case "canceled":
        return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800", children: [
          /* @__PURE__ */ jsx(Ban, { className: "mr-1 h-4 w-4" }),
          "Dibatalkan"
        ] });
      default:
        return null;
    }
  };
  const getTypeIcon = (type) => {
    switch (type) {
      case "topup":
      case "deposit":
        return /* @__PURE__ */ jsx(ArrowDown, { className: "rounded-full bg-blue-100 p-2 text-blue-500", size: 40 });
      case "payment":
      case "purchase":
        return /* @__PURE__ */ jsx(ShoppingCart, { className: "rounded-full bg-purple-100 p-2 text-purple-500", size: 40 });
      case "transfer":
        return /* @__PURE__ */ jsx(ArrowUp, { className: "rounded-full bg-orange-100 p-2 text-orange-500", size: 40 });
      case "withdraw":
        return /* @__PURE__ */ jsx(Wallet, { className: "rounded-full bg-amber-100 p-2 text-amber-500", size: 40 });
      case "bank_transfer":
      case "credit_card":
        return /* @__PURE__ */ jsx(CreditCard, { className: "rounded-full bg-indigo-100 p-2 text-indigo-500", size: 40 });
      default:
        return /* @__PURE__ */ jsx(Banknote, { className: "rounded-full bg-gray-100 p-2 text-gray-500", size: 40 });
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
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const vaInfo = transaction.va_number;
  return /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-12",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "mx-auto w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl",
          initial: { y: -50, scale: 0.9 },
          animate: { y: 0, scale: 1 },
          exit: { y: 50, scale: 0.9, opacity: 0 },
          transition: { type: "spring", stiffness: 300, damping: 30 },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-4 shadow-sm", children: [
              /* @__PURE__ */ jsx("button", { onClick: onClose, className: "rounded-full p-2 transition hover:bg-gray-100 active:scale-95", children: /* @__PURE__ */ jsx(X, { size: 20 }) }),
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Detail Transaksi" }),
              /* @__PURE__ */ jsx("div", { className: "w-6" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "max-h-[85vh] overflow-y-auto px-6 py-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-col items-center text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "mb-4 text-4xl", children: getTypeIcon(transaction.type || transaction.payment_type) }),
                /* @__PURE__ */ jsxs("div", { className: `text-3xl font-bold ${parseFloat(transaction.amount) > 0 ? "text-green-600" : "text-red-600"}`, children: [
                  parseFloat(transaction.amount) > 0 ? "+" : "",
                  formatCurrency(transaction.amount)
                ] }),
                /* @__PURE__ */ jsx("span", { className: `mt-3 inline-flex items-center rounded-full px-4 py-1 text-sm font-medium`, children: getStatusBadge(transaction.status) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-6 rounded-2xl bg-gray-50 p-5", children: [
                /* @__PURE__ */ jsx("h3", { className: "mb-4 text-base font-semibold text-gray-700", children: "Informasi Transaksi" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsx(
                    DetailRow,
                    {
                      icon: /* @__PURE__ */ jsx(Landmark, { size: 16 }),
                      label: "Metode Pembayaran",
                      value: typeof transaction.payment_type === "string" ? transaction.payment_type.replace("_", " ") : ""
                    }
                  ),
                  vaInfo && /* @__PURE__ */ jsx(DetailRow, { icon: /* @__PURE__ */ jsx(CreditCard, { size: 16 }), label: "Virtual Account", value: vaInfo, copyable: true }),
                  transaction.phone && /* @__PURE__ */ jsx(DetailRow, { icon: /* @__PURE__ */ jsx(Smartphone, { size: 16 }), label: "Nomor Telepon", value: transaction.phone }),
                  /* @__PURE__ */ jsx(DetailRow, { label: "Tanggal", value: formatDate(transaction.created_at) }),
                  /* @__PURE__ */ jsx(DetailRow, { label: "ID Transaksi", value: transaction.id, copyable: true }),
                  /* @__PURE__ */ jsx(DetailRow, { label: "Order ID", value: transaction.order_id, copyable: true }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-4 flex justify-between border-t border-gray-200 pt-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Total Bayar" }),
                    /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold", children: formatCurrency(transaction.amount) })
                  ] })
                ] })
              ] }),
              transaction.status === "pending" && transaction.expiry_time && /* @__PURE__ */ jsx(
                AlertNotice,
                {
                  type: "warning",
                  message: `Batas pembayaran sampai ${new Date(transaction.expiry_time).toLocaleString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}`
                }
              ),
              transaction.status === "failed" && transaction.failure_message && /* @__PURE__ */ jsx(AlertNotice, { type: "error", message: transaction.failure_message }),
              /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-4", children: [
                /* @__PURE__ */ jsxs("button", { className: "flex flex-1 items-center justify-center rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium transition hover:bg-gray-100", children: [
                  /* @__PURE__ */ jsx(Share2, { className: "mr-2", size: 16 }),
                  "Bagikan"
                ] }),
                /* @__PURE__ */ jsxs("button", { className: "flex flex-1 items-center justify-center rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium transition hover:bg-gray-100", children: [
                  /* @__PURE__ */ jsx(Copy, { className: "mr-2", size: 16 }),
                  " Salin ID"
                ] })
              ] })
            ] })
          ]
        }
      )
    }
  ) });
};
function DetailRow({ icon, label, value, copyable }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ jsxs("span", { className: "flex items-center text-gray-500", children: [
      icon,
      /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm", children: label })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium capitalize", children: value }),
      copyable && /* @__PURE__ */ jsx(Copy, { className: "ml-2 cursor-pointer text-gray-400 hover:text-gray-600", size: 16 })
    ] })
  ] });
}
function AlertNotice({ type, message }) {
  const styles = {
    warning: "border-l-4 border-yellow-500 bg-yellow-50 text-yellow-700",
    error: "border-l-4 border-red-500 bg-red-50 text-red-700"
  };
  return /* @__PURE__ */ jsxs("div", { className: `mb-6 flex items-start p-4 ${styles[type]}`, children: [
    /* @__PURE__ */ jsx(AlertCircle, { className: `mr-2 ${type === "warning" ? "text-yellow-500" : "text-red-500"}`, size: 20 }),
    /* @__PURE__ */ jsx("p", { className: "text-sm leading-tight", children: message })
  ] });
}
export {
  Detail as default
};
