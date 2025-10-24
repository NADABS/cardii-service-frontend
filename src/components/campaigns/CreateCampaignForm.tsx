import React, {FormEvent, useState} from "react"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {MultiSelect, MultiSelectChangeEvent} from "primereact/multiselect"
import {Button} from "@/components/ui/button"
import {handleSuccess} from "@/src/lib/successHandler"
import InterestCategory from "@/src/types/InterestCategory"
import {useMutation} from "@tanstack/react-query";
import {httpPOST} from "@/src/lib/http-client";
import {handleError} from "@/src/lib/errorHandler";

interface Props {
    interestCategories: InterestCategory[]
    handleClose: () => void
    bearerToken: string
}

const CreateCampaignForm = ({interestCategories, handleClose, bearerToken}: Props) => {
    const defaultFormData = {title: "", message: "", categoryIds: [] as string[]}
    const [newCampaignData, setNewCampaignData] = useState(defaultFormData)

    function resetForm() {
        setNewCampaignData(defaultFormData)
        handleClose()
    }

    const { mutate, isPending } = useMutation({
        mutationFn: async (payload: typeof defaultFormData) => {
            const response = await httpPOST(
                `${process.env.NEXT_PUBLIC_CARDII_API_BASE_URL}/v1/campaigns`,
                payload,
                { "Content-Type": "application/json" },
                bearerToken
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
        mutate(newCampaignData)
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
                    value={newCampaignData.title}
                    onChange={(e) =>
                        setNewCampaignData({...newCampaignData, title: e.target.value})
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
                    onChange={(event: MultiSelectChangeEvent) =>
                        setNewCampaignData({
                            ...newCampaignData,
                            categoryIds: event.value,
                        })
                    }
                    options={interestCategories}
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
                        newCampaignData.title === "" ||
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