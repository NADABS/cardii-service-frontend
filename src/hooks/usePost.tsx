import { useMutation } from "@tanstack/react-query";
import { toJsonString } from "@/src/lib/storage";
import { httpPOST } from "@/src/lib/http-client";

export default function usePost(url: string) {
    const mutation = useMutation({
        mutationFn: async (postRequest: any) => {
            const response = await httpPOST(
                url,
                toJsonString(postRequest),
                {
                    "Content-Type": "application/json",
                }
            );

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
