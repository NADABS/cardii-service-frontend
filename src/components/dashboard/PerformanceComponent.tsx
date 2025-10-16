"use client"

import * as React from "react"
import {Area, AreaChart, CartesianGrid, XAxis, YAxis} from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const chartData = [
    { date: "2024-04-01", unverified: 222, verified: 150 },
    { date: "2024-04-02", unverified: 97, verified: 180 },
    { date: "2024-04-03", unverified: 167, verified: 520 },
    { date: "2024-04-04", unverified: 242, verified: 260 },
    { date: "2024-04-05", unverified: 373, verified: 290 },
    { date: "2024-04-06", unverified: 301, verified: 340 },
    { date: "2024-04-07", unverified: 245, verified: 180 },
    { date: "2024-04-08", unverified: 409, verified: 320 },
    { date: "2024-04-09", unverified: 59, verified: 110 },
    { date: "2024-04-10", unverified: 261, verified: 190 },
    { date: "2024-04-11", unverified: 327, verified: 350 },
    { date: "2024-04-12", unverified: 292, verified: 210 },
    { date: "2024-04-13", unverified: 342, verified: 380 },
    { date: "2024-04-14", unverified: 137, verified: 220 },
    { date: "2024-04-15", unverified: 120, verified: 170 },
    { date: "2024-04-16", unverified: 138, verified: 190 },
    { date: "2024-04-17", unverified: 446, verified: 360 },
    { date: "2024-04-18", unverified: 364, verified: 410 },
    { date: "2024-04-19", unverified: 243, verified: 180 },
    { date: "2024-04-20", unverified: 89, verified: 150 },
    { date: "2024-04-21", unverified: 137, verified: 200 },
    { date: "2024-04-22", unverified: 224, verified: 170 },
    { date: "2024-04-23", unverified: 138, verified: 230 },
    { date: "2024-04-24", unverified: 387, verified: 290 },
    { date: "2024-04-25", unverified: 215, verified: 250 },
    { date: "2024-04-26", unverified: 75, verified: 130 },
    { date: "2024-04-27", unverified: 383, verified: 420 },
    { date: "2024-04-28", unverified: 122, verified: 180 },
    { date: "2024-04-29", unverified: 315, verified: 240 },
    { date: "2024-04-30", unverified: 454, verified: 380 },
    { date: "2024-05-01", unverified: 165, verified: 220 },
    { date: "2024-05-02", unverified: 293, verified: 310 },
    { date: "2024-05-03", unverified: 247, verified: 190 },
    { date: "2024-05-04", unverified: 385, verified: 420 },
    { date: "2024-05-05", unverified: 481, verified: 390 },
    { date: "2024-05-06", unverified: 498, verified: 520 },
    { date: "2024-05-07", unverified: 388, verified: 300 },
    { date: "2024-05-08", unverified: 149, verified: 210 },
    { date: "2024-05-09", unverified: 227, verified: 180 },
    { date: "2024-05-10", unverified: 293, verified: 330 },
    { date: "2024-05-11", unverified: 335, verified: 270 },
    { date: "2024-05-12", unverified: 197, verified: 240 },
    { date: "2024-05-13", unverified: 197, verified: 160 },
    { date: "2024-05-14", unverified: 448, verified: 490 },
    { date: "2024-05-15", unverified: 473, verified: 380 },
    { date: "2024-05-16", unverified: 338, verified: 400 },
    { date: "2024-05-17", unverified: 499, verified: 420 },
    { date: "2024-05-18", unverified: 315, verified: 350 },
    { date: "2024-05-19", unverified: 235, verified: 180 },
    { date: "2024-05-20", unverified: 177, verified: 230 },
    { date: "2024-05-21", unverified: 82, verified: 140 },
    { date: "2024-05-22", unverified: 81, verified: 120 },
    { date: "2024-05-23", unverified: 252, verified: 290 },
    { date: "2024-05-24", unverified: 294, verified: 220 },
    { date: "2024-05-25", unverified: 201, verified: 250 },
    { date: "2024-05-26", unverified: 213, verified: 170 },
    { date: "2024-05-27", unverified: 420, verified: 460 },
    { date: "2024-05-28", unverified: 233, verified: 190 },
    { date: "2024-05-29", unverified: 78, verified: 130 },
    { date: "2024-05-30", unverified: 340, verified: 280 },
    { date: "2024-05-31", unverified: 178, verified: 230 },
    { date: "2024-06-01", unverified: 178, verified: 200 },
    { date: "2024-06-02", unverified: 470, verified: 410 },
    { date: "2024-06-03", unverified: 103, verified: 160 },
    { date: "2024-06-04", unverified: 439, verified: 380 },
    { date: "2024-06-05", unverified: 88, verified: 140 },
    { date: "2024-06-06", unverified: 294, verified: 250 },
    { date: "2024-06-07", unverified: 323, verified: 370 },
    { date: "2024-06-08", unverified: 385, verified: 320 },
    { date: "2024-06-09", unverified: 438, verified: 480 },
    { date: "2024-06-10", unverified: 155, verified: 200 },
    { date: "2024-06-11", unverified: 92, verified: 150 },
    { date: "2024-06-12", unverified: 492, verified: 420 },
    { date: "2024-06-13", unverified: 81, verified: 130 },
    { date: "2024-06-14", unverified: 426, verified: 380 },
    { date: "2024-06-15", unverified: 307, verified: 350 },
    { date: "2024-06-16", unverified: 371, verified: 310 },
    { date: "2024-06-17", unverified: 475, verified: 520 },
    { date: "2024-06-18", unverified: 107, verified: 170 },
    { date: "2024-06-19", unverified: 341, verified: 290 },
    { date: "2024-06-20", unverified: 408, verified: 450 },
    { date: "2024-06-21", unverified: 169, verified: 210 },
    { date: "2024-06-22", unverified: 317, verified: 270 },
    { date: "2024-06-23", unverified: 480, verified: 530 },
    { date: "2024-06-24", unverified: 132, verified: 180 },
    { date: "2024-06-25", unverified: 141, verified: 190 },
    { date: "2024-06-26", unverified: 434, verified: 380 },
    { date: "2024-06-27", unverified: 448, verified: 490 },
    { date: "2024-06-28", unverified: 149, verified: 200 },
    { date: "2024-06-29", unverified: 103, verified: 160 },
    { date: "2024-06-30", unverified: 446, verified: 400 },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    unverified: {
        label: "Unverified Partners",
        color: "#EBB37F",
    },
    verified: {
        label: "Verified Partners",
        color: "#79A2CD",
    },
} satisfies ChartConfig

export function PerformanceComponent() {
    const [timeRange, setTimeRange] = React.useState("90d")

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card className="mt-6 shadow-none border-none">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Performance</CardTitle>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart
                        margin={{
                            left: -20,
                        }}
                        data={filteredData}>
                        <defs>
                            <linearGradient id="fillUnverified" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-unverified)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-unverified)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillVerified" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-verified)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-verified)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <YAxis />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    className="min-w-[200px]"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="verified"
                            type="natural"
                            fill="url(#fillVerified)"
                            stroke="var(--color-verified)"
                            stackId="a"
                        />
                        <Area
                            dataKey="unverified"
                            type="natural"
                            fill="url(#fillUnverified)"
                            stroke="var(--color-unverified)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}