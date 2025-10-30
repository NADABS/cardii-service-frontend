'use client';
import useFetch from "@/src/hooks/useFetch";
import {useParams, useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import PartnerDetailsComponent from "@/src/components/partners/PartnerDetailsComponent";
import {ChevronLeft} from "lucide-react";
import StatusBadge from "@/src/components/StatusBadge";
import {handleSuccess} from "@/src/lib/successHandler";
import {getItem} from "@/src/lib/storage";
import {Campaign} from "@/src/types/Campaign";
import Role from "@/src/types/Role";

export default function UserDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const userId = params.userId;

    const [userDetails, setUserDetails] = useState({
        bearerToken: "",
        externalId: ""
    })

    const {data} = useFetch(
        `${process.env.NEXT_PUBLIC_CARDII_API_BASE_URL}/v1/users/${userId}`,
        [userId],
        {},
        userDetails?.bearerToken,
        userDetails?.bearerToken !== ""
    );


    useEffect(() => {
        setUserDetails(getItem("userDetails"))
    }, []);

    return (
        <div className="w-full h-full flex overflow-hidden space-x-2">
            <div className="flex flex-col flex-1">
                <div className="w-full flex justify-between">
                    <div className="flex space-x-2 items-start">
                        <div className="mt-1">
                            <button className="cursor-pointer" onClick={() => router.push('/users')}>
                                <ChevronLeft/>
                            </button>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{data?.data?.name}</p>
                        </div>
                    </div>
                </div>
                <div className="py-2 grid grid-cols-3 gap-y-4 border-y mt-4">
                    <PartnerDetailsComponent title={"External ID"} value={data?.data?.externalId || ""}/>
                    <PartnerDetailsComponent title={"Email"} value={data?.data?.email || ""}/>
                    <div>
                        <p className="font-[500] ">Status</p>
                        <div className="text-[0.875rem] text-gray-400 mt-1">
                            <StatusBadge status={data?.data?.status ?? ""}/>
                        </div>
                    </div>
                    <PartnerDetailsComponent title={"Registration Date"} value={data?.data?.createdAt || ""}/>
                    <div>
                        <p className="font-[500] ">Roles</p>
                        <div className="text-[0.875rem] text-gray-400 mt-1">
                            { data?.data?.role?.map((role: Role, index: number) => (
                                <div key={index}
                                     className="bg-[#E6F0FA] border-[#0069E1] text-[#0069E1] items-center w-fit py-[0.125rem] px-[0.625rem] capitalize text-xs border rounded-full justify-center flex">{role.name}</div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
