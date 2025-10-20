"use client";
import {toast} from "sonner";

export const handleSuccess = (message: string) => {
    toast("Success", {
        description: (
            <span style={{ color: "#00A86B" }}>
          {message}
        </span>
        ),
        style: {
            borderColor: "#00A86B1A",
            color: "#00A86B",
        },
        cancel: {
            label: "Close",
            onClick: () => {},
        },
    });
};