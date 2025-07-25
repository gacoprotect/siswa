import { jsxDEV } from "react/jsx-dev-runtime";
import { c as cn } from "./utils-UO2Utf7z.js";
import { AlertCircle, X } from "lucide-react";
import { useState, useRef, useEffect, forwardRef } from "react";
import { I as InputGroup } from "./InputGroup-CoQ5g3dV.js";
const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "w-full mx-6"
};
const Modal = ({
  title = "",
  size = "md",
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  overlayClassName = "",
  className = "",
  header = true,
  footer,
  onConfirm,
  cancelText = "Batal",
  confirmText = "Setuju",
  confirmDisabled = false,
  confirmClassName = "bg-primary text-primary-foreground hover:bg-primary/90",
  error,
  onScrollToBottom,
  agreement
}) => {
  const [agreed, setAgreed] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isOpen) return;
    const handleScroll = () => {
      const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
      setScrolledToBottom(isBottom);
      if (isBottom && onScrollToBottom) {
        onScrollToBottom();
      }
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [isOpen, onScrollToBottom]);
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        setAgreed(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
      setAgreed(false);
    }
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      className: `fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${overlayClassName}`,
      onClick: handleOverlayClick,
      children: /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: cn(
            `bg-secondary text-secondary-foreground rounded-lg shadow-lg flex flex-col max-h-[90vh] ${sizeMap[size]}`,
            className
          ),
          children: [
            header && /* @__PURE__ */ jsxDEV(ModalHeader, { onClose: () => {
              setAgreed(false);
            }, children: title }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
              lineNumber: 114,
              columnNumber: 11
            }, void 0),
            /* @__PURE__ */ jsxDEV(ModalBody, { className: "flex-1 overflow-auto", ref: scrollRef, children }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
              lineNumber: 116,
              columnNumber: 9
            }, void 0),
            agreement && /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2 px-4 text-sm", children: [
              /* @__PURE__ */ jsxDEV(
                InputGroup,
                {
                  name: "agreement",
                  type: "checkbox",
                  checked: agreed,
                  onChange: (val) => setAgreed(Boolean(val)),
                  classNameInput: cn(
                    "h-5 w-5 form-checkbox rounded accent-blue-500",
                    !agreed && "animate-pulse bg-accent-primary",
                    error && "accent-red-500"
                  )
                },
                void 0,
                false,
                {
                  fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
                  lineNumber: 121,
                  columnNumber: 13
                },
                void 0
              ),
              agreement
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
              lineNumber: 120,
              columnNumber: 11
            }, void 0),
            (footer || onConfirm) && /* @__PURE__ */ jsxDEV(ModalFooter, { className: cn(error && "justify-between"), children: [
              error && /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2 text-xs text-red-500 mt-1", children: [
                /* @__PURE__ */ jsxDEV(AlertCircle, { className: "text-red-500 w-4 h-4" }, void 0, false, {
                  fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
                  lineNumber: 138,
                  columnNumber: 17
                }, void 0),
                error
              ] }, void 0, true, {
                fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
                lineNumber: 137,
                columnNumber: 15
              }, void 0),
              footer || /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2 items-center", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      onClose();
                      setAgreed(false);
                    },
                    className: "px-4 py-2 text-white text-sm font-medium rounded-md bg-red-500 hover:bg-red-400",
                    children: cancelText
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
                    lineNumber: 145,
                    columnNumber: 17
                  },
                  void 0
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: onConfirm,
                    disabled: confirmDisabled || !!error || (!scrolledToBottom || !agreed),
                    className: cn(
                      "px-4 py-2 text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed",
                      confirmClassName
                    ),
                    children: confirmText
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
                    lineNumber: 151,
                    columnNumber: 17
                  },
                  void 0
                )
              ] }, void 0, true, {
                fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
                lineNumber: 144,
                columnNumber: 15
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
              lineNumber: 135,
              columnNumber: 11
            }, void 0)
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
          lineNumber: 107,
          columnNumber: 7
        },
        void 0
      )
    },
    void 0,
    false,
    {
      fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
      lineNumber: 103,
      columnNumber: 5
    },
    void 0
  );
};
const ModalHeader = ({
  children,
  className = "",
  showCloseButton = true,
  onClose
}) => {
  return /* @__PURE__ */ jsxDEV("div", { className: `flex justify-between items-center p-4 border-b ${className}`, children: [
    /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-semibold", children }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
      lineNumber: 185,
      columnNumber: 7
    }, void 0),
    showCloseButton && /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: onClose,
        className: "text-red-500 hover:text-accent-foreground text-2xl",
        "aria-label": "Close",
        children: /* @__PURE__ */ jsxDEV(X, {}, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
          lineNumber: 192,
          columnNumber: 11
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
        lineNumber: 187,
        columnNumber: 9
      },
      void 0
    )
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
    lineNumber: 184,
    columnNumber: 5
  }, void 0);
};
const ModalBody = forwardRef(
  ({ children, className = "" }, ref) => /* @__PURE__ */ jsxDEV("div", { ref, className: `p-2 overflow-auto ${className}`, children }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
    lineNumber: 206,
    columnNumber: 5
  }, void 0)
);
const ModalFooter = ({ children, className = "" }) => /* @__PURE__ */ jsxDEV("div", { className: cn(`px-6 py-2 border-t flex justify-end space-x-2 `, className), children }, void 0, false, {
  fileName: "/home/webserver-1/siswa/resources/js/components/ui/Modal.tsx",
  lineNumber: 217,
  columnNumber: 3
}, void 0);
export {
  Modal as M
};
