import React, {PropsWithChildren} from 'react'
import Sidebar from "@/src/components/Sidebar";

const PageLayout = ({children}: PropsWithChildren) => {
    return (
        <div className="w-screen h-screen flex">
            <aside className="h-full w-[20%]">
               <Sidebar />
            </aside>
            <div className="w-[80%] h-full">
                {children}
            </div>
        </div>
    )
}
export default PageLayout
