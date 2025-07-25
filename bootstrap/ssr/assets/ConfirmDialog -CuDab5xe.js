import { jsxDEV } from "react/jsx-dev-runtime";
import { c as cn } from "./utils-UO2Utf7z.js";
import * as Dialog from "@radix-ui/react-dialog";
import { useCallback } from "react";
function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Ya",
  cancelText = "Batal",
  onConfirm,
  children,
  variant = "danger"
}) {
  const handleConfirm = useCallback(() => {
    onConfirm();
    onOpenChange(false);
  }, [onConfirm, onOpenChange]);
  return /* @__PURE__ */ jsxDEV(Dialog.Root, { open, onOpenChange, children: [
    children && children,
    /* @__PURE__ */ jsxDEV(Dialog.Portal, { children: [
      /* @__PURE__ */ jsxDEV(Dialog.Overlay, { className: "fixed inset-0 bg-black/30 backdrop-blur-sm" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/ConfirmDialog .tsx",
        lineNumber: 38,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV(Dialog.Content, { className: "fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg", children: [
        /* @__PURE__ */ jsxDEV(Dialog.Title, { className: "mb-2 text-xl font-bold text-gray-800", children: title }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/ConfirmDialog .tsx",
          lineNumber: 40,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV(Dialog.Description, { className: "mb-4 text-sm text-gray-600", children: description }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/ConfirmDialog .tsx",
          lineNumber: 41,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end space-x-3", children: [
          cancelText !== null && /* @__PURE__ */ jsxDEV("button", { onClick: () => onOpenChange(false), className: "rounded-md bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200", children: cancelText }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/ConfirmDialog .tsx",
            lineNumber: 45,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleConfirm,
              className: cn(
                `rounded-md px-4 py-2 text-sm text-white`,
                variant === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
              ),
              children: confirmText
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/components/ConfirmDialog .tsx",
              lineNumber: 48,
              columnNumber: 25
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/components/ConfirmDialog .tsx",
          lineNumber: 43,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/ConfirmDialog .tsx",
        lineNumber: 39,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/ConfirmDialog .tsx",
      lineNumber: 37,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/components/ConfirmDialog .tsx",
    lineNumber: 35,
    columnNumber: 9
  }, this);
}
export {
  ConfirmDialog as C
};
