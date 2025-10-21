import React, {FormEvent, useState} from 'react'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {MultiSelect, MultiSelectChangeEvent} from "primereact/multiselect";
import {Button} from "@/components/ui/button";
import {handleSuccess} from "@/src/lib/successHandler";
import InterestCategory from "@/src/types/InterestCategory";

interface Props {
    interestCategories: InterestCategory[]
}

const CreateCampaignForm = ({interestCategories}: Props) => {

    const defaultFormData = { title: "", message: "", interestCategoryIds: [] as InterestCategory[]}

    const [newCampaignData, setNewCampaignData] = useState(defaultFormData)
    function resetForm () {
        setNewCampaignData(defaultFormData);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        resetForm();
        handleSuccess("Campaign created");
    };

    return (
        <form onSubmit={handleSubmit} className="py-4 space-y-3">
            <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-normal">
                    <span className="text-red-500">*</span>Title
                </Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Enter title"
                    value={newCampaignData.title}
                    onChange={(e) => setNewCampaignData({...newCampaignData, title: e.target.value})}
                    required
                    className={`h-10 text-base bg-white border-border`}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="message" className="text-base font-normal">
                    <span className="text-red-500">*</span>Message
                </Label>
                <textarea required
                          className="border focus:outline-none p-3 h-36 w-full rounded-lg"
                          value={newCampaignData.message}
                          onChange={(e) => setNewCampaignData({...newCampaignData, message: e.target.value})}
                          placeholder="Enter message"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="message" className="text-base font-normal">
                    <span className="text-red-500">*</span>Recipient Groups
                </Label>
                <MultiSelect
                    id="description"
                    value={newCampaignData.interestCategoryIds}
                    onChange={(event: MultiSelectChangeEvent) => setNewCampaignData({
                        ...newCampaignData,
                        interestCategoryIds: event.value
                    })}
                    options={interestCategories}
                    display="chip"
                    optionLabel="name"
                    placeholder="Select one or more options"
                    className="w-full h-10 rounded-md text-base capitalize focus:outline-none focus:ring-0 focus:border-none"
                    maxSelectedLabels={3}
                    required
                    selectAllLabel="Select All"
                    pt={{
                        root: {className: "focus:outline-none focus:ring-0 flex items-center focus:border-none capitalize shadow-none"},
                        label: {className: "text-blue-500 text-sm capitalize"},
                        token: {className: "rounded-full bg-blue-200 capitalize"},
                        item: {className: "capitalize"},
                        list: {className: "capitalize"},
                    }}
                />
            </div>
            <div className="py-4 w-full flex justify-between items-center">
                <Button onClick={resetForm} type="reset">
                    Cancel
                </Button>
                <Button
                    disabled={newCampaignData.title=="" || newCampaignData.message == "" || newCampaignData.interestCategoryIds.length ==0}
                    type="submit">
                    Send
                </Button>
            </div>
        </form>
    )
}
export default CreateCampaignForm
