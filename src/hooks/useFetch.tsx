import { useQuery } from "@tanstack/react-query";
import { httpGET } from "@/src/lib/http-client";
import {handleError} from "@/src/lib/errorHandler";

export default function useFetch(
    url: string,
    queryKey: any[],
    headers: Record<string, string> = {},
    token: string | null = null,
    isEnabled = true
) {
    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey,
        enabled: isEnabled,
        queryFn: async () => {
            try {
                const response = await httpGET(url, headers, token);
                return response.data;
            } catch (error: any) {
                throw error;
            }
        },
    });

    return { data, isLoading, error, refetch, isFetching };
}
