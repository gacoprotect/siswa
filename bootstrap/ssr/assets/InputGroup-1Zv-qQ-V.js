import { jsxs, jsx } from "react/jsx-runtime";
import { c as cn } from "./utils-UO2Utf7z.js";
import { BsStarFill } from "react-icons/bs";
const InputGroup = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  checked = false,
  error,
  placeholder,
  className = "",
  required = false,
  disabled = false,
  prefix = "",
  subfix = "",
  rows = 4,
  tsize,
  min
}) => {
  const commonClass = `
    [type='number']::-webkit-outer-spin-button,
  [type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  [type='number'] {
    -moz-appearance: textfield;
  }
    mt-1 block w-full outline-none
    ${type === "toggle" ? "rounded-full" : "rounded-md"} 
    border ${error ? "border-red-500" : "border-gray-300"} 
    bg-muted/20 px-3 py-2 shadow-sm transition-all duration-200 text-md
    ${disabled ? "cursor-not-allowed bg-gray-100" : ""} 
    ${prefix ? "pl-12" : "pr-10"}`;
  const handleChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };
  const handleRatingChange = (rating) => {
    onChange(rating);
  };
  const renderInput = () => {
    if (type === "textarea") {
      return /* @__PURE__ */ jsx(
        "textarea",
        {
          id: name,
          name,
          rows,
          value,
          onChange: handleChange,
          placeholder: placeholder || `Enter ${String(label).toLowerCase()}`,
          className: commonClass,
          required,
          disabled,
          "aria-invalid": !!error,
          "aria-describedby": error ? `${name}-error` : void 0
        }
      );
    }
    if (type === "rating") {
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => handleRatingChange(star),
            className: "text-2xl focus:outline-none",
            "aria-label": `Rate ${star} star`,
            children: /* @__PURE__ */ jsx(BsStarFill, { className: star <= Number(value) ? "text-yellow-400" : "text-secondary-foreground" })
          },
          star
        )),
        /* @__PURE__ */ jsx("input", { type: "hidden", name, value, onChange: handleChange })
      ] });
    }
    if (type === "checkbox") {
      return /* @__PURE__ */ jsx("input", { type: "checkbox", id: name, name, checked, onChange: (e) => onChange == null ? void 0 : onChange(e.target.checked), className: "" });
    }
    if (type === "toggle") {
      const text = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
        xl: "text-xl"
      };
      const tsizes = {
        xs: "h-4 w-12",
        sm: "h-5 w-14",
        // Small size
        md: "h-5 w-16",
        // Medium size (default)
        lg: "h-6 w-18",
        // Large size
        xl: "h-7 w-20"
        // Extra large size
      };
      const toggleSize = tsizes[tsize ?? "md"];
      const textToggleSize = text[tsize ?? "md"];
      return /* @__PURE__ */ jsxs("label", { className: `relative inline-flex items-center ${toggleSize}`, children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", className: "peer sr-only", checked, onChange: (e) => onChange == null ? void 0 : onChange(e.target.checked), name }),
        /* @__PURE__ */ jsx("div", { className: "h-full w-full rounded-full bg-gray-300 transition-colors duration-300 peer-checked:bg-green-500" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-0.5 left-0.5 aspect-square h-[calc(100%-4px)] rounded-full bg-white shadow transition-transform duration-300 peer-checked:right-0.5 peer-checked:left-auto" }),
        /* @__PURE__ */ jsx("span", { className: `absolute right-2 ${textToggleSize} font-medium text-gray-600 peer-checked:hidden`, children: "No" }),
        /* @__PURE__ */ jsx("span", { className: `absolute left-2 hidden ${textToggleSize} font-medium text-white peer-checked:inline`, children: "Yes" })
      ] });
    }
    return /* @__PURE__ */ jsx(
      "input",
      {
        id: name,
        name,
        type: type === "currency" ? "number" : type,
        value,
        onChange: handleChange,
        placeholder: placeholder ? placeholder : label ? `Ketik ${label == null ? void 0 : label.toLowerCase()}` : `Ketik ${name == null ? void 0 : name.toLowerCase()}`,
        className: cn(
          commonClass,
          "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        ),
        required,
        disabled,
        "aria-invalid": !!error,
        "aria-describedby": error ? `${name}-error` : void 0,
        step: type === "currency" ? "0.01" : void 0,
        min
      }
    );
  };
  return /* @__PURE__ */ jsxs("div", { className, children: [
    label && /* @__PURE__ */ jsxs("label", { htmlFor: name, className: "block text-sm font-medium text-secondary-foreground", children: [
      label,
      required && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: " *" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
      prefix && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center bg-muted px-3", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-muted-foreground", children: prefix }) }),
      renderInput(),
      subfix && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-muted-foreground", children: subfix }) })
    ] }),
    error && /* @__PURE__ */ jsx("p", { id: `${name}-error`, className: "mt-1 text-sm text-red-600", children: error })
  ] });
};
export {
  InputGroup as I
};
