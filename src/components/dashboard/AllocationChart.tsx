import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export interface AllocationSector {
  id: string;
  name: string;
  percentage: number;
  amount: string;
  category: string;
}

export interface AllocationChartProps {
  sectors: AllocationSector[];
  totalAllocated: string;
  title?: string;
  description?: string;
  className?: string;
}

export function AllocationChart({
  sectors,
  totalAllocated,
  title = "Automated Resource Allocation",
  description = "LUCR token distribution across Vigo County municipal and community sectors.",
  className = "",
}: AllocationChartProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold tracking-tight text-foreground">
            {totalAllocated}
          </div>
          <p className="text-xs text-muted-foreground">Total Epoch Allocation</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
            {sectors.map((sector, index) => {
              const colors = [
                "bg-primary",
                "bg-emerald-600 dark:bg-emerald-400",
                "bg-amber-500",
                "bg-indigo-500",
                "bg-rose-500",
              ];
              const colorClass = colors[index % colors.length];
              return (
                <div
                  key={sector.id}
                  className={`h-full ${colorClass} transition-all`}
                  style={{ width: `${sector.percentage}%` }}
                  title={`${sector.name}: ${sector.percentage}%`}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {sectors.map((sector, index) => {
              const dotColors = [
                "bg-primary",
                "bg-emerald-600 dark:bg-emerald-400",
                "bg-amber-500",
                "bg-indigo-500",
                "bg-rose-500",
              ];
              const dotColor = dotColors[index % dotColors.length];

              return (
                <div
                  key={sector.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`h-3 w-3 rounded-full ${dotColor}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{sector.name}</p>
                      <p className="text-xs text-muted-foreground">{sector.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-foreground">
                      {sector.percentage}%
                    </span>
                    <p className="text-xs text-muted-foreground">{sector.amount}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
