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
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {CustomModal} from "@/src/components/CustomModal";
import InviteUserForm from "@/src/components/users/InviteUserForm";
import {User} from "@/src/types/User";
import {parseFilters} from "@/src/lib/utils";
import ColumnType from "@/src/types/ColumnType";
import FilterComponent from "@/src/components/FilterComponent";
import FilterType from "@/src/types/FilterType";
import Role from "@/src/types/Role";

interface Props {
    showHeader?: boolean;
    users: User[];
    meta: IMeta | [];
    onFilterChange?: (filters: FilterType) => void;
    handlePageChange?: (page: string | number) => void;
    handleClearFilters?: () => void;
    roles: Role[]
}

const UsersTable = ({
                        showHeader = true,
                        users,
                        meta,
                        onFilterChange = () => {},
                        handlePageChange,
                        handleClearFilters = () => {},
                        roles
                    }: Props) => {

    const searchParams = useSearchParams();
    const filtersParam = searchParams.get("filters");

    let inputValue: string | undefined;

    inputValue = parseFilters(filtersParam) ?? "";

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)

    const selectedColumnInitialState = {
        columnValue: "",
        columnName: "",
        operator: "",
    };

    const [selectedColumn, setSelectedColumn] = useState(selectedColumnInitialState);
    const [searchText, setSearchText] = useState(inputValue ?? "");
    const [selectValue, setSelectValue] = useState("");

    const columns = [
        {
            header: "Full Name",
            accessor: "name" as const,
        },
        {
            header: "Email",
            accessor: "email" as const,
        },
        {
            header: "Date Invited",
            accessor: "invitedAt" as const,
        },
        {
            header: "Status",
            accessor: "status" as const,
            cell: (row: User) => (
                <StatusBadge status={row.status}/>
            ),
        },
        {
            header: "Date Registered",
            accessor: "createdAt" as const,
        },
    ];

    const searchColumns: ColumnType[] = [
        { columnName: "Name", columnValue: "name", operator: "LIKE" },
        { columnName: "Email", columnValue: "email", operator: "LIKE" },
        { columnName: "Status", columnValue: "status", operator: "=" },
    ];

    const rowActions = (user: User) => (
        <button
            onClick={() => router.push(`/users/${user.externalId}`)}
            className="text-gray-400 font-bold">
            <BsThreeDots className="h-4 w-4"/>
        </button>

    );

    const handleClose = () => {
        setIsOpen(false)
    }

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
            columns={columns}
            data={users}
            meta={meta}
            rowActions={rowActions}
            onPageChange={handlePageChange}
            searchable={false}
            cardHeaderData={
                showHeader && (
                    <div className="flex flex-col items-left ">
                        <h2 className="text-lg text-textColor-150 font-bold">
                            System Users
                        </h2>
                        <div className="mt-3 flex items-center space-x-2 justify-between">
                            <FilterComponent handleInputChange={handleInputChange} searchText={searchText}
                                             setSearchText={setSearchText} selectValue={selectValue}
                                             handleColumnChange={handleColumnChange} searchColumns={searchColumns}
                                             onClearFilters={onClearFilters}
                            />
                            <Button onClick={() => setIsOpen(true)}>Invite User</Button>
                            <CustomModal isOpen={isOpen} onClose={handleClose} title="Invite New User" size="md">
                                <InviteUserForm handleClose={handleClose} roles={roles} />
                            </CustomModal>
                        </div>
                    </div>
                )
            }
        />
    );
};

export default UsersTable;