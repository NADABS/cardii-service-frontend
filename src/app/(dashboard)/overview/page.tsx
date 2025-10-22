'use client';
import StatisticsSection from "@/src/components/dashboard/StatisticsSection";
import {PerformanceComponent} from "@/src/components/dashboard/PerformanceComponent";
import {CurrentTasksTable} from "@/src/components/dashboard/CurrentTasksTable";
import React from "react";
import {FiUser} from "react-icons/fi";
import {MdVerified} from "react-icons/md";
import {GoUnverified} from "react-icons/go";

export default function OverviewPage() {

    return (
        <div className="w-full h-full overflow-hidden">
            <h1 className="text-2xl font-bold">Hello, John</h1>
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