"use client";
import {FormEvent, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Eye, EyeOff} from "lucide-react";
import {useMutation} from "@tanstack/react-query";
import {httpPOST} from "@/src/lib/http-client";
import {setItem} from "@/src/lib/storage";
import {handleError} from "@/src/lib/errorHandler";
import {useRouter} from "next/navigation";
import {CustomSpinner} from "@/src/components/CustomSpinner";


export default function LoginPage() {

    const router = useRouter();

    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    })

    const [displayLoader, setDisplayLoader] = useState<boolean>(false);

    const login = useMutation({
        mutationFn: async (postRequest: any) => {
            const response = await httpPOST(`${process.env.NEXT_PUBLIC_CARDII_API_BASE_URL}/v1/login`, postRequest, {
                "Content-Type": "application/json",
            })
            return response.data
        },
        onSuccess: (data) => {
            setItem("userDetails", data.data);
            router.replace("/overview");
        },
        onError: (error) => {
            setDisplayLoader(false);
            handleError(error)
        }
    })

    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisplayLoader(true);
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        login.mutate(loginDetails)
    }

    if (displayLoader) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <CustomSpinner />
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-[400px] space-y-6">
                <div>
                    <h1 className="text-2xl text-center font-bold">Log In</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-[400px]">
                    <div className="space-y-2">
                        <label htmlFor="email" className=" font-medium">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={loginDetails.email}
                            placeholder="Enter your email"
                            required
                            onChange={(e)=> setLoginDetails({...loginDetails, email: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className=" font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={loginDetails.password}
                                required
                                onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value})}
                                placeholder="Enter your password"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </Button>
                        </div>
                    </div>
                    <Button className="w-full" type="submit">
                        Log In
                    </Button>
                </form>
            </div>
        </div>
    )
}