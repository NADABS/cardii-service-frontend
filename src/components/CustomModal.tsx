"use client"
import { type ReactNode, useRef } from "react"
import { X } from "lucide-react"

interface CustomModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
    showCloseButton?: boolean
    size?: "sm" | "md" | "lg"
}

export function CustomModal({
                                isOpen,
                                onClose,
                                title,
                                children,
                                showCloseButton = true,
                                size = "md",
                            }: CustomModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)

    if (!isOpen) return null

    const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 animate-in fade-in-0 duration-200" aria-hidden="true" />

            <div
                ref={modalRef}
                className={`relative bg-background rounded-lg shadow-lg border border-border w-full mx-4 ${sizeClasses[size]} animate-in zoom-in-95 fade-in-0 duration-200`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="flex items-center justify-between px-6 pt-6 pb-3 ">
                    <h2 id="modal-title" className="text-lg font-semibold">
                        {title}
                    </h2>
                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            aria-label="Close modal"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <div className="px-6">{children}</div>
            </div>
        </div>
    )
}
