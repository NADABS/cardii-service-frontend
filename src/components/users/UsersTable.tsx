"use client";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
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
import {httpPOST} from "@/src/lib/http-client";
import {setItem} from "@/src/lib/storage";
import {handleError} from "@/src/lib/errorHandler";
import {useMutation} from "@tanstack/react-query";
import {handleSuccess} from "@/src/lib/successHandler";
import CreateCampaignForm from "@/src/components/campaigns/CreateCampaignForm";
import {CustomModal} from "@/src/components/CustomModal";
import InviteUserForm from "@/src/components/users/InviteUserForm";

interface Props {
    showHeader?: boolean;
    users: Partner[];
    meta: IMeta;
}

const UsersTable = ({showHeader = true, users, meta}: Props) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)

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
            cell: (row: Partner) => (
                <StatusBadge status={row.status}/>
            ),
        },
        {
            header: "Date Registered",
            accessor: "createdAt" as const,
        },
    ];

    const rowActions = (partner: Partner) => (
        <button
            onClick={() => router.push(`/partners/${partner.externalId}`)}
            className="text-gray-400 font-bold">
            <BsThreeDots className="h-4 w-4"/>
        </button>

    );

    const handlePageChange = (page: number | string) => {
        console.log("Page changed to:", page);
    };

    const handleClose = () => {
        setIsOpen(false)
    }

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
                            <div className="">
                                <Input className="w-60"/>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button className="bg-white text-black border">
                                            <CiFilter/>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <p className="mb-2">Filter By</p>
                                        <RadioGroup defaultValue="">
                                            <div className="flex items-center gap-3">
                                                <RadioGroupItem value="name" id="r1"/>
                                                <Label htmlFor="r1">Name</Label>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <RadioGroupItem value="phone" id="r2"/>
                                                <Label htmlFor="r2">Phone</Label>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <RadioGroupItem value="email" id="r3"/>
                                                <Label htmlFor="r3">Email</Label>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <RadioGroupItem value="status" id="r4"/>
                                                <Label htmlFor="r4">Status</Label>
                                            </div>
                                        </RadioGroup>
                                    </PopoverContent>
                                </Popover>
                            </div>


                            <Button onClick={() => setIsOpen(true)}>Invite User</Button>
                            <CustomModal isOpen={isOpen} onClose={handleClose} title="Invite New User" size="md">
                                <InviteUserForm handleClose={handleClose} />
                            </CustomModal>
                        </div>
                    </div>
                )
            }
        />
    );
};

export default UsersTable;