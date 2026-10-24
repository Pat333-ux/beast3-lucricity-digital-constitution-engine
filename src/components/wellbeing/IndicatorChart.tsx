import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export interface DataPoint {
  label: string;
  value: number;
  benchmark?: number;
}

export interface IndicatorChartProps {
  title: string;
  description?: string;
  data: DataPoint[];
  unit?: string;
  maxValue?: number;
  className?: string;
}

export function IndicatorChart({
  title,
  description,
  data,
  unit = "",
  maxValue,
  className = "",
}: IndicatorChartProps) {
  const calculatedMax = maxValue || Math.max(...data.map((d) => Math.max(d.value, d.benchmark || 0))) * 1.15 || 100;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {data.map((point, index) => {
            const barWidth = Math.min(Math.max((point.value / calculatedMax) * 100, 0), 100);
            const benchmarkWidth = point.benchmark
              ? Math.min(Math.max((point.benchmark / calculatedMax) * 100, 0), 100)
              : null;

            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-foreground">{point.label}</span>
                  <span className="text-muted-foreground font-mono">
                    {point.value} {unit}
                    {point.benchmark && ` (Target: ${point.benchmark} ${unit})`}
                  </span>
                </div>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all duration-500 rounded-full"
                    style={{ width: `${barWidth}%` }}
                  />
                  {benchmarkWidth !== null && (
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-foreground dark:bg-white z-10"
                      style={{ left: `${benchmarkWidth}%` }}
                      title={`Target Benchmark: ${point.benchmark}`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span>Measured Value</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-0.5 bg-foreground dark:bg-white" />
            <span>Target Benchmark</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
