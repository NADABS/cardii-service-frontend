"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {useRouter} from "next/navigation";
import {RegistrationComponent} from "@/src/types/RegistrationComponentType";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {OTPVerification} from "@/src/components/registration/OTPVerification";
import {Check} from "lucide-react";

interface Props {
    setActiveComponent: (activeComponent: RegistrationComponent) => void;
}

export function WaitlistForm({setActiveComponent}: Props) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        description: "",
    })

    const [isVerified, setIsVerified] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        setActiveComponent('success');
    }

    return (
        <div className="w-full max-w-2xl  rounded-lg pt-4 md:p-4">

            <form onSubmit={handleSubmit} className="space-y-6 sm:justify-start">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-normal">
                        <span className="text-red-500">*</span>Name
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full Name"
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
                        placeholder="Enter a valid email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        readOnly={isVerified}
                        className={`h-10 text-base bg-white border-border ${
                            isVerified ? "cursor-not-allowed opacity-80" : ""
                        }`}
                    />
                </div>

                <div className="flex w-full space-x-2">
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter a valid phone number"
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

                    {isVerified ? (
                        <div className="h-10 flex items-center justify-center px-3 text-green-500">
                            <Check className="w-5 h-5" />
                        </div>
                    ) : (
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger
                                type="button"
                                disabled={formData.phone.length < 9}
                                className="h-10 flex items-center justify-center px-3 rounded-md text-sm transition-colors bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
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

                <div className="space-y-2">
                    <Label htmlFor="description" className="text-base font-normal">
                        <span className="text-red-500">*</span>What Best Describes You?
                    </Label>
                    <Select
                        value={formData.description}
                        onValueChange={(value) => setFormData({ ...formData, description: value })}
                        required

                    >
                        <SelectTrigger id="description" className="h-10 w-full text-base bg-white border-border">
                            <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="driver">Car Owner / Fleet Manager</SelectItem>
                            <SelectItem value="commuter">Driver</SelectItem>
                            <SelectItem value="business">Roadside Support (Towing / Fuel Support)</SelectItem>
                            <SelectItem value="fleet">Learner (Defensive driving training)</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
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