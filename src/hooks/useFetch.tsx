import { useQuery } from "@tanstack/react-query";
import {httpGET} from "@/src/lib/http-client";

export default function useFetch(
    url: string,
    queryKey: any[],
    headers = {},
    token: string | null = null,
    isEnabled = true
) {
    const { data, isLoading, error, refetch, isFetching } = useQuery({
        enabled: isEnabled,
        queryFn: async () => {
            const response = await httpGET(url, headers, token);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred");
            }
            return await response.json();
        },
        queryKey: queryKey,
    });

    return { data, isLoading, error, refetch, isFetching};
}
