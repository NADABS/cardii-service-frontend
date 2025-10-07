import React, {PropsWithChildren} from 'react'
import Sidebar from "@/components/Sidebar";

const PageLayout = ({children}: PropsWithChildren) => {
    return (
        <div className="w-screen h-screen flex">
            <aside className="h-full w-[20%]">
               <Sidebar />
            </aside>
            <div>
                {children}
            </div>
        </div>
    )
}
export default PageLayout
