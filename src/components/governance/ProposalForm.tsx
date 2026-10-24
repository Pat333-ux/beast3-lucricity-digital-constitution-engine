"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export interface ProposalFormData {
  title: string;
  category: "constitutional" | "allocation" | "policy" | "emergency";
  summary: string;
  description: string;
  executionPayload?: string;
  votingDurationDays: number;
}

export interface ProposalFormProps {
  onSubmitProposal: (data: ProposalFormData) => Promise<void> | void;
  onCancel?: () => void;
  minVotingPowerRequired?: number;
  userVotingPower?: number;
  className?: string;
}

export function ProposalForm({
  onSubmitProposal,
  onCancel,
  minVotingPowerRequired = 10000,
  userVotingPower = 0,
  className = "",
}: ProposalFormProps) {
  const [formData, setFormData] = React.useState<ProposalFormData>({
    title: "",
    category: "constitutional",
    summary: "",
    description: "",
    executionPayload: "",
    votingDurationDays: 7,
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const isEligibleToPropose = userVotingPower >= minVotingPowerRequired;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Proposal title is required.";
    if (!formData.summary.trim()) newErrors.summary = "Executive summary is required.";
    if (!formData.description.trim()) newErrors.description = "Detailed specification is required.";
    if (formData.votingDurationDays < 1 || formData.votingDurationDays > 30) {
      newErrors.votingDurationDays = "Duration must be between 1 and 30 days.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !isEligibleToPropose) return;

    setIsSubmitting(true);
    try {
      await onSubmitProposal(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">Draft Governance Proposal</CardTitle>
        <CardDescription>
          Submit a new constitutional or resource allocation initiative for Vigo County DAO review.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {!isEligibleToPropose && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md text-xs text-destructive">
              You require at least <strong>{minVotingPowerRequired.toLocaleString()} LUCR</strong> to initiate a formal proposal. Current power: {userVotingPower.toLocaleString()} LUCR.
            </div>
          )}

          <Input
            label="Proposal Title"
            placeholder="e.g., Vigo Infrastructure Improvement Grant 2026"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={errors.title}
            disabled={!isEligibleToPropose}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as ProposalFormData["category"],
                  })
                }
                disabled={!isEligibleToPropose}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="constitutional">Constitutional</option>
                <option value="allocation">Resource Allocation</option>
                <option value="policy">Policy Amendment</option>
                <option value="emergency">Emergency Protocol</option>
              </select>
            </div>

            <Input
              label="Voting Window (Days)"
              type="number"
              min={1}
              max={30}
              value={formData.votingDurationDays}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  votingDurationDays: parseInt(e.target.value) || 7,
                })
              }
              error={errors.votingDurationDays}
              disabled={!isEligibleToPropose}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Executive Summary</label>
            <textarea
              rows={2}
              placeholder="Brief overview of objectives and constitutional rationale..."
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              disabled={!isEligibleToPropose}
              className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.summary ? "border-destructive" : ""
              }`}
            />
            {errors.summary && <p className="text-xs text-destructive">{errors.summary}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Detailed Specification</label>
            <textarea
              rows={5}
              placeholder="Full text, budget break-downs, timeline, and measurable metrics..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={!isEligibleToPropose}
              className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.description ? "border-destructive" : ""
              }`}
            />
            {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Smart Contract Execution Payload (Optional)
            </label>
            <textarea
              rows={2}
              placeholder='{"target": "0x...", "value": "0", "calldata": "0x..."}'
              value={formData.executionPayload}
              onChange={(e) => setFormData({ ...formData, executionPayload: e.target.value })}
              disabled={!isEligibleToPropose}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-end gap-3">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            disabled={!isEligibleToPropose || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Publish Proposal to DAO"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
