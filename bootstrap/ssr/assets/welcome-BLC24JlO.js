import { jsxDEV } from "react/jsx-dev-runtime";
import { Head, Link } from "@inertiajs/react";
import { c as cn } from "./utils-UO2Utf7z.js";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { FaWallet, FaMoneyBillWave, FaQrcode, FaShieldAlt, FaUserGraduate, FaHistory, FaUserShield, FaSchool } from "react-icons/fa";
import { MdPayment, MdAccountBalance, MdNotifications } from "react-icons/md";
import "clsx";
import "tailwind-merge";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/home/webserver-1/siswa/resources/js/components/ui/card.tsx",
      lineNumber: 7,
      columnNumber: 5
    },
    this
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-slot": "card-header",
      className: cn("flex flex-col gap-1.5 px-6", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/home/webserver-1/siswa/resources/js/components/ui/card.tsx",
      lineNumber: 20,
      columnNumber: 5
    },
    this
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/home/webserver-1/siswa/resources/js/components/ui/card.tsx",
      lineNumber: 50,
      columnNumber: 5
    },
    this
  );
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxDEV(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/home/webserver-1/siswa/resources/js/components/ui/button.tsx",
      lineNumber: 50,
      columnNumber: 5
    },
    this
  );
}
const bca = "/build/assets/bca-CXlvtI0u.png";
const bri = "/build/assets/bri-BXRv0Xd6.png";
const bni = "/build/assets/bni-DlAVTlcR.png";
const mandiri = "/build/assets/mandiri-BBbXHIh_.png";
const permata = "/build/assets/permata-ChONe3TI.png";
function Welcome() {
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen w-full bg-gray-50", children: [
    /* @__PURE__ */ jsxDEV(Head, { title: "SchoolPay - Dompet Digital Sekolah" }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
      lineNumber: 15,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "relative bg-gradient-to-br from-blue-600 to-blue-800 py-24 px-4 sm:px-6 lg:px-8 shadow-lg", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto relative z-10", children: /* @__PURE__ */ jsxDEV("div", { className: "text-center space-y-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full p-4 shadow-md", children: /* @__PURE__ */ jsxDEV(FaWallet, { className: "h-10 w-10 text-white" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 22,
        columnNumber: 29
      }, this) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 21,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ jsxDEV("h1", { className: "text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight", children: "SchoolPay Indonesia" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 24,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "mt-4 text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed", children: "Solusi pembayaran digital terintegrasi untuk sekolah di Indonesia" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 27,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "pt-6 flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsxDEV(Button, { asChild: true, variant: "secondary", size: "lg", className: "shadow-md hover:shadow-lg transition-all", children: /* @__PURE__ */ jsxDEV(Link, { href: "/a70c621c", children: "Coba Sekarang" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 32,
          columnNumber: 33
        }, this) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 31,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV(Button, { asChild: true, variant: "outline", size: "lg", className: "bg-transparent text-white border-white hover:bg-white/10", children: /* @__PURE__ */ jsxDEV(Link, { href: "#payment-methods", children: "Metode Pembayaran" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 35,
          columnNumber: 33
        }, this) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 34,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 30,
        columnNumber: 25
      }, this)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
      lineNumber: 20,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
      lineNumber: 19,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
      lineNumber: 18,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-3xl font-bold text-gray-900 sm:text-4xl", children: "Fitur Unggulan" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 45,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "mt-4 text-lg text-gray-600 max-w-3xl mx-auto", children: "Membantu manajemen keuangan sekolah lebih efisien dan transparan" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 46,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 44,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxDEV(Card, { className: "hover:shadow-xl transition-all duration-300 border border-gray-200/50", children: [
          /* @__PURE__ */ jsxDEV(CardHeader, { className: "text-center", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 shadow-md", children: /* @__PURE__ */ jsxDEV(FaMoneyBillWave, { className: "h-8 w-8 text-blue-600" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
              lineNumber: 55,
              columnNumber: 33
            }, this) }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
              lineNumber: 54,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "mt-6 text-xl font-semibold text-white", children: "Pembayaran Sekolah" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
              lineNumber: 57,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
            lineNumber: 53,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV(CardContent, { className: "text-center text-gray-200", children: "Bayar SPP, uang gedung, seragam, dan kebutuhan sekolah lainnya secara digital tanpa ribet." }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
            lineNumber: 59,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 52,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV(Card, { className: "hover:shadow-xl transition-all duration-300 border border-gray-200/50", children: [
          /* @__PURE__ */ jsxDEV(CardHeader, { className: "text-center", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 shadow-md", children: /* @__PURE__ */ jsxDEV(FaQrcode, { className: "h-8 w-8 text-green-600" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
              lineNumber: 67,
              columnNumber: 33
            }, this) }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
              lineNumber: 66,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "mt-6 text-xl font-semibold text-white", children: "Transaksi Kantin" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
              lineNumber: 69,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
            lineNumber: 65,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV(CardContent, { className: "text-center text-gray-200", children: "Belanja di kantin sekolah cukup scan QR Code tanpa perlu bawa uang cash." }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
            lineNumber: 71,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 64,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV(Card, { className: "hover:shadow-xl transition-all duration-300 border border-gray-200/50", children: [
          /* @__PURE__ */ jsxDEV(CardHeader, { className: "text-center", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 shadow-md", children: /* @__PURE__ */ jsxDEV(FaShieldAlt, { className: "h-8 w-8 text-purple-600" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
              lineNumber: 79,
              columnNumber: 33
            }, this) }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
              lineNumber: 78,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "mt-6 text-xl font-semibold text-white", children: "Keamanan Transaksi" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
              lineNumber: 81,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
            lineNumber: 77,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV(CardContent, { className: "text-center text-gray-200", children: "Sistem keamanan berlapis dengan verifikasi OTP untuk setiap transaksi." }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
            lineNumber: 83,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 76,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 51,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
      lineNumber: 43,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { id: "payment-methods", className: "bg-white py-16", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-3xl font-bold text-gray-900 sm:text-4xl", children: "Metode Pembayaran" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 94,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "mt-4 text-lg text-gray-600 max-w-3xl mx-auto", children: "Top up saldo menggunakan metode pembayaran digital populer di Indonesia" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 95,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 93,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-12", children: /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-semibold text-gray-800 mb-6 text-center", children: "Transfer Bank" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 103,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-6", children: [
          { logo: bca, name: "BCA", alt: "Bank Central Asia" },
          { logo: bri, name: "BRI", alt: "Bank Rakyat Indonesia" },
          { logo: bni, name: "BNI", alt: "Bank Negara Indonesia" },
          { logo: mandiri, name: "Mandiri", alt: "Bank Mandiri" },
          { logo: permata, name: "Permata", alt: "Bank Permata" }
        ].map((bank, index) => /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-2 h-12 flex items-center", children: /* @__PURE__ */ jsxDEV(
            "img",
            {
              src: bank.logo,
              alt: bank.alt,
              className: "h-full object-contain"
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
              lineNumber: 114,
              columnNumber: 45
            },
            this
          ) }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
            lineNumber: 113,
            columnNumber: 41
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "mt-2 text-sm font-medium text-gray-700", children: bank.name }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
            lineNumber: 120,
            columnNumber: 41
          }, this)
        ] }, index, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 112,
          columnNumber: 37
        }, this)) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 104,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 102,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 100,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
      lineNumber: 92,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
      lineNumber: 91,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 py-16", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-3xl font-bold text-gray-900 sm:text-4xl", children: "Cara Menggunakan" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 134,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "mt-4 text-lg text-gray-600 max-w-3xl mx-auto", children: "Akses dompet digital sekolah Anda dalam 4 langkah mudah" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 135,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 133,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid gap-8 md:grid-cols-4", children: [
        { icon: /* @__PURE__ */ jsxDEV(FaUserGraduate, { className: "h-8 w-8" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 142,
          columnNumber: 37
        }, this), step: "1", title: "Login", description: "Gunakan NISN dan password" },
        { icon: /* @__PURE__ */ jsxDEV(MdPayment, { className: "h-8 w-8" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 143,
          columnNumber: 37
        }, this), step: "2", title: "Top Up", description: "Isi saldo via metode pembayaran" },
        { icon: /* @__PURE__ */ jsxDEV(FaQrcode, { className: "h-8 w-8" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 144,
          columnNumber: 37
        }, this), step: "3", title: "Bayar", description: "Scan QR Code atau input kode pembayaran" },
        { icon: /* @__PURE__ */ jsxDEV(FaHistory, { className: "h-8 w-8" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 145,
          columnNumber: 37
        }, this), step: "4", title: "Riwayat", description: "Cek transaksi di menu history" }
      ].map((item) => /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 text-white font-bold text-lg shadow-md", children: item.step }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 148,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-4 p-3 rounded-full bg-blue-100 text-blue-600", children: item.icon }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 151,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "mt-4 text-lg font-semibold text-gray-900", children: item.title }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 154,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "mt-2 text-gray-600", children: item.description }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 155,
          columnNumber: 33
        }, this)
      ] }, item.step, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 147,
        columnNumber: 29
      }, this)) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 140,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
      lineNumber: 132,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
      lineNumber: 131,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 shadow-lg text-white", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row items-center gap-8", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-white/20 p-6 rounded-full backdrop-blur-sm", children: /* @__PURE__ */ jsxDEV(FaUserShield, { className: "h-12 w-12" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 169,
        columnNumber: 37
      }, this) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 168,
        columnNumber: 33
      }, this) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 167,
        columnNumber: 29
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold", children: "Kontrol Orang Tua" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 173,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "mt-4 leading-relaxed", children: "Orang tua dapat memantau pengeluaran anak, menerima notifikasi real-time, dan mengatur limit pengeluaran harian/mingguan melalui aplikasi khusus orang tua." }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 174,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-6", children: /* @__PURE__ */ jsxDEV(Button, { asChild: true, variant: "outline", className: "bg-white text-blue-600 hover:bg-gray-100", children: /* @__PURE__ */ jsxDEV(Link, { href: "/orangtua", children: "Info untuk Orang Tua" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 180,
          columnNumber: 41
        }, this) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 179,
          columnNumber: 37
        }, this) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 178,
          columnNumber: 33
        }, this)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 172,
        columnNumber: 29
      }, this)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
      lineNumber: 166,
      columnNumber: 25
    }, this) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
      lineNumber: 165,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
      lineNumber: 164,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
      lineNumber: 163,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 py-16", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-3xl font-bold text-gray-900 sm:text-4xl", children: "Manfaat untuk Sekolah" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 193,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "mt-4 text-lg text-gray-600 max-w-3xl mx-auto", children: "Sistem terintegrasi yang memudahkan administrasi keuangan sekolah" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 194,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 192,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid md:grid-cols-3 gap-8", children: [
        { icon: /* @__PURE__ */ jsxDEV(MdAccountBalance, { className: "h-8 w-8 text-blue-600" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 201,
          columnNumber: 37
        }, this), title: "Laporan Otomatis", description: "Pencatatan keuangan otomatis dengan laporan real-time" },
        { icon: /* @__PURE__ */ jsxDEV(MdNotifications, { className: "h-8 w-8 text-green-600" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 202,
          columnNumber: 37
        }, this), title: "Notifikasi", description: "Pemberitahuan pembayaran tepat waktu" },
        { icon: /* @__PURE__ */ jsxDEV(FaSchool, { className: "h-8 w-8 text-purple-600" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 203,
          columnNumber: 37
        }, this), title: "Manajemen Tagihan", description: "Membuat dan mengelola berbagai jenis tagihan sekolah" }
      ].map((feature, index) => /* @__PURE__ */ jsxDEV(Card, { className: "hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsxDEV(CardHeader, { className: "text-center", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md", children: feature.icon }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
            lineNumber: 207,
            columnNumber: 37
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "mt-6 text-xl font-semibold text-white", children: feature.title }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
            lineNumber: 210,
            columnNumber: 37
          }, this)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 206,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ jsxDEV(CardContent, { className: "text-center text-gray-200", children: feature.description }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 212,
          columnNumber: 33
        }, this)
      ] }, index, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 205,
        columnNumber: 29
      }, this)) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 199,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
      lineNumber: 191,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
      lineNumber: 190,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-blue-600 text-white py-12", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold sm:text-3xl", children: "Siap beralih ke pembayaran digital?" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 224,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "mt-4 text-lg text-blue-100 max-w-3xl mx-auto", children: "Daftarkan sekolah Anda sekarang dan dapatkan kemudahan bertransaksi" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 225,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-8 flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsxDEV(Button, { asChild: true, size: "lg", className: "bg-white text-blue-600 hover:bg-gray-100 shadow-lg", children: /* @__PURE__ */ jsxDEV(Link, { href: "/demo", children: "Request Demo" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 230,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 229,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV(Button, { asChild: true, variant: "outline", size: "lg", className: "text-white border-white hover:bg-blue-700", children: /* @__PURE__ */ jsxDEV(Link, { href: "/daftar", children: "Daftar Sekolah" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 233,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
          lineNumber: 232,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
        lineNumber: 228,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
      lineNumber: 223,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
      lineNumber: 222,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/welcome.tsx",
    lineNumber: 14,
    columnNumber: 9
  }, this);
}
export {
  Welcome as default
};
