import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { u as useToast } from "./use-toast-DCJD4gzY.js";
import { A as AppLayout } from "./AppLayout-CqEdbHnq.js";
import { usePage, router } from "@inertiajs/react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
import { useState, useEffect, useCallback } from "react";
import { FaArrowLeft, FaClock, FaSpinner, FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import "react-toastify";
dayjs.extend(duration);
const PaymentInstruction = ({ order_id, transaction }) => {
  const { nouid, errors } = usePage().props;
  const [countdown, setCountdown] = useState("");
  const [simulating, setSimulating] = useState(false);
  const [cancelButton, setCancelButon] = useState(true);
  const [errorCancel, setErrorCancel] = useState(null);
  const [errorSimulate, setErrorSimulate] = useState(null);
  const expiry = dayjs(transaction.expiry_time);
  useToast(usePage().props);
  useEffect(() => {
    if (!order_id || transaction.status === "success") {
      router.visit(route("siswa.index", nouid));
      return;
    }
    const updateCountdown = () => {
      const now = dayjs();
      const diff = expiry.diff(now);
      if (diff <= 0) {
        setCountdown("Waktu pembayaran telah habis");
        return false;
      } else {
        const dur = dayjs.duration(diff);
        setCountdown(`${dur.hours()}j ${dur.minutes()}m ${dur.seconds()}d`);
        return true;
      }
    };
    const shouldContinue = updateCountdown();
    if (shouldContinue) {
      const interval = setInterval(updateCountdown, 1e3);
      return () => clearInterval(interval);
    }
  }, [order_id, transaction, expiry, nouid]);
  const getStatusBadge = useCallback(() => {
    const statusConfig = {
      success: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: /* @__PURE__ */ jsx(FaCheckCircle, {}),
        label: "Berhasil"
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: /* @__PURE__ */ jsx(FaSpinner, { className: "animate-spin" }),
        label: "Menunggu Pembayaran"
      },
      failed: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: /* @__PURE__ */ jsx(FaTimesCircle, {}),
        label: "Gagal"
      },
      canceled: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: /* @__PURE__ */ jsx(FaTimesCircle, {}),
        label: "Transaksi Dibatalkan"
      }
    };
    const config = statusConfig[transaction.status];
    if (!config) return null;
    return /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-2 rounded-full ${config.bg} px-3 py-1 text-sm ${config.text}`, children: [
      config.icon,
      " ",
      config.label
    ] });
  }, [transaction.status]);
  useEffect(() => {
    const btn = () => {
      if (["success", "failed", "canceled"].includes(transaction.status)) {
        setCancelButon(false);
      } else {
        setCancelButon(true);
      }
    };
    btn();
  }, [transaction.status]);
  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      setErrorCancel(null);
      await router.post(
        route("transactions.cancel", {
          nouid,
          orderId: transaction.order_id
        }),
        {
          nouid,
          order_id: transaction.order_id
        }
      );
    } catch (err) {
      setErrorCancel("Terjadi kesalahan saat memproses pembayaran");
      console.error(err);
    }
  };
  const handleSimulate = async (e, va) => {
    e.preventDefault();
    try {
      setSimulating(true);
      setErrorSimulate(null);
      await router.post(
        route("payment.simulate", {
          nouid,
          orderId: transaction.order_id
        }),
        {
          nouid,
          order_id: transaction.order_id,
          va_number: va,
          amount: transaction.amount,
          type: transaction.type,
          tah: transaction.tah,
          month: transaction.month,
          spr: transaction.spr
        },
        {
          onBefore: () => {
            setSimulating(true);
          }
        }
      );
    } catch (error) {
      setErrorSimulate("Simulasi pembayaran gagal");
      console.error("Simulasi pembayaran gagal:", error);
    } finally {
      setSimulating(false);
    }
  };
  const formatAmount = (amount) => {
    return `Rp ${parseInt(amount).toLocaleString("id-ID")}`;
  };
  const formatExpiryDate = (date) => {
    return dayjs(date).format("DD MMM YYYY HH:mm");
  };
  return /* @__PURE__ */ jsx(AppLayout, { title: "Instruksi Pembayaran", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl overflow-hidden rounded-lg bg-white shadow-md", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground", children: /* @__PURE__ */ jsxs("button", { onClick: () => window.history.back(), className: "flex items-center space-x-2 transition-opacity hover:opacity-80", children: [
      /* @__PURE__ */ jsx(FaArrowLeft, {}),
      /* @__PURE__ */ jsx("span", { children: "Dashboard" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-3 text-center text-2xl font-bold", children: "Instruksi Pembayaran" }),
      /* @__PURE__ */ jsx("div", { className: "mb-4 flex justify-center", children: getStatusBadge() }),
      transaction.status === "pending" && /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col gap-2 rounded-lg bg-blue-50 p-4 text-blue-800 lg:flex-row lg:items-center lg:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FaClock, {}),
          /* @__PURE__ */ jsx("span", { children: "Batas Waktu Pembayaran" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm lg:text-right", children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold", children: formatExpiryDate(transaction.expiry_time) }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-blue-700", children: [
            "Sisa waktu: ",
            countdown
          ] })
        ] })
      ] }),
      errorCancel && /* @__PURE__ */ jsx("p", { className: "mb-4 text-center text-sm text-red-500", children: errorCancel }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6 rounded-lg border border-gray-200 p-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-3 text-lg font-semibold", children: "Detail Transaksi" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Order ID" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: transaction.order_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Jumlah" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatAmount(transaction.amount) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Metode Pembayaran" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Virtual Account (VA)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Nomor Virtual Account" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between space-x-4", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: transaction.va_number }),
              transaction.status === "pending" && /* @__PURE__ */ jsx(
                "button",
                {
                  disabled: simulating,
                  onClick: (e) => {
                    setSimulating(true);
                    handleSimulate(e, transaction.va_number);
                  },
                  className: `flex items-center space-x-2 rounded-lg px-4 py-2 font-bold text-white ${simulating ? "bg-cyan-700" : "bg-cyan-900 hover:bg-cyan-800"} transition-colors disabled:opacity-70`,
                  children: simulating ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(FaSpinner, { className: "animate-spin" }),
                    /* @__PURE__ */ jsx("span", { children: "Memproses pembayaran" })
                  ] }) : "Simulasi Pembayaran"
                }
              )
            ] }),
            errorSimulate && /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-red-500", children: errorSimulate })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6 rounded-lg border border-gray-200 p-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-3 text-lg font-semibold", children: "Instruksi Pembayaran" }),
        /* @__PURE__ */ jsxs("ol", { className: "list-decimal space-y-3 pl-5", children: [
          /* @__PURE__ */ jsx("li", { children: "Buka aplikasi mobile banking / internet banking Anda" }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Masukkan nomor VA: ",
            /* @__PURE__ */ jsx("span", { className: "font-bold", children: transaction.va_number })
          ] }),
          /* @__PURE__ */ jsx("li", { children: "Masukkan jumlah pembayaran sesuai tagihan" }),
          /* @__PURE__ */ jsx("li", { children: "Ikuti instruksi di aplikasi hingga selesai" }),
          /* @__PURE__ */ jsx("li", { children: "Pembayaran akan dikonfirmasi otomatis dalam 1-5 menit" })
        ] })
      ] }),
      cancelButton && /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col items-center justify-center space-y-2", children: [
        errorCancel && /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-red-500", children: errorCancel }),
        /* @__PURE__ */ jsx(
          "button",
          {
            disabled: transaction.status === "canceled",
            onClick: handleCancel,
            className: `rounded-lg px-4 py-2 font-bold text-white transition-colors ${transaction.status === "canceled" ? "cursor-not-allowed bg-red-300" : "bg-red-700 hover:bg-red-800"}`,
            children: "Batalkan Transaksi"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-yellow-50 p-4 text-yellow-800", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-2 font-semibold", children: "Perhatian!" }),
        /* @__PURE__ */ jsx("p", { children: "Hanya lakukan pembayaran ke nomor VA di atas. Simpan bukti transaksi untuk referensi." })
      ] })
    ] })
  ] }) });
};
export {
  PaymentInstruction as default
};
