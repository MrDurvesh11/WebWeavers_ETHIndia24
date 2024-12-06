"use client"
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ data, options }) => {
  return (
    <ChartContainer>
      <Line data={data} options={options} />
      <ChartTooltip>
        <ChartTooltipContent>
          {/* Custom tooltip logic */}
        </ChartTooltipContent>
      </ChartTooltip>
    </ChartContainer>
  );
};

export default Chart;
