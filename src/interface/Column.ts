import React from "react";

export interface Column<T> {
    header: string;
    accessor: (row: T) => React.ReactNode;
    className?: string;
}
