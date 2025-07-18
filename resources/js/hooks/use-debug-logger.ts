import { useCallback, useEffect } from 'react';

type Logger = {
    log: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    table: (tabularData: unknown, properties?: string[]) => void;
    dir: (obj: unknown) => void;
    dirxml: (obj: unknown) => void;
};

const isDebugMode = import.meta.env.VITE_APP_DEBUG === 'true';

const useDebugLogger = (): Logger => {
    useEffect(() => {
            if (isDebugMode) {
                console.log('%c[DEBUG]', 'color: #4CAF50; font-weight: bold', 'Debug mode is ACTIVE');
                console.log('%c[ENV]', 'color: #2196F3; font-weight: bold', import.meta.env);
            }
    }, [])

    const logger: Logger = {
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
    };

    return logger;
};

export default useDebugLogger;