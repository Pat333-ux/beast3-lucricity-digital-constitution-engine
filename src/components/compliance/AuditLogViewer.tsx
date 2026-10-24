"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  category: "governance" | "treasury" | "access" | "system";
  severity: "info" | "warning" | "critical";
  txHash?: string;
  details?: string;
}

export interface AuditLogViewerProps {
  logs: AuditEntry[];
  title?: string;
  description?: string;
  className?: string;
}

export function AuditLogViewer({
  logs,
  title = "Constitutional Audit Log",
  description = "Immutable compliance and activity record for Vigo County governance operations.",
  className = "",
}: AuditLogViewerProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [severityFilter, setSeverityFilter] = React.useState<string>("all");

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.txHash && log.txHash.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter;
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter;

    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const getSeverityBadge = (severity: AuditEntry["severity"]) => {
    switch (severity) {
      case "info":
        return <Badge variant="secondary">Info</Badge>;
      case "warning":
        return <Badge variant="outline" className="border-amber-500 text-amber-600 dark:text-amber-400">Warning</Badge>;
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["all", "governance", "treasury", "access", "system"].map((cat) => (
              <Button
                key={cat}
                variant={categoryFilter === cat ? "primary" : "outline"}
                size="sm"
                className="capitalize text-xs whitespace-nowrap"
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Input
            placeholder="Search audit trail by actor, action, transaction hash, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:max-w-md"
          />
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="h-9 w-full sm:w-32 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="all">All Severities</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Event ID</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead className="text-right">Tx / Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No compliance audit records found matching the active filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground font-medium">
                    {log.id}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {log.timestamp}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{log.action}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{log.actor}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize text-[10px]">
                      {log.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                  <TableCell className="text-right font-mono text-xs">
                    {log.txHash ? (
                      <span className="text-primary hover:underline cursor-pointer" title={log.txHash}>
                        {log.txHash.slice(0, 6)}...{log.txHash.slice(-4)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">{log.details || "N/A"}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
