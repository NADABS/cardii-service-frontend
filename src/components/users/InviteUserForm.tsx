import React, { FormEvent, useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { httpPOST } from "@/src/lib/http-client"
import { handleSuccess } from "@/src/lib/successHandler"
import { handleError } from "@/src/lib/errorHandler"
import { getItem } from "@/src/lib/storage"

interface Props {
    handleClose: () => void
}

const InviteUserForm = ({ handleClose }: Props) => {
    const defaultFormData = { name: "", email: "" }
    const [formData, setFormData] = useState(defaultFormData)

    const [userDetails, setUserDetails] = useState({
        bearerToken: "",
        externalId: "",
    })

    useEffect(() => {
        setUserDetails(getItem("userDetails"))
    }, [])

    const resetForm = () => {
        setFormData(defaultFormData)
        handleClose()
    }

    const { mutate, isPending } = useMutation({
        mutationFn: async (payload: typeof defaultFormData) => {
            const response = await httpPOST(
                `${process.env.NEXT_PUBLIC_CARDII_API_BASE_URL}/v1/users/invite`,
                payload,
                { "Content-Type": "application/json" },
                userDetails.bearerToken
            )
            return response.data
        },
        onSuccess: () => {
            handleSuccess("User Invited!")
            resetForm()
        },
        onError: (error) => {
            handleError(error)
        },
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        if (!form.checkValidity()) {
            form.reportValidity()
            return
        }

        mutate({ name: formData.name, email: formData.email, role: 'admin' })
    }

    return (
        <form onSubmit={handleSubmit} className="py-4 space-y-3 font-normal">
            {/* Name Field */}
            <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-normal">
                    <span className="text-red-500">*</span>Name
                </Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="h-10 text-base font-normal bg-white border-border placeholder:font-normal placeholder:text-muted-foreground"
                />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-normal">
                    <span className="text-red-500">*</span>Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="h-10 text-base font-normal bg-white border-border placeholder:font-normal placeholder:text-muted-foreground"
                />
            </div>

            {/* Form Actions */}
            <div className="pt-4 w-full flex items-center justify-end gap-4">
                <Button
                    type="reset"
                    onClick={resetForm}
                    variant="outline"
                    disabled={isPending}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={
                        formData.email === "" || formData.name === "" || isPending
                    }
                >
                    {isPending ? "Sending Invitation..." : "Invite"}
                </Button>
            </div>
        </form>
    )
}

export default InviteUserForm
