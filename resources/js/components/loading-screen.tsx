import clsx from "clsx";
import { FaSpinner } from "react-icons/fa";

export const Loading: React.FC<{
    text?: string;
    variant?: "full" | "overlay";
}> = ({ text = "Loading", variant = "full" }) => {

    return (
        <div
            className={clsx(
                "flex justify-center items-center flex-col z-50",
                variant === "full" && "h-screen bg-white",
                variant === "overlay" &&
                "fixed inset-0 bg-black/50 backdrop-blur-sm"
            )}
        >
            <FaSpinner className="animate-spin text-3xl text-blue-500" />
            {/* {variant === "full" && ( */}
            <div className="relative">
                <div className="bg-gradient-to-b from-blue-200 to-blue-600 bg-clip-text text-2xl font-bold tracking-wider text-transparent">
                    {text}
                </div>
                <div className="animate-loading-line absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-blue-200 to-blue-600" />
            </div>
            {/* )} */}
        </div>
    );
};
