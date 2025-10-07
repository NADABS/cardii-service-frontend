import React, {FC} from 'react'
import StatisticsComponent from "@/src/components/dashboard/StatisticsComponent";
import {StatsType} from "@/src/types/StatsType";

interface Props {
    stats: StatsType[]
}

const StatisticsSection:FC<Props> = ({stats}) => {
    return (
    <div className="mt-12 flex items-center divide-x divide-gray-200 border-y py-4 border-gray-200">
        {stats.map((stat, index) => (
            <div key={index} className={index === 0 ? "pr-6" : "px-6"}>
                <StatisticsComponent icon={stat.icon} title={stat.title} value={stat.value} change={stat.change} />
            </div>
        ))}
    </div>
    )
}
export default StatisticsSection
