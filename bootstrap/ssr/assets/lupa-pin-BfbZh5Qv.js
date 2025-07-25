import { jsxDEV, Fragment } from "react/jsx-dev-runtime";
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
  return /* @__PURE__ */ jsxDEV("div", { className: "flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxDEV(Head, { title: "Lupa PIN" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
      lineNumber: 34,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxDEV(FaUnlockAlt, { className: "mx-auto h-12 w-12 text-blue-500" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
          lineNumber: 38,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "mt-6 text-2xl font-bold text-gray-900", children: "Lupa PIN?" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
          lineNumber: 39,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "mt-2 text-sm text-gray-600", children: "Masukkan nomor WhatsApp terdaftar untuk mendapatkan link reset" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
          lineNumber: 40,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
        lineNumber: 37,
        columnNumber: 17
      }, this),
      remainingAttempts !== null && remainingAttempts < 3 && /* @__PURE__ */ jsxDEV("div", { className: "rounded-md bg-yellow-50 p-4", children: /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-yellow-700", children: remainingAttempts > 0 ? `Anda memiliki ${remainingAttempts} percobaan tersisa.` : `Terlalu banyak percobaan. Silakan coba lagi dalam ${availableAt} menit.` }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
        lineNumber: 45,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
        lineNumber: 44,
        columnNumber: 21
      }, this),
      errors.phone && /* @__PURE__ */ jsxDEV("div", { className: "rounded-md bg-red-50 p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxDEV(MdError, { className: "h-5 w-5 text-red-400" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
          lineNumber: 56,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "ml-3 text-sm text-red-700", children: errors.phone }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
          lineNumber: 57,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
        lineNumber: 55,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
        lineNumber: 54,
        columnNumber: 21
      }, this),
      flash.status && /* @__PURE__ */ jsxDEV("div", { className: "rounded-md bg-green-50 p-4", children: /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-green-700", children: flash.status }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
        lineNumber: 64,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
        lineNumber: 63,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "mt-8 space-y-6", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700", children: "Nomor WhatsApp" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
            lineNumber: 70,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV(
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
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
              lineNumber: 73,
              columnNumber: 25
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
          lineNumber: 69,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => window.history.back(),
              className: "flex items-center text-sm font-medium text-gray-600 hover:text-gray-800",
              children: [
                /* @__PURE__ */ jsxDEV(FaArrowLeft, { className: "mr-1.5" }, void 0, false, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
                  lineNumber: 92,
                  columnNumber: 29
                }, this),
                "Kembali"
              ]
            },
            void 0,
            true,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
              lineNumber: 87,
              columnNumber: 25
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "submit",
              disabled: processing || remainingAttempts === 0,
              className: `flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm ${processing || remainingAttempts === 0 ? "cursor-not-allowed bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`,
              children: processing ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV(ImSpinner8, { className: "mr-2 animate-spin" }, void 0, false, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
                  lineNumber: 105,
                  columnNumber: 37
                }, this),
                "Mengirim..."
              ] }, void 0, true, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
                lineNumber: 104,
                columnNumber: 33
              }, this) : "Kirim Link Reset"
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
              lineNumber: 96,
              columnNumber: 25
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
          lineNumber: 86,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
        lineNumber: 68,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
      lineNumber: 36,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/lupa-pin.tsx",
    lineNumber: 33,
    columnNumber: 9
  }, this);
}
export {
  ForgotPin as default
};
