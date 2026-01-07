"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface WaitTimeChartProps {
  data: Array<{
    intersection_name: string
    average_wait_time: number
  }>
}

export function WaitTimeChart({ data }: WaitTimeChartProps) {
  const chartData = data.map((item) => ({
    name: item.intersection_name.split("&")[0].trim(),
    waitTime: Math.round(item.average_wait_time),
  }))

  return (
    <ChartContainer
      config={{
        waitTime: {
          label: "Wait Time (s)",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="name"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} tickLine={{ stroke: "hsl(var(--border))" }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="waitTime" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
