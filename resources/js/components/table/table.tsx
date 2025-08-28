import React from 'react'
import { Badge } from '../ui/badge';

interface TableProps {
    title: string;
    badgeRender?: React.ReactNode;
    badge?: boolean;
    dataLength?: number;
    subtext?: string;
    th: string[];
    data: Array<Record<string, string | number | boolean | null | undefined>>;
    renderRow?: (item: Record<string, string | number | boolean | null | undefined>, index: number) => React.ReactNode;
    footer?: React.ReactNode;
}

interface TableHeaderProps {
    badgeRender?: React.ReactNode;
    title: string;
    badge?: boolean;
    dataLength?: number;
    subtext?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({
    title,
    badge = false,
    badgeRender,
    dataLength = 0,
    subtext
}) => {
    return (
        <div className="flex items-center justify-between">
            <h2 className="mb-4 text-lg font-semibold">{title}</h2>
            {badge && (
                badgeRender ? (
                    badgeRender
                ) : (
                    <Badge>
                        {dataLength} {subtext}
                    </Badge>
                )

            )}
        </div >
    )
}

const TableFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="border-t pt-4">
            {children}
        </div>
    )
}

// Default row renderer for simple data display
const defaultRowRenderer = (item: Record<string, string | number | boolean | null | undefined>, index: number) => {
    const values = Object.values(item);
    return (
        <tr key={index}>
            {values.map((value, cellIndex) => (
                <td key={cellIndex} className="p-2 text-sm whitespace-nowrap text-gray-900">
                    {String(value || '')}
                </td>
            ))}
        </tr>
    );
};

const Table: React.FC<TableProps> = ({
    title,
    badgeRender,
    badge = false,
    dataLength,
    subtext,
    th = [],
    data = [],
    renderRow = defaultRowRenderer,
    footer
}) => {
    return (
        <div className="overflow-hidden rounded-lg border shadow-sm">
            <div className="bg-white p-4">
                <TableHeader
                    title={title}
                    dataLength={dataLength}
                    subtext={subtext}
                    badgeRender={badgeRender}
                    badge={badge}
                />
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {th.map((item, index) => (
                                    <th
                                        key={index}
                                        className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                    >
                                        {item}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {data?.map((item, idx) => renderRow(item, idx))}
                        </tbody>
                    </table>
                </div>

                {footer && <TableFooter>{footer}</TableFooter>}
            </div>
        </div>
    )
}

export default Table