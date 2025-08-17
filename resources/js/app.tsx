import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { LoggerProvider } from './contexts/logger-context';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const RootWrapper = () => {
            useEffect(() => {
                const loader = document.getElementById('initial-loader');
                if (loader) {
                    loader.style.opacity = '0';
                    loader.style.transition = 'opacity 0.3s ease';
                    setTimeout(() => loader.remove(), 300);
                }
            }, []);

            return <>
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
            <App {...props} /></>;
        };

        root.render(
            <LoggerProvider>
                <RootWrapper />
            </LoggerProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
