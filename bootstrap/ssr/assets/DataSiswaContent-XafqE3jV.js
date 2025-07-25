import { jsxDEV } from "react/jsx-dev-runtime";
import { C as ConfirmDialog } from "./ConfirmDialog -CuDab5xe.js";
import { I as InputGroup } from "./InputGroup-CoQ5g3dV.js";
import { c as cn } from "./utils-UO2Utf7z.js";
import { useForm } from "@inertiajs/react";
import { useState, useRef, useCallback, useEffect } from "react";
import { FaEdit, FaUser, FaIdCard, FaGraduationCap, FaBirthdayCake, FaPhone, FaEnvelope, FaNotesMedical, FaTimes, FaPlus, FaHome, FaUserTie, FaUserFriends, FaHandshake, FaMobileAlt, FaHotel } from "react-icons/fa";
import "@radix-ui/react-dialog";
import "react-icons/bs";
import "clsx";
import "tailwind-merge";
const livingOptions = [
  { id: 1, nama: "Orang Tua", icon: /* @__PURE__ */ jsxDEV(FaUserFriends, {}, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
    lineNumber: 44,
    columnNumber: 39
  }, void 0) },
  { id: 2, nama: "Wali", icon: /* @__PURE__ */ jsxDEV(FaUserTie, {}, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
    lineNumber: 45,
    columnNumber: 34
  }, void 0) },
  { id: 3, nama: "Asrama", icon: /* @__PURE__ */ jsxDEV(FaHotel, {}, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
    lineNumber: 46,
    columnNumber: 36
  }, void 0) },
  { id: 4, nama: "Tinggal Mandiri", icon: /* @__PURE__ */ jsxDEV(FaUser, {}, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
    lineNumber: 47,
    columnNumber: 45
  }, void 0) },
  { id: 5, nama: "Lainnya", icon: /* @__PURE__ */ jsxDEV(FaHome, {}, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
    lineNumber: 48,
    columnNumber: 37
  }, void 0) }
];
const DataSiswaContent = ({ nouid, siswa }) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F;
  const [state, setState] = useState({
    isLoading: true,
    isEditing: false,
    isDialogOpen: false
  });
  const [provs, setProvs] = useState([]);
  const [kabs, setKabs] = useState([]);
  const [kecs, setKecs] = useState([]);
  const [kels, setKels] = useState([]);
  const [selectedWilayah, setSelectedWilayah] = useState({
    prov: ((_b = (_a = siswa.alamat) == null ? void 0 : _a.wilayah) == null ? void 0 : _b.prov) || "",
    kab: ((_d = (_c = siswa.alamat) == null ? void 0 : _c.wilayah) == null ? void 0 : _d.kab) || "",
    kec: ((_f = (_e = siswa.alamat) == null ? void 0 : _e.wilayah) == null ? void 0 : _f.kec) || "",
    kel: ((_h = (_g = siswa.alamat) == null ? void 0 : _g.wilayah) == null ? void 0 : _h.kel) || ""
  });
  const { data, setData, post, processing, errors } = useForm({
    nis: siswa.nis ?? "",
    namlen: siswa.namlen,
    kel: siswa.kel ?? "",
    tel: siswa.tel ?? "",
    ttl: siswa.ttl ?? "",
    email: siswa.email ?? "",
    alamat: {
      ala: ((_i = siswa.alamat) == null ? void 0 : _i.ala) ?? "",
      rt: ((_j = siswa.alamat) == null ? void 0 : _j.rt) ?? "",
      rw: ((_k = siswa.alamat) == null ? void 0 : _k.rw) ?? "",
      kec: ((_l = siswa.alamat) == null ? void 0 : _l.kec) ?? "",
      //16.71.04
      lur: ((_m = siswa.alamat) == null ? void 0 : _m.lur) ?? "",
      //16.71.04.1002
      kodpos: ((_n = siswa.alamat) == null ? void 0 : _n.kodpos) ?? "",
      dusun: ((_o = siswa.alamat) == null ? void 0 : _o.dusun) ?? "",
      temtin: ((_p = siswa.alamat) == null ? void 0 : _p.temtin) ?? "",
      sakit: ((_q = siswa.alamat) == null ? void 0 : _q.sakit) ?? [],
      wilayah: {
        prov: ((_s = (_r = siswa.alamat) == null ? void 0 : _r.wilayah) == null ? void 0 : _s.prov) || "",
        kab: ((_u = (_t = siswa.alamat) == null ? void 0 : _t.wilayah) == null ? void 0 : _u.kab) || "",
        kec: ((_w = (_v = siswa.alamat) == null ? void 0 : _v.wilayah) == null ? void 0 : _w.kec) || "",
        kel: ((_y = (_x = siswa.alamat) == null ? void 0 : _x.wilayah) == null ? void 0 : _y.kel) || ""
      }
    }
  });
  const [healthNotes, setHealthNotes] = useState(data.alamat.sakit || [""]);
  const addHealthNote = () => {
    setHealthNotes([...healthNotes, ""]);
    setData("alamat", {
      ...data.alamat,
      sakit: [...healthNotes, ""]
    });
  };
  const removeHealthNote = (index) => {
    const updatedNotes = healthNotes.filter((_, i) => i !== index);
    setHealthNotes(updatedNotes);
    setData("alamat", {
      ...data.alamat,
      sakit: updatedNotes
    });
  };
  const handleHealthNoteChange = (index, value) => {
    const updatedNotes = [...healthNotes];
    updatedNotes[index] = value;
    setHealthNotes(updatedNotes);
    setData("alamat", {
      ...data.alamat,
      sakit: updatedNotes
    });
  };
  const initialLoad = useRef(true);
  const fetchWilayah = useCallback(async (url) => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      return json;
    } catch (err) {
      console.error("Gagal ambil data wilayah:", err);
      return { success: false, data: [] };
    }
  }, []);
  const getProvs = useCallback(async () => {
    const { data: data2 } = await fetchWilayah(route("api.wilayah"));
    setProvs(data2);
  }, [fetchWilayah]);
  const getKabs = useCallback(async (provinceId) => {
    if (!provinceId) {
      setKabs([]);
      return;
    }
    const { data: data2 } = await fetchWilayah(route("api.wilayah", provinceId));
    setKabs(data2);
  }, [fetchWilayah]);
  const getKecs = useCallback(async (regencyId) => {
    if (!regencyId) {
      setKecs([]);
      return;
    }
    const { data: data2 } = await fetchWilayah(route("api.wilayah", regencyId));
    setKecs(data2);
  }, [fetchWilayah]);
  const getKels = useCallback(async (districtId) => {
    if (!districtId) {
      setKels([]);
      return;
    }
    const { data: data2 } = await fetchWilayah(route("api.wilayah", districtId));
    setKels(data2);
  }, [fetchWilayah]);
  useEffect(() => {
    if (state.isEditing && initialLoad.current) {
      initialLoad.current = false;
      getProvs();
      if (selectedWilayah.prov) {
        getKabs(selectedWilayah.prov).then(() => {
          if (selectedWilayah.kab) {
            getKecs(selectedWilayah.kab).then(() => {
              if (selectedWilayah.kec) {
                getKels(selectedWilayah.kec);
              }
            });
          }
        });
      }
    }
  }, [state.isEditing, selectedWilayah.prov, selectedWilayah.kab, selectedWilayah.kec, getProvs, getKabs, getKecs, getKels]);
  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    const newWilayah = {
      prov: provinceId,
      kab: "",
      kec: "",
      kel: ""
    };
    setSelectedWilayah(newWilayah);
    setData("alamat", {
      ...data.alamat,
      wilayah: newWilayah
    });
    setKabs([]);
    setKecs([]);
    setKels([]);
    if (provinceId) {
      await getKabs(provinceId);
    }
  };
  const handleRegencyChange = async (e) => {
    const regencyId = e.target.value;
    const newWilayah = {
      ...selectedWilayah,
      kab: regencyId,
      kec: "",
      kel: ""
    };
    setSelectedWilayah(newWilayah);
    setData("alamat", {
      ...data.alamat,
      wilayah: newWilayah
    });
    setKecs([]);
    setKels([]);
    if (regencyId) {
      await getKecs(regencyId);
    }
  };
  const handleDistrictChange = async (e) => {
    const districtId = e.target.value;
    const newWilayah = {
      ...selectedWilayah,
      kec: districtId,
      kel: ""
    };
    setSelectedWilayah(newWilayah);
    setData("alamat", {
      ...data.alamat,
      wilayah: newWilayah
    });
    setKels([]);
    if (districtId) {
      await getKels(districtId);
    }
  };
  const handleVillageChange = (e) => {
    const villageId = e.target.value;
    const newWilayah = {
      ...selectedWilayah,
      kel: villageId
    };
    setSelectedWilayah(newWilayah);
    setData("alamat", {
      ...data.alamat,
      wilayah: newWilayah
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("siswa.update", { nouid }), {
      onSuccess: () => {
        setState((prev) => ({ ...prev, isEditing: false }));
      },
      onFinish: () => {
        setState((prev) => ({ ...prev, isDialogOpen: false }));
      }
    });
  };
  const WilayahSelect = ({
    options,
    value,
    onChange,
    placeholder,
    disabled
  }) => /* @__PURE__ */ jsxDEV(
    "select",
    {
      value,
      onChange,
      disabled: disabled || options.length === 0,
      className: "w-full rounded border border-gray-300 p-2 text-sm",
      children: [
        /* @__PURE__ */ jsxDEV("option", { value: "", children: placeholder }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
          lineNumber: 310,
          columnNumber: 13
        }, void 0),
        options.map((item) => /* @__PURE__ */ jsxDEV("option", { value: item.id, children: item.nama }, item.id, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
          lineNumber: 312,
          columnNumber: 17
        }, void 0))
      ]
    },
    void 0,
    true,
    {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
      lineNumber: 304,
      columnNumber: 9
    },
    void 0
  );
  return /* @__PURE__ */ jsxDEV("div", { className: "w-full space-y-6 p-4", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col justify-between space-y-3 md:flex-row md:items-center md:space-y-0", children: [
      /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-bold text-gray-800", children: "Data Siswa Lengkap" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
        lineNumber: 321,
        columnNumber: 17
      }, void 0),
      !state.isEditing ? /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setState((prev) => ({ ...prev, isEditing: true })),
          className: "flex w-32 items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600",
          children: [
            /* @__PURE__ */ jsxDEV(FaEdit, { className: "text-lg" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
              lineNumber: 327,
              columnNumber: 25
            }, void 0),
            "Edit Data"
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
          lineNumber: 323,
          columnNumber: 21
        },
        void 0
      ) : /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setState((prev) => ({ ...prev, isEditing: false })),
            className: "flex items-center gap-2 rounded-lg bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600",
            children: "Batal"
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 332,
            columnNumber: 25
          },
          void 0
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleSubmit,
            disabled: processing,
            className: "flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600 disabled:opacity-50",
            children: "Simpan Perubahan"
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 338,
            columnNumber: 25
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
        lineNumber: 331,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
      lineNumber: 320,
      columnNumber: 13
    }, void 0),
    state.isEditing ? /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "w-full", children: /* @__PURE__ */ jsxDEV("div", { className: "grid w-full grid-cols-1 gap-6 md:grid-cols-2", children: /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "rounded-lg bg-white p-4 shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h4", { className: "mb-3 flex items-center gap-2 text-lg font-semibold text-blue-600", children: [
          /* @__PURE__ */ jsxDEV(FaUser, {}, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 358,
            columnNumber: 41
          }, void 0),
          " Identitas Diri"
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
          lineNumber: 357,
          columnNumber: 37
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxDEV(
            EditDataRow,
            {
              icon: /* @__PURE__ */ jsxDEV(FaIdCard, {}, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                lineNumber: 362,
                columnNumber: 51
              }, void 0),
              label: "NIS",
              value: data.nis,
              onChange: (e) => setData("nis", e.target.value),
              error: errors.nis,
              disabled: true
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
              lineNumber: 361,
              columnNumber: 41
            },
            void 0
          ),
          /* @__PURE__ */ jsxDEV(
            EditDataRow,
            {
              icon: /* @__PURE__ */ jsxDEV(FaUser, {}, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                lineNumber: 370,
                columnNumber: 51
              }, void 0),
              label: "Nama",
              value: data.namlen,
              onChange: (e) => setData("namlen", e.target.value),
              error: errors.namlen,
              disabled: true
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
              lineNumber: 369,
              columnNumber: 41
            },
            void 0
          ),
          /* @__PURE__ */ jsxDEV(
            EditDataRow,
            {
              icon: /* @__PURE__ */ jsxDEV(FaGraduationCap, {}, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                lineNumber: 378,
                columnNumber: 51
              }, void 0),
              label: "Kelas",
              value: data.kel,
              onChange: (e) => setData("kel", e.target.value),
              error: errors.kel,
              disabled: true
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
              lineNumber: 377,
              columnNumber: 41
            },
            void 0
          ),
          /* @__PURE__ */ jsxDEV(
            EditDataRow,
            {
              icon: /* @__PURE__ */ jsxDEV(FaBirthdayCake, {}, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                lineNumber: 386,
                columnNumber: 51
              }, void 0),
              label: "TTL",
              value: data.ttl,
              onChange: (e) => setData("ttl", e.target.value),
              error: errors.ttl,
              disabled: true
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
              lineNumber: 385,
              columnNumber: 41
            },
            void 0
          ),
          /* @__PURE__ */ jsxDEV(
            EditDataRow,
            {
              icon: /* @__PURE__ */ jsxDEV(FaPhone, {}, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                lineNumber: 394,
                columnNumber: 51
              }, void 0),
              label: "Telepon",
              value: data.tel,
              onChange: (e) => setData("tel", e.target.value),
              error: errors.tel
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
              lineNumber: 393,
              columnNumber: 41
            },
            void 0
          ),
          /* @__PURE__ */ jsxDEV(
            EditDataRow,
            {
              icon: /* @__PURE__ */ jsxDEV(FaEnvelope, {}, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                lineNumber: 401,
                columnNumber: 51
              }, void 0),
              label: "Email",
              value: data.email,
              onChange: (e) => setData("email", e.target.value),
              error: errors.email
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
              lineNumber: 400,
              columnNumber: 41
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
          lineNumber: 360,
          columnNumber: 37
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
        lineNumber: 356,
        columnNumber: 33
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "rounded-lg bg-white p-4 shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h4", { className: "mb-3 flex items-center gap-2 text-lg font-semibold text-green-600", children: [
          /* @__PURE__ */ jsxDEV(FaNotesMedical, {}, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 412,
            columnNumber: 41
          }, void 0),
          " Catatan Kesehatan"
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
          lineNumber: 411,
          columnNumber: 37
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
          healthNotes.map((note, index) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                value: note,
                onChange: (e) => handleHealthNoteChange(index, e.target.value),
                className: "flex-1 rounded border border-gray-300 p-2 text-sm",
                placeholder: `Catatan kesehatan #${index + 1}`
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                lineNumber: 418,
                columnNumber: 49
              },
              void 0
            ),
            healthNotes.length > 0 && /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => removeHealthNote(index),
                className: "rounded-full p-2 text-red-500 hover:bg-red-50",
                children: /* @__PURE__ */ jsxDEV(FaTimes, { className: "text-sm" }, void 0, false, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                  lineNumber: 431,
                  columnNumber: 57
                }, void 0)
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                lineNumber: 426,
                columnNumber: 53
              },
              void 0
            )
          ] }, index, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 417,
            columnNumber: 45
          }, void 0)),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: addHealthNote,
              className: "flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600 hover:bg-green-100",
              children: [
                /* @__PURE__ */ jsxDEV(FaPlus, {}, void 0, false, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                  lineNumber: 442,
                  columnNumber: 45
                }, void 0),
                " Tambah Catatan"
              ]
            },
            void 0,
            true,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
              lineNumber: 437,
              columnNumber: 41
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
          lineNumber: 415,
          columnNumber: 37
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
        lineNumber: 410,
        columnNumber: 33
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "rounded-lg bg-white p-4 shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h4", { className: "mb-3 flex items-center gap-2 text-lg font-semibold text-green-600", children: [
          /* @__PURE__ */ jsxDEV(FaHome, {}, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 453,
            columnNumber: 41
          }, void 0),
          " Alamat"
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
          lineNumber: 452,
          columnNumber: 37
        }, void 0),
        /* @__PURE__ */ jsxDEV("label", { className: "mb-1 block text-sm font-medium text-gray-700", children: "Alamat lengkap" }, void 0, false, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
          lineNumber: 455,
          columnNumber: 37
        }, void 0),
        /* @__PURE__ */ jsxDEV(
          "textarea",
          {
            className: "w-full rounded border border-gray-300 p-2",
            value: (_z = data.alamat) == null ? void 0 : _z.ala,
            onChange: (e) => setData("alamat", {
              ...data.alamat,
              ala: e.target.value
            }),
            rows: 2,
            placeholder: "Masukan Alamat Lengkap"
          },
          void 0,
          false,
          {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 456,
            columnNumber: 37
          },
          void 0
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxDEV(
            InputGroup,
            {
              name: "rt",
              prefix: "RT",
              value: (_A = data.alamat) == null ? void 0 : _A.rt,
              onChange: (v) => setData("alamat", {
                ...data.alamat,
                rt: v
              }),
              error: errors.alamat
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
              lineNumber: 469,
              columnNumber: 41
            },
            void 0
          ),
          /* @__PURE__ */ jsxDEV(
            InputGroup,
            {
              name: "rw",
              prefix: "RW",
              value: (_B = data.alamat) == null ? void 0 : _B.rw,
              onChange: (v) => setData("alamat", {
                ...data.alamat,
                rw: v
              }),
              error: errors.alamat
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
              lineNumber: 480,
              columnNumber: 41
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
          lineNumber: 468,
          columnNumber: 37
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-4 space-y-3", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "mb-1 block text-sm font-medium text-gray-700", children: "Provinsi" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
              lineNumber: 496,
              columnNumber: 45
            }, void 0),
            /* @__PURE__ */ jsxDEV(
              WilayahSelect,
              {
                options: provs,
                value: selectedWilayah.prov,
                onChange: handleProvinceChange,
                placeholder: "Pilih Provinsi"
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                lineNumber: 497,
                columnNumber: 45
              },
              void 0
            )
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 495,
            columnNumber: 41
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "mb-1 block text-sm font-medium text-gray-700", children: "Kabupaten/Kota" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
              lineNumber: 506,
              columnNumber: 45
            }, void 0),
            /* @__PURE__ */ jsxDEV(
              WilayahSelect,
              {
                options: kabs,
                value: selectedWilayah.kab,
                onChange: handleRegencyChange,
                placeholder: "Pilih Kabupaten/Kota",
                disabled: !selectedWilayah.prov
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                lineNumber: 507,
                columnNumber: 45
              },
              void 0
            )
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 505,
            columnNumber: 41
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "mb-1 block text-sm font-medium text-gray-700", children: "Kecamatan" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
              lineNumber: 517,
              columnNumber: 45
            }, void 0),
            /* @__PURE__ */ jsxDEV(
              WilayahSelect,
              {
                options: kecs,
                value: selectedWilayah.kec,
                onChange: handleDistrictChange,
                placeholder: "Pilih Kecamatan",
                disabled: !selectedWilayah.kab
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                lineNumber: 518,
                columnNumber: 45
              },
              void 0
            )
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 516,
            columnNumber: 41
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "mb-1 block text-sm font-medium text-gray-700", children: "Kelurahan/Desa" }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
              lineNumber: 528,
              columnNumber: 45
            }, void 0),
            /* @__PURE__ */ jsxDEV(
              WilayahSelect,
              {
                options: kels,
                value: selectedWilayah.kel,
                onChange: handleVillageChange,
                placeholder: "Pilih Kelurahan/Desa",
                disabled: !selectedWilayah.kec
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                lineNumber: 529,
                columnNumber: 45
              },
              void 0
            )
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 527,
            columnNumber: 41
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "mb-1 flex items-center gap-2 text-sm font-medium text-gray-700", children: [
              /* @__PURE__ */ jsxDEV(FaHome, { className: "text-gray-500" }, void 0, false, {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                lineNumber: 540,
                columnNumber: 49
              }, void 0),
              "Tinggal Dengan"
            ] }, void 0, true, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
              lineNumber: 539,
              columnNumber: 45
            }, void 0),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: (_C = data.alamat) == null ? void 0 : _C.temtin,
                onChange: (e) => setData("alamat", {
                  ...data.alamat,
                  temtin: e.target.value
                }),
                className: "w-full rounded border border-gray-300 p-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: "", children: "Pilih Status Tinggal" }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                    lineNumber: 551,
                    columnNumber: 49
                  }, void 0),
                  livingOptions.map((option) => /* @__PURE__ */ jsxDEV("option", { value: option.id, children: option.nama }, option.id, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                    lineNumber: 553,
                    columnNumber: 53
                  }, void 0))
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
                lineNumber: 543,
                columnNumber: 45
              },
              void 0
            )
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 538,
            columnNumber: 41
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
          lineNumber: 494,
          columnNumber: 37
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
        lineNumber: 451,
        columnNumber: 33
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
      lineNumber: 355,
      columnNumber: 29
    }, void 0) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
      lineNumber: 353,
      columnNumber: 25
    }, void 0) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
      lineNumber: 352,
      columnNumber: 21
    }, void 0) : /* @__PURE__ */ jsxDEV("div", { className: "w-full", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: /* @__PURE__ */ jsxDEV("div", { className: "rounded-lg bg-white p-4 shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h4", { className: "mb-3 flex items-center gap-2 text-lg font-semibold text-blue-600", children: [
          /* @__PURE__ */ jsxDEV(FaUser, {}, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 574,
            columnNumber: 41
          }, void 0),
          " Identitas Diri"
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
          lineNumber: 573,
          columnNumber: 37
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxDEV(DataRow, { icon: /* @__PURE__ */ jsxDEV(FaIdCard, {}, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 577,
            columnNumber: 56
          }, void 0), label: "NISN", value: (siswa == null ? void 0 : siswa.nisn) ?? "" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 577,
            columnNumber: 41
          }, void 0),
          /* @__PURE__ */ jsxDEV(DataRow, { icon: /* @__PURE__ */ jsxDEV(FaIdCard, {}, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 578,
            columnNumber: 56
          }, void 0), label: "NIS", value: (siswa == null ? void 0 : siswa.nis) ?? "" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 578,
            columnNumber: 41
          }, void 0),
          /* @__PURE__ */ jsxDEV(DataRow, { icon: /* @__PURE__ */ jsxDEV(FaUser, {}, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 579,
            columnNumber: 56
          }, void 0), label: "Nama", value: siswa.namlen }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 579,
            columnNumber: 41
          }, void 0),
          /* @__PURE__ */ jsxDEV(DataRow, { icon: /* @__PURE__ */ jsxDEV(FaBirthdayCake, {}, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 582,
            columnNumber: 56
          }, void 0), label: "TTL", value: (siswa == null ? void 0 : siswa.ttl) ?? "" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 582,
            columnNumber: 41
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
          lineNumber: 576,
          columnNumber: 37
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
        lineNumber: 572,
        columnNumber: 33
      }, void 0) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
        lineNumber: 571,
        columnNumber: 29
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: /* @__PURE__ */ jsxDEV("div", { className: "rounded-lg bg-white p-4 shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h4", { className: "mb-3 flex items-center gap-2 text-lg font-semibold text-amber-600", children: [
          /* @__PURE__ */ jsxDEV(FaUserTie, {}, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 599,
            columnNumber: 41
          }, void 0),
          " Orang Tua / Wali"
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
          lineNumber: 598,
          columnNumber: 37
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxDEV(DataRow, { icon: /* @__PURE__ */ jsxDEV(FaUserFriends, {}, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 602,
            columnNumber: 56
          }, void 0), label: "Nama Wali", value: ((_D = siswa == null ? void 0 : siswa.wali) == null ? void 0 : _D.nama) ?? "" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 602,
            columnNumber: 41
          }, void 0),
          /* @__PURE__ */ jsxDEV(DataRow, { icon: /* @__PURE__ */ jsxDEV(FaHandshake, {}, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 603,
            columnNumber: 56
          }, void 0), label: "Hubungan", value: ((_E = siswa == null ? void 0 : siswa.wali) == null ? void 0 : _E.hub) ?? "" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 603,
            columnNumber: 41
          }, void 0),
          /* @__PURE__ */ jsxDEV(DataRow, { icon: /* @__PURE__ */ jsxDEV(FaMobileAlt, {}, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 604,
            columnNumber: 56
          }, void 0), label: "Kontak", value: ((_F = siswa == null ? void 0 : siswa.wali) == null ? void 0 : _F.tel) ?? "" }, void 0, false, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
            lineNumber: 604,
            columnNumber: 41
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
          lineNumber: 601,
          columnNumber: 37
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
        lineNumber: 597,
        columnNumber: 33
      }, void 0) }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
        lineNumber: 596,
        columnNumber: 29
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
      lineNumber: 569,
      columnNumber: 25
    }, void 0) }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
      lineNumber: 568,
      columnNumber: 21
    }, void 0),
    /* @__PURE__ */ jsxDEV(
      ConfirmDialog,
      {
        open: state.isDialogOpen,
        onOpenChange: (v) => setState((prev) => ({ ...prev, isDialogOpen: v })),
        title: "Edit Data Siswa",
        description: "Data Anda telah kami terima , perubahan data memerlukan verifikasi dari pihak sekolah",
        confirmText: "Mengerti",
        cancelText: null,
        onConfirm: () => setState((prev) => ({ ...prev, isDialogOpen: false })),
        variant: "primary"
      },
      void 0,
      false,
      {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
        lineNumber: 612,
        columnNumber: 13
      },
      void 0
    )
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
    lineNumber: 319,
    columnNumber: 9
  }, void 0);
};
const DataRow = ({ icon, label, value }) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-3", children: [
  /* @__PURE__ */ jsxDEV("span", { className: "mt-1 text-gray-500", children: icon }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
    lineNumber: 636,
    columnNumber: 9
  }, void 0),
  /* @__PURE__ */ jsxDEV("div", { children: [
    /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-gray-700", children: label }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
      lineNumber: 638,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV("p", { className: "text-gray-900", children: value }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
      lineNumber: 639,
      columnNumber: 13
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
    lineNumber: 637,
    columnNumber: 9
  }, void 0)
] }, void 0, true, {
  fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
  lineNumber: 635,
  columnNumber: 5
}, void 0);
const EditDataRow = ({ disabled = false, icon, label, value, onChange, error }) => /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: [
  /* @__PURE__ */ jsxDEV("label", { className: "mb-1 ml-8 block text-sm font-bold text-gray-700", children: label }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
    lineNumber: 656,
    columnNumber: 9
  }, void 0),
  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
    icon && /* @__PURE__ */ jsxDEV("div", { className: "text-xl text-gray-500", children: icon }, void 0, false, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
      lineNumber: 658,
      columnNumber: 23
    }, void 0),
    /* @__PURE__ */ jsxDEV(
      "input",
      {
        disabled,
        type: "text",
        value,
        onChange,
        className: cn(`w-full rounded border ${error ? "border-red-500" : "border-gray-300"} p-2 text-sm`, disabled && "bg-gray-300")
      },
      void 0,
      false,
      {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
        lineNumber: 659,
        columnNumber: 13
      },
      void 0
    )
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
    lineNumber: 657,
    columnNumber: 9
  }, void 0),
  error && /* @__PURE__ */ jsxDEV("p", { className: "mt-1 text-xs text-red-500", children: error }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
    lineNumber: 667,
    columnNumber: 19
  }, void 0)
] }, void 0, true, {
  fileName: "/home/webserver-1/siswa/resources/js/pages/Siswa/DataSiswaContent.tsx",
  lineNumber: 655,
  columnNumber: 5
}, void 0);
export {
  DataSiswaContent as default
};
