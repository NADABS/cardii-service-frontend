"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputGroup } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label"
import {useRouter} from "next/navigation";
import {RegistrationComponent} from "@/src/types/RegistrationComponentType";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {OTPVerification} from "@/src/components/registration/OTPVerification";
import {Check, ChevronDown} from "lucide-react";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import {Drawer, DrawerContent, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";

interface Props {
    setActiveComponent: (activeComponent: RegistrationComponent) => void;
}

interface OptionType {
    name: string;
    code: string;
}

export function WaitlistForm({setActiveComponent}: Props) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        description: [] as OptionType[],
    })

    const [isVerified, setIsVerified] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const router = useRouter();

    const options: OptionType[] = [
        { name: "Car Owner / Fleet Manager", code: "driver" },
        { name: "Driver", code: "commuter" },
        { name: "Roadside Support (Towing / Fuel Support)", code: "business" },
        { name: "Learner (Defensive driving training)", code: "fleet" },
        { name: "Other", code: "other" },
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        setActiveComponent('success');
    }

    const handleMobileOptionToggle = (option: OptionType) => {
        const isSelected = formData.description.some((item) => item.code === option.code)
        if (isSelected) {
            setFormData({
                ...formData,
                description: formData.description.filter((item) => item.code !== option.code),
            })
        } else {
            setFormData({
                ...formData,
                description: [...formData.description, option],
            })
        }
    }

    return (
        <div className="w-full  flex flex-col items-center  rounded-lg pt-4 md:p-4">

            <form onSubmit={handleSubmit} className="space-y-6 min-w-[60%] max-w-[80%] sm:justify-start">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-normal">
                        <span className="text-red-500">*</span>Name
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        readOnly={isVerified}
                        className={`h-10 text-base bg-white border-border ${
                            isVerified ? "cursor-not-allowed opacity-80" : ""
                        }`}
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
                        readOnly={isVerified}
                        className={`h-10 text-base bg-white border-border ${
                            isVerified ? "cursor-not-allowed opacity-80" : ""
                        }`}
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
                                value={formData.phone}
                                onChange={(e) => {
                                    if (!isVerified) {
                                        setFormData({ ...formData, phone: e.target.value });
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
                                        <Check className="w-5 h-5" />
                                    </div>
                                ) : (
                                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                        <DialogTrigger
                                            type="button"
                                            disabled={formData.phone.length < 9}
                                            className="h-8 flex items-center justify-center px-3 rounded-md text-xs font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                                            onClick={() => setIsDialogOpen(true)}
                                        >
                                            Verify
                                        </DialogTrigger>

                                        <DialogContent
                                            className="sm:w-[90%] p-1"
                                            onInteractOutside={(e) => e.preventDefault()}
                                        >
                                            <DialogTitle />
                                            <OTPVerification
                                                phoneNumber={formData.phone}
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
                    <div className="hidden md:block">
                        <MultiSelect
                            id="description"
                            value={formData.description}
                            onChange={(e: MultiSelectChangeEvent) => setFormData({ ...formData, description: e.value })}
                            options={options}
                            display="chip"
                            optionLabel="name"
                            placeholder="Select one or more options"
                            className="w-full text-base focus:outline-none focus:ring-0 focus:border-none"
                            maxSelectedLabels={3}
                            required
                            selectAllLabel="Select All"
                            pt={{
                                label: { className: "text-blue-500 text-sm" },
                                token: { className: "rounded-full bg-blue-200" },
                            }}
                        />
                    </div>

                    <div className="md:hidden">
                        <button
                            type="button"
                            onClick={() => setIsDrawerOpen(true)}
                            className="w-full h-10 px-3 text-base bg-white border border-border rounded-md flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
              <span className={formData.description.length === 0 ? "text-muted-foreground" : "text-foreground"}>
                {formData.description.length === 0
                    ? "Select one or more options"
                    : `${formData.description.length} selected`}
              </span>
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </button>

                        {formData.description.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.description.map((item) => (
                                    <span
                                        key={item.code}
                                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                                    >
                    {item.name}
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
                                {options.map((option) => {
                                    const isSelected = formData.description.some((item) => item.code === option.code)
                                    return (
                                        <button
                                            key={option.code}
                                            type="button"
                                            onClick={() => handleMobileOptionToggle(option)}
                                            className={`w-full text-left px-4 py-4 rounded-md border transition-colors ${
                                                isSelected ? "bg-blue-50 border-blue-500" : "bg-white border-border hover:bg-gray-50"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-base">{option.name}</span>
                                                {isSelected && <Check className="w-5 h-5 text-blue-500" />}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
                <div className="pt-6 space-y-4">
                    <Button type="submit" disabled={!isVerified} className="w-full h-10 text-base bg-[#1a1d2e] hover:bg-[#2a2d3e] text-white">
                        Join Waitlist
                    </Button>
                    <button onClick={()=>router.replace('/')} type="button" className="w-full cursor-pointer border rounded-md py-2 text-base text-foreground/80 hover:text-foreground transition-colors">
                        Back to Website
                    </button>
                </div>
            </form>
        </div>
    )
}