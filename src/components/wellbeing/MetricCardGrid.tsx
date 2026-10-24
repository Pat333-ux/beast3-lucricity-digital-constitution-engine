import * as React from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";

export interface WellbeingMetricItem {
  id: string;
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
}

export interface MetricCardGridProps {
  metrics: WellbeingMetricItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function MetricCardGrid({
  metrics,
  columns = 4,
  className = "",
}: MetricCardGridProps) {
  const gridColsClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid gap-4 ${gridColsClass} ${className}`}>
      {metrics.map((metric) => (
        <MetricCard
          key={metric.id}
          title={metric.title}
          value={metric.value}
          description={metric.description}
          trend={metric.trend}
          icon={metric.icon}
        />
      ))}
    </div>
  );
}
