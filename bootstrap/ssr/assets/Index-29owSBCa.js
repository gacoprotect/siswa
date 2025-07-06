import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { FaUserTie, FaUser, FaIdCard, FaGraduationCap, FaBirthdayCake, FaEnvelope, FaHome, FaPhone, FaRunning, FaBook, FaCalendarAlt, FaInfoCircle, FaUsers, FaPaintBrush, FaFlask, FaMusic, FaChess, FaFileInvoiceDollar, FaCheckCircle, FaExclamationTriangle, FaClock, FaKey, FaExchangeAlt, FaWallet, FaPlusCircle, FaHistory, FaTimes, FaUserGraduate, FaFootballBall } from "react-icons/fa";
import { A as AppLayout } from "./AppLayout-BOCrgB5m.js";
import { usePage, Link } from "@inertiajs/react";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import Topup from "./Topup-CHKrc3UT.js";
import History from "./History-DZmrJRA-.js";
import PinPage from "./Pin-BbS95q2r.js";
import SetupPinPage from "./SetupPin-lKqWeeuw.js";
import "./permata-CpPHCBfo.js";
import "./utils-DODlBKb1.js";
import "clsx";
import "tailwind-merge";
import "react-icons/bs";
import "axios";
import "./Modal-DWGW2vB4.js";
import "lucide-react";
const DataSiswaContent = () => {
  const student = {
    nis: "20230001",
    name: "WAHYU WIJAYA",
    kelas: "XII IPA 2",
    alamat: "Jl. Merdeka No. 123, Jakarta",
    ttl: "Jakarta, 15 Mei 2006",
    email: "ahmad.fauzi@sekolah.sch.id",
    orangTua: {
      ayah: "Budi Santoso (081234567891)",
      ibu: "Siti Aminah (081234567892)"
    },
    foto: "/assets/profile.png",
    ekstrakurikuler: ["Futsal", "Robotika"],
    prestasi: ["Juara 1 Olimpiade Matematika Tingkat Kota 2022"]
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:flex md:justify-between items-center space-y-3 mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-800", children: "Data Siswa Lengkap" }),
      /* @__PURE__ */ jsxs("button", { className: "bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors", children: [
        /* @__PURE__ */ jsx(FaUserTie, { className: "text-lg" }),
        "Export Data"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-6 items-center md:items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: "rounded-lg overflow-hidden w-48 h-64 border-2 border-gray-200 shadow-md", children: /* @__PURE__ */ jsx(
        "img",
        {
          className: "w-full h-full object-cover",
          src: student.foto,
          alt: "Student profile"
        }
      ) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm", children: [
            /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-lg mb-3 flex items-center gap-2 text-blue-600", children: [
              /* @__PURE__ */ jsx(FaUser, {}),
              " Identitas Diri"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(DataRow, { icon: /* @__PURE__ */ jsx(FaIdCard, {}), label: "NIS", value: student.nis }),
              /* @__PURE__ */ jsx(DataRow, { icon: /* @__PURE__ */ jsx(FaUser, {}), label: "Nama", value: student.name }),
              /* @__PURE__ */ jsx(DataRow, { icon: /* @__PURE__ */ jsx(FaGraduationCap, {}), label: "Kelas", value: student.kelas }),
              /* @__PURE__ */ jsx(DataRow, { icon: /* @__PURE__ */ jsx(FaBirthdayCake, {}), label: "TTL", value: student.ttl }),
              /* @__PURE__ */ jsx(DataRow, { icon: /* @__PURE__ */ jsx(FaEnvelope, {}), label: "Email", value: student.email })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm", children: [
            /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-lg mb-3 flex items-center gap-2 text-green-600", children: [
              /* @__PURE__ */ jsx(FaHome, {}),
              " Alamat"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: student.alamat })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm", children: [
            /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-lg mb-3 flex items-center gap-2 text-amber-600", children: [
              /* @__PURE__ */ jsx(FaUserTie, {}),
              " Orang Tua"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(DataRow, { icon: /* @__PURE__ */ jsx(FaUser, {}), label: "Ayah", value: student.orangTua.ayah }),
              /* @__PURE__ */ jsx(DataRow, { icon: /* @__PURE__ */ jsx(FaUser, {}), label: "Ibu", value: student.orangTua.ibu }),
              /* @__PURE__ */ jsx(DataRow, { icon: /* @__PURE__ */ jsx(FaPhone, {}), label: "Kontak Darurat", value: "081234567893" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm", children: [
            /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-lg mb-3 flex items-center gap-2 text-purple-600", children: [
              /* @__PURE__ */ jsx(FaGraduationCap, {}),
              " Aktivitas"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-700", children: "Ekstrakurikuler:" }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-1", children: student.ekstrakurikuler.map((item, index) => /* @__PURE__ */ jsx("span", { className: "bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm", children: item }, index)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-700", children: "Prestasi:" }),
                /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5 mt-1 space-y-1", children: student.prestasi.map((item, index) => /* @__PURE__ */ jsx("li", { className: "text-gray-700", children: item }, index)) })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const DataRow = ({ icon, label, value }) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
  /* @__PURE__ */ jsx("span", { className: "text-gray-500 mt-1", children: icon }),
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-700", children: label }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-900", children: value })
  ] })
] });
const ExtrakulikulerContent = () => {
  const extracurriculars = [
    {
      id: 1,
      name: "Futsal",
      day: "Senin",
      time: "15.00-17.00",
      coach: "Coach Ahmad",
      quota: 20,
      registered: 18,
      icon: /* @__PURE__ */ jsx(FaRunning, { className: "text-red-500" })
    },
    {
      id: 2,
      name: "Pramuka",
      day: "Rabu",
      time: "14.00-16.00",
      coach: "Pak Budi",
      quota: 30,
      registered: 25,
      icon: /* @__PURE__ */ jsx(FaUsers, { className: "text-amber-500" })
    },
    {
      id: 3,
      name: "Seni Lukis",
      day: "Kamis",
      time: "13.00-15.00",
      coach: "Bu Citra",
      quota: 15,
      registered: 12,
      icon: /* @__PURE__ */ jsx(FaPaintBrush, { className: "text-blue-500" })
    },
    {
      id: 4,
      name: "Robotika",
      day: "Selasa",
      time: "15.00-17.00",
      coach: "Pak Dedi",
      quota: 12,
      registered: 10,
      icon: /* @__PURE__ */ jsx(FaFlask, { className: "text-purple-500" })
    },
    {
      id: 5,
      name: "Paduan Suara",
      day: "Jumat",
      time: "14.00-16.00",
      coach: "Bu Eka",
      quota: 25,
      registered: 20,
      icon: /* @__PURE__ */ jsx(FaMusic, { className: "text-green-500" })
    },
    {
      id: 6,
      name: "Catur",
      day: "Senin",
      time: "16.00-18.00",
      coach: "Pak Fajar",
      quota: 10,
      registered: 8,
      icon: /* @__PURE__ */ jsx(FaChess, { className: "text-gray-500" })
    }
  ];
  const studentActivities = [
    { id: 1, name: "Futsal", status: "Aktif" },
    { id: 4, name: "Robotika", status: "Aktif" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mb-6", children: /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-800", children: "Ekstrakurikuler" }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
      /* @__PURE__ */ jsxs("h4", { className: "text-lg font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(FaRunning, { className: "text-indigo-500" }),
        "Ekstrakurikuler Yang Diikuti"
      ] }),
      studentActivities.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: studentActivities.map((activity) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "border rounded-lg p-4 hover:shadow-md transition-shadow",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-lg", children: activity.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
                  "Status:",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-green-600", children: activity.status })
                ] })
              ] }),
              /* @__PURE__ */ jsx("button", { className: "text-red-600 hover:text-red-800 text-sm font-medium", children: "Keluar" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Rabu, 14.00-16.00" }),
              /* @__PURE__ */ jsx("span", { className: "bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs", children: "Lihat Jadwal" })
            ] })
          ]
        },
        activity.id
      )) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-8 text-gray-500", children: [
        /* @__PURE__ */ jsx("p", { children: "Anda belum terdaftar dalam ekstrakurikuler apapun" }),
        /* @__PURE__ */ jsx("button", { className: "mt-4 text-indigo-600 hover:text-indigo-800 font-medium", children: "Daftar Sekarang" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
      /* @__PURE__ */ jsxs("h4", { className: "text-lg font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(FaBook, { className: "text-indigo-500" }),
        "Daftar Ekstrakurikuler Tersedia"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: extracurriculars.map((ext) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "border rounded-lg p-4 hover:shadow-lg transition-shadow",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-gray-100 rounded-full", children: ext.icon }),
              /* @__PURE__ */ jsx("h5", { className: "font-bold text-lg", children: ext.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
              /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 text-gray-600", children: [
                /* @__PURE__ */ jsx(FaCalendarAlt, { className: "text-gray-400" }),
                ext.day,
                ", ",
                ext.time
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
                "Pelatih: ",
                ext.coach
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pt-2", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                    "Kuota: ",
                    ext.registered,
                    "/",
                    ext.quota
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-1.5 mt-1", children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "bg-green-500 h-1.5 rounded-full",
                      style: {
                        width: `${ext.registered / ext.quota * 100}%`
                      }
                    }
                  ) })
                ] }),
                studentActivities.some((a) => a.id === ext.id) ? /* @__PURE__ */ jsx("span", { className: "text-xs bg-green-100 text-green-800 px-2 py-1 rounded", children: "Sudah Terdaftar" }) : /* @__PURE__ */ jsx("button", { className: "text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded", children: "Daftar" })
              ] })
            ] })
          ]
        },
        ext.id
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-blue-50 border-l-4 border-blue-400 p-4 rounded", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx(FaInfoCircle, { className: "text-blue-500 mt-1 flex-shrink-0" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-medium text-blue-800", children: "Informasi Penting" }),
        /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mt-1 space-y-1 text-sm text-blue-700", children: [
          /* @__PURE__ */ jsx("li", { children: "Setiap siswa boleh mengikuti maksimal 2 ekstrakurikuler" }),
          /* @__PURE__ */ jsx("li", { children: "Pendaftaran ditutup ketika kuota terpenuhi" }),
          /* @__PURE__ */ jsx("li", { children: "Kehadiran minimal 80% untuk mendapatkan sertifikat" })
        ] })
      ] })
    ] }) })
  ] });
};
const TagihanContent = () => {
  const invoices = [
    {
      id: "INV-2023-001",
      jenis: "SPP",
      bulan: "Januari 2023",
      jumlah: 75e4,
      jatuhTempo: "2023-01-10",
      status: "lunas",
      tanggalBayar: "2023-01-05"
    },
    {
      id: "INV-2023-002",
      jenis: "SPP",
      bulan: "Februari 2023",
      jumlah: 75e4,
      jatuhTempo: "2023-02-10",
      status: "lunas",
      tanggalBayar: "2023-02-03"
    },
    {
      id: "INV-2023-003",
      jenis: "SPP",
      bulan: "Maret 2023",
      jumlah: 75e4,
      jatuhTempo: "2023-03-10",
      status: "belum lunas"
    },
    {
      id: "INV-2023-004",
      jenis: "Kegiatan",
      deskripsi: "Study Tour",
      jumlah: 12e5,
      jatuhTempo: "2023-03-15",
      status: "belum lunas"
    },
    {
      id: "INV-2023-005",
      jenis: "Uang Gedung",
      deskripsi: "Pembangunan Fasilitas",
      jumlah: 25e5,
      jatuhTempo: "2023-01-31",
      status: "lunas",
      tanggalBayar: "2023-01-28"
    }
  ];
  const totalTagihan = invoices.reduce(
    (sum, invoice) => sum + invoice.jumlah,
    0
  );
  const totalLunas = invoices.filter((invoice) => invoice.status === "lunas").reduce((sum, invoice) => sum + invoice.jumlah, 0);
  const totalBelumLunas = totalTagihan - totalLunas;
  return /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:flex md:justify-between space-y-3 items-center mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-800", children: "Daftar Tagihan" }),
      /* @__PURE__ */ jsxs("button", { className: "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors", children: [
        /* @__PURE__ */ jsx(FaFileInvoiceDollar, { className: "text-lg" }),
        "Buat Tagihan Baru"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsx(
        StatCard,
        {
          title: "Total Tagihan",
          value: `Rp ${totalTagihan.toLocaleString("id-ID")}`,
          icon: /* @__PURE__ */ jsx(FaFileInvoiceDollar, { className: "text-blue-500" }),
          bgColor: "bg-blue-50"
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          title: "Lunas",
          value: `Rp ${totalLunas.toLocaleString("id-ID")}`,
          icon: /* @__PURE__ */ jsx(FaCheckCircle, { className: "text-green-500" }),
          bgColor: "bg-green-50"
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          title: "Belum Lunas",
          value: `Rp ${totalBelumLunas.toLocaleString("id-ID")}`,
          icon: /* @__PURE__ */ jsx(FaExclamationTriangle, { className: "text-amber-500" }),
          bgColor: "bg-amber-50"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "ID Tagihan" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Jenis" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Deskripsi" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Jumlah" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Jatuh Tempo" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Aksi" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: invoices.map((invoice) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: invoice.id }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: invoice.jenis }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: invoice.deskripsi || invoice.bulan || "-" }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [
          "Rp ",
          invoice.jumlah.toLocaleString("id-ID")
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(FaCalendarAlt, { className: "text-gray-400" }),
          new Date(invoice.jatuhTempo).toLocaleDateString("id-ID")
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm", children: /* @__PURE__ */ jsx(StatusBadge, { status: invoice.status }) }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: [
          invoice.status === "belum lunas" ? /* @__PURE__ */ jsx("button", { className: "text-green-600 hover:text-green-900 mr-3", children: "Bayar" }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Sudah dibayar" }),
          /* @__PURE__ */ jsx("button", { className: "text-blue-600 hover:text-blue-900", children: "Detail" })
        ] })
      ] }, invoice.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(FaExclamationTriangle, { className: "h-5 w-5 text-yellow-400" }) }),
      /* @__PURE__ */ jsx("div", { className: "ml-3", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-yellow-700", children: "Tagihan yang belum dibayar setelah jatuh tempo akan dikenakan denda sebesar 2% per bulan." }) })
    ] }) })
  ] });
};
const StatusBadge = ({ status }) => {
  const statusConfig = {
    lunas: {
      color: "bg-green-100 text-green-800",
      icon: /* @__PURE__ */ jsx(FaCheckCircle, { className: "mr-1" })
    },
    "belum lunas": {
      color: "bg-amber-100 text-amber-800",
      icon: /* @__PURE__ */ jsx(FaClock, { className: "mr-1" })
    }
  };
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusConfig[status].color}`,
      children: [
        statusConfig[status].icon,
        status === "lunas" ? "Lunas" : "Belum Lunas"
      ]
    }
  );
};
const StatCard = ({ title, value, icon, bgColor }) => /* @__PURE__ */ jsx("div", { className: `${bgColor} p-4 rounded-lg shadow-sm`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500", children: title }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-2xl font-semibold text-gray-900", children: value })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "p-3 rounded-full bg-white", children: icon })
] }) });
const menuItems = [
  {
    title: "Tagihan",
    icon: /* @__PURE__ */ jsx(FaFileInvoiceDollar, { className: "h-6 w-6 text-green-600" }),
    color: "border-green-700 bg-green-50 hover:bg-green-100",
    content: /* @__PURE__ */ jsx(TagihanContent, {})
  },
  {
    title: "Data Siswa",
    icon: /* @__PURE__ */ jsx(FaUserGraduate, { className: "h-6 w-6 text-amber-600" }),
    color: "border-amber-700 bg-amber-50 hover:bg-amber-100",
    content: /* @__PURE__ */ jsx(DataSiswaContent, {})
  },
  {
    title: "Extrakulikuler",
    // Perhatikan penulisan "Ekstrakurikuler" yang benar
    icon: /* @__PURE__ */ jsx(FaFootballBall, { className: "h-6 w-6 text-rose-600" }),
    color: "border-rose-700 bg-rose-50 hover:bg-rose-100",
    content: /* @__PURE__ */ jsx(ExtrakulikulerContent, {})
  }
];
function MenuDashboard() {
  const { auth, nouid, siswa, hasPin } = usePage().props;
  const [activeItem, setActiveItem] = useState(null);
  const [page, setPage] = useState("index");
  const [openPin, setOpenPin] = useState(false);
  const [hasPined, setHasPined] = useState(hasPin);
  const [openSetupPin, setOpenSetupPin] = useState(false);
  const handleMasukPin = () => {
    setOpenPin(true);
  };
  const handleSetupPin = () => {
    setOpenSetupPin(true);
  };
  const handlePage = (page2) => {
    setPage(page2);
  };
  return page === "index" ? /* @__PURE__ */ jsxs(AppLayout, { title: (siswa == null ? void 0 : siswa.namlen) ?? "Login", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col items-start rounded-t-lg bg-white p-4 px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx(FaUser, { className: "flex-shrink-0 text-xl text-primary" }),
        /* @__PURE__ */ jsx("h2", { className: "truncate text-3xl font-semibold text-primary", children: siswa ? siswa.namlen : "******" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx(FaIdCard, { className: "flex-shrink-0 text-lg text-primary" }),
        /* @__PURE__ */ jsxs("p", { className: "text-primary md:text-lg", children: [
          "NIS: ",
          siswa ? siswa.nis : "*****"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx(FaGraduationCap, { className: "flex-shrink-0 text-lg text-primary" }),
        /* @__PURE__ */ jsxs("p", { className: "text-primary md:text-lg", children: [
          "Kelas: ",
          siswa ? siswa.kel : "******"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid w-full grid-cols-2 items-center gap-4 border-b-2 p-2 px-6", children: [
      auth.user ? /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("siswa.logout", String(nouid)),
          method: "post",
          className: "flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-red-800 px-4 py-3 text-white shadow-sm transition-colors hover:bg-red-700",
          children: [
            /* @__PURE__ */ jsx(FiLogOut, { className: "text-lg" }),
            /* @__PURE__ */ jsx("span", { children: "Keluar" })
          ]
        }
      ) : /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => handleMasukPin(),
          className: "flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50",
          children: [
            /* @__PURE__ */ jsx(FaKey, { className: "text-lg" }),
            /* @__PURE__ */ jsx("span", { children: "Masukan PIN" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => handleSetupPin(),
          className: "flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50",
          children: [
            /* @__PURE__ */ jsx(FaExchangeAlt, { className: "text-lg" }),
            /* @__PURE__ */ jsx("span", { children: hasPined ? "Ubah PIN" : "Buat Pin" })
          ]
        }
      )
    ] }),
    auth.user && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 w-full shadow-[0px_10px_10px_-4px_rgba(0,0,0,0.1)] shadow-black", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-row gap-4 p-4 justify-between items-center sm:px-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-4", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-lg font-semibold text-primary-foreground", children: "Saldo Tabungan" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-primary-foreground", children: [
            /* @__PURE__ */ jsx(FaWallet, { className: "text-xl" }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: "Rp. 500.000" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-end flex-col space-y-4 justify-end", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handlePage("topup"),
              className: "flex items-center gap-2 rounded-md bg-primary-foreground px-4 py-2 text-primary hover:bg-accent",
              children: [
                /* @__PURE__ */ jsx(FaPlusCircle, {}),
                /* @__PURE__ */ jsx("span", { children: "Topup" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handlePage("riwayat"),
              className: "flex items-center gap-2 rounded-md bg-primary-foreground px-4 py-2 text-primary hover:bg-accent",
              children: [
                /* @__PURE__ */ jsx(FaHistory, {}),
                /* @__PURE__ */ jsx("span", { children: "Riwayat" })
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-6 grid grid-cols-3 gap-4 px-4 sm:grid-cols-5", children: menuItems.map((item, index) => /* @__PURE__ */ jsxs(
        "button",
        {
          className: `flex flex-col items-center justify-center rounded-xl border border-t-5 p-2 transition duration-200 ${item.color}`,
          onClick: () => setActiveItem(index),
          children: [
            item.icon,
            /* @__PURE__ */ jsx("span", { className: "mt-2 text-center text-sm font-semibold text-gray-800", children: item.title })
          ]
        },
        index
      )) }),
      activeItem !== null && /* @__PURE__ */ jsxs("div", { className: "relative rounded-xl border border-t-4 border-gray-800 bg-blue-50 p-6 shadow-lg", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setActiveItem(null),
            className: "absolute top-3 right-3 text-gray-500 transition hover:text-red-500",
            "aria-label": "Tutup",
            children: /* @__PURE__ */ jsx(FaTimes, { className: "h-5 w-5" })
          }
        ),
        menuItems[activeItem].content
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      PinPage,
      {
        setOpenSetupPin: () => {
          setOpenSetupPin(true);
          setOpenPin(false);
        },
        hasPin: hasPined,
        open: openPin,
        onClose: () => setOpenPin(false)
      }
    ),
    /* @__PURE__ */ jsx(SetupPinPage, { setHasPined: () => setHasPined(true), hasPin: hasPined, open: openSetupPin, onClose: () => setOpenSetupPin(false) })
  ] }) : page === "topup" ? /* @__PURE__ */ jsx(Topup, { siswa, nouid, onClose: () => setPage("index") }) : page === "riwayat" && /* @__PURE__ */ jsx(
    History,
    {
      transactions: {
        data: [
          {
            id: 0,
            nouid: "",
            order_id: "",
            amount: 0,
            bank: "",
            status: "",
            created_at: ""
          }
        ],
        links: [
          {
            url: "",
            label: "",
            active: true
          }
        ]
      },
      siswa,
      nouid,
      onClose: () => setPage("index")
    }
  );
}
export {
  MenuDashboard as default
};
