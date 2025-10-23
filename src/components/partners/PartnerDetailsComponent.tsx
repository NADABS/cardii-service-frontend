import React from 'react'

interface Prop {
    title?: string
    value?: string | null
}

const PartnerDetailsComponent = ({title, value}: Prop) => {
    return (
        <div>
            <p className="font-[500] ">{title ?? ""}</p>
            <p className="text-[0.875rem] text-gray-400 mt-1">{value ?? ""}</p>
        </div>    )
}
export default PartnerDetailsComponent
