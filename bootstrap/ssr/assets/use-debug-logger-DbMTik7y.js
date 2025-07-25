import { useRef, useEffect, useMemo } from "react";
import { usePage } from "@inertiajs/react";
function useAppConfig() {
  const { appConfig } = usePage().props;
  return {
    APP_DEBUG: (appConfig == null ? void 0 : appConfig.APP_DEBUG) ?? false,
    APP_ENV: (appConfig == null ? void 0 : appConfig.APP_ENV) ?? "production",
    APP_NAME: (appConfig == null ? void 0 : appConfig.APP_NAME) ?? "MAI"
  };
}
const __vite_import_meta_env__ = { "BASE_URL": "/build/", "DEV": true, "MODE": "production", "PROD": false, "SSR": true, "VITE_APP_NAME": "MAI", "VITE_APP_URL": "http://siswa.gaco/" };
const useDebugLogger = () => {
  const config = useAppConfig();
  const isDebugMode = config.APP_DEBUG;
  const didRunRef = useRef(false);
  useEffect(() => {
    if (isDebugMode && !didRunRef.current) {
      console.warn("SEGERA MATIKAN DEBUG MODE SETELAH SELESAI");
      console.log("%c[DEBUG]", "color: #4CAF50; font-weight: bold", "Debug mode is ACTIVE");
      console.log("%c[ENV]", "color: #2196F3; font-weight: bold", { VITE_ENV: __vite_import_meta_env__, CONFIG: config });
      didRunRef.current = true;
    }
  }, [isDebugMode, config]);
  const logger = useMemo(() => ({
    log: (...args) => {
      if (isDebugMode) {
        console.log("%c[DEBUG]", "color: #4CAF50; font-weight: bold", ...args);
      }
    },
    warn: (...args) => {
      if (isDebugMode) {
        console.warn("%c[WARN]", "color: #FFC107; font-weight: bold", ...args);
      }
    },
    error: (...args) => {
      if (isDebugMode) {
        console.error("%c[ERROR]", "color: #F44336; font-weight: bold", ...args);
      }
    },
    table: (tabularData, properties) => {
      if (isDebugMode) {
        console.table(tabularData, properties);
      }
    },
    dir: (obj) => {
      if (isDebugMode) {
        console.dir(obj);
      }
    },
    dirxml: (obj) => {
      if (isDebugMode) {
        console.dirxml(obj);
      }
    }
  }), [isDebugMode]);
  return logger;
};
export {
  useDebugLogger as a,
  useAppConfig as u
};
