'use client';
import StatisticsSection from "@/src/components/dashboard/StatisticsSection";
import React, {useEffect, useState} from "react";
import useFetch from "@/src/hooks/useFetch";
import {getItem} from "@/src/lib/storage";
import {User} from "@/src/types/User";
import PartnersTable from "@/src/components/partners/PartnersTable";
import {PiUsers} from "react-icons/pi";
import {FaRegHandshake} from "react-icons/fa6";
import {TbMessage2Up} from "react-icons/tb";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {ReusableTable} from "@/src/components/ReusableTable";
import Partner from "@/src/types/Partner";
import StatusBadge from "@/src/components/StatusBadge";
import {BsThreeDots} from "react-icons/bs";
import {CustomModal} from "@/src/components/CustomModal";
import InviteUserForm from "@/src/components/users/InviteUserForm";

export default function OverviewPage() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const {data: dashboardData} = useFetch(
        `${process.env.NEXT_PUBLIC_CARDII_API_BASE_URL}/v1/admins/dashboard`, ["dashboard"],
        {},
        user?.bearerToken,
        user?.bearerToken !== ""
    )

    useEffect(() => {
        const storedUser = getItem("userDetails");
        if (storedUser) {
            setUser(storedUser)
        }
    }, [])

    const tableColumns = [
        {header: "Full Name", accessor: "name" as const},
        {header: "Email", accessor: "email" as const},
        {header: "Phone Number", accessor: "phoneNumber" as const},
        {
            header: "Status",
            accessor: "status" as const,
            cell: (row: Partner) => <StatusBadge status={row.status}/>,
        },
        {header: "Date Registered", accessor: "createdAt" as const},
    ]

    const rowActions = (partner: Partner) => (
        <button
            onClick={() => router.push(`/partners/${partner.externalId}`)}
            className="text-gray-400 font-bold cursor-pointer"
        >
            <BsThreeDots className="h-4 w-4"/>
        </button>
    )

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
                        icon: FaRegHandshake,
                        title: "Partners",
                        value: dashboardData?.data?.partners?.value || 0,
                        change: `${dashboardData?.data?.partners?.change ?? "+0"} partners`,
                    },
                    {
                        icon: PiUsers,
                        title: "Users",
                        value: dashboardData?.data?.users?.value || 0,
                        change: `${dashboardData?.data?.users?.change ?? "+0"} users`,
                    },
                    {
                        icon: TbMessage2Up,
                        title: "Campaigns",
                        value: dashboardData?.data?.campaigns?.value || 0,
                        change: `${dashboardData?.data?.campaigns?.change ?? "+0"} campaigns`,
                    },
                ]}/>

                <div className="mt-10">
                    <ReusableTable
                        columns={tableColumns}
                        data={dashboardData?.data?.partners?.recent ?? []}
                        rowActions={rowActions}
                        searchable={false}
                        title="Recent Registrations"
                        headerRight={<Button onClick={() => router.push("/partners")}>View All</Button>}
                    />
                </div>
            </div>
        </div>
    )
}