"use client"

import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface TrafficDistributionChartProps {
  data: Array<{
    intersection_name: string
    total_vehicles: number
  }>
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function TrafficDistributionChart({ data }: TrafficDistributionChartProps) {
  const chartData = data.map((item, index) => ({
    name: item.intersection_name.split("&")[0].trim(),
    value: item.total_vehicles,
    fill: COLORS[index % COLORS.length],
  }))

  return (
    <ChartContainer
      config={{
        traffic: {
          label: "Traffic Volume",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
