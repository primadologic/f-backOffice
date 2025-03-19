

import { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useYearlyStatistics } from '@/service/analytics/yearly-stats.service';


// Define interfaces for our data structure
interface ApiResponseData {
  year: number;
  report: number[];
  fraudNumbers: number[];
  platformPercentagesFromReport: Record<string, number>;
}

interface ApiResponse {
  message: string;
  statusCode: number;
  data: ApiResponseData;
}

interface ChartDataPoint {
  month: string;
  report: number;
  fraudNumbers: number;
}

type ChartType = "report" | "fraudNumbers";



const YearlyReportStatistics = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [yearOptions, setYearOptions] = useState<number[]>([]);
  const { data: apiResponse, isLoading, isError, error } = useYearlyStatistics(selectedYear);

  const [activeChart, setActiveChart] = useState<ChartType>("fraudNumbers");
  
  const chartConfig = {
    report: {
      label: "Reports",
      color: "hsl(var(--chart-1))"
    },
    fraudNumbers: {
      label: "Fraud Numbers",
      color: "hsl(var(--chart-2))"
    }
  };

  // Generate year options (current year and 4 previous years)
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    setYearOptions(years);
    
    // Set initial selected year to current year
    setSelectedYear(currentYear);
  }, []);

  const formatChartData = (response: ApiResponse | undefined): ChartDataPoint[] => {
    if (!response || !response.data) return [];
    
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return months.map((month, index) => ({
      month,
      report: response.data.report[index] || 0,
      fraudNumbers: response.data.fraudNumbers[index] || 0
    }));
  };

  const chartData = formatChartData(apiResponse as ApiResponse);
  const data = apiResponse?.data || { report: [], fraudNumbers: [] };
  
  const total = useMemo(
    () => ({
      report: data.report?.reduce((acc: number, curr: number) => acc + curr, 0) || 0,
      fraudNumbers: data.fraudNumbers?.reduce((acc: number, curr: number) => acc + curr, 0) || 0,
    }),
    [data?.report, data?.fraudNumbers]
  );


  if (isLoading) {
    return (
      <Card className="w-full h-[15rem]">
        <CardContent className="flex justify-center items-center h-[15rem] aspect-auto w-full">
          Loading data...
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full h-[15rem]">
        <CardContent className="text-red-500 h-[15rem] aspect-auto w-full">
          Error loading data: {(error as Error)?.message || "Unknown error"}
        </CardContent>
      </Card>
    );
  }

  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Report & Fraud Numbers Monthly Statistics ({selectedYear})</CardTitle>
          <CardDescription>Showing report and fraud numbers statis by month</CardDescription>
        </div>
        <div className="flex">
          {(Object.keys(chartConfig) as Array<keyof typeof chartConfig>).map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-xs text-muted-foreground">{chartConfig[key].label}</span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {total[key].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      
      <div className="p-4 flex justify-end">
          <div className="flex items-center">
            <label htmlFor="yearSelect" className="mr-2 font-medium">Filter by Year:</label>
            <Select
            value={selectedYear.toString()}
          
            onValueChange={(value) => {
              console.log("Selected Year:", value);  // Debugging
              setSelectedYear(Number(value));
            }}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          </div>
      </div>

        <CardContent className="px-2 sm:p-6 ">
            <ChartContainer config={chartConfig} className="h-[15rem] aspect-auto w-full">
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                    left: 12,
                    right: 12,
                    }}
                >
                    <CartesianGrid vertical={true} />
                    {/* <YAxis 
                        tickLine={true}
                        axisLine={true}
                        tickMargin={8}
                        domain={[0, "auto"]} // Auto scales based on data
                    />
                    <XAxis
                    dataKey="month"
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
                    /> */}
                    <XAxis dataKey="month" 
                        tickLine={true}
                        axisLine={true}
                        tickMargin={8}
                    />
                    <YAxis 
                        tickLine={true}
                        axisLine={true}
                        tickMargin={8}
                    />
                    <ChartTooltip
                        content={
                            <ChartTooltipContent
                                className="w-[150px]"
                                nameKey="month"
                                label={chartConfig[activeChart].label}
                            //     labelFormatter={(value) => {
                            //         return new Date(value).toLocaleDateString("en-US", {
                            //         month: "short",
                            //         day: "numeric",
                            //         year: "numeric",
                            //         })
                            // }}
                        />
                    }
                    />
                    <Bar 
                      dataKey={activeChart} 
                      // fill={`var(--color-${activeChart})`}
                      fill={`${chartConfig[activeChart].color}`} // Use the color from config instead of a string template
                      name={chartConfig[activeChart].label} // Add this line to set the name that appears in tooltip 
                    />
                    {/* <Bar dataKey="report" name="Reports" fill={chartConfig.report.color} />
                    <Bar dataKey="fraudNumbers" name="Frau" fill={chartConfig.fraudNumbers.color} /> */}
                </BarChart>
                </ChartContainer>
            </CardContent>

    </Card>
  );
};


export default YearlyReportStatistics;