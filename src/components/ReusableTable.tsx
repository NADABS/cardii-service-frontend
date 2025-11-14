"use client";
import React, {useMemo, useState} from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableFooter,
    TableCaption,
} from "@/components/ui/table";
import {Input} from "@/components/ui/input";

import {ArrowUpDown, Search, SlidersHorizontal} from "lucide-react";
import {twMerge} from "tailwind-merge";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import IMeta from "@/src/types/Meta";
import Pagination from "@/src/components/Pagination";
import {Button} from "@/components/ui/button";

export type Column<T> = {
    header: string;
    accessor: keyof T;
    cell?: (row: T) => React.ReactNode;
    align?: "left" | "center" | "right";
    width?: string;
    headClassName?: string;
    cellClassName?: string;
};

export type DataTableProps<T> = {
    title?: string
    columns: Column<T>[];
    data: T[];
    emptyState?: React.ReactNode;
    searchable?: boolean;
    filterable?: boolean;
    sortable?: boolean;
    onPageChange?: (page: number | string) => void;
    onPerPageChange?: (perPage: number | string) => void;
    rowActions?: (row: T) => React.ReactNode;
    footer?: React.ReactNode;
    meta?: IMeta | [];
    cardHeaderClassName?: string;
    tableHeaderClassName?: string;
    tableCellClassName?: string;
    showHeadersRow?: boolean;
    headerRight?: React.ReactNode;
};

export function ReusableTable<T extends Record<string, any>>({
                                                                 title,
                                                                 columns,
                                                                 data,
                                                                 emptyState = (
                                                                     <div
                                                                         className="text-center py-4 text-sm text-muted-foreground">
                                                                         No records found.
                                                                     </div>
                                                                 ),
                                                                 searchable = false,
                                                                 filterable = false,
                                                                 sortable = false,
                                                                 onPageChange,
                                                                 onPerPageChange,
                                                                 rowActions,
                                                                 footer,
                                                                 meta,
                                                                 headerRight,
                                                                 tableHeaderClassName,
                                                                 tableCellClassName,
                                                                 showHeadersRow = true
                                                             }: DataTableProps<T>) {
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        if (!searchable || !query) return data;
        const q = query.toLowerCase();
        return data.filter((row) =>
            columns.some((col) => {
                const val = row[col.accessor];
                return typeof val === "string" && val.toLowerCase().includes(q);
            })
        );
    }, [data, query, searchable, columns]);

    return (
        <div className="h-full flex flex-col">
            <Card className="shadow-none border-none rounded-none gap-0 flex flex-col flex-grow p-0">
                <div className={`flex ${title ? "justify-between" : "justify-start"} items-center mt-3`}>
                    {title && <CardTitle className="pb-2 px-0 font-bold ">{title}</CardTitle>}

                    <div className="flex items-center gap-2 mb-4">
                        {searchable && <div className="max-w-sm relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4"/>
                            <Input
                                className="pl-8 h-8"
                                placeholder="Search…"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>}

                        {filterable && <Button variant="ghost" size="sm" className="gap-2 h-9 border">
                            <SlidersHorizontal className="h-4 w-4"/> Filters
                        </Button>}

                        {filterable && <Button variant="ghost" size="sm" className="gap-2 h-9 border">
                            <SlidersHorizontal className="h-4 w-4"/> Filters
                        </Button>}

                        {headerRight}
                    </div>
                </div>

                <Table>
                    {showHeadersRow && (
                        <TableHeader>
                            <TableRow>
                                {columns.map((col) => (
                                    <TableHead
                                        key={String(col.accessor)}
                                        style={{width: col.width}}
                                        className={twMerge(
                                            `text-${col.align ?? "left"} border-b border-borderprimary`,
                                            tableHeaderClassName,
                                            col.headClassName
                                        )}
                                    >
                                        {col.header}
                                    </TableHead>
                                ))}
                                {rowActions && (
                                    <TableHead className="text-center border-b border-borderprimary"/>
                                )}
                            </TableRow>
                        </TableHeader>
                    )}

                    <TableBody>
                        {filtered.length ? (
                            filtered.map((row, i) => (
                                <TableRow key={i} className="text-xs 2xl:text-sm">
                                    {columns.map((col) => (
                                        <TableCell
                                            key={String(col.accessor)}
                                            className={twMerge(
                                                `text-${
                                                    col.align ?? "left"
                                                } border-b border-borderprimary`,
                                                tableCellClassName,
                                                col.cellClassName
                                            )}
                                        >
                                            {col.cell
                                                ? col.cell(row)
                                                : String(row[col.accessor] ?? "")}
                                        </TableCell>
                                    ))}
                                    {rowActions && (
                                        <TableCell className="text-center border-b border-borderprimary">
                                            {rowActions(row)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={
                                        showHeadersRow
                                            ? columns.length + (rowActions ? 1 : 0)
                                            : 1
                                    }
                                    className="text-center py-4"
                                >
                                    {emptyState}
                                </TableCell>

                            </TableRow>
                        )}
                    </TableBody>

                    {footer && <TableFooter>{footer}</TableFooter>}
                </Table>
            </Card>

            {onPageChange && meta && !Array.isArray(meta) && (
                <div className="flex justify-center mt-auto">
                    <Pagination meta={meta as IMeta} onPageChange={onPageChange} onPerPageChange={onPerPageChange}/>
                </div>
            )}
        </div>
    );
}