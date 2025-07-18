import DOMPurify from 'dompurify';
import { JSX } from 'react';

interface SnkContentItem {
    label?: string;
    description?: string;
    items?: SnkContentItem[];
}

interface SnkContent {
    intro?: string;
    title: string;
    items: SnkContentItem[];
}

interface SnkPoint {
    title: string;
    nmr: number;
    content: SnkContent;
}

interface Props {
    points: SnkPoint[];
    ortu?: string;
    siswa?: string;
}

export default function SnkViewer({ points, ortu, siswa }: Props) {
    const getListStyle = (level: number): string => {
        switch (level) {
            case 0:
                return 'list-[upper-alpha]';
            case 1:
                return 'list-[lower-alpha]';
            case 2:
                return 'list-[lower-roman]';
            case 3:
                return 'list-decimal';
            default:
                return 'list-disc';
        }
    };

    const replacePlaceholders = (text: string, ortu: string, siswa: string) => {
        return text
            .replace(/{{\s*nama_ortu\s*}}/g, `<strong>[ ${ortu} ]</strong>`)
            .replace(/{{\s*nama_siswa\s*}}/g, `<strong>[ ${siswa} ]</strong>`);
    };

    const renderItems = (items: SnkContentItem[], level = 1): JSX.Element => {
        const ListTag = 'ol'; // Tetap pakai <ol> agar urutannya jelas
        const listStyle = getListStyle(level);

        return (
            <ListTag className={`text-sm pl-6 ${listStyle} list-outside`}>
                {items.map((item, index) => (
                    <li key={index} className="mb-2">
                        {item.label && (
                            <strong className="font-medium text-blue-800">{item.label} </strong>
                        )}
                        {item.description && (
                            <span
                                className="text-sm"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        replacePlaceholders(item.description || '', ortu ?? '', siswa ?? '')
                                    ),
                                }}
                            />
                        )}
                        {item.items && renderItems(item.items, level + 1)}
                    </li>
                ))}
            </ListTag>
        );
    };
    return (
        <div className="space-y-8">
            {points.map((point, index) => (
                <div key={index} className="border-b pb-6 last:border-b-0">
                    <h2 className="text-md font-bold mb-4 text-blue-500">
                        {String.fromCharCode(65 + index)}. {point.title}
                    </h2>
                    {point.content.intro && (
                        <p
                            className="mb-4 text-sm"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(point.content.intro),
                            }}
                        />
                    )}
                    {renderItems(point.content.items, 1)}
                </div>
            ))}
        </div>
    );
}
