"use client";
import React, {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {ReusableTable} from "@/src/components/ReusableTable";
import IMeta from "@/src/types/Meta";
import {BsThreeDots} from "react-icons/bs";
import StatusBadge from "@/src/components/StatusBadge";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CiFilter} from "react-icons/ci";
import Partner from "@/src/types/Partner";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import ColumnType from "@/src/types/ColumnType";
import FilterType from "@/src/types/FilterType";
import {parseFilters} from "@/src/lib/utils";
import FilterComponent from "@/src/components/FilterComponent";
import {CustomModal} from "@/src/components/CustomModal";
import InviteUserForm from "@/src/components/users/InviteUserForm";

interface Props {
    partners: Partner[];
    meta: IMeta | [];
    onFilterChange?: (filters: FilterType) => void;
    handlePageChange?: (page: string | number) => void;
    handlePerPageChange?: (perPage: string | number) => void;
    handleClearFilters?: () => void;
}

const PartnersTable = ({
                           partners,
                           meta,
                           handlePageChange,
                           handleClearFilters = () => {
                           },
                       }: Props) => {

    const router = useRouter();

    const tableColumns = [
        {header: "Full Name", accessor: "name" as const},
        {header: "Email", accessor: "email" as const},
        {header: "Phone Number", accessor: "phoneNumber" as const},
        {
            header: "Status",
            accessor: "status" as const,
            cell: (row: Partner) => <StatusBadge status={row.status}/>,
        },
        {header: "Date Registered", accessor: "createdAt" as const},
    ];

    const rowActions = (partner: Partner) => (
        <button
            onClick={() => router.push(`/partners/${partner.externalId}`)}
            className="text-gray-400 font-bold cursor-pointer"
        >
            <BsThreeDots className="h-4 w-4"/>
        </button>
    );

    const onClearFilters = () => {
        handleClearFilters();
    };

    return (
        <div className="overflow-y-auto" style={{maxHeight: "95vh"}}>
            <ReusableTable
                title={"Partners"}
                columns={tableColumns}
                data={partners}
                meta={meta}
                rowActions={rowActions}
                onPageChange={handlePageChange}
                onPerPageChange={handlePageChange}
                searchable={true}
            />
        </div>
    );
};

export default PartnersTable;