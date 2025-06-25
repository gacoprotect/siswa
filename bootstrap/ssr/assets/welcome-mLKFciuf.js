import { jsx, jsxs } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { c as cn } from "./utils-DODlBKb1.js";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { FaWallet, FaMoneyBillWave, FaQrcode, FaShieldAlt, FaUserGraduate, FaHistory, FaUserShield, FaSchool } from "react-icons/fa";
import { b as bca, c as bri, a as bni, m as mandiri, p as permata } from "./permata-CpPHCBfo.js";
import { MdPayment, MdAccountBalance, MdNotifications } from "react-icons/md";
import "clsx";
import "tailwind-merge";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn("flex flex-col gap-1.5 px-6", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
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
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Welcome() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen w-full bg-gray-50", children: [
    /* @__PURE__ */ jsx(Head, { title: "SchoolPay - Dompet Digital Sekolah" }),
    /* @__PURE__ */ jsx("div", { className: "relative bg-gradient-to-br from-blue-600 to-blue-800 py-24 px-4 sm:px-6 lg:px-8 shadow-lg", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full p-4 shadow-md", children: /* @__PURE__ */ jsx(FaWallet, { className: "h-10 w-10 text-white" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight", children: "SchoolPay Indonesia" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed", children: "Solusi pembayaran digital terintegrasi untuk sekolah di Indonesia" }),
      /* @__PURE__ */ jsxs("div", { className: "pt-6 flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "secondary", size: "lg", className: "shadow-md hover:shadow-lg transition-all", children: /* @__PURE__ */ jsx(Link, { href: "/a70c1330", children: "Coba Sekarang" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "lg", className: "bg-transparent text-white border-white hover:bg-white/10", children: /* @__PURE__ */ jsx(Link, { href: "#payment-methods", children: "Metode Pembayaran" }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 sm:text-4xl", children: "Fitur Unggulan" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-gray-600 max-w-3xl mx-auto", children: "Membantu manajemen keuangan sekolah lebih efisien dan transparan" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs(Card, { className: "hover:shadow-xl transition-all duration-300 border border-gray-200/50", children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 shadow-md", children: /* @__PURE__ */ jsx(FaMoneyBillWave, { className: "h-8 w-8 text-blue-600" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mt-6 text-xl font-semibold text-white", children: "Pembayaran Sekolah" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { className: "text-center text-gray-200", children: "Bayar SPP, uang gedung, seragam, dan kebutuhan sekolah lainnya secara digital tanpa ribet." })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "hover:shadow-xl transition-all duration-300 border border-gray-200/50", children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 shadow-md", children: /* @__PURE__ */ jsx(FaQrcode, { className: "h-8 w-8 text-green-600" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mt-6 text-xl font-semibold text-white", children: "Transaksi Kantin" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { className: "text-center text-gray-200", children: "Belanja di kantin sekolah cukup scan QR Code tanpa perlu bawa uang cash." })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "hover:shadow-xl transition-all duration-300 border border-gray-200/50", children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 shadow-md", children: /* @__PURE__ */ jsx(FaShieldAlt, { className: "h-8 w-8 text-purple-600" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mt-6 text-xl font-semibold text-white", children: "Keamanan Transaksi" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { className: "text-center text-gray-200", children: "Sistem keamanan berlapis dengan verifikasi OTP untuk setiap transaksi." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { id: "payment-methods", className: "bg-white py-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 sm:text-4xl", children: "Metode Pembayaran" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-gray-600 max-w-3xl mx-auto", children: "Top up saldo menggunakan metode pembayaran digital populer di Indonesia" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-12", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-6 text-center", children: "Transfer Bank" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-6", children: [
          { logo: bca, name: "BCA", alt: "Bank Central Asia" },
          { logo: bri, name: "BRI", alt: "Bank Rakyat Indonesia" },
          { logo: bni, name: "BNI", alt: "Bank Negara Indonesia" },
          { logo: mandiri, name: "Mandiri", alt: "Bank Mandiri" },
          { logo: permata, name: "Permata", alt: "Bank Permata" }
        ].map((bank, index) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 h-12 flex items-center", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: bank.logo,
              alt: bank.alt,
              className: "h-full object-contain"
            }
          ) }),
          /* @__PURE__ */ jsx("span", { className: "mt-2 text-sm font-medium text-gray-700", children: bank.name })
        ] }, index)) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 py-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 sm:text-4xl", children: "Cara Menggunakan" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-gray-600 max-w-3xl mx-auto", children: "Akses dompet digital sekolah Anda dalam 4 langkah mudah" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-8 md:grid-cols-4", children: [
        { icon: /* @__PURE__ */ jsx(FaUserGraduate, { className: "h-8 w-8" }), step: "1", title: "Login", description: "Gunakan NISN dan password" },
        { icon: /* @__PURE__ */ jsx(MdPayment, { className: "h-8 w-8" }), step: "2", title: "Top Up", description: "Isi saldo via metode pembayaran" },
        { icon: /* @__PURE__ */ jsx(FaQrcode, { className: "h-8 w-8" }), step: "3", title: "Bayar", description: "Scan QR Code atau input kode pembayaran" },
        { icon: /* @__PURE__ */ jsx(FaHistory, { className: "h-8 w-8" }), step: "4", title: "Riwayat", description: "Cek transaksi di menu history" }
      ].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 text-white font-bold text-lg shadow-md", children: item.step }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 p-3 rounded-full bg-blue-100 text-blue-600", children: item.icon }),
        /* @__PURE__ */ jsx("h3", { className: "mt-4 text-lg font-semibold text-gray-900", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-600", children: item.description })
      ] }, item.step)) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "py-16 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 shadow-lg text-white", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: "bg-white/20 p-6 rounded-full backdrop-blur-sm", children: /* @__PURE__ */ jsx(FaUserShield, { className: "h-12 w-12" }) }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Kontrol Orang Tua" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed", children: "Orang tua dapat memantau pengeluaran anak, menerima notifikasi real-time, dan mengatur limit pengeluaran harian/mingguan melalui aplikasi khusus orang tua." }),
        /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "bg-white text-blue-600 hover:bg-gray-100", children: /* @__PURE__ */ jsx(Link, { href: "/orangtua", children: "Info untuk Orang Tua" }) }) })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 py-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 sm:text-4xl", children: "Manfaat untuk Sekolah" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-gray-600 max-w-3xl mx-auto", children: "Sistem terintegrasi yang memudahkan administrasi keuangan sekolah" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [
        { icon: /* @__PURE__ */ jsx(MdAccountBalance, { className: "h-8 w-8 text-blue-600" }), title: "Laporan Otomatis", description: "Pencatatan keuangan otomatis dengan laporan real-time" },
        { icon: /* @__PURE__ */ jsx(MdNotifications, { className: "h-8 w-8 text-green-600" }), title: "Notifikasi", description: "Pemberitahuan pembayaran tepat waktu" },
        { icon: /* @__PURE__ */ jsx(FaSchool, { className: "h-8 w-8 text-purple-600" }), title: "Manajemen Tagihan", description: "Membuat dan mengelola berbagai jenis tagihan sekolah" }
      ].map((feature, index) => /* @__PURE__ */ jsxs(Card, { className: "hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md", children: feature.icon }),
          /* @__PURE__ */ jsx("h3", { className: "mt-6 text-xl font-semibold text-white", children: feature.title })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { className: "text-center text-gray-200", children: feature.description })
      ] }, index)) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-blue-600 text-white py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold sm:text-3xl", children: "Siap beralih ke pembayaran digital?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-blue-100 max-w-3xl mx-auto", children: "Daftarkan sekolah Anda sekarang dan dapatkan kemudahan bertransaksi" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "bg-white text-blue-600 hover:bg-gray-100 shadow-lg", children: /* @__PURE__ */ jsx(Link, { href: "/demo", children: "Request Demo" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "lg", className: "text-white border-white hover:bg-blue-700", children: /* @__PURE__ */ jsx(Link, { href: "/daftar", children: "Daftar Sekolah" }) })
      ] })
    ] }) })
  ] });
}
export {
  Welcome as default
};
