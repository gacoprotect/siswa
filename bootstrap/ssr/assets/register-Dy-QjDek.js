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
import { u as useAppConfig, a as useDebugLogger } from "./use-debug-logger-DbMTik7y.js";
import { C as ConfirmDialog } from "./ConfirmDialog -CuDab5xe.js";
import "./logger-context-CghNbJb_.js";
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
  const { log, error: logError } = useDebugLogger();
  const [modalState, setModalState] = useState({
    isDialogOpen: false,
    isSignatureModalOpen: false
  });
  const [processing, setProcessing] = useState(false);
  const { data, setData, reset, errors: formErrors } = useForm({
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
  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!data.warneg) newErrors.warneg = "Pilih Negara Anda";
    if (!data.nama) newErrors.nama = "Nama lengkap wajib diisi";
    if (step === "WNI") {
      if (data.nik.length > 0 && data.nik.length < 16) newErrors.nik = "NIK harus 16 digit";
      if (!data.nik) newErrors.nik = "NIK wajib diisi";
      if (data.kk.length > 0 && data.kk.length < 16) newErrors.kk = "No. KK harus 16 digit";
      if (!data.kk) newErrors.kk = "No. KK wajib diisi";
      if (!data.ktpFile) newErrors.ktpFile = "Foto KTP wajib diunggah";
    } else if (step === "WNA") {
      if (!data.paspor) newErrors.paspor = "Nomor paspor wajib diisi";
      if (!data.pasporFile) newErrors.pasporFile = "Foto paspor wajib diunggah";
    }
    if (!data.temtin) newErrors.temtin = "wajib dipilih";
    const validateAddress = (prefix, address, isDomisili = false) => {
      if (!address.prov) newErrors[`${prefix}.prov`] = `${isDomisili ? "Provinsi domisili" : "Provinsi"} wajib diisi`;
      if (!address.kab) newErrors[`${prefix}.kab`] = `${isDomisili ? "Kabupaten/Kota domisili" : "Kabupaten/Kota"} wajib diisi`;
      if (!address.kec) newErrors[`${prefix}.kec`] = `${isDomisili ? "Kecamatan domisili" : "Kecamatan"} wajib diisi`;
      if (!address.desa) newErrors[`${prefix}.desa`] = `${isDomisili ? "Desa/Kelurahan domisili" : "Desa/Kelurahan"} wajib diisi`;
      if (!address.addr) newErrors[`${prefix}.addr`] = `${isDomisili ? "Alamat domisili" : "Alamat"} wajib diisi`;
      if (!address.rt) newErrors[`${prefix}.rt`] = "wajib diisi";
      if (!address.rw) newErrors[`${prefix}.rw`] = "wajib diisi";
      if (!address.kodpos) newErrors[`${prefix}.kodpos`] = "wajib diisi";
    };
    validateAddress("alamat1", data.alamat1);
    if (parseInt(data.temtin) > 0) {
      validateAddress("alamat2", data.alamat2, true);
    }
    if (data.tel.length > 0 && (data.tel.length < 9 || data.tel.length > 13)) {
      newErrors.tel = "nomor telepon tidak valid";
    }
    if (!data.tel) newErrors.tel = "Nomor telepon wajib diisi";
    if (!data.email) newErrors.email = "Email wajib diisi";
    if (!data.hub) newErrors.hub = "Hubungan dengan siswa wajib diisi";
    return newErrors;
  }, [data, step]);
  const getSignature = useCallback(async (next = false) => {
    var _a;
    try {
      const signatureFormData = {
        nouid,
        warneg: data.warneg,
        nama: data.nama,
        kabName: ((_a = data.alamat1.kabName) == null ? void 0 : _a.replace(/^KAB\.\s*/i, "").replace(/^KOTA\s*/i, "").trim().toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())) || "",
        ...data.warneg === "ID" ? { nik: data.nik } : { paspor: data.paspor }
      };
      await router.visit(route("test.register", { nouid, q: "agreement" }), {
        method: "post",
        data: signatureFormData,
        only: ["agreement"],
        // hanya ambil props sesuai tab
        preserveState: true,
        preserveScroll: true,
        onStart: () => setProcessing(true),
        onSuccess: (res) => {
          log("RESPONSE : ", res);
          if (next) {
            setModalState((prev) => ({ ...prev, isSignatureModalOpen: true }));
          }
        },
        onError: () => {
          throw new Error("Terjadi Kesalahan");
        },
        onFinish: () => setProcessing(false)
      });
    } catch (err) {
      logError("Signature request failed:", err);
      toast.error("Gagal mendapatkan tanda tangan digital");
    } finally {
      setProcessing(false);
    }
  }, [data, nouid, log, logError]);
  const handleNext = useCallback(async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([key, value]) => {
        setData(key, value);
      });
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const element = document.getElementById(firstErrorKey) || document.querySelector(`[name="${firstErrorKey}"], [data-name="${firstErrorKey}"]`);
        element == null ? void 0 : element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    await getSignature(true);
  }, [validateForm, getSignature, setData]);
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setProcessing(true);
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
      await router.post(route("register", nouid), formData, {
        onSuccess: () => {
          reset();
          setModalState((prev) => ({ ...prev, isSignatureModalOpen: false }));
          toast.success("Pendaftaran berhasil!");
        },
        onError: (errors) => {
          toast.error("Terjadi kesalahan saat pendaftaran");
          logError("Error Submit:", errors);
        }
      });
    } catch (err) {
      logError("Error Submit:", err);
      toast.error("Proses pendaftaran gagal");
    } finally {
      setProcessing(false);
    }
  }, [data, agreement, nouid, reset, logError]);
  useEffect(() => {
    if (isDev) {
      console.count("REGISTER RENDER");
    }
  }, [isDev]);
  return /* @__PURE__ */ jsxDEV(AppLayout, { title: "Pendaftaran", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-2xl min-h-screen mx-auto px-4 py-6 bg-white rounded-lg shadow-md", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-center mb-6", children: [
      /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-bold text-primary text-center", children: "Formulir Pendaftaran SIP" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
        lineNumber: 365,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-sm text-blue-500", children: "(Student Information & Payment)" }, void 0, false, {
        fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
        lineNumber: 368,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
      lineNumber: 364,
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
        fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
        lineNumber: 373,
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
              setStep: (newStep) => setData("warneg", newStep === "WNI" ? "ID" : "OTHER"),
              errors: formErrors,
              onChange: (fieldName, value) => setData(fieldName, value)
            },
            void 0,
            false,
            {
              fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
              lineNumber: 390,
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
                fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
                lineNumber: 407,
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
                onChange: (fieldName, value) => setData(fieldName, value),
                step,
                errors: formErrors
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
                lineNumber: 418,
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
                onChange: (fieldName, value) => setData(fieldName, value),
                errors: formErrors
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
                lineNumber: 429,
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
                  fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
                  lineNumber: 449,
                  columnNumber: 51
                }, void 0) : "Lanjutkan"
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
                lineNumber: 440,
                columnNumber: 33
              },
              void 0
            ) }, void 0, false, {
              fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
              lineNumber: 439,
              columnNumber: 29
            }, void 0),
            /* @__PURE__ */ jsxDEV(
              Modal,
              {
                isOpen: modalState.isSignatureModalOpen,
                onClose: () => setModalState((prev) => ({ ...prev, isSignatureModalOpen: false })),
                onConfirm: handleSubmit,
                confirmText: processing ? "mendaftar" : "Setuju",
                confirmDisabled: processing,
                header: false,
                agreement: /* @__PURE__ */ jsxDEV("p", { children: [
                  "Saya yang bertanda tangan di bawah ini ",
                  /* @__PURE__ */ jsxDEV("strong", { children: data.nama }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
                    lineNumber: 462,
                    columnNumber: 80
                  }, void 0),
                  " menyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan di atas terkait Kartu Pelajar atas nama ",
                  /* @__PURE__ */ jsxDEV("strong", { children: agreement == null ? void 0 : agreement.siswa }, void 0, false, {
                    fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
                    lineNumber: 463,
                    columnNumber: 124
                  }, void 0),
                  "."
                ] }, void 0, true, {
                  fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
                  lineNumber: 461,
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
                    fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
                    lineNumber: 467,
                    columnNumber: 33
                  },
                  void 0
                )
              },
              void 0,
              false,
              {
                fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
                lineNumber: 453,
                columnNumber: 29
              },
              void 0
            )
          ] }, void 0, true, {
            fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
            lineNumber: 406,
            columnNumber: 25
          }, void 0)
        ]
      },
      void 0,
      true,
      {
        fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
        lineNumber: 384,
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
        fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
        lineNumber: 476,
        columnNumber: 17
      },
      void 0
    )
  ] }, void 0, true, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
    lineNumber: 363,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/pages/test/register.tsx",
    lineNumber: 362,
    columnNumber: 9
  }, void 0);
};
const register = React.memo(Register);
export {
  register as default
};
