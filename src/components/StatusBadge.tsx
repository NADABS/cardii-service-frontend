import {FC} from 'react'
import {formatStatus, statusColourMap} from "@/src/lib/utils";

interface Prop {
    status: string | null;
}

const StatusBadge:FC<Prop> = ({status}) => {
    if (!status) {
        return null;
    }

    return (
        <div
            className={`items-center w-fit py-[0.125rem] px-[0.625rem] capitalize text-xs border rounded-full justify-center flex ${statusColourMap[formatStatus(status)]} `}
        >
            {status}
        </div>
    )
}
export default StatusBadge