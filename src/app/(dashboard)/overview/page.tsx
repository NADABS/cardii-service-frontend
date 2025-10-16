'use client';
import {getToday} from "@/src/lib/utils";
import {PiCalendarDotsBold} from "react-icons/pi";
import StatisticsSection from "@/src/components/dashboard/StatisticsSection";
import {BiLike, BiTrendingUp} from "react-icons/bi";
import {CiStopwatch} from "react-icons/ci";
import {PerformanceComponent} from "@/src/components/dashboard/PerformanceComponent";
import {CurrentTasksTable} from "@/src/components/dashboard/CurrentTasksTable";
import React, {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";
import {FiUser} from "react-icons/fi";
import {MdVerified} from "react-icons/md";
import {GoUnverified} from "react-icons/go";

export default function OverviewPage() {

    const today = getToday();

    const [displayedDate, setDisplayedDate] = useState(today);

    const [calendarDate, setCalendarDate] = useState(new Date());

    function handleDateSelect (date: Date) {
        setCalendarDate(date);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "long" });
        const year = date.getFullYear();

        const getOrdinal = (n: number) => {
            if (n > 3 && n < 21) return "th";
            switch (n % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        };

        setDisplayedDate(`${day}${getOrdinal(day)} ${month}, ${year}`);
    }

    return (
        <div className="w-full h-full overflow-hidden">
            <div className="w-full flex justify-between items-baseline">
                <div>
                    <h1 className="text-2xl font-bold">Hello, John</h1>
                </div>
                <div className="flex space-x-4 items-center">
                    <p className="text-sm">{displayedDate}</p>
                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100">

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn("w-7 h-7 flex items-center justify-center rounded-full bg-gray-100", !displayedDate && "text-muted-foreground")}
                                >
                                    <PiCalendarDotsBold/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                                <Calendar
                                    mode="single"
                                    selected={calendarDate}
                                    onSelect={(date)=>handleDateSelect(date as Date)}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
            <div className="text-gray-400">
                Track your partner registrations here
            </div>
            <div className="overflow-y-scroll" style={{height: 'calc(100vh - 120px)'}}>
                <StatisticsSection stats={[
                    {
                        icon: FiUser,
                        title: "Registered Partners",
                        value: 18,
                        change: "+8 partners",
                    },
                    {
                        icon: MdVerified,
                        title: "Verified Partners",
                        value: "9",
                        change: "-2 partners",
                    },
                    {
                        icon: GoUnverified,
                        title: "Unverified Partners",
                        value: "9",
                        change: "+2 partners",
                    },
                ]}/>
                <PerformanceComponent/>
                <CurrentTasksTable/>
            </div>

        </div>
    )
}