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
import {Popover, PopoverTrigger} from "@/components/ui/popover";
import {CiFilter} from "react-icons/ci";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";

interface Props {
    showHeader?: boolean;
    tasks: Task[];
    meta:  IMeta;
}

const TasksTable = ({ showHeader = true, tasks, meta }: Props) => {
    const router = useRouter();

    const columns = [
        {
            header: "Task ID",
            accessor: "id" as const,
        },
        {
            header: "Task Name",
            accessor: "title" as const,
        },
        {
            header: "Status",
            accessor: "status" as const,
            cell: (row: Task) => (
                <StatusBadge status={row.status} />
            ),
        },
        {
            header: "Amount Spent",
            accessor: "amount" as const,
        },
        {
            header: "Completion Rate",
            accessor: "completionRate" as const,
            cell: (row: Task) => (
                <Progress value={row.completionRate} className={
                    row.completionRate >= 70 ? "[&>div]:bg-[#53B23B]" :
                        (row.completionRate <= 69 && row.completionRate >= 40) ? "[&>div]:bg-[#E39C37]" :
                            "[&>div]:bg-[#DA5351]"
                }/>
            )
        },


    ];

    // Row actions
    const rowActions = (task: Task) => (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className="text-gray-400 font-bold">
                    <BsThreeDots className="h-4 w-4" />
                </button>
            </DialogTrigger>
            <DialogContent>
                <p>{task.title}</p>
                <p>Id: {task.id}</p>
                <p>Status: {task.status}</p>
                <p>Completion Rate: {task.completionRate}%</p>
                <p>Amount Spent: GHS{task.amount}</p>
            </DialogContent>
        </Dialog>

    );

    // Handle page change
    const handlePageChange = (page: number | string) => {
        console.log("Page changed to:", page);
    };

    return (
        <ReusableTable
            columns={columns}
            data={tasks}
            meta={meta}
            rowActions={rowActions}
            onPageChange={handlePageChange}
            searchable={false}
            cardHeaderData={
                showHeader && (
                    <div className="flex flex-col items-left ">
                        <h2 className="text-lg text-textColor-150 font-medium">
                            Tasks
                        </h2>
                        <div className="mt-3 flex items-center space-x-2">
                            <Input className="w-60" />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button className="bg-white text-black border">
                                        <CiFilter />
                                    </Button>
                                </PopoverTrigger>
                            </Popover>
                        </div>
                    </div>
                )
            }
        />
    );
};

export default TasksTable;