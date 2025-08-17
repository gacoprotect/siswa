import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

interface SelectGroupOption {
    label: string;
    options: SelectOption[];
}

interface SelectInputProps {
    name: string;
    id?: string;
    label?: string;
    value?: string | number;
    defaultValue?: string | number;
    onChange?: (value: string) => void;
    options: SelectOption[] | SelectGroupOption[];
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    errors?: Record<string, string>;
    className?: string;
    triggerClassName?: string;
    contentClassName?: string;
    allowEmpty?: boolean;
}

const SelectInput = React.forwardRef<HTMLButtonElement, SelectInputProps>(
    (
        {
            name,
            id = name,
            label,
            value,
            defaultValue,
            onChange,
            options,
            placeholder = "Select an option",
            disabled = false,
            required = false,
            errors,
            className = "",
            triggerClassName = "",
            contentClassName = "",
        },
        ref
    ) => {
        const hasGroups = React.useMemo(() => {
            return options.some((option) => "options" in option);
        }, [options]);

        // Cari label berdasarkan value
        const findLabelByValue = (val: string | number) => {
            if (val === "" || val === undefined || val === null) return null;

            const flatOptions = hasGroups
                ? (options as SelectGroupOption[]).flatMap(group => group.options)
                : (options as SelectOption[]);

            const found = flatOptions.find(opt => String(opt.value) === String(val));
            return found ? found.label : null;
        };

        // Handle perubahan nilai
        const handleValueChange = (val: string) => {
            onChange?.(val);
        };

        // Render opsi
        const renderOptions = () => {
            if (hasGroups) {
                return (options as SelectGroupOption[]).map((group, groupIndex) => (
                    <SelectGroup key={`group-${groupIndex}`}>
                        {group.label && <SelectLabel>{group.label}</SelectLabel>}
                        {group.options.map((option) => (
                            <SelectItem
                                className="text-sm"
                                key={`${groupIndex}-${option.value}`}
                                value={String(option.value)}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                ));
            } else {
                return (
                    <SelectGroup>
                        {(options as SelectOption[]).map((option) => (
                            <SelectItem
                                className="text-sm"
                                key={String(option.value)}
                                value={String(option.value)}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                );
            }
        };

        return (
            <div id={id} className={cn("text-sm flex flex-col gap-1", className)}>
                {label && (
                    <Label htmlFor={id}>
                        {label}
                        {required && <span className="text-destructive"> *</span>}
                    </Label>
                )}

                <Select
                    value={value !== undefined && value !== null ? String(value) : undefined}
                    defaultValue={defaultValue !== undefined && defaultValue !== null ? String(defaultValue) : undefined}
                    onValueChange={handleValueChange}
                    disabled={disabled}
                    required={required}
                    name={name}
                >
                    <SelectTrigger
                        ref={ref}
                        id={id}
                        className={cn("w-full", triggerClassName, errors?.[name] && "border-destructive")}
                        aria-invalid={!!errors?.[name]}
                        aria-required={required}
                    >
                        <SelectValue placeholder={placeholder}>
                            {(value !== undefined && value !== null && value !== "" && findLabelByValue(value)) ?? placeholder}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent className={contentClassName}>
                        {renderOptions()}
                    </SelectContent>
                </Select>

                {errors?.[name] && (
                    <p className="flex items-center gap-2 text-xs text-destructive mt-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors[name]}
                    </p>
                )}
            </div>
        );
    }
);

SelectInput.displayName = "SelectInput";

export { SelectInput };
export type { SelectInputProps, SelectOption, SelectGroupOption };