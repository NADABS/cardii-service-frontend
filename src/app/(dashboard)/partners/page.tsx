"use client";
import IMeta from "@/src/types/Meta";
import PartnersTable from "@/src/components/partners/PartnersTable";
import useFetch from "@/src/hooks/useFetch";
import {useEffect, useState} from "react";
import {handleError} from "@/src/lib/errorHandler";
import {CustomSpinner} from "@/src/components/CustomSpinner";
import {getItem} from "@/src/lib/storage";

export default function PartnersPage () {

    const [userDetails, setUserDetails] = useState({
        bearerToken: "",
        externalId: ""
    })

    const {data, isLoading, error} = useFetch(`${process.env.NEXT_PUBLIC_CARDII_API_BASE_URL}/v1/partners`, ["partners"], {}, userDetails.bearerToken, userDetails.bearerToken!=="")

    useEffect(() => {
        if(error) {
            handleError(error);
        }
    }, [error]);

    useEffect(() => {
        setUserDetails(getItem("userDetails"))
    }, []);

    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <CustomSpinner/>
            </div>
        )
    }

    return (
        <div className="w-full h-full overflow-hidden">
            <PartnersTable
                meta={data?.meta ?? []}
                partners={data?.data ?? []}
            />
        </div>
    )
}