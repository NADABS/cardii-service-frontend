import PageLayout from "@/components/PageLayout";
import {PropsWithChildren} from "react";

const MainViewLayout = ({children}: PropsWithChildren) => {
    return (
        <PageLayout>
            {children}
        </PageLayout>
    )
}

export default MainViewLayout;