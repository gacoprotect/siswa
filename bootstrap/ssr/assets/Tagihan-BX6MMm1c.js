import { jsxDEV, Fragment } from "react/jsx-dev-runtime";
import { A as AppLayout } from "./AppLayout-Dr7OzoMY.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import { useState, useEffect, useCallback } from "react";
import { FaSpinner, FaArrowAltCircleLeft } from "react-icons/fa";
import "./logger-context-CghNbJb_.js";
import "./use-debug-logger-DbMTik7y.js";
import "react-toastify";
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = useState();
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
const PaymentPage = ({ siswa, tagihanParam, onClose }) => {
  const { flash } = usePage().props;
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [exist, setExist] = useState(false);
  const [lunas, setLunas] = useState(false);
  const [initialData, setInitialData] = useState({
    nouid: tagihanParam.nouid,
    items: [],
    total_tagihan: tagihanParam.tagihan,
    total_diskon: 0,
    sisa_tagihan: 0,
    orderId: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const { data, post, processing, setData, errors } = useForm({
    spr: tagihanParam.spr,
    nouid: tagihanParam.nouid,
    payment_method: paymentMethod,
    amount: tagihanParam.tagihan,
    orderId: "",
    uri: null
  });
  const fetchPaymentData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!tagihanParam.nouid) {
        throw new Error("Tagihan tidak ditemukan");
      }
      const url = route("api.tagihan", { nouid: tagihanParam.nouid });
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(tagihanParam)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal mengambil data tagihan");
      }
      const responseData = await response.json();
      if (responseData.redirect) {
        setExist(true);
        setData("uri", responseData.redirect);
        return;
      }
      if (responseData.data) {
        const Data = responseData.data;
        setInitialData(Data);
        setData("orderId", Data.orderId);
      }
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : "Terjadi kesalahan");
      if (onClose) {
        setTimeout(onClose, 1e3);
      }
    } finally {
      setIsLoading(false);
    }
  }, [tagihanParam, setData, onClose]);
  useEffect(() => {
    fetchPaymentData();
  }, [fetchPaymentData]);
  useEffect(() => {
    setData("payment_method", paymentMethod);
  }, [paymentMethod, setData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    await post(route("tagihan.pay", tagihanParam.nouid), {
      preserveScroll: true,
      onSuccess: () => {
        if ((flash == null ? void 0 : flash.success) === true) {
          setLunas(true);
          setTimeout(() => {
            onClose == null ? void 0 : onClose();
          }, 1e4);
        }
      },
      onError: (errors2) => {
        console.error("Payment error:", errors2);
        setLunas(false);
      }
    });
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(amount);
  };
  const isSaldoInsufficient = paymentMethod === "wallet" && siswa.balance < initialData.total_tagihan;
  const isSubmitDisabled = processing || isSaldoInsufficient || isLoading;
  if (isLoading) {
    return /* @__PURE__ */ jsxDEV(AppLayout, { children: [
      /* @__PURE__ */ jsxDEV(Head, { title: "Memuat Pembayaran" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
        lineNumber: 150,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "flex min-h-screen flex-col items-center justify-center space-y-3 bg-white", children: [
        /* @__PURE__ */ jsxDEV(FaSpinner, { className: "animate-spin text-3xl text-blue-600" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
          lineNumber: 152,
          columnNumber: 21
        }, void 0),
        /* @__PURE__ */ jsxDEV("span", { className: "text-lg text-gray-700", children: "Memuat data pembayaran..." }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
          lineNumber: 153,
          columnNumber: 21
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
        lineNumber: 151,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
      lineNumber: 149,
      columnNumber: 13
    }, void 0);
  }
  return /* @__PURE__ */ jsxDEV(AppLayout, { children: [
    /* @__PURE__ */ jsxDEV(Head, { title: "Pembayaran Tagihan" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
      lineNumber: 161,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen overflow-hidden rounded-lg bg-white shadow-md", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground", children: [
        /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "flex items-center space-x-2 transition-opacity hover:opacity-80", disabled: processing, children: [
          /* @__PURE__ */ jsxDEV(FaArrowAltCircleLeft, { className: "text-primary-foreground" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
            lineNumber: 165,
            columnNumber: 25
          }, void 0),
          /* @__PURE__ */ jsxDEV("span", { children: "Kembali" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
            lineNumber: 166,
            columnNumber: 25
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
          lineNumber: 164,
          columnNumber: 21
        }, void 0),
        !isMobile && /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-bold text-white", children: "Pembayaran Tagihan" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
          lineNumber: 168,
          columnNumber: 36
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
        lineNumber: 163,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV(Fragment, { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "border-b p-4 sm:p-6", children: [
          isMobile && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-bold text-center", children: "Pembayaran Tagihan" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
            lineNumber: 176,
            columnNumber: 33
          }, void 0) }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
            lineNumber: 175,
            columnNumber: 29
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "mt-3grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 bg-gray-100 p-2", children: [
            /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-bold sm:text-base", children: [
              "NIS: ",
              siswa.nis,
              " - ",
              siswa.namlen.toUpperCase()
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 180,
              columnNumber: 33
            }, void 0) }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 179,
              columnNumber: 29
            }, void 0),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-600", children: "Nomor Telepon" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                lineNumber: 186,
                columnNumber: 33
              }, void 0),
              /* @__PURE__ */ jsxDEV("p", { className: "text-sm sm:text-base", children: siswa.tel || "Tidak ada data" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                lineNumber: 187,
                columnNumber: 33
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 185,
              columnNumber: 29
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
            lineNumber: 178,
            columnNumber: 25
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
          lineNumber: 173,
          columnNumber: 21
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "border-b p-4 sm:p-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex mb-3 text-center items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-semibold", children: "Rincian Tagihan" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 195,
              columnNumber: 29
            }, void 0),
            /* @__PURE__ */ jsxDEV("span", { className: "bg-gray-100 p-1 text-sm rounded-3xl text-gray-500", children: [
              "ID# ",
              initialData.orderId
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 196,
              columnNumber: 29
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
            lineNumber: 194,
            columnNumber: 25
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV("table", { className: "min-w-full divide-y divide-gray-200", children: [
            /* @__PURE__ */ jsxDEV("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxDEV("tr", { children: [
              /* @__PURE__ */ jsxDEV("th", { className: "px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 sm:py-3", children: "Tahun" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                lineNumber: 202,
                columnNumber: 41
              }, void 0),
              /* @__PURE__ */ jsxDEV("th", { className: "px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 sm:py-3", children: "Bulan" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                lineNumber: 205,
                columnNumber: 41
              }, void 0),
              /* @__PURE__ */ jsxDEV("th", { className: "px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 sm:py-3", children: "Jumlah" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                lineNumber: 208,
                columnNumber: 41
              }, void 0),
              /* @__PURE__ */ jsxDEV("th", { className: "px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 sm:py-3", children: "Keterangan" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                lineNumber: 211,
                columnNumber: 41
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 201,
              columnNumber: 37
            }, void 0) }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 200,
              columnNumber: 33
            }, void 0),
            /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-gray-200 bg-white", children: initialData.items.map((item, index) => /* @__PURE__ */ jsxDEV("tr", { children: [
              /* @__PURE__ */ jsxDEV("td", { className: "px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6", children: item.tah }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                lineNumber: 219,
                columnNumber: 45
              }, void 0),
              /* @__PURE__ */ jsxDEV("td", { className: "px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6", children: item.bulan }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                lineNumber: 220,
                columnNumber: 45
              }, void 0),
              /* @__PURE__ */ jsxDEV("td", { className: "px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6", children: formatCurrency(item.jumlah) }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                lineNumber: 221,
                columnNumber: 45
              }, void 0),
              /* @__PURE__ */ jsxDEV("td", { className: "px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6", children: item.ket }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                lineNumber: 224,
                columnNumber: 45
              }, void 0)
            ] }, `${item.id}-${index}`, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 218,
              columnNumber: 41
            }, void 0)) }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 216,
              columnNumber: 33
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
            lineNumber: 199,
            columnNumber: 29
          }, void 0) }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
            lineNumber: 198,
            columnNumber: 25
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "mt-4 flex items-center justify-between sm:mt-6", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-base font-semibold sm:text-lg", children: "Total Tagihan:" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 232,
              columnNumber: 29
            }, void 0),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-bold text-blue-600 sm:text-2xl", children: formatCurrency(initialData.total_tagihan) }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 233,
              columnNumber: 29
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
            lineNumber: 231,
            columnNumber: 25
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
          lineNumber: 193,
          columnNumber: 21
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 sm:p-6", children: exist ? /* @__PURE__ */ jsxDEV("div", { className: "mx-6 mb-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700 shadow-sm", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "font-semibold", children: "Transaksi Belum Selesai" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
            lineNumber: 241,
            columnNumber: 33
          }, void 0),
          /* @__PURE__ */ jsxDEV("p", { className: "mt-1", children: "Anda memiliki transaksi yang belum selesai. Silakan selesaikan transaksi sebelumnya untuk melanjutkan." }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
            lineNumber: 242,
            columnNumber: 33
          }, void 0),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                if (data.uri) window.location.href = data.uri;
              },
              className: "mt-3 inline-block rounded bg-yellow-600 px-4 py-2 font-medium text-white transition hover:bg-yellow-700",
              children: "Lanjutkan ke Transaksi"
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 245,
              columnNumber: 33
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
          lineNumber: 240,
          columnNumber: 29
        }, void 0) : lunas ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-md mb-3 font-semibold sm:mb-4", children: [
            "Metode Pembayaran : ",
            paymentMethod === "wallet" ? "Saldo Tabungan" : "Virtual Account"
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
            lineNumber: 256,
            columnNumber: 33
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center space-y-4 p-6", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex h-15 w-40 items-center justify-center border-4 border-green-700 p-4", children: /* @__PURE__ */ jsxDEV("h1", { className: "text-4xl font-bold text-green-700", children: "LUNAS" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 262,
              columnNumber: 41
            }, void 0) }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 261,
              columnNumber: 37
            }, void 0),
            /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600", children: "Pembayaran berhasil diproses" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 264,
              columnNumber: 37
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
            lineNumber: 260,
            columnNumber: 33
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
          lineNumber: 255,
          columnNumber: 29
        }, void 0) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "mb-3 text-lg font-semibold sm:mb-4 sm:text-xl", children: "Metode Pembayaran" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
            lineNumber: 269,
            columnNumber: 33
          }, void 0),
          /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-start", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "mt-1 flex h-5 items-center", children: /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    id: "wallet",
                    name: "payment_method",
                    type: "radio",
                    checked: paymentMethod === "wallet",
                    onChange: () => setPaymentMethod("wallet"),
                    className: "h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500",
                    disabled: processing
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                    lineNumber: 276,
                    columnNumber: 49
                  },
                  void 0
                ) }, void 0, false, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                  lineNumber: 275,
                  columnNumber: 45
                }, void 0),
                /* @__PURE__ */ jsxDEV("div", { className: "ml-3 flex-1", children: [
                  /* @__PURE__ */ jsxDEV("label", { htmlFor: "wallet", className: "block text-sm font-medium text-gray-700 sm:text-base", children: [
                    "Saldo Tabungan : ",
                    formatCurrency(siswa.balance)
                  ] }, void 0, true, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                    lineNumber: 287,
                    columnNumber: 49
                  }, void 0),
                  /* @__PURE__ */ jsxDEV("div", { className: "mt-1 text-sm text-gray-500", children: isSaldoInsufficient ? /* @__PURE__ */ jsxDEV("p", { className: "text-red-500", children: "Saldo tidak mencukupi" }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                    lineNumber: 292,
                    columnNumber: 57
                  }, void 0) : /* @__PURE__ */ jsxDEV("p", { children: "Cukup dan aman untuk bertransaksi" }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                    lineNumber: 294,
                    columnNumber: 57
                  }, void 0) }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                    lineNumber: 290,
                    columnNumber: 49
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                  lineNumber: 286,
                  columnNumber: 45
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                lineNumber: 274,
                columnNumber: 41
              }, void 0),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-start", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "mt-1 flex h-5 items-center", children: /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    id: "va",
                    name: "payment_method",
                    type: "radio",
                    checked: paymentMethod === "va",
                    onChange: () => setPaymentMethod("va"),
                    className: "h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500",
                    disabled: processing
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                    lineNumber: 303,
                    columnNumber: 49
                  },
                  void 0
                ) }, void 0, false, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                  lineNumber: 302,
                  columnNumber: 45
                }, void 0),
                /* @__PURE__ */ jsxDEV("div", { className: "ml-3 flex-1", children: [
                  /* @__PURE__ */ jsxDEV("label", { htmlFor: "va", className: "block text-sm font-medium text-gray-700 sm:text-base", children: "Virtual Account" }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                    lineNumber: 314,
                    columnNumber: 49
                  }, void 0),
                  /* @__PURE__ */ jsxDEV("div", { className: "mt-1 text-sm text-gray-500", children: "Transfer melalui bank partner" }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                    lineNumber: 317,
                    columnNumber: 49
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                  lineNumber: 313,
                  columnNumber: 45
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                lineNumber: 301,
                columnNumber: 41
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 272,
              columnNumber: 37
            }, void 0),
            errors.payment_method && /* @__PURE__ */ jsxDEV("p", { className: "mt-2 text-sm text-red-600", children: errors.payment_method }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 322,
              columnNumber: 63
            }, void 0),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-6 flex justify-end sm:mt-8", children: /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "submit",
                disabled: isSubmitDisabled,
                className: `rounded-md px-6 py-3 text-base font-medium text-white shadow-sm transition-colors ${isSubmitDisabled ? "cursor-not-allowed bg-gray-400" : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"}`,
                children: processing ? /* @__PURE__ */ jsxDEV("span", { className: "flex items-center justify-center", children: [
                  /* @__PURE__ */ jsxDEV(FaSpinner, { className: "mr-2 animate-spin" }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                    lineNumber: 335,
                    columnNumber: 53
                  }, void 0),
                  "Memproses..."
                ] }, void 0, true, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                  lineNumber: 334,
                  columnNumber: 49
                }, void 0) : "Bayar Sekarang"
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
                lineNumber: 325,
                columnNumber: 41
              },
              void 0
            ) }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
              lineNumber: 324,
              columnNumber: 37
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
            lineNumber: 271,
            columnNumber: 33
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
          lineNumber: 268,
          columnNumber: 29
        }, void 0) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
          lineNumber: 238,
          columnNumber: 21
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
        lineNumber: 171,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
      lineNumber: 162,
      columnNumber: 13
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Transaction/Tagihan.tsx",
    lineNumber: 160,
    columnNumber: 9
  }, void 0);
};
export {
  PaymentPage as default
};
