import React, { FormEvent, useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMutation } from "@tanstack/react-query"
import { httpPOST } from "@/src/lib/http-client"
import { handleSuccess } from "@/src/lib/successHandler"
import { handleError } from "@/src/lib/errorHandler"
import { getItem } from "@/src/lib/storage"
import Role from "@/src/types/Role"

interface Props {
    handleClose: () => void
    roles: Role[]
}

const InviteUserForm = ({ handleClose, roles }: Props) => {
    const defaultFormData = { name: "", email: "", role: "" }
    const [formData, setFormData] = useState(defaultFormData)

    const [userDetails, setUserDetails] = useState({
        bearerToken: "",
        externalId: "",
    })


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

        mutate({
            name: formData.name,
            email: formData.email,
            role: formData.role,
        })
    }

    useEffect(() => {
        setUserDetails(getItem("userDetails"))
    }, [])

    return (
        <form onSubmit={handleSubmit} className="py-4 space-y-3 font-normal">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-normal">
                    <span className="text-red-500">*</span>Name
                </Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-10 text-base font-normal bg-white border-border placeholder:font-normal placeholder:text-muted-foreground"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-normal">
                    <span className="text-red-500">*</span>Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-10 text-base font-normal bg-white border-border placeholder:font-normal placeholder:text-muted-foreground"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="role" className="text-base font-normal">
                    <span className="text-red-500">*</span>Role
                </Label>
                <Select
                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                    value={formData.role}
                >
                    <SelectTrigger className="h-10 text-base font-normal w-full bg-white border-border focus:ring-primary">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        {roles.map((role) => (
                            <SelectItem key={role.name} value={role.name}>
                                {role.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
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
                        !formData.name || !formData.email || !formData.role || isPending
                    }
                >
                    {isPending ? "Sending Invitation..." : "Invite"}
                </Button>
            </div>
        </form>
    )
}

export default InviteUserForm