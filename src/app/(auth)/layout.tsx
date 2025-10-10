import {PropsWithChildren} from "react";
import RegistrationLayout from "@/src/components/registration/RegistrationLayout";


const AuthLayout = ({children}: PropsWithChildren) => {
    return (
        <RegistrationLayout>
            {children}
        </RegistrationLayout>
    )
}

export default AuthLayout;