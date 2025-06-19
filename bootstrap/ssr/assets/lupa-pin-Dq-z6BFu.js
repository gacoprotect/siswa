import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { usePage, useForm, Head } from "@inertiajs/react";
import { FaUnlockAlt, FaArrowLeft } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { MdError } from "react-icons/md";
function ForgotPin({ nouid }) {
  const { errors, flash, remainingAttempts, availableAt } = usePage().props;
  const { data, setData, post, processing } = useForm({
    phone: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/${nouid}/forgot-pin`);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(Head, { title: "Lupa PIN" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx(FaUnlockAlt, { className: "mx-auto h-12 w-12 text-blue-500" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-6 text-2xl font-bold text-gray-900", children: "Lupa PIN?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-600", children: "Masukkan nomor WhatsApp terdaftar untuk mendapatkan link reset" })
      ] }),
      remainingAttempts !== null && remainingAttempts < 3 && /* @__PURE__ */ jsx("div", { className: "rounded-md bg-yellow-50 p-4", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-yellow-700", children: remainingAttempts > 0 ? `Anda memiliki ${remainingAttempts} percobaan tersisa.` : `Terlalu banyak percobaan. Silakan coba lagi dalam ${availableAt} menit.` }) }),
      errors.phone && /* @__PURE__ */ jsx("div", { className: "rounded-md bg-red-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(MdError, { className: "h-5 w-5 text-red-400" }),
        /* @__PURE__ */ jsx("p", { className: "ml-3 text-sm text-red-700", children: errors.phone })
      ] }) }),
      flash.status && /* @__PURE__ */ jsx("div", { className: "rounded-md bg-green-50 p-4", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-green-700", children: flash.status }) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mt-8 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700", children: "Nomor WhatsApp" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "phone",
              name: "phone",
              type: "tel",
              required: true,
              autoFocus: true,
              value: data.phone,
              onChange: (e) => setData("phone", e.target.value),
              className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
              disabled: processing || remainingAttempts === 0
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => window.history.back(),
              className: "flex items-center text-sm font-medium text-gray-600 hover:text-gray-800",
              children: [
                /* @__PURE__ */ jsx(FaArrowLeft, { className: "mr-1.5" }),
                "Kembali"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing || remainingAttempts === 0,
              className: `flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm ${processing || remainingAttempts === 0 ? "cursor-not-allowed bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`,
              children: processing ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(ImSpinner8, { className: "mr-2 animate-spin" }),
                "Mengirim..."
              ] }) : "Kirim Link Reset"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  ForgotPin as default
};
