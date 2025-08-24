import React from "react";
import AppLayout from "@/Layout/AppLayout";
import { FaArrowAltCircleLeft } from "react-icons/fa";

interface MenuLayoutProps {
    title?: string;
    onBack?: () => void;
    children: React.ReactNode;
}

const MenuLayout: React.FC<MenuLayoutProps> = ({
    title,
    onBack = () => window.history.back(),
    children
}) => (
    <div className="fixed inset-0 z-10 overflow-y-auto">
        <AppLayout title={title ?? ""}>
            <div className="flex flex-col min-h-screen bg-white shadow-md">
                {/* Header */}
                <div className="bg-primary px-4 py-4 text-primary-foreground flex items-center justify-between">
                    <button onClick={onBack} className="flex items-center gap-2 cursor-pointer">
                        <FaArrowAltCircleLeft />
                        <span>Kembali</span>
                    </button>
                    <h1 className="text-2xl font-bold">{title ?? ""}</h1>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-4">
                    {children}
                </div>
            </div>
        </AppLayout>
    </div>
);

export default React.memo(MenuLayout);