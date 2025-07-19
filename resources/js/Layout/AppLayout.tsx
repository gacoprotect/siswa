import useDebugLogger from '@/hooks/use-debug-logger';
import { Head } from '@inertiajs/react';
import React from 'react';
import { ToastContainer } from 'react-toastify';

type AppLayoutProps = {
    children: React.ReactNode;
    title?: string;
    className?: string;
};
const AppLayout = ({ children, title, className = '' }: AppLayoutProps) => {
const { log, warn, error } = useDebugLogger();
const isDev = Boolean(import.meta.env.VITE_APP_DEBUG === 'true' && import.meta.env.VITE_APP_ENV === "local")
const isDebug = Boolean(import.meta.env.VITE_APP_DEBUG === 'true')
const isLocal = Boolean(import.meta.env.VITE_APP_ENV === "local")
if (import.meta.env.VITE_APP_DEBUG) {
    log({ "DEV_MODE": isDev, "APP_DEBUG": import.meta.env.VITE_APP_DEBUG, "APP_ENV": import.meta.env.VITE_APP_ENV });
    warn("SEGERA MATIKAN DEBUG MODE SETELAH SELESAI");
}
    return (
        <div className="min-h-screen relative bg-primary overflow-hidden">
            <Head title={title} />

            {/* DEBUG BANNER - Positioned absolutely at the top */}
            {(isDev || isDebug || isLocal) && (
                <div className="fixed w-60 h-50 flex flex-col justify-end -rotate-45 origin-top-left top-2 -left-42 z-50 bg-yellow-500/50 text-center py-1 px-8 text-black animate-pulse text-sm">
                    <span className='font-bold'>MODE</span>
                    <span className='font-bold'>{
                        isDev ? "DEVELOPMENT" :
                            isDebug ? 'DEBUG' :
                                isLocal && "LOCAL"
                    }
                    </span>
                </div>
            )}

            {/* Content box */}
            <div className="mx-auto min-h-screen max-w-xl rounded-t-lg bg-primary shadow-sm overflow-hidden">
                <main className={`${className} h-full`}>
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AppLayout;