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
    value: string;
    label: string;
    disabled?: boolean;
}

interface SelectGroupOption {
    label: string;
    options: SelectOption[];
}

interface SelectInputProps {
    name: string;
    id: string;
    label?: string;
    value?: string;
    defaultValue?: string;
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
            id,
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
            allowEmpty = false,
        },
        ref
    ) => {
        const hasGroups = options.some(
            (option) => "options" in option && Array.isArray((option as SelectGroupOption).options)
        );

        const safeValue = value === "" ? "__placeholder__" : value;

        const handleValueChange = (val: string) => {
            onChange?.(val === "__placeholder__" ? "" : val);
        };

        const renderGroupOptions = (group: SelectGroupOption, groupIndex: number) => (
            <SelectGroup key={`group-${groupIndex}`}>
                {group.label && <SelectLabel>{group.label}</SelectLabel>}
                {group.options
                    .filter((opt) => opt.value !== "")
                    .map((option) => (
                        <SelectItem className="text-sm" key={`${groupIndex}-${option.value}`} value={option.value} disabled={option.disabled}>
                            {option.label}
                        </SelectItem>
                    ))}
            </SelectGroup>
        );

        const renderFlatOptions = (opts: SelectOption[]) => (
            <SelectGroup>
                {allowEmpty && (
                    <SelectItem
                        key="__placeholder__"
                        value="__placeholder__"
                        disabled
                        className="text-sm hidden"
                    >
                        {placeholder}
                    </SelectItem>
                )}
                {opts
                    .filter((opt) => opt.value !== "")
                    .map((option) => (
                        <SelectItem className="text-sm" key={option.value} value={option.value} disabled={option.disabled}>
                            {option.label}
                        </SelectItem>
                    ))}
            </SelectGroup>
        );

        return (
            <div id={name ?? id} className={cn("text-sm flex flex-col gap-2", className)}>
                {label && (
                    <Label htmlFor={id}>
                        {label}
                        {required && <span className="text-destructive"> *</span>}
                    </Label>
                )}

                <Select
                    value={safeValue}
                    defaultValue={defaultValue}
                    onValueChange={handleValueChange}
                    disabled={disabled}
                    required={required}
                >
                    <SelectTrigger
                        ref={ref}
                        id={id}
                        className={cn("w-full", triggerClassName, errors?.[name] && "border-destructive")}
                    >
                        <SelectValue placeholder={placeholder}>
                            {value === "" ? placeholder : undefined}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent className={contentClassName}>
                        {hasGroups
                            ? (options as SelectGroupOption[]).map(renderGroupOptions)
                            : renderFlatOptions(options as SelectOption[])}
                    </SelectContent>
                </Select>

                {errors?.[name] && (
                    <p className="flex items-center gap-2 text-xs text-red-500 mt-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors?.[name]}
                    </p>
                )}
                {name && <input type="hidden" name={name} value={value ?? ""} />}

            </div>
        );
    }
);

SelectInput.displayName = "SelectInput";

export { SelectInput };
export type { SelectInputProps, SelectOption, SelectGroupOption };
