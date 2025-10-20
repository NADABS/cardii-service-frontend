"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {ReusableTable} from "@/src/components/ReusableTable";
import IMeta from "@/src/types/Meta";
import {Progress} from "@/components/ui/progress";
import {Task} from "@/src/types/Task";
import {BsThreeDots} from "react-icons/bs";
import StatusBadge from "@/src/components/StatusBadge";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CiFilter} from "react-icons/ci";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import Partner from "@/src/types/Partner";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";

interface Props {
    showHeader?: boolean;
    partners: Partner[];
    meta:  IMeta;
}

const PartnersTable = ({ showHeader = true, partners, meta }: Props) => {
    const router = useRouter();

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

    const handlePageChange = (page: number | string) => {
        console.log("Page changed to:", page);
    };

    return (
        <ReusableTable
            columns={columns}
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
                            <Input className="w-60" />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button className="bg-white text-black border">
                                        <CiFilter />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <p className="mb-2">Filter By</p>
                                    <RadioGroup defaultValue="">
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="name" id="r1" />
                                            <Label htmlFor="r1">Name</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="phone" id="r2" />
                                            <Label htmlFor="r2">Phone</Label>
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