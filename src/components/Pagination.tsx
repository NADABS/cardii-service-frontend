"use client";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import IMeta from "@/src/types/Meta";

interface Prop {
    meta: IMeta;
    loadPage: (page: number | string) => void;
}

const Pagination: React.FC<Prop> = ({ meta, loadPage }) => {
    const { currentPage, lastPage, total, perPage } = meta;

    const getFirstIndex = () => {
        return (currentPage - 1) * perPage + 1;
    };

    const getLastIndex = () => {
        const lastIndex = perPage * currentPage;
        return lastIndex > total ? total : lastIndex;
    };

    const getPageRange = () => {
        const range = 2;
        let start = Math.max(1, currentPage - range);
        let end = Math.min(lastPage, currentPage + range);

        if (currentPage - range < 1) {
            end = Math.min(lastPage, end + (range - (currentPage - 1)));
        }
        if (currentPage + range > lastPage) {
            start = Math.max(1, start - (range - (lastPage - currentPage)));
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <div className="w-full flex justify-between items-center">
            <div className="font-[500] text-[#707070]">Showing {getFirstIndex()}-{getLastIndex()}</div>
            <div className="w-fit text-[#050505] p-2 flex items-center justify-center bg-white rounded-lg">
                <div className="mr-3 flex justify-center items-center">
                    {currentPage > 1 && (
                        <button onClick={() => loadPage("prev")}>
                            <FaChevronLeft/>
                        </button>
                    )}
                </div>
                <div className="flex text-lg mr-3 justify-center items-center">
                    {getPageRange().map((page) => (
                        <button
                            key={page}
                            className={`mx-3 rounded ${
                                page === currentPage ? "text-primary font-bold" : ""
                            }`}
                            onClick={() => loadPage(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <div className="flex justify-center items-center">
                    {currentPage !== lastPage && (
                        <button onClick={() => loadPage("next")}>
                            <FaChevronRight/>
                        </button>
                    )}
                </div>
            </div>
            <div className="font-[500] text-[#707070]">{total} Records</div>
        </div>
    );
};

export default Pagination;