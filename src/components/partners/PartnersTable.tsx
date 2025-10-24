"use client";
import React, {useState} from "react";
import { useRouter } from "next/navigation";
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

interface Props {
    showHeader?: boolean;
    partners: Partner[];
    meta:  IMeta;
    onFilterChange?: (filters: FilterType) => void;
    handlePageChange?: (page: string | number) => void;
}

const PartnersTable = ({ showHeader = true, partners, meta, onFilterChange = ()=> {}, handlePageChange }: Props) => {
    const router = useRouter();

    const [selectedColumn, setSelectedColumn] = useState({
        columnValue: "",
        columnName: "",
        operator: "",
    });
    const [searchText, setSearchText] = useState("");
    const [selectValue, setSelectValue] = useState("");

    const searchColumns: ColumnType[] = [
        {columnName: "Name", columnValue: "name", operator: "LIKE" },
        {columnName: "Phone Number", columnValue: "phoneNumber", operator: "LIKE" },
        {columnName: "Email", columnValue: "email", operator: "LIKE" },
        {columnName: "Status", columnValue: "status", operator: "=" },
    ]

    const tableColumns = [
        {
            header: "Full Name",
            accessor: "name" as const,
        },
        {
            header: "Email",
            accessor: "email" as const,
        },

        {
            header: "Phone Number",
            accessor: "phoneNumber" as const,
        },
        {
            header: "Status",
            accessor: "status" as const,
            cell: (row: Partner) => (
                <StatusBadge status={row.status} />
            ),
        },
        {
            header: "Date Registered",
            accessor: "createdAt" as const,
        },
    ];

    const rowActions = (partner: Partner) => (
                <button
                    onClick={()=> router.push(`/partners/${partner.externalId}`)}
                    className="text-gray-400 font-bold">
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
        console.log("called")
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
                    <div className="flex flex-col items-left ">
                        <h2 className="text-lg text-textColor-150 font-bold">
                            Partners
                        </h2>
                        <div className="mt-3 flex items-center space-x-2">
                            <Input className="w-60 font-normal"
                                   onBlur={handleInputChange}
                                   value={searchText}
                                   onChange={(e) => setSearchText(e.target.value)}/>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button className="bg-white text-black border">
                                        <CiFilter />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <p className="mb-2">Filter By</p>
                                    <RadioGroup
                                        value={selectValue}
                                        onValueChange={handleColumnChange}
                                    >
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="name" id="r1" />
                                            <Label htmlFor="r1">Name</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="phoneNumber" id="r2" />
                                            <Label htmlFor="r2">Phone Number</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="email" id="r3" />
                                            <Label htmlFor="r3">Email</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="status" id="r4" />
                                            <Label htmlFor="r4">Status</Label>
                                        </div>
                                    </RadioGroup>
                                </PopoverContent>
                            </Popover>

                        </div>
                    </div>
                )
            }
        />
    );
};

export default PartnersTable;