import { jsxDEV } from "react/jsx-dev-runtime";
import { a as useDebugLogger } from "./use-debug-logger-DbMTik7y.js";
import { useContext, createContext } from "react";
const LoggerContext = createContext(null);
const LoggerProvider = ({ children }) => {
  const logger = useDebugLogger();
  return /* @__PURE__ */ jsxDEV(LoggerContext.Provider, { value: logger, children }, void 0, false, {
    fileName: "/home/webserver-1/siswa/resources/js/contexts/logger-context.tsx",
    lineNumber: 14,
    columnNumber: 9
  }, void 0);
};
const useLogger = () => {
  const logger = useContext(LoggerContext);
  if (!logger) {
    throw new Error("useLogger must be used within a LoggerProvider");
  }
  return logger;
};
export {
  LoggerProvider as L,
  useLogger as u
};
