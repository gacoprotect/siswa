import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { A as AppLayout } from "./AppLayout-BOCrgB5m.js";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { FaArrowLeft, FaClock, FaTimesCircle, FaCheckCircle } from "react-icons/fa";
const Detail = ({ transaction }) => {
  const [isChecking, setIsChecking] = useState(false);
  const getStatusIcon = () => {
    switch (transaction.status) {
      case "success":
        return /* @__PURE__ */ jsx(FaCheckCircle, { className: "text-4xl text-green-500" });
      case "failed":
        return /* @__PURE__ */ jsx(FaTimesCircle, { className: "text-4xl text-red-500" });
      default:
        return /* @__PURE__ */ jsx(FaClock, { className: "text-4xl text-yellow-500" });
    }
  };
  const checkStatus = async () => {
    setIsChecking(true);
    try {
      await router.reload();
    } finally {
      setIsChecking(false);
    }
  };
  return /* @__PURE__ */ jsx(AppLayout, { title: "Detail Transaksi", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl overflow-hidden rounded-lg bg-white shadow-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => router.visit("/transactions"), className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(FaArrowLeft, { className: "text-primary-foreground" }),
        /* @__PURE__ */ jsx("span", { children: "Kembali ke Riwayat" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-white", children: "Detail Transaksi" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-2 rounded-full bg-gray-100 p-3", children: getStatusIcon() }),
        /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold capitalize", children: transaction.status })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6 rounded-lg border border-gray-200 p-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-3 text-lg font-semibold", children: "Informasi Transaksi" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Order ID" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: transaction.order_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Jumlah" }),
            /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
              "Rp ",
              transaction.amount.toLocaleString("id-ID")
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Metode Pembayaran" }),
            /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
              "Transfer Bank ",
              transaction.bank.toUpperCase()
            ] })
          ] }),
          transaction.va_number && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Nomor VA" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: transaction.va_number })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Tanggal Transaksi" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: new Date(transaction.created_at).toLocaleString("id-ID") })
          ] }),
          transaction.expiry_time && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Batas Pembayaran" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: new Date(transaction.expiry_time).toLocaleString("id-ID") })
          ] })
        ] })
      ] }),
      transaction.status === "pending" && /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: checkStatus,
          disabled: isChecking,
          className: "flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-white transition duration-200 hover:bg-blue-700 disabled:bg-blue-400",
          children: isChecking ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(
              "svg",
              {
                className: "mr-3 -ml-1 h-5 w-5 animate-spin text-white",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                children: [
                  /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      className: "opacity-75",
                      fill: "currentColor",
                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    }
                  )
                ]
              }
            ),
            "Memeriksa Status..."
          ] }) : "Periksa Status Terbaru"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-gray-50 p-4 text-gray-800", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-2 font-semibold", children: "Catatan" }),
        /* @__PURE__ */ jsx("p", { children: transaction.status === "pending" ? "Silakan selesaikan pembayaran sebelum waktu yang ditentukan." : transaction.status === "success" ? "Pembayaran telah berhasil diterima." : "Transaksi gagal atau telah kedaluwarsa." })
      ] })
    ] })
  ] }) });
};
export {
  Detail as default
};
