import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as AppLayout } from "./AppLayout-CqEdbHnq.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import { useState, useCallback, useEffect } from "react";
import { FaSpinner, FaArrowAltCircleLeft } from "react-icons/fa";
import "react-toastify";
const PaymentPage = ({ siswa, tagihanParam, onClose }) => {
  const { flash } = usePage().props;
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    post(route("tagihan.pay", tagihanParam.nouid), {
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
    return /* @__PURE__ */ jsxs(AppLayout, { children: [
      /* @__PURE__ */ jsx(Head, { title: "Memuat Pembayaran" }),
      /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col items-center justify-center space-y-3 bg-white", children: [
        /* @__PURE__ */ jsx(FaSpinner, { className: "animate-spin text-3xl text-blue-600" }),
        /* @__PURE__ */ jsx("span", { className: "text-lg text-gray-700", children: "Memuat data pembayaran..." })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Pembayaran Tagihan" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen overflow-hidden rounded-lg bg-white shadow-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground", children: [
        /* @__PURE__ */ jsxs("button", { onClick: onClose, className: "flex items-center space-x-2 transition-opacity hover:opacity-80", disabled: processing, children: [
          /* @__PURE__ */ jsx(FaArrowAltCircleLeft, { className: "text-primary-foreground" }),
          /* @__PURE__ */ jsx("span", { children: "Kembali" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-white", children: "Pembayaran Tagihan" })
      ] }),
      /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "border-b p-4 sm:p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-3 text-lg font-semibold sm:mb-4 sm:text-xl", children: "Data Siswa" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold sm:text-base", children: [
              "NIS: ",
              siswa.nis,
              " - ",
              siswa.namlen.toUpperCase()
            ] }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Nomor Telepon" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base", children: siswa.tel || "Tidak ada data" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-b p-4 sm:p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex mb-3 text-center items-center justify-between", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Rincian Tagihan" }),
            /* @__PURE__ */ jsxs("span", { className: "bg-gray-100 p-1 text-sm rounded-3xl text-gray-500", children: [
              "ID# ",
              initialData.orderId
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 sm:py-3", children: "Tahun" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 sm:py-3", children: "Bulan" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 sm:py-3", children: "Jumlah" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 sm:py-3", children: "Keterangan" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-200 bg-white", children: initialData.items.map((item, index) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6", children: item.tah }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6", children: item.bulan }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6", children: formatCurrency(item.jumlah) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6", children: item.ket })
            ] }, `${item.id}-${index}`)) })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between sm:mt-6", children: [
            /* @__PURE__ */ jsx("span", { className: "text-base font-semibold sm:text-lg", children: "Total Tagihan:" }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-blue-600 sm:text-2xl", children: formatCurrency(initialData.total_tagihan) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-6", children: exist ? /* @__PURE__ */ jsxs("div", { className: "mx-6 mb-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700 shadow-sm", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Transaksi Belum Selesai" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1", children: "Anda memiliki transaksi yang belum selesai. Silakan selesaikan transaksi sebelumnya untuk melanjutkan." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                if (data.uri) window.location.href = data.uri;
              },
              className: "mt-3 inline-block rounded bg-yellow-600 px-4 py-2 font-medium text-white transition hover:bg-yellow-700",
              children: "Lanjutkan ke Transaksi"
            }
          )
        ] }) : lunas ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-md mb-3 font-semibold sm:mb-4", children: [
            "Metode Pembayaran : ",
            paymentMethod === "wallet" ? "Saldo Tabungan" : "Virtual Account"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-4 p-6", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-15 w-40 items-center justify-center border-4 border-green-700 p-4", children: /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-green-700", children: "LUNAS" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Pembayaran berhasil diproses" })
          ] })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-3 text-lg font-semibold sm:mb-4 sm:text-xl", children: "Metode Pembayaran" }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-1 flex h-5 items-center", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "wallet",
                    name: "payment_method",
                    type: "radio",
                    checked: paymentMethod === "wallet",
                    onChange: () => setPaymentMethod("wallet"),
                    className: "h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500",
                    disabled: processing
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "ml-3 flex-1", children: [
                  /* @__PURE__ */ jsxs("label", { htmlFor: "wallet", className: "block text-sm font-medium text-gray-700 sm:text-base", children: [
                    "Saldo Tabungan : ",
                    formatCurrency(siswa.balance)
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mt-1 text-sm text-gray-500", children: isSaldoInsufficient ? /* @__PURE__ */ jsx("p", { className: "text-red-500", children: "Saldo tidak mencukupi" }) : /* @__PURE__ */ jsx("p", { children: "Cukup dan aman untuk bertransaksi" }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-1 flex h-5 items-center", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "va",
                    name: "payment_method",
                    type: "radio",
                    checked: paymentMethod === "va",
                    onChange: () => setPaymentMethod("va"),
                    className: "h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500",
                    disabled: processing
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "ml-3 flex-1", children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "va", className: "block text-sm font-medium text-gray-700 sm:text-base", children: "Virtual Account" }),
                  /* @__PURE__ */ jsx("div", { className: "mt-1 text-sm text-gray-500", children: "Transfer melalui bank partner" })
                ] })
              ] })
            ] }),
            errors.payment_method && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.payment_method }),
            /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-end sm:mt-8", children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: isSubmitDisabled,
                className: `rounded-md px-6 py-3 text-base font-medium text-white shadow-sm transition-colors ${isSubmitDisabled ? "cursor-not-allowed bg-gray-400" : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"}`,
                children: processing ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center", children: [
                  /* @__PURE__ */ jsx(FaSpinner, { className: "mr-2 animate-spin" }),
                  "Memproses..."
                ] }) : "Bayar Sekarang"
              }
            ) })
          ] })
        ] }) })
      ] })
    ] })
  ] });
};
export {
  PaymentPage as default
};
