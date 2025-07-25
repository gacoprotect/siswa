import React, { JSX } from "react";


interface PropsComponent {
    menuItems: Array<{ title: string, icon: JSX.Element, color: string }>;
    onItemClick: (index: number) => void;
}
const MenuItems: React.FC<PropsComponent> = ({ menuItems, onItemClick }) => (
    <div className="mb-6 grid grid-cols-3 gap-4 px-4 sm:grid-cols-5">
        {menuItems.map((item, index) => (
            <button
                key={index}
                className={`flex flex-col items-center justify-center rounded-xl border border-t-5 p-2 transition duration-200 ${item.color}`}
                onClick={() => onItemClick(index)}
            >
                {item.icon}
                <span className="mt-2 text-center text-sm font-semibold text-gray-800">{item.title}</span>
            </button>
        ))}
    </div>
);
export default MenuItems;
