"use client";

import dynamic from "next/dynamic";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Move the data outside the render to ensure SSR and CSR have consistent data
const data = [
  { name: "Jan", Tech: 2400, Finance: 1398, Healthcare: 9800 },
  { name: "Feb", Tech: 1398, Finance: 3570, Healthcare: 5800 },
  { name: "Mar", Tech: 9800, Finance: 2908, Healthcare: 8200 },
  { name: "Apr", Tech: 3908, Finance: 4800, Healthcare: 3908 },
  { name: "May", Tech: 4800, Finance: 3800, Healthcare: 4300 },
  { name: "Jun", Tech: 3800, Finance: 4300, Healthcare: 9800 },
];

// Dynamically import the chart with SSR disabled
export const IPOAllocationChart = () => {
  // Define dynamic colors here
  const techColor = "#1f77b4"; // Blue for Tech
  const financeColor = "#ff7f0e"; // Orange for Finance
  const healthcareColor = "#2ca02c"; // Green for Healthcare

  return (
    <ChartContainer
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          {/* Use the dynamic colors directly */}
          <Line
            type="monotone"
            dataKey="Tech"
            stroke={techColor}
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Finance"
            stroke={financeColor}
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Healthcare"
            stroke={healthcareColor}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default dynamic(() => Promise.resolve(IPOAllocationChart), { ssr: false });
