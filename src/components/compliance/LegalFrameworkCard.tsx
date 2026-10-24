import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export interface LegalStatute {
  id: string;
  code: string;
  title: string;
  jurisdiction: string;
  status: "compliant" | "review_required" | "non_compliant";
  lastVerified: string;
}

export interface LegalFrameworkCardProps {
  statutes: LegalStatute[];
  entityName?: string;
  jurisdictionName?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function LegalFrameworkCard({
  statutes,
  entityName = "New World Order Private Government DAO LLC",
  jurisdictionName = "Wyoming / Vigo County, IN",
  title = "Legal & Statutory Compliance Status",
  description = "Cross-jurisdictional registry and statutory alignment metrics.",
  className = "",
}: LegalFrameworkCardProps) {
  const getStatusBadge = (status: LegalStatute["status"]) => {
    switch (status) {
      case "compliant":
        return <Badge variant="success">Compliant</Badge>;
      case "review_required":
        return <Badge variant="secondary">Review Required</Badge>;
      case "non_compliant":
        return <Badge variant="destructive">Non-Compliant</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-2">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs font-semibold text-foreground">{entityName}</p>
          <p className="text-xs text-muted-foreground">{jurisdictionName}</p>
        </div>
      </CardHeader>
      <CardContent>
        {statutes.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            No active statutory frameworks mapped.
          </p>
        ) : (
          <div className="space-y-3">
            {statutes.map((statute) => (
              <div
                key={statute.id}
                className="p-3.5 rounded-lg border border-border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-primary">
                      {statute.code}
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {statute.jurisdiction}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground">{statute.title}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-border">
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                    Verified: {statute.lastVerified}
                  </span>
                  {getStatusBadge(statute.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
