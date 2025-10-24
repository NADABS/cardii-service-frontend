'use client';
import React, {useEffect, useState} from "react";
import useFetch from "@/src/hooks/useFetch";
import {CustomSpinner} from "@/src/components/CustomSpinner";
import CampaignsTable from "@/src/components/campaigns/CampaignsTable";
import {getItem, toJsonString} from "@/src/lib/storage";
import IMeta from "@/src/types/Meta";
import {useRouter, useSearchParams} from "next/navigation";

export default function CampaignsPage() {
    const router = useRouter();

    const [userDetails, setUserDetails] = useState({
        bearerToken: "",
        externalId: ""
    })

    const apiBaseUrl = process.env.NEXT_PUBLIC_CARDII_API_BASE_URL;

    const {data: interestCategories, isLoading: isLoadingInterestCategories} = useFetch(
        `${apiBaseUrl}/v1/interest-categories`,
        ["interestCategories"],
        {},
        userDetails.bearerToken,
        userDetails.bearerToken !== ""
    )

    const {data: campaigns} = useFetch(
        `${apiBaseUrl}/v1/campaigns`,
        ["campaigns"],
        {},
        userDetails.bearerToken,
        userDetails.bearerToken !== ""
    )

    function handlePageChange(page: string | number) {
        const meta: IMeta = campaigns.meta;
        let _page;
        switch (page) {
            case "prev":
                _page = meta.currentPage - 1;
                break;
            case "next":
                _page = meta.currentPage + 1;
                break;
            default:
                _page = page as number;
        }

        router.push(`/users?page=${String(page)}`);
    }

    useEffect(() => {
        setUserDetails(getItem("userDetails"))
    }, []);

    if (isLoadingInterestCategories) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <CustomSpinner/>
            </div>
        )
    }

    return (
        <div className="w-full h-full overflow-hidden">
            <CampaignsTable
                campaigns={campaigns?.data || []}
                meta={[]}
                interestCategories={interestCategories?.data ?? []}
                handlePageChange={handlePageChange}
            />
        </div>
    )
}