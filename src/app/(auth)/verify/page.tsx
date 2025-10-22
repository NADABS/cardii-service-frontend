"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import {FormEvent, useEffect, useState} from "react"
import { httpPOST } from "@/src/lib/http-client"
import { handleError } from "@/src/lib/errorHandler"
import { Button } from "@/components/ui/button"
import {CustomSpinner} from "@/src/components/CustomSpinner";
import {Input} from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react"
import {setItem} from "@/src/lib/storage";

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [hasError, setHasError] = useState(false)
    const [userDetails, setUserDetails] = useState<{ name: string; email: string } | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")
    const [missingRequirements, setMissingRequirements] = useState<string[]>([]);
    const [displayLoader, setDisplayLoader] = useState<boolean>(false);

    const apiBaseUrl = process.env.NEXT_PUBLIC_CARDII_API_BASE_URL;

    const verifyEmail = useMutation({
        mutationFn: async (postRequest: any) => {
            const response = await httpPOST(`${apiBaseUrl}/v1/users/verify`, postRequest, {
                "Content-Type": "application/json",
            })

            return response.data
        },
        onSuccess: (data) => {
            setUserDetails({
                name: data.data.name,
                email: data.data.email,
            })
        },
        onError: (error) => {
            setDisplayLoader(false);
            setHasError(true)
            handleError(error)
        },
    })

    const createUser = useMutation({
        mutationFn: async (postRequest: any) => {
            const response = await httpPOST(`${apiBaseUrl}/v1/users`, postRequest, {
                "Content-Type": "application/json",
            })
            return response.data
        },
        onSuccess: (data) => {
            setItem("userDetails", data.data);
            router.push("/overview");
        },
        onError: (error) => {handleError(error)}
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisplayLoader(true);
        createUser.mutate({
            token: token,
            password: password,
        })
    }

    function getMissingPasswordRequirements(_password: string): string[] {
        const issues: string[] = [];

        if (_password.length < 8) {
            issues.push("at least 8 characters");
        }

        if (!/[A-Z]/.test(_password)) {
            issues.push("an uppercase letter");
        }

        if (!/[0-9]/.test(_password)) {
            issues.push("a number");
        }

        if (!/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]`~;]/.test(_password)) {
            issues.push("a special symbol");
        }

        return issues;
    }

    function validatePassword (passwordInput: string) {
        setPassword(passwordInput)
        if (passwordInput.length >=3) {
            const passwordIssues = getMissingPasswordRequirements(passwordInput);
            setMissingRequirements(passwordIssues);
        }
    }

    const passwordIsValid = missingRequirements.length === 0 && password.length >= 3;

    useEffect(() => {
        if (token && token.trim() !== "") {
            verifyEmail.mutate({ token })
        }
    }, [token])

    if (verifyEmail.isPending || displayLoader) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <CustomSpinner />
            </div>
        )
    }

    if (!token || token.trim() === "" || hasError) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center ">
                <div className="text-center space-y-6">
                    <h1 className="text-2xl font-bold">Oops. Looks like you may be lost.</h1>
                    <p>If you landed here via email, check your email and click on the link without altering the URL</p>
                    <Button onClick={() => router.push("/")} size="lg">
                        Back To Safety
                    </Button>
                </div>
            </div>
        )
    }

    if (userDetails) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-[400px] space-y-6">
                    <div>
                        <h1 className="text-2xl text-center font-bold">Create Account</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 max-w-[400px]">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Name
                            </label>
                            <Input id="name" type="text" value={userDetails.name} readOnly className="bg-muted" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <Input id="email" type="email" value={userDetails.email} readOnly className="bg-muted" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => validatePassword(e.target.value)}
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
                            { passwordIsValid ? (
                                <span className="text-green-600 text-xs">Password meets requirements</span>
                            ) : missingRequirements.length > 0 ? (
                                <span className="text-red-500 text-xs">
                                    Password is missing: {missingRequirements.join(", ")}
                                </span>
                            ) : (
                                <div className="text-xs text-[#64748B] mb-1">
                                    Password should be at least 8 characters with an uppercase letter, number, and symbol.
                                </div>
                            )}
                        </div>
                        <Button className="w-full" disabled={!passwordIsValid} type="submit">Create User</Button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <CustomSpinner/>
        </div>
    )
}
