'use client';
import React, {useState} from "react";
import {RegistrationComponent} from "@/src/types/RegistrationComponentType";
import {WaitlistForm} from "@/src/components/registration/WaitListForm";
import {OTPVerification} from "@/src/components/registration/OTPVerification";
import {SuccessScreen} from "@/src/components/registration/SuccessScreen";

export default function RegisterPage() {

    const [activeComponent, setActiveComponent] = useState<RegistrationComponent>("waitlistForm");

    const registrationComponents: Record<string, React.ReactNode> = {
        waitlistForm: <WaitlistForm setActiveComponent={setActiveComponent}/>,
        success: <SuccessScreen/>
    }

    return (
        <div className="w-full  flex flex-col items-center justify-center">
            <div className="lg:mt-6 text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-balance">
                    Join the waitlist for early access to our connected mobility platform
                </div>
                <div className="text-base text-foreground/80 leading-relaxed">
                    We&apos;ll notify you as soon as we launch in your area,
                    <br/>
                    plus send you early updates and offers that match what you do.
                </div>
            </div>
            <div className="w-full ">{registrationComponents[activeComponent]}</div>
        </div>
    )
}