"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { Tooltip } from "recharts";
import { cn } from "@/lib/utils";

function cva(base, options) {
  return function ({ variant, size, className }) {
    const variantClass = options.variants.variant[variant || options.defaultVariants.variant];
    const sizeClass = options.variants.size[size || options.defaultVariants.size];
    return [base, variantClass, sizeClass, className].filter(Boolean).join(" ");
  };
}

const chartContainerVariants = cva("", {
  variants: {
    variant: {
      default: "w-full h-full",
    },
    size: {
      default: "h-[350px]",
      sm: "h-[200px]",
      lg: "h-[450px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const ChartContainer = forwardRef(function ChartContainer(
  { className, variant, size, config, ...props },
  ref
) {
  const [colors, setColors] = useState({});

  useEffect(() => {
    if (config) {
      const newColors = {};
      Object.entries(config).forEach(([key, value]) => {
        newColors[`--color-${key}`] = value.color;
      });
      setColors(newColors);
    }
  }, [config]);

  return (
    <div
      ref={ref}
      className={cn(chartContainerVariants({ variant, size, className }))}
      style={colors}
      {...props}
    />
  );
});

const ChartTooltip = forwardRef(function ChartTooltip({ content, ...props }, ref) {
  return (
    <Tooltip ref={ref} content={content} wrapperStyle={{ outline: "none" }} {...props} />
  );
});

const ChartTooltipContent = forwardRef(function ChartTooltipContent(
  { active, payload, label, hideLabel = false, className, ...props },
  ref
) {
  if (!active || !payload) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn("rounded-lg border bg-background p-2 shadow-sm", className)}
      {...props}
    >
      {!hideLabel && <div className="mb-2 font-medium">{label}</div>}
      <div className="flex flex-col gap-1">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="font-medium">{item.name}:</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export { ChartContainer, ChartTooltip, ChartTooltipContent };
