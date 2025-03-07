
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ModelNameDistributionChartData } from "@/data/analytics/Verification.chart.data"
import { useMemo, useState } from "react"


const  chartConfig = {
    count: {
        label: "Count"
    },
    fraudCount: {
        label: "Fraud Count",
        color: "hsl(var(--chart-1))"
    },
    reportCount: {
        label: "Report Count",
        color: "hsl(var(--chart-2))"
    }
} satisfies ChartConfig


export default function ModelNameDistributionChartComponent() {

    const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("fraudCount")

    const total = useMemo(
        () => ({
        fraudCount: ModelNameDistributionChartData.reduce((acc, curr) => acc + curr.fraudCount, 0),
        reportCount: ModelNameDistributionChartData.reduce((acc, curr) => acc + curr.reportCount, 0),
        }),
        [],
    )


    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Fraud vs. Report Per Day</CardTitle>
                    <CardDescription>Showing total fraud verifications and reports per day for the last 30 Days</CardDescription>
                </div>
                <div className="flex">
                    {["fraudCount", "reportCount"].map((key) => {
                        const chart = key as keyof typeof chartConfig
                        return (
                        <button
                            key={chart}
                            data-active={activeChart === chart}
                            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                            onClick={() => setActiveChart(chart)}
                        >
                            <span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
                            <span className="text-lg font-bold leading-none sm:text-3xl">
                            {total[key as keyof typeof total].toLocaleString()}
                            </span>
                        </button>
                        )
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6 ">
                <ChartContainer config={chartConfig} className="h-[22.5rem] aspect-auto w-full">
                <BarChart
                    accessibilityLayer
                    data={ModelNameDistributionChartData}
                    margin={{
                    left: 12,
                    right: 12,
                    }}
                >
                    <CartesianGrid vertical={true} />
                    <YAxis 
                        tickLine={true}
                        axisLine={true}
                        tickMargin={8}
                        domain={[0, "auto"]} // Auto scales based on data
                    />
                    <XAxis
                    dataKey="date"
                    tickLine={true}
                    axisLine={true}
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
                        content={
                            <ChartTooltipContent
                            className="w-[150px]"
                            nameKey="views"
                            labelFormatter={(value) => {
                                return new Date(value).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                })
                            }}
                        />
                    }
                    />
                    <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )


}