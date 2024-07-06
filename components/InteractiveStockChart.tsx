"use client";

import React, { FC, useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StockData } from "@/lib/get-stock-data";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { companies } from "@/lib/stock-data";

interface InteractiveStockChartProps {
  chartData: StockData[];
  ticker: string;
}

const chartConfig = {
  priceData: {
    label: "Price Data",
  },
  open: {
    label: "Open",
    color: "hsl(var(--chart-1))",
  },
  low: {
    label: "Open",
    color: "hsl(var(--chart-2))",
  },
  high: {
    label: "Close",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export const InteractiveStockChart: FC<InteractiveStockChartProps> = ({
  chartData,
  ticker,
}) => {
  const formattedData = useMemo(
    () =>
      chartData
        .map((item) => ({
          ...item,
          dateTime: new Date(item.date).getTime(),
        }))
        .filter((item) => !isNaN(item.dateTime))
        .sort((a, b) => a.dateTime - b.dateTime),
    [chartData]
  );

  const minValue = useMemo(
    () =>
      Math.min(...formattedData.map((item) => Math.min(item.open, item.close))),
    [formattedData]
  );
  const maxValue = useMemo(
    () =>
      Math.max(...formattedData.map((item) => Math.max(item.open, item.close))),
    [formattedData]
  );

  const company = companies.find((company) => company.ticker === ticker);

  console.log(formattedData);

  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>{ticker}</CardTitle>
          <CardDescription>{company?.name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <div className='aspect-auto h-[400px] w-full'>
          <ChartContainer
            config={chartConfig}
            className='aspect-auto h-[400px] w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                data={formattedData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}>
                <CartesianGrid strokeDasharray='3 3' />
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
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                    />
                  }
                />
                <Line
                  type='monotone'
                  dataKey='open'
                  stroke={chartConfig.open.color}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type='monotone'
                  dataKey='low'
                  stroke={chartConfig.low.color}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type='monotone'
                  dataKey='high'
                  stroke={chartConfig.high.color}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
