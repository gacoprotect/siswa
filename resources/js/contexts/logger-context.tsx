import useDebugLogger, { Logger } from '@/hooks/use-debug-logger';
import React, { createContext, useContext, ReactNode } from 'react';

const LoggerContext = createContext<Logger | null>(null);

interface LoggerProviderProps {
    children: ReactNode;
}

export const LoggerProvider = ({ children }: LoggerProviderProps) => {
    const logger = useDebugLogger();
    
    return (
        <LoggerContext.Provider value={logger}>
            {children}
        </LoggerContext.Provider>
    );
};

export const useLogger = () => {
    const logger = useContext(LoggerContext);
    if (!logger) {
        throw new Error('useLogger must be used within a LoggerProvider');
    }
    return logger;
};