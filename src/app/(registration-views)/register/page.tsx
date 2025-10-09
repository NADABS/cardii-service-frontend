'use client';
import React, {useState} from "react";
import {RegistrationComponent} from "@/src/types/RegistrationComponentType";
import {WaitlistForm} from "@/src/components/registration/WaitListForm";
import {OTPVerification} from "@/src/components/registration/OTPVerification";
import {SuccessScreen} from "@/src/components/registration/SuccessScreen";

export default function Page() {

    const [activeComponent, setActiveComponent] = useState<RegistrationComponent>("waitlistForm");

    const registrationComponents: Record<string, React.ReactNode> = {
        waitlistForm: <WaitlistForm setActiveComponent={setActiveComponent} />,
        verification: <OTPVerification phoneNumber={"0572205555"} setActiveComponent={setActiveComponent} />,
        success: <SuccessScreen />
    }

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="mb-4">
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
                    Join the waitlist for early access to our connected mobility platform
                </div>
                <div className="text-base text-foreground/80 leading-relaxed">
                    We&apos;ll notify you as soon as we launch in your area,
                    <br />
                    plus send you early updates and offers that match what you do.
                </div>
            </div>
            {
            registrationComponents[activeComponent]
        }</div>
    )
}