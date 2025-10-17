import { useMutation } from "@tanstack/react-query";
import {toJsonString} from "@/src/lib/storage";
import {httpPOST} from "@/src/lib/http-client";

export default function usePost(url: string) {
    const mutation = useMutation({
        mutationFn: async (postRequest: any) => {
            const response = await httpPOST(url, toJsonString(postRequest), {
                "Content-Type": "application/json",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred");
            }

            return await response.json();
        },
    });

    return {
        mutate: mutation.mutate,
        data: mutation.data,
        isLoading: mutation.isPending,
        error: mutation.error,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
    };
}
