import { useLogger } from '@/contexts/logger-context';
import { useAppConfig } from '@/hooks/use-app-config';
import { useToast } from '@/hooks/use-toast';
import { Head, usePage } from '@inertiajs/react';
import React, { useMemo, useEffect, useRef } from 'react';

type AppLayoutProps = {
    children: React.ReactNode;
    title?: string;
    className?: string;
};

const AppLayout = React.memo(({ children, title, className = '' }: AppLayoutProps) => {
    const { props: pageProps } = usePage();
    const { log, count } = useLogger();
    const config = useAppConfig();
    const renderCountRef = useRef(0);

    // Memoize computed values untuk mencegah re-render yang tidak perlu
    const isDebug = useMemo(() => config.APP_DEBUG, [config.APP_DEBUG]);
    const isDev = useMemo(() => config.APP_ENV === 'local', [config.APP_ENV]);

    // Initialize toast
    useToast();

    // Debug logging dengan tracking render count
    useEffect(() => {
        renderCountRef.current += 1;

        if (isDebug) {
            count('Component Rendered');
            log({
                renderCount: renderCountRef.current,
                pageProps,
                timestamp: new Date().toISOString(),
                component: 'AppLayout'
            });

            // Warning jika render lebih dari sekali
            if (renderCountRef.current > 1) {
                console.warn(`⚠️ AppLayout rendered ${renderCountRef.current} times!`);
            }
        }
    }, [isDebug, count, log, pageProps]);

    return (
        <div className="min-h-screen relative bg-primary overflow-hidden">
            <Head title={title} />

            {/* DEBUG BANNER - Positioned absolutely at the top */}
            {(isDev || isDebug) && (
                <div className="fixed w-60 h-50 flex flex-col justify-end rotate-45 origin-top-right top-0 -right-42 z-50 bg-yellow-300/50 text-center py-1 px-8 text-black animate-pulse text-sm">
                    <span className='font-bold text-yellow-900'>MODE</span>
                    <span className='font-bold text-yellow-900'>{isDebug ? 'DEBUG ACTIVED' : import.meta.env.MODE}
                    </span>
                </div>
            )}

            {/* Content box */}
            <div className="mx-auto min-h-screen max-w-xl rounded-t-lg bg-primary shadow-sm overflow-hidden">
                <main className={`${className} h-full`}>
                    {children}
                </main>
            </div>
        </div>
    );
});

AppLayout.displayName = 'AppLayout';

export default AppLayout;