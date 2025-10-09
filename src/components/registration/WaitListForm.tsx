"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {useRouter} from "next/navigation";
import {RegistrationComponent} from "@/src/types/RegistrationComponentType";

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

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        setActiveComponent('verification');
    }

    return (
        <div className="w-full max-w-2xl  rounded-lg sm:mt-4 md:p-12">

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
                        className="h-12 text-base bg-white border-border"
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
                        className="h-12 text-base bg-white border-border"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-normal">
                        <span className="text-red-500">*</span>Phone Number
                    </Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter a valid phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="h-12 text-base bg-white border-border"
                    />
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
                        <SelectTrigger id="description" className="h-12 w-full text-base bg-white border-border">
                            <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="driver">Driver</SelectItem>
                            <SelectItem value="commuter">Commuter</SelectItem>
                            <SelectItem value="business">Business Owner</SelectItem>
                            <SelectItem value="fleet">Fleet Manager</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="pt-6 space-y-4">
                    <Button type="submit" className="w-full h-12 text-base bg-[#1a1d2e] hover:bg-[#2a2d3e] text-white">
                        Join Waitlist
                    </Button>
                    <button onClick={()=>router.replace('/')} type="button" className="w-full text-base text-foreground/80 hover:text-foreground transition-colors">
                        Back to Website
                    </button>
                </div>
            </form>
        </div>
    )
}