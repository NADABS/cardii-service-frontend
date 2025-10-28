"use client";
import IMeta from "@/src/types/Meta";
import PartnersTable from "@/src/components/partners/PartnersTable";
import useFetch from "@/src/hooks/useFetch";
import {useEffect, useState} from "react";
import {handleError} from "@/src/lib/errorHandler";
import {CustomSpinner} from "@/src/components/CustomSpinner";
import {getItem, toJsonString} from "@/src/lib/storage";
import {useRouter, useSearchParams} from "next/navigation";
import FilterType from "@/src/types/FilterType";

export default function PartnersPage () {

    const router = useRouter();

    const searchParams = useSearchParams();

    const filtersParam = searchParams.get("filters");
    const filters: FilterType[] = filtersParam ? JSON.parse(filtersParam) : [];
    const page = searchParams.get("page") || 1;

    const [userDetails, setUserDetails] = useState({
        bearerToken: "",
        externalId: ""
    })

    function handleFiltersChange(_filter: FilterType) {
        const updatedFilters = []
        const params = new URLSearchParams(searchParams.toString());
        updatedFilters.push(_filter)
        params.set('filters', toJsonString(updatedFilters));
        router.push(`/partners?${params.toString()}`);
    }

    function handlePageLoad(page: string | number) {
        const meta: IMeta = data.meta;
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
        const params = new URLSearchParams(searchParams.toString());
        params.set('filters', toJsonString(filters));
        params.set('page', String(_page))
        router.push(`/partners?${params.toString()}`);
    }

    function clearFilters() {
        const params = new URLSearchParams();
        params.set("page", "1");
        params.set("filters", "[]");
        router.replace(`/partners?${params.toString()}`);
    }

    const {data, isLoading, error} = useFetch(`${process.env.NEXT_PUBLIC_CARDII_API_BASE_URL}/v1/partners?filters=${toJsonString(filters)}&page=${page}`,
        ["partners", filters, page], {}, userDetails.bearerToken, userDetails.bearerToken!=="")

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
                onFilterChange={handleFiltersChange}
                handlePageChange={handlePageLoad}
                handleClearFilters={clearFilters}
            />
        </div>
    )
}