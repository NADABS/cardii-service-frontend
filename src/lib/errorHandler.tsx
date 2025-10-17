import { toast } from "sonner";
import {extractErrorsLabeled, parseApiError} from "@/src/lib/utils";

export function handleError(
    error: any,
    fallbackMessage = "An unknown error occurred"
) {
    const { status, message, errors } = parseApiError(error, fallbackMessage);

    if (status === 422 && Object.keys(errors).length > 0) {
        const messages = extractErrorsLabeled(errors);

        toast("Validation Error", {
            description: (
                <div className="space-y-1 text-sm text-left text-red-600">
                    {messages.map((message, index) => (
                        <p key={index}>• {message}</p>
                    ))}
                </div>
            ),
            style: {
                borderColor: "#FF3B301A",
                color: "#FF3B30",
            },
            cancel: {
                label: "Close",
                onClick: () => {},
            },
        });
        return;
    }

    if (status === 500) {
        toast("Server Error", {
            description: (
                <span style={{ color: "#FF0000" }}>
          Unable to process request. Please try again later.
        </span>
            ),
            style: {
                borderColor: "#FF3B301A",
                color: "#FF3B30",
            },
            cancel: {
                label: "Close",
                onClick: () => {},
            },
        });
        return;
    }

    toast("Error", {
        description: <span style={{ color: "#FF0000" }}>{message}</span>,
        style: {
            borderColor: "#FF3B301A",
            color: "#FF3B30",
        },
        cancel: {
            label: "Close",
            onClick: () => {},
        },
    });
}
