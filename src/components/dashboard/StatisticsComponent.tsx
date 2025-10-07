import React, {FC} from 'react'
import type { IconType } from "react-icons"
import { FaCaretUp, FaCaretDown } from "react-icons/fa"

interface Props {
    icon: IconType
    title: string
    value: string | number
    change: string
}

const StatisticsComponent: FC<Props> = ({icon: Icon, title, value, change}) => {

    const isPositive = change.startsWith("+")
    const isNegative = change.startsWith("-")
    const changeColor = isPositive ? "text-green-500" : isNegative ? "text-red-500" : "text-muted-foreground"
    const CaretIcon = isPositive ? FaCaretUp : FaCaretDown

    return (
        <div className="flex space-x-3 items-center">
            <div className="w-9 h-9 bg-gray-100 flex items-center justify-center rounded-full">
                <Icon size={20} />
            </div>
            <div>
                <p className="font-semibold text-sm">{title}</p>
                <div className="flex space-x-3 items-baseline">
                    <div>{value}</div>
                    <div className={`flex items-baseline text-xs ${changeColor}`}>
                        <CaretIcon />
                        <p>{change}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default StatisticsComponent
