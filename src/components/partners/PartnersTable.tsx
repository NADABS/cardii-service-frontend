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

interface Props {
    showHeader?: boolean;
    partners: Partner[];
    meta: IMeta | [];
    onFilterChange?: (filters: FilterType) => void;
    handlePageChange?: (page: string | number) => void;
    handleClearFilters?: () => void;
}

const PartnersTable = ({
                           showHeader = true,
                           partners,
                           meta,
                           onFilterChange = () => {},
                           handlePageChange,
                           handleClearFilters = () => {},
                       }: Props) => {

    const searchParams = useSearchParams();
    const filtersParam = searchParams.get("filters");

    let inputValue: string | undefined;

    inputValue = parseFilters(filtersParam) ?? "";

    const router = useRouter();

    const selectedColumnInitialState = {
        columnValue: "",
        columnName: "",
        operator: "",
    };

    const [selectedColumn, setSelectedColumn] = useState(selectedColumnInitialState);
    const [searchText, setSearchText] = useState(inputValue ?? "");
    const [selectValue, setSelectValue] = useState("");

    const searchColumns: ColumnType[] = [
        { columnName: "Name", columnValue: "name", operator: "LIKE" },
        { columnName: "Phone Number", columnValue: "phoneNumber", operator: "LIKE" },
        { columnName: "Email", columnValue: "email", operator: "LIKE" },
        { columnName: "Status", columnValue: "status", operator: "=" },
    ];

    const tableColumns = [
        { header: "Full Name", accessor: "name" as const },
        { header: "Email", accessor: "email" as const },
        { header: "Phone Number", accessor: "phoneNumber" as const },
        {
            header: "Status",
            accessor: "status" as const,
            cell: (row: Partner) => <StatusBadge status={row.status} />,
        },
        { header: "Date Registered", accessor: "createdAt" as const },
    ];

    const rowActions = (partner: Partner) => (
        <button
            onClick={() => router.push(`/partners/${partner.externalId}`)}
            className="text-gray-400 font-bold"
        >
            <BsThreeDots className="h-4 w-4" />
        </button>
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedColumn?.columnValue) return;
        onFilterChange({
            field: selectedColumn.columnValue,
            value: event.target.value,
            operator: selectedColumn.operator,
        });
    };

    const handleColumnChange = (columnValue: string) => {
        setSelectValue(columnValue);
        const currentColumn = searchColumns.find(
            (column) => column.columnValue === columnValue,
        ) as ColumnType;
        setSelectedColumn(currentColumn);

        if (searchText.length > 0) {
            onFilterChange({
                field: currentColumn.columnValue,
                value: searchText,
                operator: currentColumn.operator,
            });
        }
    };

    const onClearFilters = () => {
        setSelectedColumn(selectedColumnInitialState);
        setSearchText("");
        setSelectValue("");
        handleClearFilters();
    };

    return (
        <ReusableTable
            columns={tableColumns}
            data={partners}
            meta={meta}
            rowActions={rowActions}
            onPageChange={handlePageChange}
            searchable={false}
            cardHeaderData={
                showHeader && (
                    <div className="flex flex-col items-left">
                        <h2 className="text-lg text-textColor-150 font-bold">Partners</h2>
                        <FilterComponent handleInputChange={handleInputChange} searchText={searchText}
                                         setSearchText={setSearchText} selectValue={selectValue}
                                         handleColumnChange={handleColumnChange} searchColumns={searchColumns}
                                         onClearFilters={onClearFilters}
                        />
                    </div>
                )
            }
        />
    );
};

export default PartnersTable;