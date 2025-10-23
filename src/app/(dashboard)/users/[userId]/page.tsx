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

export default function UserDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const partnerId = params.partnerId;

    const [userDetails, setUserDetails] = useState({
        bearerToken: "",
        externalId: ""
    })

    const {data} = useFetch(
        `${process.env.NEXT_PUBLIC_CARDII_API_BASE_URL}/v1/partners/${partnerId}`,
        [partnerId],
        {},
        userDetails.bearerToken,
        userDetails.bearerToken !== ""
    );

    const [partnerStatus, setPartnerStatus] = useState(data?.data?.status)

    const [message, setMessage] = useState("");

    const handleContactPartner = () => {
        setMessage("");
        handleSuccess("Message sent.");
    }

    useEffect(() => {
        setUserDetails(getItem("userDetails"))
    }, []);

    return (
        <div className="w-full h-full flex overflow-hidden space-x-2">
            <div className="flex flex-col flex-1">
                <div className="w-full flex justify-between">
                    <div className="flex space-x-2 items-start">
                        <div className="mt-1">
                            <button className="cursor-pointer" onClick={() => router.push('/partners')}>
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
                            <StatusBadge status={data?.data?.status ?? partnerStatus ?? ""}/>
                        </div>
                    </div>
                    <PartnerDetailsComponent title={"Registration Date"} value={data?.data?.createdAt || ""}/>
                    <PartnerDetailsComponent title={"Interest Category Count"}
                                             value={data?.data?.interestCategories.length || "0"}/>
                </div>
                <div className="mt-4">
                    <p className="font-[500] ">Interested Categories</p>
                    <div className="w-full flex flex-wrap gap-2 items-center mt-2">
                        {data?.data?.interestCategories.map((category: Campaign) => (
                            <div key={category.externalId}
                                 className="bg-[#E6F0FA] border-[#0069E1] text-[#0069E1] items-center w-fit py-[0.125rem] px-[0.625rem] capitalize text-xs border rounded-full justify-center flex">{category.name}</div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <span className="font-[500] mr-2">Device Type:</span>
                        <span className="capitalize">{data?.data?.deviceType}</span>
                    </div>
                    <div className="mt-4">
                        <span className="font-[500] mr-2">Browser:</span>
                        <span className="capitalize">{data?.data?.browser}</span>
                    </div>
                    <div className="mt-4">
                        <span className="font-[500] mr-2">Operating System:</span>
                        <span>{data?.data?.os}</span>
                    </div>
                </div>
            </div>
            <div className="w-[30%] max-w-[400px] px-4 border-l">
                <p className="text-lg font-semibold">Contact Partner</p>
                <div className="py-3 mt-2">
                    <textarea className="border focus:outline-none p-3 h-60 w-full rounded-lg"
                              placeholder="Enter your message here"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="w-full flex items-center justify-end my-3">
                        <Button onClick={handleContactPartner} disabled={message == ""}>Send</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
