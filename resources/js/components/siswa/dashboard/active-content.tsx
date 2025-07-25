import AppLayout from "@/Layout/AppLayout";
import React, { JSX } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const ActiveContent: React.FC<{ activeItem: number | null; menuItems: Array<{ title: string, content: JSX.Element }>; onBack: () => void; }> = ({ activeItem, menuItems, onBack }) => {
    if (activeItem === null) return null;

    const item = menuItems[activeItem];
    if (!item?.content) return <div>Konten tidak tersedia</div>;

    return (
        <AppLayout title={item?.title || 'MAI'}>
            <div className="min-h-screen overflow-hidden rounded-lg bg-white shadow-md">
                <div className="flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground">
                    <button
                        onClick={onBack}
                        className="flex items-center space-x-2 transition-opacity hover:opacity-80"
                        aria-label="Kembali"
                    >
                        <FaArrowAltCircleLeft className="text-primary-foreground" />
                        <span>Kembali</span>
                    </button>
                    <h1 className="text-2xl font-bold text-white">{item?.title}</h1>
                </div>
                {item.content}
            </div>
        </AppLayout>
    );
};
export default ActiveContent;