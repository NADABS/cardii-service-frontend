import {getToday} from "@/src/lib/utils";
import {PiCalendarDotsBold} from "react-icons/pi";
import StatisticsSection from "@/src/components/dashboard/StatisticsSection";
import {BiLike, BiTrendingUp} from "react-icons/bi";
import {CiStopwatch} from "react-icons/ci";
import {PerformanceComponent} from "@/src/components/dashboard/PerformanceComponent";
import {CurrentTasksTable} from "@/src/components/dashboard/CurrentTasksTable";

export default function OverviewPage() {

    const today = getToday();

    return (
        <div className="w-full h-full pl-8 pr-4 pt-8 overflow-hidden">
            <div className="w-full flex justify-between items-baseline">
                <div>
                    <h1 className="text-2xl font-bold">Hello, Margaret</h1>
                </div>
                <div className="flex space-x-4 items-center">
                    <p className="text-sm">{today}</p>
                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100">
                        <PiCalendarDotsBold/>
                    </div>
                </div>
            </div>
            <div className="text-gray-400">
                Track team progress here. You&apos;ve almost met your goals
            </div>
            <div className="overflow-y-scroll" style={{height: 'calc(100vh - 120px)'}}>
                <StatisticsSection stats={[
                    {
                        icon: BiLike,
                        title: "Finished",
                        value: 18,
                        change: "+8 tasks",
                    },
                    {
                        icon: CiStopwatch,
                        title: "Tracked",
                        value: "31h",
                        change: "-6 hours",
                    },
                    {
                        icon: BiTrendingUp,
                        title: "Efficiency",
                        value: "93%",
                        change: "+12%",
                    },
                ]}/>
                <PerformanceComponent/>
                <CurrentTasksTable/>
            </div>

        </div>
    )
}