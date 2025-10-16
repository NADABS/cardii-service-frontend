"use client";
import React, { useMemo, useState } from "react";
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
import { Input } from "@/components/ui/input";

import { Info, Search } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import IMeta from "@/src/types/Meta";
import Pagination from "@/src/components/Pagination";

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
    caption?: string;
    columns: Column<T>[];
    data: T[];
    emptyState?: React.ReactNode;
    searchable?: boolean;
    pageSize?: number;
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number | string) => void;
    rowActions?: (row: T) => React.ReactNode;
    footer?: React.ReactNode;
    meta: IMeta;
    cardHeaderClassName?: string;
    cardHeaderData?: React.ReactNode;
    tableHeaderClassName?: string;
    tableCellClassName?: string;
    showHeadersRow?: boolean;
};

export function ReusableTable<T extends Record<string, any>>({
                                                             caption,
                                                             columns,
                                                             data,
                                                             emptyState = (
                                                                 <div className="text-center py-4 text-sm text-muted-foreground">
                                                                     No records found.
                                                                 </div>
                                                             ),
                                                             searchable = false,
                                                             totalPages,
                                                             onPageChange,
                                                             rowActions,
                                                             footer,
                                                             meta,
                                                             cardHeaderData,
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
            <Card className="shadow-none border-none rounded-none flex flex-col flex-grow p-0">
                {cardHeaderData && (
                    <CardHeader className="pb-2 px-0 font-bold ">{cardHeaderData}</CardHeader>
                )}

                {searchable && (
                    <div className="mb-4 max-w-sm relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                        <Input
                            className="pl-10"
                            placeholder="Search…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                )}
                <Table className="">
                    {caption && <TableCaption>{caption}</TableCaption>}

                    { showHeadersRow && (
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

            {onPageChange && (
                <div className="flex justify-center mt-auto">
                    <Pagination meta={meta} loadPage={onPageChange} />
                </div>
            )}
        </div>
    );
}