import { jsxs, jsx } from "react/jsx-runtime";
import { c as cn } from "./utils-UO2Utf7z.js";
import { useForm } from "@inertiajs/react";
import { useState, useCallback } from "react";
import { FaEdit, FaUser, FaIdCard, FaGraduationCap, FaPhone, FaBirthdayCake, FaEnvelope, FaHome, FaUserTie } from "react-icons/fa";
import "clsx";
import "tailwind-merge";
const DataSiswaContent = ({ nouid, siswa }) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const [isEditing, setIsEditing] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setdistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [selectedWilayah, setSelectedWilayah] = useState({
    province: 0,
    regency: 0,
    district: 0,
    village: 0
  });
  const { data, setData, put, processing, errors } = useForm({
    nis: siswa.nis ?? "",
    namlen: siswa.namlen,
    kel: siswa.kel ?? "",
    tel: siswa.tel ?? "",
    ttl: siswa.ttl ?? "",
    email: siswa.email ?? "",
    alamat: {
      ids: 0,
      //
      ala: "",
      // almat lengkap jalan
      rt: "",
      // 12
      rw: "",
      // 03,
      cam: "",
      //	16.71.04,
      lur: "",
      //	16.71.04.1002,
      kodpos: "",
      //	30137,
      dusun: "",
      //	bukit,
      buj: "",
      //	,
      lin: "",
      //,
      temtin: "",
      //	,
      trans: "",
      //	,
      aga: "",
      //5,
      ktp: "",
      //1671026,
      goldar: "",
      //	4,
      warneg: "",
      //	2,
      neg: "",
      //,
      bah: "",
      //	Indonesia,
      anakke: "",
      //	1,
      butuh: "",
      //	,
      sakit: ""
      //,
    },
    wali: {
      ayah: ((_a = siswa.wali) == null ? void 0 : _a.ayah) ?? "",
      ibu: ((_b = siswa.wali) == null ? void 0 : _b.ibu) ?? "",
      tel: ((_c = siswa.wali) == null ? void 0 : _c.tel) ?? ""
    },
    excul: siswa.excul ?? [],
    prestasi: siswa.prestasi ?? []
  });
  useCallback(async () => {
    try {
      const url = "/api/provinces.json";
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      const data2 = json || {};
      setProvinces(data2);
    } catch (err) {
      console.error("Gagal ambil tagihan:", err);
    } finally {
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full space-y-6 p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between space-y-3 md:flex-row md:items-center md:space-y-0", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-800", children: "Data Siswa Lengkap" }),
      !isEditing ? /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setIsEditing(true),
          className: "flex w-32 items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600",
          children: [
            /* @__PURE__ */ jsx(FaEdit, { className: "text-lg" }),
            "Edit Data"
          ]
        }
      ) : /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsEditing(false),
            className: "flex items-center gap-2 rounded-lg bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600",
            children: "Batal"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSubmit,
            disabled: processing,
            className: "flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600 disabled:opacity-50",
            children: "Simpan Perubahan"
          }
        )
      ] })
    ] }),
    isEditing ? /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, className: "w-full", children: /* @__PURE__ */ jsxs("div", { className: "grid w-full grid-cols-1 gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white p-4 shadow-sm", children: [
          /* @__PURE__ */ jsxs("h4", { className: "mb-3 flex items-center gap-2 text-lg font-semibold text-blue-600", children: [
            /* @__PURE__ */ jsx(FaUser, {}),
            " Identitas Diri"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx(
              EditDataRow,
              {
                icon: /* @__PURE__ */ jsx(FaIdCard, {}),
                label: "NIS",
                value: data.nis,
                onChange: (e) => setData("nis", e.target.value),
                error: errors.nis,
                disabled: true
              }
            ),
            /* @__PURE__ */ jsx(
              EditDataRow,
              {
                icon: /* @__PURE__ */ jsx(FaUser, {}),
                label: "Nama",
                value: data.namlen,
                onChange: (e) => setData("namlen", e.target.value),
                error: errors.namlen,
                disabled: true
              }
            ),
            /* @__PURE__ */ jsx(
              EditDataRow,
              {
                icon: /* @__PURE__ */ jsx(FaGraduationCap, {}),
                label: "Kelas",
                value: data.kel,
                onChange: (e) => setData("kel", e.target.value),
                error: errors.kel,
                disabled: true
              }
            ),
            /* @__PURE__ */ jsx(
              EditDataRow,
              {
                icon: /* @__PURE__ */ jsx(FaPhone, {}),
                label: "Telepon",
                value: data.tel,
                onChange: (e) => setData("tel", e.target.value),
                error: errors.tel
              }
            ),
            /* @__PURE__ */ jsx(
              EditDataRow,
              {
                icon: /* @__PURE__ */ jsx(FaBirthdayCake, {}),
                label: "TTL",
                value: data.ttl,
                onChange: (e) => setData("ttl", e.target.value),
                error: errors.ttl
              }
            ),
            /* @__PURE__ */ jsx(
              EditDataRow,
              {
                icon: /* @__PURE__ */ jsx(FaEnvelope, {}),
                label: "Email",
                value: data.email,
                onChange: (e) => setData("email", e.target.value),
                error: errors.email
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white p-4 shadow-sm", children: [
          /* @__PURE__ */ jsxs("h4", { className: "mb-3 flex items-center gap-2 text-lg font-semibold text-green-600", children: [
            /* @__PURE__ */ jsx(FaHome, {}),
            " Catatan Kesehatan"
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              className: "w-full rounded border border-gray-300 p-2",
              value: data.ala,
              onChange: (e) => setData("ala", e.target.value),
              rows: 4
            }
          ),
          errors.ala && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.ala })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white p-4 shadow-sm", children: [
          /* @__PURE__ */ jsxs("h4", { className: "mb-3 flex items-center gap-2 text-lg font-semibold text-green-600", children: [
            /* @__PURE__ */ jsx(FaHome, {}),
            " Alamat"
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              className: "w-full rounded border border-gray-300 p-2",
              value: data.ala,
              onChange: (e) => setData("ala", e.target.value),
              rows: 4
            }
          ),
          errors.ala && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.ala })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white p-4 shadow-sm", children: [
        /* @__PURE__ */ jsxs("h4", { className: "mb-3 flex items-center gap-2 text-lg font-semibold text-amber-600", children: [
          /* @__PURE__ */ jsx(FaUserTie, {}),
          " Orang Tua"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(
            EditDataRow,
            {
              icon: /* @__PURE__ */ jsx(FaUser, {}),
              label: "Ayah",
              value: data.wali.ayah,
              onChange: (e) => setData("wali", { ...data.wali, ayah: e.target.value }),
              error: errors.wali && typeof errors.wali === "object" ? errors.wali.ayah ?? void 0 : void 0
            }
          ),
          /* @__PURE__ */ jsx(
            EditDataRow,
            {
              icon: /* @__PURE__ */ jsx(FaUser, {}),
              label: "Ibu",
              value: data.wali.ibu,
              onChange: (e) => setData("wali", { ...data.wali, ibu: e.target.value }),
              error: errors.wali && typeof errors.wali === "object" ? errors.wali.ibu ?? void 0 : void 0
            }
          ),
          /* @__PURE__ */ jsx(
            EditDataRow,
            {
              icon: /* @__PURE__ */ jsx(FaPhone, {}),
              label: "Kontak Darurat",
              value: data.wali.tel,
              onChange: (e) => setData("wali", { ...data.wali, tel: e.target.value }),
              error: errors.wali && typeof errors.wali === "object" ? errors.wali.tel ?? void 0 : void 0
            }
          )
        ] })
      ] }) })
    ] }) }) : /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white p-4 shadow-sm", children: [
          /* @__PURE__ */ jsxs("h4", { className: "mb-3 flex items-center gap-2 text-lg font-semibold text-blue-600", children: [
            /* @__PURE__ */ jsx(FaUser, {}),
            " Identitas Diri"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx(DataRow, { icon: /* @__PURE__ */ jsx(FaIdCard, {}), label: "NIS", value: (siswa == null ? void 0 : siswa.nis) ?? "" }),
            /* @__PURE__ */ jsx(DataRow, { icon: /* @__PURE__ */ jsx(FaUser, {}), label: "Nama", value: siswa.namlen }),
            /* @__PURE__ */ jsx(DataRow, { icon: /* @__PURE__ */ jsx(FaGraduationCap, {}), label: "Kelas", value: (siswa == null ? void 0 : siswa.kel) ?? "" }),
            /* @__PURE__ */ jsx(DataRow, { icon: /* @__PURE__ */ jsx(FaPhone, {}), label: "Telepon", value: (siswa == null ? void 0 : siswa.tel) ?? "" }),
            /* @__PURE__ */ jsx(DataRow, { icon: /* @__PURE__ */ jsx(FaBirthdayCake, {}), label: "TTL", value: (siswa == null ? void 0 : siswa.ttl) ?? "" }),
            /* @__PURE__ */ jsx(DataRow, { icon: /* @__PURE__ */ jsx(FaEnvelope, {}), label: "Email", value: (siswa == null ? void 0 : siswa.email) ?? "" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white p-4 shadow-sm", children: [
          /* @__PURE__ */ jsxs("h4", { className: "mb-3 flex items-center gap-2 text-lg font-semibold text-green-600", children: [
            /* @__PURE__ */ jsx(FaHome, {}),
            " Alamat"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: siswa.ala })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white p-4 shadow-sm", children: [
          /* @__PURE__ */ jsxs("h4", { className: "mb-3 flex items-center gap-2 text-lg font-semibold text-amber-600", children: [
            /* @__PURE__ */ jsx(FaUserTie, {}),
            " Orang Tua"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx(DataRow, { icon: /* @__PURE__ */ jsx(FaUser, {}), label: "Ayah", value: ((_d = siswa == null ? void 0 : siswa.wali) == null ? void 0 : _d.ayah) ?? "" }),
            /* @__PURE__ */ jsx(DataRow, { icon: /* @__PURE__ */ jsx(FaUser, {}), label: "Ibu", value: ((_e = siswa == null ? void 0 : siswa.wali) == null ? void 0 : _e.ibu) ?? "" }),
            /* @__PURE__ */ jsx(DataRow, { icon: /* @__PURE__ */ jsx(FaPhone, {}), label: "Kontak Darurat", value: ((_f = siswa == null ? void 0 : siswa.wali) == null ? void 0 : _f.tel) ?? "" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white p-4 shadow-sm", children: [
          /* @__PURE__ */ jsxs("h4", { className: "mb-3 flex items-center gap-2 text-lg font-semibold text-purple-600", children: [
            /* @__PURE__ */ jsx(FaGraduationCap, {}),
            " Aktivitas"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-700", children: "Prestasi:" }),
            /* @__PURE__ */ jsx("ul", { className: "mt-1 list-disc space-y-1 pl-5", children: (_g = siswa == null ? void 0 : siswa.prestasi) == null ? void 0 : _g.map((item, index) => /* @__PURE__ */ jsx("li", { className: "text-gray-700", children: item }, index)) })
          ] }) })
        ] })
      ] })
    ] }) })
  ] });
};
const DataRow = ({ icon, label, value }) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
  /* @__PURE__ */ jsx("span", { className: "mt-1 text-gray-500", children: icon }),
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-700", children: label }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-900", children: value })
  ] })
] });
const EditDataRow = ({ disabled = false, icon, label, value, onChange, error }) => /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
  /* @__PURE__ */ jsx("label", { className: "mb-1 ml-8 block text-sm font-bold text-gray-700", children: label }),
  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx("div", { className: "text-xl text-gray-500", children: icon }),
    /* @__PURE__ */ jsx(
      "input",
      {
        disabled,
        type: "text",
        value,
        onChange,
        className: cn(`w-full rounded border ${error ? "border-red-500" : "border-gray-300"} p-2 text-sm`, disabled && "bg-gray-300")
      }
    )
  ] }),
  error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500", children: error })
] });
export {
  DataSiswaContent as default
};
