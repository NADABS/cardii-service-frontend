import {PropsWithChildren} from "react";
import PageLayout from "@/src/components/PageLayout";

const MainViewLayout = ({children}: PropsWithChildren) => {
    return (
        <PageLayout>
            {children}
        </PageLayout>
    )
}

export default MainViewLayout;