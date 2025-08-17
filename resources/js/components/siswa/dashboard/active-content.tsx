import { Loading } from "@/components/loading-screen";
import { useLoading } from "@/contexts/loading-context";
import { useLogger } from "@/contexts/logger-context";
import AppLayout from "@/Layout/AppLayout";
import { router } from "@inertiajs/react";
import React, { JSX, useCallback, useEffect, useMemo } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { toast } from "react-toastify";

interface MenuItem {
    title: string;
    tab: string;
    icon: JSX.Element;
    color: string;
    content: JSX.Element;
}

interface ActiveContentProps {
    nouid: string;
    activeItem: number | null;
    menuItems: MenuItem[];
    onBack: () => void;
}

export type TabState = 'tagihan' | 'siswa' | 'kegiatan';

const ActiveContent: React.FC<ActiveContentProps> = ({
    nouid,
    activeItem,
    menuItems,
    onBack
}) => {
    const { loading, setLoading } = useLoading();
    const { error: logError } = useLogger();

    // Memoize params untuk menghindari recreating object pada setiap render
    const params = useMemo(() => ({
        nouid: nouid,
        page: "index",
        tab: activeItem !== null ? menuItems[activeItem].tab : ''
    }), [nouid, activeItem, menuItems]);

    const fetchData = useCallback(
        async (load = true) => {
            try {
                await router.visit(
                    route('siswa.index', params),
                    {
                        except:['auth', 'ziggy'],
                        preserveState: true,
                        preserveScroll: true,
                        onStart: () => load && setLoading(true),
                        onError: () => {
                            toast.error('Terjadi Kesalahan')
                            onBack()
                            setLoading(false);
                        },
                        onFinish: () => load && setLoading(false)
                    }
                );
            } catch (err) {
                logError(err instanceof Error ? err.message : 'Terjadi kesalahan jaringan');
                setLoading(false);
            }
        },
        [params, setLoading, logError, onBack]
    );

    // Efek untuk fetch data ketika activeItem berubah
    useEffect(() => {
        if (activeItem === null) {
            setLoading(false);
            return;
        }

        const loadData = async () => {
            await fetchData();
        };

        loadData();
    }, [activeItem, setLoading]);

    // Early return jika tidak ada item aktif
    if (activeItem === null) {
        return null;
    }

    const item = menuItems[activeItem];
    if (!item?.content) {
        return (
            <div className="p-4 text-center text-red-500">
                Konten tidak tersedia
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            {loading ? (
                <Loading variant="overlay" />
            ) : (
                <AppLayout title={item?.title || 'MAI'}>
                    <div className="flex flex-col min-h-screen rounded-lg bg-white shadow-md">
                        {/* Header */}
                        <div className="flex-shrink-0 flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground">
                            <button
                                onClick={onBack}
                                className="flex items-center space-x-2 transition-opacity hover:opacity-80 cursor-pointer"
                                aria-label="Kembali"
                            >
                                <FaArrowAltCircleLeft className="text-primary-foreground" />
                                <span>Kembali</span>
                            </button>
                            <h1 className="text-2xl font-bold text-white">{item.title}</h1>
                        </div>

                        {/* Content Area - Scrollable */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-4 h-full">
                                {item.content}
                            </div>
                        </div>
                    </div>
                </AppLayout>
            )}
        </div>
    );
};

export default React.memo(ActiveContent);