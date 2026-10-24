"use client";

import * as React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export interface RegulatoryReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateReport: (reportParams: {
    reportType: string;
    jurisdiction: string;
    startDate: string;
    endDate: string;
  }) => Promise<void> | void;
}

export function RegulatoryReportModal({
  isOpen,
  onClose,
  onGenerateReport,
}: RegulatoryReportModalProps) {
  const [reportType, setReportType] = React.useState("dao_treasury_compliance");
  const [jurisdiction, setJurisdiction] = React.useState("Wyoming / Vigo County, IN");
  const [startDate, setStartDate] = React.useState("2026-01-01");
  const [endDate, setEndDate] = React.useState("2026-10-24");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onGenerateReport({
        reportType,
        jurisdiction,
        startDate,
        endDate,
      });
      onClose();
    } catch (err) {
      console.error("Failed to generate regulatory report:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generate Regulatory Compliance Report"
      description="Compile cryptographic audit trails and constitutional filings for jurisdictional oversight."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Report Classification</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="dao_treasury_compliance">DAO Treasury & Token Allocation Audit</option>
            <option value="constitutional_governance">Constitutional Governance & Voting Record</option>
            <option value="wellbeing_impact_assessment">Wellbeing Index & Municipal Impact Summary</option>
            <option value="full_statutory_dossier">Full Statutory & LLC Compliance Dossier</option>
          </select>
        </div>

        <Input
          label="Target Jurisdiction"
          value={jurisdiction}
          onChange={(e) => setJurisdiction(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed pt-1">
          Generated reports bundle verifiable transaction hashes, governance proposals, and cryptographic attestations into an immutable ZIP archive suitable for official filing.
        </p>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Compiling Report..." : "Generate & Export Dossier"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
