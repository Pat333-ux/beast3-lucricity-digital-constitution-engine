import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export interface WellbeingMetric {
  id: string;
  name: string;
  score: number; // 0 to 100
  benchmark: number;
  status: "optimal" | "stable" | "attention";
}

export interface WellbeingOverviewProps {
  metrics: WellbeingMetric[];
  overallIndex: number;
  title?: string;
  description?: string;
  className?: string;
}

export function WellbeingOverview({
  metrics,
  overallIndex,
  title = "Vigo County Wellbeing Index",
  description = "Aggregated constitutional health and resource allocation indicators.",
  className = "",
}: WellbeingOverviewProps) {
  const getStatusBadge = (status: WellbeingMetric["status"]) => {
    switch (status) {
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

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold tracking-tight text-foreground">
            {overallIndex}
            <span className="text-sm font-normal text-muted-foreground">/100</span>
          </div>
          <p className="text-xs text-muted-foreground">Composite Index</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{metric.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    Target: {metric.benchmark}
                  </span>
                  {getStatusBadge(metric.status)}
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full transition-all duration-500 ${
                    metric.score >= metric.benchmark
                      ? "bg-emerald-600 dark:bg-emerald-400"
                      : "bg-amber-500"
                  }`}
                  style={{ width: `${Math.min(Math.max(metric.score, 0), 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
