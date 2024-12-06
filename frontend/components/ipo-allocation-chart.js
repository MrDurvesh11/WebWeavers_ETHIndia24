"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Jan", Tech: 2400, Finance: 1398, Healthcare: 9800 },
  { name: "Feb", Tech: 1398, Finance: 3570, Healthcare: 5800 },
  { name: "Mar", Tech: 9800, Finance: 2908, Healthcare: 8200 },
  { name: "Apr", Tech: 3908, Finance: 4800, Healthcare: 3908 },
  { name: "May", Tech: 4800, Finance: 3800, Healthcare: 4300 },
  { name: "Jun", Tech: 3800, Finance: 4300, Healthcare: 9800 },
]

export function IPOAllocationChart() {
  return (
    <ChartContainer
      config={{
        Tech: {
          label: "Tech",
          color: "hsl(var(--chart-1))",
        },
        Finance: {
          label: "Finance",
          color: "hsl(var(--chart-2))",
        },
        Healthcare: {
          label: "Healthcare",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="Tech" stroke="var(--color-Tech)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Finance" stroke="var(--color-Finance)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Healthcare" stroke="var(--color-Healthcare)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
