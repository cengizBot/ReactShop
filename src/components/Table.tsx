import {JSX, ReactNode} from "react";

interface Column<T> {
    header: string;
    accessor: (row: T) => ReactNode;
    className?: string;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    footer?: ReactNode;
    minWidth?: string; // ex: "600px"
}

export function Table<T>({columns, data, footer, minWidth = "600px"}: TableProps<T>): JSX.Element {
    return (
        <div className="overflow-x-auto">
            <table className={`w-full border-collapse`} style={{minWidth}}>
                <thead>
                <tr className="border-b">
                    {columns.map((col, idx) => (
                        <th key={idx} className={`text-left py-2 capitalize ${col.className || ""}`}>
                            {col.header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, idx) => (
                    <tr key={idx} className="border-b">
                        {columns.map((col, cIdx) => (
                            <td key={cIdx} className={`py-2 ${col.className || ""}`}>
                                {col.accessor(row)}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
                {footer && <tfoot>{footer}</tfoot>}
            </table>
        </div>
    );
}
