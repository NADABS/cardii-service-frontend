"use client"
import React, {FormEvent, useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {InputGroup} from "@/components/ui/input-group";
import {Label} from "@/components/ui/label"
import {useRouter} from "next/navigation";
import {RegistrationComponent} from "@/src/types/RegistrationComponentType";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {OTPVerification} from "@/src/components/registration/OTPVerification";
import {Check, ChevronDown} from "lucide-react";
import {MultiSelect, MultiSelectChangeEvent} from 'primereact/multiselect';
import {Drawer, DrawerContent, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {useMutation} from "@tanstack/react-query";
import {toJsonString} from "@/src/lib/storage";
import {handleError} from "@/src/lib/errorHandler";
import {httpPOST} from "@/src/lib/http-client";
import {capitalizeFirstLetter} from "@/src/lib/utils";

interface OptionType {
    name: string;
    externalId: string;
}

interface Props {
    setActiveComponent: (activeComponent: RegistrationComponent) => void;
    interestCategories: OptionType[]
}

export function WaitlistForm({setActiveComponent, interestCategories}: Props) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        interestCategoryIds: [] as OptionType[],
    })

    const [isVerified, setIsVerified] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const router = useRouter();

    const apiBaseUrl = process.env.NEXT_PUBLIC_CARDII_API_BASE_URL;

    const sendOTPMutation = useMutation({
        mutationFn: async (postRequest: any) => {
            const response = await httpPOST(
                `${apiBaseUrl}/v1/otp/send`,
                postRequest,
                {"Content-Type": "application/json"}
            );

            return response.data
        },
        onSuccess: (_data) => setIsDialogOpen(true),
        onError: (error) => handleError(error)
    });

    const registerPartnerMutation = useMutation({
        mutationFn: async (postRequest: any) => {
            const response = await httpPOST(
                `${apiBaseUrl}/v1/partners`,
                postRequest,
                {
                    "Content-Type": "application/json",
                }
            );

            return response.data;
        },
        onSuccess: () => setActiveComponent("success"),
        onError: (error) => handleError(error)
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        registerPartnerMutation.mutate({
            ...formData,
            interestCategoryIds: formData.interestCategoryIds.map((category) => category.externalId)
        });
    };

    const handleMobileOptionToggle = (option: OptionType) => {
        const isSelected = formData.interestCategoryIds.some((item) => item.externalId === option.externalId)
        if (isSelected) {
            setFormData({
                ...formData,
                interestCategoryIds: formData.interestCategoryIds.filter((item) => item.externalId !== option.externalId),
            })
        } else {
            setFormData({
                ...formData,
                interestCategoryIds: [...formData.interestCategoryIds, option],
            })
        }
    }

    const handleOnVerifyClick = () => {
        sendOTPMutation.mutate({phoneNumber: formData.phoneNumber})
    }

    return (
        <div className="w-full  flex flex-col items-center  rounded-lg pt-4 md:p-4">

            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-[400px] sm:justify-start">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-normal">
                        <span className="text-red-500">*</span>Name
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className={`h-10 text-base bg-white border-border`}
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
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        className={`h-10 text-base bg-white border-border`}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-normal">
                        <span className="text-red-500">*</span>Phone Number
                    </Label>
                    <div className="flex w-full space-x-2">

                        <InputGroup className="w-full">
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="Enter  number"
                                value={formData.phoneNumber}
                                onChange={(e) => {
                                    if (!isVerified) {
                                        setFormData({...formData, phoneNumber: e.target.value});
                                    }
                                }}
                                required
                                readOnly={isVerified}
                                className={`h-10 text-base bg-white border-border ${
                                    isVerified ? "cursor-not-allowed opacity-80" : ""
                                }`}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                {isVerified ? (
                                    <div className="flex items-center justify-center text-green-500">
                                        <Check className="w-5 h-5"/>
                                    </div>
                                ) : (
                                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                        <button
                                            type="button"
                                            disabled={formData.phoneNumber.length < 10 || sendOTPMutation.isPending}
                                            onClick={() => handleOnVerifyClick()}
                                            className="h-8 flex items-center justify-center px-3 rounded-md text-xs font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                                        >
                                            {sendOTPMutation.isPending ? "Sending..." : "Verify"}
                                        </button>

                                        <DialogContent
                                            className="sm:w-[90%] p-1"
                                            onInteractOutside={(e) => e.preventDefault()}
                                        >
                                            <DialogTitle/>
                                            <OTPVerification
                                                phoneNumber={formData.phoneNumber}
                                                onVerifySuccess={() => {
                                                    setIsVerified(true);
                                                    setIsDialogOpen(false);
                                                }}
                                            />
                                        </DialogContent>
                                    </Dialog>

                                )}
                            </div>
                        </InputGroup>
                    </div>
                </div>


                <div className="space-y-2">
                    <Label htmlFor="description" className="text-base font-normal">
                        <span className="text-red-500">*</span>What Best Describes You?
                    </Label>
                    <div className="hidden md:block ">
                        <MultiSelect
                            id="description"
                            value={formData.interestCategoryIds}
                            onChange={(event: MultiSelectChangeEvent) => setFormData({
                                ...formData,
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

                    <div className="md:hidden">
                        <button
                            type="button"
                            onClick={() => setIsDrawerOpen(true)}
                            className="w-full h-10 px-3 text-base bg-white border border-border rounded-md flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                            <span
                                className={formData.interestCategoryIds.length === 0 ? "text-muted-foreground" : "text-foreground"}>
                                {formData.interestCategoryIds.length === 0
                                    ? "Select one or more options"
                                    : `${formData.interestCategoryIds.length} selected`}
                            </span>
                            <ChevronDown className="w-4 h-4 text-muted-foreground"/>
                        </button>

                        {formData.interestCategoryIds.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.interestCategoryIds.map((item) => (
                                    <span
                                        key={item.externalId}
                                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                                    >
                                        {capitalizeFirstLetter(item.name)}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle className="text-center">
                                    <span className="text-red-500">*</span>What Best Describes You?
                                </DrawerTitle>
                            </DrawerHeader>
                            <div className="px-4 pb-6 space-y-2 max-h-[60vh] overflow-y-auto">
                                {interestCategories.map((option) => {
                                    const isSelected = formData.interestCategoryIds.some((item) => item.externalId === option.externalId)
                                    return (
                                        <button
                                            key={option.externalId}
                                            type="button"
                                            onClick={() => handleMobileOptionToggle(option)}
                                            className={`w-full text-left px-4 py-4 rounded-md border transition-colors ${
                                                isSelected ? "bg-blue-50 border-blue-500" : "bg-white border-border hover:bg-gray-50"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-base">{capitalizeFirstLetter(option.name)}</span>
                                                {isSelected && <Check className="w-5 h-5 text-blue-500"/>}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
                <div className="pt-6 space-y-4">
                    <Button type="submit" disabled={!isVerified || formData.interestCategoryIds.length == 0}
                            className="w-full h-10 text-base bg-[#1a1d2e] hover:bg-[#2a2d3e] text-white">
                        Join Waitlist
                    </Button>
                    <button onClick={() => router.replace('/')} type="button"
                            className="w-full cursor-pointer border rounded-md py-2 text-base text-foreground/80 hover:text-foreground transition-colors">
                        Back to Website
                    </button>
                </div>
            </form>
        </div>
    )
}