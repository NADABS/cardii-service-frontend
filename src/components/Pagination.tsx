'use client'

import {ChevronLeft, ChevronRight} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {cn} from '@/lib/utils'
import {ApiMeta} from "@/src/types/ApiType";

export interface PaginationProps {
    meta: ApiMeta
    onPageChange: (page: number) => void
    onPerPageChange?: (perPage: number) => void
}

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100]

export default function Pagination({meta, onPageChange, onPerPageChange}: PaginationProps) {
    const currentPage = meta.currentPage
    const totalPages = meta.lastPage
    const perPage = meta.perPage
    const totalItems = meta.total

    if (totalItems === 0) return null

    const startIndex = (currentPage - 1) * perPage + 1
    const endIndex = Math.min(currentPage * perPage, totalItems)

    const handlePageChange = (page: number) => {
        if (page >= meta.firstPage && page <= meta.lastPage) {
            onPageChange(page)
        }
    }

    const handlePerPageChange = (value: number) => {
        onPerPageChange?.(value)
        onPageChange(1)
    }

    return (
        <div className="w-full flex items-center justify-between gap-4 border-t border-border pt-4 mt-6">

            {/* Page Count */}
            <div className="text-sm text-muted-foreground">
                {startIndex}-{endIndex} of {totalItems}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">

                {/* Per Page Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            {perPage} per page
                            <ChevronLeft className="h-4 w-4 rotate-90"/>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        {ITEMS_PER_PAGE_OPTIONS.map(option => (
                            <DropdownMenuItem
                                key={option}
                                onClick={() => handlePerPageChange(option)}
                                className={cn(perPage === option && 'bg-muted')}
                            >
                                {option} per page
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Pagination Buttons */}
                <div className="flex items-center gap-2">

                    {/* Prev */}
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={!meta.prevPageUrl}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="h-8 w-8 p-0"
                    >
                        <ChevronLeft className="h-4 w-4"/>
                    </Button>

                    {/* Page numbers */}
                    <div className="flex items-center gap-1">
                        {Array.from({length: totalPages}, (_, index) => index + 1)
                            .slice(
                                Math.max(0, currentPage - 3),
                                Math.min(totalPages, currentPage + 2)
                            )
                            .map(page => (
                                <Button
                                    key={page}
                                    variant={page === currentPage ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => handlePageChange(page)}
                                    className="h-8 w-8 p-0"
                                >
                                    {page}
                                </Button>
                            ))}

                        {currentPage < totalPages - 2 && (
                            <span className="px-2 text-muted-foreground">...</span>
                        )}
                    </div>

                    {/* Next */}
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={!meta.nextPageUrl}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="h-8 w-8 p-0"
                    >
                        <ChevronRight className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </div>
    )
}