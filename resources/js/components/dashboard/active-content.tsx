import { Loading } from "@/components/loading-screen";
import { useLoading } from "@/contexts/loading-context";
import AppLayout from "@/Layout/AppLayout";
import { router } from "@inertiajs/react";
import React, { JSX, useCallback, useEffect } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";


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

const ActiveContent: React.FC<ActiveContentProps> = ({ 
    nouid, 
    activeItem, 
    menuItems, 
    onBack 
}) => {
    const { loading, setLoading } = useLoading();
    const currentTab = activeItem !== null ? menuItems[activeItem]?.tab : null;

    const fetchData = useCallback(async () => {
        if (!currentTab) return;

        try {
            setLoading(true);
            await router.visit(route('siswa.index', { 
                nouid, 
                page: "index", 
                tab: currentTab 
            }), {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setLoading(false)
            });
        } catch (error) {
            setLoading(false);
            console.error("Fetch error:", error);
        }
    }, [currentTab, nouid, setLoading]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (activeItem === null) return null;

    const currentItem = menuItems[activeItem];
    if (!currentItem?.content) {
        return <div className="p-4 text-red-500">Konten tidak tersedia</div>;
    }

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            {loading ? (
                <Loading variant="overlay" />
            ) : (
                <AppLayout title={currentItem.title}>
                    <div className="flex flex-col min-h-screen bg-white shadow-md">
                        {/* Header */}
                        <div className="bg-primary px-4 py-4 text-primary-foreground flex items-center justify-between">
                            <button onClick={onBack} className="flex items-center gap-2">
                                <FaArrowAltCircleLeft />
                                <span>Kembali</span>
                            </button>
                            <h1 className="text-2xl font-bold">{currentItem.title}</h1>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 overflow-auto p-4">
                            {React.cloneElement(currentItem.content, { key: currentTab })}
                        </div>
                    </div>
                </AppLayout>
            )}
        </div>
    );
};

export default React.memo(ActiveContent);