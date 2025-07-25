import { jsxDEV } from "react/jsx-dev-runtime";
import { AnimatePresence, motion } from "framer-motion";
import { X, Landmark, CreditCard, Smartphone, Share2, Copy, Banknote, Wallet, ArrowUp, ShoppingCart, ArrowDown, Ban, XCircle, Clock, CheckCircle, AlertCircle } from "lucide-react";
const Detail = ({ transaction, onClose }) => {
  console.log(transaction);
  const getStatusBadge = (status) => {
    switch (status) {
      case "success":
        return /* @__PURE__ */ jsxDEV("span", { className: "inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800", children: [
          /* @__PURE__ */ jsxDEV(CheckCircle, { className: "mr-1 h-4 w-4" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
            lineNumber: 37,
            columnNumber: 25
          }, void 0),
          "Berhasil"
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
          lineNumber: 36,
          columnNumber: 21
        }, void 0);
      case "pending":
        return /* @__PURE__ */ jsxDEV("span", { className: "inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800", children: [
          /* @__PURE__ */ jsxDEV(Clock, { className: "mr-1 h-4 w-4" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
            lineNumber: 44,
            columnNumber: 25
          }, void 0),
          "Menunggu"
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
          lineNumber: 43,
          columnNumber: 21
        }, void 0);
      case "failed":
        return /* @__PURE__ */ jsxDEV("span", { className: "inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800", children: [
          /* @__PURE__ */ jsxDEV(XCircle, { className: "mr-1 h-4 w-4" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
            lineNumber: 51,
            columnNumber: 25
          }, void 0),
          "Gagal"
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
          lineNumber: 50,
          columnNumber: 21
        }, void 0);
      case "canceled":
        return /* @__PURE__ */ jsxDEV("span", { className: "inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800", children: [
          /* @__PURE__ */ jsxDEV(Ban, { className: "mr-1 h-4 w-4" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
            lineNumber: 58,
            columnNumber: 25
          }, void 0),
          "Dibatalkan"
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
          lineNumber: 57,
          columnNumber: 21
        }, void 0);
      default:
        return null;
    }
  };
  const getTypeIcon = (type) => {
    switch (type) {
      case "topup":
      case "deposit":
        return /* @__PURE__ */ jsxDEV(ArrowDown, { className: "rounded-full bg-blue-100 p-2 text-blue-500", size: 40 }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
          lineNumber: 71,
          columnNumber: 24
        }, void 0);
      case "payment":
      case "purchase":
        return /* @__PURE__ */ jsxDEV(ShoppingCart, { className: "rounded-full bg-purple-100 p-2 text-purple-500", size: 40 }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
          lineNumber: 74,
          columnNumber: 24
        }, void 0);
      case "transfer":
        return /* @__PURE__ */ jsxDEV(ArrowUp, { className: "rounded-full bg-orange-100 p-2 text-orange-500", size: 40 }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
          lineNumber: 76,
          columnNumber: 24
        }, void 0);
      case "withdraw":
        return /* @__PURE__ */ jsxDEV(Wallet, { className: "rounded-full bg-amber-100 p-2 text-amber-500", size: 40 }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
          lineNumber: 78,
          columnNumber: 24
        }, void 0);
      case "bank_transfer":
      case "credit_card":
        return /* @__PURE__ */ jsxDEV(CreditCard, { className: "rounded-full bg-indigo-100 p-2 text-indigo-500", size: 40 }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
          lineNumber: 81,
          columnNumber: 24
        }, void 0);
      default:
        return /* @__PURE__ */ jsxDEV(Banknote, { className: "rounded-full bg-gray-100 p-2 text-gray-500", size: 40 }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
          lineNumber: 83,
          columnNumber: 24
        }, void 0);
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
  return /* @__PURE__ */ jsxDEV(AnimatePresence, { children: /* @__PURE__ */ jsxDEV(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-12",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      children: /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          className: "mx-auto w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl",
          initial: { y: -50, scale: 0.9 },
          animate: { y: 0, scale: 1 },
          exit: { y: 50, scale: 0.9, opacity: 0 },
          transition: { type: "spring", stiffness: 300, damping: 30 },
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-4 shadow-sm", children: [
              /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "rounded-full p-2 transition hover:bg-gray-100 active:scale-95", children: /* @__PURE__ */ jsxDEV(X, { size: 20 }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                lineNumber: 130,
                columnNumber: 29
              }, void 0) }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                lineNumber: 129,
                columnNumber: 25
              }, void 0),
              /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-semibold text-gray-900", children: "Detail Transaksi" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                lineNumber: 132,
                columnNumber: 25
              }, void 0),
              /* @__PURE__ */ jsxDEV("div", { className: "w-6" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                lineNumber: 133,
                columnNumber: 25
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
              lineNumber: 128,
              columnNumber: 21
            }, void 0),
            /* @__PURE__ */ jsxDEV("div", { className: "max-h-[85vh] overflow-y-auto px-6 py-8", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "mb-8 flex flex-col items-center text-center", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "mb-4 text-4xl", children: getTypeIcon(transaction.type || transaction.payment_type) }, void 0, false, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                  lineNumber: 140,
                  columnNumber: 29
                }, void 0),
                /* @__PURE__ */ jsxDEV("div", { className: `text-3xl font-bold ${parseFloat(transaction.amount) > 0 ? "text-green-600" : "text-red-600"}`, children: [
                  parseFloat(transaction.amount) > 0 ? "+" : "",
                  formatCurrency(transaction.amount)
                ] }, void 0, true, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                  lineNumber: 141,
                  columnNumber: 29
                }, void 0),
                /* @__PURE__ */ jsxDEV("span", { className: `mt-3 inline-flex items-center rounded-full px-4 py-1 text-sm font-medium`, children: getStatusBadge(transaction.status) }, void 0, false, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                  lineNumber: 145,
                  columnNumber: 29
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                lineNumber: 139,
                columnNumber: 25
              }, void 0),
              /* @__PURE__ */ jsxDEV("div", { className: "mb-6 rounded-2xl bg-gray-50 p-5", children: [
                /* @__PURE__ */ jsxDEV("h3", { className: "mb-4 text-base font-semibold text-gray-700", children: "Informasi Transaksi" }, void 0, false, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                  lineNumber: 152,
                  columnNumber: 29
                }, void 0),
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxDEV(
                    DetailRow,
                    {
                      icon: /* @__PURE__ */ jsxDEV(Landmark, { size: 16 }, void 0, false, {
                        fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                        lineNumber: 155,
                        columnNumber: 43
                      }, void 0),
                      label: "Metode Pembayaran",
                      value: typeof transaction.payment_type === "string" ? transaction.payment_type.replace("_", " ") : ""
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                      lineNumber: 154,
                      columnNumber: 33
                    },
                    void 0
                  ),
                  vaInfo && /* @__PURE__ */ jsxDEV(DetailRow, { icon: /* @__PURE__ */ jsxDEV(CreditCard, { size: 16 }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                    lineNumber: 159,
                    columnNumber: 61
                  }, void 0), label: "Virtual Account", value: vaInfo, copyable: true }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                    lineNumber: 159,
                    columnNumber: 44
                  }, void 0),
                  transaction.phone && /* @__PURE__ */ jsxDEV(DetailRow, { icon: /* @__PURE__ */ jsxDEV(Smartphone, { size: 16 }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                    lineNumber: 160,
                    columnNumber: 72
                  }, void 0), label: "Nomor Telepon", value: transaction.phone }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                    lineNumber: 160,
                    columnNumber: 55
                  }, void 0),
                  /* @__PURE__ */ jsxDEV(DetailRow, { label: "Tanggal", value: formatDate(transaction.created_at) }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                    lineNumber: 161,
                    columnNumber: 33
                  }, void 0),
                  /* @__PURE__ */ jsxDEV(DetailRow, { label: "ID Transaksi", value: transaction.id, copyable: true }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                    lineNumber: 162,
                    columnNumber: 33
                  }, void 0),
                  /* @__PURE__ */ jsxDEV(DetailRow, { label: "Order ID", value: transaction.order_id, copyable: true }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                    lineNumber: 163,
                    columnNumber: 33
                  }, void 0),
                  /* @__PURE__ */ jsxDEV("div", { className: "mt-4 flex justify-between border-t border-gray-200 pt-3", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "font-semibold", children: "Total Bayar" }, void 0, false, {
                      fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                      lineNumber: 165,
                      columnNumber: 37
                    }, void 0),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-lg font-semibold", children: formatCurrency(transaction.amount) }, void 0, false, {
                      fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                      lineNumber: 166,
                      columnNumber: 37
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                    lineNumber: 164,
                    columnNumber: 33
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                  lineNumber: 153,
                  columnNumber: 29
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                lineNumber: 151,
                columnNumber: 25
              }, void 0),
              transaction.status === "pending" && transaction.expiry_time && /* @__PURE__ */ jsxDEV(
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
                },
                void 0,
                false,
                {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                  lineNumber: 173,
                  columnNumber: 29
                },
                void 0
              ),
              transaction.status === "failed" && transaction.failure_message && /* @__PURE__ */ jsxDEV(AlertNotice, { type: "error", message: transaction.failure_message }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                lineNumber: 185,
                columnNumber: 29
              }, void 0),
              /* @__PURE__ */ jsxDEV("div", { className: "mt-6 flex gap-4", children: [
                /* @__PURE__ */ jsxDEV("button", { className: "flex flex-1 items-center justify-center rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium transition hover:bg-gray-100", children: [
                  /* @__PURE__ */ jsxDEV(Share2, { className: "mr-2", size: 16 }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                    lineNumber: 191,
                    columnNumber: 33
                  }, void 0),
                  "Bagikan"
                ] }, void 0, true, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                  lineNumber: 190,
                  columnNumber: 29
                }, void 0),
                /* @__PURE__ */ jsxDEV("button", { className: "flex flex-1 items-center justify-center rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium transition hover:bg-gray-100", children: [
                  /* @__PURE__ */ jsxDEV(Copy, { className: "mr-2", size: 16 }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                    lineNumber: 195,
                    columnNumber: 33
                  }, void 0),
                  " Salin ID"
                ] }, void 0, true, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                  lineNumber: 194,
                  columnNumber: 29
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
                lineNumber: 189,
                columnNumber: 25
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
              lineNumber: 137,
              columnNumber: 21
            }, void 0)
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
          lineNumber: 120,
          columnNumber: 17
        },
        void 0
      )
    },
    void 0,
    false,
    {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
      lineNumber: 114,
      columnNumber: 13
    },
    void 0
  ) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
    lineNumber: 113,
    columnNumber: 9
  }, void 0);
};
function DetailRow({ icon, label, value, copyable }) {
  return /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ jsxDEV("span", { className: "flex items-center text-gray-500", children: [
      icon,
      /* @__PURE__ */ jsxDEV("span", { className: "ml-2 text-sm", children: label }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
        lineNumber: 213,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
      lineNumber: 211,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-medium capitalize", children: value }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
        lineNumber: 216,
        columnNumber: 17
      }, this),
      copyable && /* @__PURE__ */ jsxDEV(Copy, { className: "ml-2 cursor-pointer text-gray-400 hover:text-gray-600", size: 16 }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
        lineNumber: 217,
        columnNumber: 30
      }, this)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
      lineNumber: 215,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
    lineNumber: 210,
    columnNumber: 9
  }, this);
}
function AlertNotice({ type, message }) {
  const styles = {
    warning: "border-l-4 border-yellow-500 bg-yellow-50 text-yellow-700",
    error: "border-l-4 border-red-500 bg-red-50 text-red-700"
  };
  return /* @__PURE__ */ jsxDEV("div", { className: `mb-6 flex items-start p-4 ${styles[type]}`, children: [
    /* @__PURE__ */ jsxDEV(AlertCircle, { className: `mr-2 ${type === "warning" ? "text-yellow-500" : "text-red-500"}`, size: 20 }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
      lineNumber: 231,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("p", { className: "text-sm leading-tight", children: message }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
      lineNumber: 232,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Detail.tsx",
    lineNumber: 230,
    columnNumber: 9
  }, this);
}
export {
  Detail as default
};
