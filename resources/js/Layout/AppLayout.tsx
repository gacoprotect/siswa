import { useAppConfig } from '@/hooks/use-app-config';
import { useToast } from '@/hooks/use-toast';
import { Head } from '@inertiajs/react';
import React from 'react';

type AppLayoutProps = {
    children: React.ReactNode;
    title?: string;
    className?: string;
};
const AppLayout = ({ children, title, className = '' }: AppLayoutProps) => {
    const config = useAppConfig();
    const isDebug = config.APP_DEBUG;
    const isDev = config.APP_ENV === 'local'
    useToast();

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
};

export default AppLayout;