import { useMutation } from "@tanstack/react-query";
import {httpPUTWithoutAuth} from "@/src/lib/http-client";
import {toJsonString} from "@/src/lib/storage";

export default function usePutWithoutAuth(url: string) {
    const mutation = useMutation({
        mutationFn: async (putRequest: any) => {
            const response = await httpPUTWithoutAuth(url, toJsonString(putRequest), {
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
