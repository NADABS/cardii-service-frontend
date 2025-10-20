'use client';
import useFetch from "@/src/hooks/useFetch";
import {useParams, useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {handleError} from "@/src/lib/errorHandler";
import {CustomSpinner} from "@/src/components/CustomSpinner";
import {Button} from "@/components/ui/button";
import PartnerDetailsComponent from "@/src/components/partners/PartnerDetailsComponent";
import {ChevronLeft} from "lucide-react";
import StatusBadge from "@/src/components/StatusBadge";
import {handleSuccess} from "@/src/lib/successHandler";

const mockdata = {
    "externalId": "c71f10a2-2ddb-48c0-9d8f-c82735aac42e",
    "internalId": "PT20251017173511882647",
    "name": "Jonadab Kwamlah",
    "email": "business.nadabs@gmail.com",
    "phoneNumber": "0241028918",
    "preferredChannel": null,
    "status": "pending",
    "deviceType": "desktop",
    "browser": "Chrome",
    "os": "MacOS",
    "ipAddress": null,
    "location": null,
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
    "createdAt": "2025-10-17 17:35:11",
    "updatedAt": "2025-10-17 17:35:11",
    "InterestCategories": [
        {
            "externalId": "826ac5af-ed0c-46a2-860e-18af54b8f1c6",
            "internalId": "IC20251017105550293134",
            "name": "roadside support(towing / fuel assistance)",
            "description": "roadside support(towing / fuel assistance)",
            "createdAt": "2025-10-17 10:55:50",
            "updatedAt": "2025-10-17 10:55:50"
        },
        {
            "externalId": "8fd80ead-f029-4289-b681-8e026606da0c",
            "internalId": "IC20251017105623786416",
            "name": "learner (interested in defensive driving training)",
            "description": "learner (interested in defensive driving training)",
            "createdAt": "2025-10-17 10:56:23",
            "updatedAt": "2025-10-17 10:56:23"
        },
        {
            "externalId": "978a1b3e-e678-4a86-99c7-86c5b16bfd07",
            "internalId": "IC20251017105705768043",
            "name": "car owner / fleet manager",
            "description": "car owner / fleet manager",
            "createdAt": "2025-10-17 10:57:05",
            "updatedAt": "2025-10-17 10:57:05"
        },
        {
            "externalId": "eb5b1742-261a-4bef-85d1-bb4d5bebb707",
            "internalId": "IC20251017105721221732",
            "name": "driver",
            "description": "driver",
            "createdAt": "2025-10-17 10:57:21",
            "updatedAt": "2025-10-17 10:57:21"
        }
    ]
}

export default function Page () {

    const params = useParams();

    const partnerId = params.partnerId;

    const router = useRouter();

    const {data, isLoading, error} = useFetch(`${process.env.NEXT_PUBLIC_CARDII_API_BASE_URL}/v1/partners/${partnerId}`, [partnerId]);

    const [partnerStatus, setPartnerStatus] = useState(data?.data?.status ?? mockdata.status)

    const [message, setMessage] = useState("");

    useEffect(() => {
        if(error) {
            handleError(error);
        }
    }, [error]);

    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <CustomSpinner/>
            </div>
        )
    }

    const handleBlockPartner = () => {
        setPartnerStatus("suspended");
        handleSuccess("Partner blocked.");
    };

    const handleUnblockPartner = () => {
        setPartnerStatus("pending");
        handleSuccess("Partner unblocked.");
    };

    const handleContactPartner = () => {
        setMessage("");
        handleSuccess("Message sent.");
    }

    return (
        <div className="w-full h-full flex overflow-hidden space-x-2">
            <div className="flex flex-col flex-1">
                <div className="w-full flex justify-between">
                    <div className="flex space-x-2 items-start">
                        <div className="mt-1"><button className="cursor-pointer" onClick={()=>router.push('/partners')}><ChevronLeft /></button></div>
                        <div>
                            <p className="text-2xl font-bold">{data?.data?.data?.name ?? mockdata.name}</p>
                            <p className="text-lg font-normal text-gray-500">{mockdata.internalId}</p>
                        </div>
                    </div>
                    <div>
                        {partnerStatus === "suspended" ? (
                            <Button
                                onClick={handleUnblockPartner}
                                className="bg-green-100 text-green-700 hover:bg-green-200"
                            >
                                Unblock Partner
                            </Button>
                        ) : (
                            <Button
                                onClick={handleBlockPartner}
                                className="bg-red-100 text-red-700 hover:bg-red-200"
                            >
                                Block Partner
                            </Button>
                        )}
                    </div>
                </div>
                <div className="py-2 grid grid-cols-3 gap-y-4 border-y mt-4">
                    <PartnerDetailsComponent title={"External ID"} value={data?.data?.externalId ?? mockdata.externalId} />
                    <PartnerDetailsComponent title={"Email"} value={data?.data?.email ?? mockdata.email} />
                    <PartnerDetailsComponent title={"Phone Number"} value={data?.data?.phoneNumber ?? mockdata.phoneNumber} />
                    <div>
                        <p className="font-[500] ">Status</p>
                        <div className="text-[0.875rem] text-gray-400"><StatusBadge status={data?.data?.status ?? partnerStatus ?? ""} /></div>
                    </div>
                    <PartnerDetailsComponent title={"Registration Date"} value={data?.data?.createdAt ?? mockdata.createdAt} />
                    <PartnerDetailsComponent title={"Location"} value={data?.data?.location ?? mockdata.location} />
                </div>
                <div className="mt-4">
                    <p className="font-[500] ">Interested Categories</p>
                    <div className="w-full flex flex-wrap space-x-2 space-y-2">
                        {mockdata.InterestCategories.map((category, index) => (
                            <div key={index} className="bg-[#E6F0FA] border-[#0069E1] text-[#0069E1] items-center w-fit py-[0.125rem] px-[0.625rem] capitalize text-xs border rounded-full justify-center flex">{category.name}</div>
                        ))}
                    </div>
                    <div className="mt-1">
                        <span className="font-[500] mr-2">Device Type:</span>
                        <span>{data?.data?.deviceType ?? mockdata.deviceType}</span>
                    </div>
                    <div className="mt-1">
                        <span className="font-[500] mr-2">Browser:</span>
                        <span>{data?.data?.browser ?? mockdata.browser}</span>
                    </div>
                    <div className="mt-1">
                        <span className="font-[500] mr-2">IP Address:</span>
                        <span>{data?.data?.ipAddress ?? mockdata.ipAddress ?? ""}</span>
                    </div>
                </div>
            </div>
            <div className="w-[30%] max-w-[400px] px-4 border-l">
                <p className="text-lg font-semibold">Contact Partner</p>
                <div className="py-4">
                    <textarea className="border focus:outline-none p-3 h-36 w-full rounded-lg"
                              placeholder="Enter your message here"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="w-full flex items-center justify-end my-3">
                        <Button onClick={handleContactPartner} disabled={message==""}>Send</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
