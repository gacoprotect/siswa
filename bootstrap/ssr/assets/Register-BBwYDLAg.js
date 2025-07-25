import { jsxDEV, Fragment } from "react/jsx-dev-runtime";
import { A as AppLayout } from "./AppLayout-Dr7OzoMY.js";
import { useForm, router } from "@inertiajs/react";
import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { I as InfoBadge, P as PersonalForm, D as DokForm, A as AlamatForm, K as KontakForm } from "./info-badge-CKUn8i9e.js";
import { M as Modal } from "./Modal-i8ZK7ROr.js";
import Show from "./Show-CT1KMqcm.js";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { c as cn } from "./utils-UO2Utf7z.js";
import { u as useAppConfig } from "./use-debug-logger-DbMTik7y.js";
import { C as ConfirmDialog } from "./ConfirmDialog -CuDab5xe.js";
import { u as useLogger } from "./logger-context-CghNbJb_.js";
import "axios";
import "./InputGroup-CoQ5g3dV.js";
import "react-icons/bs";
import "@radix-ui/react-select";
import "lucide-react";
import "@radix-ui/react-label";
import "countries-list";
import "dompurify";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
const Register = ({ nouid, agreement }) => {
  const config = useAppConfig();
  const isDev = config.APP_ENV === "local";
  const { log, error: logError } = useLogger();
  const [modalState, setModalState] = useState({
    isDialogOpen: false,
    isAgreement: false
  });
  const [processing, setProcessing] = useState(false);
  const { data, setData, reset, clearErrors, setError, errors: formErrors } = useForm({
    nama: isDev ? "TEST MODE" : "",
    warneg: isDev ? "ID" : "",
    warnegName: isDev ? "Indonesia" : "",
    nik: isDev ? "1234567890123456" : "",
    kk: isDev ? "1234567890123456" : "",
    paspor: isDev ? "1234567890" : "",
    temtin: isDev ? "0" : "",
    alamat1: {
      prov: isDev ? "33" : "",
      kab: isDev ? "33.06" : "",
      kec: isDev ? "33.06.07" : "",
      desa: isDev ? "33.06.07.2017" : "",
      kabName: isDev ? "Purworejo" : "",
      addr: isDev ? "TEST MODE" : "",
      rt: isDev ? "001" : "",
      rw: isDev ? "001" : "",
      kodpos: isDev ? "12345" : ""
    },
    alamat2: {
      prov: isDev ? "33" : "",
      kab: isDev ? "33.06" : "",
      kec: isDev ? "33.06.07" : "",
      desa: isDev ? "33.06.07.2017" : "",
      kabName: isDev ? "Purworejo" : "",
      addr: isDev ? "TEST MODE" : "",
      rt: isDev ? "001" : "",
      rw: isDev ? "001" : "",
      kodpos: isDev ? "12345" : ""
    },
    hub: isDev ? "0" : "",
    tel: isDev ? "081808856626" : "",
    email: isDev ? "gacoprotect@gmail.com" : "",
    ktpFile: null,
    pasporFile: null,
    ktpPreview: null,
    pasporPreview: null
  });
  const formRef = useRef(null);
  const step = useMemo(() => {
    return data.warneg === "ID" ? "WNI" : data.warneg ? "WNA" : null;
  }, [data.warneg]);
  useEffect(() => {
    return () => {
      if (data.ktpPreview) URL.revokeObjectURL(data.ktpPreview);
      if (data.pasporPreview) URL.revokeObjectURL(data.pasporPreview);
    };
  }, [data.ktpPreview, data.pasporPreview]);
  const handleFileUpload = useCallback((field, file) => {
    if (field === "ktpFile" && data.ktpPreview) {
      URL.revokeObjectURL(data.ktpPreview);
    }
    if (field === "pasporFile" && data.pasporPreview) {
      URL.revokeObjectURL(data.pasporPreview);
    }
    const previewUrl = file ? URL.createObjectURL(file) : null;
    setData((prev) => ({
      ...prev,
      [field]: file,
      [`${field}Preview`]: previewUrl
    }));
  }, [data.ktpPreview, data.pasporPreview, setData]);
  const getSignature = useCallback(async () => {
    var _a;
    try {
      const signatureFormData = {
        nouid,
        warneg: data.warneg,
        nama: data.nama,
        kabName: ((_a = data.alamat1.kabName) == null ? void 0 : _a.replace(/^KAB\.\s*/i, "").replace(/^KOTA\s*/i, "").trim().toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())) || "",
        ...data.warneg === "ID" ? { nik: data.nik } : { paspor: data.paspor }
      };
      await Promise.all([
        router.visit(route("register", { nouid, q: "agreement" }), {
          method: "post",
          data: signatureFormData,
          only: ["agreement"],
          // hanya ambil props sesuai tab
          preserveState: true,
          preserveScroll: true,
          onStart: () => {
            setProcessing(true);
            log("Memanggil getSignature...");
          },
          onSuccess: (res) => {
            log("CEK RESPONSE : ", res);
            setModalState((prev) => ({ ...prev, isAgreement: true }));
          },
          onError: () => {
            toast.error("Terjadi Kesalahan");
            throw new Error("Terjadi Kesalahan");
          },
          onFinish: () => {
            log("Selesai visit, modalState.isAgreement:", modalState.isAgreement);
            setProcessing(false);
          }
        })
      ]);
    } catch (err) {
      logError("Signature request failed:", err);
      toast.error("Terjadi Kesalahan");
    }
  }, [data, nouid, log, logError, modalState.isAgreement]);
  const validateForm = useCallback((field = null) => {
    const newErrors = {};
    const validateSingleField = field !== null;
    const addErrorIfInvalid = (isInvalid, errorKey, errorMessage) => {
      if ((!validateSingleField || errorKey === field) && isInvalid) {
        newErrors[errorKey] = errorMessage;
      }
    };
    addErrorIfInvalid(!data.warneg, "warneg", "Pilih Negara Anda");
    addErrorIfInvalid(!data.nama, "nama", "Nama lengkap wajib diisi");
    if (step === "WNI") {
      addErrorIfInvalid(data.nik.length > 0 && data.nik.length < 16, "nik", "NIK harus 16 digit");
      addErrorIfInvalid(!data.nik, "nik", "NIK wajib diisi");
      addErrorIfInvalid(data.kk.length > 0 && data.kk.length < 16, "kk", "No. KK harus 16 digit");
      addErrorIfInvalid(!data.kk, "kk", "No. KK wajib diisi");
      addErrorIfInvalid(!data.ktpFile, "ktpFile", "Foto KTP wajib diunggah");
    } else if (step === "WNA") {
      addErrorIfInvalid(!data.paspor, "paspor", "Nomor paspor wajib diisi");
      addErrorIfInvalid(!data.pasporFile, "pasporFile", "Foto paspor wajib diunggah");
    }
    addErrorIfInvalid(!data.temtin, "temtin", "wajib dipilih");
    addErrorIfInvalid(data.tel.length > 0 && (data.tel.length < 9 || data.tel.length > 13), "tel", "nomor telepon tidak valid");
    addErrorIfInvalid(!data.tel, "tel", "Nomor telepon wajib diisi");
    addErrorIfInvalid(!data.email, "email", "Email wajib diisi");
    addErrorIfInvalid(!data.hub, "hub", "Hubungan dengan siswa wajib diisi");
    const validateAddress = (prefix, address, isDomisili = false) => {
      const label = isDomisili ? "domisili" : "";
      addErrorIfInvalid(!address.prov, `${prefix}.prov`, `Provinsi ${label} wajib diisi`);
      addErrorIfInvalid(!address.kab, `${prefix}.kab`, `Kabupaten/Kota ${label} wajib diisi`);
      addErrorIfInvalid(!address.kec, `${prefix}.kec`, `Kecamatan ${label} wajib diisi`);
      addErrorIfInvalid(!address.desa, `${prefix}.desa`, `Desa/Kelurahan ${label} wajib diisi`);
      addErrorIfInvalid(!address.addr, `${prefix}.addr`, `Alamat ${label} wajib diisi`);
      addErrorIfInvalid(!address.rt, `${prefix}.rt`, "RT wajib diisi");
      addErrorIfInvalid(!address.rw, `${prefix}.rw`, "RW wajib diisi");
      addErrorIfInvalid(!address.kodpos, `${prefix}.kodpos`, "Kode pos wajib diisi");
    };
    if (!validateSingleField || (field == null ? void 0 : field.startsWith("alamat1"))) {
      validateAddress("alamat1", data.alamat1);
    }
    if (parseInt(data.temtin) > 0 && (!validateSingleField || (field == null ? void 0 : field.startsWith("alamat2")))) {
      validateAddress("alamat2", data.alamat2, true);
    }
    return newErrors;
  }, [data, step]);
  const handleNext = useCallback(async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setError(errors);
    if (Object.keys(errors).length > 0) {
      logError("Validation Error : ", errors);
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const element = document.getElementById(firstErrorKey) || document.querySelector(`[name="${firstErrorKey}"], [data-name="${firstErrorKey}"]`);
        element == null ? void 0 : element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    await getSignature();
  }, [validateForm, getSignature, logError, setError]);
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const simpleFields = [
        "nama",
        "warneg",
        "warnegName",
        "nik",
        "kk",
        "paspor",
        "temtin",
        "hub",
        "tel",
        "email"
      ];
      simpleFields.forEach((field) => {
        const value = data[field];
        if (value !== null && value !== void 0) {
          formData.append(field, String(value));
        }
      });
      if (data.ktpFile) formData.append("ktpFile", data.ktpFile);
      if (data.pasporFile) formData.append("pasporFile", data.pasporFile);
      const addAddressToFormData = (prefix, address) => {
        Object.entries(address).forEach(([key, value]) => {
          if (value !== null && value !== void 0) {
            formData.append(`${prefix}[${key}]`, String(value));
          }
        });
      };
      addAddressToFormData("alamat1", data.alamat1);
      if (parseInt(data.temtin) === 1) {
        addAddressToFormData("alamat2", data.alamat2);
      }
      if (agreement.sign) {
        formData.append("sign", agreement.sign);
        formData.append("payload", agreement.payload);
      }
      await Promise.all([
        router.post(route("auth.register", nouid), formData, {
          onBefore: () => {
            setProcessing(true);
          },
          onSuccess: () => {
            reset();
            toast.success("Pendaftaran berhasil!");
          },
          onError: (errors) => {
            toast.error("Terjadi kesalahan");
            logError("Error Submit:", errors);
          },
          onFinish: () => {
            setModalState((prev) => ({ ...prev, isAgreement: false }));
            setProcessing(false);
          }
        })
      ]);
    } catch (err) {
      logError("Error Submit:", err);
      toast.error("Proses pendaftaran gagal");
    }
  }, [data, agreement, nouid, reset, logError]);
  const handleChange = useMemo(
    () => (field, value) => {
      setData(field, value);
      if (!value || shouldValidateWhenNotEmpty(field, value)) {
        const err = validateForm(field);
        setError(err);
      } else {
        clearErrors(field);
      }
    },
    [validateForm, clearErrors, setData, setError]
  );
  const shouldValidateWhenNotEmpty = (field, value) => {
    const validationRules = {
      tel: (v) => v.length > 0 && (v.length < 9 || v.length > 13),
      email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      nik: (v) => v.length > 0 && v.length < 16,
      kk: (v) => v.length > 0 && v.length < 16
    };
    const validator = validationRules[field];
    return validator ? validator(value) : false;
  };
  useEffect(() => {
    if (isDev) {
      console.count("REGISTER RENDER");
    }
  }, [isDev]);
  useEffect(() => {
    log("Processing changed:", processing);
  }, [processing, log]);
  return /* @__PURE__ */ jsxDEV(AppLayout, { title: "Pendaftaran", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-2xl min-h-screen mx-auto px-4 py-6 bg-white rounded-lg shadow-md", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-center mb-6", children: [
      /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-bold text-primary text-center", children: "Formulir Pendaftaran SIP" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
        lineNumber: 407,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-sm text-blue-500", children: "(Student Information & Payment)" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
        lineNumber: 410,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
      lineNumber: 406,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV(
      InfoBadge,
      {
        variant: "warning",
        title: "Perhatian!",
        items: [
          "Isi data sesuai identitas resmi (KTP/Paspor).",
          "Unggah foto dokumen asli yang jelas dan terbaca.",
          "Pastikan nomor WhatsApp dan email aktif untuk menerima PIN akses SIP.",
          "Jika WNA, wajib unggah paspor dan KITAS/KITAP yang berlaku."
        ]
      },
      void 0,
      false,
      {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
        lineNumber: 415,
        columnNumber: 17
      },
      void 0
    ),
    /* @__PURE__ */ jsxDEV(
      "form",
      {
        ref: formRef,
        onSubmit: handleSubmit,
        className: "space-y-6",
        encType: "multipart/form-data",
        children: [
          /* @__PURE__ */ jsxDEV(
            PersonalForm,
            {
              data: {
                warneg: data.warneg,
                warnegName: data.warnegName,
                nama: data.nama,
                nik: data.nik,
                kk: data.kk,
                paspor: data.paspor
              },
              step,
              errors: formErrors,
              onChange: (fieldName, value) => handleChange(fieldName, value)
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
              lineNumber: 432,
              columnNumber: 21
            },
            void 0
          ),
          step !== null && /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV(
              DokForm,
              {
                step,
                processing,
                previews: {
                  ktpPreview: data.ktpPreview,
                  pasporPreview: data.pasporPreview
                },
                errors: formErrors,
                onChange: handleFileUpload
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
                lineNumber: 448,
                columnNumber: 29
              },
              void 0
            ),
            /* @__PURE__ */ jsxDEV(
              AlamatForm,
              {
                data: {
                  temtin: data.temtin,
                  alamat1: data.alamat1,
                  alamat2: data.alamat2
                },
                onChange: (fieldName, value) => handleChange(fieldName, value),
                step,
                errors: formErrors
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
                lineNumber: 459,
                columnNumber: 29
              },
              void 0
            ),
            /* @__PURE__ */ jsxDEV(
              KontakForm,
              {
                data: {
                  hub: data.hub,
                  tel: data.tel,
                  email: data.email
                },
                onChange: (fieldName, value) => handleChange(fieldName, value),
                errors: formErrors
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
                lineNumber: 470,
                columnNumber: 29
              },
              void 0
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "pt-6", children: /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: handleNext,
                className: cn(
                  `w-full px-4 py-3 flex justify-center items-center text-white rounded-md transition-colors bg-primary hover:bg-primary-dark cursor-pointer font-medium`,
                  processing && "bg-primary/50 cursor-not-allowed"
                ),
                disabled: processing,
                children: processing ? /* @__PURE__ */ jsxDEV(FaSpinner, { className: "animate-spin text-center" }, void 0, false, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
                  lineNumber: 490,
                  columnNumber: 51
                }, void 0) : "Lanjutkan"
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
                lineNumber: 481,
                columnNumber: 33
              },
              void 0
            ) }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
              lineNumber: 480,
              columnNumber: 29
            }, void 0),
            /* @__PURE__ */ jsxDEV(
              Modal,
              {
                isOpen: modalState.isAgreement,
                onClose: () => setModalState((prev) => ({ ...prev, isAgreement: false })),
                onConfirm: handleSubmit,
                confirmText: processing ? "mendaftar" : "Setuju",
                confirmDisabled: processing,
                header: false,
                agreement: /* @__PURE__ */ jsxDEV("p", { children: [
                  "Saya yang bertanda tangan di bawah ini ",
                  /* @__PURE__ */ jsxDEV("strong", { children: data.nama }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
                    lineNumber: 503,
                    columnNumber: 80
                  }, void 0),
                  " menyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan di atas terkait Kartu Pelajar atas nama ",
                  /* @__PURE__ */ jsxDEV("strong", { children: agreement == null ? void 0 : agreement.siswa }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
                    lineNumber: 504,
                    columnNumber: 124
                  }, void 0),
                  "."
                ] }, void 0, true, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
                  lineNumber: 502,
                  columnNumber: 37
                }, void 0),
                children: /* @__PURE__ */ jsxDEV(
                  Show,
                  {
                    childData: agreement,
                    isChild: true
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
                    lineNumber: 508,
                    columnNumber: 33
                  },
                  void 0
                )
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
                lineNumber: 494,
                columnNumber: 29
              },
              void 0
            )
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
            lineNumber: 447,
            columnNumber: 25
          }, void 0)
        ]
      },
      void 0,
      true,
      {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
        lineNumber: 426,
        columnNumber: 17
      },
      void 0
    ),
    /* @__PURE__ */ jsxDEV(
      ConfirmDialog,
      {
        open: modalState.isDialogOpen,
        onOpenChange: (open) => setModalState((prev) => ({ ...prev, isDialogOpen: open })),
        title: "Dokumen Belum Lengkap",
        description: step === "WNI" ? "Foto KTP wajib diunggah untuk WNI. Harap lengkapi sebelum melanjutkan." : "Foto paspor wajib diunggah untuk WNA. Harap lengkapi sebelum melanjutkan.",
        confirmText: "Mengerti",
        cancelText: null,
        onConfirm: () => setModalState((prev) => ({ ...prev, isDialogOpen: false })),
        variant: "danger"
      },
      void 0,
      false,
      {
        fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
        lineNumber: 517,
        columnNumber: 17
      },
      void 0
    )
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
    lineNumber: 405,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/Register/Register.tsx",
    lineNumber: 404,
    columnNumber: 9
  }, void 0);
};
const Register$1 = React.memo(Register);
export {
  Register$1 as default
};
