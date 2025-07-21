import { CheckCircle, XCircle, ShieldOff } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusCardProps = {
    variant: "success" | "error" | "blocked";
    title: string;
    description: string | React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
};

export const StatusCard = ({
    variant,
    title,
    description,
    icon,
    className,
}: StatusCardProps) => {
    // Default icons for each variant
    const defaultIcons = {
        success: <CheckCircle className="h-10 w-10 text-green-500" />,
        error: <XCircle className="h-10 w-10 text-red-500" />,
        blocked: <ShieldOff className="h-10 w-10 text-red-500" />,
    };

    // Variant-based styles
    const variantStyles = {
        success: {
            container: "border-blue-200 bg-blue-50 hover:shadow-blue-200",
            text: "text-blue-600",
            description: "text-blue-700",
        },
        error: {
            container: "border-red-300 bg-red-50 hover:shadow-red-200",
            text: "text-red-600",
            description: "text-red-700",
        },
        blocked: {
            container: "border-red-400 bg-red-50",
            text: "text-red-600",
            description: "text-red-700",
        },
    };

    return (
        <div className="m-4 flex items-center justify-center">
            <div
                className={cn(
                    "relative w-full max-w-xl rounded-2xl border shadow-md transition-all duration-300",
                    variantStyles[variant].container,
                    className
                )}
            >
                <div className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4">{icon || defaultIcons[variant]}</div>
                    <h3 className={cn("mb-2 text-xl font-bold", variantStyles[variant].text)}>
                        {title}
                    </h3>
                    <div className={cn("space-y-1 text-sm", variantStyles[variant].description)}>
                        {typeof description === "string" ? <p>{description}</p> : description}
                    </div>
                </div>
            </div>
        </div>
    );
};