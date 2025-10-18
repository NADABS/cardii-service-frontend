'use client';
import useFetch from "@/src/hooks/useFetch";
import {useParams} from "next/navigation";
import {useEffect} from "react";
import {handleError} from "@/src/lib/errorHandler";
import {CustomSpinner} from "@/src/components/CustomSpinner";


export default function Page () {

    const params = useParams();

    const partnerId = params.partnerId;

    const {data, isLoading, error} = useFetch(`${process.env.NEXT_PUBLIC_CARDII_API_BASE_URL}/v1/partners/${partnerId}`, ["partners"]);

    useEffect(() => {
        if(error) {
            handleError(error);
        }
    }, []);

    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <CustomSpinner/>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex overflow-hidden">
            <div className="flex flex-col flex-1">

            </div>
            <div className="w-[30%] max-w-[400px] ">

            </div>
        </div>
    )
}