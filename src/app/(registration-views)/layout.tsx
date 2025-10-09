import {PropsWithChildren} from "react";
import RegistrationLayout from "@/src/components/registration/RegistrationLayout";


const RegistrationViewsLayout = ({children}: PropsWithChildren) => {
    return (
        <RegistrationLayout>
            {children}
        </RegistrationLayout>
    )
}

export default RegistrationViewsLayout;