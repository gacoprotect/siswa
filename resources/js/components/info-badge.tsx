import { CheckCircle, Info, AlertTriangle, AlertOctagon, CircleCheck } from 'lucide-react'
import React from 'react'

type BadgeVariant = 'info' | 'warning' | 'danger' | 'success'

interface InfoBadgeProps {
    title: string
    items: string[]
    variant?: BadgeVariant
    description?: string
    showIcon?: boolean
    showItemIcons?: boolean
}

const variantStyles: Record<BadgeVariant, {
    bg: string
    border: string
    text: string
    icon: React.ComponentType<{ className?: string, size?: number }>
}> = {
    info: {
        bg: 'bg-blue-50',
        border: 'border-l-4 border-blue-500',
        text: 'text-blue-700',
        icon: Info
    },
    warning: {
        bg: 'bg-amber-50',
        border: 'border-l-4 border-amber-500',
        text: 'text-amber-700',
        icon: AlertTriangle
    },
    danger: {
        bg: 'bg-red-50',
        border: 'border-l-4 border-red-500',
        text: 'text-red-700',
        icon: AlertOctagon
    },
    success: {
        bg: 'bg-green-50',
        border: 'border-l-4 border-green-500',
        text: 'text-green-700',
        icon: CircleCheck
    }
}

const InfoBadge = ({
    title,
    items,
    variant = 'info',
    description,
    showIcon = true,
    showItemIcons = true
}: InfoBadgeProps) => {
    const { bg, border, text, icon: Icon } = variantStyles[variant]

    return (
        <div className={`${bg} ${border} ${text} p-4 rounded-lg mb-6`}>
            <div className="flex items-start gap-3">
                {showIcon && <Icon className="flex-shrink-0 mt-1" size={20} />}
                <div className="text-sm text-left flex-1">
                    <h1 className="font-semibold mb-2">{title}</h1>
                    {description && <p className="mb-3">{description}</p>}
                    {items.length > 0 && (
                        <ul className="space-y-2">
                            {items.map((item, idx) => (
                                <li key={idx} className="flex items-start">
                                    {showItemIcons && (
                                        <CheckCircle
                                            className="flex-shrink-0 mt-1 mr-2"
                                            size={16}
                                        />
                                    )}
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default InfoBadge