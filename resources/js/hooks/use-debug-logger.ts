import { useEffect, useMemo, useRef } from 'react';
import { useAppConfig } from './use-app-config';

export type Logger = {
    count(label?: string): void;
    log: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    table: (tabularData: unknown, properties?: string[]) => void;
    dir: (obj: unknown) => void;
    dirxml: (obj: unknown) => void;
};

const useDebugLogger = (): Logger => {
    const config = useAppConfig();
    const isDebugMode = config.APP_DEBUG;
    const didRunRef = useRef(false); // 👈 untuk pastikan log hanya sekali

    if (isDebugMode && !didRunRef.current) {
        console.warn("SEGERA MATIKAN DEBUG MODE SETELAH SELESAI");
        console.log('%c[DEBUG]', 'color: #4CAF50; font-weight: bold', 'Debug mode is ACTIVE');
        console.log('%c[ENV]', 'color: #2196F3; font-weight: bold', { VITE_ENV: import.meta.env, CONFIG: config });
        didRunRef.current = true;
    }

    const logger = useMemo<Logger>(() => ({
        count: (label?: string) => {
            if (isDebugMode) {
                console.count('[COUNT] ' + label);
            }
        },
        log: (...args: unknown[]) => {
            if (isDebugMode) {
                console.log('%c[DEBUG]', 'color: #4CAF50; font-weight: bold', ...args);
            }
        },
        warn: (...args: unknown[]) => {
            if (isDebugMode) {
                console.warn('%c[WARN]', 'color: #FFC107; font-weight: bold', ...args);
            }
        },
        error: (...args: unknown[]) => {
            if (isDebugMode) {
                console.error('%c[ERROR]', 'color: #F44336; font-weight: bold', ...args);
            }
        },
        table: (tabularData: unknown, properties?: string[]) => {
            if (isDebugMode) {
                console.table(tabularData, properties);
            }
        },
        dir: (obj: unknown) => {
            if (isDebugMode) {
                console.dir(obj);
            }
        },
        dirxml: (obj: unknown) => {
            if (isDebugMode) {
                console.dirxml(obj);
            }
        }
    }), [isDebugMode]);

    return logger;
};

export default useDebugLogger;
