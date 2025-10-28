import {toast} from "sonner";
import {extractErrorsLabeled, parseApiError} from "@/src/lib/utils";

export function handleError(error: any, fallbackMessage = "An unknown error occurred") {
    const {status, message, errors} = parseApiError(error, fallbackMessage);

    const cancelAction = {
        label: "Close",
        onClick: () => {} // Empty function or custom logic
    };

    // 🧾 Laravel Validation (422)
    if (status === 422 && Object.keys(errors).length > 0) {
        const messages = extractErrorsLabeled(errors);

        toast("Validation Error", {
            description: (
                <div className="space-y-1 text-sm text-left text-red-600">
                    {messages.map((_message, i) => <p className="text-xs" key={i}>
                            {_message.replace(/^[A-Za-z0-9_]+:\s*/i, "").trim()}
                        </p>
                    )}
                </div>
            ),
            duration: 5000,
            style: {borderColor: "#FF3B301A", color: "#FF3B30"},
            cancel: cancelAction,
        });
        return;
    }

    // 🔒 Unauthorized / Forbidden
    if (status === 401 || status === 403) {
        toast("Access Denied", {
            description: (
                <p className="text-red-600">
                    {message || "You are not authorized to perform this action."}
                </p>
            ),
            style: {borderColor: "#FF3B301A", color: "#FF3B30"},
            cancel: cancelAction,
        });
        return;
    }

    // 🚫 Not Found
    if (status === 404) {
        toast("Not Found", {
            description: <span className="text-red-600">{message || "Resource not found."}</span>,
            style: {borderColor: "#FF3B301A", color: "#FF3B30"},
            cancel: cancelAction,
        });
        return;
    }

    // 💥 Server or Unknown Errors
    if (status >= 500) {
        toast("Internal Server Error", {
            description: (
                <p className="text-red-600">
                    {message || "Unable to process request. Please try again later."}
                </p>
            ),
            style: {borderColor: "#FF3B301A", color: "#FF3B30"},
            cancel: cancelAction,
        });
        return;
    }

    toast("Error", {
        description: <p className="text-red-600">{message}</p>,
        style: {borderColor: "#FF3B301A", color: "#FF3B30"},
        cancel: cancelAction,
    });
}