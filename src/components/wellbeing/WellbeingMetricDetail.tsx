"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export interface HistoricalPoint {
  timestamp: string;
  value: number;
}

export interface WellbeingMetricDetailProps {
  id: string;
  name: string;
  category: string;
  currentValue: number;
  targetBenchmark: number;
  unit: string;
  status: "optimal" | "stable" | "attention";
  description: string;
  historicalData?: HistoricalPoint[];
  impactFactors?: string[];
  className?: string;
}

export function WellbeingMetricDetail({
  name,
  category,
  currentValue,
  targetBenchmark,
  unit,
  status,
  description,
  historicalData = [],
  impactFactors = [],
  className = "",
}: WellbeingMetricDetailProps) {
  const getStatusBadge = (s: WellbeingMetricDetailProps["status"]) => {
    switch (s) {
      case "optimal":
        return <Badge variant="success">Optimal</Badge>;
      case "stable":
        return <Badge variant="secondary">Stable</Badge>;
      case "attention":
        return <Badge variant="destructive">Needs Attention</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const progress = Math.min(Math.max((currentValue / targetBenchmark) * 100, 0), 100);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
              {category}
            </Badge>
            {getStatusBadge(status)}
          </div>
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <CardDescription className="mt-1">{description}</CardDescription>
        </div>
        <div className="text-right">
          <div className="text-3xl font-extrabold tracking-tight text-foreground">
            {currentValue} <span className="text-sm font-normal text-muted-foreground">{unit}</span>
          </div>
          <p className="text-xs text-muted-foreground">Target: {targetBenchmark} {unit}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground font-medium">
            <span>Progress to Target Benchmark</span>
            <span>{progress.toFixed(1)}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full transition-all duration-500 ${
                currentValue >= targetBenchmark
                  ? "bg-emerald-600 dark:bg-emerald-400"
                  : "bg-amber-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {historicalData.length > 0 && (
          <div className="space-y-3 border-t border-border pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Recent Historical Trend
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {historicalData.slice(-4).map((point, index) => (
                <div key={index} className="p-2.5 rounded-md border border-border bg-muted/20 text-center">
                  <span className="block text-[10px] text-muted-foreground">{point.timestamp}</span>
                  <span className="text-sm font-semibold text-foreground">
                    {point.value} {unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {impactFactors.length > 0 && (
          <div className="space-y-2 border-t border-border pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Contributing Constitutional Factors
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground">
              {impactFactors.map((factor, index) => (
                <li key={index} className="flex items-center gap-2 bg-muted/30 p-2 rounded border border-border/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
