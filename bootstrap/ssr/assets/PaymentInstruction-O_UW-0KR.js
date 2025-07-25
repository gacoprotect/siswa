import { jsxDEV, Fragment } from "react/jsx-dev-runtime";
import { u as useToast } from "./use-toast-BUXgu9gQ.js";
import { A as AppLayout } from "./AppLayout-Dr7OzoMY.js";
import { usePage, router } from "@inertiajs/react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
import { useState, useEffect, useCallback } from "react";
import { FaArrowLeft, FaClock, FaSpinner, FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import "./logger-context-CghNbJb_.js";
import "./use-debug-logger-DbMTik7y.js";
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
        icon: /* @__PURE__ */ jsxDEV(FaCheckCircle, {}, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
          lineNumber: 57,
          columnNumber: 23
        }, void 0),
        label: "Berhasil"
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: /* @__PURE__ */ jsxDEV(FaSpinner, { className: "animate-spin" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
          lineNumber: 63,
          columnNumber: 23
        }, void 0),
        label: "Menunggu Pembayaran"
      },
      failed: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: /* @__PURE__ */ jsxDEV(FaTimesCircle, {}, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
          lineNumber: 69,
          columnNumber: 23
        }, void 0),
        label: "Gagal"
      },
      canceled: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: /* @__PURE__ */ jsxDEV(FaTimesCircle, {}, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
          lineNumber: 75,
          columnNumber: 23
        }, void 0),
        label: "Transaksi Dibatalkan"
      }
    };
    const config = statusConfig[transaction.status];
    if (!config) return null;
    return /* @__PURE__ */ jsxDEV("span", { className: `inline-flex items-center gap-2 rounded-full ${config.bg} px-3 py-1 text-sm ${config.text}`, children: [
      config.icon,
      " ",
      config.label
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
      lineNumber: 85,
      columnNumber: 13
    }, void 0);
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
  return /* @__PURE__ */ jsxDEV(AppLayout, { title: "Instruksi Pembayaran", children: /* @__PURE__ */ jsxDEV("div", { className: "mx-auto max-w-2xl overflow-hidden rounded-lg bg-white shadow-md", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground", children: /* @__PURE__ */ jsxDEV("button", { onClick: () => window.history.back(), className: "flex items-center space-x-2 transition-opacity hover:opacity-80", children: [
      /* @__PURE__ */ jsxDEV(FaArrowLeft, {}, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
        lineNumber: 168,
        columnNumber: 25
      }, void 0),
      /* @__PURE__ */ jsxDEV("span", { children: "Dashboard" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
        lineNumber: 169,
        columnNumber: 25
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
      lineNumber: 167,
      columnNumber: 21
    }, void 0) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
      lineNumber: 166,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxDEV("h1", { className: "mb-3 text-center text-2xl font-bold", children: "Instruksi Pembayaran" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
        lineNumber: 174,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "mb-4 flex justify-center", children: getStatusBadge() }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
        lineNumber: 176,
        columnNumber: 21
      }, void 0),
      transaction.status === "pending" && /* @__PURE__ */ jsxDEV("div", { className: "mb-6 flex flex-col gap-2 rounded-lg bg-blue-50 p-4 text-blue-800 lg:flex-row lg:items-center lg:justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(FaClock, {}, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
            lineNumber: 181,
            columnNumber: 33
          }, void 0),
          /* @__PURE__ */ jsxDEV("span", { children: "Batas Waktu Pembayaran" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
            lineNumber: 182,
            columnNumber: 33
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
          lineNumber: 180,
          columnNumber: 29
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "text-sm lg:text-right", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-bold", children: formatExpiryDate(transaction.expiry_time) }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
            lineNumber: 185,
            columnNumber: 33
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-blue-700", children: [
            "Sisa waktu: ",
            countdown
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
            lineNumber: 186,
            columnNumber: 33
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
          lineNumber: 184,
          columnNumber: 29
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
        lineNumber: 179,
        columnNumber: 25
      }, void 0),
      errorCancel && /* @__PURE__ */ jsxDEV("p", { className: "mb-4 text-center text-sm text-red-500", children: errorCancel }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
        lineNumber: 193,
        columnNumber: 37
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "mb-6 rounded-lg border border-gray-200 p-4", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "mb-3 text-lg font-semibold", children: "Detail Transaksi" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
          lineNumber: 196,
          columnNumber: 25
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row lg:justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-gray-600", children: "Order ID" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
              lineNumber: 199,
              columnNumber: 33
            }, void 0),
            /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: transaction.order_id }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
              lineNumber: 200,
              columnNumber: 33
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
            lineNumber: 198,
            columnNumber: 29
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row lg:justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-gray-600", children: "Jumlah" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
              lineNumber: 203,
              columnNumber: 33
            }, void 0),
            /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: formatAmount(transaction.amount) }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
              lineNumber: 204,
              columnNumber: 33
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
            lineNumber: 202,
            columnNumber: 29
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row lg:justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-gray-600", children: "Metode Pembayaran" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
              lineNumber: 207,
              columnNumber: 33
            }, void 0),
            /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: "Virtual Account (VA)" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
              lineNumber: 208,
              columnNumber: 33
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
            lineNumber: 206,
            columnNumber: 29
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row lg:justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-gray-600", children: "Nomor Virtual Account" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
              lineNumber: 211,
              columnNumber: 33
            }, void 0),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between space-x-4", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: transaction.va_number }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
                lineNumber: 213,
                columnNumber: 37
              }, void 0),
              transaction.status === "pending" && /* @__PURE__ */ jsxDEV(
                "button",
                {
                  disabled: simulating,
                  onClick: (e) => {
                    setSimulating(true);
                    handleSimulate(e, transaction.va_number);
                  },
                  className: `flex items-center space-x-2 rounded-lg px-4 py-2 font-bold text-white ${simulating ? "bg-cyan-700" : "bg-cyan-900 hover:bg-cyan-800"} transition-colors disabled:opacity-70`,
                  children: simulating ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(FaSpinner, { className: "animate-spin" }, void 0, false, {
                      fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
                      lineNumber: 227,
                      columnNumber: 53
                    }, void 0),
                    /* @__PURE__ */ jsxDEV("span", { children: "Memproses pembayaran" }, void 0, false, {
                      fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
                      lineNumber: 228,
                      columnNumber: 53
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
                    lineNumber: 226,
                    columnNumber: 49
                  }, void 0) : "Simulasi Pembayaran"
                },
                void 0,
                false,
                {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
                  lineNumber: 215,
                  columnNumber: 41
                },
                void 0
              )
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
              lineNumber: 212,
              columnNumber: 33
            }, void 0),
            errorSimulate && /* @__PURE__ */ jsxDEV("p", { className: "text-center text-sm text-red-500", children: errorSimulate }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
              lineNumber: 236,
              columnNumber: 51
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
            lineNumber: 210,
            columnNumber: 29
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
          lineNumber: 197,
          columnNumber: 25
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
        lineNumber: 195,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "mb-6 rounded-lg border border-gray-200 p-4", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "mb-3 text-lg font-semibold", children: "Instruksi Pembayaran" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
          lineNumber: 242,
          columnNumber: 25
        }, void 0),
        /* @__PURE__ */ jsxDEV("ol", { className: "list-decimal space-y-3 pl-5", children: [
          /* @__PURE__ */ jsxDEV("li", { children: "Buka aplikasi mobile banking / internet banking Anda" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
            lineNumber: 244,
            columnNumber: 29
          }, void 0),
          /* @__PURE__ */ jsxDEV("li", { children: [
            "Masukkan nomor VA: ",
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold", children: transaction.va_number }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
              lineNumber: 246,
              columnNumber: 52
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
            lineNumber: 245,
            columnNumber: 29
          }, void 0),
          /* @__PURE__ */ jsxDEV("li", { children: "Masukkan jumlah pembayaran sesuai tagihan" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
            lineNumber: 248,
            columnNumber: 29
          }, void 0),
          /* @__PURE__ */ jsxDEV("li", { children: "Ikuti instruksi di aplikasi hingga selesai" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
            lineNumber: 249,
            columnNumber: 29
          }, void 0),
          /* @__PURE__ */ jsxDEV("li", { children: "Pembayaran akan dikonfirmasi otomatis dalam 1-5 menit" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
            lineNumber: 250,
            columnNumber: 29
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
          lineNumber: 243,
          columnNumber: 25
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
        lineNumber: 241,
        columnNumber: 21
      }, void 0),
      cancelButton && /* @__PURE__ */ jsxDEV("div", { className: "mb-6 flex flex-col items-center justify-center space-y-2", children: [
        errorCancel && /* @__PURE__ */ jsxDEV("p", { className: "text-center text-sm text-red-500", children: errorCancel }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
          lineNumber: 256,
          columnNumber: 45
        }, void 0),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            disabled: transaction.status === "canceled",
            onClick: handleCancel,
            className: `rounded-lg px-4 py-2 font-bold text-white transition-colors ${transaction.status === "canceled" ? "cursor-not-allowed bg-red-300" : "bg-red-700 hover:bg-red-800"}`,
            children: "Batalkan Transaksi"
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
            lineNumber: 258,
            columnNumber: 29
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
        lineNumber: 255,
        columnNumber: 25
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "rounded-lg bg-yellow-50 p-4 text-yellow-800", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "mb-2 font-semibold", children: "Perhatian!" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
          lineNumber: 271,
          columnNumber: 25
        }, void 0),
        /* @__PURE__ */ jsxDEV("p", { children: "Hanya lakukan pembayaran ke nomor VA di atas. Simpan bukti transaksi untuk referensi." }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
          lineNumber: 272,
          columnNumber: 25
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
        lineNumber: 270,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
      lineNumber: 173,
      columnNumber: 17
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
    lineNumber: 165,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/PaymentInstruction.tsx",
    lineNumber: 164,
    columnNumber: 9
  }, void 0);
};
export {
  PaymentInstruction as default
};
