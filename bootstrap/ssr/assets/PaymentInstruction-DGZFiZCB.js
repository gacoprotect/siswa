import { jsx, jsxs } from "react/jsx-runtime";
import { A as AppLayout } from "./AppLayout-BOCrgB5m.js";
import { router } from "@inertiajs/react";
import { useEffect } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
const PaymentInstruction = ({ id, paymentData }) => {
  useEffect(() => {
    if (!id) {
      router.visit(route("siswa.index"));
    }
  }, [id]);
  const getBankName = (bankCode) => {
    const banks = {
      bca: "BCA",
      bni: "BNI",
      bri: "BRI",
      mandiri: "Mandiri",
      permata: "Permata"
    };
    return banks[bankCode] || bankCode;
  };
  const getVaNumber = () => {
    if (paymentData.va_numbers) {
      return paymentData.va_numbers[0].va_number;
    }
    if (paymentData.permata_va_number) {
      return paymentData.permata_va_number;
    }
    return "-";
  };
  const getBankCode = () => {
    if (paymentData.va_numbers) {
      return paymentData.va_numbers[0].bank;
    }
    return "permata";
  };
  return /* @__PURE__ */ jsx(AppLayout, { title: "Instruksi Pembayaran", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl overflow-hidden rounded-lg bg-white shadow-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => router.visit(route("siswa.index")), className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(FaArrowLeft, { className: "text-primary-foreground" }),
        /* @__PURE__ */ jsx("span", { children: "Kembali ke Dashboard" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-white", children: "Instruksi Pembayaran" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "rounded-full bg-green-100 p-3", children: /* @__PURE__ */ jsx(FaCheckCircle, { className: "text-4xl text-green-500" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6 rounded-lg border border-gray-200 p-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-3 text-lg font-semibold", children: "Detail Transaksi" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Order ID" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: paymentData.order_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Jumlah" }),
            /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
              "Rp ",
              parseInt(paymentData.gross_amount).toLocaleString("id-ID")
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Metode Pembayaran" }),
            /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
              "Transfer Bank ",
              getBankName(getBankCode())
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6 rounded-lg border border-gray-200 p-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-3 text-lg font-semibold", children: "Instruksi Pembayaran" }),
        /* @__PURE__ */ jsxs("ol", { className: "list-decimal space-y-3 pl-5", children: [
          /* @__PURE__ */ jsx("li", { children: "Buka aplikasi mobile banking atau internet banking Anda" }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Pilih menu transfer dan masukkan nomor VA: ",
            /* @__PURE__ */ jsx("span", { className: "font-bold", children: getVaNumber() })
          ] }),
          /* @__PURE__ */ jsx("li", { children: "Masukkan jumlah yang harus dibayarkan" }),
          /* @__PURE__ */ jsx("li", { children: "Ikuti instruksi hingga pembayaran selesai" }),
          /* @__PURE__ */ jsx("li", { children: "Pembayaran akan diproses otomatis dalam 1-5 menit" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-yellow-50 p-4 text-yellow-800", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-2 font-semibold", children: "Perhatian!" }),
        /* @__PURE__ */ jsx("p", { children: "Jangan melakukan pembayaran selain melalui nomor VA di atas. Simpan bukti pembayaran Anda sebagai referensi." })
      ] })
    ] })
  ] }) });
};
export {
  PaymentInstruction as default
};
