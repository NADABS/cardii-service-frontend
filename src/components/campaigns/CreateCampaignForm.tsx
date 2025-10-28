import React, {FormEvent, useEffect, useState} from "react"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {MultiSelect, MultiSelectChangeEvent} from "primereact/multiselect"
import {Button} from "@/components/ui/button"
import {handleSuccess} from "@/src/lib/successHandler"
import InterestCategory from "@/src/types/InterestCategory"
import {useMutation} from "@tanstack/react-query";
import {httpPOST} from "@/src/lib/http-client";
import {handleError} from "@/src/lib/errorHandler";
import {getItem} from "@/src/lib/storage";
import useFetch from "@/src/hooks/useFetch";

interface Props {
    handleClose: () => void
}

const CreateCampaignForm = ({handleClose}: Props) => {
    const defaultFormData = { name: "", message: "", categoryIds: [] as InterestCategory[] }
    const [newCampaignData, setNewCampaignData] = useState(defaultFormData)
    const [userDetails, setUserDetails] = useState({
        bearerToken: "",
        externalId: ""
    })

    function resetForm() {
        setNewCampaignData(defaultFormData)
        handleClose()
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_CARDII_API_BASE_URL;

    const {data: interestCategories} = useFetch(
        `${apiBaseUrl}/v1/interest-categories`,
        ["interestCategories"],
        {},
        userDetails.bearerToken,
        userDetails.bearerToken !== ""
    )

    const {mutate, isPending} = useMutation({
        mutationFn: async (payload: typeof defaultFormData) => {
            const response = await httpPOST(
                `${apiBaseUrl}/v1/campaigns`,
                payload,
                {"Content-Type": "application/json"},
                userDetails.bearerToken
            )
            return response.data
        },
        onSuccess: () => {
            handleSuccess("Campaign created")
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
            ...newCampaignData,
            categoryIds: newCampaignData.categoryIds.map((item: any) => item.externalId),
        })
    }

    useEffect(() => {
        setUserDetails(getItem("userDetails"))
    }, []);

    const handleRecipientGroupChange = (event: MultiSelectChangeEvent) => {
        setNewCampaignData({
            ...newCampaignData,
            categoryIds: event.value,
        })
    }

    return (
        <form onSubmit={handleSubmit} className="py-4 space-y-3 font-normal">
            <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-normal">
                    <span className="text-red-500">*</span>Title
                </Label>
                <Input
                    id="title"
                    type="text"
                    placeholder="Enter title"
                    value={newCampaignData.name}
                    onChange={(e) =>
                        setNewCampaignData({...newCampaignData, name: e.target.value})
                    }
                    required
                    className="h-10 text-base font-normal bg-white border-border placeholder:font-normal placeholder:text-muted-foreground"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="message" className="text-base font-normal">
                    <span className="text-red-500">*</span>Message
                </Label>
                <textarea
                    required
                    id="message"
                    className="border focus:outline-none p-3 h-36 w-full rounded-lg font-normal text-base placeholder:font-normal placeholder:text-muted-foreground"
                    value={newCampaignData.message}
                    onChange={(e) =>
                        setNewCampaignData({...newCampaignData, message: e.target.value})
                    }
                    placeholder="Enter message"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="recipientGroups" className="text-base font-normal">
                    <span className="text-red-500">*</span>Recipient Groups
                </Label>
                <MultiSelect
                    id="recipientGroups"
                    value={newCampaignData.categoryIds}
                    onChange={handleRecipientGroupChange}
                    options={interestCategories?.data || []}
                    display="chip"
                    optionLabel="name"
                    placeholder="Select one or more options"
                    className="w-full h-10 rounded-md text-base font-normal capitalize focus:outline-none focus:ring-0 focus:border-none"
                    maxSelectedLabels={3}
                    required
                    selectAllLabel="Select All"
                    pt={{
                        root: {
                            className:
                                "focus:outline-none focus:ring-0 flex items-center focus:border-none capitalize shadow-none font-normal",
                        },
                        label: {className: "text-blue-500 text-sm capitalize font-normal"},
                        token: {className: "rounded-full bg-blue-200 capitalize font-normal"},
                        item: {className: "capitalize font-normal"},
                        list: {className: "capitalize font-normal"},
                    }}
                />
            </div>

            <div className="pt-4 w-full flex items-center justify-end gap-4">
                <Button
                    type="reset"
                    onClick={resetForm}
                    variant="outline"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={
                        newCampaignData.name === "" ||
                        newCampaignData.message === "" ||
                        newCampaignData.categoryIds.length === 0
                    }
                >
                    {isPending ? "Creating Campaign..." : "Create"}
                </Button>
            </div>

        </form>
    )
}

export default CreateCampaignForm