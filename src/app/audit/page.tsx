"use client";

import * as React from "react";
import { AuditLogTable, AuditLogEntry } from "@/components/compliance/AuditLogTable";
import { RegulatoryReportModal } from "@/components/compliance/RegulatoryReportModal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { APP_METADATA } from "@/lib/utils/constants";

export default function AuditPage() {
  const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = React.useState<string>("all");

  const mockAuditLogs: AuditLogEntry[] = [
    {
      id: "LOG-1094",
      timestamp: "2026-10-24 12:15:33 UTC",
      actor: "0x3333...3333 (Pat Tarwater Jr.)",
      action: "Smart Contract State Update",
      category: "governance",
      severity: "info",
      details: "Updated LucricityGovernor execution parameter thresholds on Sepolia testnet.",
      txHash: "0x8a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
    },
    {
      id: "LOG-1093",
      timestamp: "2026-10-23 18:42:10 UTC",
      actor: "0x1111...1111 (Vigo County Delegate)",
      action: "Proposal Created",
      category: "treasury",
      severity: "info",
      details: "Submitted PROP-042 for Terre Haute Smart Corridor allocation.",
      txHash: "0x1f2e3d4c5b6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c",
    },
    {
      id: "LOG-1092",
      timestamp: "2026-10-22 09:05:00 UTC",
      actor: "System Compliance Engine",
      action: "Wyoming Statutory Audit Check",
      category: "system",
      severity: "info",
      details: "Automated verification of Articles of Organization & LLC active status passed.",
    },
    {
      id: "LOG-1091",
      timestamp: "2026-10-20 14:22:18 UTC",
      actor: "0x8888...8888",
      action: "Unauthorized Threshold Query Attempt",
      category: "access",
      severity: "warning",
      details: "Attempted administrative parameter change without required multisig authorization.",
      txHash: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b",
    },
  ];

  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || log.category === selectedCategory;
    const matchesSeverity =
      selectedSeverity === "all" || log.severity === selectedSeverity;

    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const handleGenerateReport = (reportParams: {
    reportType: string;
    jurisdiction: string;
    startDate: string;
    endDate: string;
  }) => {
    console.log("Generating regulatory compliance report with parameters:", reportParams);
    // Dynamic export hook or PDF/ZIP bundle generation dispatch
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              Compliance & Cryptographic Audit Log
            </h1>
            <Badge variant="success" className="text-xs">
              Immutable
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Verifiable transaction ledger, administrative actions, and regulatory filings for {APP_METADATA.governingEntity}.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsReportModalOpen(true)}>
          Generate Regulatory Dossier
        </Button>
      </div>

      {/* Filter Controls Card */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Audit Trail Filters</CardTitle>
          <CardDescription>
            Search logs by transaction hash, actor address, or action classification.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search action, actor, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:col-span-1"
            />

            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-semibold text-muted-foreground shrink-0">Category:</span>
              {["all", "governance", "treasury", "access", "system"].map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "primary" : "outline"}
                  size="sm"
                  className="capitalize text-xs whitespace-nowrap"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-semibold text-muted-foreground shrink-0">Severity:</span>
              {["all", "info", "warning", "critical"].map((sev) => (
                <Button
                  key={sev}
                  variant={selectedSeverity === sev ? "primary" : "outline"}
                  size="sm"
                  className="capitalize text-xs whitespace-nowrap"
                  onClick={() => setSelectedSeverity(sev)}
                >
                  {sev}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">System Events & Transaction Log</CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} verified log entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuditLogTable logs={filteredLogs} />
        </CardContent>
      </Card>

      {/* Regulatory Dossier Modal */}
      <RegulatoryReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onGenerateReport={handleGenerateReport}
      />
    </div>
  );
}
