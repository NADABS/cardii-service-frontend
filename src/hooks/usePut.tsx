import { useMutation } from "@tanstack/react-query";
import {httpPUT} from "@/src/lib/http-client";
import {toJsonString} from "@/src/lib/storage";

export default function usePut(url: string) {
    const mutation = useMutation({
        mutationFn: async (putRequest: any) => {
            const response = await httpPUT(url, toJsonString(putRequest), {
                "Content-Type": "application/json",
            });

            if (response.status < 200 || response.status >= 300) {
                const errorMessage =
                    response.data?.message || "An error occurred";
                throw new Error(errorMessage);
            }

            return response.data;
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
