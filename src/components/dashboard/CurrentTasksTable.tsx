'use client';
import React from 'react'
import {CiSearch, CiWavePulse1} from "react-icons/ci";
import {IoTerminalOutline} from "react-icons/io5";
import {ReusableTable} from "@/src/components/ReusableTable";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatStatus, statusColourMap} from "@/src/lib/utils";
import {HiClock} from "react-icons/hi2";
import {BsThreeDots} from "react-icons/bs";
import { ChevronDown } from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import StatusBadge from "@/src/components/StatusBadge";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";


export const CurrentTasksTable = () => {

    const [date, setDate] = React.useState<DateRange | undefined>()

    const formatDateRange = (dateRange: DateRange | undefined) => {
        if (!dateRange) return "Date Range"

        const { from, to } = dateRange

        if (from && to) {
            return `${format(from, "MMM dd, yyyy")} - ${format(to, "MMM dd, yyyy")}`
        }

        if (from) {
            return format(from, "MMM dd, yyyy")
        }

        return "Date Range"
    }

    const headers = ["Name", "Email", "Phone", "Status", ""];

    const partners = [{
        externalId: "EXT-003",
        internalId: "INT-1003",
        name: "David Johnson",
        email: "david.johnson@example.com",
        phone: "+1-555-0103",
        status: "verified",
        preferredChannel: "push",
        deviceType: "tablet",
        location: "Chicago, USA",
        createdAt: "2023-03-10T09:15:00Z"
    },
        {
            externalId: "EXT-004",
            internalId: "INT-1004",
            name: "Sarah Chen",
            email: "sarah.chen@example.com",
            phone: "+1-555-0104",
            status: "verified",
            preferredChannel: "email",
            deviceType: "desktop",
            location: "San Francisco, USA",
            createdAt: "2023-04-05T16:20:00Z"
        },
        {
            externalId: "EXT-005",
            internalId: "INT-1005",
            name: "Ahmed Hassan",
            email: "ahmed.hassan@example.com",
            phone: "+1-555-0105",
            status: "unverified",
            preferredChannel: "sms",
            deviceType: "mobile",
            location: "Toronto, Canada",
            createdAt: "2023-05-12T11:00:00Z"
        }]

    return (
        <div className="mt-6">
            <div className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-6">
                    <h1 className="text-2xl font-bold">Recently Onboarded Partners</h1>
                </div>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn("justify-between gap-2 font-normal", !date && "text-muted-foreground")}
                        >
                            {formatDateRange(date)}
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                        />
                    </PopoverContent>
                </Popover>
            </div>

        <Table>
            <TableHeader>
                <TableRow>
                    {headers.map((header, index) => (
                        <TableHead key={index}>{header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {partners.map((partner, index) => (
                    <TableRow key={index}>
                        <TableCell>{partner.name}</TableCell>
                        <TableCell>{partner.email}</TableCell>
                        <TableCell>{partner.phone}</TableCell>
                        <TableCell><StatusBadge status={partner.status} /></TableCell>
                        <TableCell><Dialog>
                            <DialogTrigger asChild>
                                <button
                                    className="text-gray-400 font-bold">
                                    <BsThreeDots className="h-4 w-4" />
                                </button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle>Name: {partner.name}</DialogTitle>
                                <p>Id: {partner.internalId}</p>
                                <p>Email: {partner.email}</p>
                                <p>Status: {partner.status}</p>
                                <p>Date Registered: {partner.createdAt}</p>
                                <p>Preferred Channel: {partner.preferredChannel}</p>
                                <p>Location: {partner.location}</p>
                            </DialogContent>
                        </Dialog></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
    )
}

