"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface TrafficVolumeChartProps {
  data: Array<{
    hour: number
    average_vehicles: number
    average_wait_time: number
  }>
}

export function TrafficVolumeChart({ data }: TrafficVolumeChartProps) {
  const chartData = data.map((item) => ({
    hour: `${item.hour}:00`,
    vehicles: Math.round(item.average_vehicles),
  }))

  return (
    <ChartContainer
      config={{
        vehicles: {
          label: "Vehicles",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="hour"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            tickLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} tickLine={{ stroke: "hsl(var(--border))" }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="vehicles" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
