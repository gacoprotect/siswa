import { jsxDEV, Fragment } from "react/jsx-dev-runtime";
import DOMPurify from "dompurify";
import { u as useLogger } from "./logger-context-CghNbJb_.js";
import { usePage, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import "./use-debug-logger-DbMTik7y.js";
function SnkViewer({ points, ortu, siswa }) {
  const getListStyle = (level) => {
    switch (level) {
      case 0:
        return "list-[upper-alpha]";
      case 1:
        return "list-[lower-alpha]";
      case 2:
        return "list-[lower-roman]";
      case 3:
        return "list-decimal";
      default:
        return "list-disc";
    }
  };
  const replacePlaceholders = (text, ortu2, siswa2) => {
    return text.replace(/{{\s*nama_ortu\s*}}/g, `<strong>[ ${ortu2} ]</strong>`).replace(/{{\s*nama_siswa\s*}}/g, `<strong>[ ${siswa2} ]</strong>`);
  };
  const renderItems = (items, level = 1) => {
    const ListTag = "ol";
    const listStyle = getListStyle(level);
    return /* @__PURE__ */ jsxDEV(ListTag, { className: `text-sm pl-6 ${listStyle} list-outside`, children: items.map((item, index) => /* @__PURE__ */ jsxDEV("li", { className: "mb-2", children: [
      item.label && /* @__PURE__ */ jsxDEV("strong", { className: "font-medium text-blue-800", children: [
        item.label,
        " "
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/components/SnkViewer.tsx",
        lineNumber: 59,
        columnNumber: 29
      }, this),
      item.description && /* @__PURE__ */ jsxDEV(
        "span",
        {
          className: "text-sm",
          dangerouslySetInnerHTML: {
            __html: DOMPurify.sanitize(
              replacePlaceholders(item.description || "", ortu ?? "", siswa ?? "")
            )
          }
        },
        void 0,
        false,
        {
          fileName: "/home/webserver-1/siswa/resources/js/components/SnkViewer.tsx",
          lineNumber: 62,
          columnNumber: 29
        },
        this
      ),
      item.items && renderItems(item.items, level + 1)
    ] }, index, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/SnkViewer.tsx",
      lineNumber: 57,
      columnNumber: 21
    }, this)) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/components/SnkViewer.tsx",
      lineNumber: 55,
      columnNumber: 13
    }, this);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-8", children: points.map((point, index) => /* @__PURE__ */ jsxDEV("div", { className: "border-b pb-6 last:border-b-0", children: [
    /* @__PURE__ */ jsxDEV("h2", { className: "text-md font-bold mb-4 text-blue-500", children: [
      String.fromCharCode(65 + index),
      ". ",
      point.title
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/components/SnkViewer.tsx",
      lineNumber: 81,
      columnNumber: 21
    }, this),
    point.content.intro && /* @__PURE__ */ jsxDEV(
      "p",
      {
        className: "mb-4 text-sm",
        dangerouslySetInnerHTML: {
          __html: DOMPurify.sanitize(point.content.intro)
        }
      },
      void 0,
      false,
      {
        fileName: "/home/webserver-1/siswa/resources/js/components/SnkViewer.tsx",
        lineNumber: 85,
        columnNumber: 25
      },
      this
    ),
    renderItems(point.content.items, 1)
  ] }, index, true, {
    fileName: "/home/webserver-1/siswa/resources/js/components/SnkViewer.tsx",
    lineNumber: 80,
    columnNumber: 17
  }, this)) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/components/SnkViewer.tsx",
    lineNumber: 78,
    columnNumber: 9
  }, this);
}
function Show({ isChild = false, childData }) {
  const { log } = useLogger();
  const { agreement } = usePage().props;
  const [data] = useState(() => ({
    ...agreement,
    ...isChild ? { ...childData } : {}
  }));
  useEffect(() => {
    log("AGREEMENT DATA :", data);
  }, [log, data]);
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(Head, { title: `S&K` }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Snk/Show.tsx",
      lineNumber: 59,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 max-w-4xl mx-auto bg-white", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col text-blue-500 items-center", children: [
        /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-bold mb-1", children: data.snk.title }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Snk/Show.tsx",
          lineNumber: 62,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600 text-center text-sm italic mb-4", children: data.snk.summary }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Snk/Show.tsx",
          lineNumber: 63,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Snk/Show.tsx",
        lineNumber: 61,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "italic text-sm ", children: [
          "Versi ",
          data.snk.version
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Snk/Show.tsx",
          lineNumber: 66,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "italic text-sm ", children: [
          "Efektif : ",
          data.snk.effective
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Snk/Show.tsx",
          lineNumber: 67,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Snk/Show.tsx",
        lineNumber: 65,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV(SnkViewer, { points: data.snk.points, ortu: data.ortu, siswa: data.siswa }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Snk/Show.tsx",
        lineNumber: 69,
        columnNumber: 17
      }, this),
      (data.ortu || data.siswa) && /* @__PURE__ */ jsxDEV("div", { className: "mt-10 space-y-2 text-sm", children: [
        data.kota && /* @__PURE__ */ jsxDEV("p", { className: "italic font-bold", children: data.kota }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Snk/Show.tsx",
          lineNumber: 73,
          columnNumber: 39
        }, this),
        data.qr_code_svg && /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "my-4",
            dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(data.qr_code_svg) }
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Snk/Show.tsx",
            lineNumber: 75,
            columnNumber: 29
          },
          this
        ),
        data.sign && /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-400 break-all", children: [
          "Signature: ",
          data.sign
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Snk/Show.tsx",
          lineNumber: 80,
          columnNumber: 39
        }, this)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Snk/Show.tsx",
        lineNumber: 72,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Snk/Show.tsx",
      lineNumber: 60,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Snk/Show.tsx",
    lineNumber: 58,
    columnNumber: 9
  }, this);
}
export {
  Show as default
};
