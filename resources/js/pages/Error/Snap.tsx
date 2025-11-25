import { Head, Link, router } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, ChevronDown, ChevronUp, CreditCard, Home } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SnapErrorPageProps {
    code?: string;
    message?: string;
    errorDetails?: {
        category?: string;
        http_code?: number;
        description?: string;
        description_internal?: string;
        mapping_internal?: string;
    };
}

const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
        case 'business':
            return 'from-orange-500 to-orange-700';
        case 'system':
            return 'from-red-500 to-red-700';
        case 'message':
            return 'from-blue-500 to-blue-700';
        default:
            return 'from-gray-500 to-gray-700';
    }
};

export default function SnapErrorPage({ code = 'UNKNOWN', message, errorDetails }: SnapErrorPageProps) {
    const [showDetails, setShowDetails] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        setIsAnimating(false);
    }, []);

    const gradientClass = getCategoryColor(errorDetails?.category);

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
            <Head title={`SNAP Payment Error - ${code}`} />

            {/* Animated Background */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div
                    className={`absolute -top-1/2 -right-1/2 h-full w-full bg-gradient-to-br ${gradientClass} animate-pulse rounded-full opacity-10 blur-3xl`}
                ></div>
                <div
                    className={`absolute -bottom-1/2 -left-1/2 h-full w-full bg-gradient-to-tr ${gradientClass} animate-pulse rounded-full opacity-10 blur-3xl`}
                    style={{ animationDelay: '1s' }}
                ></div>
            </div>

            <div className={`relative z-10 w-full max-w-2xl ${isAnimating ? 'animate-slide-up' : ''}`}>
                <div className="rounded-3xl border border-gray-200/50 bg-white/95 p-8 shadow-2xl backdrop-blur-xl md:p-12 dark:border-gray-700/50 dark:bg-gray-800/95">
                    {/* Icon */}
                    <div className="mb-8 flex justify-center">
                        <div
                            className={`relative h-32 w-32 rounded-full bg-gradient-to-br ${gradientClass} flex transform items-center justify-center text-6xl shadow-lg transition-transform hover:scale-110`}
                        >
                            <div className="absolute inset-0 animate-ping rounded-full bg-white/20"></div>
                            <div className="relative z-10">
                                <CreditCard className="h-16 w-16 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Error Code */}
                    <div className="mb-6 text-center">
                        <div className="mb-4 inline-block rounded-full bg-gray-100 px-4 py-2 dark:bg-gray-700">
                            <span className="text-sm font-semibold tracking-wide text-gray-600 uppercase dark:text-gray-300">SNAP Payment Error</span>
                        </div>
                        <h1 className="mb-4 font-mono text-5xl font-black text-gray-900 md:text-6xl dark:text-white">{code}</h1>
                        <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">Payment Transaction Failed</h2>
                        <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                            {message || 'An error occurred while processing your payment transaction.'}
                        </p>
                    </div>

                    {/* Error Details */}
                    {errorDetails && (
                        <div className="mb-6 rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-6 dark:border-gray-700 dark:from-gray-700/50 dark:to-gray-800/50">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                                <div className="flex-1">
                                    <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
                                        Error Information
                                    </h3>
                                    <div className="space-y-2">
                                        {errorDetails.category && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Category:</span>
                                                <span
                                                    className={`rounded px-2 py-1 text-xs font-semibold ${
                                                        errorDetails.category.toLowerCase() === 'business'
                                                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                                                            : errorDetails.category.toLowerCase() === 'system'
                                                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                                    }`}
                                                >
                                                    {errorDetails.category}
                                                </span>
                                            </div>
                                        )}
                                        {errorDetails.description && (
                                            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{errorDetails.description}</p>
                                        )}
                                        {errorDetails.description_internal && (
                                            <p className="mt-2 text-xs text-gray-600 italic dark:text-gray-400">
                                                {errorDetails.description_internal}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Technical Details */}
                    {errorDetails && (
                        <div className="mb-6">
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 p-4 transition-all duration-200 hover:from-gray-200 hover:to-gray-300 dark:border-gray-600 dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700"
                            >
                                <span className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">Technical Details</span>
                                {showDetails ? (
                                    <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                )}
                            </button>

                            {showDetails && (
                                <div className="animate-slide-down mt-4 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/50">
                                    <div className="space-y-4">
                                        {errorDetails.http_code && (
                                            <div className="flex items-start justify-between border-b border-gray-200 py-2 last:border-0 dark:border-gray-700">
                                                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">HTTP Code:</span>
                                                <span className="text-right font-mono text-sm text-gray-900 dark:text-white">
                                                    {errorDetails.http_code}
                                                </span>
                                            </div>
                                        )}
                                        {errorDetails.mapping_internal && (
                                            <div className="flex items-start justify-between border-b border-gray-200 py-2 last:border-0 dark:border-gray-700">
                                                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Mapping Internal:</span>
                                                <span className="ml-4 text-right font-mono text-sm break-all text-gray-900 dark:text-white">
                                                    {errorDetails.mapping_internal}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                // Always use router.visit() for safe navigation
                                // Get referer from document
                                const referer = document.referrer;
                                const currentUrl = window.location.href;

                                // Parse referer URL to get path
                                let targetUrl = '/';

                                if (referer && referer !== currentUrl && !referer.includes('/error')) {
                                    try {
                                        const refererUrl = new URL(referer);
                                        const refererPath = refererUrl.pathname;

                                        // Only use referer if it's a valid path
                                        if (refererPath && refererPath !== '/error' && !refererPath.includes('/error/')) {
                                            targetUrl = refererPath + refererUrl.search;
                                        }
                                    } catch (err) {
                                        // Invalid URL, use default
                                        console.warn('Invalid referer URL:', referer, err);
                                    }
                                }

                                // Navigate using Inertia router
                                try {
                                    router.visit(targetUrl);
                                } catch (err) {
                                    console.error('Error navigating:', err);
                                    // Last resort: use window.location
                                    window.location.href = targetUrl;
                                }
                            }}
                            className="flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 shadow-md transition-all duration-200 hover:bg-gray-50 hover:shadow-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span>Go Back</span>
                        </button>
                        <Link
                            href="/"
                            className="flex transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl"
                        >
                            <Home className="h-5 w-5" />
                            <span>Go Home</span>
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes slide-down {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slide-up {
                    animation: slide-up 0.6s ease-out;
                }
                .animate-slide-down {
                    animation: slide-down 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
