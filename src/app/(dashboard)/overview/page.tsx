'use client';
import StatisticsSection from "@/src/components/dashboard/StatisticsSection";
import {PerformanceComponent} from "@/src/components/dashboard/PerformanceComponent";
import {CurrentTasksTable} from "@/src/components/dashboard/CurrentTasksTable";
import React, {useEffect, useState} from "react";
import {FiUser} from "react-icons/fi";
import {MdVerified} from "react-icons/md";
import {GoUnverified} from "react-icons/go";

export default function OverviewPage() {
    const [user, setUser] = useState<{ name: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("userDetails");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="w-full h-full overflow-hidden">
            <h1 className="text-2xl font-bold">
                Hello, {user?.name ? user.name.split(" ")[0] : "Guest"}
            </h1>
            <div className="text-gray-400">
                Track your partner registrations here
            </div>
            <div className="overflow-y-scroll" style={{height: 'calc(100vh - 120px)'}}>
                <StatisticsSection stats={[
                    {
                        icon: FiUser,
                        title: "Partners",
                        value: 18,
                        change: "+8 partners",
                    },
                    {
                        icon: MdVerified,
                        title: "Users",
                        value: "9",
                        change: "-2 partners",
                    },
                    {
                        icon: GoUnverified,
                        title: "Campaigns",
                        value: "9",
                        change: "+2 partners",
                    },
                ]}/>
                {/*<PerformanceComponent/>*/}
                <CurrentTasksTable/>
            </div>
        </div>
    )
}