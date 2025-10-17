import { useQuery } from "@tanstack/react-query";
import {httpGETWithoutAuth} from "@/src/lib/http-client";

export default function useFetchWithoutAuth(
    url: string,
    queryKey: any[],
    headers = {},
    isEnabled = true
) {
    const { data, isLoading, error, refetch, isFetching } = useQuery({
        enabled: isEnabled,
        queryFn: async () => {
            const response = await httpGETWithoutAuth(url, headers);
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
