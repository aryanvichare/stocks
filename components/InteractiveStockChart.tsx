"use client";

import React, { FC, useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { StockData } from "@/lib/getStockData";

const chartConfig = {
  price: {
    label: "Stock Price",
  },
  open: {
    label: "Open",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface InteractiveStockChartProps {
  chartData: StockData[];
}

export const InteractiveStockChart: FC<InteractiveStockChartProps> = ({
  chartData,
}) => {
  const formattedData = useMemo(
    () =>
      chartData.map((item) => ({
        ...item,
        open: parseFloat(item.open),
      })),
    [chartData]
  );

  const minValue = useMemo(
    () => Math.min(...formattedData.map((item) => item.open)),
    [formattedData]
  );
  const maxValue = useMemo(
    () => Math.max(...formattedData.map((item) => item.open)),
    [formattedData]
  );

  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>NVDA</CardTitle>
          <CardDescription>Nvidia Corporation</CardDescription>
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[400px] w-full'>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              domain={[minValue * 0.9, maxValue * 1.1]}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='price-data'
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={"open"}
              type='monotone'
              stroke={`var(--color-open)`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
