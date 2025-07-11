import { jsx, jsxs } from "react/jsx-runtime";
import { c as cn } from "./utils-UO2Utf7z.js";
import { X } from "lucide-react";
import { useEffect } from "react";
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
  header = true
}) => {
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${overlayClassName}`,
      onClick: handleOverlayClick,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn(
            `bg-secondary text-secondary-foreground rounded-lg shadow-lg overflow-auto w-full ${sizeMap[size]}`,
            `${className}`
          ),
          children: [
            header && /* @__PURE__ */ jsx(ModalHeader, { onClose, children: title }),
            /* @__PURE__ */ jsx(ModalBody, { children })
          ]
        }
      )
    }
  );
};
const ModalHeader = ({
  children,
  className = "",
  showCloseButton = true,
  onClose
}) => {
  return /* @__PURE__ */ jsxs("div", { className: `flex justify-between items-center p-4 border-b ${className}`, children: [
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children }),
    showCloseButton && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onClose,
        className: "text-red-500 hover:text-accent-foreground text-2xl",
        "aria-label": "Close",
        children: /* @__PURE__ */ jsx(X, {})
      }
    )
  ] });
};
const ModalBody = ({ children, className = "" }) => /* @__PURE__ */ jsx("div", { className: `p-4 ${className}`, children });
export {
  Modal as M
};
