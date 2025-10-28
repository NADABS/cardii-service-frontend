import React, {PropsWithChildren} from 'react'
import Sidebar from "@/src/components/Sidebar";

const PageLayout = ({children}: PropsWithChildren) => {
    return (
        <div className="w-screen h-screen flex">
            <aside className="h-full w-[20%] max-w-[250px]">
                <Sidebar />
            </aside>
            <div className="flex-1 h-full p-4">
                {children}
            </div>
        </div>
    )
}
export default PageLayout
