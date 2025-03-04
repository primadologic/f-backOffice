import { Label, LabelList, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import { useMemo } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
import { TotalVerificationbyOriginData } from "@/data/analytics/Verification.chart.data"


const chartConfig = {
    fraud: {
        label: "Verifications"
    },
    Web: {
        label: "Web",
        color: "hsl(var(--chart-1))"
    },
    Telegram: {
        label: "Telegram",
       color: "hsl(var(--chart-2))"
    },
    USSD: {
        label: "USSD",
       color: "hsl(var(--chart-3))"
    },

} satisfies ChartConfig


export default function VerifybyOriginChartComponent() {

    const totalVerifications = useMemo(() => {
        return TotalVerificationbyOriginData.reduce((acc, curr) => acc + curr.fraud, 0)
    }, [])

    return (
        <Card className="sm:w-[35vw] w-full flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Verification by Origin</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 ">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square h-[300px]  my-5"
                >
                <PieChart
                    
                >
                     <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                        data={TotalVerificationbyOriginData}
                        dataKey="fraud"
                        nameKey="origin"
                        outerRadius={100}
                        innerRadius={50}
                        strokeWidth={2.5}
                        activeIndex={0}
                        activeShape={({
                            outerRadius = 0,
                            ...props
                        }: PieSectorDataItem) => (
                            <Sector {...props} outerRadius={outerRadius + 10} />
                        )}
                        label={({ payload, ...props }) => {
                            return (
                            <text
                                cx={props.cx}
                                cy={props.cy}
                                x={props.x}
                                y={props.y}
                                textAnchor={props.textAnchor}
                                dominantBaseline={props.dominantBaseline}
                                fill="hsla(var(--foreground))"
                            >
                                {payload.fraud}
                            </text>
                            )
                        }}
                    >
                         <LabelList
                            dataKey="origin"
                            className="fill-background"
                            stroke="var(--primary-color)"
                            fontSize={13}
                            formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
                        />

                        <Label
                            content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                >
                                    <tspan
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    className="fill-foreground text-3xl font-bold"
                                    >
                                    {totalVerifications.toLocaleString()}
                                    </tspan>
                                    <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="fill-muted-foreground"
                                    >
                                    Verifications
                                    </tspan>
                                </text>
                                )
                            }
                            }}
                        />
                    </Pie>
                    <ChartLegend
                        content={<ChartLegendContent nameKey="origin" />}
                        className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                     />
                </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Showing the phone number verification by origin
                </div>
                <div className="leading-none text-muted-foreground">Showing total verifications by origin</div>
            </CardFooter>
        </Card>
    )
}