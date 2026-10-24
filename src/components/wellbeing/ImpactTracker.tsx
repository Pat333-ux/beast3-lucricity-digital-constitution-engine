import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export interface ImpactRecord {
  id: string;
  initiativeTitle: string;
  category: "infrastructure" | "economic" | "social" | "environmental";
  allocatedFunds: string;
  beneficiariesCount: number;
  status: "active" | "completed" | "evaluating";
  impactScore: number; // 0 to 100
}

export interface ImpactTrackerProps {
  records: ImpactRecord[];
  title?: string;
  description?: string;
  className?: string;
}

export function ImpactTracker({
  records,
  title = "Constitutional Impact & Allocation Tracker",
  description = "Measuring direct community outcomes and metric improvements from funded DAO proposals.",
  className = "",
}: ImpactTrackerProps) {
  const getStatusBadge = (status: ImpactRecord["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "evaluating":
        return <Badge variant="secondary">Evaluating</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            No impact records found for the current evaluation period.
          </p>
        ) : (
          <div className="space-y-4">
            {records.map((record) => (
              <div
                key={record.id}
                className="p-4 rounded-lg border border-border bg-card hover:border-accent transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground font-semibold">
                      {record.id}
                    </span>
                    {getStatusBadge(record.status)}
                    <Badge variant="outline" className="capitalize text-[10px]">
                      {record.category}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Allocated: <strong className="text-foreground font-mono">{record.allocatedFunds}</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">
                      {record.initiativeTitle}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Estimated Beneficiaries: <span className="font-medium text-foreground">{record.beneficiariesCount.toLocaleString()} residents</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 sm:w-1/3">
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between text-[11px] text-muted-foreground">
                        <span>Impact Score</span>
                        <span className="font-semibold text-foreground">{record.impactScore}/100</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full transition-all ${
                            record.impactScore >= 80
                              ? "bg-emerald-600 dark:bg-emerald-400"
                              : record.impactScore >= 50
                              ? "bg-amber-500"
                              : "bg-destructive"
                          }`}
                          style={{ width: `${Math.min(Math.max(record.impactScore, 0), 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
