import { Head } from '@inertiajs/react';
import React from 'react';
import { ToastContainer } from 'react-toastify';

type AppLayoutProps = {
    children: React.ReactNode;
    title?: string;
    className?: string;
};

const AppLayout = ({ children, title, className = '' }: AppLayoutProps) => {
    return (
        <div className="min-h-screen">
            <Head title={title} />
            <div className="mx-auto min-h-screen max-w-xl rounded-t-lg bg-primary shadow-sm">
                <main className={`${className}`}>
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
