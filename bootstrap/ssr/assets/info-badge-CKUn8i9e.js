import { jsxDEV, Fragment } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { I as InputGroup } from "./InputGroup-CoQ5g3dV.js";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon, CheckIcon, AlertCircle, CircleCheck, AlertOctagon, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { c as cn } from "./utils-UO2Utf7z.js";
import * as LabelPrimitive from "@radix-ui/react-label";
import { countries } from "countries-list";
const Section = ({
  title,
  children
}) => /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
  /* @__PURE__ */ jsxDEV("h2", { className: "border-l-4 border-blue-500 bg-blue-100 text-lg font-semibold p-2", children: title }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/form/section.tsx",
    lineNumber: 11,
    columnNumber: 9
  }, void 0),
  children
] }, void 0, true, {
  fileName: "/home/webserver-1/siswa/resources/js/components/form/section.tsx",
  lineNumber: 10,
  columnNumber: 5
}, void 0);
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(SelectPrimitive.Root, { "data-slot": "select", ...props }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
    lineNumber: 10,
    columnNumber: 10
  }, this);
}
function SelectGroup({
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(SelectPrimitive.Group, { "data-slot": "select-group", ...props }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
    lineNumber: 16,
    columnNumber: 10
  }, this);
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(SelectPrimitive.Value, { "data-slot": "select-value", ...props }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
    lineNumber: 22,
    columnNumber: 10
  }, this);
}
function SelectTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&>span]:line-clamp-1",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxDEV(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsxDEV(ChevronDownIcon, { className: "size-4 opacity-50" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
          lineNumber: 41,
          columnNumber: 9
        }, this) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
          lineNumber: 40,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
      lineNumber: 31,
      columnNumber: 5
    },
    this
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxDEV(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      children: [
        /* @__PURE__ */ jsxDEV(SelectScrollUpButton, {}, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
          lineNumber: 66,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
            lineNumber: 67,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(SelectScrollDownButton, {}, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
          lineNumber: 76,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
      lineNumber: 55,
      columnNumber: 7
    },
    this
  ) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
function SelectLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(
    SelectPrimitive.Label,
    {
      "data-slot": "select-label",
      className: cn("px-2 py-1.5 text-sm font-medium", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
      lineNumber: 87,
      columnNumber: 5
    },
    this
  );
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxDEV("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsxDEV(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsxDEV(CheckIcon, { className: "size-4" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
          lineNumber: 111,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
          lineNumber: 110,
          columnNumber: 9
        }, this) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
          lineNumber: 109,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV(SelectPrimitive.ItemText, { children }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
          lineNumber: 114,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
      lineNumber: 101,
      columnNumber: 5
    },
    this
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxDEV(ChevronUpIcon, { className: "size-4" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
        lineNumber: 145,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
      lineNumber: 137,
      columnNumber: 5
    },
    this
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxDEV(ChevronDownIcon, { className: "size-4" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
        lineNumber: 163,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/home/webserver-1/siswa/resources/js/components/ui/select.tsx",
      lineNumber: 155,
      columnNumber: 5
    },
    this
  );
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/home/webserver-1/siswa/resources/js/components/ui/label.tsx",
      lineNumber: 11,
      columnNumber: 5
    },
    this
  );
}
const SelectInput = React.forwardRef(
  ({
    name,
    id,
    label,
    value,
    defaultValue,
    onChange,
    options,
    placeholder = "Select an option",
    disabled = false,
    required = false,
    errors,
    className = "",
    triggerClassName = "",
    contentClassName = "",
    allowEmpty = false
  }, ref) => {
    const hasGroups = options.some(
      (option) => "options" in option && Array.isArray(option.options)
    );
    const safeValue = value === "" ? "__placeholder__" : value;
    const handleValueChange = (val) => {
      onChange == null ? void 0 : onChange(val === "__placeholder__" ? "" : val);
    };
    const renderGroupOptions = (group, groupIndex) => /* @__PURE__ */ jsxDEV(SelectGroup, { children: [
      group.label && /* @__PURE__ */ jsxDEV(SelectLabel, { children: group.label }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/SelectInput.tsx",
        lineNumber: 77,
        columnNumber: 33
      }, void 0),
      group.options.filter((opt) => opt.value !== "").map((option) => /* @__PURE__ */ jsxDEV(SelectItem, { className: "text-sm", value: option.value, disabled: option.disabled, children: option.label }, `${groupIndex}-${option.value}`, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/SelectInput.tsx",
        lineNumber: 81,
        columnNumber: 25
      }, void 0))
    ] }, `group-${groupIndex}`, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/SelectInput.tsx",
      lineNumber: 76,
      columnNumber: 13
    }, void 0);
    const renderFlatOptions = (opts) => /* @__PURE__ */ jsxDEV(SelectGroup, { children: [
      allowEmpty && /* @__PURE__ */ jsxDEV(
        SelectItem,
        {
          value: "__placeholder__",
          disabled: true,
          className: "text-sm hidden",
          children: placeholder
        },
        "__placeholder__",
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/SelectInput.tsx",
          lineNumber: 91,
          columnNumber: 21
        },
        void 0
      ),
      opts.filter((opt) => opt.value !== "").map((option) => /* @__PURE__ */ jsxDEV(SelectItem, { className: "text-sm", value: option.value, disabled: option.disabled, children: option.label }, option.value, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/SelectInput.tsx",
        lineNumber: 103,
        columnNumber: 25
      }, void 0))
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/SelectInput.tsx",
      lineNumber: 89,
      columnNumber: 13
    }, void 0);
    return /* @__PURE__ */ jsxDEV("div", { id: name ?? id, className: cn("text-sm flex flex-col gap-2", className), children: [
      label && /* @__PURE__ */ jsxDEV(Label, { htmlFor: id, children: [
        label,
        required && /* @__PURE__ */ jsxDEV("span", { className: "text-destructive", children: " *" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/SelectInput.tsx",
          lineNumber: 115,
          columnNumber: 38
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/SelectInput.tsx",
        lineNumber: 113,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV(
        Select,
        {
          value: safeValue,
          defaultValue,
          onValueChange: handleValueChange,
          disabled,
          required,
          children: [
            /* @__PURE__ */ jsxDEV(
              SelectTrigger,
              {
                ref,
                id,
                className: cn("w-full", triggerClassName, (errors == null ? void 0 : errors[name]) && "border-destructive"),
                children: /* @__PURE__ */ jsxDEV(SelectValue, { placeholder, children: value === "" ? placeholder : void 0 }, void 0, false, {
                  fileName: "/home/webserver-1/siswa/resources/js/components/SelectInput.tsx",
                  lineNumber: 131,
                  columnNumber: 25
                }, void 0)
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/components/SelectInput.tsx",
                lineNumber: 126,
                columnNumber: 21
              },
              void 0
            ),
            /* @__PURE__ */ jsxDEV(SelectContent, { className: contentClassName, children: hasGroups ? options.map(renderGroupOptions) : renderFlatOptions(options) }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/components/SelectInput.tsx",
              lineNumber: 135,
              columnNumber: 21
            }, void 0)
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/SelectInput.tsx",
          lineNumber: 119,
          columnNumber: 17
        },
        void 0
      ),
      (errors == null ? void 0 : errors[name]) && /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2 text-xs text-red-500 mt-1", children: [
        /* @__PURE__ */ jsxDEV(AlertCircle, { className: "w-4 h-4" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/SelectInput.tsx",
          lineNumber: 144,
          columnNumber: 25
        }, void 0),
        errors == null ? void 0 : errors[name]
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/SelectInput.tsx",
        lineNumber: 143,
        columnNumber: 21
      }, void 0),
      name && /* @__PURE__ */ jsxDEV("input", { type: "hidden", name, value: value ?? "" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/SelectInput.tsx",
        lineNumber: 148,
        columnNumber: 26
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/SelectInput.tsx",
      lineNumber: 111,
      columnNumber: 13
    }, void 0);
  }
);
SelectInput.displayName = "SelectInput";
const AlamatForm = ({ step, data, onChange, errors }) => {
  const [loading, setLoading] = useState({
    prov: false,
    kab: false,
    kec: false,
    desa: false
  });
  const [regions, setRegions] = useState({
    provinsi: [],
    kabupaten: [],
    kecamatan: [],
    kelurahan: []
  });
  const [currentAddressType, setCurrentAddressType] = useState("alamat1");
  const [touchedFields, setTouchedFields] = useState({});
  useEffect(() => {
    fetchRegions("provinsi");
  }, []);
  const fetchRegions = async (level, parentId) => {
    const key = level === "provinsi" ? "prov" : level === "kabupaten" ? "kab" : level === "kecamatan" ? "kec" : "desa";
    setLoading((prev) => ({ ...prev, [key]: true }));
    try {
      const params = parentId ? { kod: parentId } : {};
      const response = await axios.get(route("api.wilayah", params));
      if (response.data.success) {
        const newRegions = Array.isArray(response.data.data) ? response.data.data.map((item) => ({ id: item.id, nama: item.nama })) : [];
        setRegions((prev) => ({
          ...prev,
          [level]: newRegions
        }));
      }
    } catch (error) {
      console.error(`Error fetching ${level}:`, error);
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };
  const handleRegionChange = useCallback(async (addressType, level, value, name) => {
    setCurrentAddressType(addressType);
    setTouchedFields((prev) => ({ ...prev, [`${addressType}.${level}`]: true }));
    let updatedAddress = {
      ...data[addressType],
      [level]: value,
      ...name ? { [`${level}Name`]: name } : {}
    };
    if (level === "prov") {
      updatedAddress = { ...updatedAddress, kab: "", kec: "", desa: "" };
      setRegions((prev) => ({ ...prev, kabupaten: [], kecamatan: [], kelurahan: [] }));
      if (value) await fetchRegions("kabupaten", value);
    } else if (level === "kab") {
      updatedAddress = { ...updatedAddress, kec: "", desa: "" };
      setRegions((prev) => ({ ...prev, kecamatan: [], kelurahan: [] }));
      if (value) await fetchRegions("kecamatan", value);
    } else if (level === "kec") {
      updatedAddress = { ...updatedAddress, desa: "" };
      setRegions((prev) => ({ ...prev, kelurahan: [] }));
      if (value) await fetchRegions("kelurahan", value);
    }
    onChange(addressType, updatedAddress);
  }, [data, onChange]);
  const handleAddressChange = useCallback((addressType, field, value) => {
    setTouchedFields((prev) => ({ ...prev, [`${addressType}.${field}`]: true }));
    onChange(addressType, {
      ...data[addressType],
      [field]: value
    });
  }, [data, onChange]);
  const renderRegionSelect = useCallback((addressType, level, label, options, required = false) => {
    const value = data[addressType][level] || "";
    const isLoading = loading[level];
    const disabled = isLoading || level === "kab" && !data[addressType].prov || level === "kec" && !data[addressType].kab || level === "desa" && !data[addressType].kec;
    const fieldKey = `${addressType}.${level}`;
    touchedFields[fieldKey] || (errors == null ? void 0 : errors[fieldKey]);
    const selectOptions = options.map((option) => ({
      value: option.id,
      label: option.nama,
      disabled: false
    }));
    return /* @__PURE__ */ jsxDEV(
      SelectInput,
      {
        name: fieldKey,
        id: `${addressType}-${level}`,
        allowEmpty: true,
        label,
        value,
        onChange: (val) => {
          const selectedOption = options.find((opt) => opt.id === val);
          handleRegionChange(
            addressType,
            level,
            val,
            selectedOption == null ? void 0 : selectedOption.nama
          );
        },
        options: isLoading ? [] : selectOptions,
        placeholder: isLoading ? "Loading..." : `-- Pilih --`,
        disabled,
        required,
        errors
      },
      void 0,
      false,
      {
        fileName: "/home/webserver-1/siswa/resources/js/components/form/alamat-form.tsx",
        lineNumber: 156,
        columnNumber: 13
      },
      void 0
    );
  }, [data, loading, touchedFields, errors, handleRegionChange]);
  const renderAddressFields = useCallback((prefix, addressType, title) => {
    const required = title == null ? void 0 : title.includes("*");
    const currentRegions = addressType === currentAddressType ? regions : {
      provinsi: regions.provinsi,
      kabupaten: data[addressType].prov ? regions.kabupaten : [],
      kecamatan: data[addressType].kab ? regions.kecamatan : [],
      kelurahan: data[addressType].kec ? regions.kelurahan : []
    };
    return /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 p-4 rounded-lg space-y-4", children: [
      title && /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-sm text-red-700", children: title }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/form/alamat-form.tsx",
        lineNumber: 197,
        columnNumber: 27
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
        renderRegionSelect(
          addressType,
          "prov",
          "Provinsi",
          currentRegions.provinsi,
          required
        ),
        renderRegionSelect(
          addressType,
          "kab",
          "Kabupaten/Kota",
          currentRegions.kabupaten,
          required
        )
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/form/alamat-form.tsx",
        lineNumber: 199,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
        renderRegionSelect(
          addressType,
          "kec",
          "Kecamatan",
          currentRegions.kecamatan,
          required
        ),
        renderRegionSelect(
          addressType,
          "desa",
          "Desa/Kelurahan",
          currentRegions.kelurahan,
          required
        )
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/form/alamat-form.tsx",
        lineNumber: 216,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV(
        InputGroup,
        {
          name: `${addressType}.addr`,
          id: `${prefix}-addr`,
          label: "Alamat Lengkap",
          placeholder: "Jl. Contoh No. 123",
          value: data[addressType].addr,
          onChange: (value) => handleAddressChange(addressType, "addr", value),
          onBlur: () => setTouchedFields((prev) => ({ ...prev, [`${addressType}.addr`]: true })),
          required,
          type: "text",
          error: errors == null ? void 0 : errors[`${addressType}.addr`],
          touched: touchedFields[`${addressType}.addr`]
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/alamat-form.tsx",
          lineNumber: 233,
          columnNumber: 17
        },
        void 0
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxDEV(
          InputGroup,
          {
            name: `${addressType}.rt`,
            id: `${prefix}-rt`,
            label: "RT",
            placeholder: "001",
            value: data[addressType].rt,
            onChange: (value) => handleAddressChange(addressType, "rt", value),
            onBlur: () => setTouchedFields((prev) => ({ ...prev, [`${addressType}.rt`]: true })),
            required,
            type: "number",
            error: errors == null ? void 0 : errors[`${addressType}.rt`],
            touched: touchedFields[`${addressType}.rt`],
            maxLength: 3,
            max: 3
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/alamat-form.tsx",
            lineNumber: 248,
            columnNumber: 21
          },
          void 0
        ),
        /* @__PURE__ */ jsxDEV(
          InputGroup,
          {
            name: `${addressType}.rw`,
            id: `${prefix}-rw`,
            label: "RW",
            placeholder: "002",
            value: data[addressType].rw,
            onChange: (value) => handleAddressChange(addressType, "rw", value),
            onBlur: () => setTouchedFields((prev) => ({ ...prev, [`${addressType}.rw`]: true })),
            required,
            type: "number",
            error: errors == null ? void 0 : errors[`${addressType}.rw`],
            touched: touchedFields[`${addressType}.rw`],
            max: 3
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/alamat-form.tsx",
            lineNumber: 264,
            columnNumber: 21
          },
          void 0
        ),
        /* @__PURE__ */ jsxDEV(
          InputGroup,
          {
            name: `${addressType}.kodpos`,
            id: `${prefix}-kodpos`,
            label: "Kode Pos",
            placeholder: "12345",
            value: data[addressType].kodpos,
            onChange: (value) => handleAddressChange(addressType, "kodpos", value),
            onBlur: () => setTouchedFields((prev) => ({ ...prev, [`${addressType}.kodpos`]: true })),
            required,
            type: "number",
            error: errors == null ? void 0 : errors[`${addressType}.kodpos`],
            touched: touchedFields[`${addressType}.kodpos`],
            max: 3
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/alamat-form.tsx",
            lineNumber: 279,
            columnNumber: 21
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/form/alamat-form.tsx",
        lineNumber: 247,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/form/alamat-form.tsx",
      lineNumber: 196,
      columnNumber: 13
    }, void 0);
  }, [currentAddressType, data, errors, handleAddressChange, regions, renderRegionSelect, touchedFields]);
  return /* @__PURE__ */ jsxDEV(Section, { title: "Alamat", children: /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
    step === "WNI" && /* @__PURE__ */ jsxDEV(
      SelectInput,
      {
        name: "temtin",
        id: "tempat-tinggal",
        allowEmpty: true,
        label: "Dimana Anda Tinggal?",
        value: data.temtin,
        onChange: (value) => {
          setTouchedFields((prev) => ({ ...prev, temtin: true }));
          onChange("temtin", value);
        },
        placeholder: "-- Pilih --",
        options: [
          { value: "0", label: "Sesuai KTP" },
          { value: "1", label: "Alamat Lain" }
        ],
        required: true,
        errors,
        triggerClassName: (errors == null ? void 0 : errors["temtin"]) ? "border-destructive" : ""
      },
      void 0,
      false,
      {
        fileName: "/home/webserver-1/siswa/resources/js/components/form/alamat-form.tsx",
        lineNumber: 302,
        columnNumber: 21
      },
      void 0
    ),
    step === "WNA" ? renderAddressFields("alamat-domisili", "alamat1", "Alamat Domisili *") : data.temtin !== "" && renderAddressFields("alamat-ktp", "alamat1", "*Alamat Sesuai KTP"),
    data.temtin === "1" && renderAddressFields("alamat-tinggal", "alamat2", "*Alamat Tempat Tinggal")
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/components/form/alamat-form.tsx",
    lineNumber: 300,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/form/alamat-form.tsx",
    lineNumber: 299,
    columnNumber: 9
  }, void 0);
};
const KontakForm = ({ data, onChange, errors }) => {
  const [localValues, setLocalValues] = React.useState(data);
  React.useEffect(() => {
    setLocalValues(data);
  }, [data]);
  const handleLocalChange = (field, value) => {
    setLocalValues((prev) => ({ ...prev, [field]: value }));
    onChange(field, value);
  };
  return /* @__PURE__ */ jsxDEV(Section, { title: "Informasi Kontak", children: /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 bg-gray-50 p-6 rounded-lg", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "hub", className: cn(`block text-sm font-medium`, (errors == null ? void 0 : errors.hub) && "text-red-500"), children: "Hubungan dengan Peserta Didik *" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
          lineNumber: 35,
          columnNumber: 25
        }, void 0),
        /* @__PURE__ */ jsxDEV(
          "select",
          {
            id: "hub",
            className: cn(
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2",
              (errors == null ? void 0 : errors.hub) ? "border-red-500" : "border-gray-300 focus:ring-primary"
            ),
            value: localValues.hub,
            onChange: (e) => handleLocalChange("hub", e.target.value),
            onBlur: () => !localValues.hub && onChange("hub", localValues.hub),
            children: [
              /* @__PURE__ */ jsxDEV("option", { value: "", children: "Pilih" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
                lineNumber: 47,
                columnNumber: 29
              }, void 0),
              /* @__PURE__ */ jsxDEV("option", { value: "0", children: "Ayah" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
                lineNumber: 48,
                columnNumber: 29
              }, void 0),
              /* @__PURE__ */ jsxDEV("option", { value: "1", children: "Ibu" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
                lineNumber: 49,
                columnNumber: 29
              }, void 0),
              /* @__PURE__ */ jsxDEV("option", { value: "2", children: "Wali" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
                lineNumber: 50,
                columnNumber: 29
              }, void 0)
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
            lineNumber: 38,
            columnNumber: 25
          },
          void 0
        ),
        (errors == null ? void 0 : errors.hub) && /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2 text-xs text-red-500 mt-1", children: [
          /* @__PURE__ */ jsxDEV(AlertCircle, { className: "w-4 h-4" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
            lineNumber: 54,
            columnNumber: 33
          }, void 0),
          errors.hub
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
          lineNumber: 53,
          columnNumber: 29
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
        lineNumber: 34,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "tel", className: cn(`block text-sm font-medium`, (errors == null ? void 0 : errors.tel) && "text-red-500"), children: "Nomor WhatsApp *" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
          lineNumber: 62,
          columnNumber: 25
        }, void 0),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            id: "tel",
            type: "tel",
            className: cn(
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2",
              (errors == null ? void 0 : errors.tel) ? "border-red-500" : "border-gray-300 focus:ring-primary"
            ),
            value: localValues.tel,
            onChange: (e) => handleLocalChange("tel", e.target.value),
            onBlur: () => onChange("tel", localValues.tel)
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
            lineNumber: 65,
            columnNumber: 25
          },
          void 0
        ),
        (errors == null ? void 0 : errors.tel) && /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2 text-xs text-red-500 mt-1", children: [
          /* @__PURE__ */ jsxDEV(AlertCircle, { className: "w-4 h-4" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
            lineNumber: 77,
            columnNumber: 33
          }, void 0),
          errors.tel
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
          lineNumber: 76,
          columnNumber: 29
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
        lineNumber: 61,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
      lineNumber: 33,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxDEV("label", { htmlFor: "email", className: cn(`block text-sm font-medium`, (errors == null ? void 0 : errors.email) && "text-red-500"), children: "Email *" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
        lineNumber: 86,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          id: "email",
          type: "email",
          className: cn(
            "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2",
            (errors == null ? void 0 : errors.email) ? "border-red-500" : "border-gray-300 focus:ring-primary"
          ),
          value: localValues.email,
          onChange: (e) => handleLocalChange("email", e.target.value),
          onBlur: () => onChange("email", localValues.email)
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
          lineNumber: 89,
          columnNumber: 21
        },
        void 0
      ),
      (errors == null ? void 0 : errors.email) && /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2 text-xs text-red-500 mt-1", children: [
        /* @__PURE__ */ jsxDEV(AlertCircle, { className: "w-4 h-4" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
          lineNumber: 101,
          columnNumber: 29
        }, void 0),
        errors.email
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
        lineNumber: 100,
        columnNumber: 25
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
      lineNumber: 85,
      columnNumber: 17
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
    lineNumber: 31,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/form/kontak-form.tsx",
    lineNumber: 30,
    columnNumber: 9
  }, void 0);
};
const DokForm = React.memo(({
  step,
  processing,
  errors = {},
  previews = {},
  onChange
}) => {
  const [ktpPreview, setKtpPreview] = useState(previews.ktpPreview || null);
  const [pasporPreview, setPasporPreview] = useState(previews.pasporPreview || null);
  const [touched, setTouched] = useState({
    ktpFile: false,
    pasporFile: false
  });
  const [fileErrors, setFileErrors] = useState({
    ktpFile: "",
    pasporFile: ""
  });
  useEffect(() => {
    setKtpPreview(previews.ktpPreview || null);
    setPasporPreview(previews.pasporPreview || null);
  }, [previews.ktpPreview, previews.pasporPreview]);
  useEffect(() => {
    if (processing) {
      setKtpPreview(null);
      setPasporPreview(null);
    }
  }, [processing]);
  useEffect(() => {
    return () => {
      if (ktpPreview) URL.revokeObjectURL(ktpPreview);
      if (pasporPreview) URL.revokeObjectURL(pasporPreview);
    };
  }, [ktpPreview, pasporPreview]);
  const validateFile = (file) => {
    if (!file.type.match("image/(jpeg|png|jpg)")) {
      return "Hanya file gambar (JPEG/PNG/JPG) yang diperbolehkan";
    }
    if (file.size > 2 * 1024 * 1024) {
      return "Ukuran file maksimal 2MB";
    }
    return null;
  };
  const handleImageChange = useCallback((e, type) => {
    var _a;
    const file = ((_a = e.target.files) == null ? void 0 : _a[0]) || null;
    setTouched((prev) => ({ ...prev, [type]: true }));
    setFileErrors((prev) => ({ ...prev, [type]: "" }));
    if (!file) {
      onChange == null ? void 0 : onChange(type, null);
      type === "ktpFile" ? setKtpPreview(null) : setPasporPreview(null);
      return;
    }
    const validationError = validateFile(file);
    if (validationError) {
      setFileErrors((prev) => ({ ...prev, [type]: validationError }));
      e.target.value = "";
      return;
    }
    onChange == null ? void 0 : onChange(type, file);
    const previewUrl = URL.createObjectURL(file);
    type === "ktpFile" ? setKtpPreview(previewUrl) : setPasporPreview(previewUrl);
  }, [onChange]);
  const handleRemoveImage = useCallback((type) => {
    onChange == null ? void 0 : onChange(type, null);
    type === "ktpFile" ? setKtpPreview(null) : setPasporPreview(null);
    setTouched((prev) => ({ ...prev, [type]: true }));
    setFileErrors((prev) => ({ ...prev, [type]: "" }));
  }, [onChange]);
  const renderFileUpload = useCallback((type, label, preview, setPreview) => {
    const fieldName = type === "ktpFile" ? "KTP" : "Paspor/KITAS";
    const errorMessage = fileErrors[type] || errors[type];
    const showError = (touched[type] || fileErrors[type] || errors[type]) && errorMessage;
    return /* @__PURE__ */ jsxDEV("div", { id: type, className: "space-y-2", children: [
      /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-gray-700", children: [
        label,
        " *"
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
        lineNumber: 119,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col space-y-2", children: [
        preview ? /* @__PURE__ */ jsxDEV("div", { className: "relative group", children: [
          /* @__PURE__ */ jsxDEV(
            "img",
            {
              src: preview,
              alt: `Preview ${label}`,
              className: "max-w-full h-auto max-h-64 rounded border border-gray-200"
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
              lineNumber: 125,
              columnNumber: 29
            },
            void 0
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/50 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100", children: /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              className: "bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors",
              onClick: () => handleRemoveImage(type),
              "aria-label": `Hapus ${label}`,
              children: /* @__PURE__ */ jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsxDEV("path", { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z", clipRule: "evenodd" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
                lineNumber: 138,
                columnNumber: 41
              }, void 0) }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
                lineNumber: 137,
                columnNumber: 37
              }, void 0)
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
              lineNumber: 131,
              columnNumber: 33
            },
            void 0
          ) }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
            lineNumber: 130,
            columnNumber: 29
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
          lineNumber: 124,
          columnNumber: 25
        }, void 0) : /* @__PURE__ */ jsxDEV(Fragment, { children: /* @__PURE__ */ jsxDEV("label", { className: `flex flex-col items-center justify-center px-4 py-8 bg-white rounded-md border-2 border-dashed ${showError ? "border-red-300" : "border-gray-300"} cursor-pointer hover:bg-gray-50 transition-colors`, children: [
          /* @__PURE__ */ jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
            lineNumber: 147,
            columnNumber: 37
          }, void 0) }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
            lineNumber: 146,
            columnNumber: 33
          }, void 0),
          /* @__PURE__ */ jsxDEV("span", { className: "mt-2 text-sm font-medium text-gray-700", children: [
            "Upload ",
            fieldName
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
            lineNumber: 149,
            columnNumber: 33
          }, void 0),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-gray-500 mt-1", children: "Format: JPG/PNG, maksimal 2MB" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
            lineNumber: 152,
            columnNumber: 33
          }, void 0),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              id: type,
              name: type,
              type: "file",
              accept: "image/jpeg, image/png, image/jpg",
              className: "hidden",
              onChange: (e) => handleImageChange(e, type),
              disabled: processing,
              required: true
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
              lineNumber: 155,
              columnNumber: 33
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
          lineNumber: 145,
          columnNumber: 29
        }, void 0) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
          lineNumber: 144,
          columnNumber: 25
        }, void 0),
        showError && /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-red-500 mt-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(AlertCircle, { className: "text-red-500 w-5 h-5" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
            lineNumber: 170,
            columnNumber: 29
          }, void 0),
          /* @__PURE__ */ jsxDEV("span", { children: errorMessage }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
            lineNumber: 171,
            columnNumber: 29
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
          lineNumber: 169,
          columnNumber: 25
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
        lineNumber: 122,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
      lineNumber: 118,
      columnNumber: 13
    }, void 0);
  }, [errors, fileErrors, handleImageChange, handleRemoveImage, processing, touched]);
  return /* @__PURE__ */ jsxDEV(Section, { title: "Upload Dokumen", children: /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 bg-gray-50 p-6 rounded-lg", children: step === "WNI" ? renderFileUpload(
    "ktpFile",
    "Foto KTP",
    ktpPreview,
    setKtpPreview
  ) : renderFileUpload(
    "pasporFile",
    "Paspor/KITAS",
    pasporPreview,
    setPasporPreview
  ) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
    lineNumber: 181,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/form/dokumen-form.tsx",
    lineNumber: 180,
    columnNumber: 9
  }, void 0);
});
const PersonalForm = ({
  data,
  step,
  // setStep,
  errors,
  onChange
}) => {
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    const countryArray = Object.entries(countries).map(([code, country]) => ({
      code,
      name: country.name,
      native: country.native
    })).sort((a, b) => a.name.localeCompare(b.name));
    setCountryList(countryArray);
    if (data.warneg) {
      const selectedCountry = countryArray.find((c) => c.code === data.warneg);
      setInputValue((selectedCountry == null ? void 0 : selectedCountry.name) || "");
    }
  }, [data.warneg]);
  const filteredCountries = useCallback(() => {
    return countryList.filter(
      (country) => `${country.name} ${country.native} ${country.code}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [countryList, searchTerm]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleCountrySelect = (country) => {
    onChange == null ? void 0 : onChange("warneg", country.code);
    onChange == null ? void 0 : onChange("warnegName", country.name);
    setInputValue(country.name);
    setIsCountryOpen(false);
    setSearchTerm("");
    if (country.code !== "ID") {
      onChange == null ? void 0 : onChange("temtin", "0");
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchTerm(value);
    setIsCountryOpen(true);
    if (data.warneg) {
      const selectedCountry = countryList.find((c) => c.code === data.warneg);
      if (!selectedCountry || !value.includes(selectedCountry.name)) {
        onChange == null ? void 0 : onChange("warneg", "");
        onChange == null ? void 0 : onChange("warnegName", "");
      }
    }
  };
  const handleKeyDown = (e) => {
    if ((e.key === "Backspace" || e.key === "Delete") && data.warneg) {
      if (!isCountryOpen) {
        setIsCountryOpen(true);
        setSearchTerm("");
        setInputValue("");
        onChange == null ? void 0 : onChange("warneg", "");
        onChange == null ? void 0 : onChange("warnegName", "");
      }
    }
  };
  return /* @__PURE__ */ jsxDEV(Section, { title: "Informasi Pribadi", children: /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 bg-gray-50 p-6 rounded-lg", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 relative", children: [
        /* @__PURE__ */ jsxDEV(
          "label",
          {
            htmlFor: "warneg",
            className: cn(`block text-sm font-medium text-gray-700`, inputValue.trim() && !data.warneg && "text-red-500"),
            children: "Kewarganegaraan *"
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
            lineNumber: 132,
            columnNumber: 25
          },
          void 0
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "relative", ref: dropdownRef, children: [
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              id: "warneg",
              type: "text",
              ref: inputRef,
              className: cn(
                "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary",
                (errors == null ? void 0 : errors.warneg) && "border-red-500",
                inputValue.trim() && !data.warneg && "border-2 border-red-500"
              ),
              value: inputValue || searchTerm,
              onFocus: () => setIsCountryOpen(true),
              onChange: (e) => handleInputChange(e),
              onKeyDown: handleKeyDown,
              placeholder: "Pilih negara",
              required: true
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
              lineNumber: 139,
              columnNumber: 29
            },
            void 0
          ),
          isCountryOpen && /* @__PURE__ */ jsxDEV("div", { className: "absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg", children: filteredCountries().length > 0 ? filteredCountries().map((country) => /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: `px-3 py-2 hover:bg-gray-100 cursor-pointer ${data.warneg === country.code ? "bg-primary text-white" : ""}`,
              onClick: () => handleCountrySelect(country),
              children: country.name
            },
            country.code,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
              lineNumber: 159,
              columnNumber: 45
            },
            void 0
          )) : /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-2 text-gray-500", children: "Tidak ditemukan" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
            lineNumber: 169,
            columnNumber: 41
          }, void 0) }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
            lineNumber: 156,
            columnNumber: 33
          }, void 0),
          (errors == null ? void 0 : errors.warneg) && /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2 text-xs text-red-500 mt-1", children: [
            /* @__PURE__ */ jsxDEV(AlertCircle, { className: "text-red-500 w-4 h-4" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
              lineNumber: 177,
              columnNumber: 37
            }, void 0),
            errors == null ? void 0 : errors.warneg
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
            lineNumber: 176,
            columnNumber: 33
          }, void 0),
          inputValue.trim() && !data.warneg && /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2 text-xs text-red-500 mt-1", children: [
            /* @__PURE__ */ jsxDEV(AlertCircle, { className: "text-red-500 w-4 h-4" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
              lineNumber: 183,
              columnNumber: 37
            }, void 0),
            "Anda belum memilih Negara"
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
            lineNumber: 182,
            columnNumber: 33
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
          lineNumber: 138,
          columnNumber: 25
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
        lineNumber: 131,
        columnNumber: 21
      }, void 0),
      inputValue.trim() && data.warneg && /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxDEV(
          "label",
          {
            htmlFor: "nama",
            className: cn(`block text-sm font-medium text-gray-700`, (errors == null ? void 0 : errors.nama) && "text-red-500"),
            children: [
              step === "WNI" ? "Nama sesuai KTP" : "Nama Lengkap",
              " *"
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
            lineNumber: 193,
            columnNumber: 29
          },
          void 0
        ),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            id: "nama",
            type: "text",
            className: cn(
              "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary",
              (errors == null ? void 0 : errors.nama) && "border-red-500"
            ),
            value: data.nama,
            onChange: (e) => {
              onChange == null ? void 0 : onChange("nama", e.target.value);
              onChange == null ? void 0 : onChange("nama", e.target.value);
            },
            required: true
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
            lineNumber: 199,
            columnNumber: 29
          },
          void 0
        ),
        (errors == null ? void 0 : errors.nama) && /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2 text-xs text-red-500 mt-1", children: [
          /* @__PURE__ */ jsxDEV(AlertCircle, { className: "text-red-500 w-4 h-4" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
            lineNumber: 214,
            columnNumber: 37
          }, void 0),
          errors == null ? void 0 : errors.nama
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
          lineNumber: 213,
          columnNumber: 33
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
        lineNumber: 192,
        columnNumber: 25
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
      lineNumber: 129,
      columnNumber: 17
    }, void 0),
    step !== null && (step === "WNI" ? /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxDEV(
          "label",
          {
            htmlFor: "nik",
            className: cn(`block text-sm font-medium text-gray-700`, (errors == null ? void 0 : errors.nik) && "text-red-500"),
            children: "NIK *"
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
            lineNumber: 227,
            columnNumber: 33
          },
          void 0
        ),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            id: "nik",
            type: "text",
            pattern: "[0-9]*",
            inputMode: "numeric",
            className: cn(
              "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary",
              (errors == null ? void 0 : errors.nik) && "border-red-500"
            ),
            value: data.nik,
            onChange: (e) => {
              if (/^\d*$/.test(e.target.value) && e.target.value.length <= 16) {
                onChange == null ? void 0 : onChange("nik", e.target.value);
              }
              onChange == null ? void 0 : onChange("nik", e.target.value);
            },
            minLength: 16,
            maxLength: 16,
            required: step === "WNI",
            title: "NIK harus 16 digit angka"
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
            lineNumber: 233,
            columnNumber: 33
          },
          void 0
        ),
        (errors == null ? void 0 : errors.nik) && /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2 text-xs text-red-500 mt-1", children: [
          /* @__PURE__ */ jsxDEV(AlertCircle, { className: "text-red-500 w-4 h-4" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
            lineNumber: 256,
            columnNumber: 41
          }, void 0),
          errors == null ? void 0 : errors.nik
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
          lineNumber: 255,
          columnNumber: 37
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
        lineNumber: 226,
        columnNumber: 29
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxDEV(
          "label",
          {
            htmlFor: "kk",
            className: cn(`block text-sm font-medium text-gray-700`, (errors == null ? void 0 : errors.kk) && "text-red-500"),
            children: "Nomor KK"
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
            lineNumber: 263,
            columnNumber: 33
          },
          void 0
        ),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            id: "kk",
            type: "text",
            pattern: "[0-9]*",
            inputMode: "numeric",
            className: cn(
              "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary",
              (errors == null ? void 0 : errors.kk) && "border-red-500"
            ),
            value: data.kk,
            onChange: (e) => {
              if (/^\d*$/.test(e.target.value) && e.target.value.length <= 16) {
                onChange == null ? void 0 : onChange("kk", e.target.value);
              }
              onChange == null ? void 0 : onChange("kk", e.target.value);
            },
            required: step === "WNI",
            minLength: 16,
            maxLength: 16,
            title: "Nomor KK harus 16 digit angka"
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
            lineNumber: 269,
            columnNumber: 33
          },
          void 0
        ),
        (errors == null ? void 0 : errors.kk) && /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2 text-xs text-red-500 mt-1", children: [
          /* @__PURE__ */ jsxDEV(AlertCircle, { className: "text-red-500 w-4 h-4" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
            lineNumber: 290,
            columnNumber: 41
          }, void 0),
          errors == null ? void 0 : errors.kk
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
          lineNumber: 289,
          columnNumber: 37
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
        lineNumber: 262,
        columnNumber: 29
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
      lineNumber: 225,
      columnNumber: 25
    }, void 0) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxDEV(
        "label",
        {
          htmlFor: "paspor",
          className: cn(`block text-sm font-medium text-gray-700`, (errors == null ? void 0 : errors.paspor) && "text-red-500"),
          children: "Nomor Paspor *"
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
          lineNumber: 298,
          columnNumber: 29
        },
        void 0
      ),
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          id: "paspor",
          type: "text",
          className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary",
          value: data.paspor,
          onChange: (e) => {
            onChange == null ? void 0 : onChange("paspor", e.target.value);
            onChange == null ? void 0 : onChange("paspor", e.target.value);
          },
          required: step === "WNA"
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
          lineNumber: 304,
          columnNumber: 29
        },
        void 0
      ),
      (errors == null ? void 0 : errors.paspor) && /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2 text-xs text-red-500 mt-1", children: [
        /* @__PURE__ */ jsxDEV(AlertCircle, { className: "text-red-500 w-4 h-4" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
          lineNumber: 317,
          columnNumber: 37
        }, void 0),
        errors == null ? void 0 : errors.paspor
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
        lineNumber: 316,
        columnNumber: 33
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
      lineNumber: 297,
      columnNumber: 25
    }, void 0))
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
    lineNumber: 128,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/form/personal-form.tsx",
    lineNumber: 127,
    columnNumber: 9
  }, void 0);
};
const variantStyles = {
  info: {
    bg: "bg-blue-50",
    border: "border-l-4 border-blue-500",
    text: "text-blue-700",
    icon: Info
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-l-4 border-amber-500",
    text: "text-amber-700",
    icon: AlertTriangle
  },
  danger: {
    bg: "bg-red-50",
    border: "border-l-4 border-red-500",
    text: "text-red-700",
    icon: AlertOctagon
  },
  success: {
    bg: "bg-green-50",
    border: "border-l-4 border-green-500",
    text: "text-green-700",
    icon: CircleCheck
  }
};
const InfoBadge = ({
  title,
  items,
  variant = "info",
  description,
  showIcon = true,
  showItemIcons = true
}) => {
  const { bg, border, text, icon: Icon } = variantStyles[variant];
  return /* @__PURE__ */ jsxDEV("div", { className: `${bg} ${border} ${text} p-4 rounded-lg mb-6`, children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-3", children: [
    showIcon && /* @__PURE__ */ jsxDEV(Icon, { className: "flex-shrink-0 mt-1", size: 20 }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/components/info-badge.tsx",
      lineNumber: 60,
      columnNumber: 30
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-left flex-1", children: [
      /* @__PURE__ */ jsxDEV("h1", { className: "font-semibold mb-2", children: title }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/info-badge.tsx",
        lineNumber: 62,
        columnNumber: 21
      }, void 0),
      description && /* @__PURE__ */ jsxDEV("p", { className: "mb-3", children: description }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/info-badge.tsx",
        lineNumber: 63,
        columnNumber: 37
      }, void 0),
      items.length > 0 && /* @__PURE__ */ jsxDEV("ul", { className: "space-y-2", children: items.map((item, idx) => /* @__PURE__ */ jsxDEV("li", { className: "flex items-start", children: [
        showItemIcons && /* @__PURE__ */ jsxDEV(
          CheckCircle,
          {
            className: "flex-shrink-0 mt-1 mr-2",
            size: 16
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/components/info-badge.tsx",
            lineNumber: 69,
            columnNumber: 41
          },
          void 0
        ),
        item
      ] }, idx, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/info-badge.tsx",
        lineNumber: 67,
        columnNumber: 33
      }, void 0)) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/components/info-badge.tsx",
        lineNumber: 65,
        columnNumber: 25
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/info-badge.tsx",
      lineNumber: 61,
      columnNumber: 17
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/components/info-badge.tsx",
    lineNumber: 59,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/info-badge.tsx",
    lineNumber: 58,
    columnNumber: 9
  }, void 0);
};
export {
  AlamatForm as A,
  DokForm as D,
  InfoBadge as I,
  KontakForm as K,
  PersonalForm as P
};
