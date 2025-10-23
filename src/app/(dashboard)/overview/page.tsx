'use client';
import StatisticsSection from "@/src/components/dashboard/StatisticsSection";
import React, {useEffect, useState} from "react";
import {FiUser} from "react-icons/fi";
import {MdVerified} from "react-icons/md";
import {GoUnverified} from "react-icons/go";
import useFetch from "@/src/hooks/useFetch";
import {getItem} from "@/src/lib/storage";
import {User} from "@/src/types/User";
import PartnersTable from "@/src/components/partners/PartnersTable";

export default function OverviewPage() {
    const [user, setUser] = useState<User | null>(null);

    const {data} = useFetch(
        `${process.env.NEXT_PUBLIC_CARDII_API_BASE_URL}/v1/partners`, ["partners"],
        {},
        user?.bearerToken,
        user?.bearerToken !== ""
    )

    const {data: users} = useFetch(
        `${process.env.NEXT_PUBLIC_CARDII_API_BASE_URL}/v1/users`, ["users"],
        {},
        user?.bearerToken,
        user?.bearerToken !== ""
    )

    useEffect(() => {
        const storedUser = getItem("userDetails");
        if (storedUser) {
            setUser(storedUser)
        }
    }, []);

    return (
        <div className="w-full h-full overflow-hidden">
            <h1 className="text-2xl font-bold">
                Hello, {user?.name ? user.name.split(" ")[0] : "Guest"}
            </h1>
            <div className="text-gray-400">
                Track your recent updates here
            </div>
            <div className="overflow-y-scroll" style={{height: 'calc(100vh - 120px)'}}>
                <StatisticsSection stats={[
                    {
                        icon: FiUser,
                        title: "Partners",
                        value: data?.data?.length || 0,
                        change: "+0 partners",
                    },
                    {
                        icon: MdVerified,
                        title: "Users",
                        value: users?.data?.length || 0,
                        change: "0 partners",
                    },
                    {
                        icon: GoUnverified,
                        title: "Campaigns",
                        value: "9",
                        change: "0 partners",
                    },
                ]}/>
                {/*<PerformanceComponent/>*/}
                <div className="my-5 font-semibold">Recent Registrations</div>
                <PartnersTable showHeader={false} partners={data?.data || []} meta={data?.meta}/>
            </div>
        </div>
    )
}