import {FC} from 'react'
import {formatStatus, statusColourMap} from "@/src/lib/utils";

interface Prop {
    status: string;
}

const StatusBadge:FC<Prop> = ({status}) => {
    return (
        <div
            className={`items-center w-fit py-[0.125rem] px-[0.625rem] text-xs border rounded-full justify-center flex ${statusColourMap[formatStatus(status)]} `}
        >
            {status}
        </div>
    )
}
export default StatusBadge
