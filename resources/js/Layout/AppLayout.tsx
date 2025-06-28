import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

type AppLayoutProps = {
    children: React.ReactNode;
    title?: string;
    className?: string;
};

const AppLayout = ({ children, title, className = '' }: AppLayoutProps) => {
    const { errors, flash} = usePage<SharedData>().props
     useEffect(() => {
            const allErrors = Object.values(errors || {});
            allErrors.forEach((err) => {
                console.log(err);
                // toast.error(err, { toastId: `err-${err}` });
            });
        }, [errors]);
        useEffect(() => {
            if (flash?.message) {
                if (flash.success === true) {
                    toast.success(flash.message, { toastId: `flash-${flash.message}` });
                } else if (flash.success === false) {
                    toast.error(flash.message, { toastId: `flash-${flash.message}` });
                }
            }
        }, [flash]);
    return (
        <div className="min-h-screen">
            <Head title={title} />
            <div className="mx-auto min-h-screen max-w-xl rounded-t-lg bg-primary shadow-sm">
                <main className={`min-h-[calc(100vh-4rem)] ${className}`}>
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
